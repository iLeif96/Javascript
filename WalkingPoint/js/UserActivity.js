import {Events} from "./Events.js";
import {CPoint} from "./Point.js";

/**
 * Класс, отвечающий за все действия пользователя (мышь, клавиатура)
 */
export default class UserActivity {
	/**
	 * @param {UserCanvas} canvas - для приема событий
	 * @param {GroundMatrix} groundMatrix - поле
	 * @param {Scope} scope - для перевода координат
	 * @param {Events} events - события
	 */
	constructor(canvas, scope, groundMatrix, events) {
		this.canvas = canvas;
		this.groundMatrix = groundMatrix;
		this.events = events;
	}
	
	/**
	 * При клике мышкой перемещаем игрока
	 * @param player {Player}
	 */
	movePlayerOnClick(player) {
		this.events.addEvent("click", this.canvas, (ev) => {
			player.setTargetPosition(this.groundMatrix.getCell(new CPoint(ev.offsetX.getNormalX(), ev.offsetY.getNormalY())));
			//console.log(player.targetPosition);
		});
	}
	
}