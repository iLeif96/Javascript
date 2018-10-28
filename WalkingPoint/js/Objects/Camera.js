import SimpleObject from "./SimpleObject.js";

export default class Camera extends SimpleObject {
	/**
	 * Создает объект камеры. Чтобы камера начала работать, нужно запустить её функцией activate;
	 * @param position {CPoint}
	 * @param scope {Scope}
	 * @param parameters
	 */
	constructor(position, scope, parameters = {
		target: null,
		followMode: Camera.followMode.simpleFollow,
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
	
	}
}

Camera.view = { cartesian: 0, isometric: 1 };
Camera.followMode = {noFollow: 0, simpleFollow: 1 };