import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Question from "../Question/Question";
import topBlob from "../../images/blob 5.png";
import bottomBlob from "../../images/blobs.png";
import "./Quiz.scss";

function Quiz(props) {
  const [game, setGame] = useState(false);
  const [start, setStart] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [checked, setChecked] = useState(false);

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getQuiz = async () => {
    const res = await fetch("https://opentdb.com/api.php?amount=5");
    const data = await res.json();
    setQuestions(buildQuiz(data.results));
  };

  const buildQuiz = (fetchedQuestions) => {
    const questionList = fetchedQuestions.map((question) => {
      return {
        id: nanoid(),
        question: question.question,
        correctAnswer: question.correct_answer,
        options: buildOption(
          shuffle([...question.incorrect_answers, question.correct_answer]),
          question.correct_answer
        ),
      };
    });
    return questionList;
  };

  const buildOption = (optionList, correctAnswer) => {
    return optionList.map((answer) => {
      return {
        selected: false,
        id: nanoid(),
        answer: answer,
        correct: answer === correctAnswer,
        isCorrect: false,
        isIncorrect: false,
        checked: false,
      };
    });
  };

  useEffect(() => {
    getQuiz();
  }, [game]);

  // console.log(questions);

  const startGame = () => {
    setStart(true);
  };

  const newGame = () => {
    setGame((prevGame) => !prevGame);
    setChecked(false);
    setScore(0);
  };

  const selectAnOption = (answerId, questionId) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((question) => {
        if (question.id === questionId) {
          const answerList = question.options.map((answer) => {
            if (answer.id === answerId || answer.selected) {
              return {
                ...answer,
                selected: !answer.selected,
              };
            } else {
              return answer;
            }
          });
          return {
            ...question,
            options: answerList,
          };
        } else {
          return question;
        }
      })
    );
  };

  const testTheAnswer = () => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((question) => {
        const checkedAnswers = question.options.map((answer) => {
          if (answer.selected && !answer.correct) {
            return {
              ...answer,
              isIncorrect: true,
              checked: true,
            };
          } else if (answer.selected && answer.correct) {
            setScore((prevScore) => prevScore + 1);
            return {
              ...answer,
              isCorrect: true,
              checked: true,
            };
          } else {
            return {
              ...answer,
              checked: true,
            };
          }
        });
        return {
          ...question,
          options: checkedAnswers,
        };
      })
    );
    setChecked(true);
  };

  return (
    <div className="quiz">
      <img src={topBlob} alt="blob" className="yel-blob" />
      {!start ? (
        <div className="container">
          <h2 className="titel">Quizzical</h2>
          <p>Answer 5 questions correct to win</p>
          <button className="start-btn" onClick={startGame}>
            Start
          </button>
        </div>
      ) : (
        <div className="gameOn">
          {questions.map((question) => (
            <Question
              key={question.id}
              id={question.id}
              question={question.question}
              answers={question.options}
              selectAnOption={selectAnOption}
            />
          ))}
          <img src={bottomBlob} alt="blob" className="blu-blob" />
          <section className="btn--section">
            {checked ? (
              <div className="check">
                <span className="score">
                  You scored {score}/5 correct answers
                </span>
                <button className="start-btn" onClick={newGame}>
                  Play Again
                </button>
              </div>
            ) : (
              <button className="start-btn" onClick={testTheAnswer}>
                Check answers
              </button>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default Quiz;
