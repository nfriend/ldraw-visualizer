/// <reference path="../../../../typings/references.ts" />
/// <reference path="../LdrawFileLine.ts" />
/// <reference path="../LineTypes.ts" />
/// <reference path="../../Color.ts" />

module LdrawVisualizer.Parser.Lines {
	export class ColourMETALine extends LdrawFileLine {
		constructor(name: string, code: number, value: Color, edge: number|Color, 
			alpha: number, luminance: number, texture: ColorTexture) {
				
			super(LdrawFileLineType.Colour);
			
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
			
			return Utility.isNonEmpty(this.Name)
				&& Utility.isValidColorCode(this.Code)
				&& this.Value.IsValid()
				&& isEdgeValid
				&& (Utility.isNullOrUndefined(this.Alpha) || Utility.isByte(this.Alpha)) 
				&& (Utility.isNullOrUndefined(this.Luminance) || Utility.isByte(this.Luminance));
		}
		
		static Parse(line: string, splitLine: string[], lineNumber: number): Lines.ColourMETALine {
			var code: number,
				value: Color,
				edge: number|Color,
				alpha: number,
				luminance: number,
				texture: Lines.ColorTexture;

			var codeIndex = splitLine.indexOf('CODE');
			if (codeIndex !== -1) {
				code = parseInt(splitLine[codeIndex + 1], 10);
			}

			var valueIndex = splitLine.indexOf('VALUE');
			if (valueIndex !== -1) {
				value = new Color(splitLine[valueIndex + 1]);
			}

			var edgeIndex = splitLine.indexOf('EDGE');
			if (edgeIndex !== -1) {
				var edgeValue = splitLine[edgeIndex + 1];
				if (Utility.isValidColorHexString(edgeValue)) {
					edge = new Color(edgeValue);
				} else {
					edge = parseInt(edgeValue, 10);
				}
			}

			var alphaIndex = splitLine.indexOf('ALPHA');
			if (alphaIndex !== -1) {
				alpha = parseInt(splitLine[alphaIndex + 1], 10);
			}

			var luminanceIndex = splitLine.indexOf('LUMINANCE');
			if (luminanceIndex !== -1) {
				luminance = parseInt(splitLine[luminanceIndex + 1], 10);
			}

			if (splitLine.indexOf('CHROME') !== -1) {
				texture = Lines.ColorTexture.Chrome;
			} else if (splitLine.indexOf('PEARLESCENT') !== -1) {
				texture = Lines.ColorTexture.Chrome;
			} else if (splitLine.indexOf('RUBBER') !== -1) {
				texture = Lines.ColorTexture.Chrome;
			} else if (splitLine.indexOf('MATTE_METALLIC') !== -1) {
				texture = Lines.ColorTexture.Chrome;
			} else if (splitLine.indexOf('METAL') !== -1) {
				texture = Lines.ColorTexture.Chrome;
			} else if (splitLine.indexOf('MATERIAL') !== -1) {
				if (splitLine.indexOf('GLITTER') !== -1) {
					texture = Lines.ColorTexture.Glitter;
				} else if (splitLine.indexOf('SPECKLE') !== -1) {
					texture = Lines.ColorTexture.Speckle;
				}
			}

			var colourLine = new Lines.ColourMETALine(splitLine[2], code, value, edge, alpha, luminance, texture);

			if (!colourLine.IsValid()) {
				throw 'Unable to parse META colour line: Invalid line arguments on line ' + lineNumber;
			}

			return colourLine;
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