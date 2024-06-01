import React from "react";
import NavbarWithMegaMenu from "../navbar/Navbar";
import About from "./About";
import VIPRO from "./VIPRO";

export default function Home() {
  return (
    <main className="h-full w-full absolute">
      <NavbarWithMegaMenu />
      <div className="flex flex-col">
        <div
          className="relative mt-12 mb-4" // Adjust based on the height of the navbar
          style={{
            backgroundImage: "url('/img/background/bgmain.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minHeight: "30rem", // Ensure it covers at least 30rem height
            width: "100%",
            backgroundPosition: "right",
            display: "flex", // Ensure the child div can stretch to full height
            alignItems: "center", // Center content vertically if needed
            justifyContent: "center", // Center content horizontally if needed
          }}
        >
          <div className="h-full w-full flex items-center justify-center">
            <h1 className="text-white">TEXTO ALTERNATIVO TODOVISA</h1>
          </div>
        </div>

        {/* About section */}
        <About></About>
        <hr className="my-8"/>
        {/* VIPRO form section */}
        <VIPRO></VIPRO>
      </div>
    </main>
  );
}
