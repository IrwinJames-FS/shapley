import { Type } from "ts-morph"

export const isPrimitive = (type: Type): boolean => type.isUndefined()
|| type.isNull()
|| type.isNever()
|| type.isVoid()
|| type.isBoolean()
|| type.isAny()
|| type.isNumber()
|| type.isString()
|| type.isBigInt()
|| type.isLiteral()