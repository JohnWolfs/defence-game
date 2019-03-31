/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-14 15:57:31
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-26 11:13:01
 */

var Effect = cc.Sprite.extend({

  ctor: function(img) {
    this._super(img);
  },

  destroy: function() {
    cc.pool.putInPool(this);
    this.removeFromParent();
  }
});

Effect.preset = function() {
	ExplosionEffect.preset();
	BlackHoleEffect.preset();
	FireEffect.preset();
};