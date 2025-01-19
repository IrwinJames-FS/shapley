import { FC } from "react";
import { ShapeCacheProps } from "../../ShapeCache";
import dynamic, { LoaderComponent } from "next/dynamic";
import { DCacheItem } from "../../../geometry";

import './style.css';
import CacheClient, { NextShapeCacheClientProps } from "./CacheClient.js";

const Cache:FC<ShapeCacheProps> = ({shapes={}}) => {
	const cache = Object.entries(shapes).map(([k, d])=>[k, d.isObjectBounding ? d.cached() : d.toObjectBounding().cached()] as [string, DCacheItem]);
	return (<CacheClient shapes={cache}/>)
}
export default Cache;