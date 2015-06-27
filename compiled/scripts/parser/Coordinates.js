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
//# sourceMappingURL=Coordinates.js.map