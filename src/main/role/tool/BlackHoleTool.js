/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-28 21:11:02
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-23 09:37:22
 */

var BlackHoleTool = Tool.extend({
  _toolType: 'blackhole',

  ctor: function() {
    this._super(res.blackhole_tool);
  }
});

BlackHoleTool.playEffect = function(pos) {
  var effect = BlackHoleEffect.getOrCreate();
  var gamescene = cc.director.getRunningScene();
  
  effect.x = pos.x;
  effect.y = pos.y;
  gamescene.getChildByTag(1).addChild(effect);
  effect.play();
};

BlackHoleTool.preset = function() {
  var tool = null;
  for (var i = 0, l = 5; i < l; i++) {
    tool = new BlackHoleTool();
    cc.pool.putInPool(tool);
  }
};

BlackHoleTool.getOrCreate = function() {
  var pool = cc.pool;

  // 没有就创建
  if (!pool.hasObject(BlackHoleTool)) {
    var tool = new BlackHoleTool();
    cc.pool.putInPool(tool);
  }

  var result = pool.getFromPool(BlackHoleTool);
  Game.getInstance().getTools().push(result);

  return result;
};
