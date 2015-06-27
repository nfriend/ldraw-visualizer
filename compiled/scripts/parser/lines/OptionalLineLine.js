/// <reference path="../../../typings/references.ts" />
/// <reference path="../LdrawFile.ts" />
/// <reference path="./LdrawFileLine.ts" />
/// <reference path="../../utility.ts" />
/// <reference path="./LineTypes.ts" />
/// <reference path="../Coordinates.ts" />
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
            var OptionalLineLine = (function (_super) {
                __extends(OptionalLineLine, _super);
                function OptionalLineLine(color, point1, point2, controlPoint1, controlPoint2) {
                    _super.call(this, Lines.LdrawFileLineType.OptionalLine);
                    this.Color = color;
                    this.Point1 = point1;
                    this.Point2 = point2;
                    this.ControlPoint1 = controlPoint1;
                    this.ControlPoint2 = controlPoint2;
                }
                OptionalLineLine.prototype.IsValid = function () {
                    return LdrawVisualizer.Utility.isValidColorCode(this.Color)
                        && this.Point1.IsValid()
                        && this.Point2.IsValid()
                        && this.ControlPoint1.IsValid()
                        && this.ControlPoint2.IsValid();
                };
                OptionalLineLine.Parse = function (line, splitLine, lineNumber) {
                    var point1Coords = new Parser.Coordinates(parseFloat(splitLine[2]), parseFloat(splitLine[3]), parseFloat(splitLine[4])), point2Coords = new Parser.Coordinates(parseFloat(splitLine[5]), parseFloat(splitLine[6]), parseFloat(splitLine[7])), controlPoint1Coords = new Parser.Coordinates(parseFloat(splitLine[8]), parseFloat(splitLine[9]), parseFloat(splitLine[10])), controlPoint2Coords = new Parser.Coordinates(parseFloat(splitLine[11]), parseFloat(splitLine[12]), parseFloat(splitLine[13])), optLine = new Lines.OptionalLineLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, controlPoint1Coords, controlPoint2Coords);
                    if (!optLine.IsValid()) {
                        throw 'Unable to parse optional line: Invalid line arguments on line ' + lineNumber;
                    }
                    return optLine;
                };
                return OptionalLineLine;
            })(Lines.LdrawFileLine);
            Lines.OptionalLineLine = OptionalLineLine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=OptionalLineLine.js.map