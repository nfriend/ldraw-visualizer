/// <reference path="../../typings/references.ts" />
/// <reference path="./LdrawFile.ts" />
/// <reference path="./lines/LineTypes.ts" />
/// <reference path="./FileParser.ts" />
/// <reference path="./FileCache.ts" />

module LdrawVisualizer {

	export class FileService {

		static GetLdrawFile(partName: string, callback: (file: LdrawVisualizer.LdrawFile) => void, isPrimitive: boolean = false) {
			var returnFile: LdrawVisualizer.LdrawFile;
			if (Parser.FileCache[partName.toUpperCase()]) {
				FileService.getSubparts(Parser.FileCache[partName.toUpperCase()], () => {
					callback(returnFile);
				});
			} else {
				$.ajax({
					type: 'GET',
					url: 'LDraw/' + (isPrimitive ? 'p' : 'parts') + '/' + partName,
					success: (partFile: string) => {
						var parsedFile = Parser.FileParser.Parse(partFile);
						returnFile = parsedFile;
						Parser.FileCache[partName.toUpperCase()] = parsedFile;
						
						FileService.getSubparts(parsedFile, () => {
							callback(returnFile);
						});
					},
					error: () => {
						if (!isPrimitive) {
							FileService.GetLdrawFile(partName, callback, true);
						}
					},
					dataType: 'text'
				});
			}
		}

		private static getSubparts(part: LdrawVisualizer.LdrawFile, callback: () => any) {
			var allSubFileRefs = part.Lines.filter(l => l.LineType === Parser.Lines.LdrawFileLineType.SubFileReference);
			if (allSubFileRefs.length > 0) {
				var completedCount = 0;
				allSubFileRefs.forEach(l => {
					FileService.GetLdrawFile((<Parser.Lines.SubFileReferenceLine>l).Filename, (file) => {
						(<Parser.Lines.SubFileReferenceLine>l).File = file;
						completedCount++;
						if (completedCount == allSubFileRefs.length) {
							callback();
						}
					});
				});
			} else {
				callback();
			}
		}
	}
}