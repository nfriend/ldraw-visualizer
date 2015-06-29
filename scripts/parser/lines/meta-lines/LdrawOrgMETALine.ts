/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LdrawFileLine.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />

module LdrawVisualizer.Parser.Lines {
	export class LdrawOrgMETALine extends METALine {
		constructor(partType: LdrawOrgPartType) {
			super(LdrawFileMETALineType.LDrawOrg);

			this.PartType = partType;
		}

		PartType: LdrawOrgPartType;

		IsValid(): boolean {
			return !Utility.isNullOrUndefined(this.PartType);
		}

		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.LdrawOrgMETALine {

			var partTypeString = (splitLine[2] || '(Unknown LDraw Org Part Type)').trim().toUpperCase();
			var loLine: LdrawOrgMETALine;

			switch (partTypeString) {
				case 'PART':
					loLine = new LdrawOrgMETALine(LdrawOrgPartType.Part);
					break;
				case 'SUBPART':
					loLine = new LdrawOrgMETALine(LdrawOrgPartType.Subpart);
					break;
				case 'PRIMITIVE':
					loLine = new LdrawOrgMETALine(LdrawOrgPartType.Primitive);
					break;
				case '48_PRIMITIVE':
					loLine = new LdrawOrgMETALine(LdrawOrgPartType.Primitive_48);
					break;
				case 'SHORTCUT':
					loLine = new LdrawOrgMETALine(LdrawOrgPartType.Shortcut);
					break;
				case 'UNOFFICIAL_PART':
					loLine = new LdrawOrgMETALine(LdrawOrgPartType.Unofficial_Part);
					break;
				case 'UNOFFICIAL_SUBPART':
					loLine = new LdrawOrgMETALine(LdrawOrgPartType.Unofficial_Subpart);
					break;
				case 'UNOFFICIAL_PRIMITIVE':
					loLine = new LdrawOrgMETALine(LdrawOrgPartType.Unofficial_Primitive);
					break;
				case 'UNOFFICIAL_48_PRIMITIVE':
					loLine = new LdrawOrgMETALine(LdrawOrgPartType.Unofficial_Primitive_48);
					break;
				case 'UNOFFICIAL_SHORTCUT':
					loLine = new LdrawOrgMETALine(LdrawOrgPartType.Unofficial_Shortcut);
					break;
				case 'CONFIGURATION':
					loLine = new LdrawOrgMETALine(LdrawOrgPartType.Configuration);
					break;
				default:
					// console.log('Unknown !LDRAW_ORG part type: "' + partTypeString + '"');
					throw 'Unknown !LDRAW_ORG part type: "' + partTypeString + '"';
			}

			if (!loLine.IsValid()) {
				throw 'Unable to parse LDraw Org META line: Invalid line arguments on line ' + lineNumber;
			}

			return loLine;
		}
	}

	export enum LdrawOrgPartType {
		Part, Subpart, Primitive, Primitive_48, Shortcut,
		Unofficial_Part, Unofficial_Subpart, Unofficial_Primitive, Unofficial_Primitive_48, Unofficial_Shortcut,
		Configuration
	}
}