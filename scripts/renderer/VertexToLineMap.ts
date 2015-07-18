/// <reference path="../../typings/references.ts" />
/// <reference path="../Utility.ts" />

module LdrawVisualizer.Renderer {

	export interface OptionalLine {
		vertex1: THREE.Vector3;
		vertex2: THREE.Vector3;
	}

	export class VertexToLineMap {
		
		// a map of vertex keys to lines.
		private map: { [mapKey: string]: Array<OptionalLine> } = {};
		
		// how close the vertices must be to be considered the same point
		private precision: number = 10000;
		
		// adds a line (defined by two THREE.Vector3's) to the map.
		// note that each line will appear in the map twice - once for each point
		addLine(vertex1: THREE.Vector3, vertex2: THREE.Vector3): void {
			[vertex1, vertex2].forEach((v) => {
				var vertexMapKey = this.getMapKey(v);
				this.map[vertexMapKey] = this.map[vertexMapKey] || [];
				this.map[vertexMapKey].push({
					vertex1: vertex1,
					vertex2: vertex2
				});
			});
		}
		
		// returns a list of unique lines that contain the given vertex
		getLines(vertex: THREE.Vector3): Array<OptionalLine> {
			return this.map[this.getMapKey(<THREE.Vector3>vertex)];
		}
		
		// returns a string key based on three vertices of a point
		private getMapKey(vertex: THREE.Vector3): string {
			return [Math.round(vertex.x * this.precision),
				Math.round(vertex.y * this.precision),
				Math.round(vertex.z * this.precision)].join('|');
		}
	}
}