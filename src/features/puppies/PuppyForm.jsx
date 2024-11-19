import { useState } from "react";
import { useAddPuppyMutation } from "./puppySlice";

export default function PuppyForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  const [addPuppy, { isLoading, error }] = useAddPuppyMutation();

  function postPuppy(event) {
    event.preventDefault();

    const imageUrl = "https://loremflickr.com/200/300/dog";

    const newPuppy = {
      name,
      breed,
      imageUrl,
    };

    addPuppy(newPuppy)
      .unwrap()
      .then(() => {
        setName("");
        setBreed("");
      })
      .catch((err) => {
        console.error("Error adding puppy:", err);
      });
  }

  return (
    <>
      <h2>Add a Puppy</h2>
      <form onSubmit={postPuppy}>
        <label>
          Name
          <input
            name="puppyName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Breed
          <input
            name="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add to Roster"}
        </button>
        {isLoading && <output>Uploading puppy information...</output>}
        {error && <output>Error: {error.message}</output>}
      </form>
    </>
  );
}
