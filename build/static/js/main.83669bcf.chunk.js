(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{16:function(e,t,n){e.exports=n(40)},21:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(15),o=n.n(c),u=(n(21),n(2)),i=n.n(u),s=n(5),l=n(4),p=n(3),m=n.n(p);var f=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(),u=Object(l.a)(o,2),p=u[0],f=u[1],b=Object(a.useState)(),d=Object(l.a)(b,2),h=d[0],v=d[1],E=function(){var e=Object(s.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.get("/api/persons");case 2:t=e.sent,n=t.data,c(n);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){E()}),[]);var w=function(e){m.a.delete("/api/persons/".concat(e.target.id)),E()},g=function(){var e=Object(s.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=n.find((function(e){return e.name==p})))){e.next=6;break}return e.next=4,m.a.put("/api/persons/".concat(t.id),{name:p,number:h});case 4:e.next=8;break;case 6:return e.next=8,m.a.post("/api/persons",{name:p,number:h});case 8:E();case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Phone Book"),r.a.createElement("ul",null,n.map((function(e){return r.a.createElement("li",null,e.name," ",e.number," ",r.a.createElement("button",{id:e.id,onClick:w},"delete"))}))),r.a.createElement("form",{onSubmit:g},r.a.createElement("input",{onChange:function(e){return f(e.target.value)},type:"text",placeholder:"name"}),r.a.createElement("input",{onChange:function(e){return v(e.target.value)},type:"text",placeholder:"number"}),r.a.createElement("button",{type:"submit"},"Submit")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[16,1,2]]]);
//# sourceMappingURL=main.83669bcf.chunk.js.map