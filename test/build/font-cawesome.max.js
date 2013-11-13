/*!
Copyright (C) 2013 by WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
var FontCawesome = function(canvas){

  /*! (C) Andrea Giammarchi - Mit Style License */

  // one canvas, one context
  // no need to create a canvas per each glyph
  var
    // this browser is death, however it's actually
    // quite cheap to still support it.
    webOS = -1 < navigator.userAgent.indexOf('webOSBrowser'),
    context = canvas.getContext('2d'),
    // recycled later on
    glyphs,
    // measurements we might fully need one day
    units, ascent, descent
  ;

  // simple way to let you decide what you need/want to do
  // does not do too much magic upfront
  // @param url should be a valid fontawesome-webfont.svg path
  //  it might contain the allow CORSS header
  //  otherwise should be local
  // @param onready optional, should be a Function
  //  that once all glyphs are ready to be used
  //  will be invoked with such argument
  //  By default this is the automagicallyFixed one
  function FontCawesome(url, onready) {
    var
      xhr = new XMLHttpRequest,
      svg
    ;
    xhr.open('get', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        svg = xhr.responseXML;
        // apparently IE9 mobile has some problem here too ... 
        if (!svg || !svg.firstChild) {
          svg = document.createElement('div');
          svg.innerHTML = xhr.responseText;
        }
        units = attributeToFloat(svg, 'font-face', 'units-per-em');
        ascent = attributeToFloat(svg, 'font-face', 'ascent');
        descent = attributeToFloat(svg, 'font-face', 'descent');
        Array.prototype.forEach.call(
          svg.getElementsByTagName('glyph'),
          initGlyph,
          glyphs = {}
        );
        (onready ? onready(glyphs) : automagicallyFixed());
      }
    };
    xhr.send(null);
  }

  // shortcut to quickly grab numeric attributes
  function attributeToFloat(svg, nodeName, attributeName) {
    return parseFloat(
      svg
        .getElementsByTagName(nodeName)[0]
        .getAttribute(attributeName)
    );
  }

  // if you wish to let this script do everything at once
  function automagicallyFixed(el){

    Array.prototype.forEach.call(
      // yep, FontAwesome 4.X compatible
      (el || document).querySelectorAll('.fa'),
      replaceElement,
      glyphs
    );

  }

  // guess what, it draws the path!
  function drawPath(actions, width, fillStyle) {
    var
      i = 0, l = 0,
      length = actions.length,
      ratio = width / units * (
        // https://github.com/WebReflection/display#display
        typeof display == 'object' ? display.ratio :
        // did you know? All WP phones have
        // a higer density than expected
        1.5
      ),
      sx, sy,
      lx, ly,
      cx, cy,
      relative,
      current
    ;
    canvas.width = canvas.height = Math.round(ratio * units);
    context.setTransform(1, 0, 0, -1, 0, canvas.height);
    context.fillStyle = fillStyle || 'rgb(0,0,0)';
    context.globalCompositeOperation = 'xor';
    while(i < length) {
      current = actions[i++];
      relative = 1;
      switch(current.type) {
        case 'T':
          relative = 0;
        case 't':
          context.quadraticCurveTo(
            ratio * (cx = 2 * lx - (cx || lx)),
            ratio * (cy = 2 * ly - (cy || ly)),
            ratio * (lx = lx * relative + current.arguments[0]),
            ratio * (ly = ly * relative + current.arguments[1])
          );
          break;
        case 'Q':
          relative = 0;
        case 'q':
          context.quadraticCurveTo(
            ratio * (cx = lx * relative + current.arguments[0]),
            ratio * (cy = ly * relative + current.arguments[1]),
            ratio * (lx = lx * relative + current.arguments[2]),
            ratio * (ly = ly * relative + current.arguments[3])
          );
          break;
        case 'L':
          relative = 0;
        case 'l':
          context.lineTo(
            ratio * (lx = lx * relative + current.arguments[0]),
            ratio * (ly = ly * relative + current.arguments[1])
          );
          break;
        case 'H':
          relative = 0;
        case 'h':
          context.lineTo(ratio * (lx = lx * relative + current.arguments[0]), ratio * (ly));
          break;
        case 'V':
          relative = 0;
        case 'v':
          context.lineTo(ratio * (lx), ratio * (ly = ly * relative + current.arguments[0]));
          break;
        case 'z':
        case 'Z':
          context.lineTo(ratio * (sx), ratio * (sy));
          context.closePath();
          context.fill();
          break;
        case 'M':
          relative = 0;
        // TODO: 'm' case if ever needed in fa ... apparently not now
          context.moveTo(
            ratio * (lx = sx = current.arguments[0]),
            ratio * (ly = sy = current.arguments[1] - descent)
          );
          context.beginPath();
          l = 2;
          while(l < current.arguments.length) {
            context.lineTo(
              ratio * (lx = current.arguments[l]),
              ratio * (ly = current.arguments[l + 1])
            );
            l += 2;
          }
          break;
        /* not needed in fa 4.X so far
        case 'S':
          relative = 0;
        case 's':
          // same thing done for T and t
          break;
        case 'C':
          relative = 0;
        case 'c':
          context.bezierCurveTo(
            ratio * (lx * relative + current.arguments[0]),
            ratio * (ly * relative + current.arguments[1]),
            ratio * (cx = lx * relative + current.arguments[2]),
            ratio * (cy = ly * relative + current.arguments[3]),
            ratio * (lx = lx * relative + current.arguments[4]),
            ratio * (ly = ly * relative + current.arguments[5])
          );
          break;
        */
        default:
          throw 'unknown ' + current.type;
      }
    }
  }

  function replaceElement(el) {
    var
      // width = el.offsetWidth, // not needed, all suqares in IE9
      height = el.offsetHeight, // more or less the font size
      cs = getComputedStyle(
        el, ':before'
      ),
      content = cs.getPropertyValue('content'),
      // which char to reproduce ?
      glyph = this[
        content.length !== 1 ?
          // IE9 Mobile here considers
          // double quotes as content "L"
          content.charAt(1) :
          content
      ].size(
        height,
        cs.getPropertyValue('color')
      )
    ;
    // needed if the font is actually rendered
    // otherwise pointless with all squares
    // glyph.style.marginRight = (width - height) + 'px';
    el.parentNode.replaceChild(glyph, el);
  }

  // per each usable/valid glyph in the font
  function initGlyph(glyph, i) {
    var d = glyph.getAttribute('d');
    if (d) {
      // assign the property
      this[glyph.getAttribute('unicode')] = {
        // the method to choose the size
        size: size,
        // the path to lazy parse once, and only if needed
        path: d
        // something probably not so useful right now
        //, units: parseFloat(glyph.getAttribute('horiz-adv-x') || 0)
        // maybe it would help to have better icon margins
        // didn't want to waste time and slow down the browser for this though
      };
    }
  }

  // given a path string, sanitizes it
  // and parse it in order to create actions
  // (what to do with the canvas to draw the icon)
  function pathToActions(str) {
    var i = 0, actions = [], current;
    str = str.replace(
      pathToActions.re ||
      (pathToActions.re =
        /\s*([achlmqstvzACHLMQSTVZ])\s*/g),
      '$1'
    );
    while(i < str.length) {
      actions.push(current = {});
      i = setAction(current, str, i);
    }
    return actions;
  }

  // parse arguments related to each action
  // and save them, returning an updated
  // cursor to keep looping over the initial path
  function setAction(action, str, i) {
    var l = i, r = !1;
    switch(action.type = str[i]) {
      case 'z':
      case 'Z':
        return i + 1;
    }
    action.arguments = [];
    while(l++ < str.length) {
      switch(str[l]) {
        case 'A':
        case 'a':
        case 'C':
        case 'c':
        case 'H':
        case 'h':
        case 'L':
        case 'l':
        case 'M':
        case 'm':
        case 'Q':
        case 'q':
        case 'S':
        case 's':
        case 'T':
        case 't':
        case 'V':
        case 'v':
        case 'Z':
        case 'z':
          r = true;
        case ' ':
          action.arguments.push(
            parseFloat(str.substring(i + 1, l))
          );
          i = l;
          if (r) return i;
      }
    }
  }

  // common method shared across all glyphs
  function size(width, fillStyle) {
    var img;
    drawPath(
      // create actions once per path
      this._actions || (
        this._actions = pathToActions(this.path)
      ),
      // while the size might be arbitrary
      // no need to cache each size too
      width,
      // the desired color, if any
      fillStyle
    );
    if (webOS) {
      img = canvas;
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
    } else {
      img = new Image;
      // export an image
      img.src = canvas.toDataURL();
      // clean the canvas
      context.clearRect(0, 0, units, units);
    }
    // force the meant size via CSS
    // (for sharper result in higher DPI)
    img.style.cssText =
      'width:' + width + 'px;' +
      'height:' + width + 'px;'
    ;
    img.className = 'fa-ke';
    // return the freshly backed font icon
    return img;
  }

  FontCawesome.fix = automagicallyFixed;

  // here we go
  return FontCawesome;

}(document.createElement('canvas'));