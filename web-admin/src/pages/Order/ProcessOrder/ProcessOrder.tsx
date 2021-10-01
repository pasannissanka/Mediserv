import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { OrderInfoProp } from "../Order";
import { ReactComponent as UndrawVoid } from "../../../svg/undraw_void.svg";

export const ProcessOrder = ({ orderInfo }: OrderInfoProp) => {
  const { token } = useContext(AuthContext);

  const [image, setImage] = useState<any>();

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(
        `http://localhost:8080/api/file/download/${orderInfo?.prescriptionImgUrl}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const imageBlob = await response.blob();
      console.log(imageBlob);
      if (imageBlob.type === "image/jpeg") {
        const image = URL.createObjectURL(imageBlob);
        setImage(image);
      }
    };
    fetchImage();
  }, [orderInfo]);

  return (
    <div className='w-full h-full overflow-hidden'>
      <div className=' flex-auto grid h-full grid-cols-1 lg:grid-cols-5 gap-y-2 lg:gap-2 py-3 px-4'>
        <div className='col-span-1 lg:col-span-3 bg-white rounded-lg border px-6 py-2 overflow-auto'>
          <div className=''>
            {image !== undefined ? (
              <img src={image} alt='prescriptionImage' />
            ) : (
              <div>
                <UndrawVoid className='max-h-72 h-36 md:h-48 lg:h-72 my-8 w-full' />
                <span className='flex justify-center text-gray-600'>
                  Prescription Image not found!
                </span>
              </div>
            )}
          </div>
        </div>
        <div className='col-span-1 lg:col-span-2 bg-white rounded-lg border px-6 py-2 overflow-auto'>
          <div className=''>Items</div>
        </div>
      </div>
    </div>
  );
};
