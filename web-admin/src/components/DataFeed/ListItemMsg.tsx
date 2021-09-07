import { useDataTableContext } from "../DataTable/Context/DataTableContext";
import * as React from "react";
import * as timeago from "timeago.js";
import { ListItemMsgProps } from "./types";

function ListItemMsg({ data, expand, handleExpand, id }: ListItemMsgProps) {
	const { loading } = useDataTableContext();
	return (
		<React.Fragment>
			<div className="bg-white w-full items-center p-2 rounded-lg shadow">
				<div
					className={`flex flex-1 ${
						loading ? "g-gradient-to-br from-blue-300 to-blue-400" : ""
					}`}
					onClick={() => handleExpand(id)}
				>
					<div className={`flex items-center space-x-4`}>
						{loading ? (
							<div className="bg-gray-200 animate-pulse w-16 h-16 rounded-full"></div>
						) : (
							<img
								src={data?.img_src}
								alt="My profile"
								className={`w-16 h-16 rounded-full bg-light-blue-400`}
							/>
						)}
					</div>
					<div className="flex-grow p-3  ml-1">
						<div className="flex">
							<div
								className={`font-semibold text-gray-700 ${
									loading ? "h-5 w-1/4 bg-gray-200 animate-pulse" : ""
								}`}
								onClick={() => console.log("clicked")}
							>
								{data?.heading}
							</div>
							<div
								className={`font-normal align-middle mt-1 ml-2 text-sm text-gray-500 ${
									loading ? "h-3 w-1/4 bg-gray-200 animate-pulse" : ""
								}`}
							>
								{data?.subHeading}
							</div>
						</div>
						<div
							className={`text-sm max-w-xl mt-1 text-justify text-gray-700 ${
								loading ? "h-14 w-full bg-gray-200 animate-pulse" : ""
							}`}
						>
							{data?.content}
						</div>
					</div>
					<div className={`p-2 ${loading ? "w-14" : ""}`}>
						<div
							className={`text-xs text-gray-500 ${
								loading ? "bg-gray-200 animate-pulse w-full h-3" : ""
							}`}
						>
							{loading ? data.timeStamp : timeago.format(data?.timeStamp!)}
						</div>
					</div>
				</div>
				<div className={`flex justify-end ${expand ? "" : "hidden"}`}>
					<div className="flex text-sm p-2 text-gray-700">
						{data?.actions
							? data?.actions.map((action, i) => (
									<button
										key={i}
										className="w-full flex items-center justify-center bg-transparent hover:text-blue-500 py-2 px-3 focus:outline-none focus:shadow-outline"
										onClick={() => action.action(id)}
									>
										{action.svg}
										<span className="ml-2">{action.title}</span>
									</button>
							  ))
							: null}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default ListItemMsg;
