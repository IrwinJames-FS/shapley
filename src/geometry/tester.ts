export type NumberValue = number;
export type StringValue = string;
export type UndefinedValue = undefined;
export type NullValue = null;
export type NeverValue = never;
export type VoidValue = void;
export type BooleanValue = boolean;
export type ObjectValue = object;
export type NumberArrayValue = number[];

export type ObjectModel = {
	name: string
	age: string
}

export type ObjectModelArray = Array<ObjectModel>;
export type GenericArray<T> = T[];

export type GenericModel<T> = {
	data: T,
	name: string
}

export type UnionType = number | string | symbol;

export type TupleType = [number, number];

export type NamedTupleType = [x: number, y: number];