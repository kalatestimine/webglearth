/*
 * Copyright (C) 2011 Klokan Technologies GmbH (info@klokantech.com)
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU GPL for more details.
 *
 * USE OF THIS CODE OR ANY PART OF IT IN A NONFREE SOFTWARE IS NOT ALLOWED
 * WITHOUT PRIOR WRITTEN PERMISSION FROM KLOKAN TECHNOLOGIES GMBH.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 */

/**
 * @fileoverview RenderShape selection.
 *
 * @author petr.sloup@klokantech.com (Petr Sloup)
 */

goog.provide('weapp.ui.RenderShapeSelector');

goog.require('goog.Disposable');
goog.require('goog.events');
goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Select');

goog.require('we.scene.Scene');



/**
 * Creates new drop-down for selecting tile provider.
 * @param {!we.scene.Scene} scene Scene.
 * @param {!Element} element Element to append this selector to.
 * @constructor
 * @extends {goog.Disposable}
 */
weapp.ui.RenderShapeSelector = function(scene, element) {
  /**
   * @type {!we.scene.Scene}
   * @private
   */
  this.scene_ = scene;

  /**
   * @type {!goog.ui.Select}
   * @private
   */
  this.select_ = new goog.ui.Select('---');

  /**
   * @type {?number}
   * @private
   */
  this.listenKey_ = goog.events.listen(this.select_,
      goog.ui.Component.EventType.ACTION,
      function(e) {
        scene.changeRenderShape(e.target.getValue());
      });

  this.select_.render(element);
};
goog.inherits(weapp.ui.RenderShapeSelector, goog.Disposable);


/**
 * Adds RenderShape at the end of item list.
 * @param {string} name Name to be displayed.
 * @param {!we.scene.rendershapes.RenderShape} rendershape
 *                                                      RenderShape to be added.
 * @param {number=} opt_select Change current selection to this item.
 */
weapp.ui.RenderShapeSelector.prototype.addRenderShape =
    function(name, rendershape, opt_select) {
  var item = new goog.ui.MenuItem(name, rendershape);
  this.select_.addItem(item);
  if (opt_select || (this.select_.getItemCount() == 1)) {
    this.select_.setSelectedItem(item);
    this.scene_.changeRenderShape(rendershape);
  }
};


/** @inheritDoc */
weapp.ui.RenderShapeSelector.prototype.disposeInternal = function() {
  //goog.base(this, 'disposeInternal');
  goog.events.unlistenByKey(this.listenKey_);
  this.select_.dispose();
};