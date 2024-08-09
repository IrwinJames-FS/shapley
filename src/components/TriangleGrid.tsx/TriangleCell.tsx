import { CSSProperties, FC } from "react";
import { TriangleGridCellProps } from "./types";

const TriangleCell: FC<TriangleGridCellProps> = ({children, row, column, spacing}) => {
	const f = !!((row + column) % 2);
	return (<div {...{
		className: "shapely-trigrid-cell" + (!f ? " even-grid-item":""),
		style:{
			gridRowStart: row + 1,
			gridColumnStart: column + 1,
			'--tri-rotation': f ? '0deg':'180deg',
			'--tri-spacing': spacing
		} as CSSProperties
	}}>
		{children}
	</div>);
}

export default TriangleCell