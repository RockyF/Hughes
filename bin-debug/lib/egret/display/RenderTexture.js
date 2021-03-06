/**
* Copyright (c) 2014,Egret-Labs.org
* All rights reserved.
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of the Egret-Labs.org nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../context/renderer/HTML5CanvasRenderer.ts"/>
/// <reference path="../context/renderer/RenderFilter.ts"/>
/// <reference path="DisplayObject.ts"/>
/// <reference path="DisplayObjectContainer.ts"/>
/// <reference path="Texture.ts"/>
/// <reference path="../geom/Rectangle.ts"/>
var egret;
(function (egret) {
    var RenderTexture = (function (_super) {
        __extends(RenderTexture, _super);
        function RenderTexture() {
            _super.call(this);
            this.cacheCanvas = document.createElement("canvas");
        }
        RenderTexture.prototype.drawToTexture = function (displayObject) {
            var cacheCanvas = this.cacheCanvas;
            var bounds = displayObject.getBounds(egret.Rectangle.identity);
            cacheCanvas.width = bounds.width;
            cacheCanvas.height = bounds.height;

            displayObject.worldTransform.identity();
            displayObject.worldAlpha = 1;
            if (displayObject instanceof egret.DisplayObjectContainer) {
                this._offsetX = bounds.x;
                this._offsetY = bounds.y;
                displayObject.worldTransform.append(1, 0, 0, 1, -bounds.x, -bounds.y);
                var list = displayObject._children;
                for (var i = 0, length = list.length; i < length; i++) {
                    var child = list[i];
                    child._updateTransform();
                }
            }

            var renderContext = new egret.HTML5CanvasRenderer(cacheCanvas);
            var renderFilter = egret.RenderFilter.getInstance();
            var drawAreaList = renderFilter._drawAreaList.concat();
            renderFilter._drawAreaList.length = 0;
            displayObject._render(renderContext);
            renderFilter._drawAreaList = drawAreaList;
            this._bitmapData = this.cacheCanvas;
            this._textureWidth = this.cacheCanvas.width;
            this._textureHeight = this.cacheCanvas.height;
            //测试代码
            //            renderContext.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
            //            renderContext.strokeRect(0, 0,cacheCanvas.width,cacheCanvas.height,"#ff0000");
            //            document.documentElement.appendChild(cacheCanvas);
        };
        return RenderTexture;
    })(egret.Texture);
    egret.RenderTexture = RenderTexture;
})(egret || (egret = {}));
