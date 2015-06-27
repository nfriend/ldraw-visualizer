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
//# sourceMappingURL=LdrawFileLine.js.map