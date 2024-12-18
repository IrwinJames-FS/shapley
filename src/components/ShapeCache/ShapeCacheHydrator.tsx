'use client';
import { FC, useEffect } from "react";
import { DCache } from "../../geometry";

export const ShapeCacheHydrator:FC<{cache:DCache}> = ({cache}) => {
	useEffect(()=>{
		console.log("I am mounted");
	})
	return (<p style={{display: 'none'}}>I loaded</p>);
}