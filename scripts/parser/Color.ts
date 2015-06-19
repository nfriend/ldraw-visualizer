/// <reference path="../../typings/references.ts" />
/// <reference path="../utility.ts" />

module LdrawVisualizer.Parser {
	export class Color {
		constructor(hexValue: string) {
			this.HexValue = hexValue;
		}
		
		HexValue: string;
		
		IsValid(): boolean {
			return Utility.isValidColorHexString(this.HexValue);
		}
	}
}