import { FC } from "react"

type Props = {
	headers: string[]
	rows: (string | number)[][]
}
export const ResultTable: FC<Props> = ({
	headers,
	rows
}) => (<table className="result-table">
	<thead>
		<tr>
			{headers.map((h,i)=><th key={i}>{h}</th>)}
		</tr>
	</thead>
	<tbody>
		{rows.map((r,i)=>(<tr key={'row-'+i}>
			{r.map((c, j)=>(<td key={'column-'+j}>{c}</td>))}
		</tr>))}
	</tbody>
</table>)