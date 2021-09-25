import React from "react";

interface ModalPanelProps {
  size?: "small" | "medium" | "large" | "xl";
  title: string;
  titleSVG?: React.SVGProps<SVGSVGElement>;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  closeAction: (value: boolean) => void;
  initialFocus: React.MutableRefObject<null>;
}

export default function ModalPanel({
  title,
  titleSVG,
  children,
  footerContent,
  closeAction,
  size = "medium",
  initialFocus,
}: ModalPanelProps) {
  const titleLabel = `${title}Label`;
  return (
    <section
      className={`fixed inset-y-0 right-0 z-50 w-screen bg-white shadow-xl  focus:outline-none
      ${
        size === "small"
          ? "max-w-md"
          : size === "medium"
          ? "max-w-xl"
          : size === "large"
          ? "max-w-4xl"
          : size === "xl"
          ? "max-w-screen-2xl"
          : ""
      }`}
      aria-labelledby={titleLabel}
    >
      <div className='p-2 transform'>
        {/* <!-- Close button --> */}
        <button
          onClick={() => closeAction(false)}
          ref={initialFocus}
          className='p-2 text-black rounded-md focus:outline-none focus:ring'
        >
          <svg
            className='w-5 h-5'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
      {/* <!-- Panel content --> */}
      <div className='flex flex-col h-screen'>
        {/* <!-- Panel header --> */}
        <div className='flex flex-col items-center justify-center flex-shrink-0 px-4 py-2 space-y-2 border-b'>
          <span
            aria-hidden='true'
            className='text-gray-500 dark:text-indigo-600'
          >
            {titleSVG}
          </span>
          <h2
            id={titleLabel}
            className='text-xl font-medium text-gray-500 dark:text-light'
          >
            {title}
          </h2>
        </div>
        {/* <!-- Content --> */}
        <div className='flex-1 overflow-hidden hover:overflow-y-auto'>
          {/* Content goes here */}
          {children}
          {/* <!-- Footer content --> */}
        </div>
        <div className=' h-28 my-1 border-t'>{footerContent}</div>
      </div>
    </section>
  );
}
