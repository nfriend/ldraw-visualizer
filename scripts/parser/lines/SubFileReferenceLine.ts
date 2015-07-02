/// <reference path="../../../typings/references.ts" />
/// <reference path="../../utility.ts" />
/// <reference path="./LdrawFileLine.ts" />
/// <reference path="../Coordinates.ts" />
/// <reference path="./LineTypes.ts" />

module LdrawVisualizer.Parser.Lines {
	export class SubFileReferenceLine extends LdrawFileLine {
		constructor(color: number, coordinates: Coordinates, transformMatrix: number[][], filename: string) {
			super(LdrawFileLineType.SubFileReference);

			this.Color = color;
			this.Coordinates = coordinates;
			this.TransformMatrix = transformMatrix;
			this.Filename = filename;
		}

		Color: number;
		Coordinates: Coordinates;
		TransformMatrix: number[][];
		Filename: string;
		File: LdrawFile;

		IsValid(): boolean {
			var transformMatrixIsValid = this.TransformMatrix && this.TransformMatrix.length === 3
			if (transformMatrixIsValid) {
				outer: for (var i = 0; i < 3; i++) {
					if (Utility.isArray(this.TransformMatrix[i]) && this.TransformMatrix[i].length === 3) {
						for (var j = 0; j < 3; j++) {
							if (!Utility.isNumber(this.TransformMatrix[i][j])) {
								transformMatrixIsValid = false;
								break outer;
							}
						}
					} else {
						transformMatrixIsValid = false;
						break;
					}
				}
			}

			return (Utility.isValidColorCode(this.Color)
				&& this.Coordinates.IsValid()
				&& transformMatrixIsValid
				&& Utility.hasAtLeastOneNonWhitespaceCharacter(this.Filename));
		}
		
		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.SubFileReferenceLine {
			var coords = new Coordinates(parseFloat(splitLine[2]), parseFloat(splitLine[3]), parseFloat(splitLine[4])),
				matrix = [
					[parseFloat(splitLine[5]), parseFloat(splitLine[6]), parseFloat(splitLine[7])],
					[parseFloat(splitLine[8]), parseFloat(splitLine[9]), parseFloat(splitLine[10])],
					[parseFloat(splitLine[11]), parseFloat(splitLine[12]), parseFloat(splitLine[13])]
				],
				refLine = new Lines.SubFileReferenceLine(parseInt(splitLine[1], 10), coords, matrix, line.substring(line.indexOf(splitLine[14])).trim());

			if (!refLine.IsValid()) {
				throw 'Unable to parse subfile reference line: Invalid line arguments on line ' + lineNumber;
			}

			return refLine;
		}
	}
}