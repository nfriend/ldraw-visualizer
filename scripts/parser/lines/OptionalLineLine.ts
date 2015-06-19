/// <reference path="../../../typings/references.ts" />
/// <reference path="../LdrawFile.ts" />
/// <reference path="../../utility.ts" />
/// <reference path="./LineTypes.ts" />
/// <reference path="../Coordinates.ts" />

module LdrawVisualizer.Parser.Lines {
	export class OptionalLineLine extends LdrawFileLine {
		constructor(color: number, point1: Coordinates, point2: Coordinates, controlPoint1: Coordinates, controlPoint2: Coordinates) {
			super(LdrawFileLineType.OptionalLine);

			this.Color = color;
			this.Point1 = point1;
			this.Point2 = point2;
			this.ControlPoint1 = controlPoint1;
			this.ControlPoint2 = controlPoint2;
		}

		Color: number;
		Point1: Coordinates;
		Point2: Coordinates;
		ControlPoint1: Coordinates;
		ControlPoint2: Coordinates;

		IsValid(): boolean {
			return Utility.isValidColorCode(this.Color)
				&& this.Point1.IsValid()
				&& this.Point2.IsValid()
				&& this.ControlPoint1.IsValid()
				&& this.ControlPoint2.IsValid();
		}
	}
}