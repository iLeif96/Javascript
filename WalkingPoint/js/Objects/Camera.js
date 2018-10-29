import SimpleObject from "./SimpleObject.js";
import Enums from "../Enums.js";


export default class Camera extends SimpleObject {

	/**
	 * Создает объект камеры. Чтобы камера начала работать, нужно запустить её функцией activate;
	 * @param position {CPoint}
	 * @param scope {Scope}
	 * @param isFromScope {Boolean}: Нужно ли брать значения из scope
	 * @param parameters
	 */
	constructor(position, scope, isFromScope = true, parameters = {
		name: "Camera",
		target: null,
		/** @type Camera.followMode */
		followMode: Camera.followMode.simpleFollow,
		/** @type Camera.view */
		view: Camera.view.cartesian,
		
	}) {
		super(parameters.name, position);
		this.position = position.clone();
		this.scope = scope;
		/** @type SimpleObject */
		this.target = parameters.target;
		/** @type Camera.followMode */
		this.followMode = parameters.followMode;
		/** @type Camera.view */
		this.view = parameters.view;
		
		this.onGround = false;
		this.type = Camera;
		this.baseType = Camera;
		
		this.scale = 0;
		this.deltaX = 0;
		this.deltaY = 0;
		
		if (isFromScope) {
			this.applyFromScope(this.scope);
		}
		this.disable = true;
	}
	
	/**
	 * Активирует камеру
	 */
	activate() {
		this.disable = false;
		
		this.scope.view = this.view;
		this.scope.canvas.globalChanges = true;
	}
	
	/**
	 * Расчитывает смещение поля относительно камеры
	 */
	solveDelta() {
		if ((this.followMode === Camera.followMode.noneFollow) || this.target === null) {
			return;
		}
		
		this.position.setPositionFromPoint(this.target.position.cPoint);
		let midX = this.scope.wMid;
		let midY = this.scope.hMid;
		
		let scale = this.scope.scale;
		
		// this.scope.deltaY = (midX - this.position.x - this.scope.cell / 2) / scale;
		// this.scope.deltaY = (midY - this.position.y - this.scope.cell / 2) / scale;
		
		this.deltaX = midX / scale - (this.position.x + this.scope.cell / 2);
		this.deltaY = midY / scale - (this.position.y + this.scope.cell / 2);
		
		this.scope.canvas.globalChanges = true;
	}
	
	/**
	 * Отвечает за зумм камеры
	 * @param delta
	 * @param position
	 */
	setScale(delta, position) {
		
		let midX = this.scope.wMid;
		let midY = this.scope.hMid;
		
		let deltaX = this.deltaX;
		let deltaY = this.deltaY;
		
		/**
		 * При изменении масштаба (например при прокрутке колесиком):
		 * Если задан объект для слежки, то следим за ним
		 * Если не задан, то приближаемся к точке
		 */
		if ((this.followMode !== Camera.followMode.noneFollow) && this.target !== null) {
			let scale = this.scale + (this.scale) * delta;
			this.scale = (scale < 0.3) ? 0.3 : (scale > 5) ? 5 : scale;
			
			this.position.setPositionFromPoint(this.target.position.cPoint);
			
			deltaX = midX / this.scale - (this.position.x + this.scope.cell / 2);
			deltaY = midY / this.scale - (this.position.y + this.scope.cell / 2);
		}
		else if (position !== null) {
			this.position.setPositionFromPoint(position);
			
			let oldX = this.position.x / this.scale;
			let oldY = this.position.y / this.scale;
			
			let scale = this.scale + (this.scale) * delta;
			this.scale = (scale < 0.3) ? 0.3 : (scale > 5) ? 5 : scale;
			
			let newX = this.position.x / this.scale;
			let newY = this.position.y / this.scale;
			
			let dX = newX - oldX;
			let dY = newY - oldY;
			
			deltaX += dX;
			deltaY += dY;
			
			console.log(deltaX, deltaY);
			// console.log(midX, midY);
			console.log(this.scope.scale);
		}
		
		this.deltaX = deltaX;
		this.deltaY = deltaY;
	}
	
	applyFromScope(scope) {
		this.scale = scope.scale;
		this.deltaX = scope.deltaX;
		this.deltaY = scope.deltaY;
	}
	
	applyToScope(scope) {
		if (scope.scale !== this.scale || scope.deltaX !== this.deltaX || scope.deltaY !== this.deltaY) {
			scope.scale = this.scale;
			scope.deltaX = this.deltaX;
			scope.deltaY = this.deltaY;
			scope.canvas.globalChanges = true;
		}
	}
	
	tick() {
		// super.tick();
		this.solveDelta();
		this.applyToScope(this.scope);
	}
}
//Макрос для легкого доступа не из движка
Camera.view = Enums.camera.view;
Camera.followMode = Enums.camera.followMode;