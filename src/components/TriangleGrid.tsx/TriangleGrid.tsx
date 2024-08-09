import { CSSProperties, FC } from "react"
import { TriangleGridProps } from "./types"
import Shape from "../Shape"
import './styles.scss';
import TriangleCell from "./TriangleCell";
const TriangleGrid: FC<TriangleGridProps> = ({children, perRow=10, spacing = '1px'}) => {
	const s = typeof spacing === 'number' ? `${spacing}px`:spacing
	return (<div {...{
		className: 'shapely-trigrid',
		style: {
			'--per-row': perRow
		} as CSSProperties
	}}>
		{(Array.isArray(children) ? children:[children]).map((c, i)=>(<TriangleCell {...{
				row: Math.floor(i/perRow),
				column: i%perRow,
				spacing: s
			}}>
				<Shape key={i} sides={3} >{c}</Shape>
			</TriangleCell>))
		}
	</div>);
};

export default TriangleGrid;