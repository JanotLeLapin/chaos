var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t){t.parentNode.removeChild(t)}let s;function i(t){s=t}const l=[],a=[],f=[],d=[],p=Promise.resolve();let h=!1;function $(t){f.push(t)}let m=!1;const g=new Set;function b(){if(!m){m=!0;do{for(let t=0;t<l.length;t+=1){const n=l[t];i(n),y(n.$$)}for(i(null),l.length=0;a.length;)a.pop()();for(let t=0;t<f.length;t+=1){const n=f[t];g.has(n)||(g.add(n),n())}f.length=0}while(l.length);for(;d.length;)d.pop()();h=!1,m=!1,g.clear()}}function y(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach($)}}const _=new Set;function x(t,n){-1===t.$$.dirty[0]&&(l.push(t),h||(h=!0,p.then(b)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function k(c,l,a,f,d,p,h=[-1]){const m=s;i(c);const g=c.$$={fragment:null,ctx:null,props:p,update:t,not_equal:d,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(m?m.$$.context:l.context||[]),callbacks:e(),dirty:h,skip_bound:!1};let y=!1;if(g.ctx=a?a(c,l.props||{},((t,n,...e)=>{const o=e.length?e[0]:n;return g.ctx&&d(g.ctx[t],g.ctx[t]=o)&&(!g.skip_bound&&g.bound[t]&&g.bound[t](o),y&&x(c,t)),n})):[],g.update(),y=!0,o(g.before_update),g.fragment=!!f&&f(g.ctx),l.target){if(l.hydrate){const t=function(t){return Array.from(t.childNodes)}(l.target);g.fragment&&g.fragment.l(t),t.forEach(u)}else g.fragment&&g.fragment.c();l.intro&&((k=c.$$.fragment)&&k.i&&(_.delete(k),k.i(v))),function(t,e,c,u){const{fragment:s,on_mount:i,on_destroy:l,after_update:a}=t.$$;s&&s.m(e,c),u||$((()=>{const e=i.map(n).filter(r);l?l.push(...e):o(e),t.$$.on_mount=[]})),a.forEach($)}(c,l.target,l.anchor,l.customElement),b()}var k,v;i(m)}function v(n){let e;return{c(){var t,n,o,r;t="main",e=document.createElement(t),e.innerHTML="<h1>Svelte rules</h1>",n=e,o="class",null==(r="svelte-zgk5oh")?n.removeAttribute(o):n.getAttribute(o)!==r&&n.setAttribute(o,r)},m(t,n){!function(t,n,e){t.insertBefore(n,e||null)}(t,e,n)},p:t,i:t,o:t,d(t){t&&u(e)}}}return new class extends class{$destroy(){!function(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),k(this,t,null,v,c,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map