/// <reference path="../../typings/references.ts" />
/// <reference path="../Utility.ts" />

module LdrawVisualizer.Renderer {

	export interface FaceContainer {
		face: THREE.Face3;
		matchingVertexIndex: Face3VertexIndex;
	}

	export enum Face3VertexIndex {
		A = 0, B = 1, C = 2
	}

	export class VertexToFaceMap {
		
		// a map of vertex keys to faces.
		private map: { [mapKey: string]: Array<FaceContainer> } = {};
		
		// how close the vertices must be to be considered the same point
		private precision: number = 10000;

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
					var faces = this.map[this.getMapKey(v)];
					if (faces) {
						allFaces = allFaces.concat(faces);
					}
				});
				var uniqueFaces = allFaces.filter((value, index, self) => {
					return self.indexOf(value) === index;
				});
				return uniqueFaces;
			} else {
				return this.map[this.getMapKey(<THREE.Vector3>vertex)];
			}
		}
		
		getFacesFromVertexKey(vertexKey: string): Array<FaceContainer> {
			return this.map[vertexKey];
		}

		// returns a string key based on three vertices of a point
		private getMapKey(vertex: THREE.Vector3): string {
			return [Math.round(vertex.x * this.precision),
				Math.round(vertex.y * this.precision),
				Math.round(vertex.z * this.precision)].join('|');
		}
	}
}