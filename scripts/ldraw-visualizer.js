/// <reference path="jquery/jquery.d.ts" />
/// <reference path="threejs/detector.d.ts" />
/// <reference path="threejs/three-canvasrenderer.d.ts" />
/// <reference path="threejs/three-copyshader.d.ts" />
/// <reference path="threejs/three-css3drenderer.d.ts" />
/// <reference path="threejs/three-effectcomposer.d.ts" />
/// <reference path="threejs/three-maskpass.d.ts" />
/// <reference path="threejs/three-orbitcontrols.d.ts" />
/// <reference path="threejs/three-projector.d.ts" />
/// <reference path="threejs/three-renderpass.d.ts" />
/// <reference path="threejs/three-shaderpass.d.ts" />
/// <reference path="threejs/three-trackballcontrols.d.ts" />
/// <reference path="threejs/three.d.ts" />
/// <reference path="webaudioapi/waa.d.ts" />
/// <reference path="webrtc/MediaStream.d.ts" />
/// <reference path="webrtc/RTCPeerConnection.d.ts" /> 
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Utility;
    (function (Utility) {
        function isString(obj) {
            return Object.prototype.toString.call(obj) === '[object String]';
        }
        Utility.isString = isString;
        function isNumber(obj) {
            return Object.prototype.toString.call(obj) === '[object Number]' && !isNaN(obj);
        }
        Utility.isNumber = isNumber;
        function isInt(obj) {
            return isNumber(obj) && (obj % 1) === 0;
        }
        Utility.isInt = isInt;
        function isByte(obj) {
            return isInt(obj) && obj >= 0 && obj <= 255;
        }
        Utility.isByte = isByte;
        function isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }
        Utility.isArray = isArray;
        function isValidColorCode(obj) {
            return isInt(obj) && obj >= 0;
            //return isInt(obj) && obj >= 0 && obj <= 511;
        }
        Utility.isValidColorCode = isValidColorCode;
        function isValidColorHexString(obj) {
            return isString(obj) && obj && /^#[a-f0-9]{6}$/i.test(obj);
        }
        Utility.isValidColorHexString = isValidColorHexString;
        function isNullOrUndefined(obj) {
            return obj === null || typeof obj === 'undefined';
        }
        Utility.isNullOrUndefined = isNullOrUndefined;
        function hasAtLeastOneNonWhitespaceCharacter(s) {
            return /^(?!\s*$).+/.test(s);
        }
        Utility.hasAtLeastOneNonWhitespaceCharacter = hasAtLeastOneNonWhitespaceCharacter;
        function isNonEmpty(s) {
            return !(/^\s+$/.test(s));
        }
        Utility.isNonEmpty = isNonEmpty;
    })(Utility = LdrawVisualizer.Utility || (LdrawVisualizer.Utility = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var Lines;
        (function (Lines) {
            (function (LdrawFileLineType) {
                LdrawFileLineType[LdrawFileLineType["CommentOrMETA"] = 0] = "CommentOrMETA";
                LdrawFileLineType[LdrawFileLineType["SubFileReference"] = 1] = "SubFileReference";
                LdrawFileLineType[LdrawFileLineType["Line"] = 2] = "Line";
                LdrawFileLineType[LdrawFileLineType["Triangle"] = 3] = "Triangle";
                LdrawFileLineType[LdrawFileLineType["Quadrilateral"] = 4] = "Quadrilateral";
                LdrawFileLineType[LdrawFileLineType["OptionalLine"] = 5] = "OptionalLine";
            })(Lines.LdrawFileLineType || (Lines.LdrawFileLineType = {}));
            var LdrawFileLineType = Lines.LdrawFileLineType;
            (function (LdrawFileMETALineType) {
                LdrawFileMETALineType[LdrawFileMETALineType["Colour"] = 0] = "Colour";
                LdrawFileMETALineType[LdrawFileMETALineType["Step"] = 1] = "Step";
                LdrawFileMETALineType[LdrawFileMETALineType["Name"] = 2] = "Name";
                LdrawFileMETALineType[LdrawFileMETALineType["Author"] = 3] = "Author";
                LdrawFileMETALineType[LdrawFileMETALineType["RotationCenter"] = 4] = "RotationCenter";
                LdrawFileMETALineType[LdrawFileMETALineType["RotationConfig"] = 5] = "RotationConfig";
                LdrawFileMETALineType[LdrawFileMETALineType["RotationStep"] = 6] = "RotationStep";
            })(Lines.LdrawFileMETALineType || (Lines.LdrawFileMETALineType = {}));
            var LdrawFileMETALineType = Lines.LdrawFileMETALineType;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="../../../typings/references.ts" />
/// <reference path="../LdrawFile.ts" />
/// <reference path="../../utility.ts" />
/// <reference path="./LineTypes.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var Lines;
        (function (Lines) {
            var LdrawFileLine = (function () {
                function LdrawFileLine(lineType) {
                    this.LineType = lineType;
                }
                LdrawFileLine.prototype.IsValid = function () {
                    throw 'This method is abstract and should be overriden in a derived class - it should not be called directly';
                };
                LdrawFileLine.Parse = function (line, splitLine, lineNumber) {
                    throw 'This method is abstract and should be overriden in a derived class - it should not be called directly';
                };
                return LdrawFileLine;
            })();
            Lines.LdrawFileLine = LdrawFileLine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="../../typings/references.ts" />
/// <reference path="../utility.ts" />
/// <reference path="./lines/LdrawFileLine.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var LdrawFile = (function () {
        function LdrawFile() {
            this.Lines = [];
        }
        LdrawFile.prototype.IsValid = function () {
            return this.Lines.every(function (l) { return l.IsValid(); });
        };
        return LdrawFile;
    })();
    LdrawVisualizer.LdrawFile = LdrawFile;
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="../../../typings/references.ts" />
/// <reference path="../LdrawFile.ts" />
/// <reference path="./LdrawFileLine.ts" />
/// <reference path="../../utility.ts" />
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
            var CommentLine = (function (_super) {
                __extends(CommentLine, _super);
                function CommentLine(lineContent) {
                    _super.call(this, Lines.LdrawFileLineType.CommentOrMETA);
                    this.LineContent = lineContent;
                }
                CommentLine.prototype.IsValid = function () {
                    return true;
                };
                CommentLine.Parse = function (line, splitLine, lineNumber) {
                    return new Lines.CommentLine(line.substring(line.indexOf('0') + 2));
                };
                return CommentLine;
            })(Lines.LdrawFileLine);
            Lines.CommentLine = CommentLine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="../../typings/references.ts" />
/// <reference path="../utility.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var Coordinates = (function () {
            function Coordinates(x, y, z) {
                this.X = x;
                this.Y = y;
                this.Z = z;
            }
            Coordinates.prototype.IsValid = function () {
                return LdrawVisualizer.Utility.isNumber(this.X)
                    && LdrawVisualizer.Utility.isNumber(this.Y)
                    && LdrawVisualizer.Utility.isNumber(this.Z);
            };
            return Coordinates;
        })();
        Parser.Coordinates = Coordinates;
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="../../../typings/references.ts" />
/// <reference path="../../utility.ts" />
/// <reference path="./LdrawFileLine.ts" />
/// <reference path="../Coordinates.ts" />
/// <reference path="./LineTypes.ts" />
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
/// <reference path="../../../typings/references.ts" />
/// <reference path="../LdrawFile.ts" />
/// <reference path="./LdrawFileLine.ts" />
/// <reference path="../../utility.ts" />
/// <reference path="./LineTypes.ts" />
/// <reference path="../Coordinates.ts" />
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
                    var point1Coords = new Parser.Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10)), point2Coords = new Parser.Coordinates(parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10)), controlPoint1Coords = new Parser.Coordinates(parseInt(splitLine[8], 10), parseInt(splitLine[9], 10), parseInt(splitLine[10], 10)), controlPoint2Coords = new Parser.Coordinates(parseInt(splitLine[11], 10), parseInt(splitLine[12], 10), parseInt(splitLine[13], 10)), optLine = new Lines.OptionalLineLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, controlPoint1Coords, controlPoint2Coords);
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
/// <reference path="../../../typings/references.ts" />
/// <reference path="../../utility.ts" />
/// <reference path="./LdrawFileLine.ts" />
/// <reference path="../Coordinates.ts" />
/// <reference path="./LineTypes.ts" />
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
                    var point1Coords = new Parser.Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10)), point2Coords = new Parser.Coordinates(parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10)), point3Coords = new Parser.Coordinates(parseInt(splitLine[8], 10), parseInt(splitLine[9], 10), parseInt(splitLine[10], 10)), point4Coords = new Parser.Coordinates(parseInt(splitLine[11], 10), parseInt(splitLine[12], 10), parseInt(splitLine[13], 10)), quadLine = new Lines.QuadrilateralLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, point3Coords, point4Coords);
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
/// <reference path="../../../typings/references.ts" />
/// <reference path="../../utility.ts" />
/// <reference path="./LdrawFileLine.ts" />
/// <reference path="../Coordinates.ts" />
/// <reference path="./LineTypes.ts" />
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
                    var fileNameIsValid = /^[a-zA-Z0-9\-_\\/]+\.(dat|ldr|mpd)$/i.test(this.Filename);
                    return (LdrawVisualizer.Utility.isValidColorCode(this.Color)
                        && this.Coordinates.IsValid()
                        && transformMatrixIsValid
                        && fileNameIsValid);
                };
                SubFileReferenceLine.Parse = function (line, splitLine, lineNumber) {
                    var coords = new Parser.Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10)), matrix = [
                        [parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10)],
                        [parseInt(splitLine[8], 10), parseInt(splitLine[9], 10), parseInt(splitLine[10], 10)],
                        [parseInt(splitLine[11], 10), parseInt(splitLine[12], 10), parseInt(splitLine[13], 10)]
                    ], refLine = new Lines.SubFileReferenceLine(parseInt(splitLine[1], 10), coords, matrix, splitLine[14]);
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
/// <reference path="../../../typings/references.ts" />
/// <reference path="../../utility.ts" />
/// <reference path="./LdrawFileLine.ts" />
/// <reference path="../Coordinates.ts" />
/// <reference path="./LineTypes.ts" />
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
                    var point1Coords = new Parser.Coordinates(parseInt(splitLine[2], 10), parseInt(splitLine[3], 10), parseInt(splitLine[4], 10)), point2Coords = new Parser.Coordinates(parseInt(splitLine[5], 10), parseInt(splitLine[6], 10), parseInt(splitLine[7], 10)), point3Coords = new Parser.Coordinates(parseInt(splitLine[8], 10), parseInt(splitLine[9], 10), parseInt(splitLine[10], 10)), triangleLine = new Lines.TriangleLine(parseInt(splitLine[1], 10), point1Coords, point2Coords, point3Coords);
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
/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LdrawFileLine.ts" />
/// <reference path="../LineTypes.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var Lines;
        (function (Lines) {
            var METALine = (function (_super) {
                __extends(METALine, _super);
                function METALine(metaLineType) {
                    _super.call(this, Lines.LdrawFileLineType.CommentOrMETA);
                    this.METALineType = metaLineType;
                }
                // attempts to parse the line as a META line.  If no matching META declaration is found,
                // this function returns null
                METALine.Parse = function (line, splitLine, lineNumber) {
                    if (LdrawVisualizer.Utility.isNullOrUndefined(splitLine[1])) {
                        return null;
                    }
                    var metaTag = splitLine[1].replace('!', '').toUpperCase().trim();
                    // test for a standard comment line
                    if (/^\/\//.test(metaTag)) {
                        return null;
                    }
                    if (metaTag === 'COLOUR') {
                        return Lines.ColourMETALine.Parse(line, splitLine, lineNumber);
                    }
                    else if (metaTag === 'STEP') {
                        return Lines.StepMETALine.Parse(line, splitLine, lineNumber);
                    }
                    else if (metaTag === 'ROTSTEP') {
                        return Lines.RotationStepMETALine.Parse(line, splitLine, lineNumber);
                    }
                    else if (/^Name:?$/i.test(metaTag)) {
                        return Lines.NameMETALine.Parse(line, splitLine, lineNumber);
                    }
                    else if (/^Author:?$/i.test(metaTag)) {
                        return Lines.AuthorMETALine.Parse(line, splitLine, lineNumber);
                    }
                    else if (metaTag === 'ROTATION') {
                        if (splitLine[2] && splitLine[2].toUpperCase().trim() === 'CENTER') {
                            return Lines.RotationCenterMETALine.Parse(line, splitLine, lineNumber);
                        }
                        else if (splitLine[2] && splitLine[2].toUpperCase().trim() === 'CONFIG') {
                            return Lines.RotationConfigMETALine.Parse(line, splitLine, lineNumber);
                        }
                        else {
                            console.log('Unknown ROTATION META tag subtype on line ' + lineNumber);
                            return null;
                        }
                    }
                    else {
                        console.log('Unknown or unimplemented META tag on line ' + lineNumber + ': "' + metaTag + '"');
                        return null;
                    }
                };
                return METALine;
            })(Lines.LdrawFileLine);
            Lines.METALine = METALine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var Lines;
        (function (Lines) {
            var AuthorMETALine = (function (_super) {
                __extends(AuthorMETALine, _super);
                function AuthorMETALine(author) {
                    _super.call(this, Lines.LdrawFileMETALineType.Author);
                    this.Author = author;
                }
                AuthorMETALine.prototype.IsValid = function () {
                    return LdrawVisualizer.Utility.hasAtLeastOneNonWhitespaceCharacter(this.Author);
                };
                AuthorMETALine.Parse = function (line, splitLine, lineNumber) {
                    var authorLine = new AuthorMETALine(splitLine[2]);
                    if (!authorLine.IsValid()) {
                        throw 'Unable to parse author META line: Invalid line arguments on line ' + lineNumber;
                    }
                    return authorLine;
                };
                return AuthorMETALine;
            })(Lines.METALine);
            Lines.AuthorMETALine = AuthorMETALine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="../../typings/references.ts" />
/// <reference path="../utility.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var Color = (function () {
            function Color(hexValue) {
                this.HexValue = hexValue;
            }
            Color.prototype.IsValid = function () {
                return LdrawVisualizer.Utility.isValidColorHexString(this.HexValue);
            };
            return Color;
        })();
        Parser.Color = Color;
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LdrawFileLine.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />
/// <reference path="../../Color.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var Lines;
        (function (Lines) {
            var ColourMETALine = (function (_super) {
                __extends(ColourMETALine, _super);
                function ColourMETALine(name, code, value, edge, alpha, luminance, texture) {
                    _super.call(this, Lines.LdrawFileMETALineType.Colour);
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
            })(Lines.METALine);
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
/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var Lines;
        (function (Lines) {
            var NameMETALine = (function (_super) {
                __extends(NameMETALine, _super);
                function NameMETALine(name) {
                    _super.call(this, Lines.LdrawFileMETALineType.Name);
                    this.Name = name;
                }
                NameMETALine.prototype.IsValid = function () {
                    return LdrawVisualizer.Utility.hasAtLeastOneNonWhitespaceCharacter(this.Name);
                };
                NameMETALine.Parse = function (line, splitLine, lineNumber) {
                    var nameLine = new NameMETALine(line.substring(line.indexOf(splitLine[2])));
                    if (!nameLine.IsValid()) {
                        throw 'Unable to parse name META line: Invalid line arguments on line ' + lineNumber;
                    }
                    return nameLine;
                };
                return NameMETALine;
            })(Lines.METALine);
            Lines.NameMETALine = NameMETALine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var Lines;
        (function (Lines) {
            var PartDescriptionMETALine = (function (_super) {
                __extends(PartDescriptionMETALine, _super);
                function PartDescriptionMETALine(name) {
                    _super.call(this, Lines.LdrawFileMETALineType.Name);
                    this.Name = name;
                }
                PartDescriptionMETALine.prototype.IsValid = function () {
                    return LdrawVisualizer.Utility.hasAtLeastOneNonWhitespaceCharacter(this.Name);
                };
                PartDescriptionMETALine.Parse = function (line, splitLine, lineNumber) {
                    var nameLine = new Lines.NameMETALine(splitLine[2]);
                    if (!nameLine.IsValid()) {
                        throw 'Unable to parse name META line: Invalid line arguments on line ' + lineNumber;
                    }
                    return nameLine;
                };
                return PartDescriptionMETALine;
            })(Lines.METALine);
            Lines.PartDescriptionMETALine = PartDescriptionMETALine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />
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
/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var Lines;
        (function (Lines) {
            var RotationConfigMETALine = (function (_super) {
                __extends(RotationConfigMETALine, _super);
                function RotationConfigMETALine(rotationId, isVisible) {
                    _super.call(this, Lines.LdrawFileMETALineType.RotationConfig);
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
            })(Lines.METALine);
            Lines.RotationConfigMETALine = RotationConfigMETALine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var Lines;
        (function (Lines) {
            var StepMETALine = (function (_super) {
                __extends(StepMETALine, _super);
                function StepMETALine() {
                    _super.call(this, Lines.LdrawFileMETALineType.Step);
                }
                StepMETALine.prototype.IsValid = function () {
                    return true;
                };
                StepMETALine.Parse = function (line, splitLine, lineNumber) {
                    return new StepMETALine();
                };
                return StepMETALine;
            })(Lines.METALine);
            Lines.StepMETALine = StepMETALine;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var Lines;
        (function (Lines) {
            var RotationStepMETALine = (function (_super) {
                __extends(RotationStepMETALine, _super);
                function RotationStepMETALine(xAngle, yAngle, zAngle, rotationType) {
                    _super.call(this, Lines.LdrawFileMETALineType.RotationStep);
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
            })(Lines.METALine);
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
/// <reference path="../../typings/references.ts" />
/// <reference path="./LdrawFile.ts" />
/// <reference path="../utility.ts" />
/// <reference path="./lines/CommentLine.ts" />
/// <reference path="./lines/LdrawFileLine.ts" />
/// <reference path="./lines/LineLine.ts" />
/// <reference path="./lines/LineTypes.ts" />
/// <reference path="./lines/OptionalLineLine.ts" />
/// <reference path="./lines/QuadrilateralLine.ts" />
/// <reference path="./lines/SubFileReferenceLine.ts" />
/// <reference path="./lines/TriangleLine.ts" />
/// <reference path="./lines/meta-lines/METALine.ts" />
/// <reference path="./lines/meta-lines/AuthorMETALine.ts" />
/// <reference path="./lines/meta-lines/ColourMETALine.ts" />
/// <reference path="./lines/meta-lines/NameMETALine.ts" />
/// <reference path="./lines/meta-lines/PartDescription.ts" />
/// <reference path="./lines/meta-lines/RotationCenterMETALine.ts" />
/// <reference path="./lines/meta-lines/RotationConfigMETALine.ts" />
/// <reference path="./lines/meta-lines/StepMETALine.ts" />
/// <reference path="./lines/meta-lines/RotationStepMETALine.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var FileParser = (function () {
            function FileParser() {
            }
            FileParser.Parse = function (fileContent) {
                var partFile = new LdrawVisualizer.LdrawFile();
                var lines = fileContent.split(/\r?\n/g);
                lines.forEach(function (line, lineNumber) {
                    if (!/$\s*^/.test(line)) {
                        var splitLine = line.split(/\s+/g);
                        switch (splitLine[0]) {
                            // Comment or META command
                            case '0':
                                // first, try and parse as a META command
                                var metaLine = Parser.Lines.METALine.Parse(line, splitLine, lineNumber);
                                // if theabove returned null, we either have a comment field or an unimplemented META command
                                if (!metaLine) {
                                    partFile.Lines.push(Parser.Lines.CommentLine.Parse(line, splitLine, lineNumber));
                                }
                                else {
                                    partFile.Lines.push(metaLine);
                                }
                                break;
                            // Subfile reference
                            case '1':
                                partFile.Lines.push(Parser.Lines.SubFileReferenceLine.Parse(line, splitLine, lineNumber));
                                break;
                            // Line
                            case '2':
                                partFile.Lines.push(Parser.Lines.LineLine.Parse(line, splitLine, lineNumber));
                                break;
                            // Triangle
                            case '3':
                                partFile.Lines.push(Parser.Lines.TriangleLine.Parse(line, splitLine, lineNumber));
                                break;
                            // Quadrilateral
                            case '4':
                                partFile.Lines.push(Parser.Lines.QuadrilateralLine.Parse(line, splitLine, lineNumber));
                                break;
                            // Optional Line
                            case '5':
                                partFile.Lines.push(Parser.Lines.OptionalLineLine.Parse(line, splitLine, lineNumber));
                                break;
                            case '6':
                                throw 'Unable to parse file: unknown line type: "' + splitLine[0] + '" on line ' + lineNumber;
                        }
                    }
                });
                return partFile;
            };
            return FileParser;
        })();
        Parser.FileParser = FileParser;
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="../../typings/references.ts" />
/// <reference path="./LdrawFile.ts" />
/// <reference path="./file-parser.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var FileService;
    (function (FileService) {
        function GetPart(partName, callback) {
            var temporaryBrickFileForTesting = '0 Untitled\r\n0 Name: 1st Place Robot Design Round 1.ldr\r\n0 Author: MLCad\r\n0 Unofficial Model\r\n0 ROTATION CENTER 0 0 0 1 \"Custom\" \r\n0 ROTATION CONFIG 0 0\r\n1 67580019 0 24 -10 1 0 0 0 1 0 0 0 1 3034.DAT\r\n1 7 0 24 -50 1 0 0 0 1 0 0 0 1 3738.DAT\r\n1 7 0 24 -90 1 0 0 0 1 0 0 0 1 3738.DAT\r\n1 7 0 24 -170 1 0 0 0 1 0 0 0 1 3738.DAT\r\n1 0 -70 0 -90 0 0 -1 0 1 0 1 0 0 2730.DAT\r\n1 0 70 0 -90 0 0 -1 0 1 0 1 0 0 2730.DAT\r\n0 STEP\r\n1 7 0 0 -100 -1 0 0 0 1 0 0 0 -1 3666.DAT\r\n1 7 40 -72 -70 0 0 -1 0 1 0 1 0 0 71427C01.DAT\r\n1 7 -40 -72 -70 0 0 1 0 1 0 -1 0 0 71427C01.DAT\r\n0 STEP\r\n1 7 70 -8 -150 0 0 -1 0 1 0 1 0 0 3710.DAT\r\n1 7 70 -48 -150 0 0 -1 0 1 0 1 0 0 3710.DAT\r\n1 7 70 -16 -130 0 0 -1 0 1 0 1 0 0 3023.DAT\r\n1 7 -70 -16 -130 0 0 -1 0 1 0 1 0 0 3023.DAT\r\n1 7 70 -40 -170 0 0 -1 0 1 0 1 0 0 3023.DAT\r\n1 0 70 -40 -130 0 0 -1 0 1 0 1 0 0 3700.DAT\r\n1 14 70 -32 -170 0 0 -1 0 1 0 1 0 0 3700.DAT\r\n1 7 -70 -8 -150 0 0 -1 0 1 0 1 0 0 3710.DAT\r\n1 7 -70 -48 -150 0 0 -1 0 1 0 1 0 0 3710.DAT\r\n1 7 -70 -40 -170 0 0 -1 0 1 0 1 0 0 3023.DAT\r\n1 0 -70 -40 -130 0 0 -1 0 1 0 1 0 0 3700.DAT\r\n1 14 -70 -32 -170 0 0 -1 0 1 0 1 0 0 3700.DAT\r\n0 STEP\r\n0 ROTSTEP 5.92105 150.119 0 ABS\r\n1 0 0 0 -10 0 0 -1 0 1 0 1 0 0 3003.DAT\r\n1 0 30 0 -10 0 0 -1 0 1 0 1 0 0 3700.DAT\r\n1 0 -30 0 -10 0 0 -1 0 1 0 1 0 0 3700.DAT\r\n0 STEP\r\n1 0 -100 8 -10 -1 0 0 0 1 0 0 0 -1 3707.DAT\r\n1 7 -50 8 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n1 7 50 8 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n1 0 100 8 -10 -1 0 0 0 1 0 0 0 -1 3707.DAT\r\n0 STEP\r\n1 67580019 0 -8 -10 1 0 0 0 1 0 0 0 1 3034.DAT\r\n1 19 80 8 -70 1 0 0 0 1 0 0 0 1 3749.DAT\r\n1 19 -80 8 -70 -1 0 0 0 1 0 0 0 -1 3749.DAT\r\n1 7 -90 8 -70 0 0 -1 0 1 0 1 0 0 3648.DAT\r\n1 7 90 8 -70 0 0 -1 0 1 0 1 0 0 3648.DAT\r\n1 7 90 8 -10 0 0 -1 0 1 0 1 0 0 3648.DAT\r\n1 7 -90 8 -10 0 0 -1 0 1 0 1 0 0 3648.DAT\r\n1 7 -90 -32 -70 0 0 -1 0 1 0 1 0 0 3647.DAT\r\n1 7 90 -32 -70 0 0 -1 0 1 0 1 0 0 3647.DAT\r\n0 STEP\r\n0 ROTSTEP END\r\n1 7 110 8 -10 0 0 -1 0 1 0 1 0 0 4019.DAT\r\n1 7 -110 8 -10 0 0 -1 0 1 0 1 0 0 4019.DAT\r\n0 STEP\r\n1 15 130 8 -10 0 0 -1 0 1 0 1 0 0 32007.DAT\r\n1 15 -130 8 -10 0 0 -1 0 1 0 1 0 0 32007.DAT\r\n0 STEP\r\n1 7 -150 8 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n1 7 150 8 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n1 14 170 8 -10 0 0 -1 0 1 0 1 0 0 3482.DAT\r\n1 14 -170 8 -10 0 0 -1 0 1 0 1 0 0 3482.DAT\r\n0 STEP\r\n1 7 0 -64 -210 1 0 0 0 1 0 0 0 1 71427C01.DAT\r\n1 0 0 8 -230 1 0 0 0 1 0 0 0 1 3003.DAT\r\n1 7 -30 16 -190 0 0 1 0 1 0 -1 0 0 3023.DAT\r\n1 7 30 16 -190 0 0 1 0 1 0 -1 0 0 3023.DAT\r\n1 7 -30 8 -210 0 0 1 0 1 0 -1 0 0 3710.DAT\r\n1 7 30 8 -210 0 0 1 0 1 0 -1 0 0 3710.DAT\r\n0 STEP\r\n1 0 0 -64 -230 -1 0 0 0 1 0 0 0 -1 5306.DAT\r\n1 0 -60 -72 -70 0 0 1 0 1 0 -1 0 0 5306.DAT\r\n1 0 60 -72 -70 0 0 1 0 1 0 -1 0 0 5306.DAT\r\n0 STEP\r\n1 14 20 -72 -210 0 0 1 0 1 0 -1 0 0 3020.DAT\r\n1 14 -20 -72 -210 0 0 1 0 1 0 -1 0 0 3020.DAT\r\n1 7 0 -24 -270 -1 0 0 0 1 0 0 0 -1 6538B.DAT\r\n0 STEP\r\n1 7 0 32 -250 0 0 -1 0 1 0 1 0 0 32001.DAT\r\n1 7 0 40 -300 1 0 0 0 1 0 0 0 1 3023.DAT\r\n1 0 0 56 -310 1 0 0 0 1 0 0 0 1 2654.DAT\r\n1 7 0 48 -300 1 0 0 0 1 0 0 0 1 3023.DAT\r\n1 0 0 32 -320 1 0 0 0 1 0 0 0 1 3700.DAT\r\n0 STEP\r\n1 7 0 16 -310 1 0 0 0 1 0 0 0 1 32001.DAT\r\n1 7 0 24 -310 1 0 0 0 1 0 0 0 1 32001.DAT\r\n1 0 40 -28 -310 0 1 0 -1 0 0 0 0 1 3707.DAT\r\n1 0 -40 -28 -310 0 1 0 -1 0 0 0 0 1 3707.DAT\r\n1 7 -40 0 -312 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n1 7 40 0 -312 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n0 STEP\r\n1 7 -40 -20 -312 1 0 0 0 0 1 0 -1 0 3650A.DAT\r\n1 7 40 -20 -312 1 0 0 0 0 1 0 -1 0 3650A.DAT\r\n0 STEP\r\n1 7 0 -56 -310 1 0 0 0 1 0 0 0 1 32001.DAT\r\n1 7 40 -64 -310 0 0 -1 0 1 0 1 0 0 3956.DAT\r\n1 7 -40 -64 -310 0 0 1 0 1 0 -1 0 0 3956.DAT\r\n1 7 40 -40 -312 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n1 7 -40 -40 -312 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n0 STEP\r\n1 7 -40 -80 -312 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n1 7 40 -80 -312 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n1 14 0 -64 -290 0 0 1 0 1 0 -1 0 0 3020.DAT\r\n1 0 0 -88 -320 1 0 0 0 1 0 0 0 1 3700.DAT\r\n0 STEP\r\n1 8 -2 -80 -332 0 1 0 0 0 -1 -1 0 0 32002.DAT\r\n1 8 -2 40 -332 0 1 0 0 0 -1 -1 0 0 32002.DAT\r\n0 STEP\r\n1 0 2 -25 -312 0 1 0 0 0 1 1 0 0 3705.DAT\r\n1 0 0 -24 -310 1 0 0 0 1 0 0 0 1 4716.DAT\r\n0 STEP\r\n1 7 0 -24 -345 1 0 0 0 1 0 0 0 1 4265C.DAT\r\n1 0 1 -20 -336 1 0 0 0 0 1 0 -1 0 32065.DAT\r\n0 STEP\r\n1 7 -39 -110 -312 1 0 0 0 0 1 0 -1 0 6538B.DAT\r\n0 STEP\r\n1 7 -39 -162 -309 1 0 0 0 1 0 0 0 1 6553.DAT\r\n1 0 -39 -160 -308 1 0 0 0 0 1 0 -1 0 3705.DAT\r\n1 7 -39 -136 -312 -1 0 0 0 0 -1 0 -1 0 4265C.DAT\r\n0 STEP\r\n1 7 -25 -160 -310 0 0 1 0 1 0 -1 0 0 4265C.DAT\r\n1 7 -55 -160 -310 0 0 1 0 1 0 -1 0 0 4265C.DAT\r\n1 7 -69 -180 -308 1 0 0 0 0 -1 0 1 0 32039.DAT\r\n1 7 -9 -180 -308 1 0 0 0 0 -1 0 1 0 32039.DAT\r\n0 STEP\r\n1 0 -9 -235 -308 0 0 -1 -1 0 0 0 1 0 3706.DAT\r\n1 0 -69 -235 -308 0 0 -1 -1 0 0 0 1 0 3706.DAT\r\n0 STEP\r\n1 7 -70 -265 -308 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n1 7 -10 -265 -308 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n1 7 -69 -285 -326 0 -1 0 -1 0 0 0 0 -1 32039.DAT\r\n1 7 -9 -285 -326 0 -1 0 -1 0 0 0 0 -1 32039.DAT\r\n0 STEP\r\n1 7 1 -72 -270 0 0 1 0 1 0 -1 0 0 3022.DAT\r\n1 67580019 0 -80 -260 1 0 0 0 1 0 0 0 1 2419.DAT\r\n0 STEP\r\n1 0 0 -176 -70 0 0 1 0 1 0 -1 0 0 5306.DAT\r\n1 0 -40 -176 -70 0 0 1 0 1 0 -1 0 0 5306.DAT\r\n1 0 40 -176 -70 0 0 1 0 1 0 -1 0 0 5306.DAT\r\n1 7 0 -168 -110 1 0 0 0 1 0 0 0 1 884.DAT\r\n0 STEP\r\n1 0 80 -24 -170 1 0 0 0 1 0 0 0 1 2780.DAT\r\n1 0 -80 -24 -170 1 0 0 0 1 0 0 0 1 2780.DAT\r\n1 0 -80 -144 -170 1 0 0 0 1 0 0 0 1 32002.DAT\r\n1 0 80 -144 -170 -1 0 0 0 1 0 0 0 -1 32002.DAT\r\n0 STEP\r\n1 0 90 -64 -178 0 0 1 1 0 0 0 1 0 2730.DAT\r\n0 STEP\r\n0 ROTSTEP 20.1316 -56.917 0 ABS\r\n1 0 -90 -85 -180 0 0 1 1 0 0 0 1 0 2730.DAT\r\n0 STEP\r\n0 ROTSTEP END\r\n1 7 90 -105 -188 0 0 1 1 0 0 0 1 0 3023.DAT\r\n1 7 90 -105 -196 0 0 1 1 0 0 0 1 0 3023.DAT\r\n1 0 90 -105 -220 0 0 1 1 0 0 0 1 0 3700.DAT\r\n1 0 90 -105 -244 0 0 1 1 0 0 0 1 0 3004.DAT\r\n1 0 90 -105 -292 0 0 1 1 0 0 0 1 0 3004.DAT\r\n1 0 90 -105 -316 0 0 1 1 0 0 0 1 0 3004.DAT\r\n1 67580019 90 -105 -268 0 0 1 1 0 0 0 1 0 32064.DAT\r\n1 0 90 -245 -340 0 0 1 1 0 0 0 1 0 3703.DAT\r\n0 STEP\r\n1 0 100 -106 -331 -1 0 0 0 -1 0 0 0 1 2780.DAT\r\n1 0 100 -106 -211 -1 0 0 0 -1 0 0 0 1 2780.DAT\r\n1 0 100 -106 -166 -1 0 0 0 -1 0 0 0 1 2780.DAT\r\n0 STEP\r\n1 0 110 -116 -250 0 0 -1 0 1 0 1 0 0 2730.DAT\r\n0 STEP\r\n1 0 90 -464 -340 0 0 -1 -1 0 0 0 1 0 3894.DAT\r\n1 7 90 -425 -348 0 0 -1 -1 0 0 0 1 0 4477.DAT\r\n1 7 90 -425 -316 0 0 -1 -1 0 0 0 1 0 4477.DAT\r\n1 7 90 -465 -356 0 0 -1 -1 0 0 0 1 0 3666.DAT\r\n1 67580019 90 -445 -380 0 0 -1 -1 0 0 0 1 0 32064.DAT\r\n0 STEP\r\n1 19 80 -444 -372 1 0 0 0 -1 0 0 0 -1 3749.DAT\r\n1 7 80 -464 -330 1 0 0 0 -1 0 0 0 -1 3673.DAT\r\n0 STEP\r\n1 0 70 -452 -330 0 0 -1 0 -1 0 -1 0 0 3894.DAT\r\n1 67580019 70 -428 -290 0 0 -1 0 -1 0 -1 0 0 32064.DAT\r\n0 STEP\r\n0 ROTSTEP 20.1316 -55.4941 0 ABS\r\n1 7 -90 -125 -188 0 0 -1 -1 0 0 0 1 0 3023.DAT\r\n1 7 -90 -125 -196 0 0 -1 -1 0 0 0 1 0 3023.DAT\r\n1 0 -90 -125 -220 0 0 -1 -1 0 0 0 1 0 3700.DAT\r\n1 7 -90 -125 -228 0 0 -1 -1 0 0 0 1 0 3023.DAT\r\n0 STEP\r\n1 0 -100 -127 -210 1 0 0 0 -1 0 0 0 -1 2780.DAT\r\n1 0 -100 -127 -170 1 0 0 0 -1 0 0 0 -1 2780.DAT\r\n0 STEP\r\n1 0 -110 -136 -190 0 0 1 0 1 0 -1 0 0 3701.DAT\r\n0 STEP\r\n1 67350587 -120 -5 -188 -1 0 0 0 0 1 0 1 0 2982C01.DAT\r\n1 0 40 -177 -169 0 0 1 0 1 0 -1 0 0 5306.DAT\r\n1 0 -90 -45 -204 0 0 1 1 0 0 0 1 0 3004.DAT\r\n1 7 -90 -45 -212 0 0 -1 -1 0 0 0 1 0 32028.DAT\r\n1 7 -90 -25 -220 0 0 -1 -1 0 0 0 1 0 3743.DAT\r\n0 STEP\r\n0 ROTSTEP END\r\n1 7 0 -176 -10 1 0 0 0 1 0 0 0 1 3832.DAT\r\n0 STEP\r\n1 7 -80 -184 -10 1 0 0 0 1 0 0 0 1 3022.DAT\r\n1 7 80 -184 -10 1 0 0 0 1 0 0 0 1 3022.DAT\r\n1 67350587 80 -192 -10 1 0 0 0 1 0 0 0 1 3022.DAT\r\n1 67350587 -80 -192 -10 1 0 0 0 1 0 0 0 1 3022.DAT\r\n1 67350587 0 -208 -10 1 0 0 0 1 0 0 0 1 3022.DAT\r\n1 0 -80 -216 -10 1 0 0 0 1 0 0 0 1 3003.DAT\r\n1 0 80 -216 -10 1 0 0 0 1 0 0 0 1 3003.DAT\r\n1 0 0 -200 -10 1 0 0 0 1 0 0 0 1 3003.DAT\r\n0 STEP\r\n1 14 -70 -240 -10 0 0 1 0 1 0 -1 0 0 3700.DAT\r\n1 14 70 -240 -10 0 0 1 0 1 0 -1 0 0 3700.DAT\r\n1 0 90 -240 -10 0 0 1 0 1 0 -1 0 0 3700.DAT\r\n1 0 -90 -240 -10 0 0 1 0 1 0 -1 0 0 3700.DAT\r\n0 STEP\r\n1 0 0 -200 -70 1 0 0 0 1 0 0 0 1 2456.DAT\r\n1 7 0 -208 -60 1 0 0 0 1 0 0 0 1 3666.DAT\r\n1 7 0 -208 -80 1 0 0 0 1 0 0 0 1 3666.DAT\r\n0 STEP\r\n1 7 -40 -216 -70 1 0 0 0 1 0 0 0 1 3022.DAT\r\n1 7 40 -216 -70 1 0 0 0 1 0 0 0 1 3022.DAT\r\n1 14 0 -216 -30 0 0 1 0 1 0 -1 0 0 3020.DAT\r\n0 STEP\r\n1 7 0 -224 -60 1 0 0 0 1 0 0 0 1 3666.DAT\r\n1 7 0 -224 -80 1 0 0 0 1 0 0 0 1 3710.DAT\r\n0 STEP\r\n1 67580019 -30 -248 -70 0 0 1 0 1 0 -1 0 0 32064.DAT\r\n1 67580019 30 -248 -70 0 0 1 0 1 0 -1 0 0 32064.DAT\r\n0 STEP\r\n1 7 0 -259 -80 0 0 -1 -1 0 0 0 1 0 879.DAT\r\n1 0 0 -241 -72 -1 0 0 0 -1 0 0 0 1 3705.DAT\r\n1 0 0 -270 -96 0 0 1 1 0 0 0 1 0 5306.DAT\r\n1 0 0 -176 -169 0 0 1 0 1 0 -1 0 0 5306.DAT\r\n0 STEP\r\n1 7 0 -270 -104 -1 0 0 0 0 1 0 1 0 3832.DAT\r\n1 14 -80 -250 -96 0 0 1 1 0 0 0 1 0 3020.DAT\r\n1 7 80 -250 -96 0 0 1 1 0 0 0 1 0 3709B.DAT\r\n0 STEP\r\n0 ROTSTEP 16.5789 159.368 0 ABS\r\n1 0 0 -240 -10 0 0 -1 0 1 0 1 0 0 3003.DAT\r\n1 0 -100 -228 -10 -1 0 0 0 1 0 0 0 -1 3707.DAT\r\n1 0 100 -228 -10 -1 0 0 0 1 0 0 0 -1 3707.DAT\r\n1 7 50 -228 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n1 7 -50 -228 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n0 STEP\r\n1 7 0 -248 -10 1 0 0 0 1 0 0 0 1 3832.DAT\r\n1 7 -110 -228 -10 0 0 1 0 1 0 -1 0 0 4019.DAT\r\n1 7 110 -228 -10 0 0 1 0 1 0 -1 0 0 4019.DAT\r\n0 STEP\r\n1 7 -150 -228 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n1 7 150 -228 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n1 15 130 -228 -10 0 0 -1 0 1 0 1 0 0 32007.DAT\r\n1 15 -130 -228 -10 0 0 -1 0 1 0 1 0 0 32007.DAT\r\n1 14 -170 -228 -10 0 0 -1 0 1 0 1 0 0 3482.DAT\r\n1 14 170 -228 -10 0 0 -1 0 1 0 1 0 0 3482.DAT\r\n1 0 130 -106 -8 0 0 -1 -1 0 0 0 1 0 680C01.DAT\r\n1 0 -130 -106 -8 0 0 -1 -1 0 0 0 1 0 680C01.DAT\r\n0 STEP\r\n0 ROTSTEP END\r\n1 7 -40 45 -330 0 -1 0 -1 0 0 0 0 -1 32039.DAT\r\n1 7 40 45 -330 0 -1 0 -1 0 0 0 0 -1 32039.DAT\r\n0 STEP\r\n1 0 40 45 -445 0 -1 0 0 0 1 -1 0 0 3708.DAT\r\n1 0 -40 45 -445 0 -1 0 0 0 1 -1 0 0 3708.DAT\r\n0 STEP\r\n1 7 -40 44 -350 1 0 0 0 1 0 0 0 1 3713.DAT\r\n1 7 40 44 -350 1 0 0 0 1 0 0 0 1 3713.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -367 1 0 0 0 0 -1 0 1 0 79.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -372 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -377 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -382 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -387 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -392 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -397 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -402 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -407 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -412 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -417 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -422 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -427 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -432 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -437 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -442 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -447 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -452 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -457 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -462 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -467 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -472 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -477 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -482 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -487 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -492 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -497 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -502 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -507 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -512 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -517 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -522 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -527 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -532 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -537 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -542 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 GROUP 36 hose\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -367 1 0 0 0 0 -1 0 1 0 79.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -372 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -377 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -382 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -387 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -392 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -397 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -402 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -407 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -412 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -417 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -422 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -427 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -432 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -437 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -442 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -447 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -452 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -457 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -462 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -467 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -472 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -477 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -482 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -487 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -492 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -497 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -502 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -507 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -512 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -517 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -522 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -527 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -532 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -537 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -542 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 GROUP 36 hose2\r\n0 STEP\r\n1 7 -40 44 -575 -1 0 0 0 1 0 0 0 -1 32015.DAT\r\n1 7 40 44 -575 -1 0 0 0 1 0 0 0 -1 32015.DAT\r\n1 0 40 -61.35 -614.055 0 1 0 0.939693 0 0.34202 0.34202 0 -0.939693 3737.DAT\r\n1 0 -40 -61.35 -614.055 0 1 0 0.939693 0 0.34202 0.34202 0 -0.939693 3737.DAT\r\n0\r\n';
            var url = '';
            // $.ajax({
            // 	type: 'GET',
            // 	url: url,
            // 	success: (partFile: string) => {
            // 		callback(FileParser.Parse(partFile));
            // 	},
            // 	error: () => {
            // 		// TODO
            // 	},
            // 	dataType: 'text'
            // });
            callback(LdrawVisualizer.Parser.FileParser.Parse(temporaryBrickFileForTesting));
        }
        FileService.GetPart = GetPart;
    })(FileService = LdrawVisualizer.FileService || (LdrawVisualizer.FileService = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="./parser/file-service.ts" />
/// <reference path="./parser/LdrawFile.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    LdrawVisualizer.FileService.GetPart('fake', function (part) {
        console.log(part);
    });
    if (!Detector.webgl)
        Detector.addGetWebGLMessage();
    var container;
    var camera, controls, scene, renderer;
    init();
    render();
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
    }
    function init() {
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 200;
        controls = new THREE.OrbitControls(camera);
        controls.damping = 0.2;
        controls.addEventListener('change', render);
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x111111, 0.002);
        var cubeGeometry = new THREE.BoxGeometry(96, 65, 160);
        var cylinderGeometry = new THREE.CylinderGeometry(12, 12, 9, 32);
        var material = new THREE.MeshPhongMaterial({ color: 0xff0000, shading: THREE.FlatShading });
        // just for looks.
        var cube = new THREE.Mesh(cubeGeometry, material);
        scene.add(cube);
        var cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 24;
        cylinder.position.z = 50 - 30;
        scene.add(cylinder);
        cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 72;
        cylinder.position.z = 50 - 30;
        scene.add(cylinder);
        cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 24;
        cylinder.position.z = 50 + 6;
        scene.add(cylinder);
        cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 72;
        cylinder.position.z = 50 + 6;
        scene.add(cylinder);
        cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 24;
        cylinder.position.z = 50 - 66;
        scene.add(cylinder);
        cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 72;
        cylinder.position.z = 50 - 66;
        scene.add(cylinder);
        cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 24;
        cylinder.position.z = 50 - 102;
        scene.add(cylinder);
        cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 72;
        cylinder.position.z = 50 - 102;
        scene.add(cylinder);
        // for (var i = 0; i < 500; i++) {
        // 	var mesh = new THREE.Mesh(geometry, material);
        // 	mesh.position.x = (Math.random() - 0.5) * 1000;
        // 	mesh.position.y = (Math.random() - 0.5) * 1000;
        // 	mesh.position.z = (Math.random() - 0.5) * 1000;
        // 	mesh.updateMatrix();
        // 	mesh.matrixAutoUpdate = false;
        // 	scene.add(mesh);
        // }
        // lights
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, .6, -.2);
        scene.add(directionalLight);
        directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(-1, -1.5, 1.7);
        scene.add(directionalLight);
        var ambientLight = new THREE.AmbientLight(0x000000);
        scene.add(ambientLight);
        // renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(scene.fog.color);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container = document.getElementById('container');
        container.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);
        animate();
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    }
    function render() {
        renderer.render(scene, camera);
    }
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="jquery.d.ts" />
function test_add() {
    $("p").add("div").addClass("widget");
    var pdiv = $("p").add("div");
    $('li').add('p').css('background-color', 'red');
    $('li').add(document.getElementsByTagName('p')[0])
        .css('background-coailor', 'red');
    $('li').add('<p id="new">new paragraph</p>')
        .css('background-color', 'red');
    $("div").css("border", "2px solid red")
        .add("p")
        .css("background", "yellow");
    $("p").add("span").css("background", "yellow");
    $("p").clone().add("<span>Again</span>").appendTo(document.body);
    $("p").add(document.getElementById("a")).css("background", "yellow");
    var collection = $("p");
    collection = collection.add(document.getElementById("a"));
    collection.css("background", "yellow");
}
function test_addClass() {
    $("p").addClass("myClass yourClass");
    $("p").removeClass("myClass noClass").addClass("yourClass");
    $("ul li:last").addClass(function (index) {
        return "item-" + index;
    });
    $("p:last").addClass("selected");
    $("p:last").addClass("selected highlight");
    $("div").addClass(function (index, currentClass) {
        var addedClass;
        if (currentClass === "red") {
            addedClass = "green";
            $("p").text("There is one green div");
        }
        return addedClass;
    });
}
function test_after() {
    $('.inner').after('<p>Test</p>');
    $('<div/>').after('<p></p>');
    $('<div/>').after('<p></p>').addClass('foo')
        .filter('p').attr('id', 'bar').html('hello')
        .end()
        .appendTo('body');
    $('p').after(function () {
        return '<div>' + this.className + '</div>';
    });
    var $newdiv1 = $('<div id="object1"/>'), newdiv2 = document.createElement('div'), existingdiv1 = document.getElementById('foo');
    $('p').first().after($newdiv1, [newdiv2, existingdiv1]);
    $("p").after(document.createTextNode("Hello"));
    $("p").after($("b"));
}
function test_ajax() {
    $.ajax({
        url: "test.html",
        context: document.body
    }).done(function () {
        $(this).addClass("done");
    });
    $.ajax({
        statusCode: {
            404: function () {
                alert("page not found");
            }
        }
    });
    $.ajax({
        url: "http://fiddle.jshell.net/favicon.png",
        beforeSend: function (xhr) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        }
    }).done(function (data) {
        if (console && console.log) {
            console.log("Sample of data:", data.slice(0, 100));
        }
    });
    $.ajax({
        url: 'ajax/test.html',
        success: function (data) {
            $('.result').html(data);
            alert('Load was performed.');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Load failed. responseJSON=' + jqXHR.responseJSON);
        }
    });
    var _super = jQuery.ajaxSettings.xhr;
    jQuery.ajaxSettings.xhr = function () {
        var xhr = _super(), getAllResponseHeaders = xhr.getAllResponseHeaders;
        xhr.getAllResponseHeaders = function () {
            if (getAllResponseHeaders()) {
                return getAllResponseHeaders();
            }
            var allHeaders = "";
            $(["Cache-Control", "Content-Language", "Content-Type",
                "Expires", "Last-Modified", "Pragma"]).each(function (i, header_name) {
                if (xhr.getResponseHeader(header_name)) {
                    allHeaders += header_name + ": " + xhr.getResponseHeader(header_name) + "\n";
                }
                return allHeaders;
            });
        };
        return xhr;
    };
    $.ajax({
        type: "POST",
        url: "some.php",
        data: { name: "John", location: "Boston" }
    }).done(function (msg) {
        alert("Data Saved: " + msg);
    });
    $.ajax({
        url: "test.html",
        cache: false
    }).done(function (html) {
        $("#results").append(html);
    });
    var xmlDocument = [];
    var xmlRequest = $.ajax({
        url: "page.php",
        processData: false,
        data: xmlDocument
    });
    var handleResponse;
    xmlRequest.done(handleResponse);
    var menuId = $("ul.nav").first().attr("id");
    var request = $.ajax({
        url: "script.php",
        type: "POST",
        data: { id: menuId },
        dataType: "html"
    });
    request.done(function (msg) {
        $("#log").html(msg);
    });
    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
    $.ajax({
        type: "GET",
        url: "test.js",
        dataType: "script"
    });
    // Test the jqXHR object returned by $.ajax() as of 1.5
    // More details: http://api.jquery.com/jQuery.ajax/#jqXHR
    // done method
    $.ajax({
        url: "test.js"
    }).done(function (data, textStatus, jqXHR) {
        console.log(data, textStatus, jqXHR);
    });
    // fail method
    $.ajax({
        url: "test.js"
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
    });
    // always method with successful request
    $.ajax({
        url: "test.js"
    }).always(function (data, textStatus, jqXHR) {
        console.log(data, textStatus, jqXHR);
    });
    // always method with failed request
    $.ajax({
        url: "test.js"
    }).always(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
    });
    // then method (as of 1.8)
    $.ajax({
        url: "test.js"
    }).then(function (data, textStatus, jqXHR) {
        console.log(data, textStatus, jqXHR);
    }, function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
    });
    // jqXHR object
    var jqXHR = $.ajax({
        url: "test.js"
    });
    jqXHR.abort('aborting because I can');
}
function test_ajaxComplete() {
    $('.log').ajaxComplete(function () {
        $(this).text('Triggered ajaxComplete handler.');
    });
    $('.trigger').click(function () {
        $('.result').load('ajax/test.html');
    });
    $('.log').ajaxComplete(function (e, xhr, settings) {
        if (settings.url == 'ajax/test.html') {
            $(this).text('Triggered ajaxComplete handler. The result is ' + xhr.responseText);
        }
    });
    $("#msg").ajaxComplete(function (event, request, settings) {
        $(this).append("<li>Request Complete.</li>");
    });
}
function test_ajaxError() {
    $("div.log").ajaxError(function () {
        $(this).text("Triggered ajaxError handler.");
    });
    $("button.trigger").click(function () {
        $("div.result").load("ajax/missing.html");
    });
    $("div.log").ajaxError(function (e, jqxhr, settings, exception) {
        if (settings.url == "ajax/missing.html") {
            $(this).text("Triggered ajaxError handler.");
        }
    });
    $("#msg").ajaxError(function (event, request, settings) {
        $(this).append("<li>Error requesting page " + settings.url + "</li>");
    });
}
function test_ajaxPrefilter() {
    var currentRequests = {};
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (options.abortOnRetry) {
            if (currentRequests[options.url]) {
                currentRequests[options.url].abort();
            }
            currentRequests[options.url] = jqXHR;
        }
    });
    $.ajaxPrefilter(function (options) {
        if (options.crossDomain) {
            options.url = "http://mydomain.net/proxy/" + encodeURIComponent(options.url);
            options.crossDomain = false;
        }
    });
    $.ajaxPrefilter("json script", function (options, originalOptions, jqXHR) {
    });
    var isActuallyScript;
    $.ajaxPrefilter(function (options) {
        if (isActuallyScript(options.url)) {
            return "script";
        }
    });
}
function test_ajaxSend() {
    $('.log').ajaxSend(function () {
        $(this).text('Triggered ajaxSend handler.');
    });
    $('.trigger').click(function () {
        $('.result').load('ajax/test.html');
    });
    $('.log').ajaxSend(function (e, jqxhr, settings) {
        if (settings.url == 'ajax/test.html') {
            $(this).text('Triggered ajaxSend handler.');
        }
    });
    $("#msg").ajaxSend(function (evt, request, settings) {
        $(this).append("<li>Starting request at " + settings.url + "</li>");
    });
}
function test_ajaxSetup() {
    $.ajaxSetup({
        url: 'ping.php'
    });
    $.ajax({
        data: { 'name': 'Dan' }
    });
    $.ajaxSetup({
        url: "/xmlhttp/",
        global: false,
        type: "POST"
    });
}
function test_ajaxStart() {
    $('.log').ajaxStart(function () {
        $(this).text('Triggered ajaxStart handler.');
    });
    $('.trigger').click(function () {
        $('.result').load('ajax/test.html');
    });
    $("#loading").ajaxStart(function () {
        $(this).show();
    });
}
function test_ajaxStop() {
    $('.log').ajaxStop(function () {
        $(this).text('Triggered ajaxStop handler.');
    });
    $('.trigger').click(function () {
        $('.result').load('ajax/test.html');
    });
    $("#loading").ajaxStop(function () {
        $(this).hide();
    });
}
function test_ajaxSuccess() {
    $('.log').ajaxSuccess(function () {
        $(this).text('Triggered ajaxSuccess handler.');
    });
    $('.trigger').click(function () {
        $('.result').load('ajax/test.html');
    });
    $('.log').ajaxSuccess(function (e, xhr, settings) {
        if (settings.url == 'ajax/test.html') {
            $(this).text('Triggered ajaxSuccess handler. The ajax response was:' + xhr.responseText);
        }
    });
    $("#msg").ajaxSuccess(function (evt, request, settings) {
        $(this).append("<li>Successful Request!</li>");
    });
}
function test_allSelector() {
    var elementCount = $("*").css("border", "3px solid red").length;
    $("body").prepend("<h3>" + elementCount + " elements found</h3>");
    var elementCount2 = $("#test").find("*").css("border", "3px solid red").length;
    $("body").prepend("<h3>" + elementCount2 + " elements found</h3>");
}
function test_animate() {
    $('#clickme').click(function () {
        $('#book').animate({
            opacity: 0.25,
            left: '+=50',
            height: 'toggle'
        }, 5000, function () {
        });
    });
    $('li').animate({
        opacity: .5,
        height: '50%'
    }, {
        step: function (now, fx) {
            var data = fx.elem.id + ' ' + fx.prop + ': ' + now;
            $('body').append('<div>' + data + '</div>');
        }
    });
    $('#clickme').click(function () {
        $('#book').animate({
            width: ['toggle', 'swing'],
            height: ['toggle', 'swing'],
            opacity: 'toggle'
        }, 5000, 'linear', function () {
            $(this).after('<div>Animation complete.</div>');
        });
    });
    $('#clickme').click(function () {
        $('#book').animate({
            width: 'toggle',
            height: 'toggle'
        }, {
            duration: 5000,
            specialEasing: {
                width: 'linear',
                height: 'easeOutBounce'
            },
            complete: function () {
                $(this).after('<div>Animation complete.</div>');
            }
        });
    });
    $("#go").click(function () {
        $("#block").animate({
            width: "70%",
            opacity: 0.4,
            marginLeft: "0.6in",
            fontSize: "3em",
            borderWidth: "10px"
        }, 1500);
    });
    $("#right").click(function () {
        $(".block").animate({ "left": "+=50px" }, "slow");
    });
    $("#left").click(function () {
        $(".block").animate({ "left": "-=50px" }, "slow");
    });
    $("#go1").click(function () {
        $("#block1").animate({ width: "90%" }, { queue: false, duration: 3000 })
            .animate({ fontSize: "24px" }, 1500)
            .animate({ borderRightWidth: "15px" }, 1500);
    });
    $("#go2").click(function () {
        $("#block2").animate({ width: "90%" }, 1000)
            .animate({ fontSize: "24px" }, 1000)
            .animate({ borderLeftWidth: "15px" }, 1000);
    });
    $("#go3").click(function () {
        $("#go1").add("#go2").click();
    });
    $("#go4").click(function () {
        $("div").css({ width: "", fontSize: "", borderWidth: "" });
    });
    $("#go").click(function () {
        $(".block:first").animate({
            left: 100
        }, {
            duration: 1000,
            step: function (now, fx) {
                $(".block:gt(0)").css("left", now);
            }
        });
    });
    $("p").animate({
        height: "toggle", opacity: "toggle"
    }, "slow");
    $("p").animate({
        left: 50, opacity: 1
    }, 500);
    $("p").animate({
        left: "50px", opacity: 1
    }, { duration: 500, queue: false });
    $("p").animate({
        opacity: "show"
    }, "slow", "easein");
    $("p").animate({
        height: "toggle", opacity: "toggle"
    }, { duration: "slow" });
    $("p").animate({
        opacity: "show"
    }, { duration: "slow", easing: "easein" });
    $("p").animate({
        height: 200, width: 400, opacity: 0.5
    }, 1000, "linear", function () {
        alert("all done");
    });
}
function test_animatedSelector() {
    $("#run").click(function () {
        $("div:animated").toggleClass("colored");
    });
    function animateIt() {
        $("#mover").slideToggle("slow", animateIt);
    }
    animateIt();
}
function test_slideToggle() {
    $("button").click(function () {
        $("p").slideToggle("slow");
    });
    $("#aa").click(function () {
        $("div:not(.still)").slideToggle("slow", function () {
            var n = parseInt($("span").text(), 10);
            $("span").text(n + 1);
        });
    });
}
function test_toggle() {
    $(".target").toggle();
    $("#clickme").click(function () {
        $("#book").toggle("slow", function () {
            // Animation complete.
        });
    });
    $("#foo").toggle(true);
    $("button").click(function () {
        $("p").toggle();
    });
    $("button").click(function () {
        $("p").toggle("slow");
    });
    var flip = 0;
    $("button").click(function () {
        $("p").toggle(flip++ % 2 === 0);
    });
}
function test_append() {
    $('.inner').append('<p>Test</p>');
    $('.container').append($('h2'));
    var $newdiv1 = $('<div id="object1"/>'), newdiv2 = document.createElement('div'), existingdiv1 = document.getElementById('foo');
    $('body').append($newdiv1, [newdiv2, existingdiv1]);
}
function test_appendTo() {
    $('<p>Test</p>').appendTo('.inner');
    $('h2').appendTo($('.container'));
}
function test_attr() {
    var title = $("em").attr("title");
    $("div").text(title);
    $('#greatphoto').attr('alt', 'Beijing Brush Seller');
    $('#greatphoto')
        .attr('title', 'Photo by Kelly Clark');
    $('#greatphoto').attr({
        alt: 'Beijing Brush Seller',
        title: 'photo by Kelly Clark'
    });
    $('#greatphoto').attr('title', function (i, val) {
        return val + ' - photo by Kelly Clark';
    });
    $("div").attr("id", function (arr) {
        return "div-id" + arr;
    })
        .each(function () {
        $("span", this).html("(ID = '<b>" + this.id + "</b>')");
    });
    $("img").attr("src", function () {
        return "/images/" + this.title;
    });
}
function test_attributeSelectors() {
    $('a[hreflang|="en"]').css('border', '3px dotted green');
    $('input[name*="man"]').val('has man in it!');
    $('input[name~="man"]').val('mr. man is in it!');
    $('input[name$="letter"]').val('a letter');
    $('input[value="Hot Fuzz"]').next().text(" Hot Fuzz");
    $('input[name!="newsletter"]').next().append('<b>; not newsletter</b>');
    $('input[name^="news"]').val('news here!');
}
function test_before() {
    $('.inner').before('<p>Test</p>');
    $('.container').before($('h2'));
    $("<div/>").before("<p></p>");
    var $newdiv1 = $('<div id="object1"/>'), newdiv2 = document.createElement('div'), existingdiv1 = document.getElementById('foo');
    $('p').first().before($newdiv1, [newdiv2, existingdiv1]);
}
function test_bind() {
    $('#foo').bind('click', function () {
        alert('User clicked on "foo."');
    });
    $('#foo').bind('mouseenter mouseleave', function () {
        $(this).toggleClass('entered');
    });
    $('#foo').bind({
        click: function () { },
        mouseenter: function () { }
    });
    $('#foo').bind('click', function () {
        alert($(this).text());
    });
    $(document).ready(function () {
        $('#foo').bind('click', function (event) {
            alert('The mouse cursor is at ('
                + event.pageX + ', ' + event.pageY + ')');
        });
    });
    var message = 'Spoon!';
    $('#foo').bind('click', function () {
        alert(message);
    });
    message = 'Not in the face!';
    $('#bar').bind('click', function () {
        alert(message);
    });
    var message = 'Spoon!';
    $('#foo').bind('click', { msg: message }, function (event) {
        alert(event.data.msg);
    });
    message = 'Not in the face!';
    $('#bar').bind('click', { msg: message }, function (event) {
        alert(event.data.msg);
    });
    $("p").bind("click", function (event) {
        var str = "( " + event.pageX + ", " + event.pageY + " )";
        $("span").text("Click happened! " + str);
    });
    $("p").bind("dblclick", function () {
        $("span").text("Double-click happened in " + this.nodeName);
    });
    $("p").bind("mouseenter mouseleave", function (event) {
        $(this).toggleClass("over");
    });
    $("p").bind("click", function () {
        alert($(this).text());
    });
    function handler(event) {
        alert(event.data.foo);
    }
    $("p").bind("click", { foo: "bar" }, handler);
    $("form").bind("submit", function () { return false; });
    $("form").bind("submit", function (event) {
        event.preventDefault();
    });
    $("form").bind("submit", function (event) {
        event.stopPropagation();
    });
    $("p").bind("myCustomEvent", function (e, myName, myValue) {
        $(this).text(myName + ", hi there!");
        $("span").stop().css("opacity", 1)
            .text("myName = " + myName)
            .fadeIn(30).fadeOut(1000);
    });
    $("button").click(function () {
        $("p").trigger("myCustomEvent", ["John"]);
    });
    $("div.test").bind({
        click: function () {
            $(this).addClass("active");
        },
        mouseenter: function () {
            $(this).addClass("inside");
        },
        mouseleave: function () {
            $(this).removeClass("inside");
        }
    });
}
function test_unbind() {
    $("#foo").unbind();
    $("#foo").unbind("click");
    var handler = function () {
        alert("The quick brown fox jumps over the lazy dog.");
    };
    $("#foo").bind("click", handler);
    $("#foo").unbind("click", handler);
    $("#foo").bind("click", function () {
        alert("The quick brown fox jumps over the lazy dog.");
    });
    // Will NOT work
    $("#foo").unbind("click", function () {
        alert("The quick brown fox jumps over the lazy dog.");
    });
    $("#foo").bind("click.myEvents", handler);
    $("#foo").unbind("click");
    $("#foo").unbind("click.myEvents");
    $("#foo").unbind(".myEvents");
    var timesClicked = 0;
    $("#foo").bind("click", function (event) {
        alert("The quick brown fox jumps over the lazy dog.");
        timesClicked++;
        if (timesClicked >= 3) {
            $(this).unbind(event);
        }
    });
    function aClick() {
        $("div").show().fadeOut("slow");
    }
    $("#bind").click(function () {
        $("#theone")
            .bind("click", aClick)
            .text("Can Click!");
    });
    $("#unbind").click(function () {
        $("#theone")
            .unbind("click", aClick)
            .text("Does nothing...");
    });
    $("p").unbind();
    $("p").unbind("click");
    var foo = function () {
        // Code to handle some kind of event
    };
    $("p").bind("click", foo); // ... Now foo will be called when paragraphs are clicked ...
    $("p").unbind("click", foo); // ... foo will no longer be called.
}
function test_blur() {
    $('#target').blur(function () {
        alert('Handler for .blur() called.');
    });
    $('#other').click(function () {
        $('#target').blur();
    });
    $("p").blur();
}
function test_callbacks() {
    function fn1(value) {
        console.log(value);
    }
    function fn2(value) {
        fn1("fn2 says:" + value);
        return false;
    }
    var callbacks = $.Callbacks();
    var callbacks2 = $.Callbacks("once");
    callbacks.add(fn1);
    callbacks.fire("foo!");
    callbacks.add(fn2);
    callbacks.fire("bar!");
    callbacks.remove(fn2);
    callbacks.fire("foobar");
    var topics = {};
    jQuery.Topic = function (id) {
        var callbacks, method, topic = id && topics[id];
        if (!topic) {
            callbacks = jQuery.Callbacks();
            topic = {
                publish: callbacks.fire,
                subscribe: callbacks.add,
                unsubscribe: callbacks.remove
            };
            if (id) {
                topics[id] = topic;
            }
        }
        return topic;
    };
    $.Topic("mailArrived").subscribe(fn1);
    $.Topic("mailArrived").subscribe(fn2);
    $.Topic("mailSent").subscribe(fn1);
    $.Topic("mailArrived").publish("hello world!");
    $.Topic("mailSent").publish("woo! mail!");
    $.Topic("mailArrived").subscribe(fn1);
    var dfd = $.Deferred();
    var topic = $.Topic("mailArrived");
    dfd.done(topic.publish);
    dfd.resolve("its been published!");
}
function test_callbacksFunctions() {
    var foo = function (value) {
        console.log('foo:' + value);
    };
    var bar = function (value) {
        console.log('bar:' + value);
    };
    var callbacks = $.Callbacks();
    callbacks.add(foo);
    callbacks.fire('hello');
    callbacks.add(bar);
    callbacks.fire('world');
    callbacks.disable();
    // Test the disabled state of the list
    console.log(callbacks.disabled());
    // Outputs: true
    callbacks.empty();
    callbacks.fire('hello');
    console.log(callbacks.fired());
    callbacks.fireWith(window, ['foo', 'bar']);
    var foo2 = function (value1, value2) {
        console.log('Received:' + value1 + ',' + value2);
    };
    console.log(callbacks.has(foo2));
    callbacks.lock();
    console.log(callbacks.locked());
    callbacks.remove(foo);
}
function test_change() {
    $('.target').change(function () {
        alert('Handler for .change() called.');
    });
    $('#other').click(function () {
        $('.target').change();
    });
    $("input[type='text']").change(function () { });
    $("input[type='text']").change();
}
function test_children() {
    $('ul.level-2').children().css('background-color', 'red');
    $("#container").click(function (e) {
        $("*").removeClass("hilite");
        var $kids = $(e.target).children();
        var len = $kids.addClass("hilite").length;
        $("#results span:first").text(len);
        //$("#results span:last").text(e.target.tagName);
        e.preventDefault();
        return false;
    });
    $("div").children(".selected").css("color", "blue");
}
function test_clearQueue() {
    $("#start").click(function () {
        var myDiv = $("div");
        myDiv.show("slow");
        myDiv.animate({ left: '+=200' }, 5000);
        myDiv.queue(function () {
            var _this = $(this);
            _this.addClass("newcolor");
            _this.dequeue();
        });
        myDiv.animate({ left: '-=200' }, 1500);
        myDiv.queue(function () {
            var _this = $(this);
            _this.removeClass("newcolor");
            _this.dequeue();
        });
        myDiv.slideUp();
    });
    $("#stop").click(function () {
        var myDiv = $("div");
        myDiv.clearQueue();
        myDiv.stop();
    });
}
function test_click() {
    $("#target").click(function () {
        alert("Handler for .click() called.");
    });
    $("#other").click(function () {
        $("#target").click();
    });
    $("p").click(function () {
        $(this).slideUp();
    });
    $("p").click();
}
function test_submit() {
    $("#target").submit(function () {
        alert("Handler for .submit() called.");
    });
    $("#target").submit();
}
function test_trigger() {
    $("#foo").on("click", function () {
        alert($(this).text());
    });
    $("#foo").trigger("click");
    $("#foo").on("custom", function (event, param1, param2) {
        alert(param1 + "\n" + param2);
    });
    $("#foo").trigger("custom", ["Custom", "Event"]);
    $("button:first").click(function () {
        update($("span:first"));
    });
    $("button:last").click(function () {
        $("button:first").trigger("click");
        update($("span:last"));
    });
    function update(j) {
        var n = parseInt(j.text(), 10);
        j.text(n + 1);
    }
    $("form:first").trigger("submit");
    var event = jQuery.Event("submit");
    $("form:first").trigger(event);
    if (event.isDefaultPrevented()) {
    }
    $("p")
        .click(function (event, a, b) {
        // When a normal click fires, a and b are undefined
        // for a trigger like below a refers to "foo" and b refers to "bar"
    })
        .trigger("click", ["foo", "bar"]);
    var event = jQuery.Event("logged");
    event.user = "foo";
    event.pass = "bar";
    $("body").trigger(event);
    // Adapted from jQuery documentation which may be wrong on this occasion
    var event2 = jQuery.Event("logged");
    $("body").trigger(event2, {
        type: "logged",
        user: "foo",
        pass: "bar"
    });
}
function test_clone() {
    $('.hello').clone().appendTo('.goodbye');
    var $elem = $('#elem').data({ "arr": [1] }), $clone = $elem.clone(true)
        .data("arr", $.extend([], $elem.data("arr")));
    $("b").clone().prependTo("p");
    $('#copy').append($('#orig .elem')
        .clone()
        .children('a')
        .prepend('foo - ')
        .parent()
        .clone());
}
function test_prependTo() {
    $("<p>Test</p>").prependTo(".inner");
    $("h2").prependTo($(".container"));
    $("span").prependTo("#foo");
}
function test_closest() {
    $('li.item-a').closest('ul')
        .css('background-color', 'red');
    $('li.item-a').closest('li')
        .css('background-color', 'red');
    var listItemII = document.getElementById('ii');
    $('li.item-a').closest('ul', listItemII)
        .css('background-color', 'red');
    $('li.item-a').closest('#one', listItemII)
        .css('background-color', 'green');
    $(document).bind("click", function (e) {
        $(e.target).closest("li").toggleClass("hilight");
    });
    var $listElements = $("li").css("color", "blue");
    $(document).bind("click", function (e) {
        //$(e.target).closest($listElements).toggleClass("hilight");
    });
}
function test_contains() {
    jQuery.contains(document.documentElement, document.body);
    jQuery.contains(document.body, document.documentElement);
}
function test_contents() {
    $('.container').contents().filter(function () {
        return this.nodeType == 3;
    })
        .wrap('<p></p>')
        .end()
        .filter('br')
        .remove();
    $("#frameDemo").contents().find("a").css("background-color", "#BADA55");
}
function test_context() {
    $("ul")
        .append("<li>" + $("ul").context + "</li>")
        .append("<li>" + $("ul", document.body).context.nodeName + "</li>");
}
function test_css() {
    $("div").click(function () {
        var color = $(this).css("background-color");
        $("#result").html("That div is <span style='color:" + color + ";'>" + color + "</span>.");
    });
    $('div.example').css('width', function (index) {
        return index * 50;
    });
    $("p").mouseover(function () {
        $(this).css("color", "red");
    });
    $("#box").one("click", function () {
        $(this).css("width", "+=200");
    });
    var words = $("p:first").text().split(" ");
    var text = words.join("</span> <span>");
    $("p:first").html("<span>" + text + "</span>");
    $("span").click(function () {
        $(this).css("background-color", "yellow");
    });
    $("p").hover(function () {
        $(this).css({ 'background-color': 'yellow', 'font-weight': 'bolder' });
    }, function () {
        var cssObj = {
            'background-color': '#ddd',
            'font-weight': '',
            'color': 'rgb(0,40,244)'
        };
        $(this).css(cssObj);
    });
    $("div").click(function () {
        $(this).css({
            width: function (index, value) {
                return parseFloat(value) * 1.2;
            },
            height: function (index, value) {
                return parseFloat(value) * 1.2;
            }
        });
    });
    var dims = $("#box").css(["width", "height", "backgroundColor"]);
}
function test_cssHooks() {
    if (!$.cssHooks) {
        throw ("jQuery 1.4.3 or above is required for this plugin to work");
        return;
    }
    $.cssHooks["someCSSProp"] = {
        get: function (elem, computed, extra) { },
        set: function (elem, value) { }
    };
    function styleSupport(prop) {
        var vendorProp, supportedProp, capProp = prop.charAt(0).toUpperCase() + prop.slice(1), prefixes = ["Moz", "Webkit", "O", "ms"], div = document.createElement("div");
        if (prop in div.style) {
            supportedProp = prop;
        }
        else {
            for (var i = 0; i < prefixes.length; i++) {
                vendorProp = prefixes[i] + capProp;
                if (vendorProp in div.style) {
                    supportedProp = vendorProp;
                    break;
                }
            }
        }
        div = null;
        $.support[prop] = supportedProp;
        return supportedProp;
    }
    styleSupport("borderRadius");
    $.cssNumber["someCSSProp"] = true;
    $.fx.step["someCSSProp"] = function (fx) {
        $.cssHooks["someCSSProp"].set(fx.elem, fx.now + fx.unit);
    };
}
function test_data() {
    $('body').data('foo', 52);
    $('body').data('bar', { myType: 'test', count: 40 });
    $('body').data('foo');
    $('body').data();
    $("div").data("test", { first: 16, last: "pizza!" });
    $("span:first").text($("div").data("test").first);
    $("span:last").text($("div").data("test").last);
    alert($('body').data('foo'));
    alert($('body').data());
    alert($("body").data("foo"));
    $("body").data("bar", "foobar");
    alert($("body").data("bar"));
    $("div").data("role") === "page";
    $("div").data("lastValue") === 43;
    $("div").data("hidden") === true;
    $("div").data("options").name === "John";
    var value;
    switch ($("button").index(this)) {
        case 0:
            value = $("div").data("blah");
            break;
        case 1:
            $("div").data("blah", "hello");
            value = "Stored!";
            break;
        case 2:
            $("div").data("blah", 86);
            value = "Stored!";
            break;
        case 3:
            $("div").removeData("blah");
            value = "Removed!";
            break;
    }
    $("span").text("" + value);
    jQuery.data(document.body, 'foo', 52);
    jQuery.data(document.body, 'bar', 'test');
    var div = $("div")[0];
    jQuery.data(div, "test", { first: 16, last: "pizza!" });
    $("span:first").text(jQuery.data(div, "test").first);
    $("span:last").text(jQuery.data(div, "test").last);
    $.data(document.getElementById("id"), "", 8).toFixed(2);
    $.data(document.getElementById("id"), "", "8").toUpperCase();
}
function test_removeData() {
    $("span:eq(0)").text("" + $("div").data("test1"));
    $("div").data("test1", "VALUE-1");
    $("div").data("test2", "VALUE-2");
    $("span:eq(1)").text("" + $("div").data("test1"));
    $("div").removeData("test1");
    $("span:eq(2)").text("" + $("div").data("test1"));
    $("span:eq(3)").text("" + $("div").data("test2"));
}
function test_jQuery_removeData() {
    var div = $("div")[0];
    $("span:eq(0)").text("" + $("div").data("test1"));
    jQuery.data(div, "test1", "VALUE-1");
    jQuery.data(div, "test2", "VALUE-2");
    $("span:eq(1)").text("" + jQuery.data(div, "test1"));
    jQuery.removeData(div, "test1");
    $("span:eq(2)").text("" + jQuery.data(div, "test1"));
    $("span:eq(3)").text("" + jQuery.data(div, "test2"));
}
function test_dblclick() {
    $('#target').dblclick(function () {
        alert('Handler for .dblclick() called.');
    });
    $('#other').click(function () {
        $('#target').dblclick();
    });
    $("p").dblclick(function () { alert("Hello World!"); });
    var divdbl = $("div:first");
    divdbl.dblclick(function () {
        divdbl.toggleClass('dbl');
    });
    $('#target').dblclick();
}
function test_delay() {
    $('#foo').slideUp(300).delay(800).fadeIn(400);
    $("button").click(function () {
        $("div.first").slideUp(300).delay(800).fadeIn(400);
        $("div.second").slideUp(300).fadeIn(400);
    });
}
function test_delegate() {
    $("table").delegate("td", "click", function () {
        $(this).toggleClass("chosen");
    });
    $("table").on("click", "td", function () {
        $(this).toggleClass("chosen");
    });
    $("body").delegate("p", "click", function () {
        $(this).after("<p>Another paragraph!</p>");
    });
    $("body").delegate("p", "click", function () {
        alert($(this).text());
    });
    $("body").delegate("a", "click", function () { return false; });
    $("body").delegate("a", "click", function (event) {
        event.preventDefault();
    });
    $("body").delegate("p", "myCustomEvent", function (e, myName, myValue) {
        $(this).text("Hi there!");
        $("span").stop().css("opacity", 1)
            .text("myName = " + myName)
            .fadeIn(30).fadeOut(1000);
    });
    $("button").click(function () {
        $("p").trigger("myCustomEvent");
    });
}
function test_undelegate() {
    function aClick() {
        $("div").show().fadeOut("slow");
    }
    $("#bind").click(function () {
        $("body")
            .delegate("#theone", "click", aClick)
            .find("#theone").text("Can Click!");
    });
    $("#unbind").click(function () {
        $("body")
            .undelegate("#theone", "click", aClick)
            .find("#theone").text("Does nothing...");
    });
    $("p").undelegate();
    $("p").undelegate("click");
    var foo = function () {
        // Code to handle some kind of event
    };
    // ... Now foo will be called when paragraphs are clicked ...
    $("body").delegate("p", "click", foo);
    // ... foo will no longer be called.
    $("body").undelegate("p", "click", foo);
    var foo = function () {
        // Code to handle some kind of event
    };
    // Delegate events under the ".whatever" namespace
    $("form").delegate(":button", "click.whatever", foo);
    $("form").delegate("input[type='text'] ", "keypress.whatever", foo);
    // Unbind all events delegated under the ".whatever" namespace
    $("form").undelegate(".whatever");
}
function test_dequeue() {
    $("button").click(function () {
        $("div").animate({ left: '+=200px' }, 2000);
        $("div").animate({ top: '0px' }, 600);
        $("div").queue(function () {
            $(this).toggleClass("red");
            $(this).dequeue();
        });
        $("div").animate({ left: '10px', top: '30px' }, 700);
    });
}
function test_queue() {
    $("#show").click(function () {
        var n = jQuery.queue($("div")[0], "fx");
        $("span").text("Queue length is: " + n.length);
    });
    function runIt() {
        $("div")
            .show("slow")
            .animate({
            left: "+=200"
        }, 2000)
            .slideToggle(1000)
            .slideToggle("fast")
            .animate({
            left: "-=200"
        }, 1500)
            .hide("slow")
            .show(1200)
            .slideUp("normal", runIt);
    }
    runIt();
    $(document.body).click(function () {
        var divs = $("div")
            .show("slow")
            .animate({ left: "+=200" }, 2000);
        jQuery.queue(divs[0], "fx", function () {
            $(this).addClass("newcolor");
            jQuery.dequeue(this);
        });
        divs.animate({ left: "-=200" }, 500);
        jQuery.queue(divs[0], "fx", function () {
            $(this).removeClass("newcolor");
            jQuery.dequeue(this);
        });
        divs.slideUp();
    });
    $("#start").click(function () {
        var divs = $("div")
            .show("slow")
            .animate({ left: "+=200" }, 5000);
        jQuery.queue(divs[0], "fx", function () {
            $(this).addClass("newcolor");
            jQuery.dequeue(this);
        });
        divs.animate({ left: "-=200" }, 1500);
        jQuery.queue(divs[0], "fx", function () {
            $(this).removeClass("newcolor");
            jQuery.dequeue(this);
        });
        divs.slideUp();
    });
    $("#stop").click(function () {
        jQuery.queue($("div")[0], "fx", []);
        $("div").stop();
    });
}
function test_detach() {
    $("p").click(function () {
        $(this).toggleClass("off");
    });
    var p;
    $("button").click(function () {
        if (p) {
            p.appendTo("body");
            p = null;
        }
        else {
            p = $("p").detach();
        }
    });
}
function test_each() {
    $.each([52, 97], function (index, value) {
        alert(index + ': ' + value);
    });
    var map = {
        'flammable': 'inflammable',
        'duh': 'no duh'
    };
    $.each(map, function (key, value) {
        alert(key + ': ' + value);
    });
    var arr = ["one", "two", "three", "four", "five"];
    var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 };
    jQuery.each(arr, function () {
        $("#" + this).text("Mine is " + this + ".");
        return (this != "three");
    });
    jQuery.each(obj, function (i, val) {
        $("#" + i).append(document.createTextNode(" - " + val));
    });
    $.each(['a', 'b', 'c'], function (i, l) {
        alert("Index #" + i + ": " + l);
    });
    $.each({ name: "John", lang: "JS" }, function (k, v) {
        alert("Key: " + k + ", Value: " + v);
    });
    $.each([{ a: 1 }, { a: 2 }, { a: 3 }], function (i, o) {
        alert("Index #" + i + ": " + o.a);
    });
    $('li').each(function (index) {
        alert(index + ': ' + $(this).text());
    });
    $(document.body).click(function () {
        $("div").each(function (i) {
            if (this.style.color != "blue") {
                this.style.color = "blue";
            }
            else {
                this.style.color = "";
            }
        });
    });
    $("span").click(function () {
        $("li").each(function () {
            $(this).toggleClass("example");
        });
    });
    $("button").click(function () {
        $("div").each(function (index, domEle) {
            // domEle == this
            $(domEle).css("backgroundColor", "yellow");
            if ($(this).is("#stop")) {
                $("span").text("Stopped at div index #" + index);
                return false;
            }
        });
    });
}
function test_empty() {
    $('.hello').empty();
}
function test_end() {
    $('ul.first').find('.foo').css('background-color', 'red')
        .end().find('.bar').css('background-color', 'green');
    $('ul.first').find('.foo')
        .css('background-color', 'red')
        .end().find('.bar')
        .css('background-color', 'green')
        .end();
}
function test_eq() {
    $('li').eq(2).css('background-color', 'red');
    $('li').eq(-2).css('background-color', 'red');
    $('li').eq(5).css('background-color', 'red');
    $("body").find("div").eq(2).addClass("blue");
}
function test_error() {
    var _this = this;
    $('#book')
        .error(function () {
        alert('Handler for .error() called.');
    })
        .attr("src", "missing.png");
    $("img")
        .error(function () {
        $(this).hide();
    })
        .attr("src", "missing.png");
    jQuery.error = function (message) {
        console.error(message);
        return _this;
    };
}
function test_eventParams() {
    $("p").click(function (event) {
        event.currentTarget === this;
    });
    $(".box").on("click", "button", function (event) {
        $(event.delegateTarget).css("background-color", "red");
    });
    $("a").click(function (event) {
        event.isDefaultPrevented();
        event.preventDefault();
        event.isDefaultPrevented();
    });
    function immediatePropStopped(e) {
        var msg = "";
        if (e.isImmediatePropagationStopped()) {
            msg = "called";
        }
        else {
            msg = "not called";
        }
        $("#stop-log").append("<div>" + msg + "</div>");
    }
    $("button").click(function (event) {
        immediatePropStopped(event);
        event.stopImmediatePropagation();
        immediatePropStopped(event);
    });
    function propStopped(e) {
        var msg = "";
        if (e.isPropagationStopped()) {
            msg = "called";
        }
        else {
            msg = "not called";
        }
        $("#stop-log").append("<div>" + msg + "</div>");
    }
    $("button").click(function (event) {
        propStopped(event);
        event.stopPropagation();
        propStopped(event);
    });
    $("p").bind("test.something", function (event) {
        alert(event.namespace);
    });
    $("button").click(function (event) {
        $("p").trigger("test.something");
    });
    $(document).bind('mousemove', function (e) {
        $("#log").text("e.pageX: " + e.pageX + ", e.pageY: " + e.pageY);
    });
    $("a").click(function (event) {
        event.preventDefault();
        $('<div/>')
            .append('default ' + event.type + ' prevented')
            .appendTo('#log');
    });
    $("a").mouseout(function (event) {
        alert(event.relatedTarget.nodeName);
    });
    $("button").click(function (event) {
        return "hey";
    });
    $("button").click(function (event) {
        $("p").html(event.result);
    });
    $("p").click(function (event) {
        event.stopImmediatePropagation();
    });
    $("p").click(function (event) {
        $(this).css("background-color", "#f00");
    });
    $("div").click(function (event) {
        $(this).css("background-color", "#f00");
    });
    $("p").click(function (event) {
        event.stopPropagation();
    });
    $("body").click(function (event) {
        //bugfix, duplicate identifier.  see: http://stackoverflow.com/questions/14824143/duplicate-identifier-nodename-in-jquery-d-ts
        //$("#log").html("clicked: " + event.target.nodeName);
    });
    $('#whichkey').bind('keydown', function (e) {
        $('#log').html(e.type + ': ' + e.which);
    });
    $('#whichkey').bind('mousedown', function (e) {
        $('#log').html(e.type + ': ' + e.which);
    });
    $(window).on('mousewheel', function (e) {
        var delta = e.originalEvent.deltaY;
    });
}
function test_extend() {
    var object1 = {
        apple: 0,
        banana: { weight: 52, price: 100 },
        cherry: 97
    };
    var object2 = {
        banana: { price: 200 },
        durian: 100
    };
    $.extend(object1, object2);
    var printObj = typeof JSON != "undefined" ? JSON.stringify : function (obj) {
        var arr = [];
        $.each(obj, function (key, val) {
            var next = key + ": ";
            next += $.isPlainObject(val) ? printObj(val) : val;
            arr.push(next);
        });
        return "{ " + arr.join(", ") + " }";
    };
    $("#log").append(printObj(object1));
    var defaults = { validate: false, limit: 5, name: "foo" };
    var options = { validate: true, name: "bar" };
    var settings = $.extend({}, defaults, options);
}
function test_fadeIn() {
    $('#clickme').click(function () {
        $('#book').fadeIn('slow', function () { });
    });
    $(document.body).click(function () {
        $("div:hidden:first").fadeIn("slow");
    });
    $("a").click(function () {
        $("div").fadeIn(3000, function () {
            $("span").fadeIn(100);
        });
        return false;
    });
}
function test_fadeOut() {
    $('#clickme').click(function () {
        $('#book').fadeOut('slow', function () { });
    });
    $("p").click(function () {
        $("p").fadeOut("slow");
    });
    $("span").click(function () {
        $(this).fadeOut(1000, function () {
            $("div").text("'" + $(this).text() + "' has faded!");
            $(this).remove();
        });
    });
    $("span").hover(function () {
        $(this).addClass("hilite");
    }, function () {
        $(this).removeClass("hilite");
    });
    $("#btn1").click(function () {
        function complete() {
            $("<div/>").text(this.id).appendTo("#log");
        }
        $("#box1").fadeOut(1600, "linear", complete);
        $("#box2").fadeOut(1600, complete);
    });
    $("#btn2").click(function () {
        $("div").show();
        $("#log").empty();
    });
}
function test_fadeTo() {
    $('#clickme').click(function () {
        $('#book').fadeTo('slow', 0.5, function () { });
    });
    $("p:first").click(function () {
        $(this).fadeTo("slow", 0.33);
    });
    $("div").click(function () {
        $(this).fadeTo("fast", Math.random());
    });
    var getPos = function (n) {
        return (Math.floor(n) * 90) + "px";
    };
    $("p").each(function (n) {
        var r = Math.floor(Math.random() * 3);
        var tmp = $(this).text();
        $(this).text($("p:eq(" + r + ")").text());
        $("p:eq(" + r + ")").text(tmp);
        $(this).css("left", getPos(n));
    });
    $("div").each(function (n) {
        $(this).css("left", getPos(n));
    })
        .css("cursor", "pointer")
        .click(function () {
        $(this).fadeTo(250, 0.25, function () {
            $(this).css("cursor", "")
                .prev().css({
                "font-weight": "bolder",
                "font-style": "italic"
            });
        });
    });
}
function test_fadeToggle() {
    $("button:first").click(function () {
        $("p:first").fadeToggle("slow", "linear");
    });
    $("button:last").click(function () {
        $("p:last").fadeToggle("fast", function () {
            $("#log").append("<div>finished</div>");
        });
    });
}
function test_filter() {
    $('li').filter(':even').css('background-color', 'red');
    $('li').filter(function (index) {
        return index % 3 == 2;
    }).css('background-color', 'red');
    $("div").css("background", "#b4b0da")
        .filter(function (index) {
        return index == 1 || $(this).attr("id") == "fourth";
    })
        .css("border", "3px double red");
    $("div").filter(document.getElementById("unique"));
    $("div").filter($("#unique"));
}
function test_find() {
    $('li.item-ii').find('li').css('background-color', 'red');
    var item1 = $('li.item-1')[0];
    $('li.item-ii').find(item1).css('background-color', 'red');
    var $spans = $('span');
    $("p").find($spans).css('color', 'red');
    var newText = $("p").text().split(" ").join("</span> <span>");
    newText = "<span>" + newText + "</span>";
    $("p").html(newText)
        .find('span')
        .hover(function () {
        $(this).addClass("hilite");
    }, function () {
        $(this).removeClass("hilite");
    })
        .end()
        .find(":contains('t')")
        .css({ "font-style": "italic", "font-weight": "bolder" });
}
function test_finish() {
    $(".box").finish();
}
function test_first() {
    $('li').first().css('background-color', 'red');
}
function test_focus() {
    $('#target').focus(function () {
        alert('Handler for .focus() called.');
    });
    $('#other').click(function () {
        $('#target').focus();
    });
    $("input").focus(function () {
        $(this).next("span").css('display', 'inline').fadeOut(1000);
    });
    $("input[type=text]").focus(function () {
        $(this).blur();
    });
    $(document).ready(function () {
        $("#login").focus();
    });
}
function test_focusin() {
    $("p").focusin(function () {
        $(this).find("span").css('display', 'inline').fadeOut(1000);
    });
}
function test_focusout() {
    var fo = 0, b = 0;
    $("p").focusout(function () {
        fo++;
        $("#fo")
            .text("focusout fired: " + fo + "x");
    }).blur(function () {
        b++;
        $("#b")
            .text("blur fired: " + b + "x");
    });
}
function test_fx() {
    jQuery.fx.interval = 100;
    $("input").click(function () {
        $("div").toggle(3000);
    });
    var toggleFx = function () {
        $.fx.off = !$.fx.off;
    };
    toggleFx();
    $("button").click(toggleFx);
    $("input").click(function () {
        $("div").toggle("slow");
    });
}
function test_get() {
    $.get('ajax/test.html', function (data) {
        $('.result').html(data);
        alert('Load was performed.');
    });
    var jqxhr = $.get("example.php", function () {
        alert("success");
    })
        .done(function () { alert("second success"); })
        .fail(function () { alert("error"); });
    $.get("test.php");
    $.get("test.php", { name: "John", time: "2pm" });
    $.get("test.php", { 'choices[]': ["Jon", "Susan"] });
    $.get("test.php", function (data) {
        alert("Data Loaded: " + data);
    });
    $.get("test.cgi", { name: "John", time: "2pm" }, function (data) {
        alert("Data Loaded: " + data);
    });
    $.get("test.php", function (data) {
        $('body').append("Name: " + data.name)
            .append("Time: " + data.time);
    }, "json");
    alert($('li').get());
    $('li').get(0);
    $('li')[0];
    alert($('li').get(-1));
    function disp(divs) {
        var a = [];
        for (var i = 0; i < divs.length; i++) {
            a.push(divs[i].innerHTML);
        }
        $("span").text(a.join(" "));
    }
    disp($("div").get().reverse());
    $("*", document.body).click(function (e) {
        e.stopPropagation();
        var domEl = $(this).get(0);
        $("span:first").text("Clicked on - " + domEl.tagName);
    });
}
function test_getJSON() {
    $.getJSON('ajax/test.json', function (data) {
        var items = [];
        $.each(data, function (key, val) {
            items.push('<li id="' + key + '">' + val + '</li>');
        });
        $('<ul/>', {
            'class': 'my-new-list',
            html: items.join('')
        }).appendTo('body');
    });
    var jqxhr = $.getJSON("example.json", function () {
        alert("success");
    })
        .done(function () { alert("second success"); })
        .fail(function () { alert("error"); });
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
        tags: "mount rainier",
        tagmode: "any",
        format: "json"
    }, function (data) {
        $.each(data.items, function (i, item) {
            $("<img/>").attr("src", item.media.m).appendTo("#images");
            if (i == 3)
                return false;
        });
    });
    $.getJSON("test.js", function (json) {
        alert("JSON Data: " + json.users[3].name);
    });
    $.getJSON("test.js", { name: "John", time: "2pm" }, function (json) {
        alert("JSON Data: " + json.users[3].name);
    });
}
function test_getScript() {
    $.getScript("ajax/test.js", function (data, textStatus, jqxhr) {
        console.log(data);
        console.log(textStatus);
        console.log(jqxhr.status);
        console.log('Load was performed.');
    });
    $.getScript("ajax/test.js")
        .done(function (script, textStatus) {
        console.log(textStatus);
    })
        .fail(function (jqxhr, settings, exception) {
        $("div.log").text("Triggered ajaxError handler.");
    });
    $("div.log").ajaxError(function (e, jqxhr, settings, exception) {
        if (settings.dataType == 'script') {
            $(this).text("Triggered ajaxError handler.");
        }
    });
    $.ajaxSetup({
        cache: true
    });
    $.getScript("/scripts/jquery.color.js", function () {
        $("#go").click(function () {
            $(".block").animate({ backgroundColor: "pink" }, 1000)
                .delay(500)
                .animate({ backgroundColor: "blue" }, 1000);
        });
    });
}
function test_jQueryget() {
    console.log($("li").get(0));
    console.log($("li")[0]);
    console.log($("li").get(-1));
    $("*", document.body).click(function (event) {
        event.stopPropagation();
        var domElement = $(this).get(0);
        $("span:first").text("Clicked on - " + domElement.nodeName);
    });
    function display(divs) {
        var a = [];
        for (var i = 0; i < divs.length; i++) {
            a.push(divs[i].innerHTML);
        }
        $("span").text(a.join(" "));
    }
    display($("div").get().reverse());
}
function test_globalEval() {
    jQuery.globalEval("var newVar = true;");
}
function test_grep() {
    var arr = [1, 9, 3, 8, 6, 1, 5, 9, 4, 7, 3, 8, 6, 9, 1];
    $("div").text(arr.join(", "));
    arr = jQuery.grep(arr, function (n, i) {
        return (n != 5 && i > 4);
    });
    $("p").text(arr.join(", "));
    var arr2 = jQuery.grep(arr, function (a) { return a != 9; });
    $("span").text(arr.join(", "));
    $.grep([0, 1, 2], function (n, i) {
        return n > 0;
    }, true);
    var arr3 = $.grep(["a", "b", "c"], function (n, i) { return n !== "b"; });
}
function test_has() {
    $('li').has('ul').css('background-color', 'red');
    $("ul").append("<li>" + ($("ul").has("li").length ? "Yes" : "No") + "</li>");
    $("ul").has("li").addClass("full");
}
function test_hasClass() {
    $('#mydiv').hasClass('foo');
    $("div#result1").append($("p:first").hasClass("selected").toString());
    $("div#result2").append($("p:last").hasClass("selected").toString());
    $("div#result3").append($("p").hasClass("selected").toString());
}
function test_hasData() {
    var $p = jQuery("p"), p = $p[0];
    $p.append(jQuery.hasData(p) + " ");
    $.data(p, "testing", 123);
    $p.append(jQuery.hasData(p) + " ");
    $.removeData(p, "testing");
    $p.append(jQuery.hasData(p) + " ");
    $p.on('click', function () { });
    $p.append(jQuery.hasData(p) + " ");
    $p.off('click');
    $p.append(jQuery.hasData(p) + " ");
}
function test_jQuery_proxy() {
    function test1() {
        var me = {
            type: "zombie",
            test: function (event) {
                // Without proxy, `this` would refer to the event target
                // use event.target to reference that element.
                var element = event.target;
                $(element).css("background-color", "red");
                // With proxy, `this` refers to the me object encapsulating
                // this function.
                $("#log").append("Hello " + this.type + "<br>");
                $("#test").off("click", this.test);
            }
        };
        var you = {
            type: "person",
            test: function (event) {
                $("#log").append(this.type + " ");
            }
        };
        // Execute you.test() in the context of the `you` object
        // no matter where it is called
        // i.e. the `this` keyword will refer to `you`
        var youClick = $.proxy(you.test, you);
        // attach click handlers to #test
        $("#test")
            .on("click", $.proxy(me.test, me))
            .on("click", youClick)
            .on("click", $.proxy(you.test, me))
            .on("click", you.test);
    }
    function test2() {
        var obj = {
            name: "John",
            test: function () {
                $("#log").append(this.name);
                $("#test").off("click", obj.test);
            }
        };
        $("#test").on("click", jQuery.proxy(obj, "test"));
    }
    function test3() {
        var me = {
            // I'm a dog
            type: "dog",
            // Note that event comes *after* one and two
            test: function (one, two, event) {
                $("#log")
                    .append("<h3>Hello " + one.type + ":</h3>")
                    .append("I am a " + this.type + ", ")
                    .append("and they are " + two.type + ".<br>")
                    .append("Thanks for " + event.type + "ing.")
                    .append("the " + event.target.type + ".");
            }
        };
        var you = { type: "cat" };
        var they = { type: "fish" };
        // Set up handler to execute me.test() in the context
        // of `me`, with `you` and `they` as additional arguments
        var proxy = $.proxy(me.test, me, you, they);
        $("#test")
            .on("click", proxy);
    }
}
function test_height() {
    $(window).height();
    $(document).height();
    function showHeight(ele, h) {
        $("div").text("The height for the " + ele + " is " + h + "px.");
    }
    $("#getp").click(function () {
        showHeight("paragraph", $("p").height());
    });
    $("#getd").click(function () {
        showHeight("document", $(document).height());
    });
    $("#getw").click(function () {
        showHeight("window", $(window).height());
    });
    $("div").one('click', function () {
        $(this).height(30)
            .css({ cursor: "auto", backgroundColor: "green" });
    });
}
function test_wrap() {
    $(".inner").wrap("<div class='new'></div>");
    $(".inner").wrap(function () {
        return "<div class='" + $(this).text() + "'></div>";
    });
    $("span").wrap("<div><div><p><em><b></b></em></p></div></div>");
    $("p").wrap(document.createElement("div"));
    $("p").wrap($(".doublediv"));
}
function test_wrapAll() {
    $(".inner").wrapAll("<div class='new' />");
    $("p").wrapAll("<div></div>");
    $("span").wrapAll("<div><div><p><em><b></b></em></p></div></div>");
    $("p").wrapAll(document.createElement("div"));
    $("p").wrapAll($(".doublediv"));
}
function test_wrapInner() {
    $(".inner").wrapInner("<div class='new'></div>");
    $(".inner").wrapInner(function () {
        return "<div class='" + this.nodeValue + "'></div>";
    });
    var elem;
    $(elem).wrapInner("<div class='test'></div>");
    $(elem).wrapInner("<div class=\"test\"></div>");
    $("p").wrapInner("<b></b>");
    $("body").wrapInner("<div><div><p><em><b></b></em></p></div></div>");
    $("p").wrapInner(document.createElement("b"));
    $("p").wrapInner($("<span class='red'></span>"));
}
function test_width() {
    // Returns width of browser viewport
    $(window).width();
    // Returns width of HTML document
    $(document).width();
    function showWidth(ele, w) {
        $("div").text("The width for the " + ele + " is " + w + "px.");
    }
    $("#getp").click(function () {
        showWidth("paragraph", $("p").width());
    });
    $("#getd").click(function () {
        showWidth("document", $(document).width());
    });
    $("#getw").click(function () {
        showWidth("window", $(window).width());
    });
    var modWidth = 50;
    $("div").one("click", function () {
        $(this).width(modWidth).addClass("mod");
        modWidth -= 8;
    });
}
function test_coordinates() {
    var p = $("p:last");
    var offset = p.offset();
    p.html("left: " + offset.left + ", top: " + offset.top);
    $("*", document.body).click(function (event) {
        var offset = $(this).offset();
        event.stopPropagation();
        $("#result").text(this.tagName +
            " coords ( " + offset.left + ", " + offset.top + " )");
    });
    $("p:last").offset({ top: 10, left: 30 });
}
function test_hide() {
    $('.target').hide();
    $('#clickme').click(function () {
        $('#book').hide('slow', function () {
            alert('Animation complete.');
        });
    });
    $("p").hide();
    $("a").click(function (event) {
        event.preventDefault();
        $(this).hide();
    });
    $("button").click(function () {
        $("p").hide("slow");
    });
    $("#hidr").click(function () {
        $("span:last-child").hide("fast", function () {
            $(this).prev().hide("fast", arguments.callee);
        });
    });
    $("#showr").click(function () {
        $("span").show(2000);
    });
    $("div").click(function () {
        $(this).hide(2000, function () {
            $(this).remove();
        });
    });
}
function test_holdReady() {
    $.holdReady(true);
    $.getScript("myplugin.js", function () {
        $.holdReady(false);
    });
}
function test_hover() {
    $("li").hover(function () {
        $(this).append($("<span> ***</span>"));
    }, function () {
        $(this).find("span:last").remove();
    });
    $("li.fade").hover(function () { $(this).fadeOut(100); $(this).fadeIn(500); });
    $("li")
        .filter(":odd")
        .hide()
        .end()
        .filter(":even")
        .hover(function () {
        $(this).toggleClass("active")
            .next().stop(true, true).slideToggle();
    });
}
function test_html() {
    $('div.demo-container').html();
    $("p").click(function () {
        var htmlStr = $(this).html();
        $(this).text(htmlStr);
    });
    $('div.demo-container')
        .html('<p>All new content. <em>You bet!</em></p>');
    $('div.demo-container').html(function (index, oldhtml) {
        var emph = '<em>' + $('p').length + ' paragraphs!</em>';
        return '<p>All new content for ' + emph + '</p>';
    });
    $("div").html("<b>Wow!</b> Such excitement...");
    $("div b").append(document.createTextNode("!!!"))
        .css("color", "red");
}
function test_inArray() {
    var arr = [4, "Pete", 8, "John"];
    var $spans = $("span");
    $spans.eq(0).text(jQuery.inArray("John", arr));
    $spans.eq(1).text(jQuery.inArray(4, arr));
    $spans.eq(2).text(jQuery.inArray("Karl", arr));
    $spans.eq(3).text(jQuery.inArray("Pete", arr, 2));
    var arr2 = [1, 2, 3, 4];
    $spans.eq(1).text(jQuery.inArray(4, arr2));
}
function test_index() {
    var listItem = document.getElementById('bar');
    alert('Index: ' + $('li').index(listItem));
    var listItems = $('li:gt(0)');
    alert('Index: ' + $('li').index(listItems));
    alert('Index: ' + $('#bar').index());
    $("div").click(function () {
        var index = $("div").index(this);
        $("span").text("That was div index #" + index);
    });
    var listItems = $('li:gt(0)');
    $('div').html('Index: ' + $('li').index(listItems));
    $('div').html('Index: ' + $('#bar').index('li'));
    var foobar = $("li").index($('#foobar'));
    $('div').html('Index: ' + foobar);
}
function test_innerHeight() {
    var p = $("p:first");
    $("p:last").text("innerHeight:" + p.innerHeight());
    p.innerHeight(123);
    p.innerHeight('123px');
}
function test_innerWidth() {
    var p = $("p:first");
    $("p:last").text("innerWidth:" + p.innerWidth());
    p.innerWidth(123);
    p.innerWidth('123px');
}
function test_outerHeight() {
    var p = $("p:first");
    $("p:last").text("outerHeight:" + p.outerHeight() +
        " , outerHeight( true ):" + p.outerHeight(true));
    p.outerHeight(123);
    p.outerHeight('123px');
}
function test_outerWidth() {
    var p = $("p:first");
    $("p:last").text("outerWidth:" + p.outerWidth() +
        " , outerWidth( true ):" + p.outerWidth(true));
    p.outerWidth(123);
    p.outerWidth('123px');
}
function test_scrollLeft() {
    var p = $("p:first");
    $("p:last").text("scrollLeft:" + p.scrollLeft());
    $("div.demo").scrollLeft(300);
}
function test_scrollTop() {
    var p = $("p:first");
    $("p:last").text("scrollTop:" + p.scrollTop());
    $("div.demo").scrollTop(300);
}
function test_parent() {
    $("*", document.body).each(function () {
        var parentTag = $(this).parent().get(0).tagName;
        $(this).prepend(document.createTextNode(parentTag + " > "));
    });
    $("p").parent(".selected").css("background", "yellow");
}
function test_parents() {
    var parentEls = $("b").parents()
        .map(function () {
        return this.tagName;
    })
        .get()
        .join(", ");
    $("b").append("<strong>" + parentEls + "</strong>");
    function showParents() {
        $("div").css("border-color", "white");
        var len = $("span.selected")
            .parents("div")
            .css("border", "2px red solid")
            .length;
        $("b").text("Unique div parents: " + len);
    }
    $("span").click(function () {
        $(this).toggleClass("selected");
        showParents();
    });
}
function test_param() {
    function test1() {
        var myObject = {
            a: {
                one: 1,
                two: 2,
                three: 3
            },
            b: [1, 2, 3]
        };
        var recursiveEncoded = $.param(myObject);
        var recursiveDecoded = decodeURIComponent($.param(myObject));
        alert(recursiveEncoded);
        alert(recursiveDecoded);
    }
    function test2() {
        var myObject = {
            a: {
                one: 1,
                two: 2,
                three: 3
            },
            b: [1, 2, 3]
        };
        var shallowEncoded = $.param(myObject, true);
        var shallowDecoded = decodeURIComponent(shallowEncoded);
        alert(shallowEncoded);
        alert(shallowDecoded);
    }
    var params = { width: 1680, height: 1050 };
    var str = jQuery.param(params);
    $("#results").text(str);
    // <=1.3.2:
    $.param({ a: [2, 3, 4] }); // "a=2&a=3&a=4"
    // >=1.4:
    $.param({ a: [2, 3, 4] }); // "a[]=2&a[]=3&a[]=4"
    // <=1.3.2:
    $.param({ a: { b: 1, c: 2 }, d: [3, 4, { e: 5 }] });
    // "a=[object+Object]&d=3&d=4&d=[object+Object]"
    // >=1.4:
    $.param({ a: { b: 1, c: 2 }, d: [3, 4, { e: 5 }] });
    // "a[b]=1&a[c]=2&d[]=3&d[]=4&d[2][e]=5"
}
function test_position() {
    var p = $("p:first");
    var position = p.position();
    $("p:last").text("left: " + position.left + ", top: " + position.top);
}
function test_insertAfter() {
    $('<p>Test</p>').insertAfter('.inner');
    $('h2').insertAfter($('.container'));
    $("p").insertAfter("#foo");
}
function test_insertBefore() {
    $('<p>Test</p>').insertBefore('.inner');
    $('h2').insertBefore($('.container'));
    $("p").insertBefore("#foo");
}
function test_promise() {
    var div = $("<div>");
    div.promise().done(function (arg1) {
        // Will fire right away and alert "true"
        alert(this === div && arg1 === div);
    });
    $("button").on("click", function () {
        $("p").append("Started...");
        $("div").each(function (i) {
            $(this).fadeIn().fadeOut(1000 * (i + 1));
        });
        $("div").promise().done(function () {
            $("p").append(" Finished! ");
        });
    });
    var effect = function () {
        return $("div").fadeIn(800).delay(1200).fadeOut();
    };
    $("button").on("click", function () {
        $("p").append(" Started... ");
        $.when(effect()).done(function () {
            $("p").append(" Finished! ");
        });
    });
}
function test_is() {
    $("ul").click(function (event) {
        var $target = $(event.target);
        if ($target.is("li")) {
            $target.css("background-color", "red");
        }
    });
    $("li").click(function () {
        var $li = $(this), isWithTwo = $li.is(function () {
            return $('strong', this).length === 2;
        });
        if (isWithTwo) {
            $li.css("background-color", "green");
        }
        else {
            $li.css("background-color", "red");
        }
    });
    $("div").one('click', function () {
        if ($(this).is(":first-child")) {
            $("p").text("It's the first div.");
        }
        else if ($(this).is(".blue,.red")) {
            $("p").text("It's a blue or red div.");
        }
        else if ($(this).is(":contains('Peter')")) {
            $("p").text("It's Peter!");
        }
        else {
            $("p").html("It's nothing <em>special</em>.");
        }
        $("p").hide().slideDown("slow");
        $(this).css({ "border-style": "inset", cursor: "default" });
    });
    var isFormParent = $("input[type='checkbox']").parent().is("form");
    $("div").text("isFormParent = " + isFormParent);
    var isFormParent = $("input[type='checkbox']").parent().is("form");
    $("div").text("isFormParent = " + isFormParent);
    var $alt = $("#browsers li:nth-child(2n)").css("background", "#00FFFF");
    $('li').click(function () {
        var $li = $(this);
        if ($li.is($alt)) {
            $li.slideUp();
        }
        else {
            $li.css("background", "red");
        }
    });
    var $alt = $("#browsers li:nth-child(2n)").css("background", "#00FFFF");
    $('li').click(function () {
        if ($alt.is(this)) {
            $(this).slideUp();
        }
        else {
            $(this).css("background", "red");
        }
    });
}
function test_isArray() {
    $("b").append("" + $.isArray([]));
}
function test_isEmptyObject() {
    jQuery.isEmptyObject({});
    jQuery.isEmptyObject({ foo: "bar" });
}
function test_isFunction() {
    function stub() { }
    ;
    var objs = [
        function () { },
        { x: 15, y: 20 },
        null,
        stub,
        "function"
    ];
    jQuery.each(objs, function (i) {
        var isFunc = jQuery.isFunction(objs[i]);
        $("span").eq(i).text(isFunc);
    });
    $.isFunction(function () { });
}
function test_isNumeric() {
    $.isNumeric("-10");
    $.isNumeric(16);
    $.isNumeric(0xFF);
    $.isNumeric("0xFF");
    $.isNumeric("8e5");
    $.isNumeric(3.1415);
    $.isNumeric(+10);
    $.isNumeric(144);
    $.isNumeric("");
    $.isNumeric({});
    $.isNumeric(NaN);
    $.isNumeric(null);
    $.isNumeric(true);
    $.isNumeric(Infinity);
    $.isNumeric(undefined);
}
function test_isPlainObject() {
    $.isPlainObject(document.location);
    jQuery.isPlainObject({});
    jQuery.isPlainObject("test");
}
function test_isWindow() {
    $("b").append("" + $.isWindow(window));
}
function test_isXMLDoc() {
    jQuery.isXMLDoc(document);
    jQuery.isXMLDoc(document.body);
}
function test_jQuery() {
    $('div.foo');
    $('div.foo').click(function () {
        $('span', this).addClass('bar');
    });
    $('div.foo').click(function () {
        $(this).slideUp();
    });
    $.post('url.xml', function (data) {
        var $child = $(data).find('child');
    });
    var foo = { foo: 'bar', hello: 'world' };
    var $foo = $(foo);
    var test1 = $foo.prop('foo');
    $foo.prop('foo', 'foobar');
    var test2 = $foo.prop('foo');
    $foo.data('keyName', 'someValue');
    console.log($foo);
    $foo.bind('eventName', function () {
        console.log('eventName was called');
    });
    $foo.trigger('eventName');
    $foo.triggerHandler('eventName');
    $("div > p").css("border", "1px solid gray");
    $("input:radio", document.forms[0]);
    var xml;
    $("div", xml.responseXML);
    $(document.body).css("background", "black");
    var myForm;
    $(myForm.elements).hide();
    $('<p id="test">My <em>new</em> text</p>').appendTo('body');
    $('<img />');
    $('<input>');
    var el = $('1<br/>2<br/>3');
    el = $('1<br/>2<br/>3 >');
    $('<input />', {
        type: 'text',
        name: 'test'
    }).appendTo("body");
    $('<input type="text" />').attr({
        name: 'test'
    }).appendTo("body");
    $("<div><p>Hello</p></div>").appendTo("body");
    $("<div/>", {
        "class": "test",
        text: "Click me!",
        click: function () {
            $(this).toggleClass("test");
        }
    }).appendTo("body");
    jQuery(function ($) {
        // Your code using failsafe $ alias here...
    });
    jQuery(document).ready(function ($) {
        // Your code using failsafe $ alias here...
    });
}
function test_fn_extend() {
    jQuery.fn.extend({
        check: function () {
            return this.each(function () {
                this.checked = true;
            });
        },
        uncheck: function () {
            return this.each(function () {
                this.checked = false;
            });
        }
    });
    // Use the newly created .check() method
    //$( "input[type='checkbox']" ).check();
    // The above test cannot be run as no way that I know of in TypeScript to model the augmentation of jQueryStatic with dynamically added methods
    // The below would only work at runtime if extend had first been called.
    $("input[type='checkbox']")["check"]();
}
function test_jquery() {
    var a = { what: "A regular JS object" }, b = $('body');
    if (a.jquery) {
        alert(' a is a jQuery object! ');
    }
    if (b.jquery) {
        alert(' b is a jQuery object! ');
    }
    alert('You are running jQuery version: ' + $.fn.jquery);
    $("div.foo");
    $("div.foo").click(function () {
        $("span", this).addClass("bar");
    });
    $("div.foo").click(function () {
        $(this).slideUp();
    });
    $.post("url.xml", function (data) {
        var $child = $(data).find("child");
    });
    // Define a plain object
    var foo = { foo: "bar", hello: "world" };
    // Pass it to the jQuery function
    var $foo = $(foo);
    // Test accessing property values
    var test1 = $foo.prop("foo"); // bar
    // Test setting property values
    $foo.prop("foo", "foobar");
    var test2 = $foo.prop("foo"); // foobar
    // Test using .data() as summarized above
    $foo.data("keyName", "someValue");
    console.log($foo); // will now contain a jQuery{randomNumber} property
    // Test binding an event name and triggering
    $foo.on("eventName", function () {
        console.log("eventName was called");
    });
    $foo.trigger("eventName"); // Logs "eventName was called"
    $foo.triggerHandler("eventName"); // Also logs "eventName was called"
    $("div > p").css("border", "1px solid gray");
    $("input:radio", document.forms[0]);
    $(document.body).css("background", "black");
    var myForm;
    $(myForm.elements).hide();
    $("<p id='test'>My <em>new</em> text</p>").appendTo("body");
    $("<a href='http://jquery.com'></a>");
    $("<img>");
    $("<input>");
    var el = $("1<br>2<br>3"); // returns [<br>, "2", <br>]
    el = $("1<br>2<br>3 >"); // returns [<br>, "2", <br>, "3 &gt;"]
    $("<div></div>", {
        "class": "my-div",
        on: {
            touchstart: function (event) {
                // Do something
            }
        }
    }).appendTo("body");
    $("<div></div>")
        .addClass("my-div")
        .on({
        touchstart: function (event) {
            // Do something
        }
    })
        .appendTo("body");
    $("<div><p>Hello</p></div>").appendTo("body");
    $("<div/>", {
        "class": "test",
        text: "Click me!",
        click: function () {
            $(this).toggleClass("test");
        }
    })
        .appendTo("body");
    $(function () {
        // Document is ready
    });
    jQuery(function ($) {
        // Your code using failsafe $ alias here...
    });
    $(document.body)
        .click(function () {
        $(document.body).append($("<div>"));
        var n = $("div").length;
        $("span").text("There are " + n + " divs." +
            "Click to add more.");
    })
        .trigger("click");
}
function test_keydown() {
    $('#target').keydown(function () {
        alert('Handler for .keydown() called.');
    });
    $('#other').click(function () {
        $('#target').keydown();
    });
    var xTriggered = 0;
    $('#target').keydown(function (event) {
        if (event.which == 13) {
            event.preventDefault();
        }
        xTriggered++;
        var msg = 'Handler for .keydown() called ' + xTriggered + ' time(s).';
    });
    $('#other').click(function () {
        $('#target').keydown();
    });
}
function test_keypress() {
    $("#target").keypress(function () {
        alert("Handler for .keypress() called.");
    });
    $('#other').click(function () {
        $("#target").keypress();
    });
    $("#other").click(function () {
        $("#target").keypress();
    });
}
function test_keyup() {
    $('#target').keyup(function () {
        alert('Handler for .keyup() called.');
    });
    $('#other').click(function () {
        $('#target').keyup();
    });
    $('#other').click(function () {
        $('#target').keyup();
    });
}
function test_resize() {
    $('#other').resize();
    $('#other').resize(function () {
        alert('Handler for .resize() called.');
    });
    $('#other').resize({ "event": "Data" }, function () {
        alert('Handler for .resize() called.');
    });
}
function test_scroll() {
    $('#other').scroll();
    $('#other').scroll(function () {
        alert('Handler for .scroll() called.');
    });
    $('#other').scroll({ "event": "Data" }, function () {
        alert('Handler for .scroll() called.');
    });
}
function test_select() {
    $('#other').select();
    $('#other').select(function () {
        alert('Handler for .select() called.');
    });
    $('#other').select({ "event": "Data" }, function () {
        alert('Handler for .select() called.');
    });
}
function test_last() {
    $('li').last().css('background-color', 'red');
    $("p span").last().addClass('highlight');
}
function test_length() {
    $(document.body).click(function () {
        $(document.body).append($("<div>"));
        var n = $("div").length;
        $("span").text("There are " + n + " divs." + "Click to add more.");
    }).trigger('click');
}
function test_load() {
    $('#result').load('ajax/test.html');
    $('#result').load('ajax/test.html', function () {
        alert('Load was performed.');
    });
    $('#result').load('ajax/test.html #container');
    $('#b').load('article.html #target');
    $("#success").load("/not-here.php", function (response, status, xhr) {
        if (status == "error") {
            var msg = "Sorry but there was an error: ";
            $("#error").html(msg + xhr.status + " " + xhr.statusText);
        }
    });
    $("#objectID").load("test.php", { 'choices[]': ["Jon", "Susan"] });
    $("#feeds").load("feeds.php", { limit: 25 }, function () {
        alert("The last 25 entries in the feed have been loaded");
    });
}
function test_loadEvent() {
    $('#book').load(function () { });
    $('img.userIcon').load(function () {
        if ($(this).height() > 100) {
            $(this).addClass('bigImg');
        }
    });
}
function test_mousedown() {
    $('#target').mousedown(function () {
        alert('Handler for .mousedown() called.');
    });
    $('#other').click(function () {
        $('#target').mousedown();
    });
}
function test_mouseenter() {
    $('#outer').mouseenter(function () {
        $('#log').append('<div>Handler for .mouseenter() called.</div>');
    });
    $('#other').click(function () {
        $('#outer').mouseenter();
    });
    var n = 0;
    $("div.enterleave").mouseenter(function () {
        $("p:first", this).text("mouse enter");
        $("p:last", this).text(++n);
    }).mouseleave(function () {
        $("p:first", this).text("mouse leave");
    });
}
function test_mouseleave() {
    $('#outer').mouseleave(function () {
        $('#log').append('<div>Handler for .mouseleave() called.</div>');
    });
    $('#other').click(function () {
        $('#outer').mouseleave();
    });
    var i = 0;
    $("div.overout").mouseover(function () {
        $("p:first", this).text("mouse over");
    }).mouseout(function () {
        $("p:first", this).text("mouse out");
        $("p:last", this).text(++i);
    });
    var n = 0;
    $("div.enterleave").mouseenter(function () {
        $("p:first", this).text("mouse enter");
    }).mouseleave(function () {
        $("p:first", this).text("mouse leave");
        $("p:last", this).text(++n);
    });
}
function test_mousemove() {
    $("#target").mousemove(function (event) {
        var msg = "Handler for .mousemove() called at ";
        msg += event.pageX + ", " + event.pageY;
        $("#log").append("<div>" + msg + "</div>");
    });
    $("#other").click(function () {
        $("#target").mousemove();
    });
    $("div").mousemove(function (e) {
        var pageCoords = "( " + e.pageX + ", " + e.pageY + " )";
        var clientCoords = "( " + e.clientX + ", " + e.clientY + " )";
        $("span:first").text("( e.pageX, e.pageY ) : " + pageCoords);
        $("span:last").text("( e.clientX, e.clientY ) : " + clientCoords);
    });
}
function test_mouseout() {
    $('#outer').mouseout(function () {
        $('#log').append('Handler for .mouseout() called.');
    });
    $('#other').click(function () {
        $('#outer').mouseout();
    });
    var i = 0;
    $("div.overout").mouseout(function () {
        $("p:first", this).text("mouse out");
        $("p:last", this).text(++i);
    }).mouseover(function () {
        $("p:first", this).text("mouse over");
    });
    var n = 0;
    $("div.enterleave").bind("mouseenter", function () {
        $("p:first", this).text("mouse enter");
    }).bind("mouseleave", function () {
        $("p:first", this).text("mouse leave");
        $("p:last", this).text(++n);
    });
}
function test_mouseup() {
    $("p").mouseup(function () {
        $(this).append('<span style="color:#F00;">Mouse up.</span>');
    }).mousedown(function () {
        $(this).append('<span style="color:#00F;">Mouse down.</span>');
    });
    $('#target').mouseup(function () {
        alert('Handler for .mouseup() called.');
    });
    $('#other').click(function () {
        $('#target').mouseup();
    });
    $("p").mouseup(function () {
        $(this).append('<span style="color:#F00;">Mouse up.</span>');
    }).mousedown(function () {
        $(this).append('<span style="color:#00F;">Mouse down.</span>');
    });
}
function test_mouseover() {
    $('#outer').mouseover(function () {
        $('#log').append('<div>Handler for .mouseover() called.</div>');
    });
    $('#other').click(function () {
        $('#outer').mouseover();
    });
    var i = 0;
    $("div.overout").mouseover(function () {
        $("p:first", this).text("mouse over");
        $("p:last", this).text(++i);
    }).mouseout(function () {
        $("p:first", this).text("mouse out");
    });
    var n = 0;
    $("div.enterleave").mouseenter(function () {
        n += 1;
        $(this).find("span").text("mouse enter x " + n);
    }).mouseleave(function () {
        $(this).find("span").text("mouse leave");
    });
}
function test_makeArray() {
    var elems = document.getElementsByTagName("div");
    var arr = jQuery.makeArray(elems);
    arr.reverse();
    $(arr).appendTo(document.body);
    var obj = $('li');
    var arr = $.makeArray(obj);
    jQuery.isArray(arr) === true;
}
function test_replaceAll() {
    $("<h2>New heading</h2>").replaceAll(".inner");
    $(".first").replaceAll(".third");
    $("<b>Paragraph. </b>").replaceAll("p");
}
function test_replaceWith() {
    $("div.second").replaceWith("<h2>New heading</h2>");
    $("div.inner").replaceWith("<h2>New heading</h2>");
    $("div.third").replaceWith($(".first"));
    $("button").click(function () {
        $(this).replaceWith("<div>" + $(this).text() + "</div>");
    });
    $("p").replaceWith("<b>Paragraph. </b>");
    $("p").click(function () {
        $(this).replaceWith($("div"));
    });
    $("button").on("click", function () {
        var $container = $("div.container").replaceWith(function () {
            return $(this).contents();
        });
        $("p").append($container.attr("class"));
    });
}
function test_map() {
    $(':checkbox').map(function () {
        return this.id;
    }).get().join(',');
    $("p").append($("input").map(function () {
        return $(this).val();
    }).get().join(", "));
    var mappedItems = $("li").map(function (index) {
        var replacement = $("<li>").text($(this).text()).get(0);
        if (index === 0) {
            // Make the first item all caps
            $(replacement).text($(replacement).text().toUpperCase());
        }
        else if (index === 1 || index === 3) {
            // Delete the second and fourth items
            replacement = null;
        }
        else if (index === 2) {
            // Make two of the third item and add some text
            replacement = [replacement, $("<li>").get(0)];
            $(replacement[0]).append("<b> - A</b>");
            $(replacement[1]).append("Extra <b> - B</b>");
        }
        // Replacement will be a dom element, null,
        // or an array of dom elements
        return replacement;
    });
    $("#results").append(mappedItems);
    var fakeArray = { "length": 1, 0: "Addy", 1: "Subtracty" };
    var realArray = $.makeArray(fakeArray);
    $.map(realArray, function (val, i) { });
    var arr = ["a", "b", "c", "d", "e"];
    $("div").text(arr.join(", "));
    arr = jQuery.map(arr, function (n, i) {
        return (n.toUpperCase() + i);
    });
    $("p").text(arr.join(", "));
    arr = jQuery.map(arr, function (a) {
        return a + a;
    });
    $("span").text(arr.join(", "));
    $.map([0, 1, 2], function (n) {
        return n + 4;
    });
    $.map([0, 1, 2], function (n) {
        return n > 0 ? n + 1 : null;
    });
    $.map([0, 1, 2], function (n) {
        return [n, n + 1];
    });
    var dimensions = { width: 10, height: 15, length: 20 };
    dimensions = $.map(dimensions, function (value, index) {
        return value * 2;
    });
    var dimensions = { width: 10, height: 15, length: 20 }, keys = $.map(dimensions, function (value, index) {
        return index;
    });
    $.map([0, 1, 2, 3], function (a) {
        return a * a;
    });
    $.map([0, 1, 52, 97], function (a) {
        return (a > 50 ? a - 45 : null);
    });
    var array = [0, 1, 52, 97];
    var array2 = $.map(array, function (a, index) {
        return [a - 45, index];
    });
}
function test_merge() {
    var oldArray;
    var newArray = $.merge([], oldArray);
    $.merge([0, 1, 2], [2, 3, 4]);
    var first = ['a', 'b', 'c'];
    var second = ['d', 'e', 'f'];
    $.merge($.merge([], first), second);
    var z = $.merge([0, 1, 2], ['a', 'b', 'c']);
}
function test_prop() {
    var $input = $(this);
    $("p").html(".attr('checked'): <b>" + $input.attr('checked') + "</b><br>"
        + ".prop('checked'): <b>" + $input.prop('checked') + "</b><br>"
        + ".is(':checked'): <b>" + $input.is(':checked')) + "</b>";
    $("input").prop("disabled", false);
    $("input").prop("checked", true);
    $("input").val("someValue");
    $("input[type='checkbox']").prop("checked", function (i, val) {
        return !val;
    });
    $("input[type='checkbox']").prop({
        disabled: true
    });
    var title = $('option:selected', this).prop('title');
}
function test_val() {
    // Get the value from a dropdown select
    $("select.foo option:selected").val();
    // Get the value from a dropdown select even easier
    $("select.foo").val();
    // Get the value from a checked checkbox
    $("input:checkbox:checked").val();
    // Get the value from a set of radio buttons
    $("input:radio[name=bar]:checked").val();
    function displayVals() {
        var singleValues = $("#single").val();
        var multipleValues = $("#multiple").val() || [];
        $("p").html("<b>Single:</b> " + singleValues +
            " <b>Multiple:</b> " + multipleValues.join(", "));
    }
    $("select").change(displayVals);
    displayVals();
    $("input")
        .keyup(function () {
        var value = $(this).val();
        $("p").text(value);
    })
        .keyup();
    $("input:text.items").val(function (index, value) {
        return value + " " + this.className;
    });
    $("button").click(function () {
        var text = $(this).text();
        $("input").val(text);
    });
    $("input").on("blur", function () {
        $(this).val(function (i, val) {
            return val.toUpperCase();
        });
    });
    $("#single").val("Single2");
    $("#multiple").val(["Multiple2", "Multiple3"]);
    $("input").val(["check1", "check2", "radio1"]);
}
function test_selector() {
    var $main = $('#main');
    var $mainDivs = $('div', $main);
    return $mainDivs.selector == '#main div';
}
function test_text() {
    var str = $("p:first").text();
    $("p:last").html(str);
    $('ul li').text(function (index) {
        return 'item number ' + (index + 1);
    });
    $("p").text("<b>Some</b> new text.");
}
$('#item').click(function (e) {
    if (e.ctrlKey) {
        console.log('control pressed');
    }
    if (e.altKey) {
        console.log('alt pressed');
    }
});
function test_addBack() {
    $('li.third-item').nextAll().addBack().css('background-color', 'red');
    $("div.left, div.right").find("div, div > p").addClass("border");
    // First Example
    $("div.before-addback").find("p").addClass("background");
    // Second Example
    $("div.after-addback").find("p").addBack().addClass("background");
}
// http://api.jquery.com/jQuery.parseHTML/
function test_parseHTML() {
    var $log = $("#log"), str = "hello, <b>my name is</b> jQuery.", html = $.parseHTML(str), nodeNames = [];
    // Append the parsed HTML
    $log.append(html);
    // Gather the parsed HTML's node names
    $.each(html, function (i, el) {
        nodeNames[i] = "<li>" + el.nodeName + "</li>";
    });
    // Insert the node names
    $log.append("<h3>Node Names:</h3>");
    $("<ol></ol>")
        .append(nodeNames.join(""))
        .appendTo($log);
    // parse HTML with all parameters
    $.parseHTML(str, document, true);
}
// http://api.jquery.com/jQuery.parseJSON/
function test_parseJSON() {
    // Return type should be any, not Object
    var i = $.parseJSON('1');
    var a = $.parseJSON('[1]');
    var o = $.parseJSON('{"foo":"bar"}');
    var s = $.parseJSON('"string"');
    var n = $.parseJSON('null');
    i instanceof Object; // false
    a instanceof Object; // true
    o instanceof Object; // true
    s instanceof Object; // false
    n instanceof Object; // false
}
function test_not() {
    $("li").not(":even").css("background-color", "red");
    $("li").not(document.getElementById("notli"))
        .css("background-color", "red");
    $("div").not(".green, #blueone")
        .css("border-color", "red");
    $("p").not($("#selected")[0]);
    $("p").not("#selected");
    $("p").not($("div p.selected"));
}
function test_EventIsNewable() {
    var ev = new jQuery.Event('click');
}
function test_EventIsCallable() {
    var ev = jQuery.Event('click');
}
$.when($.ajax("/my/page.json")).then(function (a) { return a.asdf; }); // is type JQueryPromise<any>
$.when($.ajax("/my/page.json")).then(function (a, b, c) { return a.asdf; }); // is type JQueryPromise<any>
$.when("asdf", "jkl;").done(function (x, y) { return x.length + y.length; }, function (x, y) { return x.length + y.length; });
var f1 = $.when("fetch"); // Is type JQueryPromise<string>
var f2 = f1.then(function (s) { return [s, s]; });
var f3 = f2.then(function (v) { return 3; });
// ISSUE: https://github.com/borisyankov/DefinitelyTyped/issues/742
// http://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax#answer-5976031
$.ajax({
    url: 'php/upload.php',
    data: {},
    cache: false,
    contentType: false,
    processData: false,
    type: 'POST',
    success: function (data) {
        alert(data);
    }
});
function test_deferred() {
    function returnPromise() {
        return $.Deferred().resolve({
            MyString: "MyString",
            MyNumber: 5
        }, "failed", null);
    }
    var x = returnPromise();
    x.done(function (data, textStatus, jqXHR) {
        var myNumber = data.MyNumber;
        var myString = data.MyString;
        var theTextStatus = textStatus;
        var thejqXHR = jqXHR;
    });
    $.get("test.php").always(function () {
        alert("$.get completed with success or error callback arguments");
    });
    $.get("test.php").done(function () {
        alert("$.get succeeded");
    });
    function fn1() {
        $("p").append(" 1 ");
    }
    function fn2() {
        $("p").append(" 2 ");
    }
    function fn3(n) {
        $("p").append(n + " 3 " + n);
    }
    var dfd = $.Deferred();
    dfd
        .done([fn1, fn2], fn3, [fn2, fn1])
        .done(function (n) {
        $("p").append(n + " we're done.");
    });
    $("button").bind("click", function () {
        dfd.resolve("and");
    });
    $.get("test.php")
        .done(function () { alert("$.get succeeded"); })
        .fail(function () { alert("$.get failed!"); });
    dfd.state();
    var defer = $.Deferred(), filtered = defer.pipe(function (value) {
        return value * 2;
    });
    defer.resolve(5);
    filtered.done(function (value) {
        alert("Value is ( 2*5 = ) 10: " + value);
    });
    filtered.fail(function (value) {
        alert("Value is ( 3*6 = ) 18: " + value);
    });
    filtered.done(function (data) { });
    var obj = {
        hello: function (name) {
            alert("Hello " + name);
        }
    }, defer = $.Deferred();
    defer.promise(obj);
    defer.resolve("John");
    $.get("test.php").then(function () { alert("$.get succeeded"); }, function () { alert("$.get failed!"); });
}
function test_deferred_promise() {
    function asyncEvent() {
        var dfd = $.Deferred();
        // Resolve after a random interval
        setTimeout(function () {
            dfd.resolve("hurray");
        }, Math.floor(400 + Math.random() * 2000));
        // Reject after a random interval
        setTimeout(function () {
            dfd.reject("sorry");
        }, Math.floor(400 + Math.random() * 2000));
        // Show a "working..." message every half-second
        setTimeout(function working() {
            if (dfd.state() === "pending") {
                dfd.notify("working... ");
                setTimeout(working, 500);
            }
        }, 1);
        // Return the Promise so caller can't change the Deferred
        return dfd.promise();
    }
    // Attach a done, fail, and progress handler for the asyncEvent
    $.when(asyncEvent()).then(function (status) {
        alert(status + ", things are going well");
    }, function (status) {
        alert(status + ", you fail this time");
    }, function (status) {
        $("body").append(status);
    });
}
function test_promise_then_change_type() {
    function request() {
        var def = $.Deferred();
        var promise = def.promise(null);
        def.rejectWith(this, new Error());
        return promise;
    }
    function count() {
        var def = request();
        return def.then(function (data) {
            try {
                var count = parseInt(data.count, 10);
            }
            catch (err) {
                return $.Deferred().reject(err).promise();
            }
            return $.Deferred().resolve(count).promise();
        });
    }
    count().done(function (data) {
    }).fail(function (exception) {
    });
}
function test_promise_then_not_return_deferred() {
    var state;
    var deferred = $.Deferred();
    state = deferred.state();
    deferred = deferred.progress();
    deferred = deferred.done();
    deferred = deferred.fail();
    deferred = deferred.always();
    deferred = deferred.notify();
    deferred = deferred.resolve();
    deferred = deferred.reject();
    promise = deferred.promise();
    promise = deferred.then(function () { });
    var promise = $.Deferred().promise();
    state = promise.state();
    promise = promise.then(function () { });
    promise = promise.progress();
    promise = promise.done();
    promise = promise.fail();
    promise = promise.always();
}
/*
The MIT License

Copyright (c) 2010-2013 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
/// <reference path="./tests/math/test_unit_math.ts" />
// webGL renderer test.
/// <reference path="./tests/webgl/webgl_animation_cloth.ts" />
/// <reference path="./tests/webgl/webgl_animation_skinning_morph.ts" />
/// <reference path="./tests/webgl/webgl_buffergeometry.ts" />
/// <reference path="./tests/webgl/webgl_camera.ts" />
/// <reference path="./tests/webgl/webgl_custom_attributes.ts" />
/// <reference path="./tests/webgl/webgl_geometries.ts" />
/// <reference path="./tests/webgl/webgl_helpers.ts" />
/// <reference path="./tests/webgl/webgl_interactive_cubes.ts" />
/// <reference path="./tests/webgl/webgl_interactive_raycasting_pointcloud.ts" />
/// <reference path="./tests/webgl/webgl_lensflares.ts" />
/// <reference path="./tests/webgl/webgl_lights_heimsphere.ts" />
/// <reference path="./tests/webgl/webgl_lines_colors.ts" />
/// <reference path="./tests/webgl/webgl_loader_awd.ts" />
/// <reference path="./tests/webgl/webgl_materials.ts" />
/// <reference path="./tests/webgl/webgl_morphtargets.ts" />
/// <reference path="./tests/webgl/webgl_particles_billboards.ts" />
/// <reference path="./tests/webgl/webgl_postprocessing.ts" />
/// <reference path="./tests/webgl/webgl_shader.ts" />
/// <reference path="./tests/webgl/webgl_sprites.ts" />
// css3d renderer test.
/// <reference path="./tests/css3d/css3d_periodictable.ts" />
/// <reference path="./tests/css3d/css3d_sprites.ts" />
// canvas renderer test.
/// <reference path="./tests/canvas/canvas_camera_orthographic.ts" />
/// <reference path="./tests/canvas/canvas_geometry_cube.ts" />
/// <reference path="./tests/canvas/canvas_interactive_cubes_tween.ts" />
/// <reference path="./tests/canvas/canvas_lights_pointlights.ts" />
/// <reference path="./tests/canvas/canvas_materials.ts" />
/// <reference path="./tests/canvas/canvas_particles_floor.ts" />
// examples test.
/// <reference path="./tests/examples/detector.ts" />
// http://www.w3.org/TR/2012/WD-webaudio-20121213/
/// <reference path="waa.d.ts" />
(function () {
    var context = new AudioContext();
    function playSound() {
        var source = context.createBufferSource();
        source.buffer = dogBarkingBuffer;
        source.connect(context.destination);
        source.start(0);
    }
});
(function () {
    var context = new AudioContext();
    // Create the effects nodes.
    var lowpassFilter = context.createBiquadFilter();
    var waveShaper = context.createWaveShaper();
    var panner = context.createPanner();
    var compressor = context.createDynamicsCompressor();
    var reverb = context.createConvolver();
    // Create master wet and dry.
    var masterDry = context.createGain();
    var masterWet = context.createGain();
    // Connect final compressor to final destination.
    compressor.connect(context.destination);
    // Connect master dry and wet to compressor.
    masterDry.connect(compressor);
    masterWet.connect(compressor);
    // Connect reverb to master wet.
    reverb.connect(masterWet);
    // Create a few sources.
    var source1 = context.createBufferSource();
    var source2 = context.createBufferSource();
    var source3 = context.createOscillator();
    source1.buffer = manTalkingBuffer;
    source2.buffer = footstepsBuffer;
    source3.frequency.value = 440;
    // Connect source1
    var dry1 = context.createGain();
    var wet1 = context.createGain();
    source1.connect(lowpassFilter);
    lowpassFilter.connect(dry1);
    lowpassFilter.connect(wet1);
    dry1.connect(masterDry);
    wet1.connect(reverb);
    source1.loop = true;
    source1.loopStart = 0;
    source1.loopEnd = 300;
    // Connect source2
    var dry2 = context.createGain();
    var wet2 = context.createGain();
    source2.connect(waveShaper);
    waveShaper.connect(dry2);
    waveShaper.connect(wet2);
    dry2.connect(masterDry);
    wet2.connect(reverb);
    // Connect source3
    var dry3 = context.createGain();
    var wet3 = context.createGain();
    source3.connect(panner);
    panner.connect(dry3);
    panner.connect(wet3);
    dry3.connect(masterDry);
    wet3.connect(reverb);
    // Start the sources now.
    source1.start(0);
    // MEMO: should be when parameter is 0
    // http://www.w3.org/TR/webaudio/#AudioBufferSourceNode
    source2.start();
    source3.start(0);
    // Stop the sources are 2 seconds later.
    source1.stop(2);
    // MEMO: should be when parameter is 0
    // http://www.w3.org/TR/webaudio/#AudioBufferSourceNode
    source2.stop();
    source3.stop(2);
});
(function () {
    var context;
    var compressor;
    var gainNode1;
    var streamingAudioSource;
    // Initial setup of the "long-lived" part of the routing graph  
    function setupAudioContext() {
        context = new AudioContext();
        compressor = context.createDynamicsCompressor();
        gainNode1 = context.createGain();
        // Create a streaming audio source.
        var audioElement = document.getElementById('audioTagID');
        streamingAudioSource = context.createMediaElementSource(audioElement);
        streamingAudioSource.connect(gainNode1);
        gainNode1.connect(compressor);
        compressor.connect(context.destination);
    }
    // Later in response to some user action (typically mouse or key event) 
    // a one-shot sound can be played. 
    function playSound() {
        var oneShotSound = context.createBufferSource();
        oneShotSound.buffer = dogBarkingBuffer;
        // Create a filter, panner, and gain node. 
        var lowpass = context.createBiquadFilter();
        var panner = context.createPanner();
        var gainNode2 = context.createGain();
        // Make connections 
        oneShotSound.connect(lowpass);
        lowpass.connect(panner);
        panner.connect(gainNode2);
        gainNode2.connect(compressor);
        // Play 0.75 seconds from now (to play immediately pass in 0)
        oneShotSound.start(context.currentTime + 0.75);
    }
});
(function () {
    var param;
    var t0 = 0;
    var t1 = 0.1;
    var t2 = 0.2;
    var t3 = 0.3;
    var t4 = 0.4;
    var t5 = 0.6;
    var t6 = 0.7;
    var t7 = 1.0;
    var curveLength = 44100;
    var curve = new Float32Array(curveLength);
    for (var i = 0; i < curveLength; ++i)
        curve[i] = Math.sin(Math.PI * i / curveLength);
    param.setValueAtTime(0.2, t0);
    param.setValueAtTime(0.3, t1);
    param.setValueAtTime(0.4, t2);
    param.linearRampToValueAtTime(1, t3);
    param.linearRampToValueAtTime(0.15, t4);
    param.exponentialRampToValueAtTime(0.75, t5);
    param.exponentialRampToValueAtTime(0.05, t6);
    param.setValueCurveAtTime(curve, t6, t7 - t6);
});
(function () {
    var param;
    var t0 = 0;
    var t1 = 0.1;
    var t2 = 0.2;
    var t3 = 0.3;
    var t4 = 0.4;
    var t5 = 0.6;
    var t6 = 0.7;
    var t7 = 1.0;
    var curveLength = 44100;
    var curve = new Float32Array(curveLength);
    for (var i = 0; i < curveLength; ++i)
        curve[i] = Math.sin(Math.PI * i / curveLength);
    param.setValueAtTime(0.2, t0);
    param.setValueAtTime(0.3, t1);
    param.setValueAtTime(0.4, t2);
    param.linearRampToValueAtTime(1, t3);
    param.linearRampToValueAtTime(0.15, t4);
    param.exponentialRampToValueAtTime(0.75, t5);
    param.exponentialRampToValueAtTime(0.05, t6);
    param.setValueCurveAtTime(curve, t6, t7 - t6);
});
(function () {
    var context;
    var filterNode;
    var mediaElement = document.getElementById('mediaElementID');
    var sourceNode = context.createMediaElementSource(mediaElement);
    sourceNode.connect(filterNode);
});
(function () {
    // Setup routing graph 
    function setupRoutingGraph() {
        var context = new AudioContext();
        var compressor = context.createDynamicsCompressor();
        // Send1 effect 
        var reverb = context.createConvolver();
        // Convolver impulse response may be set here or later 
        // Send2 effect 
        var delay = context.createDelay();
        // Connect final compressor to final destination 
        compressor.connect(context.destination);
        // Connect sends 1 & 2 through effects to main mixer 
        var s1 = context.createGain();
        reverb.connect(s1);
        s1.connect(compressor);
        var s2 = context.createGain();
        delay.connect(s2);
        s2.connect(compressor);
        // Create a couple of sources 
        var source1 = context.createBufferSource();
        var source2 = context.createBufferSource();
        source1.buffer = manTalkingBuffer;
        source2.buffer = footstepsBuffer;
        // Connect source1 
        var g1_1 = context.createGain();
        var g2_1 = context.createGain();
        var g3_1 = context.createGain();
        source1.connect(g1_1);
        source1.connect(g2_1);
        source1.connect(g3_1);
        g1_1.connect(compressor);
        g2_1.connect(reverb);
        g3_1.connect(delay);
        // Connect source2 
        var g1_2 = context.createGain();
        var g2_2 = context.createGain();
        var g3_2 = context.createGain();
        source2.connect(g1_2);
        source2.connect(g2_2);
        source2.connect(g3_2);
        g1_2.connect(compressor);
        g2_2.connect(reverb);
        g3_2.connect(delay);
        // We now have explicit control over all the volumes g1_1, g2_1, ..., s1, s2 
        g2_1.gain.value = 0.2; // For example, set source1 reverb gain 
        // Because g2_1.gain is an "AudioParam", 
        // an automation curve could also be attached to it. 
        // A "mixing board" UI could be created in canvas or WebGL controlling these gains. 
    }
});
(function () {
    var context;
    var compressor;
    var gainNode1;
    var streamingAudioSource;
    // Initial setup of the "long-lived" part of the routing graph  
    function setupAudioContext() {
        context = new AudioContext();
        compressor = context.createDynamicsCompressor();
        gainNode1 = context.createGain();
        // Create a streaming audio source.
        var audioElement = document.getElementById('audioTagID');
        streamingAudioSource = context.createMediaElementSource(audioElement);
        streamingAudioSource.connect(gainNode1);
        gainNode1.connect(compressor);
        compressor.connect(context.destination);
    }
    // Later in response to some user action (typically mouse or key event) 
    // a one-shot sound can be played. 
    function playSound() {
        var oneShotSound = context.createBufferSource();
        oneShotSound.buffer = dogBarkingBuffer;
        // Create a filter, panner, and gain node. 
        var lowpass = context.createBiquadFilter();
        var panner = context.createPanner();
        var gainNode2 = context.createGain();
        // Make connections 
        oneShotSound.connect(lowpass);
        lowpass.connect(panner);
        panner.connect(gainNode2);
        gainNode2.connect(compressor);
        // Play 0.75 seconds from now (to play immediately pass in 0)
        oneShotSound.start(context.currentTime + 0.75);
    }
});
(function () {
    var context = new webkitOfflineAudioContext(1, 2, 44100.5);
    context.oncomplete = function (e) {
        context.createBufferSource().buffer;
    };
    context.startRendering();
});
// Test automatic type inference of the audio processing event handler
(function () {
    var context = new AudioContext();
    var recorder = context.createScriptProcessor(2048, 1, 1);
    recorder.onaudioprocess = function (e) {
        e.inputBuffer;
    };
});
///<reference path="MediaStream.d.ts" />
var mediaStreamConstraints = { audio: true, video: true };
var mediaTrackConstraintSet = {};
var mediaTrackConstraintArray = [];
var mediaTrackConstraints = { mandatory: mediaTrackConstraintSet, optional: mediaTrackConstraintArray };
navigator.getUserMedia(mediaStreamConstraints, function (stream) {
    console.log('label:' + stream.label);
    console.log('ended:' + stream.ended);
    stream.onended = function (event) { return console.log('Stream ended'); };
    var objectUrl = URL.createObjectURL(stream);
    var wkObjectUrl = webkitURL.createObjectURL(stream);
}, function (error) {
    console.log('Error message: ' + error.message);
    console.log('Error name: ' + error.name);
});
navigator.webkitGetUserMedia(mediaStreamConstraints, function (stream) {
    console.log('label:' + stream.label);
    console.log('ended:' + stream.ended);
    stream.onended = function (event) { return console.log('Stream ended'); };
    var objectUrl = URL.createObjectURL(stream);
    var wkObjectUrl = webkitURL.createObjectURL(stream);
}, function (error) {
    console.log('Error message: ' + error.message);
    console.log('Error name: ' + error.name);
});
navigator.mozGetUserMedia(mediaStreamConstraints, function (stream) {
    console.log('label:' + stream.label);
    console.log('ended:' + stream.ended);
    stream.onended = function (event) { return console.log('Stream ended'); };
    var objectUrl = URL.createObjectURL(stream);
    var wkObjectUrl = webkitURL.createObjectURL(stream);
}, function (error) {
    console.log('Error message: ' + error.message);
    console.log('Error name: ' + error.name);
});
/// <reference path="MediaStream.d.ts" />
/// <reference path="RTCPeerConnection.d.ts" />
var config = { iceServers: [{ url: "stun.l.google.com:19302" }] };
var constraints = { mandatory: { offerToReceiveAudio: true, offerToReceiveVideo: true } };
var peerConnection = new RTCPeerConnection(config, constraints);
navigator.getUserMedia({ audio: true, video: true }, function (stream) {
    peerConnection.addStream(stream);
}, function (error) {
    console.log('Error message: ' + error.message);
    console.log('Error name: ' + error.name);
});
peerConnection.onaddstream = function (ev) { return console.log(ev.type); };
peerConnection.ondatachannel = function (ev) { return console.log(ev.type); };
peerConnection.oniceconnectionstatechange = function (ev) { return console.log(ev.type); };
peerConnection.onnegotiationneeded = function (ev) { return console.log(ev.type); };
peerConnection.onopen = function (ev) { return console.log(ev.type); };
peerConnection.onicecandidate = function (ev) { return console.log(ev.type); };
peerConnection.onremovestream = function (ev) { return console.log(ev.type); };
peerConnection.onstatechange = function (ev) { return console.log(ev.type); };
peerConnection.createOffer(function (offer) {
    peerConnection.setLocalDescription(offer, function () { return console.log("set local description"); }, function (error) { return console.log("Error setting local description: " + error); });
}, function (error) { return console.log("Error creating offer: " + error); });
var type = RTCSdpType[RTCSdpType.offer];
var offer = { type: type, sdp: "some sdp" };
var sessionDescription = new RTCSessionDescription(offer);
peerConnection.setRemoteDescription(sessionDescription, function () {
    peerConnection.createAnswer(function (answer) {
        peerConnection.setLocalDescription(answer, function () { return console.log('Set local description'); }, function (error) { return console.log("Error setting local description from created answer: " + error +
            "; answer.sdp=" + answer.sdp); });
    }, function (error) { return console.log("Error creating answer: " + error); });
}, function (error) { return console.log('Error setting remote description: ' + error +
    "; offer.sdp=" + offer.sdp); });
var webkitSessionDescription = new webkitRTCSessionDescription(offer);
peerConnection.setRemoteDescription(webkitSessionDescription, function () {
    peerConnection.createAnswer(function (answer) {
        peerConnection.setLocalDescription(answer, function () { return console.log('Set local description'); }, function (error) { return console.log("Error setting local description from created answer: " + error +
            "; answer.sdp=" + answer.sdp); });
    }, function (error) { return console.log("Error creating answer: " + error); });
}, function (error) { return console.log('Error setting remote description: ' + error +
    "; offer.sdp=" + offer.sdp); });
var mozSessionDescription = new mozRTCSessionDescription(offer);
peerConnection.setRemoteDescription(mozSessionDescription, function () {
    peerConnection.createAnswer(function (answer) {
        peerConnection.setLocalDescription(answer, function () { return console.log('Set local description'); }, function (error) { return console.log("Error setting local description from created answer: " + error +
            "; answer.sdp=" + answer.sdp); });
    }, function (error) { return console.log("Error creating answer: " + error); });
}, function (error) { return console.log('Error setting remote description: ' + error +
    "; offer.sdp=" + offer.sdp); });
var wkPeerConnection = new webkitRTCPeerConnection(config, constraints);
//# sourceMappingURL=ldraw-visualizer.js.map