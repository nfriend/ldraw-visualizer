/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />

module LdrawVisualizer.Parser.Lines {
	export class NoFileMETALine extends LdrawFileLine {
		constructor() {
			super(LdrawFileLineType.NoFile);
		}

		IsValid(): boolean {
			return true;
		}

		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.NoFileMETALine {
			var noFileLine = new NoFileMETALine();
			
			if (!noFileLine.IsValid()) {
				throw 'Unable to parse NOFILE META line: Invalid line arguments on line ' + lineNumber;
			}
						
			return noFileLine;
		}
	}
}