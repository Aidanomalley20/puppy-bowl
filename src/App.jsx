import { useEffect } from "react";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";

import PuppyDetails from "./features/puppies/PuppyDetails";
import PuppyList from "./features/puppies/PuppyList";
import PuppyForm from "./features/puppies/PuppyForm";

import "./App.scss";

export default function App() {
  const [selectedPuppyId, setSelectedPuppyId] = useState(null);

  console.log("Selected Puppy ID in App:", selectedPuppyId);
  useEffect(() => {
    console.log("Selected Puppy ID in App:", selectedPuppyId);
  }, [selectedPuppyId]);
  return (
    <Provider store={store}>
      <h1>Puppy Bowl</h1>
      <PuppyForm />
      <main>
        <PuppyList setSelectedPuppyId={setSelectedPuppyId} />
        <PuppyDetails
          selectedPuppyId={selectedPuppyId}
          setSelectedPuppyId={setSelectedPuppyId}
        />
      </main>
    </Provider>
  );
}
