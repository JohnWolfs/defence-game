/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-11 21:24:43
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-24 11:13:28
 */

var Role = cc.Sprite.extend({
	_active: true,
  _type: 'role',

  ctor: function(img) {
  	this._super(img);
  },

  isActive: function() {
    return this._active;
  },

  rotateAction: function(pos) {
  	var _this = this;

    // 停止一切活动再执行动作
    this.unscheduleAllCallbacks();
    this.stopAllActions();

    this._active = false;
    this.runAction(cc.sequence(cc.moveTo(0.5, pos), cc.callFunc(function() {
    	_this.destroy();
    })));
    this.runAction(cc.scaleTo(0.5, 0.2, 0.2));
    this.runAction(cc.rotateTo(0.5, 720));
    this.runAction(cc.fadeOut(0.5));
  }
});
