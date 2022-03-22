import { useEffect, useState } from "react";
import { Card } from "../../Components/Card/Card";
import { PharmacyData } from "../../Types/types";

type StoreProps = {};

export const Store = (props: StoreProps) => {
  const [data, setData] = useState<PharmacyData[]>();

  useEffect(() => {
    async function fetchPharmacyJSON() {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/public/pharmacies/search`,
        {
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
        }
      );
      const data: PharmacyData[] = await res.json();
      if (data) {
        setData(data);
      }
    }
    try {
      fetchPharmacyJSON();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-6 sm:grid-cols-4">
          {data &&
            data.length > 0 &&
            data.map((item) => {
              return <Card key={item.id} data={item} />;
            })}
        </div>
      </div>
    </>
  );
};
