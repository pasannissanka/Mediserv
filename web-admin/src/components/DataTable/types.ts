export interface LabelKeyValue {
  key: string;
  value: string;
  selected?: boolean;
}

export interface SearchFields {
  /**
   * search query
   */
  search: string;
  /**
   * search field
   */
  searchBy?: string;
  /**
   * limit - useed for pagination
   */
  limit: number;
  /**
   * offset - used for pagination
   */
  offset: number;
}

export interface ElementAction {
  title: string;
  action: (key: number, event?: any) => void;
  svg: React.ReactNode;
}

export interface ActionItemProp {
  id: number;
  index: number;
  eleActions: ElementAction[];
}

/**
 * Types for DataTableContext
 */
export interface DataTableState {
  /**
   * Total count (count sent from api or data.length)
   */
  totalCount: number | undefined;
  /**
   * Data to display
   * @todo make generic typings
   */
  dataList: any[];
  /**
   * SetDataList: useSetState
   */
  setdataList?: React.Dispatch<any>;
  /**
   * Loading state
   */
  loading: boolean;
  /**
   * Labels to filter
   */
  labelState?: LabelKeyValue[];
  /**
   * Labels setState
   */
  setLabelState?: React.Dispatch<React.SetStateAction<LabelKeyValue[]>>;
  /**
   * Supported Search fields
   */
  searchFields?: LabelKeyValue[];
  /**
   * searchFieldsSetState
   */
  setSearchFields?: React.Dispatch<React.SetStateAction<LabelKeyValue[]>>;
  /**
   * Search query and pagination controls
   */
  search?: SearchFields;
  /**
   * setSearchState
   */
  setSearch?: React.Dispatch<React.SetStateAction<SearchFields>>;
}

export interface DataTableProps extends DataTableState {
  /**
   * Primary Actions of the module
   */
  globalActions?: React.ReactNode;
  /**
   * Actions applies to individual data elements
   * @todo : implement filter method to filter actions based on
   *        state/ status of data element.
   * @todo : add to context if possible
   */
  eleActions?: any[];
}

export interface TableProps {
  /**
   * Actions applies to individual data elements
   * TODO : implement filter method to filter actions based on
   *        state/ status of data element.
   * TODO : add to context if possible
   */
  eleActions?: ElementAction[];
}

export interface SearchFilterProps {
  /**
   * Primary Actions of the module
   */
  globalActions?: React.ReactNode;
}

export interface FilterMenuProps {
  type: "checkbox" | "radio";
}
