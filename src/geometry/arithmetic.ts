/**
 * I dont like the limit decimal method this forces conversion to string rather then just dropping precision
 * @param {number} num 
 * @param {number} limit 
 * @return {number}
 */
export const round = (num: number, limit: number) => {
	if(!limit) return Math.round(num);
	const l = 10**limit;
	return Math.round(Math.round(num*l))/l;
}

/**
 * Convert radians to degress
 * @param {number} rad 
 * @returns 
 */
export const toDeg = (rad: number):number => rad * 180/Math.PI;

/**
 * Convert degrees to radians
 * @param deg 
 * @returns 
 */
export const toRad = (deg: number):number => deg * Math.PI/180;
