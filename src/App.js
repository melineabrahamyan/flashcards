import { useEffect, useRef, useState } from "react";
import FlashcardList from "./flashcardList";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryRef = useRef();
  const amountRef = useRef();

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php").then((response) =>
      response.json().then((result) => setCategories(result.trivia_categories))
    );
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(
      `https://opentdb.com/api.php?amount=${amountRef.current.value}&category=${categoryRef.current.value}`
    ).then((response) =>
      response.json().then((result) => {
        setFlashcards(
          result.results.map((cards, index) => {
            const answer = stripTags(cards.correct_answer);
            const options = [
              ...cards.incorrect_answers.map((o) => stripTags(o)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: stripTags(cards.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      })
    );
  }

  function stripTags(original) {
    // (A1) CREATE DUMMY ELEMENT & ATTACH HTML
    let ele = document.createElement("div");
    ele.innerHTML = original;

    // (A2) USE TEXT CONTENT TO STRIP TAGS
    return ele.textContent;
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryRef}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountRef}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

export default App;
