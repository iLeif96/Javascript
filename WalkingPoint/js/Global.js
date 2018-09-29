import UserCanvas from "./UserCanvas.js";
import {Events} from  "./Events.js";
import Scope from "./Area/Scope.js";
import GroundMatrix from "./Area/GroundMatrix.js";
import UserActivity from "./UserActivity.js";
import Objects from "./Objects/Objects.js";
import AI from "./AI/AI.js";
import Draw from  "./Draw/DrawMain.js";
/**
 * Хранилище глобальных объектов
 */
export default class Global {
	constructor() {
		/**
		 * Все, что касается обработки событий пользователя
		 * @type {Events}
		 */
		this.events = null;
		/**
		 * Пользовательский объект канвас
		 * @type {UserCanvas}
		 */
		this.canvas = null;
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
		 * События пользователя
		 * @type {UserActivity}
		 */
		this.userActivity = null;
		/**
		 * Все, что касается искуственного интеллекта
		 * @type {AI}
		 */
		this.AI = null;
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
		this.events = new Events();
		this.canvas = new UserCanvas(this.events);
		this.scope = new Scope(this.canvas, this.events);
		this.groundMatrix = new GroundMatrix(this.canvas, this.scope);
		this.objects = new Objects();
		this.userActivity = new UserActivity(this.canvas, this.scope, this.groundMatrix, this.events);
		this.AI = new AI(this.scope, this.groundMatrix, this.canvas);
		this.draw = new Draw(this.canvas, this.scope, this.groundMatrix, this.objects.createdObjects);
	}
};