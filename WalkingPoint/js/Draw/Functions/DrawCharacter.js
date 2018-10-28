import {square} from "./WhatWeDraw.js";

/**
 * Отрисовывает персонажа
 * @param ctx
 * @param scope
 * @param groundMatrix
 * @param obj {Character}
 */

export let drawChar = function(ctx, scope, groundMatrix, obj) {
	ctx.strokeStyle = obj.color;
	ctx.fillStyle = obj.color;
	// ctx.beginPath();
	square(obj.position.cPoint, ctx, scope);

	if (!obj.isDie()) {
		// ctx.fillRect(pos.x, pos.y, scope.scale * scope.cell, scope.scale * scope.cell);
		ctx.fill();
	}
	else {
		// ctx.strokeRect(pos.x, pos.y, scope.scale * scope.cell, scope.scale * scope.cell);
		ctx.stroke();
	}
	
	// ctx.stroke();
	
	// ctx.arc(character.getX(groundMatrix) + scope.scale * scope.cell / 2, character.getY(groundMatrix) + scope.scale * scope.cell / 2, scope.scale * scope.cell / 2, 0, 360);
	// ctx.fill();
	
	// /**
	//  * Рисуем шкалу здоровья
	//  */
	// let pos = scope.isometric ? scope.pointToDraw(scope.pointToIsometric(character.position.cPoint)) : scope.pointToDraw(character.position.cPoint);
	//
	// ctx.fillStyle = "rgb(250, 192, 192)";
	// ctx.fillRect(pos.x, pos.y, scope.scale * scope.cell, 2 * scope.scale);
	//
	//
	// let drawLengthHp = (scope.cell / character.maxHp) * character.hp;
	// ctx.fillStyle = "rgb(100, 230, 100)";
	// ctx.shadowBlur = 1;
	// ctx.shadowColor = "rgba(10,10,10,0.5)";
	// ctx.shadowBlur = 0;
	//
	// ctx.fillRect(pos.x, pos.y, scope.scale * drawLengthHp, 2 * scope.scale);
	
	
	// ctx.arc(character.getX(groundMatrix) + scope.cell/2 * scope.scale, character.getY(groundMatrix) + scope.cell/2 * scope.scale,
	// 	(character.visionRadius * scope.scale * scope.cell), 0, 360);
	// ctx.stroke();
};