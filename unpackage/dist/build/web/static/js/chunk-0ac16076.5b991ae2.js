(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0ac16076"],{"318f":function(e,t,a){"use strict";a("6a54");var i=a("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("64aa"),a("aa9c"),a("c223");var n=a("344fc"),o=i(a("a9ca")),s=(a("8e38"),{data:function(){return{id:"",sss:"申请时间",showT:!1,opinShow:!1,opinionsList:[],opinionsLists:[],errorMsg:{resulta:""},form:{empno:this.$store.state.userId,type:"正常申請",states:"3",createdate:""},active:!1,tabbars:[{name:"/apply",title:"申请",normal:a("334f"),active:a("43b9")},{name:"/login",title:"工作台",normal:a("6562"),active:a("4dbb")},{name:"/mynavigation",title:"我的",normal:a("354b"),active:a("f319")}]}},created:function(){var e=this,t=new Date,a=t.getFullYear(),i=t.getMonth()+1,s=t.getDate(),r=a+"/"+this.withData(i)+"/"+this.withData(s);t=o.default.mathChangeDate(r,"-",7,"date"),this.form.createdate=t,(0,n.listReleaseapply)(this.form).then((function(t){200===t.code?(e.opinionsList=t.rows,e.processOpinion(),0===e.opinionsList.length&&(e.showT=!0)):e.errorMsg.resulta="新增失败!"}))},onLoad:function(){},methods:{tabIndex:function(e){e=Number(e),this.active=e,this.$store.commit("setTableIndex","/returnapply");var t=this.tabbars[e].name;console.log(t),this.$router.push(t)},processOpinion:function(){for(var e=[],t=0;t<this.opinionsList.length;t++){var a={label:"申请人",value:this.opinionsList[t].empname},i={label:"日 期",value:o.default.formatDate(this.opinionsList[t].date)},n={label:"时 段",value:this.opinionsList[t].startime+"~"+this.opinionsList[t].endtime},s={label:"状 态",value:o.default.getOpoinionStates(this.opinionsList[t].states)},r=new Array(a,i,n,s);e.push(r)}this.opinShow=0===e.length,this.opinionsLists=[].concat(e)},goDetailOpin:function(e){this.$store.commit("setTableIndex","/returnapply");var t="/returnapplydetail?id="+e;this.$store.commit("setUserNo",e),this.$router.push(t)},withData:function(e){return e<10?"0"+e:""+e},backHome:function(){this.$router.push("/login")}}});t.default=s},4561:function(e,t,a){var i=a("aef4");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("967d").default;n("6848598e",i,!0,{sourceMap:!1,shadowMode:!1})},"751b":function(e,t,a){"use strict";var i=a("4561"),n=a.n(i);n.a},"84d6e":function(e,t,a){"use strict";a.r(t);var i=a("318f"),n=a.n(i);for(var o in i)["default"].indexOf(o)<0&&function(e){a.d(t,e,(function(){return i[e]}))}(o);t["default"]=n.a},aef4:function(e,t,a){var i=a("c86c");t=i(!1),t.push([e.i,".van-divider--center[data-v-8df74f0a]{text-align:center;font-size:larger;color:#007aff}.demo-checkbox-group[data-v-8df74f0a]{margin:10px 0 0 20px}.demo-checkbox[data-v-8df74f0a]{margin:100px 0 0 20px}.value-class[data-v-8df74f0a]{flex:none!important}.icon[data-v-8df74f0a]{width:20px}.weui-tabbar[data-v-8df74f0a]{display:flex;position:fixed;z-index:500;bottom:0;width:100%;background-color:#f7f7fa}.van-tabbar-item--active[data-v-8df74f0a]{color:#e10f02}.vux-form-preview[data-v-8df74f0a] .weui-form-preview__value{font-size:1.1em}.vux-form-preview[data-v-8df74f0a] .weui-form-preview__value{font-size:.8em}.gridCell[data-v-8df74f0a] .van-icon{font-size:50px}.vant-nav-bar-index[data-v-8df74f0a] .van-icon-arrow-left:before{color:#999;block-size:30px}",""]),e.exports=t},b52e:function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){}));var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-form",{ref:"form",attrs:{model:"form"}},[a("van-nav-bar",{attrs:{"left-arrow":!0},on:{"click-left":function(t){arguments[0]=t=e.$handleEvent(t),e.backHome.apply(void 0,arguments)}}}),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showT,expression:"showT"}],staticClass:"van-divider--center"},[e._v("暂无数据")]),a("van-field",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{label:"申请工号"},model:{value:e.form.empno,callback:function(t){e.$set(e.form,"empno",t)},expression:"form.empno"}}),a("van-field",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{label:"签核类型"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}}),a("van-field",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{label:"签核状态"},model:{value:e.form.states,callback:function(t){e.$set(e.form,"states",t)},expression:"form.states"}}),e._l(e.opinionsLists,(function(t,i){return a("group",{key:i,staticClass:"formItem",attrs:{id:"listId"}},[a("form-preview",{staticStyle:{color:"#1989fa"},attrs:{"header-label":e.sss,"header-value":e.opinionsList[i].createdate,"body-items":e.opinionsLists[i],name:e.opinionsList[i].id},nativeOn:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goDetailOpin(e.opinionsList[i].id)}}})],1)})),a("van-field",{attrs:{"error-message":e.errorMsg.resulta,border:!1},model:{value:e.form.startimea,callback:function(t){e.$set(e.form,"startimea",t)},expression:"form.startimea"}}),a("van-tabbar",{staticClass:"weui-tabbar",attrs:{"active-color":"#ff4c7f"},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},e._l(e.tabbars,(function(t,i){return a("van-tabbar-item",{key:"tabbar"+i,attrs:{to:t.name},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.tabIndex(i)}},scopedSlots:e._u([{key:"icon",fn:function(e){return[a("img",{staticStyle:{width:"20px",height:"20px"},attrs:{src:e.active?t.active:t.normal}})]}}],null,!0)},[a("span",[e._v(e._s(t.title))])])})),1)],2)},n=[]},ed48:function(e,t,a){"use strict";a.r(t);var i=a("b52e"),n=a("84d6e");for(var o in n)["default"].indexOf(o)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(o);a("751b");var s=a("828b"),r=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"8df74f0a",null,!1,i["a"],void 0);t["default"]=r.exports}}]);