import { useEffect } from "react";
import { useGetPuppyQuery, useDeletePuppyMutation } from "./puppySlice";
import PropTypes from "prop-types";

export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  const {
    data: puppy,
    isLoading,
    isError,
    error,
  } = useGetPuppyQuery(selectedPuppyId, { skip: !selectedPuppyId });
  useEffect(() => {
    console.log("Fetched Puppy Data:", puppy);
  }, [puppy]);

  const [
    deletePuppy,
    { isLoading: isDeleting, isError: isDeleteError, error: deleteError },
  ] = useDeletePuppyMutation();

  useEffect(() => {
    if (!puppy && !isLoading) {
      setSelectedPuppyId(null);
    }
  }, [puppy, isLoading, setSelectedPuppyId]);

  function removePuppy(id) {
    console.log("Deleting puppy with ID:", id); // This should log the correct ID
    deletePuppy(id)
      .unwrap()
      .then(() => setSelectedPuppyId(null))
      .catch((err) => console.error("Error deleting puppy:", err)); // Logs any deletion errors
  }

  let $details;
  if (!selectedPuppyId) {
    $details = <p>Please select a puppy to see more details.</p>;
  } else if (isLoading) {
    $details = <p>Loading puppy information...</p>;
  } else if (isError) {
    $details = <p>Error loading puppy details: {error.message}</p>;
  } else if (puppy) {
    $details = (
      <>
        <h3>
          {puppy.player.name} #{puppy.player.id}
        </h3>
        <p>{puppy.player.breed}</p>
        <p>Team {puppy.player.team?.name ?? "Unassigned"}</p>
        <button
          onClick={() => removePuppy(puppy.player.id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Removing..." : "Remove from roster"}
        </button>
        <figure>
          <img src={puppy.player.imageUrl} alt={puppy.name} />
        </figure>
      </>
    );
  }

  return (
    <aside>
      <h2>Selected Puppy</h2>
      {$details}
      {isDeleteError && <p>Error deleting puppy: {deleteError.message}</p>}
    </aside>
  );
}

PuppyDetails.propTypes = {
  selectedPuppyId: PropTypes.number,
  setSelectedPuppyId: PropTypes.func.isRequired,
};
