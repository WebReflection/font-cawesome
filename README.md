font-cawesome
=============

Just A Canvas Remix for IE9 Mobile and Windows Phone 7


**example**
```javascript

// if you want to load this only in IE9 Mobile
if(/*@cc_on(/\bIEMobile\b/.test(navigator.userAgent)&&@_jscript_version<10)||@*/false){
  document.addEventListener(
    'DOMContentLoaded',
    function (e) {
      FontCawesome(
        // the local svg file
        'fonts/font-awesome.svg'
      );
    }
  );
}

````
Above snippet will automatically replace everything with a `fa` class with it's icon image equivalent.

In order to do specific replacements or arbitrary actions, we can specify a callback too.

```javascript

document.addEventListener(
  'DOMContentLoaded',
  function (e) {
    FontCawesome(
      'fonts/font-awesome.svg',
      function (glyphs) {
        // glyps is an object
        // with keys such "\uf098"
        // representing objects
        // with a size method
        document.body.appendChild(
          glyps['\uf098'].size(48)
          // optionally a color too
          // '#EEE', 'rgb(10,20,30)'
        );
      }
    );
  }
);

````