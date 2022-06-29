import React from "react";
import "./Option.scss";

const Option = ({
  answers,
  selectAnOption,
  selected,
  correct,
  isCorrect,
  isIncorrect,
  checked,
  id,
}) => {
  let styles = {};

  if (checked && correct) {
    styles = {
      backgroundColor: "#94D7A2",
      border: "none",
    };
  } else if (checked && isIncorrect) {
    styles = {
      backgroundColor: "#F8BCBC",
      opacity: 0.5,
      border: "none",
    };
  } else {
    styles = {
      backgroundColor: selected ? "#D6DBF5" : "white",
      border: "none",
    };
  }

  return (
    <div className="options">
      <button
        style={styles}
        className="opt-btn"
        onClick={selectAnOption}
        dangerouslySetInnerHTML={{ __html: answers }}
      ></button>
    </div>
  );
};

export default Option;
