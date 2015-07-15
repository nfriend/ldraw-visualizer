/// <reference path="../../typings/references.ts" />
/// <reference path="../Utility.ts" />

module LdrawVisualizer.Renderer {

	export class VertexMapBase {

		// how close the vertices must be to be considered the same point
		public static precision: number = 10000;

		// returns a string key based on three vertices of a point
		public static GetMapKey(vertex: THREE.Vector3): string {
			return [Math.round(vertex.x * this.precision),
				Math.round(vertex.y * this.precision),
				Math.round(vertex.z * this.precision)].join('|');
		}
	}
}