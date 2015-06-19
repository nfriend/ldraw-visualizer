/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LdrawFileLine.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="./METALine.ts" />
/// <reference path="../../Color.ts" />

module LdrawVisualizer.Parser.Lines {
	export class ColourMETALine extends METALine {
		constructor(name: string, code: number, value: Color, edge: number|Color, 
			alpha: number, luminance: number, texture: ColorTexture) {
				
			super(LdrawFileMETALineType.Colour);
			
			this.Name = name;
			this.Code = code;
			this.Value = value;
			this.Edge = edge;
			this.Alpha = alpha;
			this.Luminance = luminance;
			this.Texture = texture;
		}
		
		Name: string;
		Code: number;
		Value: Color;
		Edge: number|Color;
		Alpha: number;
		Luminance: number;
		Texture: ColorTexture;
		
		IsValid(): boolean {
			if (typeof this.Edge === 'number') {
				var isEdgeValid = Utility.isValidColorCode(<number>this.Edge);
			} else {
				var isEdgeValid = !isEdgeValid || (<Color>this.Edge).IsValid();
			}
			
			return /^\S+$/i.test(this.Name)
				&& Utility.isValidColorCode(this.Code)
				&& this.Value.IsValid()
				&& isEdgeValid
				&& (Utility.isNullOrUndefined(this.Alpha) || Utility.isByte(this.Alpha)) 
				&& (Utility.isNullOrUndefined(this.Luminance) || Utility.isByte(this.Luminance));
		}
	}
	
	export enum ColorTexture {
		Chrome, 
		Pearlescent, 
		Rubber,
		MatteMetalic,
		Metal,
		Glitter,
		Speckle,
	} 
}