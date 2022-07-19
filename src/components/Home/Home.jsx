import React from "react";
import bottomBlob from "../../images/blobs.png";

function Home({ startGame }) {
  return (
    <div className="container">
      <h2 className="titel">Quizzical</h2>
      <p>Answer 5 questions correct to win</p>
      <button className="start-btn" onClick={startGame}>
        Start
      </button>
      <img src={bottomBlob} alt="blob" className="blu-blob" />
    </div>
  );
}

export default Home;
