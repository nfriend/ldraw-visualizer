var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Parser;
    (function (Parser) {
        var Lines;
        (function (Lines) {
            (function (LdrawFileLineType) {
                LdrawFileLineType[LdrawFileLineType["Comment"] = 0] = "Comment";
                LdrawFileLineType[LdrawFileLineType["SubFileReference"] = 1] = "SubFileReference";
                LdrawFileLineType[LdrawFileLineType["Line"] = 2] = "Line";
                LdrawFileLineType[LdrawFileLineType["Triangle"] = 3] = "Triangle";
                LdrawFileLineType[LdrawFileLineType["Quadrilateral"] = 4] = "Quadrilateral";
                LdrawFileLineType[LdrawFileLineType["OptionalLine"] = 5] = "OptionalLine";
                LdrawFileLineType[LdrawFileLineType["Colour"] = 6] = "Colour";
                LdrawFileLineType[LdrawFileLineType["Step"] = 7] = "Step";
                LdrawFileLineType[LdrawFileLineType["Name"] = 8] = "Name";
                LdrawFileLineType[LdrawFileLineType["Author"] = 9] = "Author";
                LdrawFileLineType[LdrawFileLineType["RotationCenter"] = 10] = "RotationCenter";
                LdrawFileLineType[LdrawFileLineType["RotationConfig"] = 11] = "RotationConfig";
                LdrawFileLineType[LdrawFileLineType["RotationStep"] = 12] = "RotationStep";
                LdrawFileLineType[LdrawFileLineType["LDrawOrg"] = 13] = "LDrawOrg";
                LdrawFileLineType[LdrawFileLineType["File"] = 14] = "File";
                LdrawFileLineType[LdrawFileLineType["NoFile"] = 15] = "NoFile";
            })(Lines.LdrawFileLineType || (Lines.LdrawFileLineType = {}));
            var LdrawFileLineType = Lines.LdrawFileLineType;
        })(Lines = Parser.Lines || (Parser.Lines = {}));
    })(Parser = LdrawVisualizer.Parser || (LdrawVisualizer.Parser = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=LineTypes.js.map