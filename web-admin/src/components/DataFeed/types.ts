import { ElementAction, DataTableState } from "../DataTable/types"

export interface KeyValueObject {
  key: string;
  value: string;
}

export interface FeedElement {
  /**
   * unique identifier
   */
  id: string;
  /**
   * Heading
   */
  heading: string;
  /**
   * Sub-heading
   */
  subHeading?: string;
  /**
   * Timestamp ex- 2021-02-28T11:47:22.908Z
   */
  timeStamp?: string;
  /**
   * src url
   */
  img_src?: string;
  /**
   * image type
   * @todo small, medium
   */
  img_type?: "avatar" | "small" | "medium";
  /**
   * text message in string format or
   * key value pair object array
   */
  content: string;
  /**
   * card actions
   */
  actions?: ElementAction[];
}

export interface FeedProps {
  size?: "sm" | "md" | "lg";
  type?: "message" | "article";
 }

export interface DataFeedProps extends DataTableState {
  /**
   * Size of the card
   */
  size?: "sm" | "md" | "lg";
  /**
   * message card or article card
   * @todo article card not implemenented
   */
  type?: "message" | "article";
}

export interface ListItemMsgProps {
	data: FeedElement;
	id: number;
	handleExpand: (index: number) => void;
	expand: boolean;
}
