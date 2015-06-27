/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LdrawFileLine.ts" />
/// <reference path="../LineTypes.ts" />
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
            var METALine = (function (_super) {
                __extends(METALine, _super);
                function METALine(metaLineType) {
                    _super.call(this, Lines.LdrawFileLineType.CommentOrMETA);
                    this.METALineType = metaLineType;
                }
                // attempts to parse the line as a META line.  If no matching META declaration is found,
                // this function returns null
                METALine.Parse = function (line, splitLine, lineNumber) {
                    if (LdrawVisualizer.Utility.isNullOrUndefined(splitLine[1])) {
                        return null;
                    }
                    var metaTag = splitLine[1].replace('!', '').toUpperCase().trim();
                    // test for a standard comment line
                    if (/^\/\//.test(metaTag)) {
                        return null;
                    }
                    if (metaTag === 'COLOUR') {
                        return Lines.ColourMETALine.Parse(line, splitLine, lineNumber);
                    }
                    else if (metaTag === 'STEP') {
                        return Lines.StepMETALine.Parse(line, splitLine, lineNumber);
                    }
                    else if (metaTag === 'ROTSTEP') {
                        return Lines.RotationStepMETALine.Parse(line, splitLine, lineNumber);
                    }
                    else if (/^Name:?$/i.test(metaTag)) {
                        return Lines.NameMETALine.Parse(line, splitLine, lineNumber);
                    }
                    else if (/^Author:?$/i.test(metaTag)) {
                        return Lines.AuthorMETALine.Parse(line, splitLine, lineNumber);
                    }
                    else if (metaTag === 'ROTATION') {
                        if (splitLine[2] && splitLine[2].toUpperCase().trim() === 'CENTER') {
                            return Lines.RotationCenterMETALine.Parse(line, splitLine, lineNumber);
                        }
                        else if (splitLine[2] && splitLine[2].toUpperCase().trim() === 'CONFIG') {
                            return Lines.RotationConfigMETALine.Parse(line, splitLine, lineNumber);
                        }
                        else {
                            console.log('Unknown ROTATION META tag subtype on line ' + lineNumber);
                            return null;
                        }
                    }
                    else {
                        //console.log('Unknown or unimplemented META tag on line ' + lineNumber + ': "' + metaTag + '"');
                        return null;
                    }
                };
                return METALine;
            })(Lines.LdrawFileLine);
            Lines.METALine = METALine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=METALine.js.map