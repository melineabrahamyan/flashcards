import { useState } from "react";
import FlashcardsList from "./flashcardList";

function App() {
  const [flashcards, setFlashcards] = useState(FLASHCARDS);
  return (
    <div className="App">
      <FlashcardsList flashcards={flashcards} />
    </div>
  );
}

const FLASHCARDS = [
  { id: 1, question: "What is 2+2", answer: 4, options: [1, 2, 4, 10] },
  {
    id: 2,
    question: "What is the capital of France",
    answer: "Paris",
    options: ["Paris", "Moscow", "Berlin", "London"],
  },
];

export default App;
