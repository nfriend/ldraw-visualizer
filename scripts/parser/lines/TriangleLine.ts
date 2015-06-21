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
		
		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.TriangleLine {
			var point1Coords = new Coordinates(parseFloat(splitLine[2]), parseFloat(splitLine[3]), parseFloat(splitLine[4])),
				point2Coords = new Coordinates(parseFloat(splitLine[5]), parseFloat(splitLine[6]), parseFloat(splitLine[7])),
				point3Coords = new Coordinates(parseFloat(splitLine[8]), parseFloat(splitLine[9]), parseFloat(splitLine[10])),
				triangleLine = new Lines.TriangleLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, point3Coords);

			if (!triangleLine.IsValid()) {
				throw 'Unable to parse triangle line: Invalid line arguments on line ' + lineNumber;
			}

			return triangleLine;
		}
	}
}