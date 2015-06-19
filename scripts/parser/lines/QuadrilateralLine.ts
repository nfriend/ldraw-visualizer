/// <reference path="../../../typings/references.ts" />
/// <reference path="../../utility.ts" />
/// <reference path="./LdrawFileLine.ts" />
/// <reference path="../Coordinates.ts" />
/// <reference path="./LineTypes.ts" />

module LdrawVisualizer.Parser.Lines {
	export class QuadrilateralLine extends LdrawFileLine {
		constructor(color: number, point1: Coordinates, point2: Coordinates, point3: Coordinates, point4: Coordinates) {
			super(LdrawFileLineType.Quadrilateral);

			this.Color = color;
			this.Point1 = point1;
			this.Point2 = point2;
			this.Point3 = point3;
			this.Point4 = point4;
		}

		Color: number;
		Point1: Coordinates;
		Point2: Coordinates;
		Point3: Coordinates;
		Point4: Coordinates;

		IsValid(): boolean {
			return Utility.isValidColorCode(this.Color)
				&& this.Point1.IsValid()
				&& this.Point2.IsValid()
				&& this.Point3.IsValid()
				&& this.Point4.IsValid();
		}
	}
}