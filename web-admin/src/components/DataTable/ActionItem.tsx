import { useRef, useState } from "react";
import * as React from "react";
// import { usePopper } from "react-popper";
import { ActionItemProp } from "./types";

import { Menu } from "@headlessui/react";

export function ActionItem(props: ActionItemProp) {
  const buttonRef = useRef(null);
  const popperRef = useRef(null);

  const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null);

  // const { styles, attributes } = usePopper(
  // 	buttonRef.current,
  // 	popperRef.current,
  // 	{
  // 		modifiers: [
  // 			{
  // 				name: "arrow",
  // 				options: {
  // 					element: arrowRef,
  // 				},
  // 			},
  // 			{
  // 				name: "offset",
  // 				options: {
  // 					offset: [10, 0],
  // 				},
  // 			},

  // 		],
  // 	}
  // );
  return (
    <React.Fragment>
      <Menu as='td' className='border-dashed border-t border-gray-200 px-3'>
        <Menu.Button
          className='text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg focus:outline-none'
          ref={buttonRef}
        >
          <svg
            className='w-5 h-5 ml-1'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
            />
          </svg>
        </Menu.Button>
        <Menu.Items ref={popperRef}>
          <div ref={setArrowRef} id='arrow' />
          <div className='z-100 relative top-0 right-0 w-40 bg-gray-100 rounded-lg shadow-lg -mr-1 block py-1 overflow-hidden'>
            {props.eleActions.map((action, i) => (
              <Menu.Item key={i}>
                {/* {() => { */}
                <button
                  key={i}
                  className='w-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 hover:text-blue-500 py-2 px-3 focus:outline-none focus:shadow-outline'
                  onClick={() => action.action(props.id)}
                >
                  {action.svg}
                  <span className='ml-2'>{action.title}</span>
                </button>
                {/* }} */}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Menu>
    </React.Fragment>
  );
}
