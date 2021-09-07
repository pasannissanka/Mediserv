import { Menu } from "@headlessui/react";
import * as React from "react";
import Button from "../Button/Button";
// import { usePopper } from "react-popper";
import { ActionItemProp } from "./types";

export function ActionItem(props: ActionItemProp) {
  return (
    <React.Fragment>
      <Menu
        as='td'
        className='relative border-dashed border-t border-gray-200 px-3'
      >
        <Menu.Button as={Button} varient='flat'>
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
        <Menu.Items className='ring-primary-700 absolute z-50 left-0 mt-2 bg-white rounded-md focus:outline-none shadow-lg ring-1 ring-opacity-5'>
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
        </Menu.Items>
      </Menu>
    </React.Fragment>
  );
}
