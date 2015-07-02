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
            var NoFileMETALine = (function (_super) {
                __extends(NoFileMETALine, _super);
                function NoFileMETALine() {
                    _super.call(this, Lines.LdrawFileLineType.NoFile);
                }
                NoFileMETALine.prototype.IsValid = function () {
                    return true;
                };
                NoFileMETALine.Parse = function (line, splitLine, lineNumber) {
                    var noFileLine = new NoFileMETALine();
                    if (!noFileLine.IsValid()) {
                        throw 'Unable to parse NOFILE META line: Invalid line arguments on line ' + lineNumber;
                    }
                    return noFileLine;
                };
                return NoFileMETALine;
            })(Lines.LdrawFileLine);
            Lines.NoFileMETALine = NoFileMETALine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=NoFileMETALine.js.map