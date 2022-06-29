import React from "react";
import Option from "../Option/Option";
import "./Question.scss";

function Question({ question, answers, selectAnOption, id }) {
  return (
    <div className="riddle-body">
      <section className="qa">
        <div
          className="question-text"
          dangerouslySetInnerHTML={{ __html: question }}
        ></div>
        <div className="option-text">
          {answers.map((option) => {
            return (
              <Option
                key={option.id}
                id={option.id}
                answers={option.answer}
                selected={option.selected}
                selectAnOption={() => selectAnOption(option.id, id)}
                correct={option.correct}
                isCorrect={option.isCorrect}
                isIncorrect={option.isIncorrect}
                checked={option.checked}
              />
            );
          })}
        </div>
      </section>
      <hr />
    </div>
  );
}

export default Question;
