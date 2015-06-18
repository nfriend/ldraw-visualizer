/// <reference path="../../typings/references.ts" />
/// <reference path="../utility.ts" />

module LdrawVisualizer.FileService {

	export enum PartFileLineType {
		CommentOrMETA = 0,
		SubFileReference = 1,
		Line = 2,
		Triangle = 3,
		Quadrilateral = 4,
		OptionalLine = 5,
	}

	export class PartFileLine {
		constructor(lineType: PartFileLineType) {
			this.LineType = lineType;
		}

		LineType: PartFileLineType;

		IsValid(): boolean {
			throw 'This method is abstract and should be overriden in a derived class - it should not be called directly';
		}
	}

	export class CommentLine extends PartFileLine {
		constructor(lineContent: string) {
			super(PartFileLineType.CommentOrMETA)
			
			this.LineContent = lineContent;
		}

		LineContent: string;

		IsValid(): boolean {
			return true;
		}
	}

	export class Coordinates {
		
		constructor(x: number, y: number, z: number) {
			this.X = x;
			this.Y = y;
			this.Z = z;
		}
		
		X: number;
		Y: number;
		Z: number;

		IsValid(): boolean {
			return Utility.isNumber(this.X)
				&& Utility.isNumber(this.Y)
				&& Utility.isNumber(this.Z);
		}
	}

	export class SubFileReferenceLine extends PartFileLine {
		constructor(color: number, coordinates: Coordinates, transformMatrix: number[][], filename: string) {
			super(PartFileLineType.SubFileReference);

			this.Color = color;
			this.Coordinates = coordinates;
			this.TransformMatrix = transformMatrix;
			this.Filename = filename;
		}

		Color: number;
		Coordinates: Coordinates;
		TransformMatrix: number[][];
		Filename: string;

		IsValid(): boolean {
			var transformMatrixIsValid = this.TransformMatrix && this.TransformMatrix.length === 3
			if (transformMatrixIsValid) {
				outer: for (var i = 0; i < 3; i++) {
					if (Utility.isArray(this.TransformMatrix[i]) && this.TransformMatrix[i].length === 3) {
						for (var j = 0; j < 3; j++) {
							if (!Utility.isNumber(this.TransformMatrix[i][j])) {
								transformMatrixIsValid = false;
								break outer;
							}
						}
					} else {
						transformMatrixIsValid = false;
						break;
					}
				}
			}

			var fileNameIsValid = /^[a-zA-Z0-9\-_\\/]+\.(dat|ldr|mpd)$/i.test(this.Filename);

			return Utility.isNumber(this.Color)
				&& this.Coordinates.IsValid()
				&& transformMatrixIsValid
				&& fileNameIsValid;
		}
	}

	export class LineLine extends PartFileLine {
		constructor(color: number, point1: Coordinates, point2: Coordinates) {
			super(PartFileLineType.Line);

			this.Point1 = point1;
			this.Point2 = point2;
		}

		Point1: Coordinates;
		Point2: Coordinates;

		IsValid(): boolean {
			return this.Point1.IsValid()
				&& this.Point2.IsValid();
		}
	}

	export class TriangleLine extends PartFileLine {
		constructor(color: number, point1: Coordinates, point2: Coordinates, point3: Coordinates) {
			super(PartFileLineType.Triangle);

			this.Color = color;
			this.Point1 = point1;
			this.Point2 = point2;
			this.Point3 = point3;
		}

		Color: number;
		Point1: Coordinates;
		Point2: Coordinates;
		Point3: Coordinates;
		
		IsValid(): boolean {
			return Utility.isNumber(this.Color)
				&& this.Point1.IsValid()
				&& this.Point2.IsValid()
				&& this.Point3.IsValid();
		}
	}

	export class QuadrilateralLine extends PartFileLine {
		constructor(color: number, point1: Coordinates, point2: Coordinates, point3: Coordinates, point4: Coordinates) {
			super(PartFileLineType.Quadrilateral);

			this.Color = color;
			this.Point1 = point1;
			this.Point2 = point2;
			this.Point3 = point3;
			this.Point4 = point4;
		}

		Color: number;
		Point1: Coordinates;
		Point2: Coordinates;
		Point3: Coordinates;
		Point4: Coordinates;
		
		IsValid(): boolean {
			return Utility.isNumber(this.Color)
				&& this.Point1.IsValid()
				&& this.Point2.IsValid()
				&& this.Point3.IsValid()
				&& this.Point4.IsValid();
		}
	}

	export class OptionalLineLine extends PartFileLine {
		constructor(color: number, point1: Coordinates, point2: Coordinates, controlPoint1: Coordinates, controlPoint2: Coordinates) {
			super(PartFileLineType.OptionalLine);

			this.Color = color;
			this.Point1 = point1;
			this.Point2 = point2;
			this.ControlPoint1 = controlPoint1;
			this.ControlPoint2 = controlPoint2;
		}

		Color: number;
		Point1: Coordinates;
		Point2: Coordinates;
		ControlPoint1: Coordinates;
		ControlPoint2: Coordinates;
		
		IsValid(): boolean {
			return Utility.isNumber(this.Color)
				&& this.Point1.IsValid()
				&& this.Point2.IsValid()
				&& this.ControlPoint1.IsValid()
				&& this.ControlPoint2.IsValid();
		}
	}

	export class PartFile {
		Lines: PartFileLine[] = [];
		
		IsValid(): boolean {
			return this.Lines.every(l => l.IsValid());
		}
	}
}