(this["webpackJsonpgesture-based-oa"]=this["webpackJsonpgesture-based-oa"]||[]).push([[0],{287:function(e,t){},288:function(e,t){},296:function(e,t){},299:function(e,t){},300:function(e,t){},301:function(e,t,n){"use strict";n.r(t);var o=n(44),r=n(110),i=n(235),c=n.n(i),a=n(19),s=n(4),l=n.n(s),u=n(12),d=n(236),p=n.n(d),g=n(185),f=(n(233),n(191)),h=n(102);chrome.storage.sync.set({appActive:!1},(function(){console.log("active set to false")}));var m=function(){var e=Object(r.useRef)(null),t=null,n={},i={},c=new f.a({}),s=function(){var t=Object(u.a)(l.a.mark((function t(n,o){var r,a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("undefined"===typeof e.current||null===e.current||4!==e.current.video.readyState){t.next=6;break}return r=e.current.video,t.next=4,n.estimateHands(r);case 4:(a=t.sent).length>0?(i=c.estimate(a[0].landmarks),console.log(i),"test"!==o&&(m[o].push(i),v+=1,document.getElementById("sampleCount-".concat(o)).innerText="Samples Captured: ".concat(v))):console.log("hand not detected");case 6:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),d=function(){var e=Object(u.a)(l.a.mark((function e(o){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t?console.log("detector already in progress"):(t=setInterval((function(){return s(n,o)}),500),console.log("detector started"));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),h=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t?(clearInterval(t),console.log("detector stopped"),t=null):console.log("no detector in progress");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m={},v=0,b=function(){var e=Object(u.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.target.id.split("-")[1],v=0,m[n]=[],d(n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),j=function(){var e=Object(u.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.target.id.split("-")[1],h(),console.log(m[n]),k(n),document.getElementById("trainStatus-".concat(n)).innerHTML="data captured, save if you want";case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=[],x={},y={},k=function(e){x[e]=[];for(var t=0,n=[0,1,2,3,4];t<n.length;t++){for(var o=n[t],r={curls:{values:[],weights:[]},directions:{values:[],weights:[]}},i=function(){for(var t=s[c],n=[],i=[],l=[],u=0;u<m[e].length;u++)n.push(m[e][u][t][o]);var d=Object(a.a)(new Set(n));d.forEach((function(){i.push(0),l.push(0)})),n.forEach((function(e){i[d.indexOf(e)]+=1}));var p=Math.max.apply(Math,i);i.forEach((function(e,t){l[t]=e/p,e/p===0&&console.log("!!!!!!!!!!!!!!!!!!weight 0",d,i)})),r[t]={values:d,weights:l}},c=0,s=["curls","directions"];c<s.length;c++)i();x[e].push(r)}console.log(x[e])},O=function(e){var t=e.target.id.split("-")[1];chrome.storage.sync.get(["gestures"],(function(e){e.gestures.length>0&&(w=e.gestures.filter((function(e){return e.operation!==t}))),w.push({operation:t,gestureDescriptions:x[t]}),document.getElementById("trainStatus-".concat(t)).innerText="trained",console.log("new gestures",w),chrome.storage.sync.set({gestures:w})}))},D=function(e){var t=e.target.id.split("-")[1];chrome.storage.sync.get(["gestures"],(function(e){e.gestures.length>0&&(w=e.gestures.filter((function(e){return e.operation!==t}))),document.getElementById("trainStatus-".concat(t)).innerText="untrained",console.log("new gestures",w),chrome.storage.sync.set({gestures:w})}))},S=function(e){var t=e.target.id.split("-")[1];chrome.storage.sync.get(["gestureNicknames"],(function(e){(y=e.gestureNicknames?e.gestureNicknames:{})[t]=document.getElementById("nicknameInput-".concat(t)).value,chrome.storage.sync.set({gestureNicknames:y})}))},C={operationBlock:{display:"block",fontSize:14},button:{margin:"0px 5px"},interfaceTitle:{fontSize:18,fontWeight:"bold",marginTop:"5px"}};return function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a();case 2:n=e.sent,console.log("handpose model loaded");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()(),Object(o.jsxs)("div",{className:"App",children:[Object(o.jsx)("div",{className:"webcam-container",children:Object(o.jsx)(p.a,{ref:e,style:{position:"fixed",margin:"auto",top:"20px",left:"50%",right:0,textAlign:"center",width:560,height:400}})}),Object(o.jsxs)("div",{id:"detector-test",children:[Object(o.jsx)("button",{onClick:function(){return d("test")},children:"Start Detector"}),Object(o.jsx)("button",{onClick:h,children:"Stop Detector"})]}),["scrollUp","scrollDown","togglePointer","pointerLeft","pointerRight","pointerUp","pointerDown","pointerClick","goBackPage","goForwardPage"].map((function(e){return Object(o.jsxs)("div",{id:"interface-".concat(e),children:[Object(o.jsxs)("div",{style:C.interfaceTitle,children:[Object(o.jsxs)("span",{style:{display:"inline-block",width:"140px"},children:[e,":"]}),Object(o.jsx)("span",{id:"trainStatus-".concat(e),style:{fontWeight:"normal",marginLeft:"5px",backgroundColor:"#DAE1E6"},children:"untrained"}),Object(o.jsx)("span",{id:"nickname-".concat(e),style:{marginLeft:"10px"}})]}),Object(o.jsxs)("div",{style:C.operationBlock,children:[Object(o.jsxs)("span",{id:"sampleCount-".concat(e),style:{minWidth:"135px"},children:["Samples Captured: ",v]}),Object(o.jsx)("button",{id:"trainStart-".concat(e),style:C.button,onClick:b,children:"Start Training"}),Object(o.jsx)("button",{id:"trainStop-".concat(e),style:C.button,onClick:j,children:"Stop Training"}),Object(o.jsx)("button",{id:"saveGesture-".concat(e),style:C.button,onClick:O,children:"Save Gesture"}),Object(o.jsx)("button",{id:"deleteGesture-".concat(e),style:C.button,onClick:D,children:"Delete Gesture"}),Object(o.jsx)("input",{type:"text",id:"nicknameInput-".concat(e),style:{width:"100px"}}),Object(o.jsx)("button",{id:"saveNickname-".concat(e),style:C.button,onClick:S,children:"Save Nickname"})]})]})})),Object(o.jsx)("button",{onClick:function(){chrome.storage.sync.set({gestures:{}})},children:"!!! Delete Model !!!"})]})},v=n(17),b=document.querySelector("#backgroundVideo");chrome.storage.sync.set({appActive:!1});var j=[],w=null,x=[];chrome.storage.onChanged.addListener((function(e){Object.keys(e).includes("appActive")&&chrome.storage.sync.get(["appActive"],(function(e){(console.log("changed value",e.appActive),e.appActive)?chrome.storage.sync.get(["gestures"],(function(e){var t;x=e.gestures,console.log("loaded gesture descriptions: ",x),j=[],x.forEach((function(e){var t=e.operation,n=e.gestureDescriptions,o=new h.GestureDescription(t),r=["Thumb","Index","Middle","Ring","Pinky"],i=["NoCurl","HalfCurl","FullCurl"],c=["VerticalUp","VerticalDown","HorizontalLeft","HorizontalRight","DiagonalUpRight","DiagonalUpLeft","DiagonalDownRight","DiagonalDownLeft"];n.forEach((function(e,t){e.curls.values.forEach((function(n,c){o.addCurl(h.Finger[r[t]],h.FingerCurl[i[n]],e.curls.weights[c])})),e.directions.values.forEach((function(n,i){o.addDirection(h.Finger[r[t]],h.FingerDirection[c[n]],e.directions.weights[i])}))})),j.push(o)})),w=new h.GestureEstimator(j),t=b,navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"user",width:{ideal:560},height:{ideal:400}}}).then((function(e){t.srcObject=e})).catch((function(e){console.log(e)})),k(),alert("Gesture-Based OA started.\nPlease refresh current page.")})):(clearInterval(y),b.srcObject&&(b.srcObject.getTracks().forEach((function(e){return e.stop()})),alert("Gesture-Based OA stopped.")))}))}));var y=null,k=function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a();case 2:t=e.sent,console.log("handpose handDetector loaded"),y=setInterval((function(){return $(t,w)}),500);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O={},D=new f.a({}),S={scrollUp:{code:"window.scrollTo(window.scrollX, window.scrollY-100);"},scrollDown:{code:"window.scrollTo(window.scrollX, window.scrollY+100);"},togglePointer:{code:["$('#pointer').toggle();","$('#pointer').css({left: '50%', top: '50%'});"].join("")},pointerUp:{code:["if ($('#pointer').is(':visible')) {","  $('#pointer').animate({top: '-=30'}, 1);","}"].join("")},pointerDown:{code:["if ($('#pointer').is(':visible')) {","  $('#pointer').animate({top: '+=30'}, 1);","}"].join("")},pointerLeft:{code:["if ($('#pointer').is(':visible')) {","  $('#pointer').animate({left: '-=30'}, 1);","}"].join("")},pointerRight:{code:["if ($('#pointer').is(':visible')) {","  $('#pointer').animate({left: '+=30'}, 1);","}"].join("")},pointerClick:{code:["if ($('#pointer').is(':visible')) {","  let position = $('#pointer').position();","  $('#pointer').hide();","  document.elementFromPoint(","    position.left + 25, position.top + 25","    ).click();","  $('#pointer').show();","}"].join("")},goBackPage:{code:"history.back();"},goForwardPage:{code:"history.forward();"}},C=!1,E=null,$=function(){var e=Object(u.a)(l.a.mark((function e(t){var n,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.estimateHands(b);case 2:if(!((n=e.sent).length>0)){e.next=12;break}return O=D.estimate(n[0].landmarks),console.log(JSON.stringify(O)),e.next=8,w.estimate(n[0].landmarks,7.5);case 8:(o=e.sent).gestures.length>0&&chrome.windows.getLastFocused({populate:!0},(function(e){var t,n=Object(v.a)(e.tabs);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(r.active){r.id!==E&&(C=!1,console.log("tab changed"),chrome.tabs.executeScript(r.id,{code:["$('#pointer').css({top:'50%', left:'50%'});","$('#pointer').hide();"].join("")}),E=r.id);var i=o.gestures.filter((function(e){return C?e.name.includes("ointer"):!e.name.includes("pointer")}));i.length>0&&("togglePointer"===i[0].name&&(C=!C,console.log("pointerVisible: ",C)),chrome.tabs.executeScript(r.id,S[i[0].name]),console.log(i[0].name));break}}}catch(c){n.e(c)}finally{n.f()}})),e.next=13;break;case 12:console.log("hand not detected");case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();c.a.render(Object(o.jsx)(m,{}),document.getElementById("root"))}},[[301,1,2]]]);
//# sourceMappingURL=main.9baf6161.chunk.js.map