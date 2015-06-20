/// <reference path="../../../typings/references.ts" />
/// <reference path="../LdrawFile.ts" />
/// <reference path="./LdrawFileLine.ts" />
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
		
		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.OptionalLineLine {
			var point1Coords = new Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10)),
				point2Coords = new Coordinates(parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10)),
				controlPoint1Coords = new Coordinates(parseInt(splitLine[8], 10), parseInt(splitLine[9], 10), parseInt(splitLine[10], 10)),
				controlPoint2Coords = new Coordinates(parseInt(splitLine[11], 10), parseInt(splitLine[12], 10), parseInt(splitLine[13], 10)),
				optLine = new Lines.OptionalLineLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, controlPoint1Coords, controlPoint2Coords);

			if (!optLine.IsValid()) {
				throw 'Unable to parse optional line: Invalid line arguments on line ' + lineNumber;
			}

			return optLine;
		}
	}
}