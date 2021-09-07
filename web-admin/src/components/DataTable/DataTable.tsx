import * as React from "react";
import { DataTableContext } from "./Context/DataTableContext";
import { SearchFilter } from "./SearchFilter";
import { Table } from "./Table";
import { DataTableProps } from "./types";

/**
 * Primary UI component for data table
 */
export function DataTable(props: DataTableProps) {
	return (
		<React.Fragment>
			<DataTableContext.Provider value={props}>
				<SearchFilter globalActions={props.globalActions} />
				<Table eleActions={props.eleActions} />
			</DataTableContext.Provider>
		</React.Fragment>
	);
}
