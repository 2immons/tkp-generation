(function(){"use strict";var e={9806:function(e,a,l){var t=l(5130),n=l(6768);function u(e,a){const l=(0,n.g2)("router-view");return(0,n.uX)(),(0,n.Wv)(l)}var o=l(1241);const r={},i=(0,o.A)(r,[["render",u]]);var s=i,c=l(1387),d=(l(4114),l(4232)),p=l(144),v=l(1446),k=l.n(v),h=l(6020),m=l.n(h),f=l(788),b=l(1421);const L=e=>((0,n.Qi)("data-v-77e960e6"),e=e(),(0,n.jt)(),e),g={class:"container"},w={class:"file-upload-container"},_={class:"file-upload-wrapper"},y=L((()=>(0,n.Lk)("label",{class:"file-label",for:"actual-btn"},"Загрузить шаблон",-1))),C={id:"file-chosen"},N={key:0,class:"file-error-wrapper"},x=L((()=>(0,n.Lk)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[(0,n.Lk)("path",{d:"M12 12V7.5M12 15.3354V15.375M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",stroke:"red","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1))),V={class:"header-inputs"},O={class:"input-group input-group__number-date"},U={class:"input-wrapper"},W=L((()=>(0,n.Lk)("label",null,"№ КП:",-1))),I={class:"input-wrapper"},E=L((()=>(0,n.Lk)("label",null,"Дата КП:",-1))),K={class:"input-group input-group__org"},J={class:"input-wrapper"},R=L((()=>(0,n.Lk)("label",null,"Заказчик:",-1))),M={class:"input-wrapper"},F=L((()=>(0,n.Lk)("label",null,"Отдел:",-1))),A={class:"characteristics-toggler-wrapper"},D={class:"checkbox-wrapper"},j=L((()=>(0,n.Lk)("span",{class:"checkmark"},null,-1))),X=L((()=>(0,n.Lk)("span",null,"Характеристики",-1))),B={class:"table"},q=L((()=>(0,n.Lk)("div",{class:"header-cell"},[(0,n.eW)("№"),(0,n.Lk)("br"),(0,n.eW)("п/п")],-1))),S=L((()=>(0,n.Lk)("div",{class:"header-cell"},[(0,n.eW)("Наименование"),(0,n.Lk)("br"),(0,n.eW)("(Требование)")],-1))),H={key:0,class:"header-cell"},T=L((()=>(0,n.Lk)("br",null,null,-1))),Q=(0,n.Fv)('<div class="header-cell" data-v-77e960e6>Предложение участника<br data-v-77e960e6>(выделить аналоги)</div><div class="header-cell" data-v-77e960e6>Ед.<br data-v-77e960e6>измер.</div><div class="header-cell" data-v-77e960e6>Кол-во</div><div class="header-cell" data-v-77e960e6>Цена за ед.,<br data-v-77e960e6>без НДС</div><div class="header-cell" data-v-77e960e6>Стоимость,<br data-v-77e960e6>без НДС</div><div class="header-cell" data-v-77e960e6></div>',6),$={class:"cell cell--index"},Z={class:"cell"},P=["onUpdate:modelValue"],G={key:0,class:"cell"},z=["onUpdate:modelValue"],Y={class:"cell cell--checkbox"},ee=["onUpdate:modelValue"],ae={class:"checkbox-wrapper"},le=["onUpdate:modelValue"],te=L((()=>(0,n.Lk)("span",{class:"checkmark"},null,-1))),ne={class:"cell"},ue=["onUpdate:modelValue"],oe={class:"cell"},re=["onUpdate:modelValue","onInput"],ie={class:"cell"},se=["onUpdate:modelValue","onInput"],ce={class:"cell"},de=["onUpdate:modelValue","onInput"],pe={class:"cell cell--button"},ve=["onClick"],ke=L((()=>(0,n.Lk)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[(0,n.Lk)("path",{d:"M4 6.17647H20M9 3H15M10 16.7647V10.4118M14 16.7647V10.4118M15.5 21H8.5C7.39543 21 6.5 20.0519 6.5 18.8824L6.0434 7.27937C6.01973 6.67783 6.47392 6.17647 7.04253 6.17647H16.9575C17.5261 6.17647 17.9803 6.67783 17.9566 7.27937L17.5 18.8824C17.5 20.0519 16.6046 21 15.5 21Z",stroke:"red","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1))),he=[ke],me={class:"input-group input-group__price"},fe={class:"input-wrapper"},be=L((()=>(0,n.Lk)("label",null,"Всего без НДС:",-1))),Le={class:"input-wrapper"},ge=L((()=>(0,n.Lk)("label",null,"Всего НДС:",-1))),we={class:"input-group input-group__footer"},_e={class:"input-wrapper input-wrapper--with-borders"},ye=L((()=>(0,n.Lk)("label",null,"Условия оплаты:",-1))),Ce={class:"input-wrapper input-wrapper--with-borders"},Ne=L((()=>(0,n.Lk)("label",null,"Условия доставки:",-1))),xe={class:"input-wrapper input-wrapper--with-borders"},Ve=L((()=>(0,n.Lk)("label",null,"Срок предложения:",-1))),Oe=L((()=>(0,n.Lk)("span",null,"календарных дней",-1)));var Ue=(0,n.pM)({__name:"InputForm",setup(e){(0,n.sV)((()=>{l(),window.addEventListener("beforeunload",a)})),(0,n.xo)((()=>{window.removeEventListener("beforeunload",a)}));const a=()=>{sessionStorage.setItem("state",JSON.stringify({accountNumber:u.value,accountDate:o.value,organisationName:r.value,organisationDept:i.value,totalWithoutNds:s.value,ndsSum:c.value,totalWithNds:v.value,paymentConditions:h.value,deliveryConditions:L.value,deliveryTime:ke.value,positions:We.value,isCharacteristicsInUse:Ue.value,fileName:Je.value,fileData:Ie.value,isFileError:Ee.value,fileErrorMsg:Ke.value}))},l=()=>{const e=sessionStorage.getItem("state");if(e){const a=JSON.parse(e);u.value=a.accountNumber,o.value=a.accountDate,r.value=a.organisationName,i.value=a.organisationDept,s.value=a.totalWithoutNds,c.value=a.ndsSum,v.value=a.totalWithNds,h.value=a.paymentConditions,L.value=a.deliveryConditions,ke.value=a.deliveryTime,We.value=a.positions,Ue.value=a.isCharacteristicsInUse,Je.value=a.fileName,Ie.value=a.fileData,Ee.value=a.isFileError,Ke.value=a.fileErrorMsg}},u=(0,p.KR)(""),o=(0,p.KR)(""),r=(0,p.KR)(""),i=(0,p.KR)("В тендерный отдел"),s=(0,p.KR)(),c=(0,p.KR)(""),v=(0,p.KR)(0),h=(0,p.KR)(""),L=(0,p.KR)(""),ke=(0,p.KR)(90),Ue=(0,p.KR)(!0),We=(0,p.KR)([{name:"",characteristics:"",productOffer:"",productOfferIsAnalog:!1,unit:"шт",quantity:0,priceWithoutNds:0,sumWithOutNds:0}]),Ie=(0,p.KR)(null),Ee=(0,p.KR)(!1),Ke=(0,p.KR)(""),Je=(0,p.KR)("Шаблон не загружен"),Re=e=>{const a=e.target,l=a.files?.[0];if(l){if(Ee.value=!1,!l.name.includes(".docx")||!l.name.includes(".doc"))return void Be("Неправильное расширение файла.Необходимо .docx или .doc");Je.value=l.name;const e=new FileReader;e.onload=()=>{Ie.value=e.result},e.readAsArrayBuffer(l)}},Me=e=>{e.sumWithOutNds=e.priceWithoutNds*e.quantity,Ae()},Fe=e=>{0===e.quantity?e.priceWithoutNds=0:e.priceWithoutNds=e.sumWithOutNds/e.quantity,Ae()},Ae=()=>{s.value=0,We.value.forEach((e=>{s.value+=e.sumWithOutNds}))},De=e=>{"."!==e.key&&","!==e.key||e.preventDefault()},je=e=>{const a=e.target,l=parseFloat(a.value);isNaN(l)||(a.value=l.toFixed(2))},Xe=e=>e%10===1?`${e} календарный день`:e%10===2||e%10===3||e%10===4?`${e} календарный дня`:void 0,Be=e=>{Ke.value=e,Ee.value=!0},qe=()=>{if(!Ie.value)return void Be("Шаблон документа не загружен");Ue.value||(We.value=We.value.map((e=>{const{characteristics:a,...l}=e;return l}))),v.value=Number(s.value)+Number(c.value);const e=new(k())(Ie.value),a=new(m())(e,{paragraphLoop:!0,linebreaks:!0}),l={accountNumber:u.value,accountDate:o.value,organisationName:r.value,organisationDept:i.value,totalWithoutNds:s.value,ndsSum:c.value,totalWithNds:v.value,totalWithNdsLetters:(0,b.C)(v.value),paymentConditions:h.value,deliveryConditions:L.value,deliveryTime:Xe(ke.value),positions:We.value,isCharacteristicsInUse:Ue.value};a.setData(l);try{a.render()}catch(d){throw console.error("Ошибка при рендеринге шаблона",d),d}const t=a.getZip().generate({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"}),n=`ТКП_№${u.value}_от_${o.value}_для_${r.value}.docx`;(0,f.saveAs)(t,n)},Se=(0,n.EW)((()=>Ue.value?"with-characteristics":"without-characteristics")),He=()=>{const e={name:"",characteristics:"",productOffer:"",productOfferIsAnalog:!1,unit:"шт",quantity:0,priceWithoutNds:0,sumWithOutNds:0};We.value.push(e)},Te=e=>{const a=We.value.indexOf(e);-1!==a&&We.value.splice(a,1)};return(e,a)=>((0,n.uX)(),(0,n.CE)("div",g,[(0,n.Lk)("div",w,[(0,n.Lk)("div",_,[(0,n.Lk)("input",{class:"file-input",type:"file",id:"actual-btn",hidden:"",onChange:Re},null,32),y,(0,n.Lk)("span",C,(0,d.v_)(Je.value),1)]),Ee.value?((0,n.uX)(),(0,n.CE)("span",N,[x,(0,n.Lk)("p",null,(0,d.v_)(Ke.value),1)])):(0,n.Q3)("",!0)]),(0,n.Lk)("div",V,[(0,n.Lk)("div",O,[(0,n.Lk)("div",U,[W,(0,n.bo)((0,n.Lk)("input",{"onUpdate:modelValue":a[0]||(a[0]=e=>u.value=e),type:"text",placeholder:"1234"},null,512),[[t.Jo,u.value]])]),(0,n.Lk)("div",I,[E,(0,n.bo)((0,n.Lk)("input",{"onUpdate:modelValue":a[1]||(a[1]=e=>o.value=e),type:"date"},null,512),[[t.Jo,o.value]])])]),(0,n.Lk)("div",K,[(0,n.Lk)("div",J,[R,(0,n.bo)((0,n.Lk)("input",{"onUpdate:modelValue":a[2]||(a[2]=e=>r.value=e),type:"text",placeholder:"Наименование организации"},null,512),[[t.Jo,r.value]])]),(0,n.Lk)("div",M,[F,(0,n.bo)((0,n.Lk)("input",{"onUpdate:modelValue":a[3]||(a[3]=e=>i.value=e),type:"text",placeholder:"Например: 'В отдел продаж', 'В тендерный отдел'"},null,512),[[t.Jo,i.value]])])])]),(0,n.Lk)("div",A,[(0,n.Lk)("label",D,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox","onUpdate:modelValue":a[4]||(a[4]=e=>Ue.value=e)},null,512),[[t.lH,Ue.value]]),j]),X]),(0,n.Lk)("div",B,[(0,n.Lk)("div",{class:(0,d.C4)(["table__header",Se.value])},[q,S,Ue.value?((0,n.uX)(),(0,n.CE)("div",H,[(0,n.eW)("Требуемые"),T,(0,n.eW)("характеристики")])):(0,n.Q3)("",!0),Q],2),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(We.value,((e,a)=>((0,n.uX)(),(0,n.CE)("div",{class:(0,d.C4)(["table__row",Se.value]),key:a},[(0,n.Lk)("div",$,(0,d.v_)(a+1),1),(0,n.Lk)("div",Z,[(0,n.bo)((0,n.Lk)("textarea",{class:"cell__textarea","onUpdate:modelValue":a=>e.name=a},null,8,P),[[t.Jo,e.name]])]),Ue.value?((0,n.uX)(),(0,n.CE)("div",G,[(0,n.bo)((0,n.Lk)("textarea",{class:"cell__textarea","onUpdate:modelValue":a=>e.characteristics=a},null,8,z),[[t.Jo,e.characteristics]])])):(0,n.Q3)("",!0),(0,n.Lk)("div",Y,[(0,n.bo)((0,n.Lk)("textarea",{class:"cell__textarea","onUpdate:modelValue":a=>e.productOffer=a},null,8,ee),[[t.Jo,e.productOffer]]),(0,n.Lk)("label",ae,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox","onUpdate:modelValue":a=>e.productOfferIsAnalog=a},null,8,le),[[t.lH,e.productOfferIsAnalog]]),te])]),(0,n.Lk)("div",ne,[(0,n.bo)((0,n.Lk)("input",{class:"cell__input",type:"text","onUpdate:modelValue":a=>e.unit=a},null,8,ue),[[t.Jo,e.unit]])]),(0,n.Lk)("div",oe,[(0,n.bo)((0,n.Lk)("input",{class:"cell__input",type:"number","onUpdate:modelValue":a=>e.quantity=a,onInput:a=>Me(e)},null,40,re),[[t.Jo,e.quantity]])]),(0,n.Lk)("div",ie,[(0,n.bo)((0,n.Lk)("input",{class:"cell__input",type:"number","onUpdate:modelValue":a=>e.priceWithoutNds=a,onBlur:je,onInput:a=>Me(e)},null,40,se),[[t.Jo,e.priceWithoutNds]])]),(0,n.Lk)("div",ce,[(0,n.bo)((0,n.Lk)("input",{class:"cell__input",type:"number","onUpdate:modelValue":a=>e.sumWithOutNds=a,onBlur:je,onInput:a=>Fe(e)},null,40,de),[[t.Jo,e.sumWithOutNds]])]),(0,n.Lk)("div",pe,[(0,n.Lk)("button",{class:"btn__remove",onClick:a=>Te(e)},he,8,ve)])],2)))),128))]),(0,n.Lk)("button",{class:"btn btn__add-position",onClick:He},"Добавить позицию"),(0,n.Lk)("div",me,[(0,n.Lk)("div",fe,[be,(0,n.bo)((0,n.Lk)("input",{"onUpdate:modelValue":a[5]||(a[5]=e=>s.value=e),onBlur:je,type:"number",placeholder:"12345,12"},null,544),[[t.Jo,s.value]])]),(0,n.Lk)("div",Le,[ge,(0,n.bo)((0,n.Lk)("input",{"onUpdate:modelValue":a[6]||(a[6]=e=>c.value=e),onBlur:je,type:"number",placeholder:"12345,12"},null,544),[[t.Jo,c.value]])])]),(0,n.Lk)("div",we,[(0,n.Lk)("div",_e,[ye,(0,n.bo)((0,n.Lk)("textarea",{"onUpdate:modelValue":a[7]||(a[7]=e=>h.value=e)},null,512),[[t.Jo,h.value]])]),(0,n.Lk)("div",Ce,[Ne,(0,n.bo)((0,n.Lk)("textarea",{"onUpdate:modelValue":a[8]||(a[8]=e=>L.value=e)},null,512),[[t.Jo,L.value]])]),(0,n.Lk)("div",xe,[Ve,(0,n.bo)((0,n.Lk)("input",{"onUpdate:modelValue":a[9]||(a[9]=e=>ke.value=e),type:"number",step:"1",onKeydown:De},null,544),[[t.Jo,ke.value]]),Oe])]),(0,n.Lk)("button",{class:"btn btn__generate",onClick:qe},"Сгенерировать документ")]))}});const We=(0,o.A)(Ue,[["__scopeId","data-v-77e960e6"]]);var Ie=We,Ee=l.p+"img/Logo.b4dbda6f.png";const Ke=e=>((0,n.Qi)("data-v-6e369203"),e=e(),(0,n.jt)(),e),Je=Ke((()=>(0,n.Lk)("div",{class:"container"},[(0,n.Lk)("img",{src:Ee,alt:""}),(0,n.Lk)("h1",null,"DocsGeneration")],-1))),Re=[Je];function Me(e,a){return(0,n.uX)(),(0,n.CE)("header",null,Re)}const Fe={},Ae=(0,o.A)(Fe,[["render",Me],["__scopeId","data-v-6e369203"]]);var De=Ae,je=(0,n.pM)({__name:"MainView",setup(e){return(e,a)=>((0,n.uX)(),(0,n.CE)(n.FK,null,[(0,n.bF)(De),(0,n.Lk)("main",null,[(0,n.bF)(Ie)])],64))}});const Xe=(0,o.A)(je,[["__scopeId","data-v-4941a01e"]]);var Be=Xe;const qe=[{path:"/",name:"home",component:Be}],Se=(0,c.aE)({history:(0,c.Bt)(),routes:qe});var He=Se;(0,t.Ef)(s).use(He).mount("#app")}},a={};function l(t){var n=a[t];if(void 0!==n)return n.exports;var u=a[t]={exports:{}};return e[t].call(u.exports,u,u.exports,l),u.exports}l.m=e,function(){var e=[];l.O=function(a,t,n,u){if(!t){var o=1/0;for(c=0;c<e.length;c++){t=e[c][0],n=e[c][1],u=e[c][2];for(var r=!0,i=0;i<t.length;i++)(!1&u||o>=u)&&Object.keys(l.O).every((function(e){return l.O[e](t[i])}))?t.splice(i--,1):(r=!1,u<o&&(o=u));if(r){e.splice(c--,1);var s=n();void 0!==s&&(a=s)}}return a}u=u||0;for(var c=e.length;c>0&&e[c-1][2]>u;c--)e[c]=e[c-1];e[c]=[t,n,u]}}(),function(){l.n=function(e){var a=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(a,{a:a}),a}}(),function(){l.d=function(e,a){for(var t in a)l.o(a,t)&&!l.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:a[t]})}}(),function(){l.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){l.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)}}(),function(){l.p="/tkp-generation/"}(),function(){var e={524:0};l.O.j=function(a){return 0===e[a]};var a=function(a,t){var n,u,o=t[0],r=t[1],i=t[2],s=0;if(o.some((function(a){return 0!==e[a]}))){for(n in r)l.o(r,n)&&(l.m[n]=r[n]);if(i)var c=i(l)}for(a&&a(t);s<o.length;s++)u=o[s],l.o(e,u)&&e[u]&&e[u][0](),e[u]=0;return l.O(c)},t=self["webpackChunktkp_generation"]=self["webpackChunktkp_generation"]||[];t.forEach(a.bind(null,0)),t.push=a.bind(null,t.push.bind(t))}();var t=l.O(void 0,[504],(function(){return l(9806)}));t=l.O(t)})();
//# sourceMappingURL=app.3afe27c5.js.map