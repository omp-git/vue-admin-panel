(function(t){function e(e){for(var r,i,a=e[0],u=e[1],l=e[2],d=0,p=[];d<a.length;d++)i=a[d],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&p.push(s[i][0]),s[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);c&&c(e);while(p.length)p.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,a=1;a<n.length;a++){var u=n[a];0!==s[u]&&(r=!1)}r&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},s={app:0},o=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],u=a.push.bind(a);a.push=e,a=a.slice();for(var l=0;l<a.length;l++)e(a[l]);var c=u;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"035d":function(t,e,n){"use strict";n("cb6f")},1:function(t,e){},10:function(t,e){},11:function(t,e){},12:function(t,e){},13:function(t,e){},14:function(t,e){},"1a60":function(t,e,n){"use strict";n("4000")},2:function(t,e){},3:function(t,e){},4:function(t,e){},4e3:function(t,e,n){},"407b":function(t,e,n){},"4c0b":function(t,e,n){"use strict";n("db3a")},5:function(t,e){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("app-header"),n("router-view")],1)},o=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{attrs:{id:"header"}},[n("div",{staticClass:"logo"},[n("router-link",{attrs:{to:"/"}},[t._v("Vue - Complete Guide")])],1),n("nav",[n("ul",[t.auth?t._e():n("li",[n("router-link",{attrs:{to:"/signup"}},[t._v("Sign Up")])],1),t.auth?t._e():n("li",[n("router-link",{attrs:{to:"/signin"}},[t._v("Sign In")])],1),t.auth?n("li",[n("router-link",{attrs:{to:"/dashboard"}},[t._v("Dashboard")])],1):t._e(),t.auth?n("button",{staticClass:"logout",on:{click:t.onLogout}},[t._v("Logout")]):t._e()])])])},a=[],u={computed:{auth:function(){return this.$store.getters.isAuthenticated}},methods:{onLogout:function(){this.$store.dispatch("logout")}}},l=u,c=(n("4c0b"),n("2877")),d=Object(c["a"])(l,i,a,!1,null,"12e55052",null),p=d.exports,m={name:"app",components:{"app-header":p},created:function(){this.$store.dispatch("tryAutoLogin")}},f=m,v=(n("034f"),Object(c["a"])(f,s,o,!1,null,null,null)),h=v.exports,b=n("e399"),g=n.n(b),_=(n("6705"),n("1dce")),w=n.n(_),y=n("8c4f"),$=(n("d3b7"),n("25f0"),n("2f62")),k=n("bc3a"),x=n.n(k),I=x.a.create({baseURL:"https://imi24.com/api"}),C=I,P=n("c198"),O=n.n(P),S=n("f8d5"),T=n.n(S);r["a"].use($["a"]);var j=new $["a"].Store({state:{idToken:null,userId:null,expiresIn:null},mutations:{authUser:function(t,e){t.idToken=e.token,t.userId=e.userId,t.expiresIn=e.expiresIn,N({token:e.token,userId:e.userId,expiresIn:e.expiresIn}),at.push("/dashboard").catch((function(){}))},clearAuthUser:function(t){t.idToken=null,t.userId=null,t.expiresIn=null,N({token:null,userId:null,expiresIn:null}),at.push("/signin").catch((function(){}))}},actions:{login:function(t,e){var n=t.commit,r=t.dispatch;return new Promise((function(t,s){C.post("auth/vue-login",{mobile:e.mobile,password:e.password}).then((function(e){var s=e.data;if(s.status&&(console.log("login: ",s),n("authUser",{token:s.access_token,expiresIn:s.expires_in,userId:s.u_id}),s.expires_in)){var o=s.expires_in-A();r("setLogoutTime",o)}t(e)})).catch((function(t){console.log("err:",t),s(t)}))}))},tryAutoLogin:function(t){var e=t.commit,n=t.dispatch,r=L();if(r){var s=r._token;if("undefined"!=typeof s&&null!==s&&"null"!==s){var o=r._exp,i=A();if(!(i>=o)){var a=r._uid;e("authUser",{token:s,expiresIn:o,userId:a});var u=o-i;n("setLogoutTime",u)}}}},logout:function(t){var e=t.commit;e("clearAuthUser")},setLogoutTime:function(t,e){var n=t.dispatch;setTimeout((function(){n("logout")}),1e3*e)}},getters:{isAuthenticated:function(t){return null!==t.idToken},token:function(t){return t.idToken},uId:function(t){return t.userId},expiresIn:function(t){return t.expiresIn}}});function A(){var t=new Date;return Math.floor(t.getTime()/1e3)}function N(t){var e={_exp:t.expiresIn,_token:t.token,_uid:t.userId},n=O.a.encrypt(JSON.stringify(e),"dN7efVDjpZ4VVFszaOlK7u2sBZ6okZMzDTJ5G5AzedbTgrdT8PmVWciGlYBosnab");return localStorage.setItem("vue_user",n),!0}function L(){try{var t=localStorage.getItem("vue_user"),e=O.a.decrypt(t.toString(),"dN7efVDjpZ4VVFszaOlK7u2sBZ6okZMzDTJ5G5AzedbTgrdT8PmVWciGlYBosnab"),n=JSON.parse(e.toString(T.a));console.log(n)}catch(r){return!1}return"_exp"in n&&"_token"in n&&"_uid"in n&&n}var M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"welcome"}},[n("h1",[t._v("Time to learn something new!")]),n("p",[t._v("You found the best place to learn - and now you're just one sign in (or sign up) away from it!")]),n("div",{staticClass:"cta"},[n("router-link",{attrs:{to:"/signup"}},[t._v("Sign Up")]),n("router-link",{attrs:{to:"/signin"}},[t._v("Sign In")])],1)])},E=[],U=(n("1a60"),{}),D=Object(c["a"])(U,M,E,!1,null,"1d9c0502",null),V=D.exports,q=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"dashboard"}},[n("div",[n("h1",[t._v("That's the dashboard.")]),t.auth&&""!=t.fullName?n("h2",{staticClass:"auth"},[t._v("Your are logged in! ("+t._s(t.fullName)+")")]):t._e(),t.auth?t._e():n("h2",{staticClass:"gest"},[t._v("Your are not logged in!")])]),t.auth?n("div",{staticClass:"user-list"},[n("h4",[t._v("User List")]),n("hr"),n("div",[n("ul",t._l(t.users,(function(e,r){return n("li",{key:r},[t._v(t._s(r+1+" - "+e.name))])})),0)])]):t._e()])},H=[],Y={data:function(){return{fullName:"",users:[]}},computed:{auth:function(){return this.$store.getters.isAuthenticated}},created:function(){var t=this;this.auth&&(C.post("auth/vue-login-user",{token:this.$store.getters.token,_id:this.$store.getters.uId}).then((function(e){var n=e.data;if(n.status){var r=n.user;t.fullName=r.fname+" "+r.lname}else t.$store.dispatch("logout")})).catch((function(t){return console.log(t)})),C.post("auth/vue-user-list",{token:this.$store.getters.token}).then((function(e){var n=e.data;if(n.status){var r=n.users;t.users=r}else t.$store.dispatch("logout")})).catch((function(t){return console.log(t)})))}},z=Y,B=(n("8963"),Object(c["a"])(z,q,H,!1,null,"e480e45c",null)),J=B.exports,Z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"signup"}},[n("div",{staticClass:"signup-form"},[n("form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[n("div",{staticClass:"input"},[n("label",{attrs:{for:"email"}},[t._v("Mail")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"email",id:"email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),n("div",{staticClass:"input"},[n("label",{attrs:{for:"age"}},[t._v("Your Age")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.age,expression:"age",modifiers:{number:!0}}],attrs:{type:"number",id:"age"},domProps:{value:t.age},on:{input:function(e){e.target.composing||(t.age=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),n("div",{staticClass:"input"},[n("label",{attrs:{for:"password"}},[t._v("Password")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",id:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),n("div",{staticClass:"hobbies"},[n("h3",[t._v("Add some Hobbies")]),n("button",{attrs:{type:"button"},on:{click:t.onAddHobby}},[t._v("Add Hobby")]),n("div",{staticClass:"hobby-list"},t._l(t.hobbyInputs,(function(e,r){return n("div",{key:e.id,staticClass:"input"},[n("label",{attrs:{for:e.id}},[t._v("Hobby #"+t._s(r))]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"hobbyInput.value"}],attrs:{type:"text",id:e.id},domProps:{value:e.value},on:{input:function(n){n.target.composing||t.$set(e,"value",n.target.value)}}}),n("button",{attrs:{type:"button"},on:{click:function(n){return t.onDeleteHobby(e.id)}}},[t._v("X")])])})),0)]),n("div",{staticClass:"input inline"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.terms,expression:"terms"}],attrs:{type:"checkbox",id:"terms"},domProps:{checked:Array.isArray(t.terms)?t._i(t.terms,null)>-1:t.terms},on:{change:function(e){var n=t.terms,r=e.target,s=!!r.checked;if(Array.isArray(n)){var o=null,i=t._i(n,o);r.checked?i<0&&(t.terms=n.concat([o])):i>-1&&(t.terms=n.slice(0,i).concat(n.slice(i+1)))}else t.terms=s}}}),n("label",{attrs:{for:"terms"}},[t._v("Accept Terms of Use")])]),t._m(0)])])])},G=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"submit"},[n("button",{attrs:{type:"submit"}},[t._v("Submit")])])}],F=(n("4de4"),n("d81d"),{data:function(){return{email:"",age:null,password:"",confirmPassword:"",country:"usa",hobbyInputs:[],terms:!1}},methods:{onAddHobby:function(){var t={id:Math.random()*Math.random()*1e3,value:""};this.hobbyInputs.push(t)},onDeleteHobby:function(t){this.hobbyInputs=this.hobbyInputs.filter((function(e){return e.id!==t}))},onSubmit:function(){var t={email:this.email,age:this.age,password:this.password,confirmPassword:this.confirmPassword,country:this.country,hobbies:this.hobbyInputs.map((function(t){return t.value})),terms:this.terms};console.log(t)}}}),K=F,W=(n("035d"),Object(c["a"])(K,Z,G,!1,null,"53e9d4e8",null)),R=W.exports,X=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"signin"}},[n("div",{staticClass:"signin-form"},[n("h2",{staticClass:"title"},[t._v("Login")]),n("form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[n("div",{staticClass:"input",class:{invalid:t.$v.mobile.$error}},[n("label",{attrs:{for:"mobile"}},[t._v("Mobile Number")]),n("input",{directives:[{name:"model",rawName:"v-model.trim.number",value:t.mobile,expression:"mobile",modifiers:{trim:!0,number:!0}}],attrs:{type:"text",id:"mobile"},domProps:{value:t.mobile},on:{blur:[function(e){return t.$v.mobile.$touch()},function(e){return t.$forceUpdate()}],input:function(e){e.target.composing||(t.mobile=t._n(e.target.value.trim()))}}}),!t.$v.mobile.required&&t.$v.mobile.$dirty?n("span",{staticClass:"error-msg"},[t._v("Mobile-Number field is requird.")]):t._e(),t.$v.mobile.valid?t._e():n("span",{staticClass:"error-msg"},[t._v("Mobile-Number format is invalid.")])]),n("div",{staticClass:"input",class:{invalid:t.$v.password.$error}},[n("label",{attrs:{for:"password"}},[t._v("Password")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",id:"password"},domProps:{value:t.password},on:{blur:function(e){return t.$v.password.$touch()},input:function(e){e.target.composing||(t.password=e.target.value)}}}),!t.$v.password.required&&t.$v.password.$dirty?n("span",{staticClass:"error-msg"},[t._v("Password field is requird.")]):t._e(),!t.$v.password.minLen&&t.$v.password.$dirty?n("span",{staticClass:"error-msg"},[t._v("Password field must at least "+t._s(t.$v.password.$params.minLen.min)+" characters.")]):t._e()]),t._m(0)])])])},Q=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"submit"},[n("button",{attrs:{type:"submit"}},[t._v("Submit")])])}],tt=n("b5ae"),et=tt["helpers"].regex("mobile",/^9(1[0-9]|3[1-9]|2[1-9])( |-)?[0-9]{3}( |-)?[0-9]{4}$/),nt={data:function(){return{mobile:"",password:"",connd:!0,serverErrors:{mobile:null,password:null}}},validations:{mobile:{required:tt["required"],valid:et},password:{required:tt["required"],minLen:Object(tt["minLength"])(6)}},methods:{onSubmit:function(){var t=this,e={mobile:this.mobile,password:this.password};this.$v.$touch(),!this.$v.$invalid&&this.$v.$anyDirty?this.$store.dispatch("login",{mobile:e.mobile,password:e.password}).then((function(e){if(e.data.status)t.$toast.success("You logged in successfully !","Back-End"),t.password="";else{console.log(e.data);var n=e.data.errors;for(var r in n)t.$toast.error(n[r],"Back-End")}})):console.log("not sumbit")}}},rt=nt,st=(n("d42a"),Object(c["a"])(rt,X,Q,!1,null,"c274d692",null)),ot=st.exports;r["a"].use(y["a"]);var it=[{path:"/",component:V},{path:"/signup",component:R},{path:"/signin",component:ot},{path:"/dashboard",component:J,beforeEnter:function(t,e,n){j.state.idToken?n():n("/signin")}}],at=new y["a"]({mode:"history",routes:it});r["a"].use(g.a),r["a"].use(w.a),new r["a"]({el:"#app",router:at,store:j,render:function(t){return t(h)}})},6:function(t,e){},7:function(t,e){},8:function(t,e){},"85ec":function(t,e,n){},8963:function(t,e,n){"use strict";n("407b")},9:function(t,e){},cb6f:function(t,e,n){},d42a:function(t,e,n){"use strict";n("d558")},d558:function(t,e,n){},db3a:function(t,e,n){}});
//# sourceMappingURL=app.2dfcb427.js.map