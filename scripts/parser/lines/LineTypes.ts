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
		Colour = 0,
		Step = 1,
		Name = 2,
		Author = 3,
		RotationCenter = 4,
		RotationConfig = 5,
		RotationStep = 6
	}
}