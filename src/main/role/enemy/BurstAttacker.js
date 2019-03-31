/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-14 10:45:30
 * @Last Modified by:   JoneGo
 * @Last Modified time: 2016-03-12 11:40:01
 */

var BurstAttacker = Enemy.extend({
  _HP: 1,
  _ySpeed: 8,
  _score: 3,

  ctor: function() {
    this._super(res.enemy_006);

    this._ySpeed += Game.getInstance().getSpeedUp();

    this.scheduleUpdate();
  },

  update: function() {
    this.burstMove();

    if (this.y < -20) {
      this.causeDamage();
      this.destroy(false);
    }
  },

  burstMove: function() {
    var winSize = cc.winSize;
    if (this.y >= winSize.height - 100) {
      this.y -= 1;
    } else {
      this.y -= this._ySpeed;
    }
  }
});

BurstAttacker.preset = function() {
  var enemy = null;
  for (var i = 0, l = 5; i < l; i++) {
    enemy = new BurstAttacker();
    cc.pool.putInPool(enemy);
  }
};

BurstAttacker.getOrCreate = function() {
  var pool = cc.pool;

  // 没有就创建
  if (!pool.hasObject(BurstAttacker)) {
    var enemy = new BurstAttacker();
    cc.pool.putInPool(enemy);
  }

  var result = pool.getFromPool(BurstAttacker);
  Game.getInstance().getEnemys().push(result);

  return result;
};
