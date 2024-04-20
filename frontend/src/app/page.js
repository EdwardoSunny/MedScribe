import Image from "next/image";
import { MacbookScroll } from "./components/macbook-scroll";
import { NavbarWrapper } from "./components/navbar-wrapper";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavbarWrapper />
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
