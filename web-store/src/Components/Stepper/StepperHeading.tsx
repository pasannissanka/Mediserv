import React from "react";

interface StepperData {
  title: string;
}

type StepperHeadingProps = {
  steps: StepperData[];
  selectedIdx: number;
  setStepper: React.Dispatch<React.SetStateAction<number>>;
};

export const StepperHeading = ({ steps, selectedIdx, setStepper }: StepperHeadingProps) => {
  return (
    <>
      <div key="" className="flex items-center mx-4 p-4 pb-6">
        {steps.map((step, idx) => {
          return (
            <React.Fragment key={idx}>
              <div className="flex items-center text-black relative cursor-pointer" onClick={() => setStepper(idx)}>
                <div
                  className={`rounded-full flex flex-wrap justify-center content-center text-center transition duration-200 ease-in-out h-10 w-10 border-2 border-gray-200
                  ${selectedIdx >= idx ? "bg-primary-700 text-white" : ""}
                `}
                >
                  <span className="text-lg text-center">{idx + 1}</span>
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-14 w-32 text-xs font-medium uppercase text-gray-700">
                  {step.title}
                </div>
              </div>
              {idx !== steps.length - 1 && (
                <div
                  className={`flex-auto border-t-2 transition duration-500 ease-in-out
                  ${selectedIdx >= idx + 1 ? "border-primary-500" : " border-gray-200"}
                `}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};
