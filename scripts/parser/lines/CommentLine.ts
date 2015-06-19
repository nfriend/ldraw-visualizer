/// <reference path="../../../typings/references.ts" />
/// <reference path="../LdrawFile.ts" />
/// <reference path="./LdrawFileLine.ts" />
/// <reference path="../../utility.ts" />
/// <reference path="./LineTypes.ts" />

module LdrawVisualizer.Parser.Lines {
	export class CommentLine extends LdrawFileLine {
		constructor(lineContent: string) {
			super(LdrawFileLineType.CommentOrMETA)
			
			this.LineContent = lineContent;
		}

		LineContent: string;

		IsValid(): boolean {
			return true;
		}
	}
}