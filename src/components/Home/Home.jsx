import React from "react";

function Home({ startGame }) {
  return (
    <div className="container">
      <h2 className="titel">Quizzical</h2>
      <p>Answer 5 questions correct to win</p>
      <button className="start-btn" onClick={startGame}>
        Start
      </button>
    </div>
  );
}

export default Home;
