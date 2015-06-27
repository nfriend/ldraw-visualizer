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
//# sourceMappingURL=LdrawFile.js.map