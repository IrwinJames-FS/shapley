import { FC } from "react";
import './FNSignature.scss';
type ArgProps = {
	name: string,
	type: string,
	value: unknown
}
type Props = {
	name: string
	args: ArgProps[],
	returnValue: {
		type: string,
		value: unknown
	}
};

export const FNSignature: FC<Props> = ({name, args, returnValue}) => (<p className="fnSignature">
	<b className="fnName">{name}</b>
	<span className="fnArguments">
		&#40;{args.map(({name, type, value},i)=>(<>
		<span className="fnArgumentName" key={"argName-"+i}>{name}</span>:
		<i className="fnArgumentType" key={"argType-"+i}>{type}</i>=
		<span className="fnArgumentValue" key={"argType-"+i}>{value as string}</span>{i < args.length-1 && <>,&nbsp;</>}
		</>))}&#41;
	</span>&nbsp;&#8658;
	<span className="fnReturn">&nbsp;
		<i className="fnReturnType">{returnValue.type}</i>&nbsp;=&nbsp;
		<span className="fnReturnValue">{returnValue.value as string}</span>
	</span>
</p>);