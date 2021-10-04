import { useEffect, useState } from "react";
import { Card } from "../../Components/Card/Card";
import { PharmacyData } from "../../Types/types";

type StoreProps = {};

export const Store = (props: StoreProps) => {
  const [data, setData] = useState<PharmacyData[]>();

  useEffect(() => {
    async function fetchPharmacyJSON() {
      const res = await fetch("http://localhost:8080/api/pharmacies/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: {
            limit: 10,
          },
          query: {},
        }),
      });
      const data: PharmacyData[] = await res.json();
      if (data) {
        setData(data);
      }
    }
    fetchPharmacyJSON();
  }, []);

  return (
    <>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 gap-6 xl:grid-cols-6 sm:grid-cols-4'>
          {data &&
            data.map((item) => {
              return <Card key={item.id} data={item} />;
            })}
        </div>
      </div>
    </>
  );
};
