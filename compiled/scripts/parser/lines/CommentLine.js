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
//# sourceMappingURL=CommentLine.js.map