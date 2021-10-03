import { toUnicode } from "punycode";
import { useEffect, useState } from "react";
import { Card } from "../../Components/Card/Card";

type StoreProps = {};

export const Store = (props: StoreProps) => {
  
  const [data, setData] = useState(
    
  );

  useEffect(() => {
    async function fetchPharmacyJSON() {
      const res = await fetch("/api/pharmacies/search", {
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
      const data = await res.json();
      console.log(data);
      setData(data);
    }
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-6 sm:grid-cols-4"></div>
        
          
        
      </div>
    </>
  );
};

function setTodos(data: any) {
  throw new Error("Function not implemented.");
}

