module LdrawVisualizer.Parser.Lines {
	export enum LdrawFileLineType {
		CommentOrMETA = 0,
		SubFileReference = 1,
		Line = 2,
		Triangle = 3,
		Quadrilateral = 4,
		OptionalLine = 5,
	}
	
	export enum LdrawFileMETALineType {
		Colour = 0
	}
}