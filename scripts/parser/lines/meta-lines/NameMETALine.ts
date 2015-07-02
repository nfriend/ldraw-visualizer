/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />

module LdrawVisualizer.Parser.Lines {
	export class NameMETALine extends LdrawFileLine {
		constructor(name: string) {
			super(LdrawFileLineType.Name);
			
			this.Name = name;
		}
		
		Name: string;

		IsValid(): boolean {
			return Utility.hasAtLeastOneNonWhitespaceCharacter(this.Name);
		}

		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.NameMETALine {
			var nameLine = new NameMETALine(line.substring(line.indexOf(splitLine[2])));
			
			if (!nameLine.IsValid()) {
				throw 'Unable to parse name META line: Invalid line arguments on line ' + lineNumber;
			}
						
			return nameLine;
		}
	}
}