import { CSSProperties, FC } from "react"
import { TriangleGridProps } from "./types"
import Shape from "../Shape"
import './styles.scss';
import TriangleCell from "./TriangleCell";
const TriangleGrid: FC<TriangleGridProps> = ({
	children, 
	perRow=10, 
	spacing = '1px'
}) => {
	const s = typeof spacing === 'number' ? `${spacing}px`:spacing
	return (<div {...{
		className: 'shapely-trigrid',
		style: {
			'--per-row': perRow
		} as CSSProperties
	}}>
		{(Array.isArray(children) ? children:[children]).map((c, i)=>(<TriangleCell key={i} {...{
				row: Math.floor(i/perRow),
				column: i%perRow,
				spacing: s
			}}>
				<Shape as="a" href="#" backgroundColor='#F00'  sides={3} >{c}</Shape>
				<Shape as="div"></Shape>
			</TriangleCell>))
		}
	</div>);
};

export default TriangleGrid;