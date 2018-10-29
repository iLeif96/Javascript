import {Events} from "./Events.js";
import {CPoint} from "./Point.js";
import Interpolation from "./Interpolation/Interpolation.js";
import Move from "./Moving/Move.js";
import Enums from "./Enums.js";

/**
 * Класс, отвечающий за все действия пользователя (мышь, клавиатура)
 */
export default class UserActivity {
	/**
	 * @param {UserCanvas} canvas - для приема событий
	 * @param {GroundMatrix} groundMatrix - поле
	 * @param {Scope} scope - для перевода координат
	 * @param {Object} objects - объекты
	 */
	constructor(canvas, scope, groundMatrix, objects) {
		this.canvas = canvas;
		this.groundMatrix = groundMatrix;
		this.scope = scope;
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
		Events.addEvent("keydown", document.body, (ev) => {
			this.keysPress[ev.which] = true;
		});
		
		Events.addEvent("keyup", document.body, (ev) => {
			if (ev.which in this.keysPress)
				delete this.keysPress[ev.which];
		})
	}
	
	/**
	 * При клике мышкой перемещаем игрока
	 * @param player {Player}
	 */
	movePlayerOnClick(player) {
		Events.addEvent("click", this.canvas, (ev) => {
			ev.preventDefault();
			let targetPoint = new CPoint(ev.offsetX.getNormalX(), ev.offsetY.getNormalY());
			if (this.scope.view === Enums.camera.view.isometric)
				targetPoint = this.scope.pointFromIsometric(targetPoint);
			
			let targetPos = this.groundMatrix.getCell(targetPoint);
			player.moveTo(new Move(player, targetPos, this.groundMatrix));
			return false;
			//console.log(player.targetPosition);
		});
		
	}
	
	/**
	 * Осуществляет зуммирование
	 * @param camera {Camera}
	 * @param scope {Scope}
	 */
	zoomOnScroll(camera, scope) {
		Events.addEvent("wheel", this.canvas, (ev) => {
			camera.setScale(- ev.deltaY / 1000,  new CPoint(ev.offsetX, ev.offsetY));
		});
	}
	
	movePlayerOnKeys(player) {
		let move = null;
		Events.addEvent("keydown", document.body, (ev) => {
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
		let eve = Events.addEvent("mousedown", this.canvas, (ev) => {
			mousedowm = true;
			event = ev;
			//ev.preventDefault();
			//player.setTargetPosition(this.groundMatrix.getCell(new CPoint(ev.offsetX.getNormalX(), ev.offsetY.getNormalY())), true);
			
			//player.moveTo(new Move(player, targetPos, this.groundMatrix));
			//return false;
			//console.log(player.targetPosition);
		});
		
		Events.addEvent("mousemove", this.canvas, (ev) => {
			event = ev;
		})
		
		Events.addEvent("mouseup", this.canvas, (ev) => {
			//Events.removeEvent(eve, this.canvas);
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
		Events.addEvent("click", this.canvas, (ev) => {
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
		Events.addEvent("click", this.canvas, (ev) => {
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