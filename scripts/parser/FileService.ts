/// <reference path="../../typings/references.ts" />
/// <reference path="./LdrawFile.ts" />
/// <reference path="./lines/LineTypes.ts" />
/// <reference path="./FileParser.ts" />

module LdrawVisualizer {

	export class FileService {

		static GetLdrawFile(ldrawFile: string, callback: (file: LdrawVisualizer.LdrawFile, ldconfig: LdrawVisualizer.LdrawFile) => void, isDev: boolean = true) {
			var returnFile: LdrawVisualizer.LdrawFile,
				url = isDev ? 'http://localhost:17352/' : './parts-server';

			$.ajax({
				type: 'POST',
				url: url,
				data: { file: ldrawFile },
				success: (files: { [filename: string]: string }) => {
					var parsedFiles: { [filename: string]: LdrawFile } = {};
					for (var prop in files) {
						if (files.hasOwnProperty(prop)) {
							parsedFiles[prop] = (Parser.FileParser.Parse(files[prop]));
						}
					}

					for (var prop in parsedFiles) {
						if (parsedFiles.hasOwnProperty(prop)) {
							parsedFiles[prop].Lines.filter(l => l.LineType === Parser.Lines.LdrawFileLineType.SubFileReference).forEach(l => {
								var subfile = (<Parser.Lines.SubFileReferenceLine>l);
								subfile.File = parsedFiles[Utility.fixFilePath(subfile.Filename)];
							});
						}
					}
					
					callback(parsedFiles['$rootfile$'], parsedFiles['LDConfig.ldr']);
				},
				dataType: 'JSON'
			});
		}
	}
}