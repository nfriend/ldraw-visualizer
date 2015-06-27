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
            var TriangleLine = (function (_super) {
                __extends(TriangleLine, _super);
                function TriangleLine(color, point1, point2, point3) {
                    _super.call(this, Lines.LdrawFileLineType.Triangle);
                    this.Color = color;
                    this.Point1 = point1;
                    this.Point2 = point2;
                    this.Point3 = point3;
                }
                TriangleLine.prototype.IsValid = function () {
                    return LdrawVisualizer.Utility.isValidColorCode(this.Color)
                        && this.Point1.IsValid()
                        && this.Point2.IsValid()
                        && this.Point3.IsValid();
                };
                TriangleLine.Parse = function (line, splitLine, lineNumber) {
                    var point1Coords = new Parser.Coordinates(parseFloat(splitLine[2]), parseFloat(splitLine[3]), parseFloat(splitLine[4])), point2Coords = new Parser.Coordinates(parseFloat(splitLine[5]), parseFloat(splitLine[6]), parseFloat(splitLine[7])), point3Coords = new Parser.Coordinates(parseFloat(splitLine[8]), parseFloat(splitLine[9]), parseFloat(splitLine[10])), triangleLine = new Lines.TriangleLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, point3Coords);
                    if (!triangleLine.IsValid()) {
                        throw 'Unable to parse triangle line: Invalid line arguments on line ' + lineNumber;
                    }
                    return triangleLine;
                };
                return TriangleLine;
            })(Lines.LdrawFileLine);
            Lines.TriangleLine = TriangleLine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=TriangleLine.js.map