/// <reference path="../../typings/references.ts" />
/// <reference path="../utility.ts" />
/// <reference path="./lines/LdrawFileLine.ts" />

module LdrawVisualizer {
	export class LdrawFile {
		Lines: Parser.Lines.LdrawFileLine[] = [];
		
		IsValid(): boolean {
			return this.Lines.every(l => l.IsValid());
		}
	}
}