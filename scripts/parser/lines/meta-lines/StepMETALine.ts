/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />

module LdrawVisualizer.Parser.Lines {
	export class StepMETALine extends LdrawFileLine {
		constructor() {
			super(LdrawFileLineType.Step);
		}

		IsValid(): boolean {
			return true;
		}

		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.StepMETALine {
			return new StepMETALine();
		}
	}
}