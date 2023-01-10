import { useCallback } from "react";
import { useAppContext } from "../context";
import { Wrapper } from "./Wrapper";

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

  const handleContinue = useCallback(
    (e) => {
      e.preventDefault();
      setState({ step: 2 });
    },
    [setState]
  );

  return (
    <Wrapper>
      <h2 className="text-2xl font-bold line-height text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight text-center mb-4">
        Configures for Lucky draw
      </h2>
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="eventName"
                className="block text-sm font-medium text-gray-700"
              >
                Event Name
              </label>
              <input
                type="text"
                name="eventName"
                id="eventName"
                onChange={handleInputChange}
                placeholder="Enter event name"
                value={eventName}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700"
              >
                Min
              </label>
              <input
                type="number"
                name="from"
                id="from"
                onChange={handleInputChange}
                placeholder="Enter range start"
                value={from}
                max={0}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="to"
                className="block text-sm font-medium text-gray-700"
              >
                Max
              </label>
              <input
                type="number"
                name="to"
                id="to"
                onChange={handleInputChange}
                placeholder="Enter range end"
                value={to}
                min={10_000}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                  rows={3}
                  name="excludes"
                  id="excludes"
                  onChange={handleInputChange}
                  placeholder="Enter value should exclude"
                  value={excludes}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            children="Continue"
            onClick={handleContinue}
          />
        </div>
      </div>
    </Wrapper>
  );
}
