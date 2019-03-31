/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-13 08:36:11
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-26 12:20:42
 */

var NormalAttacker = Enemy.extend({
	_HP: 1,
	_ySpeed: 2,

	ctor: function() {
		this._super(res.enemy_001);

		this._ySpeed = this._ySpeed + parseInt(Math.random() * 1 * 10)/10 + Game.getInstance().getSpeedUp();

		this.scheduleUpdate();
	}
});

NormalAttacker.preset = function() {
	var enemy = null;
	for(var i = 0, l = 5; i < l; i++){
		enemy = new NormalAttacker();
		cc.pool.putInPool(enemy);
	}
};

NormalAttacker.getOrCreate = function() {
	var pool = cc.pool;

	// 没有就创建
	if(!pool.hasObject(NormalAttacker)) {
		var enemy = new NormalAttacker();
		cc.pool.putInPool(enemy);
	}

	var result = pool.getFromPool(NormalAttacker);
	Game.getInstance().getEnemys().push(result);

	return result;
};