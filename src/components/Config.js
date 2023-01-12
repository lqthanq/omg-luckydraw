import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useCallback } from "react";
import { options } from "../App";
import { useAppContext } from "../context";
import { Wrapper } from "./Wrapper";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Config() {
  // Context
  const { eventName, to, from, setState, selectedOption } = useAppContext();
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

  const handleSelection = useCallback(
    (value) => {
      const unique = new Map(value.map((item) => [item.id, item]));
      const newVal = Array.from(unique.values());

      setState({ selectedOption: newVal });
    },
    [setState]
  );

  const handleRemove = useCallback(
    (id) => () => {
      const newP = selectedOption.filter((item) => item.id !== id);
      setState({ selectedOption: newP });
    },
    [selectedOption, setState]
  );
  return (
    <Wrapper>
      <h2 className="text-2xl font-bold line-height text-white sm:text-4xl sm:tracking-tight text-center mb-4">
        Configures for Lucky draw
      </h2>
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6" 
        style={{ paddingBottom: '4rem'}}
        >
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
            <div className="col-span-6 sm:col-span-6">
              <Listbox
                multiple
                value={selectedOption}
                onChange={handleSelection}
              >
                {({ open }) => {
                  return (
                    <>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                          <span className="block truncate">Chọn Giải</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {(options || []).map((person) => (
                              <Listbox.Option
                                key={person.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "text-white bg-indigo-600"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-8 pr-4"
                                  )
                                }
                                value={person}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate"
                                      )}
                                    >
                                      {person.name}
                                    </span>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
                                          "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  );
                }}
              </Listbox>
              {selectedOption?.length > 0 ? (
                <div className="flex mt-4 gap-4">
                  {selectedOption.map(({ id, name }) => (
                    <span
                      key={id}
                      className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800"
                    >
                      {name}
                      <button
                        type="button"
                        className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:bg-gray-500 focus:text-white focus:outline-none"
                        onClick={handleRemove(id)}
                      >
                        <span className="sr-only">Remove {name}</span>
                        <svg
                          className="h-2 w-2"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 8 8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeWidth="1.5"
                            d="M1 1l6 6m0-6L1 7"
                          />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700"
              >
                From
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
                To
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

            {/* <div className="col-span-6 sm:col-span-6">
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
            </div> */}
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
