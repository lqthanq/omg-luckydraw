import React, { useEffect, useReducer } from "react";
import { Config } from "./components/Config";
import { Content } from "./components/Content";
import { AppContextProvider } from "./context";
import { getURLParameters } from "./utils";

function App() {
  const [state, setState] = useReducer((p, state) => ({ ...p, ...state }), {
    step: 1,
    from: "1",
    to: "100",
    excludes: "",
    eventName: "Year end party",
    background: null,
    delay: 200,
  });

  // Markup
  const content = {
    1: <Config />,
    2: <Content />,
  };

  useEffect(() => {
    const { href } = window.location;
    let { delay, step, to, from, event_name, excludes } =
      getURLParameters(href);
    const state = {};
    if (delay != null) {
      delay = parseInt(delay, 10);
      delay = delay < 100 ? 350 : delay;
      state.delay = delay;
    }

    if (step != null) {
      step = parseInt(step, 10);
      state.step = step;
    }

    if (typeof to === "string" && to) {
      if (parseInt(to, 10) > 0) {
        state.to = to;
      }
    }

    if (typeof from === "string" && from) {
      if (parseInt(from, 10) > 0) {
        state.from = from;
      }
    }

    if (typeof event_name === "string" && event_name) {
      state.eventName = event_name;
    }
    if (typeof excludes === "string" && excludes) {
      state.excludes = excludes;
    }

    setState(state);
  }, []);

  return (
    <AppContextProvider {...state} setState={setState}>
      {content[state.step]}
    </AppContextProvider>
  );
}

export default App;
