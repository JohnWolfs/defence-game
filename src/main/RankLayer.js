/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-02-22 19:07:52
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-29 11:45:16
 */

var RankLayer = cc.Layer.extend({
  ctor: function() {
    this._super();
    this.init();
  },

  init: function() {
    var rankData;

    if(!cc.sys.localStorage.getItem('rank')) {
      rankData = [{name:'', maxcombo:'', score:''}];
    }
    else {
      rankData = JSON.parse(cc.sys.localStorage.getItem('rank'));
    }
  	
  	this.bg = new cc.Sprite(res.score_bg);

  	this.bg.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));

  	this.addChild(this.bg);
  	this.addButtion();
  	this.initEventListener();
  	this.createScrollView(this.bg, rankData);
  },

  addButtion: function() {
  	var _this = this;
  	var back = new cc.Sprite(res.back_btn);

  	back.setPosition(this.bg.getContentSize().width/2, 50);
  	this.bg.addChild(back);

  	var btmlistener = Utils.EventTool.singlePointEventListener(function(touch) {

      _this.backToMenu();
    }, 'touch_end');

    cc.eventManager.addListener(btmlistener, back);
  },

  backToMenu: function() {
  	this.removeAllChildren(true);
		this.removeFromParent();
	},

  createScrollView: function(container, data) {
  	this.layer = cc.Layer.create();
  	this.view = new cc.ScrollView(cc.size(333,350), this.layer);

    this.view.setContentSize(cc.size(390,(data.length + 1)*62));
    this.view.setPosition(cc.p(30,100));
    this.view.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
    this.view.setVisible(true);
    this.view.setBounceable(true);
    this.view.setContentOffset(cc.p(0,350-(data.length + 1)*62) , false);

    this.loadData(this.layer, data);
    container.addChild(this.view);
  },

  loadData: function(layer, data) {
  	var bg, size, text, textobj;

  	for(var i = -1; i < data.length; i++) {

  		bg = new cc.Sprite(res.record_bg);
  		size = layer.getContentSize();

  		if(i === -1) {
  			text = '玩家  最大连击 总得分';
  			textobj = cc.LabelTTF.create(text, '幼圆', 28);
  			textobj.setAnchorPoint(cc.p(0, 0));
				textobj.setPosition(cc.p(20, 16));
				textobj.attr({
					color: cc.color(60,60,60)
				});

				bg.addChild(textobj);
  		}
  		else {
  			var name  = data[i].name;
	  		var maxcombo = data[i].maxcombo + '';
	  		var score = data[i].score + '';

  			if(name.length > 8) {name = name.slice(0, 8) + '..';}
  			var textobj1 = cc.LabelTTF.create(name, '幼圆', 22);
  			var textobj2 = cc.LabelTTF.create(maxcombo, '幼圆', 28);
  			var textobj3 = cc.LabelTTF.create(score, '幼圆', 28);

  			textobj1.setAnchorPoint(cc.p(0, 0));
  			textobj2.setAnchorPoint(cc.p(0, 0));
  			textobj3.setAnchorPoint(cc.p(0, 0));
  			textobj1.setPosition(cc.p(20, 20));
  			textobj2.setPosition(cc.p(128, 16));
  			textobj3.setPosition(cc.p(230, 16));
  			textobj1.setFontFillColor(cc.color(60,60,60));
  			textobj2.setFontFillColor(cc.color(60,60,60));
  			textobj3.setFontFillColor(cc.color(60,60,60));

  			bg.addChild(textobj1);
  			bg.addChild(textobj2);
  			bg.addChild(textobj3);
  		}

  		bg.setAnchorPoint(cc.p(0,1));

  		bg.setPosition(cc.p(0, size.height - (i+1) * 60));
  		
  		layer.addChild(bg);
  	}
  },

  initEventListener: function() {
		var listener = Utils.EventTool.singlePointEventListener(function(touch) {

      
    }, 'touch_start');

    cc.eventManager.addListener(listener, this);
	}
});
