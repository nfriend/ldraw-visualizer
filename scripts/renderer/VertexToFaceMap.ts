/// <reference path="../../typings/references.ts" />
/// <reference path="../Utility.ts" />
/// <reference path="./VertexMapBase.ts" />

module LdrawVisualizer.Renderer {

	export interface FaceContainer {
		face: THREE.Face3;
		matchingVertexIndex: Face3VertexIndex;
	}

	export enum Face3VertexIndex {
		A = 0, B = 1, C = 2
	}

	export class VertexToFaceMap extends VertexMapBase {
		
		// a map of vertex keys to faces.
		private map: { [mapKey: string]: Array<FaceContainer> } = {};

		// adds all of the faces in the geometry to the map, indexed by their vertices.
		// note each face will appear in the internal map 3 times, once for each vertex
		addGeometry(geometry: THREE.Geometry): void {
			geometry.faces.forEach(f => {
				[f.a, f.b, f.c].forEach((vertexIndex, index) => {
					var vertexMapKey = this.getMapKey(geometry.vertices[vertexIndex]);
					this.map[vertexMapKey] = this.map[vertexMapKey] || [];
					this.map[vertexMapKey].push({
						face: f,
						matchingVertexIndex: index
					});
				});
			});
		}
		
		// returns a list of unique faces that contain the given vertex
		getFaces(vertex: THREE.Vector3|THREE.Vector3[]): Array<FaceContainer> {
			if (Utility.isArray(vertex)) {
				var allFaces: Array<FaceContainer> = [];
				(<THREE.Vector3[]>vertex).forEach(v => {
					allFaces.concat(this.map[this.getMapKey(<THREE.Vector3>vertex)]);
				});
				var uniqueFaces = allFaces.filter((value, index, self) => {
					return self.indexOf(value) === index;
				});
				return uniqueFaces;
			} else {
				return this.map[this.getMapKey(<THREE.Vector3>vertex)];	
			}
		}
	}
}