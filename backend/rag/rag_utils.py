import os
import sys
import requests
import base64
from openai import OpenAI
from langchain import hub
import chromadb
from langchain_community.document_loaders import TextLoader
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_text_splitters import CharacterTextSplitter
from langchain_core.output_parsers import StrOutputParser
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.chat_history import BaseChatMessageHistory 
from langchain_core.runnables.history import RunnableWithMessageHistory

OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
DATA_PATH = os.path.dirname("../data/")
LLM_MODEL_NAME = "gpt-3.5-turbo"
LLM_TEMP = 0.7


class ChatBot:
    def __init__(self, transcript_name):
        self.vision_client = OpenAI()
        self.loader = TextLoader(os.path.join(DATA_PATH, transcript_name))
        self.docs = self.loader.load()

        self.text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        self.splits = self.text_splitter.split_documents(self.docs)
        self.vectorstore = Chroma.from_documents(documents=self.splits, embedding=OpenAIEmbeddings())

        # retriever with only 1 document in Chromadb
        self.retriever = self.vectorstore.as_retriever(search_kwargs={"k": 1})
        self.prompt = hub.pull("rlm/rag-prompt")
        self.llm = ChatOpenAI(model=LLM_MODEL_NAME, temperature=LLM_TEMP)

        ### Contextualize question ###
        self.contextualize_q_system_prompt = """Given a chat history and the latest user question \
        which might reference context in the chat history, formulate a standalone question \
        which can be understood without the chat history. Do NOT answer the question, \
        just reformulate it if needed and otherwise return it as is."""
        self.contextualize_q_prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.contextualize_q_system_prompt),
                MessagesPlaceholder("chat_history"),
                ("human", "{input}"),
            ]
        )
        self.history_aware_retriever = create_history_aware_retriever(
            self.llm, self.retriever, self.contextualize_q_prompt
        )

        ### Answer question ###
        self.qa_system_prompt = """You are an health care assistant for question-answering tasks. \
        Use the following pieces of retrieved context regarding the patient's condition from a doctors visit transcript to answer the question posed by the patient. \
        If you don't know the answer, just say that you don't know. Only answer questions related to health. \
        Keep the answer concise.\

        {context}"""

        self.qa_prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.qa_system_prompt),
                MessagesPlaceholder("chat_history"),
                ("human", "{input}"),
            ]
        )
        self.question_answer_chain = create_stuff_documents_chain(self.llm, self.qa_prompt)

        self.rag_chain = create_retrieval_chain(self.history_aware_retriever, self.question_answer_chain)


        ### Statefully manage chat history ###
        self.store = {}

        self.conversational_rag_chain = RunnableWithMessageHistory(
            self.rag_chain,
            self.get_session_history,
            input_messages_key="input",
            history_messages_key="chat_history",
            output_messages_key="answer",
        )


    def get_session_history(self, session_id: str) -> BaseChatMessageHistory:
        if session_id not in self.store:
            self.store[session_id] = ChatMessageHistory()
        return self.store[session_id]

    def encode_image(self, img_path):
        with open(img_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')

    def explain_image(self, img_path):
        base64_image = self.encode_image(img_path)
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {OPENAI_API_KEY}"
        }
        payload = {
            "model": "gpt-4-vision-preview",
            "messages": [
            {
                "role": "user",
                "content": [
                {
                    "type": "text",
                    "text": "Explain medically what is wrong this image. DO NOT WRITE ANYTHING ELSE." 
                },
                {
                    "type": "image_url",
                    "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                    }
                }
                ]
            }
            ],
            "max_tokens": 300
        }
        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

        return response.json()["choices"][0]["message"]["content"]

    def get_response(self, user_prompt, img_path=None):
        final_prompt=""
        img_summary = ""
        if (img_path != None):
            img_summary = self.explain_image(img_path)
            final_prompt = f"{user_prompt}\n\nHere is the description of an image of my condition: {img_summary}. Answer based on the image."
        else:
            final_prompt = user_prompt

        return self.conversational_rag_chain.invoke(
            {"input": final_prompt},
            config={
                "configurable": {"session_id": "abc123"}
            },  # constructs a key "abc123" in `store`.
        )["answer"]



if __name__ == "__main__":
    print("DEBUGGING RAG_UTILS.py!!! THIS SHOULD NEVER SHOW UP IN DEPLOYMENT!!!!")
    bot = ChatBot("transcript_1.txt")
    while True:
        user = input(">")
        if (user[0] == '$'):
            print(bot.get_response(user.split(", ")[1:]))
            print(os.path.join(DATA_PATH, user.split(", ")[1]))
            # print(bot.get_response(user.split(", ")[1:], os.path.join(DATA_PATH, user.split(", ")[1])))
        # else:
            # print(bot.get_response(user))
