import Flashcard from "./flashcard";

export default function FlashcardsList({ flashcards }) {
  return (
    <div className="card-grid">
      {flashcards.map((flashcard) => (
        <Flashcard flashcard={flashcard} key={flashcard.id} />
      ))}
    </div>
  );
}
