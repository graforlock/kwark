function select(e){return this instanceof select?void(e&&(e.indexOf(".")!==-1?this.node=document.getElementsByClassName(e.split(".").join("")):e.indexOf("#")!==-1?this.node=document.getElementById(e.split("#").join("")):this.node=document.getElementsByTagName(e))):new select(e)}var core=require("./kwark-core-utils"),events=core.events;select.one=function(e){var t=new select;return t.node=document.querySelector(e),t},select.inline=function(e){var t=new select;return t.inlined=e,t},select.prototype.find=function(e,t){var n=t?this.node.querySelectorAll(e):this.node.querySelector(e);return n?this.node=n:console.log("select: "+e+" is empty."),this},select.prototype.addClass=function(e){return this.node.className.indexOf(e)===-1&&(this.node.className+=(this.node.className?" ":"")+e),this},select.prototype.hasClass=function(e){return!!new RegExp(e,"g").exec(this.node.className)&&this},select.prototype.removeClass=function(e){return this.hasClass(e)&&(this.node.className=this.node.className.replace(e,"")),this},select.prototype.nodeify=function(e){var t=/^<([\w =\-'"\[\]0-9]+)>([<>\w\D ]+)<\/[a-z]+>$/g,n=t.exec(this.inlined),o=n[2],i=n[1].split(" "),s=i[0];this.node=document.createElement(s);var r=this;if(i.length>1)for(var c=i.slice(1).map(function(e){var t={},n=e.split("=");return t[n[0]]=n[1],t}),l=0;l<c.length;l++){var h,d=Object.keys(c[l]),p=d[0];c[l][p]&&(h=c[l][p].indexOf('"')!==-1?c[l][p].replace(/"/g,""):c[l][p]),r.node[p]=h?h:""}return o&&this.html(o),this},select.prototype.clone=function(){var e=this.node.cloneNode(!0),t=core.extend({},this);return t.node=e,t},select.prototype.siblings=function(e){var t=core.pSiblings(this.node)||[],n=core.nSiblings(this.node)||[];return this.node=e?t.concat(n).filter(e):t.concat(n),this},select.prototype.eq=function(e){return this.node[e]},select.prototype.first=function(){return this.node[0]},select.prototype.last=function(){return this.node[this.node.length-1]},select.prototype.children=function(e){return e?(this.node=[].slice.call(this.node.children).filter(e),this):this.node=this.node.children},select.prototype.append=function(e){return e=e||document.body,e.appendChild(this.node),this},select.prototype.insertBefore=function(e){if(e=e||!1){var t=e.parentNode;t.insertBefore(this.node,e)}return this},select.prototype.insertAfter=function(e){if(e=e.nextElementSibling||!1){var t=e.parentNode;console.log(t),t.insertBefore(this.node,e)}return this},select.prototype.prepend=function(e){return e=e||document.body,e.children?e.insertBefore(this.node,e.children[0]):e.appendChild(this.node),this},select.prototype.isntNull=function(){return null!==this.node},select.prototype.event=function(e,t){t=t.bind(this);var n=this.node;this.isntNull()&&0!==n.length&&this.each(function(n){n.addEventListener(e,t)})},select.prototype.event_decorator=function(e){return function(t){t=t.bind(this);var n=this.node;this.isntNull()&&0!==n.length&&this.each(function(n){n.addEventListener(e,t)})}};for(var i=0;i<events.length;i++)select.prototype[events[i]]=select.prototype.event_decorator(events[i]);select.prototype.foreach=function(e,t){for(var n=0;n<e.length&&!t(e[n],n++););},select.prototype.type=function(e){return e?{}.toString.call(e):{}.toString.call(this.node)},select.prototype.each=function(e){({}).toString;return"[object HTMLCollection]"===this.type()||"[object NodeList]"===this.type()||"[object Array]"===this.type()?(this.foreach(this.node,e),this):(e(this.node),this)},select.prototype.html=function(e){return e?(this.each(function(t){t.innerHTML=e}),this):this.node.innerHTML},select.prototype.interval=function(e,t,n){e=e.bind(this);var o=n?setInterval:setTimeout;o(e,t)},module.exports=select;