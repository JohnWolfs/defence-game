/*
 * @Author: JoneLin
 * @Date:   2016-02-26 09:22:22
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-26 12:42:15
 */

/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-14 15:04:33
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-24 10:10:30
 */

var FireEffect = Effect.extend({
  _effectRange: 200,

  ctor: function() {
    this._super('#fire_1.png');
  },

  play: function() {
    var animFrames = [];

    for(var i = 1; i <= 10; i++) {
    	var str = 'fire_' + i + '.png';
    	var frame = cc.spriteFrameCache.getSpriteFrame(str);
    	animFrames.push(frame);
    }

    var animation = new cc.Animation(animFrames, 0.02);
    var cb = cc.callFunc(function() {
    	this.stopAllActions();
    	this.unscheduleAllCallbacks();
    	this.destroy();
    }, this);

    this.scheduleUpdate();
    this.runAction(cc.sequence(cc.delayTime(3), cb));
    this.runAction(cc.repeatForever(cc.animate(animation)));
  },

  update: function() {

    this.collision();
  },

  collision: function() {
    var enemy = null;
    var hit = false;
    var enemys = Game.getInstance().getEnemys();
    var size = this.getContentSize();

    // 遍历敌人
    for (var i = 0; i < enemys.length; i++) {
      enemy = enemys[i];
      if (Utils.CollisionTool.collisionObject(enemy, this.x, this.y, size.width, size.height) &&
        enemy.isActive() &&
        !enemy.isBoss()) {
        enemy.hurt(3);
        hit = true;
      }
    }

    // 连击+1
    if (hit === true) {
      Game.getInstance().comboUp();
    }
  },

  // 对象池方法
  unuse: function() {
    this.stopAllActions();
    this._time = 0;
  },
  reuse: function() {
    
  }
});

FireEffect.preset = function() {
  var effect = null;
  for (var i = 0, l = 5; i < l; i++) {
    effect = new FireEffect();
    cc.pool.putInPool(effect);
  }
};

FireEffect.getOrCreate = function() {
  var pool = cc.pool;

  // 没有就创建
  if (!pool.hasObject(FireEffect)) {
    var effect = new FireEffect();
    cc.pool.putInPool(effect);
  }

  return pool.getFromPool(FireEffect);
};
