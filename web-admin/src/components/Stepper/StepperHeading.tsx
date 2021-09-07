import React from "react";

interface StepperData {
  title: string;
  description: string;
}

type StepperHeadingProps = {
  steps: StepperData[];
  selectedIdx: number;
  setStepper: React.Dispatch<React.SetStateAction<number>>;
};

export const StepperHeading = ({
  steps,
  selectedIdx,
  setStepper,
}: StepperHeadingProps) => {
  return (
    <>
      <div
        className={`grid grid-cols-${steps.length} gap-4 w-full my-2 cursor-pointer transition duration-200`}
      >
        {steps.map((step, idx) => {
          return (
            <div
              onClick={() => setStepper(idx)}
              key={idx}
              className={`border-t-4 ${
                selectedIdx >= idx ? "border-primary-500" : "border-gray-200"
              } pt-4`}
            >
              <p className='uppercase text-purple-500 font-medium'>
                {step.title}
              </p>
              <p className='font-semibold text-sm truncate'>
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
