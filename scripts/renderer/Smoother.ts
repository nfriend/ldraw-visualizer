/// <reference path="../../typings/references.ts" />
/// <reference path="../Utility.ts" />
/// <reference path="./VertexToFaceMap" />
/// <reference path="./VertexToLineMap" />
/// <reference path="./EdgeMap" />

module LdrawVisualizer.Renderer {
	export class Smoother {

		private edgeMap = new EdgeMap();

		public CombineAndSmooth(geometries: Array<THREE.Geometry>,
			optionalLines: Array<{ vertex1: THREE.Vector3, vertex2: THREE.Vector3 }>,
			quadLines: { [lineKey: string]: any }): THREE.Geometry {

			this.edgeMap.addGeometries(geometries);

			var optionalLineLookup: { [key: string]: { vertex1: THREE.Vector3, vertex2: THREE.Vector3 } } = {};
			optionalLines.forEach(ol => {
				optionalLineLookup[this.edgeMap.GetMapKey(ol.vertex1, ol.vertex2)] = ol;
			});

			var geometryGroups: Array<Array<THREE.Geometry>> = [];

			while (geometries.length > 0) {
				var currentGeometry = geometries.shift();
				var currentGeometryGroup = this.getConnectedGeometriesGroup(currentGeometry, optionalLineLookup);
				currentGeometryGroup.forEach(geom => {
					geometries.splice(geometries.indexOf(geom), 1);
				});

				geometryGroups.push(currentGeometryGroup);
			}

			var emptyMatrix = new THREE.Matrix4();
			var smoothedGeometries: Array<THREE.Geometry> = [];

			geometryGroups.forEach(group => {
				var combinedGeom = new THREE.Geometry();
				group.forEach(geom => {
					combinedGeom.merge(geom, emptyMatrix, 0);
				});
				combinedGeom.computeFaceNormals();
				combinedGeom.mergeVertices();
				combinedGeom.computeVertexNormals();
				smoothedGeometries.push(combinedGeom);
			});

			var finalGeom = new THREE.Geometry();
			smoothedGeometries.forEach(geom => {
				finalGeom.merge(geom, emptyMatrix, 0);
			});

			return finalGeom;	
			
			// for (var lineKey in quadLines) {
			// 	if (quadLines.hasOwnProperty(lineKey)) {
			// 		var quadHalves = edgeMap.getFacesFromLineKey(lineKey);
			// 		if (quadHalves) {
			// 			quadHalves.face1.vertexNormals[0] = quadHalves.face2.vertexNormals[2].clone();
			// 			quadHalves.face2.vertexNormals[0] = quadHalves.face1.vertexNormals[2].clone();
			// 		}
			// 	}
			// }
		}
		
		// returns all geometries connected to the provided geometry.
		// the returned array includes the provided geometry.
		private getConnectedGeometriesGroup(
			geometry: THREE.Geometry,
			optionalLineLookup: { [key: string]: { vertex1: THREE.Vector3, vertex2: THREE.Vector3 } },
			geometries: Array<THREE.Geometry> = []
			): Array<THREE.Geometry> {

			geometries.push(geometry);

			geometry.faces.forEach(f => {
				[
					{ vertex1: f.a, vertex2: f.b },
					{ vertex1: f.b, vertex2: f.c },
					{ vertex1: f.c, vertex2: f.a },
				].forEach(edge => {
					var edgeKey = this.edgeMap.GetMapKey(geometry.vertices[edge.vertex1], geometry.vertices[edge.vertex2]);
					if (optionalLineLookup[edgeKey]) {
						var adjacentGeometries = this.edgeMap.getGeometriesFromKey(edgeKey);
						if (adjacentGeometries.length > 0) {
							adjacentGeometries.forEach(geom => {
								if (geometries.indexOf(geom) === -1) {
									this.getConnectedGeometriesGroup(geom, optionalLineLookup, geometries);
								}
							});
						}
					}
				});
			});

			return geometries;
		}
	}
}