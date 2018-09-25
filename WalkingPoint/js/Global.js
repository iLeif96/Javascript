import Scope from "./Area/Scope.js";
import GroundMatrix from "./Area/GroundMatrix.js";
import Draw from  "./Draw/DrawMain.js";
import Objects from "./Objects/Objects.js";

/**
 * Хранилище глобальных объектов
 */
export default class Global {
	constructor() {
		/**
		 * Канвас
		 * @type {HTMLElement}
		 */
		this.canvas = null;
		/**
		 * Контекст канваса
		 * @type {CanvasRenderingContext2D}
		 */
		this.ctx = null;
		/**
		 * Задает пространство в координатах
		 * @type {Scope}
		 */
		this.scope = null;
		/**
		 * Задает пространство в матрице
		 * @type {GroundMatrix}
		 */
		this.groundMatrix = null;
		/**
		 * Объекты на поле
		 * @type {Objects}
		 */
		this.objects = null;
		/**
		 * Все, что касается отрисовки
		 * @type {Draw}
		 */
		this.draw = null;
		
		this.initialisation();
	}
	
	/**
	 * Производит инициализацию глобальных объектов
	 */
	initialisation() {
		this.canvas = document.getElementById("canv");
		this.canvas.width = document.body.offsetWidth;
		this.canvas.height = document.body.offsetHeight;
		this.ctx = this.canvas.getContext("2d");
		
		this.scope = new Scope(this.canvas);
		this.groundMatrix = new GroundMatrix(this.canvas, this.scope);
		this.objects = new Objects();
		this.draw = new Draw(this.ctx, this.scope, this.groundMatrix, this.objects.createdObjects);
	}
};