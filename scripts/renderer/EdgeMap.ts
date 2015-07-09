/// <reference path="../../typings/references.ts" />

module LdrawVisualizer.Renderer {
	export class EdgeMap {

		// how close the vertices must be to be considered the same point
		private epsilon: number = 0.0001;
		
		// a map of edge keys to faces.
		private map: { [mapKey: string]: Array<THREE.Face3> } = {};

		// adds all of the faces in the geometry to the map, indexed by their edges.
		// note each face will appear in the internal map 3 times, once for each of its edges
		addGeometry(geometry: THREE.Geometry): void {
			geometry.faces.forEach(f => {

				var edge1MapKey = this.getMapKey(geometry.vertices[f.a], geometry.vertices[f.b]);
				if (!this.map[edge1MapKey]) {
					this.map[edge1MapKey] = [];
				}
				this.map[edge1MapKey].push(f);

				var edge2MapKey = this.getMapKey(geometry.vertices[f.b], geometry.vertices[f.c]);
				if (!this.map[edge2MapKey]) {
					this.map[edge2MapKey] = [];
				}
				this.map[edge2MapKey].push(f);

				var edge3MapKey = this.getMapKey(geometry.vertices[f.c], geometry.vertices[f.a]);
				if (!this.map[edge3MapKey]) {
					this.map[edge3MapKey] = [];
				}
				this.map[edge3MapKey].push(f);

			});
		}

		// returns any faces that contain an edge defined by the given vertices
		getFaces(vertex1: THREE.Vector3, vertex2: THREE.Vector3): Array<THREE.Face3> {
			return this.map[this.getMapKey(vertex1, vertex2)];
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

			return [Math.round(first.x * this.epsilon),
				Math.round(first.y * this.epsilon),
				Math.round(first.z * this.epsilon),
				Math.round(second.x * this.epsilon),
				Math.round(second.y * this.epsilon),
				Math.round(second.z * this.epsilon)].join('|');
		}
	}
}