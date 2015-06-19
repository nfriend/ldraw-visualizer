/// <reference path="../../../typings/references.ts" />
/// <reference path="../../utility.ts" />
/// <reference path="./LdrawFileLine.ts" />
/// <reference path="../Coordinates.ts" />
/// <reference path="./LineTypes.ts" />

module LdrawVisualizer.Parser.Lines {
	export class TriangleLine extends LdrawFileLine {
		constructor(color: number, point1: Coordinates, point2: Coordinates, point3: Coordinates) {
			super(LdrawFileLineType.Triangle);

			this.Color = color;
			this.Point1 = point1;
			this.Point2 = point2;
			this.Point3 = point3;
		}

		Color: number;
		Point1: Coordinates;
		Point2: Coordinates;
		Point3: Coordinates;
		
		IsValid(): boolean {
			return Utility.isValidColorCode(this.Color)
				&& this.Point1.IsValid()
				&& this.Point2.IsValid()
				&& this.Point3.IsValid();
		}
	}
}