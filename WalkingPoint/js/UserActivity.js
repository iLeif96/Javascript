import {Events} from "./Events.js";
import {CPoint} from "./Point.js";
import Interpolation from "./Interpolation/Interpolation.js";
import Move from "./Moving/Move.js";

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
		
		/**
		 * Клавиши, нажатые в данный момент
		 * @type {number}
		 */
		this.keysPress = {};
		
		/**
		 * Какие-либо действия и соответсвующие им клавиши
		 * @type {number}
		 */
		this.actions = {
			shoot: 17,
		};
		
		this.setKeysPress();
	}
	
	/**
	 * Записывает все нажатые в текущий момент клавиши
	 */
	setKeysPress() {
		this.events.addEvent("keydown", document.body, (ev) => {
			this.keysPress[ev.which] = true;
		});
		
		this.events.addEvent("keyup", document.body, (ev) => {
			if (ev.which in this.keysPress)
				delete this.keysPress[ev.which];
		})
	}
	
	/**
	 * При клике мышкой перемещаем игрока
	 * @param player {Player}
	 */
	movePlayerOnClick(player) {
		this.events.addEvent("click", this.canvas, (ev) => {
			//ev.preventDefault();
			let targetPos = this.groundMatrix.getCell(new CPoint(ev.offsetX.getNormalX(), ev.offsetY.getNormalY()));
				//player.setTargetPosition(this.groundMatrix.getCell(new CPoint(ev.offsetX.getNormalX(), ev.offsetY.getNormalY())), true);
				
			player.moveTo(new Move(player, targetPos, this.groundMatrix));
			//return false;
			//console.log(player.targetPosition);
		});
	}
	
	/**
	 * При двойном клике мышкой стреляем в цель
	 * @param player {Player}
	 */
	shootPlayerOnDblClick(player) {
		this.events.addEvent("dblclick", this.canvas, (ev) => {
			ev.preventDefault();
			player.setTargetPosition(this.groundMatrix.getCell(new CPoint(ev.offsetX.getNormalX(), ev.offsetY.getNormalY())), true);
			return false;
			//console.log(player.targetPosition);
		});
	}
	
	/**
	 * Построение поиска пути в ширину
	 * @param player {Player}
	 * @param draw {Draw}
	 */
	moveTest(player, draw) {
		this.events.addEvent("click", this.canvas, (ev) => {
			draw.clear(draw.canvas.testsCanvas);
			let fPos = this.groundMatrix.getCell(new CPoint(ev.offsetX.getNormalX(), ev.offsetY.getNormalY()));
			Interpolation.findWaySimple(player.position, fPos, this.groundMatrix, draw);
			//console.log(player.targetPosition);
		});
	}
	
	/**
	 * Тест на раскол мира
	 * @param gM {GroundMatrix}
	 * @param draw {Draw}
	 */
	gMTest(gM, draw) {
		this.events.addEvent("click", this.canvas, (ev) => {
			let x = gM[0][0].cPoint.x;
			let y = gM[0][0].cPoint.y;
			for (let cell of gM.forEach()) {
				cell.cPoint.x += cell.cPoint.x * 0.1;
				cell.cPoint.y += cell.cPoint.y * 0.1;
			}
			draw.canvas.globalChanges = true;
		});
	}
	
	
}