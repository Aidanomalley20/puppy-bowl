import { useGetPuppiesQuery } from "./puppySlice";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function PuppyList({ setSelectedPuppyId }) {
  const { data, error, isLoading } = useGetPuppiesQuery();

  useEffect(() => {
    console.log("Puppies Data:", data);
  }, [data]);

  if (isLoading) {
    return <p>Loading puppies...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const puppies = data?.data?.players || [];

  console.log("Puppies List:", puppies);

  return (
    <article>
      <h2>Roster</h2>

      {puppies.length === 0 ? (
        <p>No puppies available.</p>
      ) : (
        <ul className="puppies">
          {puppies.map((puppy) => (
            <li key={puppy.id}>
              <h3>
                {puppy.name} #{puppy.id}
              </h3>
              <figure>
                <img src={puppy.imageUrl} alt={puppy.name} />
              </figure>
              <button onClick={() => setSelectedPuppyId(puppy.id)}>
                See details
              </button>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

PuppyList.propTypes = {
  setSelectedPuppyId: PropTypes.func.isRequired,
};
