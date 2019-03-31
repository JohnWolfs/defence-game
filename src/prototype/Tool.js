/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-13 08:32:05
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-26 11:39:11
 */

var Tool = Role.extend({
  _ySpeed: 0,
  _xSpeed: 0,
  _type: 'tool',

  ctor: function(img) {
    this._super(img);

    this._xSpeed = 6 * (Math.random() < 0.5? 1 : (-1));
    this._ySpeed = 3  + parseInt(Math.random() * 2 * 100)/100;
  },

  // 移动规则
  update: function() {

    this.diagonalMove();

    if (this.y < -50) {
      this.destroy();
    }
  },

  diagonalMove: function() {
    var winSize = cc.winSize;

    this.y -= this._ySpeed;
    this.x += this._xSpeed;

    if (this.x >= winSize.width && this._xSpeed > 0) {
      this._xSpeed *= (-1);
    } else if (this.x <= 0 && this._xSpeed < 0) {
      this._xSpeed *= (-1);
    }
  },

  // 获得道具类型
  getType: function() {
    return this._toolType;
  },

  // 收集到道具收集器中
  collect: function() {
    var gamescene = cc.director.getRunningScene();
    var collector = gamescene.getChildByTag(2).getChildByTag(100);

    // 停止运动
    this.unscheduleAllCallbacks();

    // 执行动画
    this.collectedAction();

    // 放进容器
    collector.putInContainer(this.getType());
  },

  collectedAction: function() {
    var _this = this;
    var cb = cc.callFunc(function() {
      _this.destroy();
    });

    this._active = false;

    this.runAction(cc.rotateTo(0.5, 720));
    this.runAction(cc.sequence(cc.scaleTo(0.5, 0.1, 0.1), cb));
  },

  destroy: function() {
    cc.pool.putInPool(this);
    this.removeFromParent();

    // 管理工具数组
    Game.getInstance().getTools().remove(this);
  },

  // 对象池方法
  unuse: function() {
    this.stopAllActions();
    this.unscheduleAllCallbacks();
  },
  reuse: function() {
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

Tool.preset = function() {
  ExplosionTool.preset();
  ArrowTool.preset();
  BlackHoleTool.preset();
  FireTool.preset();
};
