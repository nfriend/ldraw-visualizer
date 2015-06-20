/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />

module LdrawVisualizer.Parser.Lines {
	export class StepMETALine extends METALine {
		constructor() {
			super(LdrawFileMETALineType.Step);
		}

		IsValid(): boolean {
			return true;
		}

		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.StepMETALine {
			return new StepMETALine();
		}
	}
}