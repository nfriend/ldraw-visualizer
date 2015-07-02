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
            var PartDescriptionMETALine = (function (_super) {
                __extends(PartDescriptionMETALine, _super);
                function PartDescriptionMETALine(name) {
                    _super.call(this, Lines.LdrawFileLineType.Name);
                    this.Name = name;
                }
                PartDescriptionMETALine.prototype.IsValid = function () {
                    return LdrawVisualizer.Utility.hasAtLeastOneNonWhitespaceCharacter(this.Name);
                };
                PartDescriptionMETALine.Parse = function (line, splitLine, lineNumber) {
                    var nameLine = new Lines.NameMETALine(splitLine[2]);
                    if (!nameLine.IsValid()) {
                        throw 'Unable to parse name META line: Invalid line arguments on line ' + lineNumber;
                    }
                    return nameLine;
                };
                return PartDescriptionMETALine;
            })(Lines.LdrawFileLine);
            Lines.PartDescriptionMETALine = PartDescriptionMETALine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=PartDescription.js.map