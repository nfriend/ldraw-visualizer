/// <reference path="../parser/FileService.ts" />
/// <reference path="../parser/LdrawFile.ts" />
/// <reference path="../parser/lines/LineTypes.ts" />

module LdrawVisualizer.Renderer {
	export var ColorLookup: { [code: number]: number } = {
		
		// black
		0: 0x000000,
		
		// blue
		1: 0x005BF,
		
		// green
		2: 0x257A3E,
		
		// red
		4: 0xC91A09,
		
		// yellow
		14: 0xF2CD37,
		
		// white
		15: 0xFFFFFF
		
	}
}