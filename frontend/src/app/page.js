import Image from "next/image";
import { MacbookScroll } from "./components/macbook-scroll";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MacbookScroll
        title={
          <span>
            Never get Herpes Again <br /> No kidding.
          </span>
        }
        showGradient={false}
      />
    </>
  );
}
