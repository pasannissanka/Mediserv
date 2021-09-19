import * as React from "react";
import { useEffect, useState } from "react";
import { useDataTableContext } from "../DataTable/Context/DataTableContext";
import ListItemMsg from "./ListItemMsg";
import { FeedElement, FeedProps } from "./types";

export function Feed({ size, type }: FeedProps) {
  const ctx = useDataTableContext();
  const dataList = ctx.dataList as FeedElement[];

  const [expandedState, setExpandedState] = useState<any[]>([]);

  useEffect(() => {
    if (dataList?.length > 0) {
      setExpandedState([
        ...dataList.map((_) => {
          return {
            expanded: false,
          };
        }),
      ]);
    }
  }, [dataList]);

  const handleExpand = (index: number) => {
    setExpandedState([
      ...expandedState.slice(0, index),
      {
        expanded: !expandedState[index].expanded,
      },
      ...expandedState.slice(index + 1),
    ]);
  };

  return (
    <React.Fragment>
      <div
        className={`container mx-auto flex flex-col space-y-4 justify-center items-center
				${
          size === "sm"
            ? "max-w-sm"
            : size === "md"
            ? "md:max-w-lg max-w-md"
            : "md:max-w-3xl max-w-md"
        }
			`}
      >
        {dataList?.map((data, index) => (
          <ListItemMsg
            data={data}
            key={index}
            id={index}
            handleExpand={handleExpand}
            expand={expandedState[index]?.expanded}
          />
        ))}
      </div>
    </React.Fragment>
  );
}
