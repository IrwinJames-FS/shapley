import PolygonDefinition from "../PolygonDefinition";
import SVGCache from "../SVGCache/SVGCache";

/**
 * This is just a test component to test the way clip paths interact with components when not object boundng
 * @returns 
 */
const ClipPathTest = () => (<>
<SVGCache>
	<PolygonDefinition sides={3} id="test-path" objectBounding/>
</SVGCache>
<div style={{
	backgroundColor: "#F00",
	clipPath: `url(#test-path-clip)`,
	aspectRatio: '1/1',
	display: 'flex',
	flexFlow: 'column nowrap',
	justifyContent: 'center',
	alignItems: 'center'
}}>Testing</div>
</>);

export default ClipPathTest;