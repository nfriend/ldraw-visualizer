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
            var RotationStepMETALine = (function (_super) {
                __extends(RotationStepMETALine, _super);
                function RotationStepMETALine(xAngle, yAngle, zAngle, rotationType) {
                    _super.call(this, Lines.LdrawFileLineType.RotationStep);
                    this.XAngle = xAngle;
                    this.YAngle = yAngle;
                    this.ZAngle = zAngle;
                    this.RotationType = rotationType;
                }
                RotationStepMETALine.prototype.IsValid = function () {
                    // if any of the rotation angles are defined,
                    // ensure ALL rotation angles are valid
                    if (!LdrawVisualizer.Utility.isNullOrUndefined(this.XAngle)
                        || !LdrawVisualizer.Utility.isNullOrUndefined(this.YAngle)
                        || !LdrawVisualizer.Utility.isNullOrUndefined(this.ZAngle)) {
                        return (LdrawVisualizer.Utility.isNumber(this.XAngle)
                            && LdrawVisualizer.Utility.isNumber(this.YAngle)
                            && LdrawVisualizer.Utility.isNumber(this.ZAngle));
                    }
                    else {
                        return true;
                    }
                };
                RotationStepMETALine.Parse = function (line, splitLine, lineNumber) {
                    var x, y, z, rotType;
                    if (splitLine[2] !== 'END') {
                        x = parseFloat(splitLine[2]);
                        y = parseFloat(splitLine[3]);
                        z = parseFloat(splitLine[4]);
                        if (splitLine[5] === 'REL') {
                            rotType = RotationType.Relative;
                        }
                        else if (splitLine[5] === 'ADD') {
                            rotType = RotationType.Additive;
                        }
                        else if (splitLine[5] === 'ABS') {
                            rotType = RotationType.Absolute;
                        }
                        else {
                            throw 'Unknown rotation step type: ' + splitLine[5];
                        }
                    }
                    var rotStepLine = new RotationStepMETALine(x, y, z, rotType);
                    if (!rotStepLine.IsValid()) {
                        throw 'Unable to parse rotation step META line: Invalid line arguments on line ' + lineNumber;
                    }
                    return rotStepLine;
                };
                return RotationStepMETALine;
            })(Lines.LdrawFileLine);
            Lines.RotationStepMETALine = RotationStepMETALine;
            (function (RotationType) {
                RotationType[RotationType["Relative"] = 0] = "Relative";
                RotationType[RotationType["Additive"] = 1] = "Additive";
                RotationType[RotationType["Absolute"] = 2] = "Absolute";
            })(Lines.RotationType || (Lines.RotationType = {}));
            var RotationType = Lines.RotationType;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=RotationStepMETALine.js.map