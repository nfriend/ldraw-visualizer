/// <reference path="../../typings/references.ts" />
/// <reference path="../utility.ts" />

module LdrawVisualizer.Parser {
	export class Color {
		constructor(hexValue: string, alpha: number = 255) {
			this.HexValue = hexValue;
			this.Alpha = alpha;
		}
		
		HexValue: string;
		Alpha: number;
		
		IsValid(): boolean {
			return Utility.isValidColorHexString(this.HexValue);
		}
	}
}