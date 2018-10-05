import Cell from "./Cell.js";

/**
 *
 */
export default class Path extends Array {
	constructor(...args) {
		if (args.length > 0) {
			super(args);
		}
		else {
			super();
		}
		this.type = "Path";
		/**
		 * Текущая позиция персонажа в пути
		 * @type {number}
		 */
		this.currentPositionInPath = 0;
	}
	
}