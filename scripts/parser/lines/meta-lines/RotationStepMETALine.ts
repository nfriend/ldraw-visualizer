/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />

module LdrawVisualizer.Parser.Lines {
	export class RotationStepMETALine extends METALine {
		constructor(xAngle: number, yAngle: number, zAngle: number, rotationType: RotationType) {
			super(LdrawFileMETALineType.RotationStep);

			this.XAngle = xAngle;
			this.YAngle = yAngle;
			this.ZAngle = zAngle;
			this.RotationType = rotationType;
		}

		XAngle: number;
		YAngle: number;
		ZAngle: number;
		RotationType: RotationType;

		IsValid(): boolean {
			
			// if any of the rotation angles are defined,
			// ensure ALL rotation angles are valid
			if (!Utility.isNullOrUndefined(this.XAngle)
				|| !Utility.isNullOrUndefined(this.YAngle)
				|| !Utility.isNullOrUndefined(this.ZAngle)) {

				return (Utility.isNumber(this.XAngle)
					&& Utility.isNumber(this.YAngle)
					&& Utility.isNumber(this.ZAngle));
			} else {
				return true;
			}
		}

		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.RotationStepMETALine {
			
			var x: number, y: number, z: number, rotType: RotationType;

			if (splitLine[2] !== 'END') {
				x = parseFloat(splitLine[2]);
				y = parseFloat(splitLine[3]);
				z = parseFloat(splitLine[4]);

				if (splitLine[5] === 'REL') {
					rotType = RotationType.Relative;
				} else if (splitLine[5] === 'ADD') {
					rotType = RotationType.Additive;
				} else if (splitLine[5] === 'ABS') {
					rotType = RotationType.Absolute;
				} else {
					throw 'Unknown rotation step type: ' + splitLine[5];
				}
			}

			var rotStepLine = new RotationStepMETALine(x, y, z, rotType);

			if (!rotStepLine.IsValid()) {
				throw 'Unable to parse rotation step META line: Invalid line arguments on line ' + lineNumber;
			}

			return rotStepLine;
		}
	}

	export enum RotationType {
		Relative, Additive, Absolute
	}
}