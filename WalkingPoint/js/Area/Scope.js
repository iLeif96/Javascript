'use strict';
export default class Scope {
	constructor(canvas) {
		this.canvas = canvas;
		this.cell = 50;
		this.deltaX = 0;
		this.deltaY = 0;
		this.scale = 1;
		this.wStart = 0;
		this.wEnd = 0;
		this.wCellExtra = 0;
		this.hStart = 0;
		this.hEnd = 0;
		this.hCellExtra = 0;
		
		this.width = 0;
		this.height = 0;
		
		this.refresh();
	}
	
	/**
	 * Обновить данные
	 */
	refresh() {
		
		let w = (this.canvas.width - this.cell * 2) ;
		this.wCellExtra = (this.canvas.width - w) / 2;
		this.wStart = this.cell + this.wCellExtra;
		this.wEnd = w + this.wCellExtra - this.canvas.width % this.cell;
		
		let h = (this.canvas.height - this.cell * 2);
		this.wCellExtra = (this.canvas.height - h) / 2;
		this.hStart = this.cell + this.hCellExtra;
		this.hEnd = h + this.hCellExtra - this.canvas.height % this.cell;
		
		this.width = this.wEnd - this.wStart;
		this.height = this.hEnd - this.hStart;
	}
	
	/**
	 * Получает координату с масштаброванием и смещением по X;
	 */
	getX(x) {
		return (x + this.deltaX) * this.scale;
	};
	/**
	 * Получает координату с масштаброванием и смещением по Y;
	 */
	getY(y) {
		return (y + this.deltaY) * this.scale;
	};
	
	 /**
	 * Получает координату с обнуленным масштаброванием и смещением по X;
	 */
	getNormalX(x) {
		return (x / this.scale - this.deltaX) ;
	};
	/**
	 * Получает координату с обнуленным масштаброванием и смещением по Y;
	 */
	getNormalY(y) {
		return (y / this.scale - this.deltaY);
	};
};

