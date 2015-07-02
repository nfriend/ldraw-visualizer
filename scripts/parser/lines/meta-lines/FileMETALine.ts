/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />

module LdrawVisualizer.Parser.Lines {
	export class FileMETALine extends LdrawFileLine {
		constructor(filename: string) {
			super(LdrawFileLineType.File);
			
			this.Filename = filename;
		}
		
		Filename: string;

		IsValid(): boolean {
			return Utility.hasAtLeastOneNonWhitespaceCharacter(this.Filename);
		}

		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.FileMETALine {
			var fileLine = new FileMETALine(line.substring(line.indexOf(splitLine[2])));
			
			if (!fileLine.IsValid()) {
				throw 'Unable to parse file META line: Invalid line arguments on line ' + lineNumber;
			}
						
			return fileLine;
		}
	}
}