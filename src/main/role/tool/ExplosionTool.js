/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-14 16:06:23
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-23 09:37:51
 */

var ExplosionTool = Tool.extend({
  _toolType: 'explosion',

  ctor: function() {
    this._super(res.explosion_tool);
  }
});

ExplosionTool.playEffect = function(pos) {
  var effect = ExplosionEffect.getOrCreate();
  var gamescene = cc.director.getRunningScene();

  effect.x = pos.x;
  effect.y = pos.y;
  gamescene.getChildByTag(1).addChild(effect);
  effect.play();
};

ExplosionTool.preset = function() {
  var tool = null;
  for (var i = 0, l = 5; i < l; i++) {
    tool = new ExplosionTool();
    cc.pool.putInPool(tool);
  }
};

ExplosionTool.getOrCreate = function() {
  var pool = cc.pool;

  // 没有就创建
  if (!pool.hasObject(ExplosionTool)) {
    var tool = new ExplosionTool();
    cc.pool.putInPool(tool);
  }

  var result = pool.getFromPool(ExplosionTool);
  Game.getInstance().getTools().push(result);

  return result;
};
