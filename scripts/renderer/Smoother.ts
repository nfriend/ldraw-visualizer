/// <reference path="../../typings/references.ts" />
/// <reference path="../Utility.ts" />
/// <reference path="./VertexToFaceMap" />
/// <reference path="./VertexToLineMap" />
/// <reference path="./EdgeMap" />

module LdrawVisualizer.Renderer {
	export class Smoother {
		static Smooth(geometry: THREE.Geometry, optionalLines: Array<{ vertex1: THREE.Vector3, vertex2: THREE.Vector3 }>): void {

			geometry.computeVertexNormals();
			geometry.mergeVertices();
			geometry.computeFaceNormals();

			var faceMap = new VertexToFaceMap();
			faceMap.addGeometry(geometry);

			var edgeMap = new EdgeMap();
			edgeMap.addGeometry(geometry);

			var verticesToBeAveraged: { [vertexKey: string]: Array<THREE.Face3> } = {};
			optionalLines.forEach(optLine => {
				var sharedFaces = edgeMap.getFaces(optLine.vertex1, optLine.vertex2);
				var mapKey1 = this.getMapKey(optLine.vertex1);
				var mapKey2 = this.getMapKey(optLine.vertex2);
				
				if (!verticesToBeAveraged[mapKey1]) {
					verticesToBeAveraged[mapKey1] = [];
				}
				if (!verticesToBeAveraged[mapKey2]) {
					verticesToBeAveraged[mapKey2] = [];
				}
				
				verticesToBeAveraged[mapKey1].push(sharedFaces.face1);
				verticesToBeAveraged[mapKey1].push(sharedFaces.face2);
				verticesToBeAveraged[mapKey2].push(sharedFaces.face1);
				verticesToBeAveraged[mapKey2].push(sharedFaces.face2);
			});
			
			for (var vertexKey in verticesToBeAveraged) {
				if (verticesToBeAveraged.hasOwnProperty(vertexKey)) {
					var facesToBeAveraged = verticesToBeAveraged[vertexKey];
					
					var normal = new THREE.Vector3();
					facesToBeAveraged.forEach(face => {
						normal.add(face.normal);
					});
					normal.normalize();
					
					if (normal.x > 1 || normal.x < -1 || normal.y > 1 || normal.y < -1 || normal.z > 1 || normal.z < -1) {
						console.log('greater');
					}
					
					console.log(normal.x, normal.y, normal.z);
					
					var allFacesAtCurrentVertex = faceMap.getFacesFromVertexKey(vertexKey);
					// TODO: eliminate all faces from this array that weren't part of the original
					// facesToBeAveraged Array AND aren't an original face's quad sibling
					allFacesAtCurrentVertex.forEach(faceContainer => {
						faceContainer.face.vertexNormals[faceContainer.matchingVertexIndex] = normal;
					});
				}
			}
		}
		
		// how close the vertices must be to be considered the same point
		private static precision: number = 10000;
		
		// returns a string key based on three vertices of a point
		private static getMapKey(vertex: THREE.Vector3): string {
			return [Math.round(vertex.x * this.precision),
				Math.round(vertex.y * this.precision),
				Math.round(vertex.z * this.precision)].join('|');
		}
	}
}