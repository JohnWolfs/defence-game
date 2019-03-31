/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-28 20:53:17
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-24 12:59:06
 */

var BlackHoleEffect = Effect.extend({
  _effectRange: 150,

  ctor: function() {
    this._super(res.blackhole);

    this.runAction(cc.fadeIn(0.1));
    this.attr({
      scaleX: 0.1,
      scaleY: 0.1,
      rotation: 0
    });
  },

  play: function() {
    var _this = this;

    // 执行动作
    this.runAction(cc.rotateTo(4, 3080));
    this.runAction(cc.sequence(cc.scaleTo(0.2, 1, 1),
      cc.callFunc(function() {

        // 开始作用
        _this.scheduleUpdate();
      }, _this),
      cc.delayTime(2), cc.scaleTo(0.2, 0.1, 0.1),
      cc.callFunc(function() {

        // 停止作用 销毁
        _this.unscheduleAllCallbacks();
        _this.destroy();
      }, _this)
    ));
  },

  update: function() {
    this.collision();
  },

  collision: function() {

    this.collisionEnemy();
    this.collisionTool();
  },

  collisionEnemy: function() {
    var enemy = null;
    var hit = false;
    var enemys = Game.getInstance().getEnemys();

    // 遍历敌人
    for (var i = 0; i < enemys.length; i++) {
      enemy = enemys[i];

      if (Utils.CollisionTool.collisionObject(enemy, this.x, this.y, this._effectRange, this._effectRange) &&
        enemy.isActive() &&
        !enemy.isBoss()) {
        enemy.rotateAction(this.getPosition());
        hit = true;
      }
    }

    // 连击+1
    if(hit === true) {
      Game.getInstance().comboUp();
    }
  },

  collisionTool: function() {
    var tool = null;
    var hit = false;
    var tools = Game.getInstance().getTools();

    // 遍历道具
    for (var i = 0; i < tools.length; i++) {
      tool = tools[i];

      if (Utils.CollisionTool.collisionObject(tool, this.x, this.y, this._effectRange, this._effectRange) &&
        tool.isActive()) {
        tool.rotateAction(this.getPosition());
        hit = true;
      }
    }
  },

  // 对象池方法
  unuse: function() {
    this.stopAllActions();
  },
  reuse: function() {
    this.runAction(cc.fadeIn(0.1));
    this.attr({
      scaleX: 0.1,
      scaleY: 0.1,
      rotation: 0
    });
  }
});

BlackHoleEffect.preset = function() {
  var effect = null;
  for (var i = 0, l = 5; i < l; i++) {
    effect = new BlackHoleEffect();
    cc.pool.putInPool(effect);
  }
};

BlackHoleEffect.getOrCreate = function() {
  var pool = cc.pool;

  // 没有就创建
  if (!pool.hasObject(BlackHoleEffect)) {
    var effect = new BlackHoleEffect();
    cc.pool.putInPool(effect);
  }

  return pool.getFromPool(BlackHoleEffect);
};
