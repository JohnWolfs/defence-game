/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-14 16:39:41
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-23 09:41:07
 */
var Arrow = cc.Sprite.extend({
  _speed: 5,

  ctor: function(angle) {
    this._super(res.arrow);

    this._angle = angle;
    this.scheduleUpdate();
  },
  
  update: function() {
    var winSize = cc.winSize;
    this.x += this._speed * Math.cos(this._angle);
    this.y += this._speed * Math.sin(this._angle);
    if(this.collision()) {
      return;
    }
    if (this.x < 0 || this.x > winSize.width || this.y < 0 || this.y > winSize.height) {
      this.destroy();
    }
  },

  collision: function() {
    var enemy = null;
    var enemys = Game.getInstance().getEnemys();
    for (var i = 0; i < enemys.length; i++) {
      enemy = enemys[i];
      if (Utils.CollisionTool.collisionObject(enemy, this.x, this.y, this.width, this.height) &&
        enemy.isActive()) {
      	enemy.hurt();
      	this.destroy();

        // 连击+1
        Game.getInstance().comboUp();
        return true;
      }
    }
    return false;
  },

  destroy: function() {
    this.stopAllActions();
    this.unscheduleAllCallbacks();
    this.removeFromParent();
  }
});

var ArrowTool = Tool.extend({
  _toolType: 'arrow',

  ctor: function() {
    this._super(res.arrow_tool);
  }
});

ArrowTool.arrowNum = 20;
ArrowTool.playEffect = function(pos) {
  var num = ArrowTool.arrowNum;
  var arrow = null;
  var angle = parseInt(360/num) * Math.PI / 180;
  var gamescene = cc.director.getRunningScene();
  var layer = gamescene.getChildByTag(1);

  for(var i = 0; i < num; i++){
      arrow = new Arrow(angle * (i));
      arrow.attr({
          x:pos.x,
          y:pos.y
      });
      layer.addChild(arrow);
  }
};

ArrowTool.preset = function() {
  var tool = null;
  for (var i = 0, l = 5; i < l; i++) {
    tool = new ArrowTool();
    cc.pool.putInPool(tool);
  }
};

ArrowTool.getOrCreate = function() {
  var pool = cc.pool;

  // 没有就创建
  if (!pool.hasObject(ArrowTool)) {
    var tool = new ArrowTool();
    cc.pool.putInPool(tool);
  }

  var result = pool.getFromPool(ArrowTool);
  Game.getInstance().getTools().push(result);

  return result;
};

