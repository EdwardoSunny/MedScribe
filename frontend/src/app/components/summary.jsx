import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"


export default function Summary() {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/summary/")
      .then((response) => response.json())
      .then((data) => setSummary(data.summary));
  }, []);

  return (
    <div className="font-bold text-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-3xl p-5 inline-block w-100 h-auto">
        <Card>
  <CardHeader>
    <CardTitle>Visit Summary 👨‍⚕️</CardTitle>
  </CardHeader>
  <CardContent>
    <p>{summary || "Please Upload a Visit! ️"}</p>
  </CardContent>
</Card>
    </div>
  );
}