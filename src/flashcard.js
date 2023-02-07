import { useState } from "react";
import "./app.css";

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => {
        setFlip(!flip);
      }}
    >
      {flip ? (
        <div className="back">{flashcard.answer}</div>
      ) : (
        <div className="front">
          <p>{flashcard.question}</p>
          <div className="flashcard-options">
            {flashcard.options.map((option) => {
              return <div className="flashcard-option">{option}</div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
