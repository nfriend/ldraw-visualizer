/// <reference path="../../typings/references.ts" />
/// <reference path="./LdrawFile.ts" />
/// <reference path="../utility.ts" />
/// <reference path="./lines/CommentLine.ts" />
/// <reference path="./lines/LdrawFileLine.ts" />
/// <reference path="./lines/LineLine.ts" />
/// <reference path="./lines/LineTypes.ts" />
/// <reference path="./lines/OptionalLineLine.ts" />
/// <reference path="./lines/QuadrilateralLine.ts" />
/// <reference path="./lines/SubFileReferenceLine.ts" />
/// <reference path="./lines/TriangleLine.ts" />
/// <reference path="./lines/meta-lines/ColourLine.ts" />
/// <reference path="./lines/meta-lines/METALine.ts" />

module LdrawVisualizer.Parser {
	export class FileParser {
		static Parse(fileContent: string): LdrawFile {
			var partFile = new LdrawFile();
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

		private static parseCommentOrMETA(line: string, splitLine: string[], lineNumber: number): Lines.CommentLine|Lines.METALine {
			var parsedMETALine = FileParser.parseMETALine(line, splitLine, lineNumber);
			if (parsedMETALine) {
				return parsedMETALine;
			} else {
				return new Lines.CommentLine(line.substring(line.indexOf('0') + 2));
			}
		}

		private static parseSubFileReference(line: string, splitLine: string[], lineNumber: number): Lines.SubFileReferenceLine {
			var coords = new Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10)),
				matrix = [
					[parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10)],
					[parseInt(splitLine[8], 10), parseInt(splitLine[9], 10), parseInt(splitLine[10], 10)],
					[parseInt(splitLine[11], 10), parseInt(splitLine[12], 10), parseInt(splitLine[13], 10)]
				],
				refLine = new Lines.SubFileReferenceLine(parseInt(splitLine[1], 10), coords, matrix, splitLine[14]);

			if (!refLine.IsValid()) {
				throw 'Unable to parse subfile reference line: Invalid line arguments on line ' + lineNumber;
			}

