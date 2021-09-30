import { Dialog, Transition } from '@headlessui/react';
import * as React from 'react';
import { Fragment } from 'react';
import Button from '../Button/Button';

type ErrorProps = {
  isErrorModal: boolean;
  errTitle: string;
  errMsg: string;
  setErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ErrorDialog = ({ isErrorModal, errTitle, errMsg, setErrorModal }: ErrorProps) => {
  function closeModal() {
    setErrorModal(false);
  }
  return (
    <>
      <Transition appear show={isErrorModal} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-warn-600 flex justify-center">
                  {errTitle}
                </Dialog.Title>
                <div className="mt-3 flex justify-center">
                  <p className="text-sm text-gray-500">{errMsg}</p>
                </div>

                <div className="mt-5">
                  <div className="flex justify-center">
                    <Button varient="warn" onClick={closeModal}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
