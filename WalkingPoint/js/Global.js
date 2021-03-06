import UserCanvas from "./UserCanvas.js";
import Time from "./Time.js";
import Scope from "./Area/Scope.js";
import GroundMatrix from "./Area/GroundMatrix.js";
import UserActivity from "./UserActivity.js";
import Objects from "./Objects/Objects.js";
import AI from "./AI/AI.js";
import Draw from  "./Draw/DrawMain.js";
import Camera from "./Objects/Camera.js";
/**
 * Хранилище глобальных объектов
 */
export default class Global {
	constructor() {
		/**
		 * Пользовательский объект канвас
		 * @type {UserCanvas}
		 */
		this.canvas = null;
		
		/**
		 * Все, что касается обработки событий пользователя
		 * @type {Events}
		 */
		this.events = null;

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
		this.canvas = new UserCanvas();
		this.scope = new Scope(this.canvas, this.events);
		this.groundMatrix = new GroundMatrix(this.canvas, this.scope);
		this.objects = new Objects(this.groundMatrix);
		this.userActivity = new UserActivity(this.canvas, this.scope, this.groundMatrix, this.objects);
		this.AI = new AI(this.scope, this.groundMatrix, this.canvas);
		this.draw = new Draw(this.canvas, this.scope, this.groundMatrix, this.objects.createdObjects);
	}
};