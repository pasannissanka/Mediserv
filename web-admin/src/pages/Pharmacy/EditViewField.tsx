import * as React from "react";
import { useState } from "react";
import Button from "../../components/Button/Button";

export type EditViewFieldProps = {
  title: string;
  children: React.ReactNode;
  editView: React.ReactNode;
  onSubmit(e: any): void;
};

export function EditViewField({
  title,
  children,
  editView,
  onSubmit,
}: EditViewFieldProps) {
  const [state, setState] = useState<boolean>(true);

  return (
    <>
      <div className='bg-white rounded-lg border p-3 mb-2 flex flex-col'>
        <div className='flex justify-between'>
          <span className='font-medium mb-1'>{title}</span>
          {/* edit button */}
          <Button
            className='mb-2 max-h-8'
            onClick={() => {
              setState((state) => !state);
            }}
            varient='outline-primary'
            size='sm'
          >
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                />
              </svg>
            </span>
          </Button>
        </div>
        {state ? (
          <div>{children}</div>
        ) : (
          <div className={`w-full mb-2 `}>
            {editView}
            <div className='float-right mt-3'>
              <Button
                varient='outline-primary'
                className='mr-2'
                onClick={() => {
                  setState((state) => !state);
                }}
              >
                Cancel
              </Button>
              <Button varient='primary' onClick={onSubmit}>
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
