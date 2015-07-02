/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LdrawFileLine.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="../../Color.ts" />
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
            var ColourMETALine = (function (_super) {
                __extends(ColourMETALine, _super);
                function ColourMETALine(name, code, value, edge, alpha, luminance, texture) {
                    _super.call(this, Lines.LdrawFileLineType.Colour);
                    this.Name = name;
                    this.Code = code;
                    this.Value = value;
                    this.Edge = edge;
                    this.Alpha = alpha;
                    this.Luminance = luminance;
                    this.Texture = texture;
                }
                ColourMETALine.prototype.IsValid = function () {
                    if (typeof this.Edge === 'number') {
                        var isEdgeValid = LdrawVisualizer.Utility.isValidColorCode(this.Edge);
                    }
                    else {
                        var isEdgeValid = !isEdgeValid || this.Edge.IsValid();
                    }
                    return LdrawVisualizer.Utility.isNonEmpty(this.Name)
                        && LdrawVisualizer.Utility.isValidColorCode(this.Code)
                        && this.Value.IsValid()
                        && isEdgeValid
                        && (LdrawVisualizer.Utility.isNullOrUndefined(this.Alpha) || LdrawVisualizer.Utility.isByte(this.Alpha))
                        && (LdrawVisualizer.Utility.isNullOrUndefined(this.Luminance) || LdrawVisualizer.Utility.isByte(this.Luminance));
                };
                ColourMETALine.Parse = function (line, splitLine, lineNumber) {
                    var code, value, edge, alpha, luminance, texture;
                    var codeIndex = splitLine.indexOf('CODE');
                    if (codeIndex !== -1) {
                        code = parseInt(splitLine[codeIndex + 1], 10);
                    }
                    var valueIndex = splitLine.indexOf('VALUE');
                    if (valueIndex !== -1) {
                        value = new Parser.Color(splitLine[valueIndex + 1]);
                    }
                    var edgeIndex = splitLine.indexOf('EDGE');
                    if (edgeIndex !== -1) {
                        var edgeValue = splitLine[edgeIndex + 1];
                        if (LdrawVisualizer.Utility.isValidColorHexString(edgeValue)) {
                            edge = new Parser.Color(edgeValue);
                        }
                        else {
                            edge = parseInt(edgeValue, 10);
                        }
                    }
                    var alphaIndex = splitLine.indexOf('ALPHA');
                    if (alphaIndex !== -1) {
                        alpha = parseInt(splitLine[alphaIndex + 1], 10);
                    }
                    var luminanceIndex = splitLine.indexOf('LUMINANCE');
                    if (luminanceIndex !== -1) {
                        luminance = parseInt(splitLine[luminanceIndex + 1], 10);
                    }
                    if (splitLine.indexOf('CHROME') !== -1) {
                        texture = Lines.ColorTexture.Chrome;
                    }
                    else if (splitLine.indexOf('PEARLESCENT') !== -1) {
                        texture = Lines.ColorTexture.Chrome;
                    }
                    else if (splitLine.indexOf('RUBBER') !== -1) {
                        texture = Lines.ColorTexture.Chrome;
                    }
                    else if (splitLine.indexOf('MATTE_METALLIC') !== -1) {
                        texture = Lines.ColorTexture.Chrome;
                    }
                    else if (splitLine.indexOf('METAL') !== -1) {
                        texture = Lines.ColorTexture.Chrome;
                    }
                    else if (splitLine.indexOf('MATERIAL') !== -1) {
                        if (splitLine.indexOf('GLITTER') !== -1) {
                            texture = Lines.ColorTexture.Glitter;
                        }
                        else if (splitLine.indexOf('SPECKLE') !== -1) {
                            texture = Lines.ColorTexture.Speckle;
                        }
                    }
                    var colourLine = new Lines.ColourMETALine(splitLine[2], code, value, edge, alpha, luminance, texture);
                    if (!colourLine.IsValid()) {
                        throw 'Unable to parse META colour line: Invalid line arguments on line ' + lineNumber;
                    }
                    return colourLine;
                };
                return ColourMETALine;
            })(Lines.LdrawFileLine);
            Lines.ColourMETALine = ColourMETALine;
            (function (ColorTexture) {
                ColorTexture[ColorTexture["Chrome"] = 0] = "Chrome";
                ColorTexture[ColorTexture["Pearlescent"] = 1] = "Pearlescent";
                ColorTexture[ColorTexture["Rubber"] = 2] = "Rubber";
                ColorTexture[ColorTexture["MatteMetalic"] = 3] = "MatteMetalic";
                ColorTexture[ColorTexture["Metal"] = 4] = "Metal";
                ColorTexture[ColorTexture["Glitter"] = 5] = "Glitter";
                ColorTexture[ColorTexture["Speckle"] = 6] = "Speckle";
            })(Lines.ColorTexture || (Lines.ColorTexture = {}));
            var ColorTexture = Lines.ColorTexture;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=ColourMETALine.js.map