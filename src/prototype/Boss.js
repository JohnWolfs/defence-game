
var Boss = Enemy.extend({
  
  _type: 'boss',

  ctor: function(img) {
    this._super(img);
  },

  destroy: function(getScore) {
  	var _this = this;
    var gamescene = cc.director.getRunningScene();

    this.setVisible(false);

    // 管理敌人数组
    Game.getInstance().getEnemys().remove(this);

    if (getScore !== false) {
      Game.getInstance().addScore(this._score);
    }

    // 1s后恢复关卡进程
    this.scheduleOnce(function() {
    	_this.removeFromParent();
    	gamescene.scheduleUpdate();
      LevelManager.getInstance().goNextLevel();
    }, 2);
  },

  hurtAction: function() {

    var _this = this;
    var callback = cc.callFunc(function() {
      _this.checkHp();
    });
    var seq = cc.sequence(cc.moveBy(0.05, cc.p(4, 4)), cc.moveBy(0.05, cc.p(-8, -8)),
      cc.moveBy(0.05, cc.p(0, 8)), cc.moveBy(0.05, cc.p(8, 8)), cc.moveBy(0.05, cc.p(-4, -4)), callback);
    
    this._active = false;

    // 停止一切活动再执行动作
    this.stopAllActions();

    this.runAction(seq);
  },

  // 检测HP
  checkHp: function() {
    if(this._HP <= 0) {
      this.destroyAction();
    }
    else {
      this._active = true;
    }
  },

  destroyAction: function() {
  	var _this = this;
  	var layer = cc.director.getRunningScene().getChildByTag(1);
  	var cb = cc.callFunc(function() {
  		Utils.TextTool.centerText('消灭BOSS+'+ _this._score, layer, cc.color(234, 84, 19), 36);
  		_this.destroy();
  	});

  	this.runAction(cc.sequence(cc.fadeOut(0.5), cb));
  }
});
