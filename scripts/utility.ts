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
		return isInt(obj) && obj >= 0;
		//return isInt(obj) && obj >= 0 && obj <= 511;
	}

	export function isValidColorHexString(obj) {
		return isString(obj) && obj && /^#[a-f0-9]{6}$/i.test(obj);
	}

	export function isNullOrUndefined(obj) {
		return obj === null || typeof obj === 'undefined';
	}

	export function hasAtLeastOneNonWhitespaceCharacter(s: string) {
		return /^(?!\s*$).+/.test(s);
	}

	export function isNonEmpty(s: string) {
		return !(/^\s+$/.test(s));
	}

	export function logMatrix(matrix: THREE.Matrix4) {
		var e = matrix.elements;
		console.log(e[0], e[1], e[2], e[3]);
		console.log(e[4], e[5], e[6], e[7]);
		console.log(e[8], e[9], e[10], e[11]);
		console.log(e[12], e[13], e[14], e[15]);
	}
}	