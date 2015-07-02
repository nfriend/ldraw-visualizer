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
		
		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.LineLine {
			var point1Coords = new Coordinates(parseFloat(splitLine[2]), parseFloat(splitLine[3]), parseFloat(splitLine[4])),
				point2Coords = new Coordinates(parseFloat(splitLine[5]), parseFloat(splitLine[6]), parseFloat(splitLine[7])),
				lineLine = new Lines.LineLine(parseInt(splitLine[1], 10), point1Coords, point2Coords);

			if (!lineLine.IsValid()) {
				throw 'Unable to parse line line: Invalid line arguments on line ' + lineNumber;
			}

			return lineLine;
		}
	}
}