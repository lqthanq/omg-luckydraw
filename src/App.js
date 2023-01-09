import React, { useReducer } from "react";
import { Config } from "./components/Config";
import { MainLayout } from "./components/MainLayout";
import { AppContextProvider } from "./context";

function App() {
  const [state, setState] = useReducer((p, state) => ({ ...p, ...state }), {
    step: 1,
    to: "1",
    from: "1000",
    excludes: "1, 2",
    eventName: "Yep",
    background: null,
  });

  // Markup
  const content = {
    1: <Config />,
    2: <MainLayout />,
  };

  console.log('state:', state);

  return (
    <AppContextProvider {...state} setState={setState}>
      {content[state.step]}
    </AppContextProvider>
  );
}

export default App;
