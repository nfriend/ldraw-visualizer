/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />

module LdrawVisualizer.Parser.Lines {
	export class AuthorMETALine extends LdrawFileLine {
		constructor(author: string) {
			super(LdrawFileLineType.Author);
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