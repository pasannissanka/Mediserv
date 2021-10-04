import * as React from "react";
import Button from "../../components/Button/Button";
import { ReactComponent as PharmacySvg } from "../../svg/pharmacy.svg";
import { EditViewField } from "./EditViewField";

export const Pharmacy = () => {
  return (
    <>
      <div className='container mx-auto px-4'>
        <h1 className='text-2xl py-4 mb-2'>Pharmacy</h1>
        {/* banner  */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
          <div className='col-span-1'>
            <div className='bg-white rounded-lg border max-h-80 w-11/12 p-3 '>
              <span className='font-medium mb-2'>Banner</span>
              <Button
                size='sm'
                className='float-right'
                varient='outline-primary'
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
              <PharmacySvg className='max-h-44 h- md:h-48 lg:h-60 my-8 w-full' />
              <span className='flex justify-center text-gray-600'>
                Didn't set a banner yet
              </span>
            </div>
          </div>

          {/* fields */}
          <div className='col-span-1 md:col-span-2 flex flex-col w-full mx-auto'>
            {/* title */}
            <EditViewField
              title='Title'
              onSubmit={(e) => console.log(e)}
              editView={<input className='w-full' type='text' />}
            >
              {/* children */}
              <div>New Pharmacy LTD</div>
            </EditViewField>
            <EditViewField
              title='Discription'
              onSubmit={(e) => console.log(e)}
              editView={<textarea rows={3} className='w-full' />}
            >
              <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </div>
            </EditViewField>
            <EditViewField
              title='Contact number'
              onSubmit={(e) => console.log(e)}
              editView={<input className='w-full' type='text' />}
            >
              <div>07712345678</div>
            </EditViewField>
            <EditViewField
              title='Email'
              onSubmit={(e) => console.log(e)}
              editView={<input className='w-full' type='text' />}
            >
              <div>newPharmacy@gmail.com</div>
            </EditViewField>
            <EditViewField
              title='Address'
              onSubmit={(e) => console.log(e)}
              editView={<input className='w-full' type='text' />}
            >
              <div className='flex flex-col'>
                <span>No 100</span>
                <span> New Lanka pharmacy LTD.</span>
                <span> Colombo 7</span>
              </div>
            </EditViewField>
          </div>
        </div>
      </div>
    </>
  );
};