			return refLine;
		}

		private static parseLine(line: string, splitLine: string[], lineNumber: number): Lines.LineLine {
			var point1Coords = new Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10)),
				point2Coords = new Coordinates(parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10)),
				lineLine = new Lines.LineLine(parseInt(splitLine[1], 10), point1Coords, point2Coords);

			if (!lineLine.IsValid()) {
				throw 'Unable to parse line line: Invalid line arguments on line ' + lineNumber;
			}

			return lineLine;
		}

		private static parseTriangle(line: string, splitLine: string[], lineNumber: number): Lines.TriangleLine {
			var point1Coords = new Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10)),
				point2Coords = new Coordinates(parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10)),
				point3Coords = new Coordinates(parseInt(splitLine[8], 10), parseInt(splitLine[9], 10), parseInt(splitLine[10], 10)),
				triangleLine = new Lines.TriangleLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, point3Coords);

			if (!triangleLine.IsValid()) {
				throw 'Unable to parse triangle line: Invalid line arguments on line ' + lineNumber;
			}

			return triangleLine;
		}

		private static parseQuadrilateral(line: string, splitLine: string[], lineNumber: number): Lines.QuadrilateralLine {
			var point1Coords = new Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10)),
				point2Coords = new Coordinates(parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10)),
				point3Coords = new Coordinates(parseInt(splitLine[8], 10), parseInt(splitLine[9], 10), parseInt(splitLine[10], 10)),
				point4Coords = new Coordinates(parseInt(splitLine[11], 10), parseInt(splitLine[12], 10), parseInt(splitLine[13], 10)),
				quadLine = new Lines.QuadrilateralLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, point3Coords, point4Coords);

			if (!quadLine.IsValid()) {
				throw 'Unable to parse quadrilateral line: Invalid line arguments on line ' + lineNumber;
			}

			return quadLine;
		}

		private static parseOptionalLine(line: string, splitLine: string[], lineNumber: number): Lines.OptionalLineLine {
			var point1Coords = new Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10)),
				point2Coords = new Coordinates(parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10)),
				controlPoint1Coords = new Coordinates(parseInt(splitLine[8], 10), parseInt(splitLine[9], 10), parseInt(splitLine[10], 10)),
				controlPoint2Coords = new Coordinates(parseInt(splitLine[11], 10), parseInt(splitLine[12], 10), parseInt(splitLine[13], 10)),
				optLine = new Lines.OptionalLineLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, controlPoint1Coords, controlPoint2Coords);

			if (!optLine.IsValid()) {
				throw 'Unable to parse optional line: Invalid line arguments on line ' + lineNumber;
			}

			return optLine;
		}
		
		
		// -- META lines -- //
		
		// attempts to parse the line as a META line.  If no matching META declaration is found,
		// this function returns null
		private static parseMETALine(line: string, splitLine: string[], lineNumber: number): Lines.METALine {
			if (Utility.isNullOrUndefined(splitLine[1])) {
				return null;
			}
			
			var metaTag = splitLine[1].replace('!', '').toUpperCase().trim();
			
			// test for a standard comment line
			if (/^\/\//.test(metaTag)) {
				return null;
			}
			
			switch (metaTag) {
				case 'COLOUR':
					return FileParser.parseMETAColourLine(line, splitLine, lineNumber);
				default:
					console.log('Unknown or unimplemented META tag on line ' + lineNumber + ': "' + metaTag + '"');
					return null;
			}
		}

		private static parseMETAColourLine(line: string, splitLine: string[], lineNumber: number): Lines.ColourMETALine {
			var code: number,
				value: Color,
				edge: number|Color,
				alpha: number,
				luminance: number,
				texture: Lines.ColorTexture;

			var codeIndex = splitLine.indexOf('CODE');
			if (codeIndex !== -1) {
				code = parseInt(splitLine[codeIndex + 1], 10);
			}

			var valueIndex = splitLine.indexOf('VALUE');
			if (valueIndex !== -1) {
				value = new Color(splitLine[valueIndex + 1]);
			}

			var edgeIndex = splitLine.indexOf('EDGE');
			if (edgeIndex !== -1) {
				var edgeValue = splitLine[edgeIndex + 1];
				if (Utility.isValidColorHexString(edgeValue)) {
					edge = new Color(edgeValue);
				} else {
					edge = parseInt(edgeValue, 10);
				}
			}

			var alphaIndex = splitLine.indexOf('ALPHA');
			if (alphaIndex !== -1) {
				alpha = parseInt(splitLine[alphaIndex + 1], 10);
			}

			var luminanceIndex = splitLine.indexOf('LUMINANCE');
			if (luminanceIndex !== -1) {
				luminance = parseInt(splitLine[luminanceIndex + 1], 10);
			}

			if (splitLine.indexOf('CHROME') !== -1) {
				texture = Lines.ColorTexture.Chrome;
			} else if (splitLine.indexOf('PEARLESCENT') !== -1) {
				texture = Lines.ColorTexture.Chrome;
			} else if (splitLine.indexOf('RUBBER') !== -1) {
				texture = Lines.ColorTexture.Chrome;
			} else if (splitLine.indexOf('MATTE_METALLIC') !== -1) {
				texture = Lines.ColorTexture.Chrome;
			} else if (splitLine.indexOf('METAL') !== -1) {
				texture = Lines.ColorTexture.Chrome;
			} else if (splitLine.indexOf('MATERIAL') !== -1) {
				if (splitLine.indexOf('GLITTER') !== -1) {
					texture = Lines.ColorTexture.Glitter;
				} else if (splitLine.indexOf('SPECKLE') !== -1) {
					texture = Lines.ColorTexture.Speckle;
				}
			}

			var colourLine = new Lines.ColourMETALine(splitLine[2], code, value, edge, alpha, luminance, texture);

			if (!colourLine.IsValid()) {
				throw 'Unable to parse META colour line: Invalid line arguments on line ' + lineNumber;
			}

			return colourLine;
		}
	}
}