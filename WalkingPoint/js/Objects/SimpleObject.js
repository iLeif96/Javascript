import {MPoint} from "../Point.js";

export  default class SimpleObject {
	constructor(name = "Object", position = new MPoint(0, 0), hp = 100) {
		this.name = name;
		this.position = position;
		this.hp = hp;
		this.type = "SimpleObject";
		this.color = "rgb(30, 30, 30)"
	}
	
	
	//От этого надо избавиться
	
	/*
		Просто макросы для получения координат
	 */
	/**
	 * Передает точку в непереведенных к отрисовке координатам
	 * @param groundMatrix {GroundMatrix}
	 * @returns {CPoint}
	 */
	getCPoint(groundMatrix) {
		this.position.getCPoint(groundMatrix);
	}
	/**
	 * Передает координату в переведенных к отрисовке координатам
	 * @param groundMatrix {GroundMatrix}
	 * @returns x: {number}
	 */
	getX(groundMatrix) {
		return this.position.getX(groundMatrix);
	}
	/**
	 * Передает координату в переведенных к отрисовке координатам
	 * @param mPoint {MPoint}
	 * @returns y: {number}
	 */
	getY(groundMatrix) {
		return this.position.getY(groundMatrix);
	}
}