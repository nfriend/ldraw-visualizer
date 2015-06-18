/// <reference path="../../typings/references.ts" />
/// <reference path="./part-file.ts" />
/// <reference path="../utility.ts" />

module LdrawVisualizer.FileService {
	export class FileParser {
		static Parse(fileContent: string): PartFile {
			var partFile = new PartFile();
			var lines = fileContent.split(/\r?\n/g);
			lines.forEach((line, lineNumber) => {
				if (!/$\s*^/.test(line)) {
					var splitLine = line.split(/\s+/g)
					switch (splitLine[0]) {
						case '0':
							partFile.Lines.push(FileParser.parseCommentOrMETA(line, splitLine, lineNumber));
							break;
						case '1':
							partFile.Lines.push(FileParser.parseSubFileReference(line, splitLine, lineNumber));
							break;
						case '2':
							partFile.Lines.push(FileParser.parseLine(line, splitLine, lineNumber));
							break;
						case '3':
							partFile.Lines.push(FileParser.parseTriangle(line, splitLine, lineNumber));
							break;
						case '4':
							partFile.Lines.push(FileParser.parseQuadrilateral(line, splitLine, lineNumber));
							break;
						case '5':
							partFile.Lines.push(FileParser.parseOptionalLine(line, splitLine, lineNumber));
							break;
						case '6':
							throw 'Unable to parse file: unknown line type: "' + splitLine[0] + '" on line ' + lineNumber;
					}
				}
			});
			
			return partFile;
		}

		private static parseCommentOrMETA(line: string, splitLine: string[], lineNumber: number): CommentLine {
			return new CommentLine(line.substring(line.indexOf('0') + 2));
		}

		private static parseSubFileReference(line: string, splitLine: string[], lineNumber: number): SubFileReferenceLine {
			var coords = new Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10));
			var matrix = [
				[parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10)],
				[parseInt(splitLine[8], 10), parseInt(splitLine[9], 10), parseInt(splitLine[10], 10)],
				[parseInt(splitLine[11], 10), parseInt(splitLine[12], 10), parseInt(splitLine[13], 10)]
			];
			var refLine = new SubFileReferenceLine(parseInt(splitLine[1], 10), coords, matrix, splitLine[14]);

			if (!refLine.IsValid()) {
				throw 'Unable to parse subfile reference line: Invalid line arguments on line ' + lineNumber;
			}

			return refLine;
		}

		private static parseLine(line: string, splitLine: string[], lineNumber: number): LineLine {
			var point1Coords = new Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10));
			var point2Coords = new Coordinates(parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10));
			var lineLine = new LineLine(parseInt(splitLine[1], 10), point1Coords, point2Coords);

			if (!lineLine.IsValid()) {
				throw 'Unable to parse line line: Invalid line arguments on line ' + lineNumber;
			}

			return lineLine;
		}

		private static parseTriangle(line: string, splitLine: string[], lineNumber: number): TriangleLine {
			var point1Coords = new Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10));
			var point2Coords = new Coordinates(parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10));
			var point3Coords = new Coordinates(parseInt(splitLine[8], 10), parseInt(splitLine[9], 10), parseInt(splitLine[10], 10));
			var triangleLine = new TriangleLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, point3Coords);

			if (!triangleLine.IsValid()) {
				throw 'Unable to parse triangle line: Invalid line arguments on line ' + lineNumber;
			}

			return triangleLine;
		}

		private static parseQuadrilateral(line: string, splitLine: string[], lineNumber: number): QuadrilateralLine {
			var point1Coords = new Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10));
			var point2Coords = new Coordinates(parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10));
			var point3Coords = new Coordinates(parseInt(splitLine[8], 10), parseInt(splitLine[9], 10), parseInt(splitLine[10], 10));
			var point4Coords = new Coordinates(parseInt(splitLine[11], 10), parseInt(splitLine[12], 10), parseInt(splitLine[13], 10));
			var quadLine = new QuadrilateralLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, point3Coords, point4Coords);

			if (!quadLine.IsValid()) {
				throw 'Unable to parse quadrilateral line: Invalid line arguments on line ' + lineNumber;
			}

			return quadLine;
		}

		private static parseOptionalLine(line: string, splitLine: string[], lineNumber: number): OptionalLineLine {
			var point1Coords = new Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10));
			var point2Coords = new Coordinates(parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10));
			var controlPoint1Coords = new Coordinates(parseInt(splitLine[8], 10), parseInt(splitLine[9], 10), parseInt(splitLine[10], 10));
			var controlPoint2Coords = new Coordinates(parseInt(splitLine[11], 10), parseInt(splitLine[12], 10), parseInt(splitLine[13], 10));
			var optLine = new OptionalLineLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, controlPoint1Coords, controlPoint2Coords);

			if (!optLine.IsValid()) {
				throw 'Unable to parse optional line: Invalid line arguments on line ' + lineNumber;
			}

			return optLine;
		}
	}
}