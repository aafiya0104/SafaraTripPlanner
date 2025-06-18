import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center  mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.{" "}
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, saepe!
      </p>

      <Link to={"/create-trip"}>
        <Button>Get Started for Free</Button>
      </Link>
    </div>
  );
}

export default Hero;
