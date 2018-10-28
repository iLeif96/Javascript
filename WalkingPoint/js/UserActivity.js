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
	 * @param {Object} objects - объекты
	 */
	constructor(canvas, scope, groundMatrix, events, objects) {
		this.canvas = canvas;
		this.groundMatrix = groundMatrix;
		this.scope = scope;
		this.events = events;
		this.objects = objects;
		
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
			up: 87,
			left: 65,
			right: 68,
			down: 83,
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
			ev.preventDefault();
			let targetPoint = new CPoint(ev.offsetX.getNormalX(), ev.offsetY.getNormalY());
			if (this.scope.isometric)
				targetPoint = this.scope.pointFromIsometric(targetPoint);
			let targetPos = this.groundMatrix.getCell(targetPoint);
			player.moveTo(new Move(player, targetPos, this.groundMatrix));
			return false;
			//console.log(player.targetPosition);
		});
		
	}
	
	movePlayerOnKeys(player) {
		let move = null;
		this.events.addEvent("keydown", document.body, (ev) => {
			let toCell = player.position.clone();
			
			toCell.mPoint.x += (this.actions.right in this.keysPress) - (this.actions.left in this.keysPress);
			toCell.mPoint.y += (this.actions.down in this.keysPress) - (this.actions.up in this.keysPress);
			if (this.groundMatrix.isInSpace(toCell.mPoint) && !toCell.mPoint.compare(player.position.mPoint)) {
				move = new Move(player, toCell, this.groundMatrix);
				player.moveTo(move);
			}
		})
	}
	/**
	 * При двойном клике мышкой стреляем в цель
	 * @param player {Player}
	 */
	shootPlayerOnClick(player) {
		let mousedowm = false;
		let event = null;
		let eve = this.events.addEvent("mousedown", this.canvas, (ev) => {
			mousedowm = true;
			event = ev;
			//ev.preventDefault();
			//player.setTargetPosition(this.groundMatrix.getCell(new CPoint(ev.offsetX.getNormalX(), ev.offsetY.getNormalY())), true);
			
			//player.moveTo(new Move(player, targetPos, this.groundMatrix));
			//return false;
			//console.log(player.targetPosition);
		});
		
		this.events.addEvent("mousemove", this.canvas, (ev) => {
			event = ev;
		})
		
		this.events.addEvent("mouseup", this.canvas, (ev) => {
			//this.events.removeEvent(eve, this.canvas);
			event = null;
			mousedowm = false;
		});
		setInterval(() =>
		{
			if (mousedowm && event !== null) {
				let targetPos = this.groundMatrix.getCell(new CPoint(event.offsetX.getNormalX(), event.offsetY.getNormalY()));
				player.doShot(targetPos, this.groundMatrix, this.objects);
			}
		}, 100);
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