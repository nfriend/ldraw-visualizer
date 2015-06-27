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
//# sourceMappingURL=AuthorMETALine.js.map