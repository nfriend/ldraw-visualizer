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
            var StepMETALine = (function (_super) {
                __extends(StepMETALine, _super);
                function StepMETALine() {
                    _super.call(this, Lines.LdrawFileLineType.Step);
                }
                StepMETALine.prototype.IsValid = function () {
                    return true;
                };
                StepMETALine.Parse = function (line, splitLine, lineNumber) {
                    return new StepMETALine();
                };
                return StepMETALine;
            })(Lines.LdrawFileLine);
            Lines.StepMETALine = StepMETALine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=StepMETALine.js.map