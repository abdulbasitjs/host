const X="[0-9A-Za-z-]+",P=`(?:\\+(${X}(?:\\.${X})*))`,_="0|[1-9]\\d*",g="[0-9]+",F="\\d*[a-zA-Z-][a-zA-Z0-9-]*",q=`(?:${g}|${F})`,D=`(?:-?(${q}(?:\\.${q})*))`,E=`(?:${_}|${F})`,k=`(?:-(${E}(?:\\.${E})*))`,V=`${_}|x|X|\\*`,d=`[v=\\s]*(${V})(?:\\.(${V})(?:\\.(${V})(?:${k})?${P}?)?)?`,J=`^\\s*(${d})\\s+-\\s+(${d})\\s*$`,Q=`(${g})\\.(${g})\\.(${g})`,W=`[v=\\s]*${Q}${D}?${P}?`,L="((?:<|>)?=?)",Y=`(\\s*)${L}\\s*(${W}|${d})`,B="(?:~>?)",A=`(\\s*)${B}\\s+`,G="(?:\\^)",j=`(\\s*)${G}\\s+`,m="(<|>)?=?\\s*\\*",ee=`^${G}${d}$`,re=`(${_})\\.(${_})\\.(${_})`,te=`v?${re}${k}?${P}?`,ne=`^${B}${d}$`,se=`^${L}\\s*${d}$`,ie=`^${L}\\s*(${te})$|^$`,$e="^\\s*>=\\s*0.0.0\\s*$";function o(e){return new RegExp(e)}function u(e){return!e||e.toLowerCase()==="x"||e==="*"}function H(...e){return n=>e.reduce((i,r)=>r(i),n)}function z(e){return e.match(o(ie))}function U(e,n,i,r){const t=`${e}.${n}.${i}`;return r?`${t}-${r}`:t}function ue(e){return e.replace(o(J),(n,i,r,t,s,$,c,a,f,l,R,p)=>(u(r)?i="":u(t)?i=`>=${r}.0.0`:u(s)?i=`>=${r}.${t}.0`:i=`>=${i}`,u(f)?a="":u(l)?a=`<${+f+1}.0.0-0`:u(R)?a=`<${f}.${+l+1}.0-0`:p?a=`<=${f}.${l}.${R}-${p}`:a=`<=${a}`,`${i} ${a}`.trim()))}function ce(e){return e.replace(o(Y),"$1$2$3")}function ae(e){return e.replace(o(A),"$1~")}function fe(e){return e.replace(o(j),"$1^")}function le(e){return e.trim().split(/\s+/).map(n=>n.replace(o(ee),(i,r,t,s,$)=>u(r)?"":u(t)?`>=${r}.0.0 <${+r+1}.0.0-0`:u(s)?r==="0"?`>=${r}.${t}.0 <${r}.${+t+1}.0-0`:`>=${r}.${t}.0 <${+r+1}.0.0-0`:$?r==="0"?t==="0"?`>=${r}.${t}.${s}-${$} <${r}.${t}.${+s+1}-0`:`>=${r}.${t}.${s}-${$} <${r}.${+t+1}.0-0`:`>=${r}.${t}.${s}-${$} <${+r+1}.0.0-0`:r==="0"?t==="0"?`>=${r}.${t}.${s} <${r}.${t}.${+s+1}-0`:`>=${r}.${t}.${s} <${r}.${+t+1}.0-0`:`>=${r}.${t}.${s} <${+r+1}.0.0-0`)).join(" ")}function oe(e){return e.trim().split(/\s+/).map(n=>n.replace(o(ne),(i,r,t,s,$)=>u(r)?"":u(t)?`>=${r}.0.0 <${+r+1}.0.0-0`:u(s)?`>=${r}.${t}.0 <${r}.${+t+1}.0-0`:$?`>=${r}.${t}.${s}-${$} <${r}.${+t+1}.0-0`:`>=${r}.${t}.${s} <${r}.${+t+1}.0-0`)).join(" ")}function pe(e){return e.split(/\s+/).map(n=>n.trim().replace(o(se),(i,r,t,s,$,c)=>{const a=u(t),f=a||u(s),l=f||u($);return r==="="&&l&&(r=""),c="",a?r===">"||r==="<"?"<0.0.0-0":"*":r&&l?(f&&(s=0),$=0,r===">"?(r=">=",f?(t=+t+1,s=0,$=0):(s=+s+1,$=0)):r==="<="&&(r="<",f?t=+t+1:s=+s+1),r==="<"&&(c="-0"),`${r+t}.${s}.${$}${c}`):f?`>=${t}.0.0${c} <${+t+1}.0.0-0`:l?`>=${t}.${s}.0${c} <${t}.${+s+1}.0-0`:i})).join(" ")}function de(e){return e.trim().replace(o(m),"")}function _e(e){return e.trim().replace(o($e),"")}function w(e,n){return e=+e||e,n=+n||n,e>n?1:e===n?0:-1}function Re(e,n){const{preRelease:i}=e,{preRelease:r}=n;if(i===void 0&&r)return 1;if(i&&r===void 0)return-1;if(i===void 0&&r===void 0)return 0;for(let t=0,s=i.length;t<=s;t++){const $=i[t],c=r[t];if($!==c)return $===void 0&&c===void 0?0:$?c?w($,c):-1:1}return 0}function h(e,n){return w(e.major,n.major)||w(e.minor,n.minor)||w(e.patch,n.patch)||Re(e,n)}function x(e,n){return e.version===n.version}function he(e,n){switch(e.operator){case"":case"=":return x(e,n);case">":return h(e,n)<0;case">=":return x(e,n)||h(e,n)<0;case"<":return h(e,n)>0;case"<=":return x(e,n)||h(e,n)>0;case void 0:return!0;default:return!1}}function ge(e){return H(le,oe,pe,de)(e)}function we(e){return H(ue,ce,ae,fe)(e.trim()).split(/\s+/).join(" ")}function ve(e,n){if(!e)return!1;const t=we(n).split(" ").map(p=>ge(p)).join(" ").split(/\s+/).map(p=>_e(p)),s=z(e);if(!s)return!1;const[,$,,c,a,f,l]=s,R={operator:$,version:U(c,a,f,l),major:c,minor:a,patch:f,preRelease:l?.split(".")};for(const p of t){const y=z(p);if(!y)return!1;const[,M,,I,O,S,T]=y,N={operator:M,version:U(I,O,S,T),major:I,minor:O,patch:S,preRelease:T?.split(".")};if(!he(N,R))return!1}return!0}const Z={},v={react:{get:()=>()=>C(new URL("__federation_shared_react-CsUMYuEf.js",import.meta.url).href),import:!0},"react-dom":{get:()=>()=>C(new URL("__federation_shared_react-dom-Dnnd693R.js",import.meta.url).href),import:!0},"@account-upgrade-ui/assets":{get:()=>()=>C(new URL("__federation_shared_@account-upgrade-ui/assets-DMJyaoKb.js",import.meta.url).href),import:!0}},b=Object.create(null);async function Ve(e,n="default"){return b[e]?new Promise(i=>i(b[e])):await be(e,n)||Te(e)}async function C(e){return Z[e]??=import(e),Z[e]}async function be(e,n){let i=null;if(globalThis?.__federation_shared__?.[n]?.[e]){const r=globalThis.__federation_shared__[n][e],t=Object.keys(r)[0],s=Object.values(r)[0];v[e]?.requiredVersion?ve(t,v[e].requiredVersion)?i=await(await s.get())():console.log(`provider support ${e}(${t}) is not satisfied requiredVersion(\${moduleMap[name].requiredVersion})`):i=await(await s.get())()}if(i)return K(i,e)}async function Te(e){if(v[e]?.import){let n=await(await v[e].get())();return K(n,e)}else console.error("consumer config import=false,so cant use callback shared module")}function K(e,n){return typeof e.default=="function"?(Object.keys(e).forEach(i=>{i!=="default"&&(e.default[i]=e[i])}),b[n]=e.default,e.default):(e.default&&(e=Object.assign({},e.default,e)),b[n]=e,e)}export{Ve as importShared,Te as importSharedLocal,be as importSharedRuntime};