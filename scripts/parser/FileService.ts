/// <reference path="../../typings/references.ts" />
/// <reference path="./LdrawFile.ts" />
/// <reference path="./lines/LineTypes.ts" />
/// <reference path="./FileParser.ts" />

import SubFileReferenceLine = LdrawVisualizer.Parser.Lines.SubFileReferenceLine;
import LdrawFileLineType = LdrawVisualizer.Parser.Lines.LdrawFileLineType;

module LdrawVisualizer {

	export class FileService {

		static GetLdrawFile(ldrawFile: string, callback: (file: LdrawFile, ldconfig: LdrawFile) => void, isDev: boolean = true) {
			var returnFile: LdrawFile,
				url = isDev ? 'http://localhost:17352/' : './parts-server';

			$.ajax({
				type: 'POST',
				url: url,
				data: { file: ldrawFile },
				success: (files: { [filename: string]: string }) => {
					var parsedFiles: { [filename: string]: LdrawFile } = {};
						
					// parse each line into a LdrawFile object
					for (var prop in files) {
						if (files.hasOwnProperty(prop)) {
							parsedFiles[prop] = (Parser.FileParser.Parse(files[prop]));
						}
					}
					
					var rootFile = parsedFiles['$rootfile$'],
						ldConfig = parsedFiles['LDConfig.ldr'];
					
					// break any .mpd subparts into their own "parts"
					var mpdSubFiles = rootFile.Lines.filter(l => l.LineType === LdrawFileLineType.File)
					for (var i = mpdSubFiles.length - 1; i > 0; i--) {
						var mpdLine = <Parser.Lines.FileMETALine>mpdSubFiles[i],
							originalIndex = rootFile.Lines.indexOf(mpdLine);
							
						console.log('found subpart number ' + i + ', chopping off starting at ' + originalIndex);
							
						var newSubpartLdrawFile = new LdrawFile();
						newSubpartLdrawFile.Lines = rootFile.Lines.splice(originalIndex, rootFile.Lines.length /* to the end of the array */);
						parsedFiles[Utility.fixFilePath(mpdLine.Filename)] = newSubpartLdrawFile; 
					}
					
					// console.log(rootFile);
					// console.log(parsedFiles['Core.ldr']);
					// console.log('hello');

					// link up subfile references lines to their SubFileReferenceLine instances
					for (var prop in parsedFiles) {
						if (parsedFiles.hasOwnProperty(prop)) {
							parsedFiles[prop].Lines.filter(l => l.LineType === LdrawFileLineType.SubFileReference).forEach(l => {
								var subfile = (<SubFileReferenceLine>l);
								subfile.File = parsedFiles[Utility.fixFilePath(subfile.Filename)];
							});
						}
					}

					callback(rootFile, ldConfig);
				},
				dataType: 'JSON'
			});
		}
	}
}