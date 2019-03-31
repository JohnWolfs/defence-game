/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-14 10:44:54
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-26 12:35:28
 */

var QuickAttacker = Enemy.extend({
  _HP: 1,
  _ySpeed: 3,
  _xSpeed: 0,
  _score: 2,

  ctor: function() {
    this._super(res.enemy_002);

    this._ySpeed = this._ySpeed + parseInt(Math.random() * 1 * 10)/10 + Game.getInstance().getSpeedUp();
    this._xSpeed = (parseInt(Math.random() * 5) + 3) * (Math.random() < 0.5? 1 : (-1));

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

QuickAttacker.preset = function() {
  var enemy = null;
  for (var i = 0, l = 5; i < l; i++) {
    enemy = new QuickAttacker();
    cc.pool.putInPool(enemy);
  }
};

QuickAttacker.getOrCreate = function() {
  var pool = cc.pool;

  // 没有就创建
  if (!pool.hasObject(QuickAttacker)) {
    var enemy = new QuickAttacker();
    cc.pool.putInPool(enemy);
  }

  var result = pool.getFromPool(QuickAttacker);
  Game.getInstance().getEnemys().push(result);

  return result;
};
