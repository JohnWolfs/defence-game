/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-14 10:45:07
 * @Last Modified by:   JoneGo
 * @Last Modified time: 2016-03-12 11:31:32
 */

/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-13 08:36:11
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-01-14 11:19:35
 */

var BigAttacker = Enemy.extend({
  _HP: 3,
  _ySpeed: 1,
  _score: 5,

  ctor: function() {
    this._super(res.enemy_003);

    this.scheduleUpdate();
  },

  // 检测HP
  checkHp: function() {
    if(this._HP <= 0) {
      
      // 执行分裂
      this.divide();
      this.destroy();
    }
    else {
      this._active = true;
      this.scheduleUpdate();
    }
  },

  // 分裂
  divide: function() {
    var gamescene = cc.director.getRunningScene();
  	var layer = gamescene.getChildByTag(1);
    for (var i = 0; i < 3; i++) {
      var childEnemy = SmallAttacker.getOrCreate();
      childEnemy.x = this.x + (-5 + Math.random() * 10);
      childEnemy.y = this.y;
      layer.addChild(childEnemy);
    }
  },

  // 对象池方法
  reuse: function() {
    this._HP = 3;
    this._active = true;

    this.attr({
      scaleX: 1,
      scaleY: 1,
      rotation: 0
    });

    this.scheduleUpdate();
    this.runAction(cc.fadeIn(0.1));
  }
});

BigAttacker.preset = function() {
  var enemy = null;
  for (var i = 0, l = 5; i < l; i++) {
    enemy = new BigAttacker();
    cc.pool.putInPool(enemy);
  }
};

BigAttacker.getOrCreate = function() {
  var pool = cc.pool;

  // 没有就创建
  if (!pool.hasObject(BigAttacker)) {
    var enemy = new BigAttacker();
    cc.pool.putInPool(enemy);
  }

  var result = pool.getFromPool(BigAttacker);
  Game.getInstance().getEnemys().push(result);

  return result;
};
