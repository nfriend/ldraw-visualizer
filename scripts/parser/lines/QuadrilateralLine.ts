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
		
		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.QuadrilateralLine {
			var point1Coords = new Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10)),
				point2Coords = new Coordinates(parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10)),
				point3Coords = new Coordinates(parseInt(splitLine[8], 10), parseInt(splitLine[9], 10), parseInt(splitLine[10], 10)),
				point4Coords = new Coordinates(parseInt(splitLine[11], 10), parseInt(splitLine[12], 10), parseInt(splitLine[13], 10)),
				quadLine = new Lines.QuadrilateralLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, point3Coords, point4Coords);

			if (!quadLine.IsValid()) {
				throw 'Unable to parse quadrilateral line: Invalid line arguments on line ' + lineNumber;
			}

			return quadLine;
		}
	}
}