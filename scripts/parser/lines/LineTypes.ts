module LdrawVisualizer.Parser.Lines {
	export enum LdrawFileLineType {
		Comment = 0,
		SubFileReference = 1,
		Line = 2,
		Triangle = 3,
		Quadrilateral = 4,
		OptionalLine = 5,
		Colour = 6,
		Step = 7,
		Name = 8,
		Author = 9,
		RotationCenter = 10,
		RotationConfig = 11,
		RotationStep = 12,
		LDrawOrg = 13,
		File = 14,
		NoFile = 15
	}
}