import positionToPosition from "./Functions/PositionToPosition.js";
import Cell from "../Cell.js";

/**
 * Просчитывает точки путей
 */
export default class Interpolation {
	/**
	* Прокладывает путь от точки к точке
	* @param gM {GroundMatrix}
	* @param position1: {Cell}
	* @param position2: {Cell}
    * @return {Path}
	*/
	static positionToPosition(gM, position1, position2) {
		return positionToPosition(gM, position1, position2);
	};
	
}