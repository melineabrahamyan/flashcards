import { useEffect, useState } from "react";
import FlashcardsList from "./flashcardList";

function App() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10").then((response) =>
      response.json().then((result) => {
        setFlashcards(
          result.results.map((flashcard, index) => {
            const answer = flashcard.correct_answer;
            const options = [...flashcard.incorrect_answers, answer];
            return {
              id: `${index} - ${Date.now()}`,
              question: flashcard.question,
              answer: answer,
              options: options.sort(() => 0.5 - Math.random()),
            };
          })
        );
      })
    );
  }, []);

  return (
    <div className="App">
      <FlashcardsList flashcards={flashcards} />
    </div>
  );
}

export default App;
