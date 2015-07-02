/// <reference path="../../../../typings/references.ts" />
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
            var FileMETALine = (function (_super) {
                __extends(FileMETALine, _super);
                function FileMETALine(filename) {
                    _super.call(this, Lines.LdrawFileLineType.File);
                    this.Filename = filename;
                }
                FileMETALine.prototype.IsValid = function () {
                    return LdrawVisualizer.Utility.hasAtLeastOneNonWhitespaceCharacter(this.Filename);
                };
                FileMETALine.Parse = function (line, splitLine, lineNumber) {
                    var fileLine = new FileMETALine(line.substring(line.indexOf(splitLine[2])));
                    if (!fileLine.IsValid()) {
                        throw 'Unable to parse file META line: Invalid line arguments on line ' + lineNumber;
                    }
                    return fileLine;
                };
                return FileMETALine;
            })(Lines.LdrawFileLine);
            Lines.FileMETALine = FileMETALine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=FileMETALine.js.map