/*
 * @Author: JoneLin
 * @Date:   2016-02-26 09:20:18
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-26 10:37:27
 */

var FireTool = Tool.extend({
  _toolType: 'fire',

  ctor: function() {
    this._super(res.fire_tool);
  }
});

FireTool.playEffect = function(pos) {
  var effect = FireEffect.getOrCreate();
  var gamescene = cc.director.getRunningScene();

  effect.x = pos.x;
  effect.y = pos.y;
  gamescene.getChildByTag(1).addChild(effect);
  effect.play();
};

FireTool.preset = function() {
  var tool = null;
  for (var i = 0, l = 5; i < l; i++) {
    tool = new FireTool();
    cc.pool.putInPool(tool);
  }
};

FireTool.getOrCreate = function() {
  var pool = cc.pool;

  // 没有就创建
  if (!pool.hasObject(FireTool)) {
    var tool = new FireTool();
    cc.pool.putInPool(tool);
  }

  var result = pool.getFromPool(FireTool);
  Game.getInstance().getTools().push(result);

  return result;
};
