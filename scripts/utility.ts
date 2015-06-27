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
		console.log(e[0], e[4], e[8], e[12]);
		console.log(e[1], e[5], e[9], e[13]);
		console.log(e[2], e[6], e[10], e[14]);
		console.log(e[3], e[7], e[11], e[15]);
		console.log('---------------');
	}
	
	export function hexStringToHexNumber(hexString: string): number {
		return parseInt(hexString.replace(/#/g, ''), 16);
	}
	
	export function fixFilePath(filePath: string): string {
		return filePath.toLowerCase().replace(/\\/g, '/');
	}
}	