import React from "react";
import { ImagePath } from "../../Constants";

const GoTop = () => {
  return (
    <div className="fixed bottom-20 right-10">
      <button
        type="button"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth", // makes it scroll smoothly
          });
        }}
      >
        <img src={`${ImagePath}go_top.png`} alt="" />
      </button>
    </div>
  );
};

export default GoTop;
