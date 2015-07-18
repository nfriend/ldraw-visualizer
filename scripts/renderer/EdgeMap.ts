/// <reference path="../../typings/references.ts" />

module LdrawVisualizer.Renderer {

	export class EdgeMap {

		// how close the vertices must be to be considered the same point
		private precision: number = 10000;
		
		// a map of edge keys to faces.
		private map: { [mapKey: string]: Array<THREE.Geometry> } = {};

		addGeometry(geometry: THREE.Geometry): void {
			geometry.faces.forEach(f => {
				[
					{ vertex1Index: f.a, vertex2Index: f.b },
					{ vertex1Index: f.b, vertex2Index: f.c },
					{ vertex1Index: f.c, vertex2Index: f.a }
				].forEach((edge, index) => {
					var mapKey = this.GetMapKey(geometry.vertices[edge.vertex1Index], geometry.vertices[edge.vertex2Index]);
					if (!this.map[mapKey]) {
						this.map[mapKey] = [];
					}
					this.map[mapKey].push(geometry);
				});
			});
		}
		
		addGeometries(geometries: Array<THREE.Geometry>): void {
			geometries.forEach(g => {
				this.addGeometry(g);
			});
		}
		
		
		getGeometries(vertex1: THREE.Vector3, vertex2: THREE.Vector3): Array<THREE.Geometry> {
			return this.getGeometriesFromKey(this.GetMapKey(vertex1, vertex2));
		}
		
		getGeometriesFromKey(edgeKey: string): Array<THREE.Geometry> {
			return this.map[edgeKey] || [];
		}

		// returns an order-independent string key based on all six data points of the two vertices
		public GetMapKey(vertexA: THREE.Vector3, vertexB: THREE.Vector3): string {
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