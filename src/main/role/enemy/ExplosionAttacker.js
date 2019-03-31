/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-14 10:45:48
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-26 11:48:10
 */

var ExplosionAttacker = Enemy.extend({
  _HP: 1,
  _ySpeed: 5,
  _score: 2,

  ctor: function() {
    this._super(res.enemy_005);

    this._ySpeed += Game.getInstance().getSpeedUp();
    
    this.scheduleUpdate();
  },

  // 检测HP
  checkHp: function() {
  	if(this._HP <= 0) {
  		this.explosion();
  		this.destroy();
  	}
  	else {
  		this.scheduleUpdate();
  	}
  },

  explosion: function() {

  	// 执行爆炸效果
    var effect = ExplosionEffect.getOrCreate();
    var gamescene = cc.director.getRunningScene();

    effect.x = this.x;
    effect.y = this.y;
    gamescene.getChildByTag(1).addChild(effect);
    effect.play();
  }
});

ExplosionAttacker.preset = function() {
  var enemy = null;
  for (var i = 0, l = 5; i < l; i++) {
    enemy = new ExplosionAttacker();
    cc.pool.putInPool(enemy);
  }
};

ExplosionAttacker.getOrCreate = function() {
  var pool = cc.pool;

  // 没有就创建
  if (!pool.hasObject(ExplosionAttacker)) {
    var enemy = new ExplosionAttacker();
    cc.pool.putInPool(enemy);
  }

  var result = pool.getFromPool(ExplosionAttacker);
  Game.getInstance().getEnemys().push(result);

  return result;
};
