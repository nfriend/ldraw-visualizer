/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />
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
            var RotationCenterMETALine = (function (_super) {
                __extends(RotationCenterMETALine, _super);
                function RotationCenterMETALine(x, y, z, whatIsThisNumberFor, name) {
                    _super.call(this, Lines.LdrawFileMETALineType.RotationCenter);
                    this.X = x;
                    this.Y = y;
                    this.Z = z;
                    this.WhatIsThisNumberFor = whatIsThisNumberFor;
                    this.Name = name;
                }
                RotationCenterMETALine.prototype.IsValid = function () {
                    return (LdrawVisualizer.Utility.isNumber(this.X)
                        && LdrawVisualizer.Utility.isNumber(this.Y)
                        && LdrawVisualizer.Utility.isNumber(this.Z)
                        && LdrawVisualizer.Utility.isNonEmpty(this.Name));
                };
                RotationCenterMETALine.Parse = function (line, splitLine, lineNumber) {
                    var x = parseInt(splitLine[3], 10), y = parseInt(splitLine[4], 10), z = parseInt(splitLine[5], 10), whatIsThisNumberFor = parseInt(splitLine[6], 10), name = splitLine[7];
                    var rotationCenterLine = new RotationCenterMETALine(x, y, z, whatIsThisNumberFor, name);
                    if (!rotationCenterLine.IsValid()) {
                        throw 'Unable to parse rotation center META line: Invalid line arguments on line ' + lineNumber;
                    }
                    return rotationCenterLine;
                };
                return RotationCenterMETALine;
            })(Lines.METALine);
            Lines.RotationCenterMETALine = RotationCenterMETALine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=RotationCenterMETALine.js.map