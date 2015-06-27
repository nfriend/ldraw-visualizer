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
            var QuadrilateralLine = (function (_super) {
                __extends(QuadrilateralLine, _super);
                function QuadrilateralLine(color, point1, point2, point3, point4) {
                    _super.call(this, Lines.LdrawFileLineType.Quadrilateral);
                    this.Color = color;
                    this.Point1 = point1;
                    this.Point2 = point2;
                    this.Point3 = point3;
                    this.Point4 = point4;
                }
                QuadrilateralLine.prototype.IsValid = function () {
                    return LdrawVisualizer.Utility.isValidColorCode(this.Color)
                        && this.Point1.IsValid()
                        && this.Point2.IsValid()
                        && this.Point3.IsValid()
                        && this.Point4.IsValid();
                };
                QuadrilateralLine.Parse = function (line, splitLine, lineNumber) {
                    var point1Coords = new Parser.Coordinates(parseFloat(splitLine[2]), parseFloat(splitLine[3]), parseFloat(splitLine[4])), point2Coords = new Parser.Coordinates(parseFloat(splitLine[5]), parseFloat(splitLine[6]), parseFloat(splitLine[7])), point3Coords = new Parser.Coordinates(parseFloat(splitLine[8]), parseFloat(splitLine[9]), parseFloat(splitLine[10])), point4Coords = new Parser.Coordinates(parseFloat(splitLine[11]), parseFloat(splitLine[12]), parseFloat(splitLine[13])), quadLine = new Lines.QuadrilateralLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, point3Coords, point4Coords);
                    if (!quadLine.IsValid()) {
                        throw 'Unable to parse quadrilateral line: Invalid line arguments on line ' + lineNumber;
                    }
                    return quadLine;
                };
                return QuadrilateralLine;
            })(Lines.LdrawFileLine);
            Lines.QuadrilateralLine = QuadrilateralLine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=QuadrilateralLine.js.map