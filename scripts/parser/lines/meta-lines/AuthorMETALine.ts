/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />

module LdrawVisualizer.Parser.Lines {
	export class AuthorMETALine extends METALine {
		constructor(author: string) {
			super(LdrawFileMETALineType.Author);
			
			this.Author = author;
		}
		
		Author: string;

		IsValid(): boolean {
			return Utility.hasAtLeastOneNonWhitespaceCharacter(this.Author);
		}

		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.AuthorMETALine {
			var authorLine = new AuthorMETALine(splitLine[2]);
			
			if (!authorLine.IsValid()) {
				throw 'Unable to parse author META line: Invalid line arguments on line ' + lineNumber;
			}
						
			return authorLine;
		}
	}
}