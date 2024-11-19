import { useState } from "react";

import { Provider } from "react-redux";
import store from "./store/store";

import PuppyDetails from "./features/puppies/PuppyDetails";
import PuppyList from "./features/puppies/PuppyList";
import PuppyForm from "./features/puppies/PuppyForm";

import "./App.scss";

export default function App() {
  const [selectedPuppyId, setSelectedPuppyId] = useState();

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
