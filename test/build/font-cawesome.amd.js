/*! (C) Andrea Giammarchi - Mit Style License */
define(function(e){function u(e,t){var n=new XMLHttpRequest,u;n.open("get",e,!0),n.onreadystatechange=function(){if(n.readyState==4){u=n.responseXML;if(!u||!u.firstChild)u=document.createElement("div"),u.innerHTML=n.responseText;i=a(u,"font-face","units-per-em"),s=a(u,"font-face","ascent"),o=a(u,"font-face","descent"),Array.prototype.forEach.call(u.getElementsByTagName("glyph"),h,r={}),t?t(r):f()}},n.send(null)}function a(e,t,n){return parseFloat(e.getElementsByTagName(t)[0].getAttribute(n))}function f(e){Array.prototype.forEach.call((e||document).querySelectorAll(".fa"),c,r)}function l(t,r,s){var u=0,a=0,f=t.length,l=r/i*(typeof display=="object"?display.ratio:1.5),c,h,p,d,v,m,g,y;e.width=e.height=Math.round(l*i),n.setTransform(1,0,0,-1,0,e.height),n.fillStyle=s||"rgb(0,0,0)",n.globalCompositeOperation="xor";while(u<f){y=t[u++],g=1;switch(y.type){case"T":g=0;case"t":n.quadraticCurveTo(l*(v=2*p-(v||p)),l*(m=2*d-(m||d)),l*(p=p*g+y.arguments[0]),l*(d=d*g+y.arguments[1]));break;case"Q":g=0;case"q":n.quadraticCurveTo(l*(v=p*g+y.arguments[0]),l*(m=d*g+y.arguments[1]),l*(p=p*g+y.arguments[2]),l*(d=d*g+y.arguments[3]));break;case"L":g=0;case"l":n.lineTo(l*(p=p*g+y.arguments[0]),l*(d=d*g+y.arguments[1]));break;case"H":g=0;case"h":n.lineTo(l*(p=p*g+y.arguments[0]),l*d);break;case"V":g=0;case"v":n.lineTo(l*p,l*(d=d*g+y.arguments[0]));break;case"z":case"Z":n.lineTo(l*c,l*h),n.closePath(),n.fill();break;case"M":g=0,n.moveTo(l*(p=c=y.arguments[0]),l*(d=h=y.arguments[1]-o)),n.beginPath(),a=2;while(a<y.arguments.length)n.lineTo(l*(p=y.arguments[a]),l*(d=y.arguments[a+1])),a+=2;break;default:throw"unknown "+y.type}}}function c(e){var t=e.offsetHeight,n=getComputedStyle(e,":before"),r=n.getPropertyValue("content"),i=this[r.length!==1?r.charAt(1):r].size(t,n.getPropertyValue("color"));e.parentNode.replaceChild(i,e)}function h(e,t){var n=e.getAttribute("d");n&&(this[e.getAttribute("unicode")]={size:v,path:n})}function p(e){var t=0,n=[],r;e=e.replace(p.re||(p.re=/\s*([achlmqstvzACHLMQSTVZ])\s*/g),"$1");while(t<e.length)n.push(r={}),t=d(r,e,t);return n}function d(e,t,n){var r=n,i=!1;switch(e.type=t[n]){case"z":case"Z":return n+1}e.arguments=[];while(r++<t.length)switch(t[r]){case"A":case"a":case"C":case"c":case"H":case"h":case"L":case"l":case"M":case"m":case"Q":case"q":case"S":case"s":case"T":case"t":case"V":case"v":case"Z":case"z":i=!0;case" ":e.arguments.push(parseFloat(t.substring(n+1,r))),n=r;if(i)return n}}function v(r,s){var o;return l(this._actions||(this._actions=p(this.path)),r,s),t?(o=e,e=document.createElement("canvas"),n=e.getContext("2d")):(o=new Image,o.src=e.toDataURL(),n.clearRect(0,0,i,i)),o.style.cssText="width:"+r+"px;"+"height:"+r+"px;",o.className="fa-ke",o}var t=-1<navigator.userAgent.indexOf("webOSBrowser"),n=e.getContext("2d"),r,i,s,o;return u.fix=f,u}(document.createElement("canvas")));