/// <reference path="../parser/FileService.ts" />
/// <reference path="../parser/LdrawFile.ts" />
/// <reference path="../parser/lines/LineTypes.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Renderer;
    (function (Renderer) {
        Renderer.ColorLookup = {
            // black
            0: { hex: 0x000000 },
            // blue
            1: { hex: 0x005BF },
            // green
            2: { hex: 0x257A3E },
            // red
            4: { hex: 0xC91A09 },
            // brown
            6: { hex: 0x583927 },
            // dark gray
            8: { hex: 0x6D6E5C },
            // yellow
            14: { hex: 0xF2CD37 },
            // white
            15: { hex: 0xFFFFFF },
            // tranparent red
            36: { hex: 0xC91A09, alpha: 128 },
            // tranparent clear
            47: { hex: 0xFCFCFC, alpha: 128 },
            // silver metal
            80: { hex: 0xA5A9B4 },
            // rubber black
            256: { hex: 0x212121 },
            // chrome silver
            383: { hex: 0xE0E0E0 },
        };
    })(Renderer = LdrawVisualizer.Renderer || (LdrawVisualizer.Renderer = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=ColorLookup.js.map