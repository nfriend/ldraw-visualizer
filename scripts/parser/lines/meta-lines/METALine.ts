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
		
		// attempts to parse the line as a META line.  If no matching META declaration is found,
		// this function returns null
		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.METALine {
			if (Utility.isNullOrUndefined(splitLine[1])) {
				return null;
			}

			var metaTag = splitLine[1].replace('!', '').toUpperCase().trim();
			
			// test for a standard comment line
			if (/^\/\//.test(metaTag)) {
				return null;
			}

			if (metaTag === 'COLOUR') {
				return ColourMETALine.Parse(line, splitLine, lineNumber);
			} else if (metaTag === 'STEP') {
				return StepMETALine.Parse(line, splitLine, lineNumber);
			} else if (metaTag === 'ROTSTEP') {
				return RotationStepMETALine.Parse(line, splitLine, lineNumber);
			} else if (/^Name:?$/i.test(metaTag)) {
				return NameMETALine.Parse(line, splitLine, lineNumber);
			} else if (/^Author:?$/i.test(metaTag)) {
				return AuthorMETALine.Parse(line, splitLine, lineNumber);
			} else if (metaTag === 'ROTATION') {
				if (splitLine[2] && splitLine[2].toUpperCase().trim() === 'CENTER') {
					return RotationCenterMETALine.Parse(line, splitLine, lineNumber);	
				} else if (splitLine[2] && splitLine[2].toUpperCase().trim() === 'CONFIG') {
					return RotationConfigMETALine.Parse(line, splitLine, lineNumber);
				} else {
					console.log('Unknown ROTATION META tag subtype on line ' + lineNumber);
					return null;
				}
			} else {
				//console.log('Unknown or unimplemented META tag on line ' + lineNumber + ': "' + metaTag + '"');
				return null;
			}
		}
	}
}