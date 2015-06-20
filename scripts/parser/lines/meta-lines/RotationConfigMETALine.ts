/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />

module LdrawVisualizer.Parser.Lines {
	export class RotationConfigMETALine extends METALine {
		constructor(rotationId: number, isVisible: boolean) {
			super(LdrawFileMETALineType.RotationConfig);
			this.RotationId = rotationId;
			this.IsVisible = isVisible;
		}
		
		RotationId: number;
		IsVisible: boolean;

		IsValid(): boolean {
			return (Utility.isInt(this.RotationId)
				&& !Utility.isNullOrUndefined(this.IsVisible));
		}

		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.RotationConfigMETALine {
			
			var rotId = parseInt(splitLine[3], 10),
				isVisible = parseInt(splitLine[4], 10) === 1;
			
			var rotationConfigLine = new RotationConfigMETALine(rotId, isVisible);
			
			if (!rotationConfigLine.IsValid()) {
				throw 'Unable to parse rotation config META line: Invalid line arguments on line ' + lineNumber;
			}
						
			return rotationConfigLine;
		}
	}
}