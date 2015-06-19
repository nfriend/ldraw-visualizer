/// <reference path="../../../typings/references.ts" />
/// <reference path="../../utility.ts" />
/// <reference path="./LdrawFileLine.ts" />
/// <reference path="../Coordinates.ts" />
/// <reference path="./LineTypes.ts" />

module LdrawVisualizer.Parser.Lines {
	export class LineLine extends LdrawFileLine {
		constructor(color: number, point1: Coordinates, point2: Coordinates) {
			super(LdrawFileLineType.Line);

			this.Point1 = point1;
			this.Point2 = point2;
		}

		Point1: Coordinates;
		Point2: Coordinates;

		IsValid(): boolean {
			return this.Point1.IsValid()
				&& this.Point2.IsValid();
		}
	}
}