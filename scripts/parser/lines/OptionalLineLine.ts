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
			var point1Coords = new Coordinates(parseFloat(splitLine[2]), parseFloat(splitLine[3]), parseFloat(splitLine[4])),
				point2Coords = new Coordinates(parseFloat(splitLine[5]), parseFloat(splitLine[6]), parseFloat(splitLine[7])),
				controlPoint1Coords = new Coordinates(parseFloat(splitLine[8]), parseFloat(splitLine[9]), parseFloat(splitLine[10])),
				controlPoint2Coords = new Coordinates(parseFloat(splitLine[11]), parseFloat(splitLine[12]), parseFloat(splitLine[13])),
				optLine = new Lines.OptionalLineLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, controlPoint1Coords, controlPoint2Coords);

			if (!optLine.IsValid()) {
				throw 'Unable to parse optional line: Invalid line arguments on line ' + lineNumber;
			}

			return optLine;
		}
	}
}