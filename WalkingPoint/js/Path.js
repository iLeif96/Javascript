import {Cell} from "./Cell.js";

/**
 *
 */
export default class Path extends Array {
	constructor(...args) {
		if (args.length > 0) {
			super(...args);
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
	
	/**
	 * Вуернуть текущую позицию и отправиться к следующей
	 * @return {Cell}
	 */
	next() {
		return this[this.currentPositionInPath++];
	}
	
	/**
	 * Вуернуть текущую позицию
	 * @return {Cell}
	 */
	now() {
		return this[this.currentPositionInPath];
	}
	
	/**
	 * Вернуть текущую часть пути, состоящую из двух точек
	 *  @return Path
	 */
	nowPath() {
		if (this[this.currentPositionInPath + 1])
			return new Path(this[this.currentPositionInPath], this[this.currentPositionInPath + 1]);
		else
			return null;
	}
	
	/**
	 * Вернуть текущую часть пути, состоящую из двух точек и перейти на следующую позицию
	 *  @return Path
	 */
	nextPath() {
		if (!this.isDone())
			return new Path(this[this.currentPositionInPath], this[++this.currentPositionInPath]);
		else
			return null;
	}
	
	/**
	 * Закончен ли путь
	 * true, если закончен
	 */
	isDone() {
		return (this.currentPositionInPath >= this.length - 1);
	}
}