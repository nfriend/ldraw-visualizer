/// <reference path="../../typings/references.ts" />
/// <reference path="../utility.ts" />

module LdrawVisualizer.Parser {
	export class Coordinates {

		constructor(x: number, y: number, z: number) {
			this.X = x;
			this.Y = y;
			this.Z = z;
		}

		X: number;
		Y: number;
		Z: number;

		IsValid(): boolean {
			return Utility.isNumber(this.X)
				&& Utility.isNumber(this.Y)
				&& Utility.isNumber(this.Z);
		}
	}
}