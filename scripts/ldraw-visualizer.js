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
        function logMatrix(matrix) {
            var e = matrix.elements;
            console.log(e[0], e[1], e[2], e[3]);
            console.log(e[4], e[5], e[6], e[7]);
            console.log(e[8], e[9], e[10], e[11]);
            console.log(e[12], e[13], e[14], e[15]);
        }
        Utility.logMatrix = logMatrix;
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
                    var coords = new Parser.Coordinates(parseFloat(splitLine[2]), parseFloat(splitLine[3]), parseFloat(splitLine[4])), matrix = [
                        [parseFloat(splitLine[5]), parseFloat(splitLine[6]), parseFloat(splitLine[7])],
                        [parseFloat(splitLine[8]), parseFloat(splitLine[9]), parseFloat(splitLine[10])],
                        [parseFloat(splitLine[11]), parseFloat(splitLine[12]), parseFloat(splitLine[13])]
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
                        //console.log('Unknown or unimplemented META tag on line ' + lineNumber + ': "' + metaTag + '"');
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
                        var splitLine = line.trim().split(/\s+/g);
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
/// <reference path="../utility.ts" />
/// <reference path="./LdrawFile.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        Parser.FileCache = {};
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="../../typings/references.ts" />
/// <reference path="./LdrawFile.ts" />
/// <reference path="./lines/LineTypes.ts" />
/// <reference path="./FileParser.ts" />
/// <reference path="./FileCache.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var FileService = (function () {
        function FileService() {
        }
        FileService.GetLdrawFile = function (partName, callback, isPrimitive) {
            if (isPrimitive === void 0) { isPrimitive = false; }
            var returnFile;
            if (LdrawVisualizer.Parser.FileCache[partName.toUpperCase()]) {
                FileService.getSubparts(LdrawVisualizer.Parser.FileCache[partName.toUpperCase()], function () {
                    callback(returnFile);
                });
            }
            else {
                $.ajax({
                    type: 'GET',
                    url: 'LDraw/' + (isPrimitive ? 'p' : 'parts') + '/' + partName,
                    success: function (partFile) {
                        var parsedFile = LdrawVisualizer.Parser.FileParser.Parse(partFile);
                        returnFile = parsedFile;
                        LdrawVisualizer.Parser.FileCache[partName.toUpperCase()] = parsedFile;
                        FileService.getSubparts(parsedFile, function () {
                            callback(returnFile);
                        });
                    },
                    error: function () {
                        if (!isPrimitive) {
                            FileService.GetLdrawFile(partName, callback, true);
                        }
                    },
                    dataType: 'text'
                });
            }
        };
        FileService.getSubparts = function (part, callback) {
            var allSubFileRefs = part.Lines.filter(function (l) { return l.LineType === LdrawVisualizer.Parser.Lines.LdrawFileLineType.SubFileReference; });
            if (allSubFileRefs.length > 0) {
                var completedCount = 0;
                allSubFileRefs.forEach(function (l) {
                    FileService.GetLdrawFile(l.Filename, function (file) {
                        l.File = file;
                        completedCount++;
                        if (completedCount == allSubFileRefs.length) {
                            callback();
                        }
                    });
                });
            }
            else {
                callback();
            }
        };
        return FileService;
    })();
    LdrawVisualizer.FileService = FileService;
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="../parser/FileService.ts" />
/// <reference path="../parser/LdrawFile.ts" />
/// <reference path="../parser/lines/LineTypes.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Renderer;
    (function (Renderer) {
        var LdrawFileRenderer = (function () {
            function LdrawFileRenderer() {
            }
            LdrawFileRenderer.Render = function (scene, ldrawFile, translationMatrix) {
                // var a = new THREE.Matrix4().set(
                // 	1, 0, 0, -2,
                // 	0, 1, 0, 7,
                // 	0, 0, 1, 6,
                // 	0, 0, 0, 1
                // );
                // var b = new THREE.Matrix4().set(
                // 	1, 0, 0, 3,
                // 	0, 1, 0, 4,
                // 	0, 0, 1, 6,
                // 	0, 0, 0, 1
                // );
                // Utility.logMatrix(a.multiply(b));
                // return;
                // var legoMaterial1 = new THREE.MeshPhongMaterial({ color: 0xff0000, shading: THREE.SmoothShading, side: THREE.DoubleSide });
                // var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), legoMaterial1);
                // scene.add(mesh1);
                // var legoMaterial2 = new THREE.MeshPhongMaterial({ color: 0x0000ff, shading: THREE.SmoothShading, side: THREE.DoubleSide });
                // var mesh2 = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), legoMaterial2);
                // mesh2.applyMatrix(new THREE.Matrix4().set(
                // 	.5, 0, 0, 50,
                // 	0, .5, 0, 50,
                // 	0, 0, .5, 50,
                // 	0, 0, 0, 1
                // ));
                // scene.add(mesh2);
                // return;
                // Render all quadrilaterals 
                ldrawFile.Lines.filter(function (l) { return l.LineType === LdrawVisualizer.Parser.Lines.LdrawFileLineType.Quadrilateral; })
                    .forEach(function (l) {
                    var quadLine = l;
                    var geometry = new THREE.Geometry();
                    geometry.vertices.push(new THREE.Vector3(quadLine.Point1.X, -quadLine.Point1.Y, quadLine.Point1.Z), new THREE.Vector3(quadLine.Point2.X, -quadLine.Point2.Y, quadLine.Point2.Z), new THREE.Vector3(quadLine.Point3.X, -quadLine.Point3.Y, quadLine.Point3.Z), new THREE.Vector3(quadLine.Point4.X, -quadLine.Point4.Y, quadLine.Point4.Z));
                    if (translationMatrix) {
                        geometry.applyMatrix(translationMatrix);
                    }
                    geometry.faces.push(new THREE.Face3(0, 1, 2));
                    geometry.faces.push(new THREE.Face3(2, 3, 0));
                    geometry.computeFaceNormals();
                    var legoMaterial = new THREE.MeshPhongMaterial({ color: Math.floor(Math.random() * 16777215), shading: THREE.SmoothShading, side: THREE.DoubleSide });
                    var mesh = new THREE.Mesh(geometry, legoMaterial);
                    scene.add(mesh);
                });
                // Render all triangles
                ldrawFile.Lines.filter(function (l) { return l.LineType === LdrawVisualizer.Parser.Lines.LdrawFileLineType.Triangle; })
                    .forEach(function (l) {
                    var triLine = l;
                    var geometry = new THREE.Geometry();
                    geometry.vertices.push(new THREE.Vector3(triLine.Point1.X, -triLine.Point1.Y, triLine.Point1.Z), new THREE.Vector3(triLine.Point2.X, -triLine.Point2.Y, triLine.Point2.Z), new THREE.Vector3(triLine.Point3.X, -triLine.Point3.Y, triLine.Point3.Z));
                    if (translationMatrix) {
                        geometry.applyMatrix(translationMatrix);
                    }
                    geometry.faces.push(new THREE.Face3(0, 1, 2));
                    geometry.computeFaceNormals();
                    var legoMaterial = new THREE.MeshPhongMaterial({ color: Math.floor(Math.random() * 16777215), shading: THREE.SmoothShading, side: THREE.DoubleSide });
                    var mesh = new THREE.Mesh(geometry, legoMaterial);
                    scene.add(mesh);
                });
                // Render all subfiles
                ldrawFile.Lines.filter(function (l) { return l.LineType === LdrawVisualizer.Parser.Lines.LdrawFileLineType.SubFileReference; })
                    .forEach(function (l) {
                    var subfileLine = l;
                    var newMatrix = translationMatrix ? LdrawFileRenderer.getMatrix4(subfileLine).multiply(translationMatrix) : LdrawFileRenderer.getMatrix4(subfileLine);
                    // console.log('new matrix: ');
                    // console.log(newMatrix.elements[0], newMatrix.elements[1], newMatrix.elements[2], newMatrix.elements[3])
                    // console.log(newMatrix.elements[4], newMatrix.elements[5], newMatrix.elements[6], newMatrix.elements[7])
                    // console.log(newMatrix.elements[8], newMatrix.elements[9], newMatrix.elements[10], newMatrix.elements[11])
                    // console.log(newMatrix.elements[12], newMatrix.elements[13], newMatrix.elements[14], newMatrix.elements[15])
                    LdrawFileRenderer.Render(scene, subfileLine.File, newMatrix);
                });
            };
            LdrawFileRenderer.getMatrix4 = function (ref) {
                var m = ref.TransformMatrix;
                var newMatrix = new THREE.Matrix4().set(m[0][0], m[0][1], m[0][2], ref.Coordinates.X, m[1][0], m[1][1], m[1][2], -ref.Coordinates.Y, m[2][0], m[2][1], m[2][2], ref.Coordinates.Z, 0, 0, 0, 1);
                return newMatrix;
            };
            return LdrawFileRenderer;
        })();
        Renderer.LdrawFileRenderer = LdrawFileRenderer;
    })(Renderer = LdrawVisualizer.Renderer || (LdrawVisualizer.Renderer = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
/// <reference path="./parser/FileService.ts" />
/// <reference path="./parser/LdrawFile.ts" />
/// <reference path="./renderer/LdrawFileRenderer.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    if (!Detector.webgl)
        Detector.addGetWebGLMessage();
    var container;
    var camera, controls, scene, renderer, ldrawFile;
    LdrawVisualizer.FileService.GetLdrawFile('3001.dat', function (parsedFile) {
        ldrawFile = parsedFile;
        console.log(parsedFile);
        init();
        render();
    });
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
        LdrawVisualizer.Renderer.LdrawFileRenderer.Render(scene, ldrawFile);
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
//# sourceMappingURL=ldraw-visualizer.js.map