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

			var fileNameIsValid = /^[a-zA-Z0-9\-_\\/]+\.(dat|ldr|mpd)$/i.test(this.Filename);

			return (Utility.isValidColorCode(this.Color)
				&& this.Coordinates.IsValid()
				&& transformMatrixIsValid
				&& fileNameIsValid);
		}
		
		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.SubFileReferenceLine {
			var coords = new Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10)),
				matrix = [
					[parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10)],
					[parseInt(splitLine[8], 10), parseInt(splitLine[9], 10), parseInt(splitLine[10], 10)],
					[parseInt(splitLine[11], 10), parseInt(splitLine[12], 10), parseInt(splitLine[13], 10)]
				],
				refLine = new Lines.SubFileReferenceLine(parseInt(splitLine[1], 10), coords, matrix, splitLine[14]);

			if (!refLine.IsValid()) {
				throw 'Unable to parse subfile reference line: Invalid line arguments on line ' + lineNumber;
			}

			return refLine;
		}
	}
}