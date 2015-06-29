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
                LdrawFileMETALineType[LdrawFileMETALineType["LDrawOrg"] = 7] = "LDrawOrg";
            })(Lines.LdrawFileMETALineType || (Lines.LdrawFileMETALineType = {}));
            var LdrawFileMETALineType = Lines.LdrawFileMETALineType;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=LineTypes.js.map