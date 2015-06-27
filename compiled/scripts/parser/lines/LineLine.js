/// <reference path="../../../typings/references.ts" />
/// <reference path="../../utility.ts" />
/// <reference path="./LdrawFileLine.ts" />
/// <reference path="../Coordinates.ts" />
/// <reference path="./LineTypes.ts" />
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
            var LineLine = (function (_super) {
                __extends(LineLine, _super);
                function LineLine(color, point1, point2) {
                    _super.call(this, Lines.LdrawFileLineType.Line);
                    this.Point1 = point1;
                    this.Point2 = point2;
                }
                LineLine.prototype.IsValid = function () {
                    return this.Point1.IsValid()
                        && this.Point2.IsValid();
                };
                LineLine.Parse = function (line, splitLine, lineNumber) {
                    var point1Coords = new Parser.Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10)), point2Coords = new Parser.Coordinates(parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10)), lineLine = new Lines.LineLine(parseInt(splitLine[1], 10), point1Coords, point2Coords);
                    if (!lineLine.IsValid()) {
                        throw 'Unable to parse line line: Invalid line arguments on line ' + lineNumber;
                    }
                    return lineLine;
                };
                return LineLine;
            })(Lines.LdrawFileLine);
            Lines.LineLine = LineLine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=LineLine.js.map