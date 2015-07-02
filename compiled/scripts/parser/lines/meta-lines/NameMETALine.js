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
            var NameMETALine = (function (_super) {
                __extends(NameMETALine, _super);
                function NameMETALine(name) {
                    _super.call(this, Lines.LdrawFileLineType.Name);
                    this.Name = name;
                }
                NameMETALine.prototype.IsValid = function () {
                    return LdrawVisualizer.Utility.hasAtLeastOneNonWhitespaceCharacter(this.Name);
                };
                NameMETALine.Parse = function (line, splitLine, lineNumber) {
                    var nameLine = new NameMETALine(line.substring(line.indexOf(splitLine[2])));
                    if (!nameLine.IsValid()) {
                        throw 'Unable to parse name META line: Invalid line arguments on line ' + lineNumber;
                    }
                    return nameLine;
                };
                return NameMETALine;
            })(Lines.LdrawFileLine);
            Lines.NameMETALine = NameMETALine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=NameMETALine.js.map