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

			return Utility.isValidColorCode(this.Color)
				&& this.Coordinates.IsValid()
				&& transformMatrixIsValid
				&& fileNameIsValid;
		}
	}
}