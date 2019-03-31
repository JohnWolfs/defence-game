/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-02-23 20:27:26
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-23 22:01:51
 */

var NameSettingLayer = cc.Layer.extend({

  ctor: function() {
  	this._super();

  	this.addBg();
  	this.addContent();
  },

  addBg: function() {
  	this.bg = new cc.Sprite(res.pause_bg);
  	this.bg.setAnchorPoint(cc.p(0.5,1));
  	this.bg.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height));

  	this.addChild(this.bg);
  	this.initEventListener();
  },

  addContent: function() {
  	var _this = this;
  	var size = this.bg.getContentSize();

  	this.textInput = cc.TextFieldTTF.create('点击文字并输入名字',cc.size(320, 30), cc.TEXT_ALIGNMENT_CENTER, '幼圆', 30);
  	this.textInput.setPosition(cc.p(size.width/2, 160));
  	this.textInput.setTextColor(cc.color(120, 120, 120));

  	this.addButtons();

  	this.bg.addChild(this.textInput);

  	// 点击文字弹出键盘
  	var listener = Utils.EventTool.singlePointEventListener(function(touch) {

      _this.textInput.attachWithIME();
    }, 'touch_end');

    cc.eventManager.addListener(listener, this.textInput);
  },

  addButtons: function() {
  	var _this = this;
  	var size = this.bg.getContentSize();
		var okBtn = new cc.Sprite(res.ok_btn);
		var cancelBtn = new cc.Sprite(res.cancel_btn);

		okBtn.setPosition(cc.p(size.width/2 - 70, 50));
		cancelBtn.setPosition(cc.p(size.width/2 + 70, 50));

		this.bg.addChild(okBtn);
		this.bg.addChild(cancelBtn);

		var okListener = Utils.EventTool.singlePointEventListener(function(touch) {

     	_this.okAction();
    }, 'touch_end');

    var cancelListener = Utils.EventTool.singlePointEventListener(function(touch) {

     	_this.cancelAction();
    }, 'touch_end');

		cc.eventManager.addListener(okListener, okBtn);
    cc.eventManager.addListener(cancelListener, cancelBtn);
  },

  okAction: function() {
  	var name = this.textInput.getString();
 
  	if(name) {
  		Game.getInstance().setName(name);
  		cc.sys.localStorage.setItem('player', name);
  		cc.director.getRunningScene().getChildByTag(0).updateName();
  	}
  	this.textInput.detachWithIME();
  	this.removeFromParent();
  },

  cancelAction: function() {
  	this.textInput.detachWithIME();
  	this.removeFromParent();
  },

  initEventListener: function() {
		var listener = Utils.EventTool.singlePointEventListener(function(touch) {

      
    }, 'touch_start');

    cc.eventManager.addListener(listener, this);
	}
});