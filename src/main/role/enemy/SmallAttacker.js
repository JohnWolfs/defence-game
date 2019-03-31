/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-14 10:45:19
 * @Last Modified by:   JoneGo
 * @Last Modified time: 2016-03-10 18:10:08
 */

var SmallAttacker = Enemy.extend({
  _HP: 1,
  _ySpeed: 3,
  _xSpeed: 0,

  ctor: function() {
    this._super(res.enemy_004);

    this._ySpeed = this._ySpeed + parseInt(Math.random() * 1 * 10)/10 + Game.getInstance().getSpeedUp();
    this._xSpeed = (parseInt(Math.random() * 5) + 2) * (Math.random() < 0.5? 1 : (-1));

    this.scheduleUpdate();
  },

  update: function() {
    this.diagonalMove();

    if (this.y < -20) {
      this.causeDamage();
      this.destroy(false);
    }
  },

  diagonalMove: function() {
    var winSize = cc.winSize;

    this.y -= this._ySpeed;
    this.x += this._xSpeed;

    if (this.x >= winSize.width && this._xSpeed > 0) {
      this._xSpeed *= (-1);
    } else if (this.x <= 0 && this._xSpeed < 0) {
      this._xSpeed *= (-1);
    }
  }
});

SmallAttacker.preset = function() {
  var enemy = null;
  for (var i = 0, l = 5; i < l; i++) {
    enemy = new SmallAttacker();
    cc.pool.putInPool(enemy);
  }
};

SmallAttacker.getOrCreate = function() {
  var pool = cc.pool;

  // 没有就创建
  if (!pool.hasObject(SmallAttacker)) {
    var enemy = new SmallAttacker();
    cc.pool.putInPool(enemy);
  }

  var result = pool.getFromPool(SmallAttacker);
  Game.getInstance().getEnemys().push(result);

  return result;
};
