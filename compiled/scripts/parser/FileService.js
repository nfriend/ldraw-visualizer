/// <reference path="../../typings/references.ts" />
/// <reference path="./LdrawFile.ts" />
/// <reference path="./lines/LineTypes.ts" />
/// <reference path="./FileParser.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var FileService = (function () {
        function FileService() {
        }
        FileService.GetLdrawFile = function (ldrawFile, callback, isDev) {
            if (isDev === void 0) { isDev = true; }
            var returnFile, url = isDev ? 'http://localhost:17352/' : './parts-server/';
            $.ajax({
                type: 'POST',
                url: url,
                data: { file: ldrawFile },
                success: function (files) {
                    var parsedFiles = {};
                    for (var prop in files) {
                        if (files.hasOwnProperty(prop)) {
                            parsedFiles[prop] = (LdrawVisualizer.Parser.FileParser.Parse(files[prop]));
                        }
                    }
                    for (var prop in parsedFiles) {
                        if (parsedFiles.hasOwnProperty(prop)) {
                            parsedFiles[prop].Lines.filter(function (l) { return l.LineType === LdrawVisualizer.Parser.Lines.LdrawFileLineType.SubFileReference; }).forEach(function (l) {
                                var subfile = l;
                                subfile.File = parsedFiles[subfile.Filename];
                            });
                        }
                    }
                    callback(parsedFiles['$rootfile$'], parsedFiles['LDConfig.ldr']);
                },
                dataType: 'JSON'
            });
        };
        return FileService;
    })();
    LdrawVisualizer.FileService = FileService;
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=FileService.js.map