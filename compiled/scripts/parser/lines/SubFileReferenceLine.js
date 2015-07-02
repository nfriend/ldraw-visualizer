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
            var SubFileReferenceLine = (function (_super) {
                __extends(SubFileReferenceLine, _super);
                function SubFileReferenceLine(color, coordinates, transformMatrix, filename) {
                    _super.call(this, Lines.LdrawFileLineType.SubFileReference);
                    this.Color = color;
                    this.Coordinates = coordinates;
                    this.TransformMatrix = transformMatrix;
                    this.Filename = filename;
                }
                SubFileReferenceLine.prototype.IsValid = function () {
                    var transformMatrixIsValid = this.TransformMatrix && this.TransformMatrix.length === 3;
                    if (transformMatrixIsValid) {
                        outer: for (var i = 0; i < 3; i++) {
                            if (LdrawVisualizer.Utility.isArray(this.TransformMatrix[i]) && this.TransformMatrix[i].length === 3) {
                                for (var j = 0; j < 3; j++) {
                                    if (!LdrawVisualizer.Utility.isNumber(this.TransformMatrix[i][j])) {
                                        transformMatrixIsValid = false;
                                        break outer;
                                    }
                                }
                            }
                            else {
                                transformMatrixIsValid = false;
                                break;
                            }
                        }
                    }
                    return (LdrawVisualizer.Utility.isValidColorCode(this.Color)
                        && this.Coordinates.IsValid()
                        && transformMatrixIsValid
                        && LdrawVisualizer.Utility.hasAtLeastOneNonWhitespaceCharacter(this.Filename));
                };
                SubFileReferenceLine.Parse = function (line, splitLine, lineNumber) {
                    var coords = new Parser.Coordinates(parseFloat(splitLine[2]), parseFloat(splitLine[3]), parseFloat(splitLine[4])), matrix = [
                        [parseFloat(splitLine[5]), parseFloat(splitLine[6]), parseFloat(splitLine[7])],
                        [parseFloat(splitLine[8]), parseFloat(splitLine[9]), parseFloat(splitLine[10])],
                        [parseFloat(splitLine[11]), parseFloat(splitLine[12]), parseFloat(splitLine[13])]
                    ], refLine = new Lines.SubFileReferenceLine(parseInt(splitLine[1], 10), coords, matrix, line.substring(line.indexOf(splitLine[14])).trim());
                    if (!refLine.IsValid()) {
                        throw 'Unable to parse subfile reference line: Invalid line arguments on line ' + lineNumber;
                    }
                    return refLine;
                };
                return SubFileReferenceLine;
            })(Lines.LdrawFileLine);
            Lines.SubFileReferenceLine = SubFileReferenceLine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=SubFileReferenceLine.js.map