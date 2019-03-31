/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-14 15:04:33
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-24 10:10:30
 */

var ExplosionEffect = Effect.extend({
  _effectRange: 200,

  ctor: function() {
    this._super(res.explosion);

    this.runAction(cc.fadeIn(0.1));
    this.attr({
      scaleX: 0.1,
      scaleY: 0.1
    });
  },

  play: function() {
    var _this = this;
    this.runAction(
      cc.sequence(cc.scaleTo(0.2, 1, 1),
        cc.callFunc(function() {
          _this.collision();
        }, _this),
        cc.fadeOut(0.6),
        cc.callFunc(function() {
          _this.destroy();
        }, _this)
      ));
  },

  collision: function() {
  	var enemy = null;
    var hit = false;
    var enemys = Game.getInstance().getEnemys();
    
    // 遍历敌人
    for (var i = 0; i < enemys.length; i++) {
      enemy = enemys[i];
      if (Utils.CollisionTool.collisionObject(enemy, this.x, this.y, this._effectRange, this._effectRange) &&
        enemy.isActive()) {
        enemy.hurt(3);
        hit = true;
      }
    }

    // 连击+1
    if(hit === true) {
      Game.getInstance().comboUp();
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
      scaleY: 0.1
    });
  }
});

ExplosionEffect.preset = function() {
  var effect = null;
  for (var i = 0, l = 5; i < l; i++) {
    effect = new ExplosionEffect();
    cc.pool.putInPool(effect);
  }
};

ExplosionEffect.getOrCreate = function() {
  var pool = cc.pool;

  // 没有就创建
  if (!pool.hasObject(ExplosionEffect)) {
    var effect = new ExplosionEffect();
    cc.pool.putInPool(effect);
  }

  return pool.getFromPool(ExplosionEffect);
};
