/*! (C) Andrea Giammarchi - Mit Style License */
define(function(e){function s(e,t){var s=new XMLHttpRequest,a,l;s.open("get",e,!0),s.onreadystatechange=function(){s.readyState==4&&(l=s.responseXML,l.firstChild||(l=document.createElement("div"),l.innerHTML=s.responseText),n=o(l,"font-face","units-per-em"),r=o(l,"font-face","ascent"),i=o(l,"font-face","descent"),Array.prototype.forEach.call(l.getElementsByTagName("glyph"),f,a={}),(t||u)(a))},s.send(null)}function o(e,t,n){return parseFloat(e.getElementsByTagName(t)[0].getAttribute(n))}function u(e){Array.prototype.forEach.call(document.querySelectorAll(".fa"),function(t,n){var r=t.offsetHeight,i=getComputedStyle(t,":before"),s=i.getPropertyValue("content"),o=e[s.length!==1?s.charAt(1):s].size(r,i.getPropertyValue("color"));t.parentNode.replaceChild(o,t)})}function a(r,s,o){var u=0,a=0,f=r.length,l=s/n*(typeof display=="object"?display.ratio:1.5),c,h,p,d,v,m,g,y;e.width=e.height=Math.round(l*n),t.translate(0,e.height),t.scale(1,-1),t.fillStyle=o||"rgb(0,0,0)",t.globalCompositeOperation="xor";while(u<f){y=r[u++],g=1;switch(y.type){case"T":g=0;case"t":t.quadraticCurveTo(l*(v=2*p-(v||p)),l*(m=2*d-(m||d)),l*(p=p*g+y.arguments[0]),l*(d=d*g+y.arguments[1]));break;case"Q":g=0;case"q":t.quadraticCurveTo(l*(v=p*g+y.arguments[0]),l*(m=d*g+y.arguments[1]),l*(p=p*g+y.arguments[2]),l*(d=d*g+y.arguments[3]));break;case"L":g=0;case"l":t.lineTo(l*(p=p*g+y.arguments[0]),l*(d=d*g+y.arguments[1]));break;case"H":g=0;case"h":t.lineTo(l*(p=p*g+y.arguments[0]),l*d);break;case"V":g=0;case"v":t.lineTo(l*p,l*(d=d*g+y.arguments[0]));break;case"z":case"Z":t.lineTo(l*c,l*h),t.closePath(),t.fill();break;case"M":g=0,t.moveTo(l*(p=c=y.arguments[0]),l*(d=h=y.arguments[1]-i)),t.beginPath(),a=2;while(a<y.arguments.length)t.lineTo(l*(p=y.arguments[a]),l*(d=y.arguments[a+1])),a+=2;break;default:throw"unknown "+y.type}}}function f(e,t){var n=e.getAttribute("d");n&&(this[e.getAttribute("unicode")]={size:h,path:n})}function l(e){var t=0,n=[],r;e=e.replace(l.re||(l.re=/\s*([achlmqstvzACHLMQSTVZ])\s*/g),"$1");while(t<e.length)n.push(r={}),t=c(r,e,t);return n}function c(e,t,n){var r=n,i=!1;switch(e.type=t[n]){case"z":case"Z":return n+1}e.arguments=[];while(r++<t.length)switch(t[r]){case"A":case"a":case"C":case"c":case"H":case"h":case"L":case"l":case"M":case"m":case"Q":case"q":case"S":case"s":case"T":case"t":case"V":case"v":case"Z":case"z":i=!0;case" ":e.arguments.push(parseFloat(t.substring(n+1,r))),n=r;if(i)return n}}function h(r,i){var s=new Image;return a(this._actions||(this._actions=l(this.path)),r,i),s.src=e.toDataURL(),s.style.cssText="width:"+r+"px;"+"height:"+r+"px;",t.clearRect(0,0,n,n),s}var t=e.getContext("2d"),n,r,i;return s}(document.createElement("canvas")));