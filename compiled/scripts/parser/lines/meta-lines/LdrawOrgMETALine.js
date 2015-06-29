/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LdrawFileLine.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var Lines;
        (function (Lines) {
            var LdrawOrgMETALine = (function (_super) {
                __extends(LdrawOrgMETALine, _super);
                function LdrawOrgMETALine(partType) {
                    _super.call(this, Lines.LdrawFileMETALineType.LDrawOrg);
                    this.PartType = partType;
                }
                LdrawOrgMETALine.prototype.IsValid = function () {
                    return !LdrawVisualizer.Utility.isNullOrUndefined(this.PartType);
                };
                LdrawOrgMETALine.Parse = function (line, splitLine, lineNumber) {
                    var partTypeString = (splitLine[2] || '(Unknown LDraw Org Part Type)').trim().toUpperCase();
                    var loLine;
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
                };
                return LdrawOrgMETALine;
            })(Lines.METALine);
            Lines.LdrawOrgMETALine = LdrawOrgMETALine;
            (function (LdrawOrgPartType) {
                LdrawOrgPartType[LdrawOrgPartType["Part"] = 0] = "Part";
                LdrawOrgPartType[LdrawOrgPartType["Subpart"] = 1] = "Subpart";
                LdrawOrgPartType[LdrawOrgPartType["Primitive"] = 2] = "Primitive";
                LdrawOrgPartType[LdrawOrgPartType["Primitive_48"] = 3] = "Primitive_48";
                LdrawOrgPartType[LdrawOrgPartType["Shortcut"] = 4] = "Shortcut";
                LdrawOrgPartType[LdrawOrgPartType["Unofficial_Part"] = 5] = "Unofficial_Part";
                LdrawOrgPartType[LdrawOrgPartType["Unofficial_Subpart"] = 6] = "Unofficial_Subpart";
                LdrawOrgPartType[LdrawOrgPartType["Unofficial_Primitive"] = 7] = "Unofficial_Primitive";
                LdrawOrgPartType[LdrawOrgPartType["Unofficial_Primitive_48"] = 8] = "Unofficial_Primitive_48";
                LdrawOrgPartType[LdrawOrgPartType["Unofficial_Shortcut"] = 9] = "Unofficial_Shortcut";
                LdrawOrgPartType[LdrawOrgPartType["Configuration"] = 10] = "Configuration";
            })(Lines.LdrawOrgPartType || (Lines.LdrawOrgPartType = {}));
            var LdrawOrgPartType = Lines.LdrawOrgPartType;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=LdrawOrgMETALine.js.map