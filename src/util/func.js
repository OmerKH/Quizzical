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

export default selectAnOption;
