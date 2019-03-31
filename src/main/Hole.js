/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-11 21:26:46
 * @Last Modified by:   JoneGo
 * @Last Modified time: 2016-03-12 09:12:37
 */

var Hole = cc.Sprite.extend({
  _radius: 40,

  ctor: function() {
    this._super(res.hole_effect);
  },

  collision: function() {
    var game = Game.getInstance();
    var hitEnemy = this.collisionEnemy();
    var hitTool = this.collisionTool();

    // 击中连击
    if (hitEnemy || hitTool) {
      game.comboUp();
    } else {
      game.comboStop();
    }
  },

  collisionEnemy: function() {
    var enemy = null,
      hit = false;
    var enemys = Game.getInstance().getEnemys();

    // 遍历敌人
    for (var i = 0; i < enemys.length; i++) {
      enemy = enemys[i];
      if (Utils.CollisionTool.collisionObject(enemy, this.x, this.y, this._radius * 2, this._radius * 2)) {
        if (enemy.getHP() > 0) { hit = true; }
        if (enemy.isActive()) { enemy.hurt(); } 
      }
    }

    if (hit === true) {
      return true; } else {
      return false; }
  },

  collisionTool: function() {
    var tool = null,
      hit = false;
    var tools = Game.getInstance().getTools();

    // 遍历道具
    for (var j = 0; j < tools.length; j++) {
      tool = tools[j];
      if (Utils.CollisionTool.collisionObject(tool, this.x, this.y, this._radius * 2, this._radius * 2) &&
        tool.isActive()) {
        tool.collect();
        hit = true;
      }
    }

    if (hit === true) {
      return true; } else {
      return false; }
  },

  toDestroy: function() {
    var _this = this;
    var seq = cc.sequence(
      cc.fadeOut(0.5),
      cc.callFunc(function() {
        _this.destroy();
      })
    );
    this.runAction(seq);
  },

  destroy: function() {
    cc.pool.putInPool(this);
    this.removeFromParent();
  },

  // 对象池方法
  unuse: function() {
    // this.active = false;
    // this.visible = false;
    this.opacity = 255;
  },
  reuse: function() {

  }
});

Hole.preset = function() {
  var hole = null;
  for (var i = 0, l = 10; i < l; i++) {
    hole = new Hole();
    cc.pool.putInPool(hole);
  }
};

Hole.getOrCreate = function() {
  var pool = cc.pool;
  if (!pool.hasObject(Hole)) {
    var hole = new Hole();
    cc.pool.putInPool(hole);
  }
  return pool.getFromPool(Hole);
};
