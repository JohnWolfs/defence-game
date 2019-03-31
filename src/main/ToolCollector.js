/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-18 18:14:48
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-26 10:37:21
 */

// 道具收集器中的道具元素
var ToolCollectorItem = cc.Sprite.extend({

  ctor: function(type, index) {

    this._type = type;
    this._index = index;

    switch (type) {
      case 'arrow':
        this._super(res.arrow_tool);
        break;
      case 'explosion':
        this._super(res.explosion_tool);
        break;
      case 'blackhole':
      	this._super(res.blackhole_tool);
      	break;
      case 'fire':
        this._super(res.fire_tool);
        break;
      default:
        this._super();
    }
  },

  destroy: function() {
    this.removeFromParent();
  }
});

// 道具收集器 道具项ID ：0 1 2
// tag 100
var ToolCollector = cc.Layer.extend({
  _select: null,

  ctor: function() {
    this._super();

    // 道具容器，数量3
    this._toolContainer = [null, null, null];

    // 高度为 100
    this.height = 100;

    this.addSelectListener();
  },

  // 把道具放进容器
  putInContainer: function(type) {
    var c = this._toolContainer;
    for (var i = 0, l = 3; i < l; i++) {
      if (c[i] === null) {
        c[i] = new ToolCollectorItem(type, i);
        c[i].x = cc.winSize.width / 6 * (i * 2 + 1);
        c[i].y = 32;
        this.addChild(c[i], 10);
        return true;
      }
    }
    return false;
  },

  removeFromContainer: function(index) {
  	this._toolContainer[index].destroy();
  	this._toolContainer[index] = null;
  },

  // 使用一个道具
  useSelectedTool: function(pos) {

    var item = this._toolContainer[this._select];

    if (item) {
      // 执行道具效果
      switch (item._type) {
        case 'arrow':
          ArrowTool.playEffect(pos);
          break;
        case 'explosion':
          ExplosionTool.playEffect(pos);
          break;
        case 'blackhole':
        	BlackHoleTool.playEffect(pos);
        	break;
        case 'fire':
          FireTool.playEffect(pos);
          break;
      }

      // 清楚数据
      this.removeFromContainer(this._select);
      this.removeSelected();
      return true;

    } else {
    	return false;
    }
  },

  // 道具选择监听
  addSelectListener: function() {

    var _this = this;
    var listener = Utils.EventTool.singlePointEventListener(function(point) {
      var width = cc.winSize.width;

      if (point.x < width / 3) {

        // 第一个道具
        _this.setSelect(0);
      } else if (point.x < width * 2 / 3) {

        // 第二个道具
        _this.setSelect(1);
      } else {

        // 第三个道具
        _this.setSelect(2);
      }
    }, 'touch_end');

    cc.eventManager.addListener(listener, this);
  },

  // 设置选择
  setSelect: function(index) {

    if (index !== this._select) {

      var item;

      if (!(item = this._toolContainer[index])) {
        return;
      }

      var selectImg = new cc.Sprite(res.selected);

      selectImg.attr({
        x: item.x,
        y: item.y
      });

      this.removeSelected();
      this._select = index;
      this.addChild(selectImg, 12, 1);
    }
    else {
      this.removeSelected();
    }
  },

  removeSelected: function() {
  	
  	if(this.getChildByTag(1)) {
			this.removeChildByTag(1);
  	}
  	this._select = null;
  }
});
