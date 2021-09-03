import { createContext, useContext } from "react";
import { DataTableState } from "../types";

/**
 * Data Table Context
 */
export const DataTableContext = createContext<DataTableState>({
	loading: true,
	dataList: [],
	totalCount: 0,
	labelState: [],
	searchFields: [],
	search: { limit: 0, offset: 0, search: "", searchBy: "" },
	setSearch: () => {},
	setdataList: () => {},
	setLabelState: () => {},
	setSearchFields: () => {},
});

export const useDataTableContext = () => useContext(DataTableContext);
