/// <reference path="../../typings/references.ts" />

module LdrawVisualizer.Renderer {

	export interface AdjacentFacesContainer {
		face1: THREE.Face3;
		face1SharedEdge: Face3Edge;
		face2: THREE.Face3;
		face2SharedEdge: Face3Edge;
	}

	export enum Face3Edge {
		AB = 0, BC = 1, CA = 2
	}

	export class EdgeMap {

		// how close the vertices must be to be considered the same point
		private precision: number = 10000;
		
		// a map of edge keys to faces.
		private map: { [mapKey: string]: AdjacentFacesContainer } = {};

		// adds all of the faces in the geometry to the map, indexed by their edges.
		// note each face will appear in the internal map 3 times, once for each of its edges
		addGeometry(geometry: THREE.Geometry): void {
			geometry.faces.forEach(f => {
				[
					{ vertex1Index: f.a, vertex2Index: f.b },
					{ vertex1Index: f.b, vertex2Index: f.c },
					{ vertex1Index: f.c, vertex2Index: f.a }
				].forEach((edge, index) => {
					var edge1MapKey = this.getMapKey(geometry.vertices[edge.vertex1Index], geometry.vertices[edge.vertex2Index]);
					if (!this.map[edge1MapKey]) {
						this.map[edge1MapKey] = <any>{};
					}

					var entry = this.map[edge1MapKey];

					if (!entry.face1) {
						entry.face1 = f;
						entry.face1SharedEdge = index;
					} else if (!entry.face2) {
						entry.face2 = f;
						entry.face2SharedEdge = index;
					} else {
						console.log('More than two faces share an edge.  Unable to smooth more than two faces.  This additional face has been ignored. map key: ' + edge1MapKey);
					}
				});
			});
		}
		
		// returns any faces that contain an edge defined by the given vertices
		getFaces(vertex1: THREE.Vector3, vertex2: THREE.Vector3): AdjacentFacesContainer {
			var foundContainer = this.map[this.getMapKey(vertex1, vertex2)];
			if (foundContainer && foundContainer.face1 && foundContainer.face2) {
				return foundContainer;
			} else {
				return;
			}
		}

		// returns an order-independent string key based on all six data points of the two vertices
		private getMapKey(vertexA: THREE.Vector3, vertexB: THREE.Vector3): string {
			var first: THREE.Vector3, second: THREE.Vector3;

			if (vertexA.x < vertexB.x) {
				first = vertexA;
				second = vertexB;
			} else if (vertexA.x > vertexB.x) {
				first = vertexB;
				second = vertexA;
			} else {

				if (vertexA.y < vertexB.y) {
					first = vertexA;
					second = vertexB;
				} else if (vertexA.y > vertexB.y) {
					first = vertexB;
					second = vertexA;
				} else {

					if (vertexA.z < vertexB.z) {
						first = vertexA;
						second = vertexB;
					} else if (vertexA.z > vertexB.z) {
						first = vertexB;
						second = vertexA;
					} else {
						// they're the same point
						
						first = vertexA;
						second = vertexB;
					}
				}
			}

			return [Math.round(first.x * this.precision),
				Math.round(first.y * this.precision),
				Math.round(first.z * this.precision),
				Math.round(second.x * this.precision),
				Math.round(second.y * this.precision),
				Math.round(second.z * this.precision)].join('|');
		}
	}
}