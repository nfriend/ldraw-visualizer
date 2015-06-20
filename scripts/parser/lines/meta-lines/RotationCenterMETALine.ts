/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />

module LdrawVisualizer.Parser.Lines {
	export class RotationCenterMETALine extends METALine {
		constructor(x: number, y: number, z: number, whatIsThisNumberFor: number, name: string) {
			super(LdrawFileMETALineType.RotationCenter);
			
			this.X = x;
			this.Y = y;
			this.Z = z;
			this.WhatIsThisNumberFor = whatIsThisNumberFor;
			this.Name = name;
		}
		
		X: number;
		Y: number;
		Z: number;
		WhatIsThisNumberFor: number;
		Name: string;

		IsValid(): boolean {
			return (Utility.isNumber(this.X)
				&& Utility.isNumber(this.Y)
				&& Utility.isNumber(this.Z)
				// && Utility.isNumber(this.WhatIsThisNumberFor)
				&& Utility.isNonEmpty(this.Name));
		}

		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.RotationCenterMETALine {
			
			var x = parseInt(splitLine[3], 10),
				y = parseInt(splitLine[4], 10),
				z = parseInt(splitLine[5], 10),
				whatIsThisNumberFor = parseInt(splitLine[6], 10),
				name = splitLine[7];
			
			var rotationCenterLine = new RotationCenterMETALine(x, y, z, whatIsThisNumberFor, name);
			
			if (!rotationCenterLine.IsValid()) {
				throw 'Unable to parse rotation center META line: Invalid line arguments on line ' + lineNumber;
			}
						
			return rotationCenterLine;
		}
	}
}