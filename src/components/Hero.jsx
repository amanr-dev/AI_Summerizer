import React from "react";
import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center flex-row w-full mb-10 pt-4">
        <img
          src={logo}
          style={{ filter: "invert(9)" }}
          alt="AI Summerizer"
          className="w-28 object-contain"
        />
        <button
          type="button"
          onClick={() => {
            window.open("https://github.com/amanr-dev");
          }}
          className="black_btn"
        >
          GitHub
        </button>
      </nav>

      <h1 className="head_text blue_gradient">
        Summarize Articles with <br />
        <span className="text-slate-700">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc text-2xl">
        Discover AI's impact on industries, from healthcare to finance. Stay
        updated with the latest breakthroughs, ethics, and trends in machine
        learning and robotics. Your source for all things AI, simplifying
        complex concepts for everyone.
      </h2>
    </header>
  );
};

export default Hero;
