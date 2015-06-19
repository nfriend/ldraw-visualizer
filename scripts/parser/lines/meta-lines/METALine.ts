/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LdrawFileLine.ts" />
/// <reference path="../LineTypes.ts" />

module LdrawVisualizer.Parser.Lines {
	export class METALine extends LdrawFileLine {
		constructor(metaLineType: LdrawFileMETALineType) {
			super(LdrawFileLineType.CommentOrMETA);
			this.METALineType = metaLineType;
		}
		
		METALineType: LdrawFileMETALineType;
	}
}