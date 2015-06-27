/// <reference path="../../typings/references.ts" />
/// <reference path="../utility.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var Color = (function () {
            function Color(hexValue, alpha) {
                if (alpha === void 0) { alpha = 255; }
                this.HexValue = hexValue;
                this.Alpha = alpha;
            }
            Color.prototype.IsValid = function () {
                return LdrawVisualizer.Utility.isValidColorHexString(this.HexValue);
            };
            return Color;
        })();
        Parser.Color = Color;
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=Color.js.map