/// <reference path="../../typings/references.ts" />
/// <reference path="./LdrawFile.ts" />
/// <reference path="./lines/LineTypes.ts" />
/// <reference path="./FileParser.ts" />
var SubFileReferenceLine = LdrawVisualizer.Parser.Lines.SubFileReferenceLine;
var LdrawFileLineType = LdrawVisualizer.Parser.Lines.LdrawFileLineType;
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var FileService = (function () {
        function FileService() {
        }
        FileService.GetLdrawFile = function (ldrawFile, callback, isDev) {
            if (isDev === void 0) { isDev = true; }
            var returnFile, url = isDev ? 'http://localhost:17352/' : './parts-server';
            $.ajax({
                type: 'POST',
                url: url,
                data: { file: ldrawFile },
                success: function (files) {
                    var parsedFiles = {};
                    // parse each line into a LdrawFile object
                    for (var prop in files) {
                        if (files.hasOwnProperty(prop)) {
                            parsedFiles[prop] = (LdrawVisualizer.Parser.FileParser.Parse(files[prop]));
                        }
                    }
                    var rootFile = parsedFiles['$rootfile$'], ldConfig = parsedFiles['LDConfig.ldr'];
                    // break any .mpd subparts into their own "parts"
                    var mpdSubFiles = rootFile.Lines.filter(function (l) { return l.LineType === LdrawFileLineType.File; });
                    for (var i = mpdSubFiles.length - 1; i > 0; i--) {
                        var mpdLine = mpdSubFiles[i], originalIndex = rootFile.Lines.indexOf(mpdLine);
                        console.log('found subpart number ' + i + ', chopping off starting at ' + originalIndex);
                        var newSubpartLdrawFile = new LdrawVisualizer.LdrawFile();
                        newSubpartLdrawFile.Lines = rootFile.Lines.splice(originalIndex, rootFile.Lines.length /* to the end of the array */);
                        parsedFiles[LdrawVisualizer.Utility.fixFilePath(mpdLine.Filename)] = newSubpartLdrawFile;
                    }
                    // console.log(rootFile);
                    // console.log(parsedFiles['Core.ldr']);
                    // console.log('hello');
                    // link up subfile references lines to their SubFileReferenceLine instances
                    for (var prop in parsedFiles) {
                        if (parsedFiles.hasOwnProperty(prop)) {
                            parsedFiles[prop].Lines.filter(function (l) { return l.LineType === LdrawFileLineType.SubFileReference; }).forEach(function (l) {
                                var subfile = l;
                                subfile.File = parsedFiles[LdrawVisualizer.Utility.fixFilePath(subfile.Filename)];
                            });
                        }
                    }
                    callback(rootFile, ldConfig);
                },
                dataType: 'JSON'
            });
        };
        return FileService;
    })();
    LdrawVisualizer.FileService = FileService;
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=FileService.js.map