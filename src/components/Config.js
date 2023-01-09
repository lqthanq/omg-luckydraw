import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../context";
import { useInterval } from "../hooks/useInterval";
import { getRandom } from "../utils";

export function Config() {
  // Context
  const { eventName, to, from, excludes, setState } = useAppContext();
  const handleInputChange = useCallback(
    (e) => {
      e.preventDefault();
      let { value, name } = e.target;
      setState({ [name]: value });
    },
    [setState]
  );

  const [res, setRes] = useState(null);
  const [isRun, setIsRun] = useState(false);

  // Hooks

  const handleCalcu = useCallback(() => {
    const t = Number(to);
    const f = Number(from);
    const ex = excludes.split(/[\t\n,]/).map((x) => x.trim() && Number(x));
    const res = getRandom(t, f, ex);
    setRes(`${res}`.padStart(from.length, "0"));
  }, [to, from, excludes]);

  const [start, clear] = useInterval(handleCalcu, 350);

  const handleRun = useCallback(() => {
    setIsRun(true);
    start();
  }, [start]);

  const handlePause = useCallback(() => {
    setIsRun(false);
    clear();
  }, [clear]);

  const handleContinue = useCallback(
    (e) => {
      e.preventDefault();
      setState({ step: 2 });
    },
    [setState]
  );

  useEffect(() => {
    const res = to.padStart(from.length, "0");
    setRes(res);
  }, [to, from]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-6">
        <input
          type="text"
          name="eventName"
          onChange={handleInputChange}
          placeholder="Enter event name"
          value={eventName}
        />
        <input
          type="number"
          name="to"
          onChange={handleInputChange}
          placeholder="Enter range start"
          value={to}
          min={0}
        />
        <input
          type="number"
          name="from"
          onChange={handleInputChange}
          placeholder="Enter range end"
          value={from}
          max={10_000}
        />
        <textarea
          rows={3}
          name="excludes"
          onChange={handleInputChange}
          placeholder="Enter exclude"
          value={excludes}
        />
        <div className="mb-6">
          <span className="font-bold font-5xl">{res}</span>
        </div>
        <div className="flex gap-8 ">
          <button type="button" children="Continue" onClick={handleContinue} />
          <button
            type="button"
            children={isRun ? "Pause" : "Run"}
            onClick={isRun ? handlePause : handleRun}
          />
        </div>
      </div>
    </div>
  );
}
