/// <reference path="../../typings/references.ts" />
/// <reference path="./part-file.ts" />
/// <reference path="./file-parser.ts" />

module LdrawVisualizer.FileService {
	export function GetPart(partName: string, callback: (part: PartFile) => void) {
		
		var temporaryBrickFileForTesting = '0 Brick  2 x  4\r\n0 Name: 3001.dat\r\n0 Author: James Jessiman\r\n0 !LDRAW_ORG Part UPDATE 2004-03\r\n0 !LICENSE Redistributable under CCAL version 2.0 : see CAreadme.txt\r\n\r\n0 BFC CERTIFY CCW\r\n\r\n0 !HISTORY 2002-05-07 [unknown] BFC Certification\r\n0 !HISTORY 2002-06-11 [PTadmin] Official Update 2002-03\r\n0 !HISTORY 2004-02-08 [Steffen] used s\\3001s01.dat\r\n0 !HISTORY 2004-09-15 [PTadmin] Official Update 2004-03\r\n0 !HISTORY 2007-05-07 [PTadmin] Header formatted for Contributor Agreement\r\n0 !HISTORY 2008-07-01 [PTadmin] Official Update 2008-01\r\n\r\n1 16 0 0 0 1 0 0 0 1 0 0 0 1 s\\3001s01.dat\r\n4 16 -40 0 -20 -40 24 -20 40 24 -20 40 0 -20\r\n4 16 40 0 20 40 24 20 -40 24 20 -40 0 20\r\n0';
		
		var url = '';
		
		// $.ajax({
		// 	type: 'GET',
		// 	url: url,
		// 	success: (partFile: string) => {
		// 		callback(FileParser.Parse(partFile));
		// 	},
		// 	error: () => {
		// 		// TODO
		// 	},
		// 	dataType: 'text'
		// });
		
		
		callback(FileParser.Parse(temporaryBrickFileForTesting));
	}
}