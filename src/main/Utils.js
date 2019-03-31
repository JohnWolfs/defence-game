/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-11 21:08:57
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-26 12:41:32
 */

var Utils = {

  // 事件工具
  EventTool: {
    singlePointEventListener: function(func, mode) {
      return cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function(touch, event) {
          var target = event.getCurrentTarget();

          // 获取当前触摸点相对于按钮所在的坐标
          var locationInNode = target.convertToNodeSpace(touch.getLocation());
          var s = target.getContentSize();
          var rect = cc.rect(0, 0, s.width, s.height);

          if (cc.rectContainsPoint(rect, locationInNode)) {
            if (mode === 'touch_began') {
              func(touch.getLocation());
            }
            return true;
          }
          return false;
        },
        onTouchEnded: function(touch, event) {
          if (mode === 'touch_end') {
            func(touch.getLocation());
          }
        }
      });
    }
  },

  // 文字输出工具
  TextTool: {
    centerText: function(text, layer, color, fontsize) {
      var size = cc.winSize;
      var textSprite = cc.LabelTTF.create(text, '幼圆', fontsize);
      var action1 = cc.fadeIn(0.2);
      var actionf1 = cc.scaleTo(0.2, 1, 1);
      var action2 = cc.fadeOut(0.5);
      var actionf2 = cc.scaleTo(0.5, 1.5, 1.5);
      var callback = cc.callFunc(function() {
        textSprite.removeFromParent();
        textSprite = null;
      }, layer);

      textSprite.attr({
        x: size.width / 2,
        y: size.height / 2,
        scaleX: 1.5,
        scaleY: 1.5,
        opacity: 0,
        color: color
      });
      layer.addChild(textSprite, 100);
      
      textSprite.runAction(cc.sequence(action1, cc.delayTime(0.8), action2, callback));
      textSprite.runAction(cc.sequence(actionf1, cc.delayTime(0.8), actionf2));
    },

    comboText: function(text, layer, color, fontsize) {
      var winSize = cc.winSize;
      var textSprite = cc.LabelTTF.create(text, '幼圆', fontsize);
      var callback = cc.callFunc(function() {
        textSprite.removeFromParent();
        textSprite = null;
      }, layer);

      textSprite.attr({
        x: 60,
        y: 750,
        opacity: 0,
        color: color
      });

      layer.addChild(textSprite, 100);

      textSprite.runAction(cc.fadeIn(0.5));
      textSprite.runAction(cc.sequence(cc.moveBy(0.5, cc.p(0, -50)), cc.moveBy(0.1, cc.p(-60, 0)), callback));
    }
  },

  // 数学方法
  NumTool: {

    // 是否10的倍数
    isTen: function(num) {
      var r = num / 10;
      r = r.toString();
      if(r.indexOf('.') === -1) {
        return true;
      }
      return false;
    }
  },

  CollisionTool: {

    // 判定object 与 以(x,y)为原点，(rangeW,rangeH)为大小的区域 是否有碰撞
    collisionObject: function(object, x, y, rangeW, rangeH) {
      var xDis = Math.abs(object.x - x);
      var yDis = Math.abs(object.y - y);
      if (xDis <= (rangeW + object.width) / 2 &&
        yDis <= (rangeH + object.height) / 2) {
        return true;
      }
      return false;
    }
  }
};

Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === val) {
      return i;
    }
  }
  return -1;
};

Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
