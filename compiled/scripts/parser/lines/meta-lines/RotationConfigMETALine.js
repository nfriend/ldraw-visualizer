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
            var RotationConfigMETALine = (function (_super) {
                __extends(RotationConfigMETALine, _super);
                function RotationConfigMETALine(rotationId, isVisible) {
                    _super.call(this, Lines.LdrawFileLineType.RotationConfig);
                    this.RotationId = rotationId;
                    this.IsVisible = isVisible;
                }
                RotationConfigMETALine.prototype.IsValid = function () {
                    return (LdrawVisualizer.Utility.isInt(this.RotationId)
                        && !LdrawVisualizer.Utility.isNullOrUndefined(this.IsVisible));
                };
                RotationConfigMETALine.Parse = function (line, splitLine, lineNumber) {
                    var rotId = parseInt(splitLine[3], 10), isVisible = parseInt(splitLine[4], 10) === 1;
                    var rotationConfigLine = new RotationConfigMETALine(rotId, isVisible);
                    if (!rotationConfigLine.IsValid()) {
                        throw 'Unable to parse rotation config META line: Invalid line arguments on line ' + lineNumber;
                    }
                    return rotationConfigLine;
                };
                return RotationConfigMETALine;
            })(Lines.LdrawFileLine);
            Lines.RotationConfigMETALine = RotationConfigMETALine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=RotationConfigMETALine.js.map