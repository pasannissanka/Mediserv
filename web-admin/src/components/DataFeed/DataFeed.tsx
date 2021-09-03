import * as React from "react";
import { DataTableContext } from "../DataTable";
import { DataFeedProps, Feed } from "./index";

export function DataFeed(props: DataFeedProps) {
	return (
		<React.Fragment>
			<DataTableContext.Provider value={props}>
				<Feed size={props.size} type={props.type}/>
			</DataTableContext.Provider>
		</React.Fragment>
	);
}
