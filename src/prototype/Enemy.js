/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-13 08:32:05
 * @Last Modified by:   JoneGo
 * @Last Modified time: 2016-03-12 11:39:28
 */

var Enemy = Role.extend({
	_HP: 1,
	_ySpeed: 1,
  _score: 1,
  _type: 'enemy',

  ctor: function(img) {
    this._super(img);
  },

  update: function() {
    this.y -= (this._ySpeed);

    if (this.y < -20) {

      // 对玩家造成伤害，然后销毁
    	this.causeDamage();
      this.destroy(false);
    }
  },

  getHP: function() {
    return this._HP;
  },

  speedUp: function(num) {
    this._ySpeed += num;
  },

  speedDown: function(num) {
    this._ySpeed -= num;
  },

  hurt: function(damage) {
    if(damage) {
      this._HP -= damage;
    }
    else {
      this._HP -= 1;
    }

    // 执行动作
    this.hurtAction();
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
    this.unscheduleAllCallbacks();
    this.stopAllActions();

    this.runAction(seq);
  },

  // 对玩家产生伤害
  causeDamage: function(num) {

    // 执行震动效果
    var gamescene = cc.director.getRunningScene();
  	gamescene.shake(num);
  },

  // 判断是否boss
  isBoss: function() {
    if(this._type === 'boss') {
      return true;
    }
    return false;
  },

  // 检测HP
  checkHp: function() {
  	if(this._HP <= 0) {
  		this.destroy();
  	}
  	else {
      this._active = true;
  		this.scheduleUpdate();
  	}
  },

  destroy: function(getScore) {
    cc.pool.putInPool(this);
    this.removeFromParent();
    
    // 管理敌人数组
    Game.getInstance().getEnemys().remove(this);

    if(getScore !== false) {
      Game.getInstance().addScore(this._score);
    }
  },
  
  // 对象池方法
  unuse: function() {
    this.stopAllActions();
    this.unscheduleAllCallbacks();
  },
  reuse: function() {
    this._HP = 1;
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

Enemy.preset = function() {
  NormalAttacker.preset();
  QuickAttacker.preset();
  BigAttacker.preset();
  SmallAttacker.preset();
  BurstAttacker.preset();
  ExplosionAttacker.preset();
};
