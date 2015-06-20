/// <reference path="../../../typings/references.ts" />
/// <reference path="../LdrawFile.ts" />
/// <reference path="../../utility.ts" />
/// <reference path="./LineTypes.ts" />

module LdrawVisualizer.Parser.Lines {
	export class LdrawFileLine {
		constructor(lineType: LdrawFileLineType) {
			this.LineType = lineType;
		}

		LineType: LdrawFileLineType;

		IsValid(): boolean {
			throw 'This method is abstract and should be overriden in a derived class - it should not be called directly';
		}
		
		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.LdrawFileLine {
			throw 'This method is abstract and should be overriden in a derived class - it should not be called directly';
		}
	}
}