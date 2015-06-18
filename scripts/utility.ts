module LdrawVisualizer.Utility {
	export function isString(obj) {
		return Object.prototype.toString.call(obj) === '[object String]';
	}
	
	export function isNumber(obj) {
		return Object.prototype.toString.call(obj) === '[object Number]' && !isNaN(<number>obj);
	}
	
	export function isArray(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
}