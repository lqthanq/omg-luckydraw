import React, { useCallback, useEffect, useReducer, useRef } from "react";
import { useAppContext } from "../context";
import { useInterval } from "../hooks/useInterval";
import { genPadStart, getRandom } from "../utils";
import { Wrapper } from "./Wrapper";

export function Content() {
  const {
    eventName,
    to,
    from,
    excludes,
    setState: setStateProp,
    delay,
  } = useAppContext();

  // State
  const [state, setState] = useReducer((p, state) => ({ ...p, ...state }), {
    res: "",
    isRun: false,
    excludes: excludes || "",
  });

  const currentRes = useRef(null);

  useEffect(() => {
    const ex = genEx(state.excludes);
    let tmp = parseInt(from, 10);
    while (ex.includes(tmp)) {
      tmp += 1;
    }
    const res = genPadStart(tmp, to.length);

    setState({ res });
  }, [to, from, state.excludes]);

  // Actions
  const handleCalcu = useCallback(() => {
    const t = Number(to);
    const f = Number(from);
    const ex = genEx(state.excludes);
    const res = getRandom(f, t, ex);

    const newVal = genPadStart(res, to.length);
    setState({ res: newVal });
  }, [to, from, state.excludes]);

  const [start, clear] = useInterval(handleCalcu, delay);

  const handleRun = useCallback(() => {
    if (currentRes.current) {
      const ex = joinEx(state.excludes, `${parseInt(currentRes.current, 10)}`);
      setState({ excludes: ex });
    }
    setState({ isRun: true });
    start();
  }, [start, state.excludes]);

  const handlePause = useCallback(() => {
    setState({ isRun: false });
    clear();
    currentRes.current = state.res;
  }, [clear, state.res]);

  const handleConfig = useCallback(
    (e) => {
      e.preventDefault();

      let ex = state.excludes;
      if (currentRes.current) {
        ex = joinEx(state.excludes, `${parseInt(currentRes.current, 10)}`);
      }
      setStateProp({ step: 1, excludes: ex });
    },
    [setStateProp, state.excludes]
  );

  const handleInputChange = useCallback((e) => {
    const { value } = e.target;
    setState({ excludes: value });
  }, []);

  const len = state.res?.length;
  return (
    <React.Fragment>
      <Wrapper>
        <h2 className="text-2xl font-bold line-height text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight text-center mb-4">
          {eventName}
        </h2>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-x-6 gap-y-10">
              {len > 0 ? (
                <div
                  className={`col-span-6 sm:col-span-6 mx-auto grid grid-cols-${len} gap-x-6 gap-y-10 w-full`}
                >
                  {Array.from({ length: len }).map((_i, i) => {
                    const val = state.res[i];
                    return (
                      <div
                        key={`item-${i}`}
                        className={`col-span-1 bg-gray-50 text-center py-4 rounded-lg`}
                      >
                        <span className="text-8xl text-gray-700">{val}</span>
                      </div>
                    );
                  })}
                </div>
              ) : null}
              <div className="col-span-6 sm:col-span-6 mx-auto w-4/12">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-11/12 ml-2"
                  children={state.isRun ? "Pause" : "Run"}
                  onClick={state.isRun ? handlePause : handleRun}
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="excludes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Excludes
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="excludes"
                    id="excludes"
                    onChange={handleInputChange}
                    value={state.excludes}
                    placeholder="Enter value should exclude"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              children="Config"
              onClick={handleConfig}
            />
          </div>
        </div>
      </Wrapper>
    </React.Fragment>
  );
}

function genEx(excludes) {
  if (typeof excludes !== "string") return [];
  return excludes
    .split(/[\t\n,]/)
    .map((x) => (x.trim() ? Number(x) : null))
    .filter(Boolean)
    .filter((el, i, arr) => arr.lastIndexOf(el) === i);
}

function joinEx(excludes, val) {
  const newEx = genEx(excludes);
  if (newEx.includes(parseInt(val, 10))) {
    return excludes;
  }
  return [excludes, val].filter(Boolean).join(",");
}
