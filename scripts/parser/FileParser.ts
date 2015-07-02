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
/// <reference path="./lines/meta-lines/AuthorMETALine.ts" />
/// <reference path="./lines/meta-lines/ColourMETALine.ts" />
/// <reference path="./lines/meta-lines/NameMETALine.ts" />
/// <reference path="./lines/meta-lines/PartDescription.ts" />
/// <reference path="./lines/meta-lines/RotationCenterMETALine.ts" />
/// <reference path="./lines/meta-lines/RotationConfigMETALine.ts" />
/// <reference path="./lines/meta-lines/StepMETALine.ts" />
/// <reference path="./lines/meta-lines/RotationStepMETALine.ts" />
/// <reference path="./lines/meta-lines/LdrawOrgMETALine.ts" />
/// <reference path="./lines/meta-lines/FileMETALine.ts" />
/// <reference path="./lines/meta-lines/NoFileMETALine.ts" />

module LdrawVisualizer.Parser {
	export class FileParser {
		static Parse(fileContent: string): LdrawFile {
			var partFile = new LdrawFile();
			var lines = fileContent.split(/\r?\n/g);
			lines.forEach((line, lineNumber) => {
				if (!/$\s*^/.test(line)) {
					var splitLine = line.trim().split(/\s+/g)
					switch (splitLine[0]) {
						
						// Comment or META command
						case '0':
						
							// first, try and parse as a META command
							var metaLine = this.TryParseMETACommand(line, splitLine, lineNumber);
							
							// if theabove returned null, we either have a comment field or an unimplemented META command
							if (!metaLine) {
								partFile.Lines.push(Lines.CommentLine.Parse(line, splitLine, lineNumber));
							} else {
								partFile.Lines.push(metaLine);
							}

							break;
							
						// Subfile reference
						case '1':
							partFile.Lines.push(Lines.SubFileReferenceLine.Parse(line, splitLine, lineNumber));
							break;
							
						// Line
						case '2':
							partFile.Lines.push(Lines.LineLine.Parse(line, splitLine, lineNumber));
							break;
							
						// Triangle
						case '3':
							partFile.Lines.push(Lines.TriangleLine.Parse(line, splitLine, lineNumber));
							break;
							
						// Quadrilateral
						case '4':
							partFile.Lines.push(Lines.QuadrilateralLine.Parse(line, splitLine, lineNumber));
							break;
							
						// Optional Line
						case '5':
							partFile.Lines.push(Lines.OptionalLineLine.Parse(line, splitLine, lineNumber));
							break;
						case '6':
							throw 'Unable to parse file: unknown line type: "' + splitLine[0] + '" on line ' + lineNumber;
					}
				}
			});

			return partFile;
		}
		
		// attempts to parse the line as a META line.
		// if no matching META declaration is found this function returns null
		static TryParseMETACommand(line: string, splitLine: string[], lineNumber: number): Lines.LdrawFileLine {
			if (Utility.isNullOrUndefined(splitLine[1])) {
				return null;
			}

			var metaTag = splitLine[1].replace('!', '').toUpperCase().trim();
			
			// test for a standard comment line
			if (/^\/\//.test(metaTag)) {
				return null;
			}

			if (metaTag === 'COLOUR') {
				return Lines.ColourMETALine.Parse(line, splitLine, lineNumber);
			} else if (metaTag === 'STEP') {
				return Lines.StepMETALine.Parse(line, splitLine, lineNumber);
			} else if (metaTag === 'ROTSTEP') {
				return Lines.RotationStepMETALine.Parse(line, splitLine, lineNumber);
			} else if (/^Name:?$/i.test(metaTag)) {
				return Lines.NameMETALine.Parse(line, splitLine, lineNumber);
			} else if (/^Author:?$/i.test(metaTag)) {
				return Lines.AuthorMETALine.Parse(line, splitLine, lineNumber);
			} else if (metaTag === 'ROTATION') {
				if (splitLine[2] && splitLine[2].toUpperCase().trim() === 'CENTER') {
					return Lines.RotationCenterMETALine.Parse(line, splitLine, lineNumber);
				} else if (splitLine[2] && splitLine[2].toUpperCase().trim() === 'CONFIG') {
					return Lines.RotationConfigMETALine.Parse(line, splitLine, lineNumber);
				} else {
					console.log('Unknown ROTATION META tag subtype on line ' + lineNumber);
					return null;
				}
			} else if (/!?LDRAW_ORG/.test(metaTag)) {
				return Lines.LdrawOrgMETALine.Parse(line, splitLine, lineNumber);
			} else if (/!?FILE/.test(metaTag)) {
				return Lines.FileMETALine.Parse(line, splitLine, lineNumber);
			} else if (/!?NOFILE/.test(metaTag)) {
				return Lines.NoFileMETALine.Parse(line, splitLine, lineNumber);
			} else {
				//console.log('Unknown or unimplemented META tag on line ' + lineNumber + ': "' + metaTag + '"');
				return null;
			}
		}
	}
}