module LdrawVisualizer.Utility {
	export function isString(obj) {
		return Object.prototype.toString.call(obj) === '[object String]';
	}
	
	export function isNumber(obj) {
		return Object.prototype.toString.call(obj) === '[object Number]' && !isNaN(<number>obj);
	}
	
	export function isInt(obj) {
		return isNumber(obj) && (obj % 1) === 0;
	}
	
	export function isByte(obj) {
		return isInt(obj) && obj >= 0 && obj <= 255;
	}
	
	export function isArray(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	}

	export function isValidColorCode(obj) {
		return isInt(obj) && obj >= 0 && obj <= 511;
	}
	
	export function isValidColorHexString(obj) {
		return isString(obj) && obj && /^#[a-f0-9]{6}$/i.test(obj);
	}
	
	export function isNullOrUndefined(obj) {
		return obj === null || typeof obj === 'undefined';
	}
}	