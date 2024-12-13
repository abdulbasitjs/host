"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const O=require("react"),_=t=>{let r;const e=new Set,s=(i,h)=>{const f=typeof i=="function"?i(r):i;if(!Object.is(f,r)){const g=r;r=h??(typeof f!="object"||f===null)?f:Object.assign({},r,f),e.forEach(S=>S(r,g))}},a=()=>r,u={setState:s,getState:a,getInitialState:()=>d,subscribe:i=>(e.add(i),()=>e.delete(i))},d=r=t(s,a,u);return u},w=t=>t?_(t):_,E=t=>t;function P(t,r=E){const e=O.useSyncExternalStore(t.subscribe,()=>r(t.getState()),()=>r(t.getInitialState()));return O.useDebugValue(e),e}const F=t=>{const r=w(t),e=s=>P(r,s);return Object.assign(e,r),e},j=t=>F;function I(t,r){let e;try{e=t()}catch{return}return{getItem:a=>{var o;const m=d=>d===null?null:JSON.parse(d,void 0),u=(o=e.getItem(a))!=null?o:null;return u instanceof Promise?u.then(m):m(u)},setItem:(a,o)=>e.setItem(a,JSON.stringify(o,void 0)),removeItem:a=>e.removeItem(a)}}const b=t=>r=>{try{const e=t(r);return e instanceof Promise?e:{then(s){return b(s)(e)},catch(s){return this}}}catch(e){return{then(s){return this},catch(s){return b(s)(e)}}}},J=(t,r)=>(e,s,a)=>{let o={storage:I(()=>localStorage),partialize:n=>n,version:0,merge:(n,v)=>({...v,...n}),...r},m=!1;const u=new Set,d=new Set;let i=o.storage;if(!i)return t((...n)=>{console.warn(`[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`),e(...n)},s,a);const h=()=>{const n=o.partialize({...s()});return i.setItem(o.name,{state:n,version:o.version})},f=a.setState;a.setState=(n,v)=>{f(n,v),h()};const g=t((...n)=>{e(...n),h()},s,a);a.getInitialState=()=>g;let S;const A=()=>{var n,v;if(!i)return;m=!1,u.forEach(c=>{var l;return c((l=s())!=null?l:g)});const p=((v=o.onRehydrateStorage)==null?void 0:v.call(o,(n=s())!=null?n:g))||void 0;return b(i.getItem.bind(i))(o.name).then(c=>{if(c)if(typeof c.version=="number"&&c.version!==o.version){if(o.migrate){const l=o.migrate(c.state,c.version);return l instanceof Promise?l.then(y=>[!0,y]):[!0,l]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,c.state];return[!1,void 0]}).then(c=>{var l;const[y,R]=c;if(S=o.merge(R,(l=s())!=null?l:g),e(S,!0),y)return h()}).then(()=>{p==null||p(S,void 0),S=s(),m=!0,d.forEach(c=>c(S))}).catch(c=>{p==null||p(void 0,c)})};return a.persist={setOptions:n=>{o={...o,...n},n.storage&&(i=n.storage)},clearStorage:()=>{i==null||i.removeItem(o.name)},getOptions:()=>o,rehydrate:()=>A(),hasHydrated:()=>m,onHydrate:n=>(u.add(n),()=>{u.delete(n)}),onFinishHydration:n=>(d.add(n),()=>{d.delete(n)})},o.skipHydration||A(),S||g},H=J,M=j()(H(t=>({isAuthenticated:!0,setAuthenticated:r=>t({isAuthenticated:r}),logout:()=>t({isAuthenticated:!1})}),{name:"auth-storage",storage:I(()=>localStorage),partialize:t=>({isAuthenticated:t.isAuthenticated})})),N=j()(H(t=>({isStandalone:!1,setStandalone:r=>t({isStandalone:r})}),{name:"app-mode-storage",storage:I(()=>localStorage),partialize:t=>({isStandalone:t.isStandalone})}));exports.useAppModeStore=N;exports.useAuthStore=M;
