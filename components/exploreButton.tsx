"use client";
import Image from "next/image";

const ExploreButton = () => {
  return (
    <button
      type="button"
      id="explore-btn"
      className="mt-7 mx-auto "
      onClick={() => console.log("CLICK")}
    >
      <a href="#event">
        <Image
          src="/icons/arrow-down.svg"
          alt="btn-arrow"
          width={20}
          height={20}
        />
        Explore Events
      </a>
    </button>
  );
};

export default ExploreButton;
