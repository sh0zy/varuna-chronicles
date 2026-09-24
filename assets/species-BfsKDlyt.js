(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Aa="186",_v={ROTATE:0,DOLLY:1,PAN:2},Mv={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Yh=0,ul=1,Zh=2,ur=1,Fc=2,as=3,fi=0,Ke=1,Xe=2,zn=0,hs=1,xs=2,fl=3,dl=4,Kh=5,Ni=100,Jh=101,$h=102,Qh=103,jh=104,tu=200,eu=201,nu=202,iu=203,Oc=204,zc=205,su=206,ru=207,ou=208,au=209,lu=210,cu=211,hu=212,uu=213,fu=214,Io=0,Do=1,No=2,vs=3,Uo=4,Fo=5,Oo=6,zo=7,Ra=0,du=1,pu=2,Tn=0,Bc=1,kc=2,Hc=3,Ca=4,Gc=5,Vc=6,Wc=7,pl="attached",mu="detached",Xc=300,di=301,Hi=302,Hr=303,Gr=304,Dr=306,_s=1e3,wn=1001,Bo=1002,Oe=1003,gu=1004,Is=1005,Ae=1006,Vr=1007,On=1008,tn=1009,qc=1010,Yc=1011,Ms=1012,Pa=1013,An=1014,an=1015,xn=1016,La=1017,Ia=1018,Ss=1020,Zc=35902,Kc=35899,Jc=1021,$c=1022,Ze=1023,kn=1026,hi=1027,Da=1028,Na=1029,pi=1030,Ua=1031,Fa=1033,fr=33776,dr=33777,pr=33778,mr=33779,ko=35840,Ho=35841,Go=35842,Vo=35843,Wo=36196,Xo=37492,qo=37496,Yo=37488,Zo=37489,Mr=37490,Ko=37491,Jo=37808,$o=37809,Qo=37810,jo=37811,ta=37812,ea=37813,na=37814,ia=37815,sa=37816,ra=37817,oa=37818,aa=37819,la=37820,ca=37821,ha=36492,ua=36494,fa=36495,da=36283,pa=36284,Sr=36285,ma=36286,xu=3200,Sv=3201,yr=0,vu=1,jn="",Fe="srgb",br="srgb-linear",wr="linear",ue="srgb",Wr=7680,_u=519,Mu=512,Su=513,yu=514,Oa=515,bu=516,wu=517,za=518,Eu=519,Tu=35044,ml="300 es",En=2e3,ys=2001;function Au(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function bs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ru(){const i=bs("canvas");return i.style.display="block",i}const gl={};function xl(...i){const t="THREE."+i.shift();console.log(t,...i)}function Qc(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Vt(...i){i=Qc(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function ae(...i){i=Qc(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function zi(...i){const t=i.join(" ");t in gl||(gl[t]=!0,Vt(...i))}function Cu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Pu={[Io]:Do,[No]:Oo,[Uo]:zo,[vs]:Fo,[Do]:Io,[Oo]:No,[zo]:Uo,[Fo]:vs};class ei{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const He=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],gr=Math.PI/180,ga=180/Math.PI;function gi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(He[i&255]+He[i>>8&255]+He[i>>16&255]+He[i>>24&255]+"-"+He[t&255]+He[t>>8&255]+"-"+He[t>>16&15|64]+He[t>>24&255]+"-"+He[e&63|128]+He[e>>8&255]+"-"+He[e>>16&255]+He[e>>24&255]+He[n&255]+He[n>>8&255]+He[n>>16&255]+He[n>>24&255]).toLowerCase()}function ne(i,t,e){return Math.max(t,Math.min(e,i))}function Lu(i,t){return(i%t+t)%t}function Xr(i,t,e){return(1-e)*i+e*t}function Ki(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Je(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const yv={DEG2RAD:gr};class mt{static{mt.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ne(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ln{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],f=n[s+3],u=r[o+0],d=r[o+1],g=r[o+2],v=r[o+3];if(f!==v||l!==u||c!==d||h!==g){let m=l*u+c*d+h*g+f*v;m<0&&(u=-u,d=-d,g=-g,v=-v,m=-m);let p=1-a;if(m<.9995){const y=Math.acos(m),T=Math.sin(y);p=Math.sin(p*y)/T,a=Math.sin(a*y)/T,l=l*p+u*a,c=c*p+d*a,h=h*p+g*a,f=f*p+v*a}else{l=l*p+u*a,c=c*p+d*a,h=h*p+g*a,f=f*p+v*a;const y=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=y,c*=y,h*=y,f*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],f=r[o],u=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*f+l*d-c*u,t[e+1]=l*g+h*u+c*f-a*d,t[e+2]=c*g+h*d+a*u-l*f,t[e+3]=h*g-a*f-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),f=a(r/2),u=l(n/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"YXZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"ZXY":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"ZYX":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"YZX":this._x=u*h*f+c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f-u*d*g;break;case"XZY":this._x=u*h*f-c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f+u*d*g;break;default:Vt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=n+a+f;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(n>a&&n>f){const d=2*Math.sqrt(1+n-a-f);this._w=(h-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-n-f);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+f-n-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ne(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){const c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{static{L.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(vl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(vl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),f=2*(r*n-o*e);return this.x=e+l*c+o*f-a*h,this.y=n+l*h+a*c-r*f,this.z=s+l*f+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ne(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return qr.copy(this).projectOnVector(t),this.sub(qr)}reflect(t){return this.sub(qr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qr=new L,vl=new ln;class $t{static{$t.prototype.isMatrix3=!0}constructor(t,e,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],f=n[7],u=n[2],d=n[5],g=n[8],v=s[0],m=s[3],p=s[6],y=s[1],T=s[4],_=s[7],R=s[2],S=s[5],P=s[8];return r[0]=o*v+a*y+l*R,r[3]=o*m+a*T+l*S,r[6]=o*p+a*_+l*P,r[1]=c*v+h*y+f*R,r[4]=c*m+h*T+f*S,r[7]=c*p+h*_+f*P,r[2]=u*v+d*y+g*R,r[5]=u*m+d*T+g*S,r[8]=u*p+d*_+g*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],f=h*o-a*c,u=a*l-h*r,d=c*r-o*l,g=e*f+n*u+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=f*v,t[1]=(s*c-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=u*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(n*l-c*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return zi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Yr.makeScale(t,e)),this}rotate(t){return zi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Yr.makeRotation(-t)),this}translate(t,e){return zi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Yr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Yr=new $t,_l=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ml=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Iu(){const i={enabled:!0,workingColorSpace:br,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ue&&(s.r=Bn(s.r),s.g=Bn(s.g),s.b=Bn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ue&&(s.r=Bi(s.r),s.g=Bi(s.g),s.b=Bi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===jn?wr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return zi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return zi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[br]:{primaries:t,whitePoint:n,transfer:wr,toXYZ:_l,fromXYZ:Ml,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Fe},outputColorSpaceConfig:{drawingBufferColorSpace:Fe}},[Fe]:{primaries:t,whitePoint:n,transfer:ue,toXYZ:_l,fromXYZ:Ml,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Fe}}}),i}const re=Iu();function Bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Bi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let _i;class Du{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{_i===void 0&&(_i=bs("canvas")),_i.width=t.width,_i.height=t.height;const s=_i.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=_i}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=bs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Bn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Bn(e[n]/255)*255):e[n]=Bn(e[n]);return{data:e,width:t.width,height:t.height}}else return Vt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Nu=0;class Ba{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=gi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Zr(s[o].image)):r.push(Zr(s[o]))}else r=Zr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Zr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Du.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Vt("Texture: Unable to serialize Texture."),{})}let Uu=0;const Kr=new L;class ze extends ei{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,n=wn,s=wn,r=Ae,o=On,a=Ze,l=tn,c=ze.DEFAULT_ANISOTROPY,h=jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=gi(),this.name="",this.source=new Ba(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Kr).x}get height(){return this.source.getSize(Kr).y}get depth(){return this.source.getSize(Kr).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Vt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Vt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _s:t.x=t.x-Math.floor(t.x);break;case wn:t.x=t.x<0?0:1;break;case Bo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _s:t.y=t.y-Math.floor(t.y);break;case wn:t.y=t.y<0?0:1;break;case Bo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=Xc;ze.DEFAULT_ANISOTROPY=1;class fe{static{fe.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(c+1)/2,_=(d+1)/2,R=(p+1)/2,S=(h+u)/4,P=(f+v)/4,x=(g+m)/4;return T>_&&T>R?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=S/n,r=P/n):_>R?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=S/s,r=x/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=P/r,s=x/r),this.set(n,s,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(f-v)*(f-v)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(f-v)/y,this.z=(u-h)/y,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this.w=ne(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this.w=ne(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ne(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fu extends ei{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ae,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:n.depth},r=new ze(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Ae,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ba(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gn extends Fu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class jc extends ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ou extends ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class Jt{static{Jt.prototype.isMatrix4=!0}constructor(t,e,n,s,r,o,a,l,c,h,f,u,d,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,f,u,d,g,v,m)}set(t,e,n,s,r,o,a,l,c,h,f,u,d,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=f,p[14]=u,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Jt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Mi.setFromMatrixColumn(t,0).length(),r=1/Mi.setFromMatrixColumn(t,1).length(),o=1/Mi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const u=o*h,d=o*f,g=a*h,v=a*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=d+g*c,e[5]=u-v*c,e[9]=-a*l,e[2]=v-u*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const u=l*h,d=l*f,g=c*h,v=c*f;e[0]=u+v*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*f,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=v+u*a,e[10]=o*l}else if(t.order==="ZXY"){const u=l*h,d=l*f,g=c*h,v=c*f;e[0]=u-v*a,e[4]=-o*f,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=v-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const u=o*h,d=o*f,g=a*h,v=a*f;e[0]=l*h,e[4]=g*c-d,e[8]=u*c+v,e[1]=l*f,e[5]=v*c+u,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const u=o*l,d=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=v-u*f,e[8]=g*f+d,e[1]=f,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*f+g,e[10]=u-v*f}else if(t.order==="XZY"){const u=o*l,d=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+v,e[5]=o*h,e[9]=d*f-g,e[2]=g*f-d,e[6]=a*h,e[10]=v*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(zu,t,Bu)}lookAt(t,e,n){const s=this.elements;return Qe.subVectors(t,e),Qe.lengthSq()===0&&(Qe.z=1),Qe.normalize(),qn.crossVectors(n,Qe),qn.lengthSq()===0&&(Math.abs(n.z)===1?Qe.x+=1e-4:Qe.z+=1e-4,Qe.normalize(),qn.crossVectors(n,Qe)),qn.normalize(),Ds.crossVectors(Qe,qn),s[0]=qn.x,s[4]=Ds.x,s[8]=Qe.x,s[1]=qn.y,s[5]=Ds.y,s[9]=Qe.y,s[2]=qn.z,s[6]=Ds.z,s[10]=Qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],f=n[5],u=n[9],d=n[13],g=n[2],v=n[6],m=n[10],p=n[14],y=n[3],T=n[7],_=n[11],R=n[15],S=s[0],P=s[4],x=s[8],b=s[12],w=s[1],D=s[5],U=s[9],E=s[13],C=s[2],N=s[6],O=s[10],H=s[14],X=s[3],k=s[7],V=s[11],W=s[15];return r[0]=o*S+a*w+l*C+c*X,r[4]=o*P+a*D+l*N+c*k,r[8]=o*x+a*U+l*O+c*V,r[12]=o*b+a*E+l*H+c*W,r[1]=h*S+f*w+u*C+d*X,r[5]=h*P+f*D+u*N+d*k,r[9]=h*x+f*U+u*O+d*V,r[13]=h*b+f*E+u*H+d*W,r[2]=g*S+v*w+m*C+p*X,r[6]=g*P+v*D+m*N+p*k,r[10]=g*x+v*U+m*O+p*V,r[14]=g*b+v*E+m*H+p*W,r[3]=y*S+T*w+_*C+R*X,r[7]=y*P+T*D+_*N+R*k,r[11]=y*x+T*U+_*O+R*V,r[15]=y*b+T*E+_*H+R*W,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],d=t[14],g=t[3],v=t[7],m=t[11],p=t[15],y=l*d-c*u,T=a*d-c*f,_=a*u-l*f,R=o*d-c*h,S=o*u-l*h,P=o*f-a*h;return e*(v*y-m*T+p*_)-n*(g*y-m*R+p*S)+s*(g*T-v*R+p*P)-r*(g*_-v*S+m*P)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],d=t[11],g=t[12],v=t[13],m=t[14],p=t[15],y=e*a-n*o,T=e*l-s*o,_=e*c-r*o,R=n*l-s*a,S=n*c-r*a,P=s*c-r*l,x=h*v-f*g,b=h*m-u*g,w=h*p-d*g,D=f*m-u*v,U=f*p-d*v,E=u*p-d*m,C=y*E-T*U+_*D+R*w-S*b+P*x;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/C;return t[0]=(a*E-l*U+c*D)*N,t[1]=(s*U-n*E-r*D)*N,t[2]=(v*P-m*S+p*R)*N,t[3]=(u*S-f*P-d*R)*N,t[4]=(l*w-o*E-c*b)*N,t[5]=(e*E-s*w+r*b)*N,t[6]=(m*_-g*P-p*T)*N,t[7]=(h*P-u*_+d*T)*N,t[8]=(o*U-a*w+c*x)*N,t[9]=(n*w-e*U-r*x)*N,t[10]=(g*S-v*_+p*y)*N,t[11]=(f*_-h*S-d*y)*N,t[12]=(a*b-o*D-l*x)*N,t[13]=(e*D-n*b+s*x)*N,t[14]=(v*T-g*R-m*y)*N,t[15]=(h*R-f*T+u*y)*N,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,f=a+a,u=r*c,d=r*h,g=r*f,v=o*h,m=o*f,p=a*f,y=l*c,T=l*h,_=l*f,R=n.x,S=n.y,P=n.z;return s[0]=(1-(v+p))*R,s[1]=(d+_)*R,s[2]=(g-T)*R,s[3]=0,s[4]=(d-_)*S,s[5]=(1-(u+p))*S,s[6]=(m+y)*S,s[7]=0,s[8]=(g+T)*P,s[9]=(m-y)*P,s[10]=(1-(u+v))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Mi.set(s[0],s[1],s[2]).length();const a=Mi.set(s[4],s[5],s[6]).length(),l=Mi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),un.copy(this);const c=1/o,h=1/a,f=1/l;return un.elements[0]*=c,un.elements[1]*=c,un.elements[2]*=c,un.elements[4]*=h,un.elements[5]*=h,un.elements[6]*=h,un.elements[8]*=f,un.elements[9]*=f,un.elements[10]*=f,e.setFromRotationMatrix(un),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,s,r,o,a=En,l=!1){const c=this.elements,h=2*r/(e-t),f=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let g,v;if(l)g=r/(o-r),v=o*r/(o-r);else if(a===En)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===ys)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=En,l=!1){const c=this.elements,h=2/(e-t),f=2/(n-s),u=-(e+t)/(e-t),d=-(n+s)/(n-s);let g,v;if(l)g=1/(o-r),v=o/(o-r);else if(a===En)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===ys)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Mi=new L,un=new Jt,zu=new L(0,0,0),Bu=new L(1,1,1),qn=new L,Ds=new L,Qe=new L,Sl=new Jt,yl=new ln;class Rn{constructor(t=0,e=0,n=0,s=Rn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],f=s[2],u=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ne(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ne(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Vt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Sl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Sl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return yl.setFromEuler(this),this.setFromQuaternion(yl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Rn.DEFAULT_ORDER="XYZ";class th{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ku=0;const bl=new L,Si=new ln,Pn=new Jt,Ns=new L,Ji=new L,Hu=new L,Gu=new ln,wl=new L(1,0,0),El=new L(0,1,0),Tl=new L(0,0,1),Al={type:"added"},Vu={type:"removed"},yi={type:"childadded",child:null},Jr={type:"childremoved",child:null};class Re extends ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Re.DEFAULT_UP.clone();const t=new L,e=new Rn,n=new ln,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Jt},normalMatrix:{value:new $t}}),this.matrix=new Jt,this.matrixWorld=new Jt,this.matrixAutoUpdate=Re.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new th,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.multiply(Si),this}rotateOnWorldAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.premultiply(Si),this}rotateX(t){return this.rotateOnAxis(wl,t)}rotateY(t){return this.rotateOnAxis(El,t)}rotateZ(t){return this.rotateOnAxis(Tl,t)}translateOnAxis(t,e){return bl.copy(t).applyQuaternion(this.quaternion),this.position.add(bl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(wl,t)}translateY(t){return this.translateOnAxis(El,t)}translateZ(t){return this.translateOnAxis(Tl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ns.copy(t):Ns.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ji.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(Ji,Ns,this.up):Pn.lookAt(Ns,Ji,this.up),this.quaternion.setFromRotationMatrix(Pn),s&&(Pn.extractRotation(s.matrixWorld),Si.setFromRotationMatrix(Pn),this.quaternion.premultiply(Si.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(ae("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Al),yi.child=t,this.dispatchEvent(yi),yi.child=null):ae("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Vu),Jr.child=t,this.dispatchEvent(Jr),Jr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Pn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Al),yi.child=t,this.dispatchEvent(yi),yi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ji,t,Hu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ji,Gu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),f=o(t.shapes),u=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Re.DEFAULT_UP=new L(0,1,0);Re.DEFAULT_MATRIX_AUTO_UPDATE=!0;Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class xe extends Re{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wu={type:"move"};class $r{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&u>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Wu)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new xe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const eh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yn={h:0,s:0,l:0},Us={h:0,s:0,l:0};function Qr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class at{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=re.workingColorSpace){return this.r=t,this.g=e,this.b=n,re.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=re.workingColorSpace){if(t=Lu(t,1),e=ne(e,0,1),n=ne(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Qr(o,r,t+1/3),this.g=Qr(o,r,t),this.b=Qr(o,r,t-1/3)}return re.colorSpaceToWorking(this,s),this}setStyle(t,e=Fe){function n(r){r!==void 0&&parseFloat(r)<1&&Vt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Vt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Vt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Fe){const n=eh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Vt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Bn(t.r),this.g=Bn(t.g),this.b=Bn(t.b),this}copyLinearToSRGB(t){return this.r=Bi(t.r),this.g=Bi(t.g),this.b=Bi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Fe){return re.workingToColorSpace(Ge.copy(this),t),Math.round(ne(Ge.r*255,0,255))*65536+Math.round(ne(Ge.g*255,0,255))*256+Math.round(ne(Ge.b*255,0,255))}getHexString(t=Fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.workingToColorSpace(Ge.copy(this),e);const n=Ge.r,s=Ge.g,r=Ge.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=h<=.5?f/(o+a):f/(2-o-a),o){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=re.workingColorSpace){return re.workingToColorSpace(Ge.copy(this),e),t.r=Ge.r,t.g=Ge.g,t.b=Ge.b,t}getStyle(t=Fe){re.workingToColorSpace(Ge.copy(this),t);const e=Ge.r,n=Ge.g,s=Ge.b;return t!==Fe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Yn),this.setHSL(Yn.h+t,Yn.s+e,Yn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Yn),t.getHSL(Us);const n=Xr(Yn.h,Us.h,e),s=Xr(Yn.s,Us.s,e),r=Xr(Yn.l,Us.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ge=new at;at.NAMES=eh;class Xu extends Re{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rn,this.environmentIntensity=1,this.environmentRotation=new Rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const fn=new L,Ln=new L,jr=new L,In=new L,bi=new L,wi=new L,Rl=new L,to=new L,eo=new L,no=new L,io=new fe,so=new fe,ro=new fe;class mn{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),fn.subVectors(t,e),s.cross(fn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){fn.subVectors(s,e),Ln.subVectors(n,e),jr.subVectors(t,e);const o=fn.dot(fn),a=fn.dot(Ln),l=fn.dot(jr),c=Ln.dot(Ln),h=Ln.dot(jr),f=o*c-a*a;if(f===0)return r.set(0,0,0),null;const u=1/f,d=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,In)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,In.x),l.addScaledVector(o,In.y),l.addScaledVector(a,In.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return io.setScalar(0),so.setScalar(0),ro.setScalar(0),io.fromBufferAttribute(t,e),so.fromBufferAttribute(t,n),ro.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(io,r.x),o.addScaledVector(so,r.y),o.addScaledVector(ro,r.z),o}static isFrontFacing(t,e,n,s){return fn.subVectors(n,e),Ln.subVectors(t,e),fn.cross(Ln).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return fn.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),fn.cross(Ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return mn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return mn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return mn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return mn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return mn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;bi.subVectors(s,n),wi.subVectors(r,n),to.subVectors(t,n);const l=bi.dot(to),c=wi.dot(to);if(l<=0&&c<=0)return e.copy(n);eo.subVectors(t,s);const h=bi.dot(eo),f=wi.dot(eo);if(h>=0&&f<=h)return e.copy(s);const u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(bi,o);no.subVectors(t,r);const d=bi.dot(no),g=wi.dot(no);if(g>=0&&d<=g)return e.copy(r);const v=d*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(wi,a);const m=h*g-d*f;if(m<=0&&f-h>=0&&d-g>=0)return Rl.subVectors(r,s),a=(f-h)/(f-h+(d-g)),e.copy(s).addScaledVector(Rl,a);const p=1/(m+v+u);return o=v*p,a=u*p,e.copy(n).addScaledVector(bi,o).addScaledVector(wi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class ni{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,dn):dn.fromBufferAttribute(r,o),dn.applyMatrix4(t.matrixWorld),this.expandByPoint(dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Fs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Fs.copy(n.boundingBox)),Fs.applyMatrix4(t.matrixWorld),this.union(Fs)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,dn),dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter($i),Os.subVectors(this.max,$i),Ei.subVectors(t.a,$i),Ti.subVectors(t.b,$i),Ai.subVectors(t.c,$i),Zn.subVectors(Ti,Ei),Kn.subVectors(Ai,Ti),ri.subVectors(Ei,Ai);let e=[0,-Zn.z,Zn.y,0,-Kn.z,Kn.y,0,-ri.z,ri.y,Zn.z,0,-Zn.x,Kn.z,0,-Kn.x,ri.z,0,-ri.x,-Zn.y,Zn.x,0,-Kn.y,Kn.x,0,-ri.y,ri.x,0];return!oo(e,Ei,Ti,Ai,Os)||(e=[1,0,0,0,1,0,0,0,1],!oo(e,Ei,Ti,Ai,Os))?!1:(zs.crossVectors(Zn,Kn),e=[zs.x,zs.y,zs.z],oo(e,Ei,Ti,Ai,Os))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Dn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Dn=[new L,new L,new L,new L,new L,new L,new L,new L],dn=new L,Fs=new ni,Ei=new L,Ti=new L,Ai=new L,Zn=new L,Kn=new L,ri=new L,$i=new L,Os=new L,zs=new L,oi=new L;function oo(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){oi.fromArray(i,r);const a=s.x*Math.abs(oi.x)+s.y*Math.abs(oi.y)+s.z*Math.abs(oi.z),l=t.dot(oi),c=e.dot(oi),h=n.dot(oi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Un=qu();function qu(){const i=new ArrayBuffer(4),t=new Float32Array(i),e=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,s[l]=24,s[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,s[l]=-c-1,s[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,s[l]=13,s[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,s[l]=24,s[l|256]=24):(n[l]=31744,n[l|256]=64512,s[l]=13,s[l|256]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:o,offsetTable:a}}function Yu(i){Math.abs(i)>65504&&Vt("DataUtils.toHalfFloat(): Value out of range."),i=ne(i,-65504,65504),Un.floatView[0]=i;const t=Un.uint32View[0],e=t>>23&511;return Un.baseTable[e]+((t&8388607)>>Un.shiftTable[e])}function Zu(i){const t=i>>10;return Un.uint32View[0]=Un.mantissaTable[Un.offsetTable[t]+(i&1023)]+Un.exponentTable[t],Un.floatView[0]}class Bs{static toHalfFloat(t){return Yu(t)}static fromHalfFloat(t){return Zu(t)}}const Te=new L,ks=new mt;let Ku=0;class Se extends ei{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ku++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Tu,this.updateRanges=[],this.gpuType=an,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ks.fromBufferAttribute(this,e),ks.applyMatrix3(t),this.setXY(e,ks.x,ks.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ki(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Je(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ki(e,this.array)),e}setX(t,e){return this.normalized&&(e=Je(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ki(e,this.array)),e}setY(t,e){return this.normalized&&(e=Je(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ki(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Je(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ki(e,this.array)),e}setW(t,e){return this.normalized&&(e=Je(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Je(e,this.array),n=Je(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Je(e,this.array),n=Je(n,this.array),s=Je(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Je(e,this.array),n=Je(n,this.array),s=Je(s,this.array),r=Je(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class ka extends Se{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class nh extends Se{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Wt extends Se{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Ju=new ni,Qi=new L,ao=new L;class Gn{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Ju.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Qi.subVectors(t,this.center);const e=Qi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Qi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ao.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Qi.copy(t.center).add(ao)),this.expandByPoint(Qi.copy(t.center).sub(ao))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let $u=0;const sn=new Jt,lo=new Re,Ri=new L,je=new ni,ji=new ni,Ie=new L;class le extends ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$u++}),this.uuid=gi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Au(t)?nh:ka)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new $t().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,n){return sn.makeTranslation(t,e,n),this.applyMatrix4(sn),this}scale(t,e,n){return sn.makeScale(t,e,n),this.applyMatrix4(sn),this}lookAt(t){return lo.lookAt(t),lo.updateMatrix(),this.applyMatrix4(lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Wt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Vt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ni);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ae("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];je.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ae('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ae("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];ji.setFromBufferAttribute(a),this.morphTargetsRelative?(Ie.addVectors(je.min,ji.min),je.expandByPoint(Ie),Ie.addVectors(je.max,ji.max),je.expandByPoint(Ie)):(je.expandByPoint(ji.min),je.expandByPoint(ji.max))}je.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ie.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ie));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ie.fromBufferAttribute(a,c),l&&(Ri.fromBufferAttribute(t,c),Ie.add(Ri)),s=Math.max(s,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ae('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){ae("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Se(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const a=[],l=[];for(let x=0;x<n.count;x++)a[x]=new L,l[x]=new L;const c=new L,h=new L,f=new L,u=new mt,d=new mt,g=new mt,v=new L,m=new L;function p(x,b,w){c.fromBufferAttribute(n,x),h.fromBufferAttribute(n,b),f.fromBufferAttribute(n,w),u.fromBufferAttribute(r,x),d.fromBufferAttribute(r,b),g.fromBufferAttribute(r,w),h.sub(c),f.sub(c),d.sub(u),g.sub(u);const D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(D),m.copy(f).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(D),a[x].add(v),a[b].add(v),a[w].add(v),l[x].add(m),l[b].add(m),l[w].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let x=0,b=y.length;x<b;++x){const w=y[x],D=w.start,U=w.count;for(let E=D,C=D+U;E<C;E+=3)p(t.getX(E+0),t.getX(E+1),t.getX(E+2))}const T=new L,_=new L,R=new L,S=new L;function P(x){R.fromBufferAttribute(s,x),S.copy(R);const b=a[x];T.copy(b),T.sub(R.multiplyScalar(R.dot(b))).normalize(),_.crossVectors(S,b);const D=_.dot(l[x])<0?-1:1;o.setXYZW(x,T.x,T.y,T.z,D)}for(let x=0,b=y.length;x<b;++x){const w=y[x],D=w.start,U=w.count;for(let E=D,C=D+U;E<C;E+=3)P(t.getX(E+0)),P(t.getX(E+1)),P(t.getX(E+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Se(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);const s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,f=new L;if(t)for(let u=0,d=t.count;u<d;u+=3){const g=t.getX(u+0),v=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,d=e.count;u<d;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,f=a.normalized,u=new c.constructor(l.length*h);let d=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?d=l[v]*a.data.stride+a.offset:d=l[v]*h;for(let p=0;p<h;p++)u[g++]=c[d++]}return new Se(u,h,f)}if(this.index===null)return Vt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new le,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,f=c.length;h<f;h++){const u=c[h],d=t(u,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){const d=c[f];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],f=r[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const co=new L,Qu=new L,ju=new $t;class Qn{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=co.subVectors(n,e).cross(Qu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(co),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||ju.getNormalMatrix(t),s=this.coplanarPoint(co).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let tf=0;class ii extends ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tf++}),this.uuid=gi(),this.name="",this.type="Material",this.blending=hs,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oc,this.blendDst=zc,this.blendEquation=Ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new at(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_u,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wr,this.stencilZFail=Wr,this.stencilZPass=Wr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Vt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Vt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new at().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Qn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new mt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new mt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Nn=new L,ho=new L,Hs=new L,Gs=new L;class Nr{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Nn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Nn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Nn.copy(this.origin).addScaledVector(this.direction,e),Nn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ho.copy(t).add(e).multiplyScalar(.5),Hs.copy(e).sub(t).normalize(),Gs.copy(this.origin).sub(ho);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Hs),a=Gs.dot(this.direction),l=-Gs.dot(Hs),c=Gs.lengthSq(),h=Math.abs(1-o*o);let f,u,d,g;if(h>0)if(f=o*l-a,u=o*a-l,g=r*h,f>=0)if(u>=-g)if(u<=g){const v=1/h;f*=v,u*=v,d=f*(f+o*u+2*a)+u*(o*f+u+2*l)+c}else u=r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-o*r+a)),u=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-r,-l),r),d=u*(u+2*l)+c):(f=Math.max(0,-(o*r+a)),u=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c);else u=o>0?-r:r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ho).addScaledVector(Hs,u),d}intersectSphere(t,e){if(t.radius<0)return null;Nn.subVectors(t.center,this.origin);const n=Nn.dot(this.direction),s=Nn.dot(Nn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(a=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Nn)!==null}intersectTriangle(t,e,n,s,r){const o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,f=t.x-o.x,u=t.y-o.y,d=t.z-o.z,g=e.x-o.x,v=e.y-o.y,m=e.z-o.z,p=n.x-o.x,y=n.y-o.y,T=n.z-o.z,_=Math.abs(l),R=Math.abs(c),S=Math.abs(h);let P,x,b,w,D,U,E,C,N,O,H,X;if(_>=R&&_>=S?(b=l,U=f,N=g,X=p,l>=0?(P=c,x=h,w=u,D=d,E=v,C=m,O=y,H=T):(P=h,x=c,w=d,D=u,E=m,C=v,O=T,H=y)):R>=S?(b=c,U=u,N=v,X=y,c>=0?(P=h,x=l,w=d,D=f,E=m,C=g,O=T,H=p):(P=l,x=h,w=f,D=d,E=g,C=m,O=p,H=T)):(b=h,U=d,N=m,X=T,h>=0?(P=l,x=c,w=f,D=u,E=g,C=v,O=p,H=y):(P=c,x=l,w=u,D=f,E=v,C=g,O=y,H=p)),b===0)return null;const k=P/b,V=x/b,W=1/b,ut=w-k*U,it=D-V*U,zt=E-k*N,Gt=C-V*N,Xt=O-k*X,Q=H-V*X,K=Xt*Gt-Q*zt,ct=ut*Q-it*Xt,Et=zt*it-Gt*ut;if(s){if(K<0||ct<0||Et<0)return null}else if((K<0||ct<0||Et<0)&&(K>0||ct>0||Et>0))return null;const pt=K+ct+Et;if(pt===0)return null;const ft=W*(K*U+ct*N+Et*X);return(pt>0?ft<0:ft>0)?null:this.at(ft/pt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class us extends ii{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=Ra,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Cl=new Jt,ai=new Nr,Vs=new Gn,Pl=new L,Ws=new L,Xs=new L,qs=new L,uo=new L,Ys=new L,Ll=new L,Zs=new L;class At extends Re{constructor(t=new le,e=new us){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Ys.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],f=r[l];h!==0&&(uo.fromBufferAttribute(f,t),o?Ys.addScaledVector(uo,h):Ys.addScaledVector(uo.sub(e),h))}e.add(Ys)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(r),ai.copy(t.ray).recast(t.near),!(Vs.containsPoint(ai.origin)===!1&&(ai.intersectSphere(Vs,Pl)===null||ai.origin.distanceToSquared(Pl)>(t.far-t.near)**2))&&(Cl.copy(r).invert(),ai.copy(t.ray).applyMatrix4(Cl),!(n.boundingBox!==null&&ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ai)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=o[m.materialIndex],y=Math.max(m.start,d.start),T=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let _=y,R=T;_<R;_+=3){const S=a.getX(_),P=a.getX(_+1),x=a.getX(_+2);s=Ks(this,p,t,n,c,h,f,S,P,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const y=a.getX(m),T=a.getX(m+1),_=a.getX(m+2);s=Ks(this,o,t,n,c,h,f,y,T,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=o[m.materialIndex],y=Math.max(m.start,d.start),T=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let _=y,R=T;_<R;_+=3){const S=_,P=_+1,x=_+2;s=Ks(this,p,t,n,c,h,f,S,P,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const y=m,T=m+1,_=m+2;s=Ks(this,o,t,n,c,h,f,y,T,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function ef(i,t,e,n,s,r,o,a){let l;if(t.side===Ke?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===fi,a),l===null)return null;Zs.copy(a),Zs.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Zs);return c<e.near||c>e.far?null:{distance:c,point:Zs.clone(),object:i}}function Ks(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Ws),i.getVertexPosition(l,Xs),i.getVertexPosition(c,qs);const h=ef(i,t,e,n,Ws,Xs,qs,Ll);if(h){const f=new L;mn.getBarycoord(Ll,Ws,Xs,qs,f),s&&(h.uv=mn.getInterpolatedAttribute(s,a,l,c,f,new mt)),r&&(h.uv1=mn.getInterpolatedAttribute(r,a,l,c,f,new mt)),o&&(h.normal=mn.getInterpolatedAttribute(o,a,l,c,f,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new L,materialIndex:0};mn.getNormal(Ws,Xs,qs,u.normal),h.face=u,h.barycoord=f}return h}const ts=new fe,Il=new fe,Dl=new fe,nf=new fe,Nl=new Jt,Js=new L,fo=new Gn,Ul=new Jt,po=new Nr;class sf extends At{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=pl,this.bindMatrix=new Jt,this.bindMatrixInverse=new Jt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new ni),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Js),this.boundingBox.expandByPoint(Js)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Gn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Js),this.boundingSphere.expandByPoint(Js)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fo.copy(this.boundingSphere),fo.applyMatrix4(s),t.ray.intersectsSphere(fo)!==!1&&(Ul.copy(s).invert(),po.copy(t.ray).applyMatrix4(Ul),!(this.boundingBox!==null&&po.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,po)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new fe,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===pl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===mu?this.bindMatrixInverse.copy(this.bindMatrix).invert():Vt("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;Il.fromBufferAttribute(s.attributes.skinIndex,t),Dl.fromBufferAttribute(s.attributes.skinWeight,t),e.isVector4?(ts.copy(e),e.set(0,0,0,0)):(ts.set(...e,1),e.set(0,0,0)),ts.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const o=Dl.getComponent(r);if(o!==0){const a=Il.getComponent(r);Nl.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(nf.copy(ts).applyMatrix4(Nl),o)}}return e.isVector4&&(e.w=ts.w),e.applyMatrix4(this.bindMatrixInverse)}}class ih extends Re{constructor(){super(),this.isBone=!0,this.type="Bone"}}class qi extends ze{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Oe,h=Oe,f,u){super(null,o,a,l,c,h,s,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Fl=new Jt,rf=new Jt;class Ha{constructor(t=[],e=[]){this.uuid=gi(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){Vt("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Jt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Jt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:rf;Fl.multiplyMatrices(a,e[r]),Fl.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Ha(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new qi(e,t,t,Ze,an);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let o=e[r];o===void 0&&(Vt("Skeleton: No bone found with UUID:",r),o=new ih),this.bones.push(o),this.boneInverses.push(new Jt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=n[s];t.boneInverses.push(a.toArray())}return t}}class Gi extends Se{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ci=new Jt,Ol=new Jt,$s=[],zl=new ni,of=new Jt,es=new At,ns=new Gn;class Ui extends At{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Gi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,of)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ni),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ci),zl.copy(t.boundingBox).applyMatrix4(Ci),this.boundingBox.union(zl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ci),ns.copy(t.boundingSphere).applyMatrix4(Ci),this.boundingSphere.union(ns)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(es.geometry=this.geometry,es.material=this.material,es.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ns.copy(this.boundingSphere),ns.applyMatrix4(n),t.ray.intersectsSphere(ns)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ci),Ol.multiplyMatrices(n,Ci),es.matrixWorld=Ol,es.raycast(t,$s);for(let o=0,a=$s.length;o<a;o++){const l=$s[o];l.instanceId=r,l.object=this,e.push(l)}$s.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Gi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new qi(new Float32Array(s*this.count),s,this.count,Da,an));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const li=new Gn,af=new mt(.5,.5),Qs=new L;class Ga{constructor(t=new Qn,e=new Qn,n=new Qn,s=new Qn,r=new Qn,o=new Qn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=En,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],f=r[5],u=r[6],d=r[7],g=r[8],v=r[9],m=r[10],p=r[11],y=r[12],T=r[13],_=r[14],R=r[15];if(s[0].setComponents(c-o,d-h,p-g,R-y).normalize(),s[1].setComponents(c+o,d+h,p+g,R+y).normalize(),s[2].setComponents(c+a,d+f,p+v,R+T).normalize(),s[3].setComponents(c-a,d-f,p-v,R-T).normalize(),n)s[4].setComponents(l,u,m,_).normalize(),s[5].setComponents(c-l,d-u,p-m,R-_).normalize();else if(s[4].setComponents(c-l,d-u,p-m,R-_).normalize(),e===En)s[5].setComponents(c+l,d+u,p+m,R+_).normalize();else if(e===ys)s[5].setComponents(l,u,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(li)}intersectsSprite(t){li.center.set(0,0,0);const e=af.distanceTo(t.center);return li.radius=.7071067811865476+e,li.applyMatrix4(t.matrixWorld),this.intersectsSphere(li)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Qs.x=s.normal.x>0?t.max.x:t.min.x,Qs.y=s.normal.y>0?t.max.y:t.min.y,Qs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Qs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class lf extends ii{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new at(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Er=new L,Tr=new L,Bl=new Jt,is=new Nr,js=new Gn,mo=new L,kl=new L;class cf extends Re{constructor(t=new le,e=new lf){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Er.fromBufferAttribute(e,s-1),Tr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Er.distanceTo(Tr);t.setAttribute("lineDistance",new Wt(n,1))}else Vt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),js.copy(n.boundingSphere),js.applyMatrix4(s),js.radius+=r,t.ray.intersectsSphere(js)===!1)return;Bl.copy(s).invert(),is.copy(t.ray).applyMatrix4(Bl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=d,m=g-1;v<m;v+=c){const p=h.getX(v),y=h.getX(v+1),T=tr(this,t,is,l,p,y,v);T&&e.push(T)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(d),p=tr(this,t,is,l,v,m,g-1);p&&e.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=d,m=g-1;v<m;v+=c){const p=tr(this,t,is,l,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){const v=tr(this,t,is,l,g-1,d,g-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function tr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(Er.fromBufferAttribute(a,s),Tr.fromBufferAttribute(a,r),e.distanceSqToSegment(Er,Tr,mo,kl)>n)return;mo.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(mo);if(!(c<t.near||c>t.far))return{distance:c,point:kl.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Hl=new L,Gl=new L;class hf extends cf{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Hl.fromBufferAttribute(e,s),Gl.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Hl.distanceTo(Gl);t.setAttribute("lineDistance",new Wt(n,1))}else Vt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class uf extends ii{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new at(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Vl=new Jt,xa=new Nr,er=new Gn,nr=new L;class sh extends Re{constructor(t=new le,e=new uf){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),er.copy(n.boundingSphere),er.applyMatrix4(s),er.radius+=r,t.ray.intersectsSphere(er)===!1)return;Vl.copy(s).invert(),xa.copy(t.ray).applyMatrix4(Vl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,f=n.attributes.position;if(c!==null){const u=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=u,v=d;g<v;g++){const m=c.getX(g);nr.fromBufferAttribute(f,m),Wl(nr,m,l,s,t,e,this)}}else{const u=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let g=u,v=d;g<v;g++)nr.fromBufferAttribute(f,g),Wl(nr,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Wl(i,t,e,n,s,r,o){const a=xa.distanceSqToPoint(i);if(a<e){const l=new L;xa.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class rh extends ze{constructor(t=[],e=di,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ar extends ze{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ws extends ze{constructor(t,e,n=An,s,r,o,a=Oe,l=Oe,c,h=kn,f=1){if(h!==kn&&h!==hi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:f};super(u,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ba(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class ff extends ws{constructor(t,e=An,n=di,s,r,o=Oe,a=Oe,l,c=kn){const h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class oh extends ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class De extends le{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],f=[];let u=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Wt(c,3)),this.setAttribute("normal",new Wt(h,3)),this.setAttribute("uv",new Wt(f,2));function g(v,m,p,y,T,_,R,S,P,x,b){const w=_/P,D=R/x,U=_/2,E=R/2,C=S/2,N=P+1,O=x+1;let H=0,X=0;const k=new L;for(let V=0;V<O;V++){const W=V*D-E;for(let ut=0;ut<N;ut++){const it=ut*w-U;k[v]=it*y,k[m]=W*T,k[p]=C,c.push(k.x,k.y,k.z),k[v]=0,k[m]=0,k[p]=S>0?1:-1,h.push(k.x,k.y,k.z),f.push(ut/P),f.push(1-V/x),H+=1}}for(let V=0;V<x;V++)for(let W=0;W<P;W++){const ut=u+W+N*V,it=u+W+N*(V+1),zt=u+(W+1)+N*(V+1),Gt=u+(W+1)+N*V;l.push(ut,it,Gt),l.push(it,zt,Gt),X+=6}a.addGroup(d,X,b),d+=X,u+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new De(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class ah extends le{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const o=[],a=[],l=[],c=[],h=e/2,f=Math.PI/2*t,u=e,d=2*f+u,g=n*2+r,v=s+1,m=new L,p=new L;for(let y=0;y<=g;y++){let T=0,_=0,R=0,S=0;if(y<=n){const b=y/n,w=b*Math.PI/2;_=-h-t*Math.cos(w),R=t*Math.sin(w),S=-t*Math.cos(w),T=b*f}else if(y<=n+r){const b=(y-n)/r;_=-h+b*e,R=t,S=0,T=f+b*u}else{const b=(y-n-r)/n,w=b*Math.PI/2;_=h+t*Math.sin(w),R=t*Math.cos(w),S=t*Math.sin(w),T=f+u+b*f}const P=Math.max(0,Math.min(1,T/d));let x=0;y===0?x=.5/s:y===g&&(x=-.5/s);for(let b=0;b<=s;b++){const w=b/s,D=w*Math.PI*2,U=Math.sin(D),E=Math.cos(D);p.x=-R*E,p.y=_,p.z=R*U,a.push(p.x,p.y,p.z),m.set(-R*E,S,R*U),m.normalize(),l.push(m.x,m.y,m.z),c.push(w+x,P)}if(y>0){const b=(y-1)*v;for(let w=0;w<s;w++){const D=b+w,U=b+w+1,E=y*v+w,C=y*v+w+1;o.push(D,U,E),o.push(U,C,E)}}}this.setIndex(o),this.setAttribute("position",new Wt(a,3)),this.setAttribute("normal",new Wt(l,3)),this.setAttribute("uv",new Wt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ah(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class Es extends le{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new L,h=new mt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let f=0,u=3;f<=e;f++,u+=3){const d=n+f/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,l.push(h.x,h.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Wt(o,3)),this.setAttribute("normal",new Wt(a,3)),this.setAttribute("uv",new Wt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Es(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ve extends le{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],u=[],d=[];let g=0;const v=[],m=n/2;let p=0;y(),o===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new Wt(f,3)),this.setAttribute("normal",new Wt(u,3)),this.setAttribute("uv",new Wt(d,2));function y(){const _=new L,R=new L;let S=0;const P=(e-t)/n;for(let x=0;x<=r;x++){const b=[],w=x/r,D=w*(e-t)+t;for(let U=0;U<=s;U++){const E=U/s,C=E*l+a,N=Math.sin(C),O=Math.cos(C);R.x=D*N,R.y=-w*n+m,R.z=D*O,f.push(R.x,R.y,R.z),_.set(N,P,O).normalize(),u.push(_.x,_.y,_.z),d.push(E,1-w),b.push(g++)}v.push(b)}for(let x=0;x<s;x++)for(let b=0;b<r;b++){const w=v[b][x],D=v[b+1][x],U=v[b+1][x+1],E=v[b][x+1];(t>0||b!==0)&&(h.push(w,D,E),S+=3),(e>0||b!==r-1)&&(h.push(D,U,E),S+=3)}c.addGroup(p,S,0),p+=S}function T(_){const R=g,S=new mt,P=new L;let x=0;const b=_===!0?t:e,w=_===!0?1:-1;for(let U=1;U<=s;U++)f.push(0,m*w,0),u.push(0,w,0),d.push(.5,.5),g++;const D=g;for(let U=0;U<=s;U++){const C=U/s*l+a,N=Math.cos(C),O=Math.sin(C);P.x=b*O,P.y=m*w,P.z=b*N,f.push(P.x,P.y,P.z),u.push(0,w,0),S.x=N*.5+.5,S.y=O*.5*w+.5,d.push(S.x,S.y),g++}for(let U=0;U<s;U++){const E=R+U,C=D+U;_===!0?h.push(C,C+1,E):h.push(C+1,C,E),x+=3}c.addGroup(p,x,_===!0?1:2),p+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ve(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class pn extends Ve{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new pn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Va extends le{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Wt(r,3)),this.setAttribute("normal",new Wt(r.slice(),3)),this.setAttribute("uv",new Wt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const T=new L,_=new L,R=new L;for(let S=0;S<e.length;S+=3)d(e[S+0],T),d(e[S+1],_),d(e[S+2],R),l(T,_,R,y)}function l(y,T,_,R){const S=R+1,P=[];for(let x=0;x<=S;x++){P[x]=[];const b=y.clone().lerp(_,x/S),w=T.clone().lerp(_,x/S),D=S-x;for(let U=0;U<=D;U++)U===0&&x===S?P[x][U]=b:P[x][U]=b.clone().lerp(w,U/D)}for(let x=0;x<S;x++)for(let b=0;b<2*(S-x)-1;b++){const w=Math.floor(b/2);b%2===0?(u(P[x][w+1]),u(P[x+1][w]),u(P[x][w])):(u(P[x][w+1]),u(P[x+1][w+1]),u(P[x+1][w]))}}function c(y){const T=new L;for(let _=0;_<r.length;_+=3)T.x=r[_+0],T.y=r[_+1],T.z=r[_+2],T.normalize().multiplyScalar(y),r[_+0]=T.x,r[_+1]=T.y,r[_+2]=T.z}function h(){const y=new L;for(let T=0;T<r.length;T+=3){y.x=r[T+0],y.y=r[T+1],y.z=r[T+2];const _=m(y)/2/Math.PI+.5,R=p(y)/Math.PI+.5;o.push(_,1-R)}g(),f()}function f(){for(let y=0;y<o.length;y+=6){const T=o[y+0],_=o[y+2],R=o[y+4],S=Math.max(T,_,R),P=Math.min(T,_,R);S>.9&&P<.1&&(T<.2&&(o[y+0]+=1),_<.2&&(o[y+2]+=1),R<.2&&(o[y+4]+=1))}}function u(y){r.push(y.x,y.y,y.z)}function d(y,T){const _=y*3;T.x=t[_+0],T.y=t[_+1],T.z=t[_+2]}function g(){const y=new L,T=new L,_=new L,R=new L,S=new mt,P=new mt,x=new mt;for(let b=0,w=0;b<r.length;b+=9,w+=6){y.set(r[b+0],r[b+1],r[b+2]),T.set(r[b+3],r[b+4],r[b+5]),_.set(r[b+6],r[b+7],r[b+8]),S.set(o[w+0],o[w+1]),P.set(o[w+2],o[w+3]),x.set(o[w+4],o[w+5]),R.copy(y).add(T).add(_).divideScalar(3);const D=m(R);v(S,w+0,y,D),v(P,w+2,T,D),v(x,w+4,_,D)}}function v(y,T,_,R){R<0&&y.x===1&&(o[T]=y.x-1),_.x===0&&_.z===0&&(o[T]=R/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Va(t.vertices,t.indices,t.radius,t.detail)}}class Cn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Vt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],u=n[s+1]-h,d=(o-h)/u;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new mt:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new L,s=[],r=[],o=[],a=new L,l=new Jt;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new L)}r[0]=new L,o[0]=new L;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(ne(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(ne(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Wa extends Cn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new mt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,d=c-this.aY;l=u*h-d*f+this.aX,c=u*f+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class df extends Wa{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Xa(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,f){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+f)+(l-a)/f;u*=h,d*=h,s(o,a,u,d)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Xl=new L,ql=new L,go=new Xa,xo=new Xa,vo=new Xa;class lh extends Cn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(ql.subVectors(s[0],s[1]).add(s[0]),c=ql);const f=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Xl.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Xl),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(u),d),m=Math.pow(u.distanceToSquared(h),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),go.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,g,v,m),xo.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,g,v,m),vo.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(go.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),xo.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),vo.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return n.set(go.calc(l),xo.calc(l),vo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Yl(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function pf(i,t){const e=1-i;return e*e*t}function mf(i,t){return 2*(1-i)*i*t}function gf(i,t){return i*i*t}function fs(i,t,e,n){return pf(i,t)+mf(i,e)+gf(i,n)}function xf(i,t){const e=1-i;return e*e*e*t}function vf(i,t){const e=1-i;return 3*e*e*i*t}function _f(i,t){return 3*(1-i)*i*i*t}function Mf(i,t){return i*i*i*t}function ds(i,t,e,n,s){return xf(i,t)+vf(i,e)+_f(i,n)+Mf(i,s)}class ch extends Cn{constructor(t=new mt,e=new mt,n=new mt,s=new mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new mt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ds(t,s.x,r.x,o.x,a.x),ds(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Sf extends Cn{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ds(t,s.x,r.x,o.x,a.x),ds(t,s.y,r.y,o.y,a.y),ds(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class hh extends Cn{constructor(t=new mt,e=new mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new mt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new mt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yf extends Cn{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class uh extends Cn{constructor(t=new mt,e=new mt,n=new mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new mt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(fs(t,s.x,r.x,o.x),fs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class fh extends Cn{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(fs(t,s.x,r.x,o.x),fs(t,s.y,r.y,o.y),fs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class dh extends Cn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new mt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return n.set(Yl(a,l.x,c.x,h.x,f.x),Yl(a,l.y,c.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new mt().fromArray(s))}return this}}var Rr=Object.freeze({__proto__:null,ArcCurve:df,CatmullRomCurve3:lh,CubicBezierCurve:ch,CubicBezierCurve3:Sf,EllipseCurve:Wa,LineCurve:hh,LineCurve3:yf,QuadraticBezierCurve:uh,QuadraticBezierCurve3:fh,SplineCurve:dh});class bf extends Cn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Rr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Rr[s.type]().fromJSON(s))}return this}}class Zl extends bf{constructor(t){super(),this.type="Path",this.currentPoint=new mt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new hh(this.currentPoint.clone(),new mt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new uh(this.currentPoint.clone(),new mt(t,e),new mt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new ch(this.currentPoint.clone(),new mt(t,e),new mt(n,s),new mt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new dh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){const c=new Wa(t,e,n,s,r,o,a,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ph extends Zl{constructor(t){super(t),this.uuid=gi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Zl().fromJSON(s))}return this}}function wf(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=mh(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=Cf(i,t,r,e)),i.length>80*e){a=i[0],l=i[1];let h=a,f=l;for(let u=e;u<s;u+=e){const d=i[u],g=i[u+1];d<a&&(a=d),g<l&&(l=g),d>h&&(h=d),g>f&&(f=g)}c=Math.max(h-a,f-l),c=c!==0?32767/c:0}return Ts(r,o,e,a,l,c,0),o}function mh(i,t,e,n,s){let r;if(s===kf(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=Kl(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=Kl(o/n|0,i[o],i[o+1],r);return r&&Vi(r,r.next)&&(Rs(r),r=r.next),r}function mi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Vi(e,e.next)||Me(e.prev,e,e.next)===0)){if(Rs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ts(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Nf(i,n,s,r);let a=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?Tf(i,n,s,r):Ef(i)){t.push(l.i,i.i,c.i),Rs(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Af(mi(i),t),Ts(i,t,e,n,s,r,2)):o===2&&Rf(i,t,e,n,s,r):Ts(mi(i),t,e,n,s,r,1);break}}}function Ef(i){const t=i.prev,e=i,n=i.next;if(Me(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=Math.min(s,r,o),f=Math.min(a,l,c),u=Math.max(s,r,o),d=Math.max(a,l,c);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=f&&g.y<=d&&ls(s,a,r,l,o,c,g.x,g.y)&&Me(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Tf(i,t,e,n){const s=i.prev,r=i,o=i.next;if(Me(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,h=s.y,f=r.y,u=o.y,d=Math.min(a,l,c),g=Math.min(h,f,u),v=Math.max(a,l,c),m=Math.max(h,f,u),p=va(d,g,t,e,n),y=va(v,m,t,e,n);let T=i.prevZ,_=i.nextZ;for(;T&&T.z>=p&&_&&_.z<=y;){if(T.x>=d&&T.x<=v&&T.y>=g&&T.y<=m&&T!==s&&T!==o&&ls(a,h,l,f,c,u,T.x,T.y)&&Me(T.prev,T,T.next)>=0||(T=T.prevZ,_.x>=d&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&ls(a,h,l,f,c,u,_.x,_.y)&&Me(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;T&&T.z>=p;){if(T.x>=d&&T.x<=v&&T.y>=g&&T.y<=m&&T!==s&&T!==o&&ls(a,h,l,f,c,u,T.x,T.y)&&Me(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;_&&_.z<=y;){if(_.x>=d&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&ls(a,h,l,f,c,u,_.x,_.y)&&Me(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Af(i,t){let e=i;do{const n=e.prev,s=e.next.next;!Vi(n,s)&&xh(n,e,e.next,s)&&As(n,s)&&As(s,n)&&(t.push(n.i,e.i,s.i),Rs(e),Rs(e.next),e=i=s),e=e.next}while(e!==i);return mi(e)}function Rf(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Of(o,a)){let l=vh(o,a);o=mi(o,o.next),l=mi(l,l.next),Ts(o,t,e,n,s,r,0),Ts(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Cf(i,t,e,n){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=mh(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Ff(c))}s.sort(Pf);for(let r=0;r<s.length;r++)e=Lf(s[r],e);return e}function Pf(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Lf(i,t){const e=If(i,t);if(!e)return t;const n=vh(e,i);return mi(n,n.next),mi(e,e.next)}function If(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,o;if(Vi(i,e))return e;do{if(Vi(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>r&&(r=f,o=e.x<e.next.x?e:e.next,f===n))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,l=o.x,c=o.y;let h=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&gh(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){const f=Math.abs(s-e.y)/(n-e.x);As(e,i)&&(f<h||f===h&&(e.x>o.x||e.x===o.x&&Df(o,e)))&&(o=e,h=f)}e=e.next}while(e!==a);return o}function Df(i,t){return Me(i.prev,i,t.prev)<0&&Me(t.next,i,i.next)<0}function Nf(i,t,e,n){let s=i;do s.z===0&&(s.z=va(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Uf(s)}function Uf(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function va(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Ff(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function gh(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function ls(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&gh(i,t,e,n,s,r,o,a)}function Of(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!zf(i,t)&&(As(i,t)&&As(t,i)&&Bf(i,t)&&(Me(i.prev,i,t.prev)||Me(i,t.prev,t))||Vi(i,t)&&Me(i.prev,i,i.next)>0&&Me(t.prev,t,t.next)>0)}function Me(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Vi(i,t){return i.x===t.x&&i.y===t.y}function xh(i,t,e,n){const s=sr(Me(i,t,e)),r=sr(Me(i,t,n)),o=sr(Me(e,n,i)),a=sr(Me(e,n,t));return!!(s!==r&&o!==a||s===0&&ir(i,e,t)||r===0&&ir(i,n,t)||o===0&&ir(e,i,n)||a===0&&ir(e,t,n))}function ir(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function sr(i){return i>0?1:i<0?-1:0}function zf(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&xh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function As(i,t){return Me(i.prev,i,i.next)<0?Me(i,t,i.next)>=0&&Me(i,i.prev,t)>=0:Me(i,t,i.prev)<0||Me(i,i.next,t)<0}function Bf(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function vh(i,t){const e=_a(i.i,i.x,i.y),n=_a(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Kl(i,t,e,n){const s=_a(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Rs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function _a(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function kf(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Hf{static triangulate(t,e,n=2){return wf(t,e,n)}}class Fi{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Fi.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Jl(t),$l(n,t);let o=t.length;e.forEach(Jl);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,$l(n,e[l]);const a=Hf.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Jl(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function $l(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class qa extends le{constructor(t=new ph([new mt(.5,.5),new mt(-.5,.5),new mt(-.5,-.5),new mt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new Wt(s,3)),this.setAttribute("uv",new Wt(r,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1;let u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:Gf;let T,_=!1,R,S,P,x;if(p){T=p.getSpacedPoints(h),_=!0,u=!1;const $=p.isCatmullRomCurve3?p.closed:!1;R=p.computeFrenetFrames(h,$),S=new L,P=new L,x=new L}u||(m=0,d=0,g=0,v=0);const b=a.extractPoints(c);let w=b.shape;const D=b.holes;if(!Fi.isClockWise(w)){w=w.reverse();for(let $=0,st=D.length;$<st;$++){const lt=D[$];Fi.isClockWise(lt)&&(D[$]=lt.reverse())}}function E($){const lt=10000000000000001e-36;let ot=$[0];for(let ht=1;ht<=$.length;ht++){const Dt=ht%$.length,Pt=$[Dt],Nt=Pt.x-ot.x,Zt=Pt.y-ot.y,F=Nt*Nt+Zt*Zt,ie=Math.max(Math.abs(Pt.x),Math.abs(Pt.y),Math.abs(ot.x),Math.abs(ot.y)),Qt=lt*ie*ie;if(F<=Qt){$.splice(Dt,1),ht--;continue}ot=Pt}}E(w),D.forEach(E);const C=D.length,N=w;for(let $=0;$<C;$++){const st=D[$];w=w.concat(st)}function O($,st,lt){return st||ae("ExtrudeGeometry: vec does not exist"),$.clone().addScaledVector(st,lt)}const H=w.length;function X($,st,lt){let ot,ht,Dt;const Pt=$.x-st.x,Nt=$.y-st.y,Zt=lt.x-$.x,F=lt.y-$.y,ie=Pt*Pt+Nt*Nt,Qt=Pt*F-Nt*Zt;if(Math.abs(Qt)>Number.EPSILON){const I=Math.sqrt(ie),M=Math.sqrt(Zt*Zt+F*F),G=st.x-Nt/I,Z=st.y+Pt/I,j=lt.x-F/M,dt=lt.y+Zt/M,gt=((j-G)*F-(dt-Z)*Zt)/(Pt*F-Nt*Zt);ot=G+Pt*gt-$.x,ht=Z+Nt*gt-$.y;const tt=ot*ot+ht*ht;if(tt<=2)return new mt(ot,ht);Dt=Math.sqrt(tt/2)}else{let I=!1;Pt>Number.EPSILON?Zt>Number.EPSILON&&(I=!0):Pt<-Number.EPSILON?Zt<-Number.EPSILON&&(I=!0):Math.sign(Nt)===Math.sign(F)&&(I=!0),I?(ot=-Nt,ht=Pt,Dt=Math.sqrt(ie)):(ot=Pt,ht=Nt,Dt=Math.sqrt(ie/2))}return new mt(ot/Dt,ht/Dt)}const k=[];for(let $=0,st=N.length,lt=st-1,ot=$+1;$<st;$++,lt++,ot++)lt===st&&(lt=0),ot===st&&(ot=0),k[$]=X(N[$],N[lt],N[ot]);const V=[];let W,ut=k.concat();for(let $=0,st=C;$<st;$++){const lt=D[$];W=[];for(let ot=0,ht=lt.length,Dt=ht-1,Pt=ot+1;ot<ht;ot++,Dt++,Pt++)Dt===ht&&(Dt=0),Pt===ht&&(Pt=0),W[ot]=X(lt[ot],lt[Dt],lt[Pt]);V.push(W),ut=ut.concat(W)}let it;if(m===0)it=Fi.triangulateShape(N,D);else{const $=[],st=[];for(let lt=0;lt<m;lt++){const ot=lt/m,ht=d*Math.cos(ot*Math.PI/2),Dt=g*Math.sin(ot*Math.PI/2)+v;for(let Pt=0,Nt=N.length;Pt<Nt;Pt++){const Zt=O(N[Pt],k[Pt],Dt);ct(Zt.x,Zt.y,-ht),ot===0&&$.push(Zt)}for(let Pt=0,Nt=C;Pt<Nt;Pt++){const Zt=D[Pt];W=V[Pt];const F=[];for(let ie=0,Qt=Zt.length;ie<Qt;ie++){const I=O(Zt[ie],W[ie],Dt);ct(I.x,I.y,-ht),ot===0&&F.push(I)}ot===0&&st.push(F)}}it=Fi.triangulateShape($,st)}const zt=it.length,Gt=g+v;for(let $=0;$<H;$++){const st=u?O(w[$],ut[$],Gt):w[$];_?(P.copy(R.normals[0]).multiplyScalar(st.x),S.copy(R.binormals[0]).multiplyScalar(st.y),x.copy(T[0]).add(P).add(S),ct(x.x,x.y,x.z)):ct(st.x,st.y,0)}for(let $=1;$<=h;$++)for(let st=0;st<H;st++){const lt=u?O(w[st],ut[st],Gt):w[st];_?(P.copy(R.normals[$]).multiplyScalar(lt.x),S.copy(R.binormals[$]).multiplyScalar(lt.y),x.copy(T[$]).add(P).add(S),ct(x.x,x.y,x.z)):ct(lt.x,lt.y,f/h*$)}for(let $=m-1;$>=0;$--){const st=$/m,lt=d*Math.cos(st*Math.PI/2),ot=g*Math.sin(st*Math.PI/2)+v;for(let ht=0,Dt=N.length;ht<Dt;ht++){const Pt=O(N[ht],k[ht],ot);ct(Pt.x,Pt.y,f+lt)}for(let ht=0,Dt=D.length;ht<Dt;ht++){const Pt=D[ht];W=V[ht];for(let Nt=0,Zt=Pt.length;Nt<Zt;Nt++){const F=O(Pt[Nt],W[Nt],ot);_?ct(F.x,F.y+T[h-1].y,T[h-1].x+lt):ct(F.x,F.y,f+lt)}}}Xt(),Q();function Xt(){const $=s.length/3;if(u){let st=0,lt=H*st;for(let ot=0;ot<zt;ot++){const ht=it[ot];Et(ht[2]+lt,ht[1]+lt,ht[0]+lt)}st=h+m*2,lt=H*st;for(let ot=0;ot<zt;ot++){const ht=it[ot];Et(ht[0]+lt,ht[1]+lt,ht[2]+lt)}}else{for(let st=0;st<zt;st++){const lt=it[st];Et(lt[2],lt[1],lt[0])}for(let st=0;st<zt;st++){const lt=it[st];Et(lt[0]+H*h,lt[1]+H*h,lt[2]+H*h)}}n.addGroup($,s.length/3-$,0)}function Q(){const $=s.length/3;let st=0;K(N,st),st+=N.length;for(let lt=0,ot=D.length;lt<ot;lt++){const ht=D[lt];K(ht,st),st+=ht.length}n.addGroup($,s.length/3-$,1)}function K($,st){let lt=$.length;for(;--lt>=0;){const ot=lt;let ht=lt-1;ht<0&&(ht=$.length-1);for(let Dt=0,Pt=h+m*2;Dt<Pt;Dt++){const Nt=H*Dt,Zt=H*(Dt+1),F=st+ot+Nt,ie=st+ht+Nt,Qt=st+ht+Zt,I=st+ot+Zt;pt(F,ie,Qt,I)}}}function ct($,st,lt){l.push($),l.push(st),l.push(lt)}function Et($,st,lt){ft($),ft(st),ft(lt);const ot=s.length/3,ht=y.generateTopUV(n,s,ot-3,ot-2,ot-1);Yt(ht[0]),Yt(ht[1]),Yt(ht[2])}function pt($,st,lt,ot){ft($),ft(st),ft(ot),ft(st),ft(lt),ft(ot);const ht=s.length/3,Dt=y.generateSideWallUV(n,s,ht-6,ht-3,ht-2,ht-1);Yt(Dt[0]),Yt(Dt[1]),Yt(Dt[3]),Yt(Dt[1]),Yt(Dt[2]),Yt(Dt[3])}function ft($){s.push(l[$*3+0]),s.push(l[$*3+1]),s.push(l[$*3+2])}function Yt($){r.push($.x),r.push($.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Vf(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Rr[s.type]().fromJSON(s)),new qa(n,t.options)}}const Gf={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new mt(r,o),new mt(a,l),new mt(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],f=t[n*3+2],u=t[s*3],d=t[s*3+1],g=t[s*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new mt(o,1-l),new mt(c,1-f),new mt(u,1-g),new mt(v,1-p)]:[new mt(a,1-l),new mt(h,1-f),new mt(d,1-g),new mt(m,1-p)]}};function Vf(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Ya extends Va{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ya(t.radius,t.detail)}}class Hn extends le{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,f=t/a,u=e/l,d=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const y=p*u-o;for(let T=0;T<c;T++){const _=T*f-r;g.push(_,-y,0),v.push(0,0,1),m.push(T/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const T=y+c*p,_=y+c*(p+1),R=y+1+c*(p+1),S=y+1+c*p;d.push(T,_,S),d.push(_,R,S)}this.setIndex(d),this.setAttribute("position",new Wt(g,3)),this.setAttribute("normal",new Wt(v,3)),this.setAttribute("uv",new Wt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hn(t.width,t.height,t.widthSegments,t.heightSegments)}}class Za extends le{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let f=t;const u=(e-t)/s,d=new L,g=new mt;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*o;d.x=f*Math.cos(p),d.y=f*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}f+=u}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const y=p+m,T=y,_=y+n+1,R=y+n+2,S=y+1;a.push(T,_,S),a.push(_,R,S)}}this.setIndex(a),this.setAttribute("position",new Wt(l,3)),this.setAttribute("normal",new Wt(c,3)),this.setAttribute("uv",new Wt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Za(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ui extends le{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],f=new L,u=new L,d=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const y=[],T=p/n,_=o+T*a,R=t*Math.cos(_),S=Math.sqrt(t*t-R*R);let P=0;p===0&&o===0?P=.5/e:p===n&&l===Math.PI&&(P=-.5/e);for(let x=0;x<=e;x++){const b=x/e,w=s+b*r;f.x=-S*Math.cos(w),f.y=R,f.z=S*Math.sin(w),g.push(f.x,f.y,f.z),u.copy(f).normalize(),v.push(u.x,u.y,u.z),m.push(b+P,1-T),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const T=h[p][y+1],_=h[p][y],R=h[p+1][y],S=h[p+1][y+1];(p!==0||o>0)&&d.push(T,_,S),(p!==n-1||l<Math.PI)&&d.push(_,R,S)}this.setIndex(d),this.setAttribute("position",new Wt(g,3)),this.setAttribute("normal",new Wt(v,3)),this.setAttribute("uv",new Wt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ui(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ka extends le{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],h=[],f=[],u=new L,d=new L,g=new L;for(let v=0;v<=n;v++){const m=o+v/n*a;for(let p=0;p<=s;p++){const y=p/s*r;d.x=(t+e*Math.cos(m))*Math.cos(y),d.y=(t+e*Math.cos(m))*Math.sin(y),d.z=e*Math.sin(m),c.push(d.x,d.y,d.z),u.x=t*Math.cos(y),u.y=t*Math.sin(y),g.subVectors(d,u).normalize(),h.push(g.x,g.y,g.z),f.push(p/s),f.push(v/n)}}for(let v=1;v<=n;v++)for(let m=1;m<=s;m++){const p=(s+1)*v+m-1,y=(s+1)*(v-1)+m-1,T=(s+1)*(v-1)+m,_=(s+1)*v+m;l.push(p,y,_),l.push(y,T,_)}this.setIndex(l),this.setAttribute("position",new Wt(c,3)),this.setAttribute("normal",new Wt(h,3)),this.setAttribute("uv",new Wt(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ka(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class Ja extends le{constructor(t=new fh(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new L,l=new L,c=new mt;let h=new L;const f=[],u=[],d=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new Wt(f,3)),this.setAttribute("normal",new Wt(u,3)),this.setAttribute("uv",new Wt(d,2));function v(){for(let T=0;T<e;T++)m(T);m(r===!1?e:0),y(),p()}function m(T){h=t.getPointAt(T/e,h);const _=o.normals[T],R=o.binormals[T];for(let S=0;S<=s;S++){const P=S/s*Math.PI*2,x=Math.sin(P),b=-Math.cos(P);l.x=b*_.x+x*R.x,l.y=b*_.y+x*R.y,l.z=b*_.z+x*R.z,l.normalize(),u.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,f.push(a.x,a.y,a.z)}}function p(){for(let T=1;T<=e;T++)for(let _=1;_<=s;_++){const R=(s+1)*(T-1)+(_-1),S=(s+1)*T+(_-1),P=(s+1)*T+_,x=(s+1)*(T-1)+_;g.push(R,S,x),g.push(S,P,x)}}function y(){for(let T=0;T<=e;T++)for(let _=0;_<=s;_++)c.x=T/e,c.y=_/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Ja(new Rr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function Wi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(Ql(s))s.isRenderTargetTexture?(Vt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Ql(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Ye(i){const t={};for(let e=0;e<i.length;e++){const n=Wi(i[e]);for(const s in n)t[s]=n[s]}return t}function Ql(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Wf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function _h(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}const Xf={clone:Wi,merge:Ye};var qf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Be extends ii{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qf,this.fragmentShader=Yf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Wi(t.uniforms),this.uniformsGroups=Wf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new at().setHex(s.value);break;case"v2":this.uniforms[n].value=new mt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new fe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new $t().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Jt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Zf extends Be{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class be extends ii{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new at(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new at(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yr,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Kf extends ii{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new at(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yr,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=Ra,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Jf extends ii{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class $f extends ii{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const _o={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(jl(i)||(this.files[i]=t))},get:function(i){if(this.enabled!==!1&&!jl(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function jl(i){try{const t=i.slice(i.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}class Qf{constructor(t,e,n){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){const f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=c.length;f<u;f+=2){const d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const jf=new Qf;class $a{constructor(t){this.manager=t!==void 0?t:jf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}$a.DEFAULT_MATERIAL_NAME="__DEFAULT";const Pi=new WeakMap;class td extends $a{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=_o.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let f=Pi.get(o);f===void 0&&(f=[],Pi.set(o,f)),f.push({onLoad:e,onError:s})}return o}const a=bs("img");function l(){h(),e&&e(this);const f=Pi.get(this)||[];for(let u=0;u<f.length;u++){const d=f[u];d.onLoad&&d.onLoad(this)}Pi.delete(this),r.manager.itemEnd(t)}function c(f){h(),s&&s(f),_o.remove(`image:${t}`);const u=Pi.get(this)||[];for(let d=0;d<u.length;d++){const g=u[d];g.onError&&g.onError(f)}Pi.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),_o.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}}class bv extends $a{constructor(t){super(t)}load(t,e,n,s){const r=new ze,o=new td(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class Qa extends Re{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new at(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class ed extends Qa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Re.DEFAULT_UP),this.updateMatrix(),this.groundColor=new at(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Mo=new Jt,tc=new L,ec=new L;class Mh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new mt(512,512),this.mapType=tn,this.map=null,this.mapPass=null,this.matrix=new Jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ga,this._frameExtents=new mt(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;tc.setFromMatrixPosition(t.matrixWorld),e.position.copy(tc),ec.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ec),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Mo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Mo,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===ys||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(Mo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const rr=new L,or=new ln,Mn=new L;class Sh extends Re{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Jt,this.projectionMatrix=new Jt,this.projectionMatrixInverse=new Jt,this.coordinateSystem=En,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(rr,or,Mn),Mn.x===1&&Mn.y===1&&Mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(rr,or,Mn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(rr,or,Mn),Mn.x===1&&Mn.y===1&&Mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(rr,or,Mn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Jn=new L,nc=new mt,ic=new mt;class rn extends Sh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ga*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(gr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ga*2*Math.atan(Math.tan(gr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Jn.x,Jn.y).multiplyScalar(-t/Jn.z),Jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Jn.x,Jn.y).multiplyScalar(-t/Jn.z)}getViewSize(t,e){return this.getViewBounds(t,nc,ic),e.subVectors(ic,nc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(gr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class nd extends Mh{constructor(){super(new rn(90,1,.5,500)),this.isPointLightShadow=!0}}class sc extends Qa{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new nd}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class ja extends Sh{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class id extends Mh{constructor(){super(new ja(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class sd extends Qa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Re.DEFAULT_UP),this.updateMatrix(),this.target=new Re,this.shadow=new id}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class rd extends le{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}const Li=-90,Ii=1;class od extends Re{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new rn(Li,Ii,t,e);s.layers=this.layers,this.add(s);const r=new rn(Li,Ii,t,e);r.layers=this.layers,this.add(r);const o=new rn(Li,Ii,t,e);o.layers=this.layers,this.add(o);const a=new rn(Li,Ii,t,e);a.layers=this.layers,this.add(a);const l=new rn(Li,Ii,t,e);l.layers=this.layers,this.add(l);const c=new rn(Li,Ii,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===En)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ys)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ad extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class wv{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=ld.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function ld(){this._document.hidden===!1&&this.reset()}class Ev{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Vt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class Tv{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ne(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ne(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class yh{static{yh.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}}class Av extends ei{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function rc(i,t,e,n){const s=cd(n);switch(e){case Jc:return i*t;case Da:return i*t/s.components*s.byteLength;case Na:return i*t/s.components*s.byteLength;case pi:return i*t*2/s.components*s.byteLength;case Ua:return i*t*2/s.components*s.byteLength;case $c:return i*t*3/s.components*s.byteLength;case Ze:return i*t*4/s.components*s.byteLength;case Fa:return i*t*4/s.components*s.byteLength;case fr:case dr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case pr:case mr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ho:case Vo:return Math.max(i,16)*Math.max(t,8)/4;case ko:case Go:return Math.max(i,8)*Math.max(t,8)/2;case Wo:case Xo:case Yo:case Zo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case qo:case Mr:case Ko:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Jo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case $o:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Qo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case jo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ta:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ea:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case na:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ia:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case sa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ra:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case oa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case aa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case la:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ca:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ha:case ua:case fa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case da:case pa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Sr:case ma:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function cd(i){switch(i){case tn:case qc:return{byteLength:1,components:1};case Ms:case Yc:case xn:return{byteLength:2,components:1};case La:case Ia:return{byteLength:2,components:4};case An:case Pa:case an:return{byteLength:4,components:1};case Zc:case Kc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Aa}}));typeof window<"u"&&(window.__THREE__?Vt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Aa);function bh(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function hd(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,f=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,l,c){const h=l.array,f=l.updateRanges;if(i.bindBuffer(c,a),f.length===0)i.bufferSubData(c,0,h);else{f.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<f.length;d++){const g=f[u],v=f[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,f[u]=v)}f.length=u+1;for(let d=0,g=f.length;d<g;d++){const v=f[d];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var ud=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,dd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,md=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,vd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_d=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Md=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,wd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ed=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Td=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ad=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ld=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Id=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Dd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Nd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ud=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Fd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Od=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,kd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Gd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Vd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Wd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Xd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,qd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Zd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$d=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ep=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,np=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,ip=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,sp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,op=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ap=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,cp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,hp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,up=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,fp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dp=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,pp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_p=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Sp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ep=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Tp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ap=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Rp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Pp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Lp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ip=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Np=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Up=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Op=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Hp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Zp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Kp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Jp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$p=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,t0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,e0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,n0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,i0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,s0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,r0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,o0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,a0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,l0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,c0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,h0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const u0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,f0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,p0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,x0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,v0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,_0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,M0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,S0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,y0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,b0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,w0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,E0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,T0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,R0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,P0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,I0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,D0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,F0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,z0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,k0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,H0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,G0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,V0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,W0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ee={alphahash_fragment:ud,alphahash_pars_fragment:fd,alphamap_fragment:dd,alphamap_pars_fragment:pd,alphatest_fragment:md,alphatest_pars_fragment:gd,aomap_fragment:xd,aomap_pars_fragment:vd,batching_pars_vertex:_d,batching_vertex:Md,begin_vertex:Sd,beginnormal_vertex:yd,bsdfs:bd,iridescence_fragment:wd,bumpmap_pars_fragment:Ed,clipping_planes_fragment:Td,clipping_planes_pars_fragment:Ad,clipping_planes_pars_vertex:Rd,clipping_planes_vertex:Cd,color_fragment:Pd,color_pars_fragment:Ld,color_pars_vertex:Id,color_vertex:Dd,common:Nd,cube_uv_reflection_fragment:Ud,defaultnormal_vertex:Fd,displacementmap_pars_vertex:Od,displacementmap_vertex:zd,emissivemap_fragment:Bd,emissivemap_pars_fragment:kd,colorspace_fragment:Hd,colorspace_pars_fragment:Gd,envmap_fragment:Vd,envmap_common_pars_fragment:Wd,envmap_pars_fragment:Xd,envmap_pars_vertex:qd,envmap_physical_pars_fragment:ip,envmap_vertex:Yd,fog_vertex:Zd,fog_pars_vertex:Kd,fog_fragment:Jd,fog_pars_fragment:$d,gradientmap_pars_fragment:Qd,lightmap_pars_fragment:jd,lights_lambert_fragment:tp,lights_lambert_pars_fragment:ep,lights_pars_begin:np,lights_toon_fragment:sp,lights_toon_pars_fragment:rp,lights_phong_fragment:op,lights_phong_pars_fragment:ap,lights_physical_fragment:lp,lights_physical_pars_fragment:cp,lights_fragment_begin:hp,lights_fragment_maps:up,lights_fragment_end:fp,lightprobes_pars_fragment:dp,logdepthbuf_fragment:pp,logdepthbuf_pars_fragment:mp,logdepthbuf_pars_vertex:gp,logdepthbuf_vertex:xp,map_fragment:vp,map_pars_fragment:_p,map_particle_fragment:Mp,map_particle_pars_fragment:Sp,metalnessmap_fragment:yp,metalnessmap_pars_fragment:bp,morphinstance_vertex:wp,morphcolor_vertex:Ep,morphnormal_vertex:Tp,morphtarget_pars_vertex:Ap,morphtarget_vertex:Rp,normal_fragment_begin:Cp,normal_fragment_maps:Pp,normal_pars_fragment:Lp,normal_pars_vertex:Ip,normal_vertex:Dp,normalmap_pars_fragment:Np,clearcoat_normal_fragment_begin:Up,clearcoat_normal_fragment_maps:Fp,clearcoat_pars_fragment:Op,iridescence_pars_fragment:zp,opaque_fragment:Bp,packing:kp,premultiplied_alpha_fragment:Hp,project_vertex:Gp,dithering_fragment:Vp,dithering_pars_fragment:Wp,roughnessmap_fragment:Xp,roughnessmap_pars_fragment:qp,shadowmap_pars_fragment:Yp,shadowmap_pars_vertex:Zp,shadowmap_vertex:Kp,shadowmask_pars_fragment:Jp,skinbase_vertex:$p,skinning_pars_vertex:Qp,skinning_vertex:jp,skinnormal_vertex:t0,specularmap_fragment:e0,specularmap_pars_fragment:n0,tonemapping_fragment:i0,tonemapping_pars_fragment:s0,transmission_fragment:r0,transmission_pars_fragment:o0,uv_pars_fragment:a0,uv_pars_vertex:l0,uv_vertex:c0,worldpos_vertex:h0,background_vert:u0,background_frag:f0,backgroundCube_vert:d0,backgroundCube_frag:p0,cube_vert:m0,cube_frag:g0,depth_vert:x0,depth_frag:v0,distance_vert:_0,distance_frag:M0,equirect_vert:S0,equirect_frag:y0,linedashed_vert:b0,linedashed_frag:w0,meshbasic_vert:E0,meshbasic_frag:T0,meshlambert_vert:A0,meshlambert_frag:R0,meshmatcap_vert:C0,meshmatcap_frag:P0,meshnormal_vert:L0,meshnormal_frag:I0,meshphong_vert:D0,meshphong_frag:N0,meshphysical_vert:U0,meshphysical_frag:F0,meshtoon_vert:O0,meshtoon_frag:z0,points_vert:B0,points_frag:k0,shadow_vert:H0,shadow_frag:G0,sprite_vert:V0,sprite_frag:W0},yt={common:{diffuse:{value:new at(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new at(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new at(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new at(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},yn={basic:{uniforms:Ye([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:Ye([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new at(0)},envMapIntensity:{value:1}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:Ye([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new at(0)},specular:{value:new at(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:Ye([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new at(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:Ye([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new at(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:Ye([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:Ye([yt.points,yt.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:Ye([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:Ye([yt.common,yt.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:Ye([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:Ye([yt.sprite,yt.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distance:{uniforms:Ye([yt.common,yt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distance_vert,fragmentShader:ee.distance_frag},shadow:{uniforms:Ye([yt.lights,yt.fog,{color:{value:new at(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};yn.physical={uniforms:Ye([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new at(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new at(0)},specularColor:{value:new at(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};const ar={r:0,b:0,g:0},X0=new Jt,wh=new $t;wh.set(-1,0,0,0,1,0,0,0,1);function q0(i,t,e,n,s,r){const o=new at(0);let a=s===!0?0:1,l,c,h=null,f=0,u=null;function d(y){let T=y.isScene===!0?y.background:null;if(T&&T.isTexture){const _=y.backgroundBlurriness>0;T=t.get(T,_)}return T}function g(y){let T=!1;const _=d(y);_===null?m(o,a):_&&_.isColor&&(m(_,1),T=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?e.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(y,T){const _=d(T);_&&(_.isCubeTexture||_.mapping===Dr)?(c===void 0&&(c=new At(new De(1,1,1),new Be({name:"BackgroundCubeMaterial",uniforms:Wi(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:Ke,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,S,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(X0.makeRotationFromEuler(T.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(wh),c.material.toneMapped=re.getTransfer(_.colorSpace)!==ue,(h!==_||f!==_.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,f=_.version,u=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new At(new Hn(2,2),new Be({name:"BackgroundMaterial",uniforms:Wi(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=re.getTransfer(_.colorSpace)!==ue,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||f!==_.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,f=_.version,u=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,T){y.getRGB(ar,_h(i)),e.buffers.color.setClear(ar.r,ar.g,ar.b,T,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,T=1){o.set(y),a=T,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,m(o,a)},render:g,addToRenderList:v,dispose:p}}function Y0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,o=!1;function a(D,U,E,C,N){let O=!1;const H=f(D,C,E,U);r!==H&&(r=H,c(r.object)),O=d(D,C,E,N),O&&g(D,C,E,N),N!==null&&t.update(N,i.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,_(D,U,E,C),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function l(){return i.createVertexArray()}function c(D){return i.bindVertexArray(D)}function h(D){return i.deleteVertexArray(D)}function f(D,U,E,C){const N=C.wireframe===!0;let O=n[U.id];O===void 0&&(O={},n[U.id]=O);const H=D.isInstancedMesh===!0?D.id:0;let X=O[H];X===void 0&&(X={},O[H]=X);let k=X[E.id];k===void 0&&(k={},X[E.id]=k);let V=k[N];return V===void 0&&(V=u(l()),k[N]=V),V}function u(D){const U=[],E=[],C=[];for(let N=0;N<e;N++)U[N]=0,E[N]=0,C[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:E,attributeDivisors:C,object:D,attributes:{},index:null}}function d(D,U,E,C){const N=r.attributes,O=U.attributes;let H=0;const X=E.getAttributes();for(const k in X)if(X[k].location>=0){const W=N[k];let ut=O[k];if(ut===void 0&&(k==="instanceMatrix"&&D.instanceMatrix&&(ut=D.instanceMatrix),k==="instanceColor"&&D.instanceColor&&(ut=D.instanceColor)),W===void 0||W.attribute!==ut||ut&&W.data!==ut.data)return!0;H++}return r.attributesNum!==H||r.index!==C}function g(D,U,E,C){const N={},O=U.attributes;let H=0;const X=E.getAttributes();for(const k in X)if(X[k].location>=0){let W=O[k];W===void 0&&(k==="instanceMatrix"&&D.instanceMatrix&&(W=D.instanceMatrix),k==="instanceColor"&&D.instanceColor&&(W=D.instanceColor));const ut={};ut.attribute=W,W&&W.data&&(ut.data=W.data),N[k]=ut,H++}r.attributes=N,r.attributesNum=H,r.index=C}function v(){const D=r.newAttributes;for(let U=0,E=D.length;U<E;U++)D[U]=0}function m(D){p(D,0)}function p(D,U){const E=r.newAttributes,C=r.enabledAttributes,N=r.attributeDivisors;E[D]=1,C[D]===0&&(i.enableVertexAttribArray(D),C[D]=1),N[D]!==U&&(i.vertexAttribDivisor(D,U),N[D]=U)}function y(){const D=r.newAttributes,U=r.enabledAttributes;for(let E=0,C=U.length;E<C;E++)U[E]!==D[E]&&(i.disableVertexAttribArray(E),U[E]=0)}function T(D,U,E,C,N,O,H){H===!0?i.vertexAttribIPointer(D,U,E,N,O):i.vertexAttribPointer(D,U,E,C,N,O)}function _(D,U,E,C){v();const N=C.attributes,O=E.getAttributes(),H=U.defaultAttributeValues;for(const X in O){const k=O[X];if(k.location>=0){let V=N[X];if(V===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(V=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(V=D.instanceColor)),V!==void 0){const W=V.normalized,ut=V.itemSize,it=t.get(V);if(it===void 0)continue;const zt=it.buffer,Gt=it.type,Xt=it.bytesPerElement,Q=Gt===i.INT||Gt===i.UNSIGNED_INT||V.gpuType===Pa;if(V.isInterleavedBufferAttribute){const K=V.data,ct=K.stride,Et=V.offset;if(K.isInstancedInterleavedBuffer){for(let pt=0;pt<k.locationSize;pt++)p(k.location+pt,K.meshPerAttribute);D.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let pt=0;pt<k.locationSize;pt++)m(k.location+pt);i.bindBuffer(i.ARRAY_BUFFER,zt);for(let pt=0;pt<k.locationSize;pt++)T(k.location+pt,ut/k.locationSize,Gt,W,ct*Xt,(Et+ut/k.locationSize*pt)*Xt,Q)}else{if(V.isInstancedBufferAttribute){for(let K=0;K<k.locationSize;K++)p(k.location+K,V.meshPerAttribute);D.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let K=0;K<k.locationSize;K++)m(k.location+K);i.bindBuffer(i.ARRAY_BUFFER,zt);for(let K=0;K<k.locationSize;K++)T(k.location+K,ut/k.locationSize,Gt,W,ut*Xt,ut/k.locationSize*K*Xt,Q)}}else if(H!==void 0){const W=H[X];if(W!==void 0)switch(W.length){case 2:i.vertexAttrib2fv(k.location,W);break;case 3:i.vertexAttrib3fv(k.location,W);break;case 4:i.vertexAttrib4fv(k.location,W);break;default:i.vertexAttrib1fv(k.location,W)}}}}y()}function R(){b();for(const D in n){const U=n[D];for(const E in U){const C=U[E];for(const N in C){const O=C[N];for(const H in O)h(O[H].object),delete O[H];delete C[N]}}delete n[D]}}function S(D){if(n[D.id]===void 0)return;const U=n[D.id];for(const E in U){const C=U[E];for(const N in C){const O=C[N];for(const H in O)h(O[H].object),delete O[H];delete C[N]}}delete n[D.id]}function P(D){for(const U in n){const E=n[U];for(const C in E){const N=E[C];if(N[D.id]===void 0)continue;const O=N[D.id];for(const H in O)h(O[H].object),delete O[H];delete N[D.id]}}}function x(D){for(const U in n){const E=n[U],C=D.isInstancedMesh===!0?D.id:0,N=E[C];if(N!==void 0){for(const O in N){const H=N[O];for(const X in H)h(H[X].object),delete H[X];delete N[O]}delete E[C],Object.keys(E).length===0&&delete n[U]}}}function b(){w(),o=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:b,resetDefaultState:w,dispose:R,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function Z0(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function K0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==Ze&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const x=P===xn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==tn&&P!==an&&!x&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(Vt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Vt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:T,maxFragmentUniforms:_,maxSamples:R,samples:S}}function J0(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Qn,a=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const d=f.length!==0||u||n!==0||s;return s=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){const g=f.clippingPlanes,v=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const y=r?0:n,T=y*4;let _=p.clippingState||null;l.value=_,_=h(g,u,T,d);for(let R=0;R!==T;++R)_[R]=e[R];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,u,d,g){const v=f!==null?f.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=d+v*4,y=u.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let T=0,_=d;T!==v;++T,_+=4)o.copy(f[T]).applyMatrix4(y,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}const Oi=4,$0=6,Q0=20,j0=256,ss=new ja,oc=new at;let So=null,yo=0,bo=0,wo=!1;const tm=new L,ci=new L;class ac{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=tm}=r;So=this._renderer.getRenderTarget(),yo=this._renderer.getActiveCubeFace(),bo=this._renderer.getActiveMipmapLevel(),wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(So,yo,bo),this._renderer.xr.enabled=wo,t.scissorTest=!1,Di(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===di||t.mapping===Hi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),So=this._renderer.getRenderTarget(),yo=this._renderer.getActiveCubeFace(),bo=this._renderer.getActiveMipmapLevel(),wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ae,minFilter:Ae,generateMipmaps:!1,type:xn,format:Ze,colorSpace:br,depthBuffer:!1},s=lc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lc(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=em(r)),this._blurMaterial=im(r,t,e),this._ggxMaterial=nm(r,t,e)}return s}_compileMaterial(t){const e=new At(new le,t);this._renderer.compile(e,ss)}_sceneToCubeUV(t,e,n,s,r){const l=new rn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(oc),f.toneMapping=Tn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new At(new De,new us({name:"PMREM.Background",side:Ke,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let p=!1;const y=t.background;y?y.isColor&&(m.color.copy(y),t.background=null,p=!0):(m.color.copy(oc),p=!0);for(let T=0;T<6;T++){const _=T%3;_===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[T],r.y,r.z)):_===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[T]));const R=this._cubeSize;Di(s,_*R,T>2?R:0,R,R),f.setRenderTarget(s),p&&f.render(v,l),f.render(t,l)}f.toneMapping=d,f.autoClear=u,t.background=y}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===di||t.mapping===Hi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Di(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ss)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const l=o.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),u=c*1.25,d=f*u,{_lodMax:g}=this,v=this._sizeLods[n],m=3*v*(n>g-Oi?n-g+Oi:0),p=4*(this._cubeSize-v);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-e,Di(r,m,p,3*v,2*v),s.setRenderTarget(r),s.render(a,ss),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Di(t,m,p,3*v,2*v),s.setRenderTarget(t),s.render(a,ss)}_blur(t,e,n,s){const r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){const o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[s];l.material=a;const c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;const h=this._sizeLods[s],f=3*h*(s>this._lodMax-Oi?s-this._lodMax+Oi:0),u=4*(this._cubeSize-h);Di(e,f,u,3*h,2*h),o.setRenderTarget(e),o.render(l,ss)}}function em(i){const t=[],e=[];let n=i;const s=i-Oi+1+$0;for(let r=0;r<s;r++){const o=Math.pow(2,n);t.push(o);const a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,u=6,d=3,g=new Float32Array(d*u*f),v=new Float32Array(d*u*f);for(let p=0;p<f;p++){const y=p%3*2/3-1,T=p>2?0:-1,_=[y,T,0,y+2/3,T,0,y+2/3,T+1,0,y,T,0,y+2/3,T+1,0,y,T+1,0];g.set(_,d*u*p);for(let R=0;R<u;R++){const S=h[R*2]*2-1,P=h[R*2+1]*2-1;p===0?ci.set(1,P,S):p===1?ci.set(-S,1,-P):p===2?ci.set(-S,P,1):p===3?ci.set(-1,P,-S):p===4?ci.set(-S,-1,P):ci.set(S,P,-1),ci.toArray(v,(p*u+R)*d)}}const m=new le;m.setAttribute("position",new Se(g,d)),m.setAttribute("outputDirection",new Se(v,d)),e.push(new At(m,null)),n>Oi&&n--}return{lodMeshes:e,sizeLods:t}}function lc(i,t,e){const n=new gn(i,t,e);return n.texture.mapping=Dr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Di(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function nm(i,t,e){return new Be({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:j0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ur(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function im(i,t,e){return new Be({name:"SphericalGaussianBlur",defines:{SAMPLES:Q0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ur(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function cc(){return new Be({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ur(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function hc(){return new Be({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ur(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Ur(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Eh extends gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new rh(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new De(5,5,5),r=new Be({name:"CubemapFromEquirect",uniforms:Wi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ke,blending:zn});r.uniforms.tEquirect.value=e;const o=new At(s,r),a=e.minFilter;return e.minFilter===On&&(e.minFilter=Ae),new od(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}function sm(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,d=!1){return u==null?null:d?o(u):r(u)}function r(u){if(u&&u.isTexture){const d=u.mapping;if(d===Hr||d===Gr)if(t.has(u)){const g=t.get(u).texture;return a(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const v=new Eh(g.height);return v.fromEquirectangularTexture(i,u),t.set(u,v),u.addEventListener("dispose",c),a(v.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){const d=u.mapping,g=d===Hr||d===Gr,v=d===di||d===Hi;if(g||v){let m=e.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new ac(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{const y=u.image;return g&&y&&y.height>0||v&&y&&l(y)?(n===null&&(n=new ac(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function a(u,d){return d===Hr?u.mapping=di:d===Gr&&(u.mapping=Hi),u}function l(u){let d=0;const g=6;for(let v=0;v<g;v++)u[v]!==void 0&&d++;return d===g}function c(u){const d=u.target;d.removeEventListener("dispose",c);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function h(u){const d=u.target;d.removeEventListener("dispose",h);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function rm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&zi("WebGLRenderer: "+n+" extension not supported."),s}}}function om(i,t,e,n){const s={},r=new WeakMap;function o(f){const u=f.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];const d=r.get(u);d&&(t.remove(d),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(f,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function l(f){const u=f.attributes;for(const d in u)t.update(u[d],i.ARRAY_BUFFER)}function c(f){const u=[],d=f.index,g=f.attributes.position;let v=0;if(g===void 0)return;if(d!==null){const y=d.array;v=d.version;for(let T=0,_=y.length;T<_;T+=3){const R=y[T+0],S=y[T+1],P=y[T+2];u.push(R,S,S,P,P,R)}}else{const y=g.array;v=g.version;for(let T=0,_=y.length/3-1;T<_;T+=3){const R=T+0,S=T+1,P=T+2;u.push(R,S,S,P,P,R)}}const m=new(g.count>=65535?nh:ka)(u,1);m.version=v;const p=r.get(f);p&&t.remove(p),r.set(f,m)}function h(f){const u=r.get(f);if(u){const d=f.index;d!==null&&u.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:a,update:l,getWireframeAttribute:h}}function am(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,u){i.drawElements(n,u,r,f*o),e.update(u,n,1)}function c(f,u,d){d!==0&&(i.drawElementsInstanced(n,u,r,f*o,d),e.update(u,n,d))}function h(f,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let v=0;for(let m=0;m<d;m++)v+=u[m];e.update(v,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function lm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:ae("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function cm(i,t,e){const n=new WeakMap,s=new fe;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==f){let b=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",b)};u!==void 0&&u.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let T=0;d===!0&&(T=1),g===!0&&(T=2),v===!0&&(T=3);let _=a.attributes.position.count*T,R=1;_>t.maxTextureSize&&(R=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const S=new Float32Array(_*R*4*f),P=new jc(S,_,R,f);P.type=an,P.needsUpdate=!0;const x=T*4;for(let w=0;w<f;w++){const D=m[w],U=p[w],E=y[w],C=_*R*4*w;for(let N=0;N<D.count;N++){const O=N*x;d===!0&&(s.fromBufferAttribute(D,N),S[C+O+0]=s.x,S[C+O+1]=s.y,S[C+O+2]=s.z,S[C+O+3]=0),g===!0&&(s.fromBufferAttribute(U,N),S[C+O+4]=s.x,S[C+O+5]=s.y,S[C+O+6]=s.z,S[C+O+7]=0),v===!0&&(s.fromBufferAttribute(E,N),S[C+O+8]=s.x,S[C+O+9]=s.y,S[C+O+10]=s.z,S[C+O+11]=E.itemSize===4?s.w:1)}}u={count:f,texture:P,size:new mt(_,R)},n.set(a,u),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let v=0;v<c.length;v++)d+=c[v];const g=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function hm(i,t,e,n,s){let r=new WeakMap;function o(c){const h=s.render.frame,f=c.geometry,u=t.get(c,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function a(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}const um={[Bc]:"LINEAR_TONE_MAPPING",[kc]:"REINHARD_TONE_MAPPING",[Hc]:"CINEON_TONE_MAPPING",[Ca]:"ACES_FILMIC_TONE_MAPPING",[Vc]:"AGX_TONE_MAPPING",[Wc]:"NEUTRAL_TONE_MAPPING",[Gc]:"CUSTOM_TONE_MAPPING"};function fm(i,t,e,n,s,r){const o=new gn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,l=null;const c=new le;c.setAttribute("position",new Wt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Wt([0,2,0,0,2,0],2));const h=new Zf({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new At(c,h),u=new ja(-1,1,1,-1,0,1);let d=null,g=null,v=!1,m,p=null,y=[],T=!1;this.setSize=function(_,R){o.setSize(_,R),a!==null&&a.setSize(_,R),l!==null&&l.setSize(_,R);for(let S=0;S<y.length;S++){const P=y[S];P.setSize&&P.setSize(_,R)}},this.setEffects=function(_){y=_,T=y.length>0&&y[0].isRenderPass===!0;const R=o.width,S=o.height;y.length>0&&a===null&&(a=new gn(R,S,{type:xn,depthBuffer:!1,stencilBuffer:!1}),l=new gn(R,S,{type:xn,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<y.length;P++){const x=y[P];x.setSize&&x.setSize(R,S)}},this.begin=function(_,R){if(v||_.toneMapping===Tn&&y.length===0)return!1;if(p=R,R!==null){const S=R.width,P=R.height;(o.width!==S||o.height!==P)&&this.setSize(S,P)}return T===!1&&_.setRenderTarget(o),m=_.toneMapping,_.toneMapping=Tn,!0},this.hasRenderPass=function(){return T},this.end=function(_,R){_.toneMapping=m,v=!0;let S=o,P=a;for(let x=0;x<y.length;x++){const b=y[x];b.enabled!==!1&&(b.render(_,P,S,R),b.needsSwap!==!1&&(S=P,P=P===a?l:a))}if(d!==_.outputColorSpace||g!==_.toneMapping){d=_.outputColorSpace,g=_.toneMapping,h.defines={},re.getTransfer(d)===ue&&(h.defines.SRGB_TRANSFER="");const x=um[g];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,_.setRenderTarget(p),_.render(f,u),p=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}const Th=new ze,Ma=new ws(1,1),Ah=new jc,Rh=new Ou,Ch=new rh,uc=[],fc=[],dc=new Float32Array(16),pc=new Float32Array(9),mc=new Float32Array(4);function Yi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=uc[s];if(r===void 0&&(r=new Float32Array(s),uc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Pe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Le(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Fr(i,t){let e=fc[t];e===void 0&&(e=new Int32Array(t),fc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function dm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function pm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;i.uniform2fv(this.addr,t),Le(e,t)}}function mm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;i.uniform3fv(this.addr,t),Le(e,t)}}function gm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;i.uniform4fv(this.addr,t),Le(e,t)}}function xm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,n))return;mc.set(n),i.uniformMatrix2fv(this.addr,!1,mc),Le(e,n)}}function vm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,n))return;pc.set(n),i.uniformMatrix3fv(this.addr,!1,pc),Le(e,n)}}function _m(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,n))return;dc.set(n),i.uniformMatrix4fv(this.addr,!1,dc),Le(e,n)}}function Mm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Sm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;i.uniform2iv(this.addr,t),Le(e,t)}}function ym(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;i.uniform3iv(this.addr,t),Le(e,t)}}function bm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;i.uniform4iv(this.addr,t),Le(e,t)}}function wm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Em(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;i.uniform2uiv(this.addr,t),Le(e,t)}}function Tm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;i.uniform3uiv(this.addr,t),Le(e,t)}}function Am(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;i.uniform4uiv(this.addr,t),Le(e,t)}}function Rm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ma.compareFunction=e.isReversedDepthBuffer()?za:Oa,r=Ma):r=Th,e.setTexture2D(t||r,s)}function Cm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Rh,s)}function Pm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ch,s)}function Lm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Ah,s)}function Im(i){switch(i){case 5126:return dm;case 35664:return pm;case 35665:return mm;case 35666:return gm;case 35674:return xm;case 35675:return vm;case 35676:return _m;case 5124:case 35670:return Mm;case 35667:case 35671:return Sm;case 35668:case 35672:return ym;case 35669:case 35673:return bm;case 5125:return wm;case 36294:return Em;case 36295:return Tm;case 36296:return Am;case 35678:case 36198:case 36298:case 36306:case 35682:return Rm;case 35679:case 36299:case 36307:return Cm;case 35680:case 36300:case 36308:case 36293:return Pm;case 36289:case 36303:case 36311:case 36292:return Lm}}function Dm(i,t){i.uniform1fv(this.addr,t)}function Nm(i,t){const e=Yi(t,this.size,2);i.uniform2fv(this.addr,e)}function Um(i,t){const e=Yi(t,this.size,3);i.uniform3fv(this.addr,e)}function Fm(i,t){const e=Yi(t,this.size,4);i.uniform4fv(this.addr,e)}function Om(i,t){const e=Yi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function zm(i,t){const e=Yi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Bm(i,t){const e=Yi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function km(i,t){i.uniform1iv(this.addr,t)}function Hm(i,t){i.uniform2iv(this.addr,t)}function Gm(i,t){i.uniform3iv(this.addr,t)}function Vm(i,t){i.uniform4iv(this.addr,t)}function Wm(i,t){i.uniform1uiv(this.addr,t)}function Xm(i,t){i.uniform2uiv(this.addr,t)}function qm(i,t){i.uniform3uiv(this.addr,t)}function Ym(i,t){i.uniform4uiv(this.addr,t)}function Zm(i,t,e){const n=this.cache,s=t.length,r=Fr(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Ma:o=Th;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function Km(i,t,e){const n=this.cache,s=t.length,r=Fr(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Rh,r[o])}function Jm(i,t,e){const n=this.cache,s=t.length,r=Fr(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Ch,r[o])}function $m(i,t,e){const n=this.cache,s=t.length,r=Fr(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Ah,r[o])}function Qm(i){switch(i){case 5126:return Dm;case 35664:return Nm;case 35665:return Um;case 35666:return Fm;case 35674:return Om;case 35675:return zm;case 35676:return Bm;case 5124:case 35670:return km;case 35667:case 35671:return Hm;case 35668:case 35672:return Gm;case 35669:case 35673:return Vm;case 5125:return Wm;case 36294:return Xm;case 36295:return qm;case 36296:return Ym;case 35678:case 36198:case 36298:case 36306:case 35682:return Zm;case 35679:case 36299:case 36307:return Km;case 35680:case 36300:case 36308:case 36293:return Jm;case 36289:case 36303:case 36311:case 36292:return $m}}class jm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Im(e.type)}}class tg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Qm(e.type)}}class eg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Eo=/(\w+)(\])?(\[|\.)?/g;function gc(i,t){i.seq.push(t),i.map[t.id]=t}function ng(i,t,e){const n=i.name,s=n.length;for(Eo.lastIndex=0;;){const r=Eo.exec(n),o=Eo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){gc(e,c===void 0?new jm(a,i,t):new tg(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new eg(a),gc(e,f)),e=f}}}class xr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);ng(a,l,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function xc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const ig=37297;let sg=0;function rg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const vc=new $t;function og(i){re._getMatrix(vc,re.workingColorSpace,i);const t=`mat3( ${vc.elements.map(e=>e.toFixed(4))} )`;switch(re.getTransfer(i)){case wr:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return Vt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function _c(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+rg(i.getShaderSource(t),a)}else return r}function ag(i,t){const e=og(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const lg={[Bc]:"Linear",[kc]:"Reinhard",[Hc]:"Cineon",[Ca]:"ACESFilmic",[Vc]:"AgX",[Wc]:"Neutral",[Gc]:"Custom"};function cg(i,t){const e=lg[t];return e===void 0?(Vt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const lr=new L;function hg(){re.getLuminanceCoefficients(lr);const i=lr.x.toFixed(4),t=lr.y.toFixed(4),e=lr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ug(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cs).join(`
`)}function fg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function dg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function cs(i){return i!==""}function Mc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const pg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sa(i){return i.replace(pg,gg)}const mg=new Map;function gg(i,t){let e=ee[t];if(e===void 0){const n=mg.get(t);if(n!==void 0)e=ee[n],Vt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Sa(e)}const xg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yc(i){return i.replace(xg,vg)}function vg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function bc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const _g={[ur]:"SHADOWMAP_TYPE_PCF",[as]:"SHADOWMAP_TYPE_VSM"};function Mg(i){return _g[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Sg={[di]:"ENVMAP_TYPE_CUBE",[Hi]:"ENVMAP_TYPE_CUBE",[Dr]:"ENVMAP_TYPE_CUBE_UV"};function yg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Sg[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const bg={[Hi]:"ENVMAP_MODE_REFRACTION"};function wg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":bg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Eg={[Ra]:"ENVMAP_BLENDING_MULTIPLY",[du]:"ENVMAP_BLENDING_MIX",[pu]:"ENVMAP_BLENDING_ADD"};function Tg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Eg[i.combine]||"ENVMAP_BLENDING_NONE"}function Ag(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Rg(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Mg(e),c=yg(e),h=wg(e),f=Tg(e),u=Ag(e),d=ug(e),g=fg(r),v=s.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(cs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(cs).join(`
`),p.length>0&&(p+=`
`)):(m=[bc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cs).join(`
`),p=[bc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Tn?"#define TONE_MAPPING":"",e.toneMapping!==Tn?ee.tonemapping_pars_fragment:"",e.toneMapping!==Tn?cg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,ag("linearToOutputTexel",e.outputColorSpace),hg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(cs).join(`
`)),o=Sa(o),o=Mc(o,e),o=Sc(o,e),a=Sa(a),a=Mc(a,e),a=Sc(a,e),o=yc(o),a=yc(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=y+m+o,_=y+p+a,R=xc(s,s.VERTEX_SHADER,T),S=xc(s,s.FRAGMENT_SHADER,_);s.attachShader(v,R),s.attachShader(v,S),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function P(D){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(v)||"",E=s.getShaderInfoLog(R)||"",C=s.getShaderInfoLog(S)||"",N=U.trim(),O=E.trim(),H=C.trim();let X=!0,k=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,R,S);else{const V=_c(s,R,"vertex"),W=_c(s,S,"fragment");ae("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+N+`
`+V+`
`+W)}else N!==""?Vt("WebGLProgram: Program Info Log:",N):(O===""||H==="")&&(k=!1);k&&(D.diagnostics={runnable:X,programLog:N,vertexShader:{log:O,prefix:m},fragmentShader:{log:H,prefix:p}})}s.deleteShader(R),s.deleteShader(S),x=new xr(s,v),b=dg(s,v)}let x;this.getUniforms=function(){return x===void 0&&P(this),x};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=s.getProgramParameter(v,ig)),w},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=sg++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=S,this}let Cg=0;class Pg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Lg(t),e.set(t,n)),n}}class Lg{constructor(t){this.id=Cg++,this.code=t,this.usedTimes=0}}function Ig(i){return i===pi||i===Mr||i===Sr}function Dg(i,t,e,n,s,r){const o=new th,a=new Pg,l=new Set,c=[],h=new Map,f=n.logarithmicDepthBuffer;let u=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function v(x,b,w,D,U,E){const C=D.fog,N=U.geometry,O=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,H=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,X=t.get(x.envMap||O,H),k=X&&X.mapping===Dr?X.image.height:null,V=d[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&Vt("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const W=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,ut=W!==void 0?W.length:0;let it=0;N.morphAttributes.position!==void 0&&(it=1),N.morphAttributes.normal!==void 0&&(it=2),N.morphAttributes.color!==void 0&&(it=3);let zt,Gt,Xt,Q;if(V){const me=yn[V];zt=me.vertexShader,Gt=me.fragmentShader}else{zt=x.vertexShader,Gt=x.fragmentShader;const me=a.getVertexShaderStage(x),ce=a.getFragmentShaderStage(x);a.update(x,me,ce),Xt=me.id,Q=ce.id}const K=i.getRenderTarget(),ct=i.state.buffers.depth.getReversed(),Et=U.isInstancedMesh===!0,pt=U.isBatchedMesh===!0,ft=!!x.map,Yt=!!x.matcap,$=!!X,st=!!x.aoMap,lt=!!x.lightMap,ot=!!x.bumpMap&&x.wireframe===!1,ht=!!x.normalMap,Dt=!!x.displacementMap,Pt=!!x.emissiveMap,Nt=!!x.metalnessMap,Zt=!!x.roughnessMap,F=x.anisotropy>0,ie=x.clearcoat>0,Qt=x.dispersion>0,I=x.retroreflectivity>0,M=x.iridescence>0,G=x.sheen>0,Z=x.transmission>0,j=F&&!!x.anisotropyMap,dt=ie&&!!x.clearcoatMap,gt=ie&&!!x.clearcoatNormalMap,tt=ie&&!!x.clearcoatRoughnessMap,nt=M&&!!x.iridescenceMap,xt=M&&!!x.iridescenceThicknessMap,Bt=G&&!!x.sheenColorMap,St=G&&!!x.sheenRoughnessMap,vt=!!x.specularMap,kt=!!x.specularColorMap,qt=!!x.specularIntensityMap,jt=Z&&!!x.transmissionMap,B=Z&&!!x.thicknessMap,_t=!!x.gradientMap,et=!!x.alphaMap,Mt=x.alphaTest>0,Tt=!!x.alphaHash,rt=!!x.extensions;let Ht=Tn;x.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Ht=i.toneMapping);const Ut={shaderID:V,shaderType:x.type,shaderName:x.name,vertexShader:zt,fragmentShader:Gt,defines:x.defines,customVertexShaderID:Xt,customFragmentShaderID:Q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:pt,batchingColor:pt&&U._colorsTexture!==null,instancing:Et,instancingColor:Et&&U.instanceColor!==null,instancingMorph:Et&&U.morphTexture!==null,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:re.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ft,matcap:Yt,envMap:$,envMapMode:$&&X.mapping,envMapCubeUVHeight:k,aoMap:st,lightMap:lt,bumpMap:ot,normalMap:ht,displacementMap:Dt,emissiveMap:Pt,normalMapObjectSpace:ht&&x.normalMapType===vu,normalMapTangentSpace:ht&&x.normalMapType===yr,packedNormalMap:ht&&x.normalMapType===yr&&Ig(x.normalMap.format),metalnessMap:Nt,roughnessMap:Zt,anisotropy:F,anisotropyMap:j,clearcoat:ie,clearcoatMap:dt,clearcoatNormalMap:gt,clearcoatRoughnessMap:tt,dispersion:Qt,retroreflection:I,iridescence:M,iridescenceMap:nt,iridescenceThicknessMap:xt,sheen:G,sheenColorMap:Bt,sheenRoughnessMap:St,specularMap:vt,specularColorMap:kt,specularIntensityMap:qt,transmission:Z,transmissionMap:jt,thicknessMap:B,gradientMap:_t,opaque:x.transparent===!1&&x.blending===hs&&x.alphaToCoverage===!1,alphaMap:et,alphaTest:Mt,alphaHash:Tt,combine:x.combine,mapUv:ft&&g(x.map.channel),aoMapUv:st&&g(x.aoMap.channel),lightMapUv:lt&&g(x.lightMap.channel),bumpMapUv:ot&&g(x.bumpMap.channel),normalMapUv:ht&&g(x.normalMap.channel),displacementMapUv:Dt&&g(x.displacementMap.channel),emissiveMapUv:Pt&&g(x.emissiveMap.channel),metalnessMapUv:Nt&&g(x.metalnessMap.channel),roughnessMapUv:Zt&&g(x.roughnessMap.channel),anisotropyMapUv:j&&g(x.anisotropyMap.channel),clearcoatMapUv:dt&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:gt&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:xt&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:St&&g(x.sheenRoughnessMap.channel),specularMapUv:vt&&g(x.specularMap.channel),specularColorMapUv:kt&&g(x.specularColorMap.channel),specularIntensityMapUv:qt&&g(x.specularIntensityMap.channel),transmissionMapUv:jt&&g(x.transmissionMap.channel),thicknessMapUv:B&&g(x.thicknessMap.channel),alphaMapUv:et&&g(x.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(ht||F),vertexNormals:!!N.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!N.attributes.uv&&(ft||et),fog:!!C,useFog:x.fog===!0,fogExp2:!!C&&C.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||N.attributes.normal===void 0&&ht===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ct,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:ut,morphTextureStride:it,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:E.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&w.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ht,decodeVideoTexture:ft&&x.map.isVideoTexture===!0&&re.getTransfer(x.map.colorSpace)===ue,decodeVideoTextureEmissive:Pt&&x.emissiveMap.isVideoTexture===!0&&re.getTransfer(x.emissiveMap.colorSpace)===ue,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Xe,flipSided:x.side===Ke,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:rt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&x.extensions.multiDraw===!0||pt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ut.vertexUv1s=l.has(1),Ut.vertexUv2s=l.has(2),Ut.vertexUv3s=l.has(3),l.clear(),Ut}function m(x){const b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(const w in x.defines)b.push(w),b.push(x.defines[w]);return x.isRawShaderMaterial===!1&&(p(b,x),y(b,x),b.push(i.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function p(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapCubeUVHeight),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.morphAttributeCount),x.push(b.numSunLights),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numSunLightShadows),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function y(x,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.retroreflection&&o.enable(24),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),b.packedNormalMap&&o.enable(22),b.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),b.numLightProbeGrids>0&&o.enable(22),b.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function T(x){const b=d[x.type];let w;if(b){const D=yn[b];w=Xf.clone(D.uniforms)}else w=x.uniforms;return w}function _(x,b){let w=h.get(b);return w!==void 0?++w.usedTimes:(w=new Rg(i,b,x,s),c.push(w),h.set(b,w)),w}function R(x){if(--x.usedTimes===0){const b=c.indexOf(x);c[b]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function S(x){a.remove(x)}function P(){a.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:T,acquireProgram:_,releaseProgram:R,releaseShaderCache:S,programs:c,dispose:P}}function Ng(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Ug(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function wc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ec(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function a(u,d,g,v,m,p){let y=i[t];return y===void 0?(y={id:u.id,object:u,geometry:d,material:g,materialVariant:o(u),groupOrder:v,renderOrder:u.renderOrder,z:m,group:p},i[t]=y):(y.id=u.id,y.object=u,y.geometry=d,y.material=g,y.materialVariant=o(u),y.groupOrder=v,y.renderOrder=u.renderOrder,y.z=m,y.group=p),t++,y}function l(u,d,g,v,m,p,y){y.reversedDepth===!0&&(m=-m);const T=a(u,d,g,v,m,p);g.transmission>0?n.push(T):g.transparent===!0?s.push(T):e.push(T)}function c(u,d,g,v,m,p){const y=a(u,d,g,v,m,p);g.transmission>0?n.unshift(y):g.transparent===!0?s.unshift(y):e.unshift(y)}function h(u,d){e.length>1&&e.sort(u||Ug),n.length>1&&n.sort(d||wc),s.length>1&&s.sort(d||wc)}function f(){for(let u=t,d=i.length;u<d;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:f,sort:h}}function Fg(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Ec,i.set(n,[o])):s>=r.length?(o=new Ec,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Og(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new L,color:new at};break;case"SpotLight":e={position:new L,direction:new L,color:new at,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new at,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new at,groundColor:new at};break;case"RectAreaLight":e={color:new at,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function zg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Bg=0;function kg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Hg(i){const t=new Og,e=zg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new Jt,o=new Jt;function a(c){let h=0,f=0,u=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,y=0,T=0,_=0,R=0,S=0,P=0,x=0,b=0,w=0;c.sort(kg);for(let U=0,E=c.length;U<E;U++){const C=c[U],N=C.color,O=C.intensity,H=C.distance;let X=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===pi?X=C.shadow.map.texture:X=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=N.r*O,f+=N.g*O,u+=N.b*O;else if(C.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(C.sh.coefficients[k],O);w++}else if(C.isSunLight){const k=t.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const V=C.shadow,W=e.get(C);W.shadowIntensity=V.intensity,W.shadowBias=V.bias,W.shadowNormalBias=V.normalBias,W.shadowRadius=V.radius,W.shadowMapSize.copy(V.mapSize).multiply(V.getFrameExtents()),n.sunShadow[g]=W,n.sunShadowMap[g]=X;const ut=V.getViewportCount();for(let it=0;it<ut;it++)n.sunShadowMatrix[v+it]=V.getMatrix(it),n.sunShadowCascade[v+it]=V._cascadeData[it];v+=ut,g++}n.sun[d]=k,d++}else if(C.isDirectionalLight){const k=t.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const V=C.shadow,W=e.get(C);W.shadowIntensity=V.intensity,W.shadowBias=V.bias,W.shadowNormalBias=V.normalBias,W.shadowRadius=V.radius,W.shadowMapSize=V.mapSize,n.directionalShadow[m]=W,n.directionalShadowMap[m]=X,n.directionalShadowMatrix[m]=C.shadow.matrix,R++}n.directional[m]=k,m++}else if(C.isSpotLight){const k=t.get(C);k.position.setFromMatrixPosition(C.matrixWorld),k.color.copy(N).multiplyScalar(O),k.distance=H,k.coneCos=Math.cos(C.angle),k.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),k.decay=C.decay,n.spot[y]=k;const V=C.shadow;if(C.map&&(n.spotLightMap[x]=C.map,x++,V.updateMatrices(C),C.castShadow&&b++),n.spotLightMatrix[y]=V.matrix,C.castShadow){const W=e.get(C);W.shadowIntensity=V.intensity,W.shadowBias=V.bias,W.shadowNormalBias=V.normalBias,W.shadowRadius=V.radius,W.shadowMapSize=V.mapSize,n.spotShadow[y]=W,n.spotShadowMap[y]=X,P++}y++}else if(C.isRectAreaLight){const k=t.get(C);k.color.copy(N).multiplyScalar(O),k.halfWidth.set(C.width*.5,0,0),k.halfHeight.set(0,C.height*.5,0),n.rectArea[T]=k,T++}else if(C.isPointLight){const k=t.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),k.distance=C.distance,k.decay=C.decay,C.castShadow){const V=C.shadow,W=e.get(C);W.shadowIntensity=V.intensity,W.shadowBias=V.bias,W.shadowNormalBias=V.normalBias,W.shadowRadius=V.radius,W.shadowMapSize=V.mapSize,W.shadowCameraNear=V.camera.near,W.shadowCameraFar=V.camera.far,n.pointShadow[p]=W,n.pointShadowMap[p]=X,n.pointShadowMatrix[p]=C.shadow.matrix,S++}n.point[p]=k,p++}else if(C.isHemisphereLight){const k=t.get(C);k.skyColor.copy(C.color).multiplyScalar(O),k.groundColor.copy(C.groundColor).multiplyScalar(O),n.hemi[_]=k,_++}}T>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=yt.LTC_FLOAT_1,n.rectAreaLTC2=yt.LTC_FLOAT_2):(n.rectAreaLTC1=yt.LTC_HALF_1,n.rectAreaLTC2=yt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const D=n.hash;(D.sunLength!==d||D.directionalLength!==m||D.pointLength!==p||D.spotLength!==y||D.rectAreaLength!==T||D.hemiLength!==_||D.numSunShadows!==g||D.numDirectionalShadows!==R||D.numPointShadows!==S||D.numSpotShadows!==P||D.numSpotMaps!==x||D.numLightProbes!==w)&&(n.sun.length=d,n.directional.length=m,n.spot.length=y,n.rectArea.length=T,n.point.length=p,n.hemi.length=_,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=R,n.directionalShadowMap.length=R,n.directionalShadowMatrix.length=R,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=P,n.spotShadowMap.length=P,n.spotLightMatrix.length=P+x-b,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=w,D.sunLength=d,D.directionalLength=m,D.pointLength=p,D.spotLength=y,D.rectAreaLength=T,D.hemiLength=_,D.numSunShadows=g,D.numDirectionalShadows=R,D.numPointShadows=S,D.numSpotShadows=P,D.numSpotMaps=x,D.numLightProbes=w,n.version=Bg++)}function l(c,h){let f=0,u=0,d=0,g=0,v=0,m=0;const p=h.matrixWorldInverse;for(let y=0,T=c.length;y<T;y++){const _=c[y];if(_.isSunLight){const R=n.sun[f];R.direction.setFromMatrixPosition(_.matrixWorld),R.direction.transformDirection(p),f++}else if(_.isDirectionalLight){const R=n.directional[u];R.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(p),u++}else if(_.isSpotLight){const R=n.spot[g];R.position.setFromMatrixPosition(_.matrixWorld),R.position.applyMatrix4(p),R.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(p),g++}else if(_.isRectAreaLight){const R=n.rectArea[v];R.position.setFromMatrixPosition(_.matrixWorld),R.position.applyMatrix4(p),o.identity(),r.copy(_.matrixWorld),r.premultiply(p),o.extractRotation(r),R.halfWidth.set(_.width*.5,0,0),R.halfHeight.set(0,_.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),v++}else if(_.isPointLight){const R=n.point[d];R.position.setFromMatrixPosition(_.matrixWorld),R.position.applyMatrix4(p),d++}else if(_.isHemisphereLight){const R=n.hemi[m];R.direction.setFromMatrixPosition(_.matrixWorld),R.direction.transformDirection(p),m++}}}return{setup:a,setupView:l,state:n}}function Tc(i){const t=new Hg(i),e=[],n=[],s=[];function r(u){f.camera=u,e.length=0,n.length=0,s.length=0}function o(u){e.push(u)}function a(u){n.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}const f={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function Gg(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Tc(i),t.set(s,[a])):r>=o.length?(a=new Tc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Vg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Wg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Xg=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],qg=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Ac=new Jt,rs=new L,To=new L;function Yg(i,t,e){let n=new Ga;const s=new mt,r=new mt,o=new fe,a=new Jf,l=new $f,c={},h=e.maxTextureSize,f={[fi]:Ke,[Ke]:fi,[Xe]:Xe},u=new Be({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:Vg,fragmentShader:Wg}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const g=new le;g.setAttribute("position",new Se(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new At(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ur;let p=this.type;this.render=function(S,P,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===Fc&&(Vt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ur);const b=i.getRenderTarget(),w=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),U=i.state;U.setBlending(zn),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const E=p!==this.type;E&&P.traverse(function(C){C.material&&(Array.isArray(C.material)?C.material.forEach(N=>N.needsUpdate=!0):C.material.needsUpdate=!0)});for(let C=0,N=S.length;C<N;C++){const O=S[C],H=O.shadow;if(H===void 0){Vt("WebGLShadowMap:",O,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const X=H.getFrameExtents();s.multiply(X),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/X.x),s.x=r.x*X.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/X.y),s.y=r.y*X.y,H.mapSize.y=r.y));const k=i.state.buffers.depth.getReversed();if(H.camera._reversedDepth=k,H.map===null||E===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===as){if(O.isPointLight){Vt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new gn(s.x,s.y,{format:pi,type:xn,minFilter:Ae,magFilter:Ae,generateMipmaps:!1}),H.map.texture.name=O.name+".shadowMap",H.map.depthTexture=new ws(s.x,s.y,an),H.map.depthTexture.name=O.name+".shadowMapDepth",H.map.depthTexture.format=kn,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Oe,H.map.depthTexture.magFilter=Oe}else O.isPointLight?(H.map=new Eh(s.x),H.map.depthTexture=new ff(s.x,An)):(H.map=new gn(s.x,s.y),H.map.depthTexture=new ws(s.x,s.y,An)),H.map.depthTexture.name=O.name+".shadowMap",H.map.depthTexture.format=kn,this.type===ur?(H.map.depthTexture.compareFunction=k?za:Oa,H.map.depthTexture.minFilter=Ae,H.map.depthTexture.magFilter=Ae):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Oe,H.map.depthTexture.magFilter=Oe);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==s.x||H.map.height!==s.y)&&H.map.setSize(s.x,s.y);const V=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();O.isPointLight!==!0&&H.updateMatrices(O,x);for(let W=0;W<V;W++){const ut=H.getCamera(W);if(O.isPointLight){const it=H.camera,zt=H.matrix,Gt=O.distance||it.far;Gt!==it.far&&(it.far=Gt,it.updateProjectionMatrix()),rs.setFromMatrixPosition(O.matrixWorld),it.position.copy(rs),To.copy(it.position),To.add(Xg[W]),it.up.copy(qg[W]),it.lookAt(To),it.updateMatrixWorld(),zt.makeTranslation(-rs.x,-rs.y,-rs.z),Ac.multiplyMatrices(it.projectionMatrix,it.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Ac,it.coordinateSystem,it.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)i.setRenderTarget(H.map,W),i.clear();else{W===0&&(i.setRenderTarget(H.map),i.clear());const it=H.getViewport(W);o.set(r.x*it.x,r.y*it.y,r.x*it.z,r.y*it.w),U.viewport(o)}n=H.getFrustum(W),_(P,x,ut,O,this.type)}H.isPointLightShadow!==!0&&this.type===as&&y(H,x),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,w,D)};function y(S,P){const x=t.update(v);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null?S.mapPass=new gn(s.x,s.y,{format:pi,type:xn}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value.set(S.map.width,S.map.height),u.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(P,null,x,u,v,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(P,null,x,d,v,null)}function T(S,P,x,b){let w=null;const D=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(D!==void 0)w=D;else if(w=x.isPointLight===!0?l:a,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const U=w.uuid,E=P.uuid;let C=c[U];C===void 0&&(C={},c[U]=C);let N=C[E];N===void 0&&(N=w.clone(),C[E]=N,P.addEventListener("dispose",R)),w=N}if(w.visible=P.visible,w.wireframe=P.wireframe,b===as?w.side=P.shadowSide!==null?P.shadowSide:P.side:w.side=P.shadowSide!==null?P.shadowSide:f[P.side],w.alphaMap=P.alphaMap,w.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,w.map=P.map,w.clipShadows=P.clipShadows,w.clippingPlanes=P.clippingPlanes,w.clipIntersection=P.clipIntersection,w.displacementMap=P.displacementMap,w.displacementScale=P.displacementScale,w.displacementBias=P.displacementBias,w.wireframeLinewidth=P.wireframeLinewidth,w.linewidth=P.linewidth,x.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const U=i.properties.get(w);U.light=x}return w}function _(S,P,x,b,w){if(S.visible===!1)return;if(S.layers.test(P.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&w===as)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);const E=t.update(S),C=S.material;if(Array.isArray(C)){const N=E.groups;for(let O=0,H=N.length;O<H;O++){const X=N[O],k=C[X.materialIndex];if(k&&k.visible){const V=T(S,k,b,w);S.onBeforeShadow(i,S,P,x,E,V,X),i.renderBufferDirect(x,null,E,V,S,X),S.onAfterShadow(i,S,P,x,E,V,X)}}}else if(C.visible){const N=T(S,C,b,w);S.onBeforeShadow(i,S,P,x,E,N,null),i.renderBufferDirect(x,null,E,N,S,null),S.onAfterShadow(i,S,P,x,E,N,null)}}const U=S.children;for(let E=0,C=U.length;E<C;E++)_(U[E],P,x,b,w)}function R(S){S.target.removeEventListener("dispose",R);for(const x in c){const b=c[x],w=S.target.uuid;w in b&&(b[w].dispose(),delete b[w])}}}function Zg(i,t){function e(){let B=!1;const _t=new fe;let et=null;const Mt=new fe(0,0,0,0);return{setMask:function(Tt){et!==Tt&&!B&&(i.colorMask(Tt,Tt,Tt,Tt),et=Tt)},setLocked:function(Tt){B=Tt},setClear:function(Tt,rt,Ht,Ut,me){me===!0&&(Tt*=Ut,rt*=Ut,Ht*=Ut),_t.set(Tt,rt,Ht,Ut),Mt.equals(_t)===!1&&(i.clearColor(Tt,rt,Ht,Ut),Mt.copy(_t))},reset:function(){B=!1,et=null,Mt.set(-1,0,0,0)}}}function n(){let B=!1,_t=!1,et=null,Mt=null,Tt=null;return{setReversed:function(rt){if(_t!==rt){const Ht=t.get("EXT_clip_control");rt?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT),_t=rt;const Ut=Tt;Tt=null,this.setClear(Ut)}},getReversed:function(){return _t},setTest:function(rt){rt?K(i.DEPTH_TEST):ct(i.DEPTH_TEST)},setMask:function(rt){et!==rt&&!B&&(i.depthMask(rt),et=rt)},setFunc:function(rt){if(_t&&(rt=Pu[rt]),Mt!==rt){switch(rt){case Io:i.depthFunc(i.NEVER);break;case Do:i.depthFunc(i.ALWAYS);break;case No:i.depthFunc(i.LESS);break;case vs:i.depthFunc(i.LEQUAL);break;case Uo:i.depthFunc(i.EQUAL);break;case Fo:i.depthFunc(i.GEQUAL);break;case Oo:i.depthFunc(i.GREATER);break;case zo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Mt=rt}},setLocked:function(rt){B=rt},setClear:function(rt){Tt!==rt&&(Tt=rt,_t&&(rt=1-rt),i.clearDepth(rt))},reset:function(){B=!1,et=null,Mt=null,Tt=null,_t=!1}}}function s(){let B=!1,_t=null,et=null,Mt=null,Tt=null,rt=null,Ht=null,Ut=null,me=null;return{setTest:function(ce){B||(ce?K(i.STENCIL_TEST):ct(i.STENCIL_TEST))},setMask:function(ce){_t!==ce&&!B&&(i.stencilMask(ce),_t=ce)},setFunc:function(ce,hn,vn){(et!==ce||Mt!==hn||Tt!==vn)&&(i.stencilFunc(ce,hn,vn),et=ce,Mt=hn,Tt=vn)},setOp:function(ce,hn,vn){(rt!==ce||Ht!==hn||Ut!==vn)&&(i.stencilOp(ce,hn,vn),rt=ce,Ht=hn,Ut=vn)},setLocked:function(ce){B=ce},setClear:function(ce){me!==ce&&(i.clearStencil(ce),me=ce)},reset:function(){B=!1,_t=null,et=null,Mt=null,Tt=null,rt=null,Ht=null,Ut=null,me=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},f={},u={},d=new WeakMap,g=[],v=null,m=!1,p=null,y=null,T=null,_=null,R=null,S=null,P=null,x=new at(0,0,0),b=0,w=!1,D=null,U=null,E=null,C=null,N=null;const O=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,X=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(k)[1]),H=X>=1):k.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),H=X>=2);let V=null,W={};const ut=i.getParameter(i.SCISSOR_BOX),it=i.getParameter(i.VIEWPORT),zt=new fe().fromArray(ut),Gt=new fe().fromArray(it);function Xt(B,_t,et,Mt){const Tt=new Uint8Array(4),rt=i.createTexture();i.bindTexture(B,rt),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ht=0;Ht<et;Ht++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(_t,0,i.RGBA,1,1,Mt,0,i.RGBA,i.UNSIGNED_BYTE,Tt):i.texImage2D(_t+Ht,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Tt);return rt}const Q={};Q[i.TEXTURE_2D]=Xt(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=Xt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=Xt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=Xt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),K(i.DEPTH_TEST),o.setFunc(vs),ot(!1),ht(ul),K(i.CULL_FACE),st(zn);function K(B){h[B]!==!0&&(i.enable(B),h[B]=!0)}function ct(B){h[B]!==!1&&(i.disable(B),h[B]=!1)}function Et(B,_t){return u[B]!==_t?(i.bindFramebuffer(B,_t),u[B]=_t,B===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=_t),B===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=_t),!0):!1}function pt(B,_t){let et=g,Mt=!1;if(B){et=d.get(_t),et===void 0&&(et=[],d.set(_t,et));const Tt=B.textures;if(et.length!==Tt.length||et[0]!==i.COLOR_ATTACHMENT0){for(let rt=0,Ht=Tt.length;rt<Ht;rt++)et[rt]=i.COLOR_ATTACHMENT0+rt;et.length=Tt.length,Mt=!0}}else et[0]!==i.BACK&&(et[0]=i.BACK,Mt=!0);Mt&&i.drawBuffers(et)}function ft(B){return v!==B?(i.useProgram(B),v=B,!0):!1}const Yt={[Ni]:i.FUNC_ADD,[Jh]:i.FUNC_SUBTRACT,[$h]:i.FUNC_REVERSE_SUBTRACT};Yt[Qh]=i.MIN,Yt[jh]=i.MAX;const $={[tu]:i.ZERO,[eu]:i.ONE,[nu]:i.SRC_COLOR,[Oc]:i.SRC_ALPHA,[lu]:i.SRC_ALPHA_SATURATE,[ou]:i.DST_COLOR,[su]:i.DST_ALPHA,[iu]:i.ONE_MINUS_SRC_COLOR,[zc]:i.ONE_MINUS_SRC_ALPHA,[au]:i.ONE_MINUS_DST_COLOR,[ru]:i.ONE_MINUS_DST_ALPHA,[cu]:i.CONSTANT_COLOR,[hu]:i.ONE_MINUS_CONSTANT_COLOR,[uu]:i.CONSTANT_ALPHA,[fu]:i.ONE_MINUS_CONSTANT_ALPHA};function st(B,_t,et,Mt,Tt,rt,Ht,Ut,me,ce){if(B===zn){m===!0&&(ct(i.BLEND),m=!1);return}if(m===!1&&(K(i.BLEND),m=!0),B!==Kh){if(B!==p||ce!==w){if((y!==Ni||R!==Ni)&&(i.blendEquation(i.FUNC_ADD),y=Ni,R=Ni),ce)switch(B){case hs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xs:i.blendFunc(i.ONE,i.ONE);break;case fl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case dl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ae("WebGLState: Invalid blending: ",B);break}else switch(B){case hs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case fl:ae("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case dl:ae("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ae("WebGLState: Invalid blending: ",B);break}T=null,_=null,S=null,P=null,x.set(0,0,0),b=0,p=B,w=ce}return}Tt=Tt||_t,rt=rt||et,Ht=Ht||Mt,(_t!==y||Tt!==R)&&(i.blendEquationSeparate(Yt[_t],Yt[Tt]),y=_t,R=Tt),(et!==T||Mt!==_||rt!==S||Ht!==P)&&(i.blendFuncSeparate($[et],$[Mt],$[rt],$[Ht]),T=et,_=Mt,S=rt,P=Ht),(Ut.equals(x)===!1||me!==b)&&(i.blendColor(Ut.r,Ut.g,Ut.b,me),x.copy(Ut),b=me),p=B,w=!1}function lt(B,_t){B.side===Xe?ct(i.CULL_FACE):K(i.CULL_FACE);let et=B.side===Ke;_t&&(et=!et),ot(et),B.blending===hs&&B.transparent===!1?st(zn):st(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const Mt=B.stencilWrite;a.setTest(Mt),Mt&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Pt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function ot(B){D!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),D=B)}function ht(B){B!==Yh?(K(i.CULL_FACE),B!==U&&(B===ul?i.cullFace(i.BACK):B===Zh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ct(i.CULL_FACE),U=B}function Dt(B){B!==E&&(H&&i.lineWidth(B),E=B)}function Pt(B,_t,et){B?(K(i.POLYGON_OFFSET_FILL),(C!==_t||N!==et)&&(C=_t,N=et,o.getReversed()&&(_t=-_t),i.polygonOffset(_t,et))):ct(i.POLYGON_OFFSET_FILL)}function Nt(B){B?K(i.SCISSOR_TEST):ct(i.SCISSOR_TEST)}function Zt(B){B===void 0&&(B=i.TEXTURE0+O-1),V!==B&&(i.activeTexture(B),V=B)}function F(B,_t,et){et===void 0&&(V===null?et=i.TEXTURE0+O-1:et=V);let Mt=W[et];Mt===void 0&&(Mt={type:void 0,texture:void 0},W[et]=Mt),(Mt.type!==B||Mt.texture!==_t)&&(V!==et&&(i.activeTexture(et),V=et),i.bindTexture(B,_t||Q[B]),Mt.type=B,Mt.texture=_t)}function ie(){const B=W[V];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function Qt(){try{i.compressedTexImage2D(...arguments)}catch(B){ae("WebGLState:",B)}}function I(){try{i.compressedTexImage3D(...arguments)}catch(B){ae("WebGLState:",B)}}function M(){try{i.texSubImage2D(...arguments)}catch(B){ae("WebGLState:",B)}}function G(){try{i.texSubImage3D(...arguments)}catch(B){ae("WebGLState:",B)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(B){ae("WebGLState:",B)}}function j(){try{i.compressedTexSubImage3D(...arguments)}catch(B){ae("WebGLState:",B)}}function dt(){try{i.texStorage2D(...arguments)}catch(B){ae("WebGLState:",B)}}function gt(){try{i.texStorage3D(...arguments)}catch(B){ae("WebGLState:",B)}}function tt(){try{i.texImage2D(...arguments)}catch(B){ae("WebGLState:",B)}}function nt(){try{i.texImage3D(...arguments)}catch(B){ae("WebGLState:",B)}}function xt(B){return f[B]!==void 0?f[B]:i.getParameter(B)}function Bt(B,_t){f[B]!==_t&&(i.pixelStorei(B,_t),f[B]=_t)}function St(B){zt.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),zt.copy(B))}function vt(B){Gt.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),Gt.copy(B))}function kt(B,_t){let et=c.get(_t);et===void 0&&(et=new WeakMap,c.set(_t,et));let Mt=et.get(B);Mt===void 0&&(Mt=i.getUniformBlockIndex(_t,B.name),et.set(B,Mt))}function qt(B,_t){const Mt=c.get(_t).get(B);l.get(_t)!==Mt&&(i.uniformBlockBinding(_t,Mt,B.__bindingPointIndex),l.set(_t,Mt))}function jt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},V=null,W={},u={},d=new WeakMap,g=[],v=null,m=!1,p=null,y=null,T=null,_=null,R=null,S=null,P=null,x=new at(0,0,0),b=0,w=!1,D=null,U=null,E=null,C=null,N=null,zt.set(0,0,i.canvas.width,i.canvas.height),Gt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:K,disable:ct,bindFramebuffer:Et,drawBuffers:pt,useProgram:ft,setBlending:st,setMaterial:lt,setFlipSided:ot,setCullFace:ht,setLineWidth:Dt,setPolygonOffset:Pt,setScissorTest:Nt,activeTexture:Zt,bindTexture:F,unbindTexture:ie,compressedTexImage2D:Qt,compressedTexImage3D:I,texImage2D:tt,texImage3D:nt,pixelStorei:Bt,getParameter:xt,updateUBOMapping:kt,uniformBlockBinding:qt,texStorage2D:dt,texStorage3D:gt,texSubImage2D:M,texSubImage3D:G,compressedTexSubImage2D:Z,compressedTexSubImage3D:j,scissor:St,viewport:vt,reset:jt}}function Kg(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new mt,h=new WeakMap,f=new Set;let u;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(I,M){return g?new OffscreenCanvas(I,M):bs("canvas")}function m(I,M,G){let Z=1;const j=Qt(I);if((j.width>G||j.height>G)&&(Z=G/Math.max(j.width,j.height)),Z<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const dt=Math.floor(Z*j.width),gt=Math.floor(Z*j.height);u===void 0&&(u=v(dt,gt));const tt=M?v(dt,gt):u;return tt.width=dt,tt.height=gt,tt.getContext("2d").drawImage(I,0,0,dt,gt),Vt("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+dt+"x"+gt+")."),tt}else return"data"in I&&Vt("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),I;return I}function p(I){return I.generateMipmaps}function y(I){i.generateMipmap(I)}function T(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(I,M,G,Z,j,dt=!1){if(I!==null){if(i[I]!==void 0)return i[I];Vt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let gt;Z&&(gt=t.get("EXT_texture_norm16"),gt||Vt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let tt=M;if(M===i.RED&&(G===i.FLOAT&&(tt=i.R32F),G===i.HALF_FLOAT&&(tt=i.R16F),G===i.UNSIGNED_BYTE&&(tt=i.R8),G===i.UNSIGNED_SHORT&&gt&&(tt=gt.R16_EXT),G===i.SHORT&&gt&&(tt=gt.R16_SNORM_EXT)),M===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(tt=i.R8UI),G===i.UNSIGNED_SHORT&&(tt=i.R16UI),G===i.UNSIGNED_INT&&(tt=i.R32UI),G===i.BYTE&&(tt=i.R8I),G===i.SHORT&&(tt=i.R16I),G===i.INT&&(tt=i.R32I)),M===i.RG&&(G===i.FLOAT&&(tt=i.RG32F),G===i.HALF_FLOAT&&(tt=i.RG16F),G===i.UNSIGNED_BYTE&&(tt=i.RG8),G===i.UNSIGNED_SHORT&&gt&&(tt=gt.RG16_EXT),G===i.SHORT&&gt&&(tt=gt.RG16_SNORM_EXT)),M===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(tt=i.RG8UI),G===i.UNSIGNED_SHORT&&(tt=i.RG16UI),G===i.UNSIGNED_INT&&(tt=i.RG32UI),G===i.BYTE&&(tt=i.RG8I),G===i.SHORT&&(tt=i.RG16I),G===i.INT&&(tt=i.RG32I)),M===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(tt=i.RGB8UI),G===i.UNSIGNED_SHORT&&(tt=i.RGB16UI),G===i.UNSIGNED_INT&&(tt=i.RGB32UI),G===i.BYTE&&(tt=i.RGB8I),G===i.SHORT&&(tt=i.RGB16I),G===i.INT&&(tt=i.RGB32I)),M===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(tt=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(tt=i.RGBA16UI),G===i.UNSIGNED_INT&&(tt=i.RGBA32UI),G===i.BYTE&&(tt=i.RGBA8I),G===i.SHORT&&(tt=i.RGBA16I),G===i.INT&&(tt=i.RGBA32I)),M===i.RGB&&(G===i.UNSIGNED_SHORT&&gt&&(tt=gt.RGB16_EXT),G===i.SHORT&&gt&&(tt=gt.RGB16_SNORM_EXT),G===i.UNSIGNED_INT_5_9_9_9_REV&&(tt=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(tt=i.R11F_G11F_B10F)),M===i.RGBA){const nt=dt?wr:re.getTransfer(j);G===i.FLOAT&&(tt=i.RGBA32F),G===i.HALF_FLOAT&&(tt=i.RGBA16F),G===i.UNSIGNED_BYTE&&(tt=nt===ue?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT&&gt&&(tt=gt.RGBA16_EXT),G===i.SHORT&&gt&&(tt=gt.RGBA16_SNORM_EXT),G===i.UNSIGNED_SHORT_4_4_4_4&&(tt=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(tt=i.RGB5_A1)}return(tt===i.R16F||tt===i.R32F||tt===i.RG16F||tt===i.RG32F||tt===i.RGBA16F||tt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function R(I,M){let G;return I?M===null||M===An||M===Ss?G=i.DEPTH24_STENCIL8:M===an?G=i.DEPTH32F_STENCIL8:M===Ms&&(G=i.DEPTH24_STENCIL8,Vt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===An||M===Ss?G=i.DEPTH_COMPONENT24:M===an?G=i.DEPTH_COMPONENT32F:M===Ms&&(G=i.DEPTH_COMPONENT16),G}function S(I,M){return p(I)===!0||I.isFramebufferTexture&&I.minFilter!==Oe&&I.minFilter!==Ae?Math.log2(Math.max(M.width,M.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?M.mipmaps.length:1}function P(I){const M=I.target;M.removeEventListener("dispose",P),b(M),M.isVideoTexture&&h.delete(M),M.isHTMLTexture&&f.delete(M)}function x(I){const M=I.target;M.removeEventListener("dispose",x),D(M)}function b(I){const M=n.get(I);if(M.__webglInit===void 0)return;const G=I.source,Z=d.get(G);if(Z){const j=Z[M.__cacheKey];j.usedTimes--,j.usedTimes===0&&w(I),Object.keys(Z).length===0&&d.delete(G)}n.remove(I)}function w(I){const M=n.get(I);i.deleteTexture(M.__webglTexture);const G=I.source,Z=d.get(G);delete Z[M.__cacheKey],o.memory.textures--}function D(I){const M=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(M.__webglFramebuffer[Z]))for(let j=0;j<M.__webglFramebuffer[Z].length;j++)i.deleteFramebuffer(M.__webglFramebuffer[Z][j]);else i.deleteFramebuffer(M.__webglFramebuffer[Z]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[Z])}else{if(Array.isArray(M.__webglFramebuffer))for(let Z=0;Z<M.__webglFramebuffer.length;Z++)i.deleteFramebuffer(M.__webglFramebuffer[Z]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Z=0;Z<M.__webglColorRenderbuffer.length;Z++)M.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[Z]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const G=I.textures;for(let Z=0,j=G.length;Z<j;Z++){const dt=n.get(G[Z]);dt.__webglTexture&&(i.deleteTexture(dt.__webglTexture),o.memory.textures--),n.remove(G[Z])}n.remove(I)}let U=0;function E(){U=0}function C(){return U}function N(I){U=I}function O(){const I=U;return I>=s.maxTextures&&Vt("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+s.maxTextures),U+=1,I}function H(I){const M=[];return M.push(I.wrapS),M.push(I.wrapT),M.push(I.wrapR||0),M.push(I.magFilter),M.push(I.minFilter),M.push(I.anisotropy),M.push(I.internalFormat),M.push(I.format),M.push(I.type),M.push(I.generateMipmaps),M.push(I.premultiplyAlpha),M.push(I.flipY),M.push(I.unpackAlignment),M.push(I.colorSpace),M.join()}function X(I,M){const G=n.get(I);if(I.isVideoTexture&&F(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&G.__version!==I.version){const Z=I.image;if(Z===null)Vt("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Vt("WebGLRenderer: Texture marked for update but image is incomplete");else{ct(G,I,M);return}}else I.isExternalTexture&&(G.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+M)}function k(I,M){const G=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&G.__version!==I.version){ct(G,I,M);return}else I.isExternalTexture&&(G.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+M)}function V(I,M){const G=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&G.__version!==I.version){ct(G,I,M);return}e.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+M)}function W(I,M){const G=n.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&G.__version!==I.version){Et(G,I,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+M)}const ut={[_s]:i.REPEAT,[wn]:i.CLAMP_TO_EDGE,[Bo]:i.MIRRORED_REPEAT},it={[Oe]:i.NEAREST,[gu]:i.NEAREST_MIPMAP_NEAREST,[Is]:i.NEAREST_MIPMAP_LINEAR,[Ae]:i.LINEAR,[Vr]:i.LINEAR_MIPMAP_NEAREST,[On]:i.LINEAR_MIPMAP_LINEAR},zt={[Mu]:i.NEVER,[Eu]:i.ALWAYS,[Su]:i.LESS,[Oa]:i.LEQUAL,[yu]:i.EQUAL,[za]:i.GEQUAL,[bu]:i.GREATER,[wu]:i.NOTEQUAL};function Gt(I,M){if(M.type===an&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Ae||M.magFilter===Vr||M.magFilter===Is||M.magFilter===On||M.minFilter===Ae||M.minFilter===Vr||M.minFilter===Is||M.minFilter===On)&&Vt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,ut[M.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,ut[M.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,ut[M.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,it[M.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,it[M.minFilter]),M.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,zt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Oe||M.minFilter!==Is&&M.minFilter!==On||M.type===an&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");i.texParameterf(I,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Xt(I,M){let G=!1;I.__webglInit===void 0&&(I.__webglInit=!0,M.addEventListener("dispose",P));const Z=M.source;let j=d.get(Z);j===void 0&&(j={},d.set(Z,j));const dt=H(M);if(dt!==I.__cacheKey){j[dt]===void 0&&(j[dt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,G=!0),j[dt].usedTimes++;const gt=j[I.__cacheKey];gt!==void 0&&(j[I.__cacheKey].usedTimes--,gt.usedTimes===0&&w(M)),I.__cacheKey=dt,I.__webglTexture=j[dt].texture}return G}function Q(I,M,G){return Math.floor(Math.floor(I/G)/M)}function K(I,M,G,Z){const dt=I.updateRanges;if(dt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,G,Z,M.data);else{dt.sort((Bt,St)=>Bt.start-St.start);let gt=0;for(let Bt=1;Bt<dt.length;Bt++){const St=dt[gt],vt=dt[Bt],kt=St.start+St.count,qt=Q(vt.start,M.width,4),jt=Q(St.start,M.width,4);vt.start<=kt+1&&qt===jt&&Q(vt.start+vt.count-1,M.width,4)===qt?St.count=Math.max(St.count,vt.start+vt.count-St.start):(++gt,dt[gt]=vt)}dt.length=gt+1;const tt=e.getParameter(i.UNPACK_ROW_LENGTH),nt=e.getParameter(i.UNPACK_SKIP_PIXELS),xt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let Bt=0,St=dt.length;Bt<St;Bt++){const vt=dt[Bt],kt=Math.floor(vt.start/4),qt=Math.ceil(vt.count/4),jt=kt%M.width,B=Math.floor(kt/M.width),_t=qt,et=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,jt),e.pixelStorei(i.UNPACK_SKIP_ROWS,B),e.texSubImage2D(i.TEXTURE_2D,0,jt,B,_t,et,G,Z,M.data)}I.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,tt),e.pixelStorei(i.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(i.UNPACK_SKIP_ROWS,xt)}}function ct(I,M,G){let Z=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Z=i.TEXTURE_3D);const j=Xt(I,M),dt=M.source;e.bindTexture(Z,I.__webglTexture,i.TEXTURE0+G);const gt=n.get(dt);if(dt.version!==gt.__version||j===!0){if(e.activeTexture(i.TEXTURE0+G),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const et=re.getPrimaries(re.workingColorSpace),Mt=M.colorSpace===jn?null:re.getPrimaries(M.colorSpace),Tt=M.colorSpace===jn||et===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt)}e.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment);let nt=m(M.image,!1,s.maxTextureSize);nt=ie(M,nt);const xt=r.convert(M.format,M.colorSpace),Bt=r.convert(M.type);let St=_(M.internalFormat,xt,Bt,M.normalized,M.colorSpace,M.isVideoTexture);Gt(Z,M);let vt;const kt=M.mipmaps,qt=M.isVideoTexture!==!0,jt=gt.__version===void 0||j===!0,B=dt.dataReady,_t=S(M,nt);if(M.isDepthTexture)St=R(M.format===hi,M.type),jt&&(qt?e.texStorage2D(i.TEXTURE_2D,1,St,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,St,nt.width,nt.height,0,xt,Bt,null));else if(M.isDataTexture)if(kt.length>0){qt&&jt&&e.texStorage2D(i.TEXTURE_2D,_t,St,kt[0].width,kt[0].height);for(let et=0,Mt=kt.length;et<Mt;et++)vt=kt[et],qt?B&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,vt.width,vt.height,xt,Bt,vt.data):e.texImage2D(i.TEXTURE_2D,et,St,vt.width,vt.height,0,xt,Bt,vt.data);M.generateMipmaps=!1}else qt?(jt&&e.texStorage2D(i.TEXTURE_2D,_t,St,nt.width,nt.height),B&&K(M,nt,xt,Bt)):e.texImage2D(i.TEXTURE_2D,0,St,nt.width,nt.height,0,xt,Bt,nt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){qt&&jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,_t,St,kt[0].width,kt[0].height,nt.depth);for(let et=0,Mt=kt.length;et<Mt;et++)if(vt=kt[et],M.format!==Ze)if(xt!==null)if(qt){if(B)if(M.layerUpdates.size>0){const Tt=rc(vt.width,vt.height,M.format,M.type);for(const rt of M.layerUpdates){const Ht=vt.data.subarray(rt*Tt/vt.data.BYTES_PER_ELEMENT,(rt+1)*Tt/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,rt,vt.width,vt.height,1,xt,Ht)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,vt.width,vt.height,nt.depth,xt,vt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,et,St,vt.width,vt.height,nt.depth,0,vt.data,0,0);else Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qt?B&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,vt.width,vt.height,nt.depth,xt,Bt,vt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,et,St,vt.width,vt.height,nt.depth,0,xt,Bt,vt.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{qt&&jt&&e.texStorage2D(i.TEXTURE_2D,_t,St,kt[0].width,kt[0].height);for(let et=0,Mt=kt.length;et<Mt;et++)vt=kt[et],M.format!==Ze?xt!==null?qt?B&&e.compressedTexSubImage2D(i.TEXTURE_2D,et,0,0,vt.width,vt.height,xt,vt.data):e.compressedTexImage2D(i.TEXTURE_2D,et,St,vt.width,vt.height,0,vt.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qt?B&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,vt.width,vt.height,xt,Bt,vt.data):e.texImage2D(i.TEXTURE_2D,et,St,vt.width,vt.height,0,xt,Bt,vt.data)}else if(M.isDataArrayTexture)if(qt){if(jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,_t,St,nt.width,nt.height,nt.depth),B)if(M.layerUpdates.size>0){const et=rc(nt.width,nt.height,M.format,M.type);for(const Mt of M.layerUpdates){const Tt=nt.data.subarray(Mt*et/nt.data.BYTES_PER_ELEMENT,(Mt+1)*et/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Mt,nt.width,nt.height,1,xt,Bt,Tt)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,xt,Bt,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,St,nt.width,nt.height,nt.depth,0,xt,Bt,nt.data);else if(M.isData3DTexture)qt?(jt&&e.texStorage3D(i.TEXTURE_3D,_t,St,nt.width,nt.height,nt.depth),B&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,xt,Bt,nt.data)):e.texImage3D(i.TEXTURE_3D,0,St,nt.width,nt.height,nt.depth,0,xt,Bt,nt.data);else if(M.isFramebufferTexture){if(jt)if(qt)e.texStorage2D(i.TEXTURE_2D,_t,St,nt.width,nt.height);else{let et=nt.width,Mt=nt.height;for(let Tt=0;Tt<_t;Tt++)e.texImage2D(i.TEXTURE_2D,Tt,St,et,Mt,0,xt,Bt,null),et>>=1,Mt>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in i){const et=i.canvas;if(et.hasAttribute("layoutsubtree")||et.setAttribute("layoutsubtree","true"),nt.parentNode!==et){et.appendChild(nt),f.add(M),et.onpaint=Mt=>{const Tt=Mt.changedElements;for(const rt of f)Tt.includes(rt.image)&&(rt.needsUpdate=!0)},et.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,nt);else{const Tt=i.RGBA,rt=i.RGBA,Ht=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Tt,rt,Ht,nt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(kt.length>0){if(qt&&jt){const et=Qt(kt[0]);e.texStorage2D(i.TEXTURE_2D,_t,St,et.width,et.height)}for(let et=0,Mt=kt.length;et<Mt;et++)vt=kt[et],qt?B&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,xt,Bt,vt):e.texImage2D(i.TEXTURE_2D,et,St,xt,Bt,vt);M.generateMipmaps=!1}else if(qt){if(jt){const et=Qt(nt);e.texStorage2D(i.TEXTURE_2D,_t,St,et.width,et.height)}B&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,xt,Bt,nt)}else e.texImage2D(i.TEXTURE_2D,0,St,xt,Bt,nt);p(M)&&y(Z),gt.__version=dt.version,M.onUpdate&&M.onUpdate(M)}I.__version=M.version}function Et(I,M,G){if(M.image.length!==6)return;const Z=Xt(I,M),j=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+G);const dt=n.get(j);if(j.version!==dt.__version||Z===!0){e.activeTexture(i.TEXTURE0+G);const gt=re.getPrimaries(re.workingColorSpace),tt=M.colorSpace===jn?null:re.getPrimaries(M.colorSpace),nt=M.colorSpace===jn||gt===tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);const xt=M.isCompressedTexture||M.image[0].isCompressedTexture,Bt=M.image[0]&&M.image[0].isDataTexture,St=[];for(let rt=0;rt<6;rt++)!xt&&!Bt?St[rt]=m(M.image[rt],!0,s.maxCubemapSize):St[rt]=Bt?M.image[rt].image:M.image[rt],St[rt]=ie(M,St[rt]);const vt=St[0],kt=r.convert(M.format,M.colorSpace),qt=r.convert(M.type),jt=_(M.internalFormat,kt,qt,M.normalized,M.colorSpace),B=M.isVideoTexture!==!0,_t=dt.__version===void 0||Z===!0,et=j.dataReady;let Mt=S(M,vt);Gt(i.TEXTURE_CUBE_MAP,M);let Tt;if(xt){B&&_t&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,jt,vt.width,vt.height);for(let rt=0;rt<6;rt++){Tt=St[rt].mipmaps;for(let Ht=0;Ht<Tt.length;Ht++){const Ut=Tt[Ht];M.format!==Ze?kt!==null?B?et&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht,0,0,Ut.width,Ut.height,kt,Ut.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht,jt,Ut.width,Ut.height,0,Ut.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht,0,0,Ut.width,Ut.height,kt,qt,Ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht,jt,Ut.width,Ut.height,0,kt,qt,Ut.data)}}}else{if(Tt=M.mipmaps,B&&_t){Tt.length>0&&Mt++;const rt=Qt(St[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,jt,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(Bt){B?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,St[rt].width,St[rt].height,kt,qt,St[rt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,jt,St[rt].width,St[rt].height,0,kt,qt,St[rt].data);for(let Ht=0;Ht<Tt.length;Ht++){const me=Tt[Ht].image[rt].image;B?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht+1,0,0,me.width,me.height,kt,qt,me.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht+1,jt,me.width,me.height,0,kt,qt,me.data)}}else{B?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,kt,qt,St[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,jt,kt,qt,St[rt]);for(let Ht=0;Ht<Tt.length;Ht++){const Ut=Tt[Ht];B?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht+1,0,0,kt,qt,Ut.image[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ht+1,jt,kt,qt,Ut.image[rt])}}}p(M)&&y(i.TEXTURE_CUBE_MAP),dt.__version=j.version,M.onUpdate&&M.onUpdate(M)}I.__version=M.version}function pt(I,M,G,Z,j,dt){const gt=r.convert(G.format,G.colorSpace),tt=r.convert(G.type),nt=_(G.internalFormat,gt,tt,G.normalized,G.colorSpace),xt=n.get(M),Bt=n.get(G);if(Bt.__renderTarget=M,!xt.__hasExternalTextures){const St=Math.max(1,M.width>>dt),vt=Math.max(1,M.height>>dt);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?e.texImage3D(j,dt,nt,St,vt,M.depth,0,gt,tt,null):e.texImage2D(j,dt,nt,St,vt,0,gt,tt,null)}e.bindFramebuffer(i.FRAMEBUFFER,I),Zt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,j,Bt.__webglTexture,0,Nt(M)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,j,Bt.__webglTexture,dt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ft(I,M,G){if(i.bindRenderbuffer(i.RENDERBUFFER,I),M.depthBuffer){const Z=M.depthTexture,j=Z&&Z.isDepthTexture?Z.type:null,dt=R(M.stencilBuffer,j),gt=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Zt(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Nt(M),dt,M.width,M.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,Nt(M),dt,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,dt,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,gt,i.RENDERBUFFER,I)}else{const Z=M.textures;for(let j=0;j<Z.length;j++){const dt=Z[j],gt=r.convert(dt.format,dt.colorSpace),tt=r.convert(dt.type),nt=_(dt.internalFormat,gt,tt,dt.normalized,dt.colorSpace);Zt(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Nt(M),nt,M.width,M.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,Nt(M),nt,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,nt,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Yt(I,M,G){const Z=M.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,I),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const j=n.get(M.depthTexture);if(j.__renderTarget=M,(!j.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Z){if(j.__webglInit===void 0&&(j.__webglInit=!0,M.depthTexture.addEventListener("dispose",P)),j.__webglTexture===void 0){j.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),Gt(i.TEXTURE_CUBE_MAP,M.depthTexture);const xt=r.convert(M.depthTexture.format),Bt=r.convert(M.depthTexture.type);let St;M.depthTexture.format===kn?St=i.DEPTH_COMPONENT24:M.depthTexture.format===hi&&(St=i.DEPTH24_STENCIL8);for(let vt=0;vt<6;vt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,St,M.width,M.height,0,xt,Bt,null)}}else X(M.depthTexture,0);const dt=j.__webglTexture,gt=Nt(M),tt=Z?i.TEXTURE_CUBE_MAP_POSITIVE_X+G:i.TEXTURE_2D,nt=M.depthTexture.format===hi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(M.depthTexture.format===kn)Zt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,tt,dt,0,gt):i.framebufferTexture2D(i.FRAMEBUFFER,nt,tt,dt,0);else if(M.depthTexture.format===hi)Zt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,tt,dt,0,gt):i.framebufferTexture2D(i.FRAMEBUFFER,nt,tt,dt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function $(I){const M=n.get(I),G=I.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==I.depthTexture){const Z=I.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Z){const j=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Z.removeEventListener("dispose",j)};Z.addEventListener("dispose",j),M.__depthDisposeCallback=j}M.__boundDepthTexture=Z}if(I.depthTexture&&!M.__autoAllocateDepthBuffer)if(G)for(let Z=0;Z<6;Z++)Yt(M.__webglFramebuffer[Z],I,Z);else{const Z=I.texture.mipmaps;Z&&Z.length>0?Yt(M.__webglFramebuffer[0],I,0):Yt(M.__webglFramebuffer,I,0)}else if(G){M.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[Z]),M.__webglDepthbuffer[Z]===void 0)M.__webglDepthbuffer[Z]=i.createRenderbuffer(),ft(M.__webglDepthbuffer[Z],I,!1);else{const j=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=M.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,dt),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,dt)}}else{const Z=I.texture.mipmaps;if(Z&&Z.length>0?e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),ft(M.__webglDepthbuffer,I,!1);else{const j=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,dt),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,dt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function st(I,M,G){const Z=n.get(I);M!==void 0&&pt(Z.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&$(I)}function lt(I){const M=I.texture,G=n.get(I),Z=n.get(M);I.addEventListener("dispose",x);const j=I.textures,dt=I.isWebGLCubeRenderTarget===!0,gt=j.length>1;if(gt||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=M.version,o.memory.textures++),dt){G.__webglFramebuffer=[];for(let tt=0;tt<6;tt++)if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer[tt]=[];for(let nt=0;nt<M.mipmaps.length;nt++)G.__webglFramebuffer[tt][nt]=i.createFramebuffer()}else G.__webglFramebuffer[tt]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer=[];for(let tt=0;tt<M.mipmaps.length;tt++)G.__webglFramebuffer[tt]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(gt)for(let tt=0,nt=j.length;tt<nt;tt++){const xt=n.get(j[tt]);xt.__webglTexture===void 0&&(xt.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&Zt(I)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let tt=0;tt<j.length;tt++){const nt=j[tt];G.__webglColorRenderbuffer[tt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[tt]);const xt=r.convert(nt.format,nt.colorSpace),Bt=r.convert(nt.type),St=_(nt.internalFormat,xt,Bt,nt.normalized,nt.colorSpace,I.isXRRenderTarget===!0),vt=Nt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,vt,St,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+tt,i.RENDERBUFFER,G.__webglColorRenderbuffer[tt])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),ft(G.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(dt){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Gt(i.TEXTURE_CUBE_MAP,M);for(let tt=0;tt<6;tt++)if(M.mipmaps&&M.mipmaps.length>0)for(let nt=0;nt<M.mipmaps.length;nt++)pt(G.__webglFramebuffer[tt][nt],I,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,nt);else pt(G.__webglFramebuffer[tt],I,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0);p(M)&&y(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let tt=0,nt=j.length;tt<nt;tt++){const xt=j[tt],Bt=n.get(xt);let St=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(St=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(St,Bt.__webglTexture),Gt(St,xt),pt(G.__webglFramebuffer,I,xt,i.COLOR_ATTACHMENT0+tt,St,0),p(xt)&&y(St)}e.unbindTexture()}else{let tt=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(tt=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(tt,Z.__webglTexture),Gt(tt,M),M.mipmaps&&M.mipmaps.length>0)for(let nt=0;nt<M.mipmaps.length;nt++)pt(G.__webglFramebuffer[nt],I,M,i.COLOR_ATTACHMENT0,tt,nt);else pt(G.__webglFramebuffer,I,M,i.COLOR_ATTACHMENT0,tt,0);p(M)&&y(tt),e.unbindTexture()}I.depthBuffer&&$(I)}function ot(I){const M=I.textures;for(let G=0,Z=M.length;G<Z;G++){const j=M[G];if(p(j)){const dt=T(I),gt=n.get(j).__webglTexture;e.bindTexture(dt,gt),y(dt),e.unbindTexture()}}}const ht=[],Dt=[];function Pt(I){if(I.samples>0){if(Zt(I)===!1){const M=I.textures,G=I.width,Z=I.height;let j=i.COLOR_BUFFER_BIT;const dt=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=n.get(I),tt=M.length>1;if(tt)for(let xt=0;xt<M.length;xt++)e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);const nt=I.texture.mipmaps;nt&&nt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let xt=0;xt<M.length;xt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),tt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,gt.__webglColorRenderbuffer[xt]);const Bt=n.get(M[xt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Bt,0)}i.blitFramebuffer(0,0,G,Z,0,0,G,Z,j,i.NEAREST),l===!0&&(ht.length=0,Dt.length=0,ht.push(i.COLOR_ATTACHMENT0+xt),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(ht.push(dt),Dt.push(dt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Dt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ht))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),tt)for(let xt=0;xt<M.length;xt++){e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,gt.__webglColorRenderbuffer[xt]);const Bt=n.get(M[xt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,Bt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&l){const M=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function Nt(I){return Math.min(s.maxSamples,I.samples)}function Zt(I){const M=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function F(I){const M=o.render.frame;h.get(I)!==M&&(h.set(I,M),I.update())}function ie(I,M){const G=I.colorSpace,Z=I.format,j=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||G!==br&&G!==jn&&(re.getTransfer(G)===ue?(Z!==Ze||j!==tn)&&Vt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ae("WebGLTextures: Unsupported texture color space:",G)),M}function Qt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=E,this.getTextureUnits=C,this.setTextureUnits=N,this.setTexture2D=X,this.setTexture2DArray=k,this.setTexture3D=V,this.setTextureCube=W,this.rebindTextures=st,this.setupRenderTarget=lt,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=$,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=Zt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Jg(i,t){function e(n,s=jn){let r;const o=re.getTransfer(s);if(n===tn)return i.UNSIGNED_BYTE;if(n===La)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ia)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Zc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Kc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===qc)return i.BYTE;if(n===Yc)return i.SHORT;if(n===Ms)return i.UNSIGNED_SHORT;if(n===Pa)return i.INT;if(n===An)return i.UNSIGNED_INT;if(n===an)return i.FLOAT;if(n===xn)return i.HALF_FLOAT;if(n===Jc)return i.ALPHA;if(n===$c)return i.RGB;if(n===Ze)return i.RGBA;if(n===kn)return i.DEPTH_COMPONENT;if(n===hi)return i.DEPTH_STENCIL;if(n===Da)return i.RED;if(n===Na)return i.RED_INTEGER;if(n===pi)return i.RG;if(n===Ua)return i.RG_INTEGER;if(n===Fa)return i.RGBA_INTEGER;if(n===fr||n===dr||n===pr||n===mr)if(o===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===fr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===fr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===mr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ko||n===Ho||n===Go||n===Vo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ko)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ho)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Go)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Vo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Wo||n===Xo||n===qo||n===Yo||n===Zo||n===Mr||n===Ko)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Wo||n===Xo)return o===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===qo)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Yo)return r.COMPRESSED_R11_EAC;if(n===Zo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Mr)return r.COMPRESSED_RG11_EAC;if(n===Ko)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Jo||n===$o||n===Qo||n===jo||n===ta||n===ea||n===na||n===ia||n===sa||n===ra||n===oa||n===aa||n===la||n===ca)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Jo)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===$o)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Qo)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===jo)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ta)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ea)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===na)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ia)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===sa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ra)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===oa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===aa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===la)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ca)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ha||n===ua||n===fa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ha)return o===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ua)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===da||n===pa||n===Sr||n===ma)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===da)return r.COMPRESSED_RED_RGTC1_EXT;if(n===pa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Sr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ma)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const $g=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Qg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class jg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new oh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Be({vertexShader:$g,fragmentShader:Qg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new At(new Hn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tx extends ei{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,g=null;const v=typeof XRWebGLBinding<"u",m=new jg,p={},y=e.getContextAttributes();let T=null,_=null;const R=[],S=[],P=new mt;let x=null,b=null;const w=new rn;w.viewport=new fe;const D=new rn;D.viewport=new fe;const U=[w,D],E=new ad;let C=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let K=R[Q];return K===void 0&&(K=new $r,R[Q]=K),K.getTargetRaySpace()},this.getControllerGrip=function(Q){let K=R[Q];return K===void 0&&(K=new $r,R[Q]=K),K.getGripSpace()},this.getHand=function(Q){let K=R[Q];return K===void 0&&(K=new $r,R[Q]=K),K.getHandSpace()};function O(Q){const K=S.indexOf(Q.inputSource);if(K===-1)return;const ct=R[K];ct!==void 0&&(ct.update(Q.inputSource,Q.frame,c||o),ct.dispatchEvent({type:Q.type,data:Q.inputSource}))}function H(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",X);for(let Q=0;Q<R.length;Q++){const K=S[Q];K!==null&&(S[Q]=null,R[Q].disconnect(K))}C=null,N=null,m.reset();for(const Q in p)delete p[Q];if(t.setRenderTarget(T),d=null,u=null,f=null,s=null,_=null,Xt.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(P.width,P.height,!1),b!==null){const Q=b.camera;Q.fov=b.fov,Q.zoom=b.zoom,Q.updateProjectionMatrix(),b=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&Vt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&Vt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",H),s.addEventListener("inputsourceschange",X),y.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ct=null,Et=null,pt=null;y.depth&&(pt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ct=y.stencil?hi:kn,Et=y.stencil?Ss:An);const ft={colorFormat:e.RGBA8,depthFormat:pt,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(ft),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),_=new gn(u.textureWidth,u.textureHeight,{format:Ze,type:tn,depthTexture:new ws(u.textureWidth,u.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const ct={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,ct),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new gn(d.framebufferWidth,d.framebufferHeight,{format:Ze,type:tn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Xt.setContext(s),Xt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(Q){for(let K=0;K<Q.removed.length;K++){const ct=Q.removed[K],Et=S.indexOf(ct);Et>=0&&(S[Et]=null,R[Et].disconnect(ct))}for(let K=0;K<Q.added.length;K++){const ct=Q.added[K];let Et=S.indexOf(ct);if(Et===-1){for(let ft=0;ft<R.length;ft++)if(ft>=S.length){S.push(ct),Et=ft;break}else if(S[ft]===null){S[ft]=ct,Et=ft;break}if(Et===-1)break}const pt=R[Et];pt&&pt.connect(ct)}}const k=new L,V=new L;function W(Q,K,ct){k.setFromMatrixPosition(K.matrixWorld),V.setFromMatrixPosition(ct.matrixWorld);const Et=k.distanceTo(V),pt=K.projectionMatrix.elements,ft=ct.projectionMatrix.elements,Yt=pt[14]/(pt[10]-1),$=pt[14]/(pt[10]+1),st=(pt[9]+1)/pt[5],lt=(pt[9]-1)/pt[5],ot=(pt[8]-1)/pt[0],ht=(ft[8]+1)/ft[0],Dt=Yt*ot,Pt=Yt*ht,Nt=Et/(-ot+ht),Zt=Nt*-ot;if(K.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Zt),Q.translateZ(Nt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),pt[10]===-1)Q.projectionMatrix.copy(K.projectionMatrix),Q.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const F=Yt+Nt,ie=$+Nt,Qt=Dt-Zt,I=Pt+(Et-Zt),M=st*$/ie*F,G=lt*$/ie*F;Q.projectionMatrix.makePerspective(Qt,I,M,G,F,ie),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function ut(Q,K){K===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(K.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let K=Q.near,ct=Q.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(ct=m.depthFar)),E.near=D.near=w.near=K,E.far=D.far=w.far=ct,(C!==E.near||N!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),C=E.near,N=E.far),E.layers.mask=Q.layers.mask|6,w.layers.mask=E.layers.mask&-5,D.layers.mask=E.layers.mask&-3;const Et=Q.parent,pt=E.cameras;ut(E,Et);for(let ft=0;ft<pt.length;ft++)ut(pt[ft],Et);pt.length===2?W(E,w,D):E.projectionMatrix.copy(w.projectionMatrix),b===null&&Q.isPerspectiveCamera&&(b={camera:Q,fov:Q.fov,zoom:Q.zoom}),it(Q,E,Et)};function it(Q,K,ct){ct===null?Q.matrix.copy(K.matrixWorld):(Q.matrix.copy(ct.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(K.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(K.projectionMatrix),Q.projectionMatrixInverse.copy(K.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=ga*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(Q){l=Q,u!==null&&(u.fixedFoveation=Q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(E)},this.getCameraTexture=function(Q){return p[Q]};let zt=null;function Gt(Q,K){if(h=K.getViewerPose(c||o),g=K,h!==null){const ct=h.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let Et=!1;ct.length!==E.cameras.length&&(E.cameras.length=0,Et=!0);for(let $=0;$<ct.length;$++){const st=ct[$];let lt=null;if(d!==null)lt=d.getViewport(st);else{const ht=f.getViewSubImage(u,st);lt=ht.viewport,$===0&&(t.setRenderTargetTextures(_,ht.colorTexture,ht.depthStencilTexture),t.setRenderTarget(_))}let ot=U[$];ot===void 0&&(ot=new rn,ot.layers.enable($),ot.viewport=new fe,U[$]=ot),ot.matrix.fromArray(st.transform.matrix),ot.matrix.decompose(ot.position,ot.quaternion,ot.scale),ot.projectionMatrix.fromArray(st.projectionMatrix),ot.projectionMatrixInverse.copy(ot.projectionMatrix).invert(),ot.viewport.set(lt.x,lt.y,lt.width,lt.height),$===0&&(E.matrix.copy(ot.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),Et===!0&&E.cameras.push(ot)}const pt=s.enabledFeatures;if(pt&&pt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){f=n.getBinding();const $=f.getDepthInformation(ct[0]);$&&$.isValid&&$.texture&&m.init($,s.renderState)}if(pt&&pt.includes("camera-access")&&v){t.state.unbindTexture(),f=n.getBinding();for(let $=0;$<ct.length;$++){const st=ct[$].camera;if(st){let lt=p[st];lt||(lt=new oh,p[st]=lt);const ot=f.getCameraImage(st);lt.sourceTexture=ot}}}}for(let ct=0;ct<R.length;ct++){const Et=S[ct],pt=R[ct];Et!==null&&pt!==void 0&&pt.update(Et,K,c||o)}zt&&zt(Q,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}const Xt=new bh;Xt.setAnimationLoop(Gt),this.setAnimationLoop=function(Q){zt=Q},this.dispose=function(){}}}const ex=new Jt,Ph=new $t;Ph.set(-1,0,0,0,1,0,0,0,1);function nx(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,_h(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,T,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&d(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,T):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ke&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ke&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),T=y.envMap,_=y.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4(ex.makeRotationFromEuler(_)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Ph),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,T){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=T*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ke&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ix(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,R){const S=R.program;n.uniformBlockBinding(_,S)}function c(_,R){let S=s[_.id];S===void 0&&(m(_),S=h(_),s[_.id]=S,_.addEventListener("dispose",y));const P=R.program;n.updateUBOMapping(_,P);const x=t.render.frame;r[_.id]!==x&&(u(_),r[_.id]=x)}function h(_){const R=f();_.__bindingPointIndex=R;const S=i.createBuffer(),P=_.__size,x=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,P,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,R,S),S}function f(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return ae("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const R=s[_.id],S=_.uniforms,P=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,R);for(let x=0,b=S.length;x<b;x++){const w=S[x];if(Array.isArray(w))for(let D=0,U=w.length;D<U;D++)d(w[D],x,D,P);else d(w,x,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(_,R,S,P){if(v(_,R,S,P)===!0){const x=_.__offset,b=_.value;if(Array.isArray(b)){let w=0;for(let D=0;D<b.length;D++){const U=b[D],E=p(U);g(U,_.__data,w),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(w+=E.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(b,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,_.__data)}}function g(_,R,S){typeof _=="number"||typeof _=="boolean"?R[0]=_:_.isMatrix3?(R[0]=_.elements[0],R[1]=_.elements[1],R[2]=_.elements[2],R[3]=0,R[4]=_.elements[3],R[5]=_.elements[4],R[6]=_.elements[5],R[7]=0,R[8]=_.elements[6],R[9]=_.elements[7],R[10]=_.elements[8],R[11]=0):ArrayBuffer.isView(_)?R.set(new _.constructor(_.buffer,_.byteOffset,R.length)):_.toArray(R,S)}function v(_,R,S,P){const x=_.value,b=R+"_"+S;if(P[b]===void 0)return typeof x=="number"||typeof x=="boolean"?P[b]=x:ArrayBuffer.isView(x)?P[b]=x.slice():P[b]=x.clone(),!0;{const w=P[b];if(typeof x=="number"||typeof x=="boolean"){if(w!==x)return P[b]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(w.equals(x)===!1)return w.copy(x),!0}}return!1}function m(_){const R=_.uniforms;let S=0;const P=16;for(let b=0,w=R.length;b<w;b++){const D=Array.isArray(R[b])?R[b]:[R[b]];for(let U=0,E=D.length;U<E;U++){const C=D[U],N=Array.isArray(C.value)?C.value:[C.value];for(let O=0,H=N.length;O<H;O++){const X=N[O],k=p(X),V=S%P,W=V%k.boundary,ut=V+W;S+=W,ut!==0&&P-ut<k.storage&&(S+=P-ut),C.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=S,S+=k.storage}}}const x=S%P;return x>0&&(S+=P-x),_.__size=S,_.__cache={},this}function p(_){const R={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(R.boundary=4,R.storage=4):_.isVector2?(R.boundary=8,R.storage=8):_.isVector3||_.isColor?(R.boundary=16,R.storage=12):_.isVector4?(R.boundary=16,R.storage=16):_.isMatrix3?(R.boundary=48,R.storage=48):_.isMatrix4?(R.boundary=64,R.storage=64):_.isTexture?Vt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(R.boundary=16,R.storage=_.byteLength):Vt("WebGLRenderer: Unsupported uniform value type.",_),R}function y(_){const R=_.target;R.removeEventListener("dispose",y);const S=o.indexOf(R.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[R.id]),delete s[R.id],delete r[R.id]}function T(){for(const _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:l,update:c,dispose:T}}const sx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Sn=null;function rx(){return Sn===null&&(Sn=new qi(sx,16,16,pi,xn),Sn.name="DFG_LUT",Sn.minFilter=Ae,Sn.magFilter=Ae,Sn.wrapS=wn,Sn.wrapT=wn,Sn.generateMipmaps=!1,Sn.needsUpdate=!0),Sn}class ox{constructor(t={}){const{canvas:e=Ru(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=tn}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;const v=d,m=new Set([Fa,Ua,Na]),p=new Set([tn,An,Ms,Ss,La,Ia]),y=new Uint32Array(4),T=new Int32Array(4),_=new L;let R=null,S=null;const P=[],x=[];let b=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Tn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let D=!1,U=null,E=null,C=null,N=null;this._outputColorSpace=Fe;let O=0,H=0,X=null,k=-1,V=null;const W=new fe,ut=new fe;let it=null;const zt=new at(0);let Gt=0,Xt=e.width,Q=e.height,K=1,ct=null,Et=null;const pt=new fe(0,0,Xt,Q),ft=new fe(0,0,Xt,Q);let Yt=!1;const $=new Ga;let st=!1,lt=!1;const ot=new Jt,ht=new L,Dt=new fe,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Nt=!1;function Zt(){return X===null?K:1}let F=n;function ie(A,z){return e.getContext(A,z)}let Qt,I,M,G,Z,j,dt,gt,tt,nt,xt,Bt,St,vt,kt,qt,jt,B,_t,et,Mt,Tt,rt;try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Aa}`),e.addEventListener("webglcontextlost",me,!1),e.addEventListener("webglcontextrestored",ce,!1),e.addEventListener("webglcontextcreationerror",hn,!1),F===null){const z="webgl2";if(F=ie(z,A),F===null)throw ie(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ht()}catch(A){throw e.removeEventListener("webglcontextlost",me,!1),e.removeEventListener("webglcontextrestored",ce,!1),e.removeEventListener("webglcontextcreationerror",hn,!1),ae("WebGLRenderer: "+A.message),A}function Ht(){Qt=new rm(F),Qt.init(),Mt=new Jg(F,Qt),I=new K0(F,Qt,t,Mt),M=new Zg(F,Qt),I.reversedDepthBuffer&&u&&M.buffers.depth.setReversed(!0),E=F.createFramebuffer(),C=F.createFramebuffer(),N=F.createFramebuffer(),G=new lm(F),Z=new Ng,j=new Kg(F,Qt,M,Z,I,Mt,G),dt=new sm(w),gt=new hd(F),Tt=new Y0(F,gt),tt=new om(F,gt,G,Tt),nt=new hm(F,tt,gt,Tt,G),B=new cm(F,I,j),kt=new J0(Z),xt=new Dg(w,dt,Qt,I,Tt,kt),Bt=new nx(w,Z),St=new Fg,vt=new Gg(Qt),jt=new q0(w,dt,M,nt,g,l),qt=new Yg(w,nt,I),rt=new ix(F,G,I,M),_t=new Z0(F,Qt,G),et=new am(F,Qt,G),G.programs=xt.programs,w.capabilities=I,w.extensions=Qt,w.properties=Z,w.renderLists=St,w.shadowMap=qt,w.state=M,w.info=G}v!==tn&&(b=new fm(v,e.width,e.height,a,s,r));const Ut=new tx(w,F);this.xr=Ut,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const A=Qt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Qt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(A){A!==void 0&&(K=A,this.setSize(Xt,Q,!1))},this.getSize=function(A){return A.set(Xt,Q)},this.setSize=function(A,z,J=!0){if(Ut.isPresenting){Vt("WebGLRenderer: Can't change size while VR device is presenting.");return}Xt=A,Q=z,e.width=Math.floor(A*K),e.height=Math.floor(z*K),J===!0&&(e.style.width=A+"px",e.style.height=z+"px"),b!==null&&b.setSize(e.width,e.height),this.setViewport(0,0,A,z)},this.getDrawingBufferSize=function(A){return A.set(Xt*K,Q*K).floor()},this.setDrawingBufferSize=function(A,z,J){Xt=A,Q=z,K=J,e.width=Math.floor(A*J),e.height=Math.floor(z*J),this.setViewport(0,0,A,z)},this.setEffects=function(A){if(v===tn){ae("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let z=0;z<A.length;z++)if(A[z].isOutputPass===!0){Vt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(W)},this.getViewport=function(A){return A.copy(pt)},this.setViewport=function(A,z,J,q){A.isVector4?pt.set(A.x,A.y,A.z,A.w):pt.set(A,z,J,q),M.viewport(W.copy(pt).multiplyScalar(K).round())},this.getScissor=function(A){return A.copy(ft)},this.setScissor=function(A,z,J,q){A.isVector4?ft.set(A.x,A.y,A.z,A.w):ft.set(A,z,J,q),M.scissor(ut.copy(ft).multiplyScalar(K).round())},this.getScissorTest=function(){return Yt},this.setScissorTest=function(A){M.setScissorTest(Yt=A)},this.setOpaqueSort=function(A){ct=A},this.setTransparentSort=function(A){Et=A},this.getClearColor=function(A){return A.copy(jt.getClearColor())},this.setClearColor=function(){jt.setClearColor(...arguments)},this.getClearAlpha=function(){return jt.getClearAlpha()},this.setClearAlpha=function(){jt.setClearAlpha(...arguments)},this.clear=function(A=!0,z=!0,J=!0){let q=0;if(A){let Y=!1;if(X!==null){const wt=X.texture.format;Y=m.has(wt)}if(Y){const wt=X.texture.type,Ct=p.has(wt),bt=jt.getClearColor(),Lt=jt.getClearAlpha(),Ft=bt.r,te=bt.g,se=bt.b;Ct?(y[0]=Ft,y[1]=te,y[2]=se,y[3]=Lt,F.clearBufferuiv(F.COLOR,0,y)):(T[0]=Ft,T[1]=te,T[2]=se,T[3]=Lt,F.clearBufferiv(F.COLOR,0,T))}else q|=F.COLOR_BUFFER_BIT}z&&(q|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(q|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&F.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),U=A},this.dispose=function(){e.removeEventListener("webglcontextlost",me,!1),e.removeEventListener("webglcontextrestored",ce,!1),e.removeEventListener("webglcontextcreationerror",hn,!1),jt.dispose(),St.dispose(),vt.dispose(),Z.dispose(),dt.dispose(),nt.dispose(),Tt.dispose(),rt.dispose(),xt.dispose(),Ut.dispose(),Ut.removeEventListener("sessionstart",nl),Ut.removeEventListener("sessionend",il),si.stop()};function me(A){A.preventDefault(),xl("WebGLRenderer: Context Lost."),D=!0}function ce(){xl("WebGLRenderer: Context Restored."),D=!1;const A=G.autoReset,z=qt.enabled,J=qt.autoUpdate,q=qt.needsUpdate,Y=qt.type;Ht(),G.autoReset=A,qt.enabled=z,qt.autoUpdate=J,qt.needsUpdate=q,qt.type=Y}function hn(A){ae("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function vn(A){const z=A.target;z.removeEventListener("dispose",vn),kh(z)}function kh(A){Hh(A),Z.remove(A)}function Hh(A){const z=Z.get(A).programs;z!==void 0&&(z.forEach(function(J){xt.releaseProgram(J)}),A.isShaderMaterial&&xt.releaseShaderCache(A))}this.renderBufferDirect=function(A,z,J,q,Y,wt){z===null&&(z=Pt);const Ct=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,bt=Wh(A,z,J,q,Y);M.setMaterial(q,Ct);let Lt=J.index,Ft=1;if(q.wireframe===!0){if(Lt=tt.getWireframeAttribute(J),Lt===void 0)return;Ft=2}const te=J.drawRange,se=J.attributes.position;let It=te.start*Ft,he=(te.start+te.count)*Ft;wt!==null&&(It=Math.max(It,wt.start*Ft),he=Math.min(he,(wt.start+wt.count)*Ft)),Lt!==null?(It=Math.max(It,0),he=Math.min(he,Lt.count)):se!=null&&(It=Math.max(It,0),he=Math.min(he,se.count));const Ee=he-It;if(Ee<0||Ee===1/0)return;Tt.setup(Y,q,bt,J,Lt);let _e,pe=_t;if(Lt!==null&&(_e=gt.get(Lt),pe=et,pe.setIndex(_e)),Y.isMesh)q.wireframe===!0?(M.setLineWidth(q.wireframeLinewidth*Zt()),pe.setMode(F.LINES)):pe.setMode(F.TRIANGLES);else if(Y.isLine){let ke=q.linewidth;ke===void 0&&(ke=1),M.setLineWidth(ke*Zt()),Y.isLineSegments?pe.setMode(F.LINES):Y.isLineLoop?pe.setMode(F.LINE_LOOP):pe.setMode(F.LINE_STRIP)}else Y.isPoints?pe.setMode(F.POINTS):Y.isSprite&&pe.setMode(F.TRIANGLES);if(Y.isBatchedMesh)if(Qt.get("WEBGL_multi_draw"))pe.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const ke=Y._multiDrawStarts,Rt=Y._multiDrawCounts,qe=Y._multiDrawCount,oe=Lt?gt.get(Lt).bytesPerElement:1,nn=Z.get(q).currentProgram.getUniforms();for(let _n=0;_n<qe;_n++)nn.setValue(F,"_gl_DrawID",_n),pe.render(ke[_n]/oe,Rt[_n])}else if(Y.isInstancedMesh)pe.renderInstances(It,Ee,Y.count);else if(J.isInstancedBufferGeometry){const ke=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Rt=Math.min(J.instanceCount,ke);pe.renderInstances(It,Ee,Rt)}else pe.render(It,Ee)};function el(A,z,J,q){U!==null&&A.isNodeMaterial&&U.setObject(q,A),st===!0&&kt.setState(A,J,!1),A.transparent===!0&&A.side===Xe&&A.forceSinglePass===!1?(A.side=Ke,A.needsUpdate=!0,Ls(A,z,q),A.side=fi,A.needsUpdate=!0,Ls(A,z,q),A.side=Xe):Ls(A,z,q)}this.compile=function(A,z,J=null){J===null&&(J=A),U!==null&&U.renderStart(A,z,J),S=vt.get(J),S.init(z),x.push(S),J.traverseVisible(function(Y){Y.isLight&&Y.layers.test(z.layers)&&(S.pushLight(Y),Y.castShadow&&S.pushShadow(Y))}),A!==J&&A.traverseVisible(function(Y){Y.isLight&&Y.layers.test(z.layers)&&(S.pushLight(Y),Y.castShadow&&S.pushShadow(Y))}),S.setupLights(),U!==null&&U.updateLights(S.state.lightsArray),lt=this.localClippingEnabled,st=kt.init(this.clippingPlanes,lt),st===!0&&kt.setGlobalState(this.clippingPlanes,z),U!==null&&qt.render(S.state.shadowsArray,J,z);const q=new Set;return A.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const wt=Y.material;if(wt)if(Array.isArray(wt))for(let Ct=0;Ct<wt.length;Ct++){const bt=wt[Ct];el(bt,J,z,Y),q.add(bt)}else el(wt,J,z,Y),q.add(wt)}),S=x.pop(),U!==null&&U.renderEnd(),q},this.compileAsync=function(A,z,J=null){const q=this.compile(A,z,J);return new Promise(Y=>{function wt(){if(q.forEach(function(Ct){const Lt=Z.get(Ct).currentProgram;(Lt===void 0||Lt.isReady())&&q.delete(Ct)}),q.size===0){Y(A);return}setTimeout(wt,10)}Qt.get("KHR_parallel_shader_compile")!==null?wt():setTimeout(wt,10)})};let Br=null;function Gh(A){Br&&Br(A)}function nl(){si.stop()}function il(){si.start()}const si=new bh;si.setAnimationLoop(Gh),typeof self<"u"&&si.setContext(self),this.setAnimationLoop=function(A){Br=A,Ut.setAnimationLoop(A),A===null?si.stop():si.start()},Ut.addEventListener("sessionstart",nl),Ut.addEventListener("sessionend",il),this.render=function(A,z){if(z!==void 0&&z.isCamera!==!0){ae("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;U!==null&&U.renderStart(A,z);const J=Ut.enabled===!0&&Ut.isPresenting===!0,q=b!==null&&(X===null||J)&&b.begin(w,X);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Ut.enabled===!0&&Ut.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(Ut.cameraAutoUpdate===!0&&Ut.updateCamera(z),z=Ut.getCamera()),A.isScene===!0&&A.onBeforeRender(w,A,z,X),S=vt.get(A,x.length),S.init(z),S.state.textureUnits=j.getTextureUnits(),x.push(S),ot.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),$.setFromProjectionMatrix(ot,En,z.reversedDepth),lt=this.localClippingEnabled,st=kt.init(this.clippingPlanes,lt),R=St.get(A,P.length),R.init(),P.push(R),Ut.enabled===!0&&Ut.isPresenting===!0){const Ct=w.xr.getDepthSensingMesh();Ct!==null&&kr(Ct,z,-1/0,w.sortObjects)}kr(A,z,0,w.sortObjects),R.finish(),U!==null&&U.updateLights(S.state.lightsArray),w.sortObjects===!0&&R.sort(ct,Et),Nt=Ut.enabled===!1||Ut.isPresenting===!1||Ut.hasDepthSensing()===!1,Nt&&jt.addToRenderList(R,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),st===!0&&kt.beginShadows();const Y=S.state.shadowsArray;if(qt.render(Y,A,z),st===!0&&kt.endShadows(),(q&&b.hasRenderPass())===!1){const Ct=R.opaque,bt=R.transmissive;if(S.setupLights(),z.isArrayCamera){const Lt=z.cameras;if(bt.length>0)for(let Ft=0,te=Lt.length;Ft<te;Ft++){const se=Lt[Ft];rl(Ct,bt,A,se)}Nt&&jt.render(A);for(let Ft=0,te=Lt.length;Ft<te;Ft++){const se=Lt[Ft];sl(R,A,se,se.viewport)}}else bt.length>0&&rl(Ct,bt,A,z),Nt&&jt.render(A),sl(R,A,z)}X!==null&&H===0&&(j.updateMultisampleRenderTarget(X),j.updateRenderTargetMipmap(X)),q&&b.end(w),A.isScene===!0&&A.onAfterRender(w,A,z),Tt.resetDefaultState(),k=-1,V=null,x.pop(),x.length>0?(S=x[x.length-1],j.setTextureUnits(S.state.textureUnits),st===!0&&kt.setGlobalState(w.clippingPlanes,S.state.camera)):S=null,P.pop(),P.length>0?R=P[P.length-1]:R=null,U!==null&&U.renderEnd()};function kr(A,z,J,q){if(A.visible===!1)return;if(A.layers.test(z.layers)){if(A.isGroup)J=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(z);else if(A.isLightProbeGrid)S.pushLightProbeGrid(A);else if(A.isLight)S.pushLight(A),A.castShadow&&S.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum($)){q&&Dt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ot);const Ct=nt.update(A),bt=A.material;bt.visible&&R.push(A,Ct,bt,J,Dt.z,null,z)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum($))){const Ct=nt.update(A),bt=A.material;if(q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Dt.copy(A.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),Dt.copy(Ct.boundingSphere.center)),Dt.applyMatrix4(A.matrixWorld).applyMatrix4(ot)),Array.isArray(bt)){const Lt=Ct.groups;for(let Ft=0,te=Lt.length;Ft<te;Ft++){const se=Lt[Ft],It=bt[se.materialIndex];It&&It.visible&&R.push(A,Ct,It,J,Dt.z,se,z)}}else bt.visible&&R.push(A,Ct,bt,J,Dt.z,null,z)}}const wt=A.children;for(let Ct=0,bt=wt.length;Ct<bt;Ct++)kr(wt[Ct],z,J,q)}function sl(A,z,J,q){const{opaque:Y,transmissive:wt,transparent:Ct}=A;S.setupLightsView(J),st===!0&&kt.setGlobalState(w.clippingPlanes,J),q&&M.viewport(W.copy(q)),Y.length>0&&Ps(Y,z,J),wt.length>0&&Ps(wt,z,J),Ct.length>0&&Ps(Ct,z,J),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function rl(A,z,J,q){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[q.id]===void 0){const It=Qt.has("EXT_color_buffer_half_float")||Qt.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[q.id]=new gn(1,1,{generateMipmaps:!0,type:It?xn:tn,minFilter:On,samples:Math.max(4,I.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:re.workingColorSpace})}const wt=S.state.transmissionRenderTarget[q.id],Ct=q.viewport||W;wt.setSize(Ct.z*w.transmissionResolutionScale,Ct.w*w.transmissionResolutionScale);const bt=w.getRenderTarget(),Lt=w.getActiveCubeFace(),Ft=w.getActiveMipmapLevel();w.setRenderTarget(wt),w.getClearColor(zt),Gt=w.getClearAlpha(),Gt<1&&w.setClearColor(16777215,.5),w.clear(),Nt&&jt.render(J);const te=w.toneMapping;w.toneMapping=Tn;const se=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),S.setupLightsView(q),st===!0&&kt.setGlobalState(w.clippingPlanes,q),Ps(A,J,q),j.updateMultisampleRenderTarget(wt),j.updateRenderTargetMipmap(wt),Qt.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let he=0,Ee=z.length;he<Ee;he++){const _e=z[he],{object:pe,geometry:ke,material:Rt,group:qe}=_e;if(Rt.side===Xe&&pe.layers.test(q.layers)){const oe=Rt.side;Rt.side=Ke,Rt.needsUpdate=!0,ol(pe,J,q,ke,Rt,qe),Rt.side=oe,Rt.needsUpdate=!0,It=!0}}It===!0&&(j.updateMultisampleRenderTarget(wt),j.updateRenderTargetMipmap(wt))}w.setRenderTarget(bt,Lt,Ft),w.setClearColor(zt,Gt),se!==void 0&&(q.viewport=se),w.toneMapping=te}function Ps(A,z,J){const q=z.isScene===!0?z.overrideMaterial:null;for(let Y=0,wt=A.length;Y<wt;Y++){const Ct=A[Y],{object:bt,geometry:Lt,group:Ft}=Ct;let te=Ct.material;te.allowOverride===!0&&q!==null&&(te=q),bt.layers.test(J.layers)&&ol(bt,z,J,Lt,te,Ft)}}function ol(A,z,J,q,Y,wt){U!==null&&Y.isNodeMaterial&&U.setObject(A,Y),A.onBeforeRender(w,z,J,q,Y,wt),A.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Y.onBeforeRender(w,z,J,q,A,wt),Y.transparent===!0&&Y.side===Xe&&Y.forceSinglePass===!1?(Y.side=Ke,Y.needsUpdate=!0,w.renderBufferDirect(J,z,q,Y,A,wt),Y.side=fi,Y.needsUpdate=!0,w.renderBufferDirect(J,z,q,Y,A,wt),Y.side=Xe):w.renderBufferDirect(J,z,q,Y,A,wt),A.onAfterRender(w,z,J,q,Y,wt)}function Ls(A,z,J){z.isScene!==!0&&(z=Pt);const q=Z.get(A),Y=S.state.lights,wt=S.state.shadowsArray,Ct=Y.state.version,bt=xt.getParameters(A,Y.state,wt,z,J,S.state.lightProbeGridArray),Lt=xt.getProgramCacheKey(bt);let Ft=q.programs;q.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?z.environment:null,q.fog=z.fog;const te=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;q.envMap=dt.get(A.envMap||q.environment,te),q.envMapRotation=q.environment!==null&&A.envMap===null?z.environmentRotation:A.envMapRotation,Ft===void 0&&(A.addEventListener("dispose",vn),Ft=new Map,q.programs=Ft);let se=Ft.get(Lt);if(se!==void 0){if(q.currentProgram===se&&q.lightsStateVersion===Ct)return ll(A,bt),se}else bt.uniforms=xt.getUniforms(A),U!==null&&A.isNodeMaterial&&U.build(A,J,bt),A.onBeforeCompile(bt,w),se=xt.acquireProgram(bt,Lt),Ft.set(Lt,se),q.uniforms=bt.uniforms;const It=q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(It.clippingPlanes=kt.uniform),ll(A,bt),q.needsLights=qh(A),q.lightsStateVersion=Ct,q.needsLights&&(It.ambientLightColor.value=Y.state.ambient,It.lightProbe.value=Y.state.probe,It.sunLights.value=Y.state.sun,It.sunLightShadows.value=Y.state.sunShadow,It.directionalLights.value=Y.state.directional,It.directionalLightShadows.value=Y.state.directionalShadow,It.spotLights.value=Y.state.spot,It.spotLightShadows.value=Y.state.spotShadow,It.rectAreaLights.value=Y.state.rectArea,It.ltc_1.value=Y.state.rectAreaLTC1,It.ltc_2.value=Y.state.rectAreaLTC2,It.pointLights.value=Y.state.point,It.pointLightShadows.value=Y.state.pointShadow,It.hemisphereLights.value=Y.state.hemi,It.sunShadowMatrix.value=Y.state.sunShadowMatrix,It.sunShadowCascade.value=Y.state.sunShadowCascade,It.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,It.spotLightMatrix.value=Y.state.spotLightMatrix,It.spotLightMap.value=Y.state.spotLightMap,It.pointShadowMatrix.value=Y.state.pointShadowMatrix),q.lightProbeGrid=S.state.lightProbeGridArray.length>0,q.currentProgram=se,q.uniformsList=null,se}function al(A){if(A.uniformsList===null){const z=A.currentProgram.getUniforms();A.uniformsList=xr.seqWithValue(z.seq,A.uniforms)}return A.uniformsList}function ll(A,z){const J=Z.get(A);J.outputColorSpace=z.outputColorSpace,J.batching=z.batching,J.batchingColor=z.batchingColor,J.instancing=z.instancing,J.instancingColor=z.instancingColor,J.instancingMorph=z.instancingMorph,J.skinning=z.skinning,J.morphTargets=z.morphTargets,J.morphNormals=z.morphNormals,J.morphColors=z.morphColors,J.morphTargetsCount=z.morphTargetsCount,J.numClippingPlanes=z.numClippingPlanes,J.numIntersection=z.numClipIntersection,J.vertexAlphas=z.vertexAlphas,J.vertexTangents=z.vertexTangents,J.toneMapping=z.toneMapping}function Vh(A,z){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;_.setFromMatrixPosition(z.matrixWorld);for(let J=0,q=A.length;J<q;J++){const Y=A[J];if(Y.texture!==null&&Y.boundingBox.containsPoint(_))return Y}return null}function Wh(A,z,J,q,Y){z.isScene!==!0&&(z=Pt),j.resetTextureUnits();const wt=z.fog,Ct=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?z.environment:null,bt=X===null?w.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:re.workingColorSpace,Lt=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Ft=dt.get(q.envMap||Ct,Lt),te=q.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,se=!!J.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),It=!!J.morphAttributes.position,he=!!J.morphAttributes.normal,Ee=!!J.morphAttributes.color;let _e=Tn;q.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(_e=w.toneMapping);const pe=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,ke=pe!==void 0?pe.length:0,Rt=Z.get(q),qe=S.state.lights;if(st===!0&&(lt===!0||A!==V)){const ge=A===V&&q.id===k;kt.setState(q,A,ge)}let oe=!1;q.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==qe.state.version||Rt.outputColorSpace!==bt||Y.isBatchedMesh&&Rt.batching===!1||!Y.isBatchedMesh&&Rt.batching===!0||Y.isBatchedMesh&&Rt.batchingColor===!0&&Y._colorsTexture===null||Y.isBatchedMesh&&Rt.batchingColor===!1&&Y._colorsTexture!==null||Y.isInstancedMesh&&Rt.instancing===!1||!Y.isInstancedMesh&&Rt.instancing===!0||Y.isSkinnedMesh&&Rt.skinning===!1||!Y.isSkinnedMesh&&Rt.skinning===!0||Y.isInstancedMesh&&Rt.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Rt.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Rt.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Rt.instancingMorph===!1&&Y.morphTexture!==null||Rt.envMap!==Ft||q.fog===!0&&Rt.fog!==wt||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==kt.numPlanes||Rt.numIntersection!==kt.numIntersection)||Rt.vertexAlphas!==te||Rt.vertexTangents!==se||Rt.morphTargets!==It||Rt.morphNormals!==he||Rt.morphColors!==Ee||Rt.toneMapping!==_e||Rt.morphTargetsCount!==ke||!!Rt.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(oe=!0):(oe=!0,Rt.__version=q.version);let nn=Rt.currentProgram;oe===!0&&(nn=Ls(q,z,Y),U&&q.isNodeMaterial&&U.onUpdateProgram(q,nn,Rt));let _n=!1,Vn=!1,xi=!1;const de=nn.getUniforms(),ye=Rt.uniforms;if(M.useProgram(nn.program)&&(_n=!0,Vn=!0,xi=!0),q.id!==k&&(k=q.id,Vn=!0),Rt.needsLights){const ge=Vh(S.state.lightProbeGridArray,Y);Rt.lightProbeGrid!==ge&&(Rt.lightProbeGrid=ge,Vn=!0)}if(_n||V!==A){M.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),de.setValue(F,"projectionMatrix",A.projectionMatrix),de.setValue(F,"viewMatrix",A.matrixWorldInverse);const Xn=de.map.cameraPosition;Xn!==void 0&&Xn.setValue(F,ht.setFromMatrixPosition(A.matrixWorld)),I.logarithmicDepthBuffer&&de.setValue(F,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&de.setValue(F,"isOrthographic",A.isOrthographicCamera===!0),V!==A&&(V=A,Vn=!0,xi=!0)}if(Rt.needsLights&&(qe.state.sunShadowMap.length>0&&de.setValue(F,"sunShadowMap",qe.state.sunShadowMap,j),qe.state.directionalShadowMap.length>0&&de.setValue(F,"directionalShadowMap",qe.state.directionalShadowMap,j),qe.state.spotShadowMap.length>0&&de.setValue(F,"spotShadowMap",qe.state.spotShadowMap,j),qe.state.pointShadowMap.length>0&&de.setValue(F,"pointShadowMap",qe.state.pointShadowMap,j)),Y.isSkinnedMesh){de.setOptional(F,Y,"bindMatrix"),de.setOptional(F,Y,"bindMatrixInverse");const ge=Y.skeleton;ge&&(ge.boneTexture===null&&ge.computeBoneTexture(),de.setValue(F,"boneTexture",ge.boneTexture,j))}Y.isBatchedMesh&&(de.setOptional(F,Y,"batchingTexture"),de.setValue(F,"batchingTexture",Y._matricesTexture,j),de.setOptional(F,Y,"batchingIdTexture"),de.setValue(F,"batchingIdTexture",Y._indirectTexture,j),de.setOptional(F,Y,"batchingColorTexture"),Y._colorsTexture!==null&&de.setValue(F,"batchingColorTexture",Y._colorsTexture,j));const Wn=J.morphAttributes;if((Wn.position!==void 0||Wn.normal!==void 0||Wn.color!==void 0)&&B.update(Y,J,nn),(Vn||Rt.receiveShadow!==Y.receiveShadow)&&(Rt.receiveShadow=Y.receiveShadow,de.setValue(F,"receiveShadow",Y.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&z.environment!==null&&(ye.envMapIntensity.value=z.environmentIntensity),ye.dfgLUT!==void 0&&(ye.dfgLUT.value=rx()),Vn){if(de.setValue(F,"toneMappingExposure",w.toneMappingExposure),Rt.needsLights&&Xh(ye,xi),wt&&q.fog===!0&&Bt.refreshFogUniforms(ye,wt),Bt.refreshMaterialUniforms(ye,q,K,Q,S.state.transmissionRenderTarget[A.id]),Rt.needsLights&&Rt.lightProbeGrid){const ge=Rt.lightProbeGrid;ye.probesSH.value=ge.texture,ye.probesMin.value.copy(ge.boundingBox.min),ye.probesMax.value.copy(ge.boundingBox.max),ye.probesResolution.value.copy(ge.resolution)}xr.upload(F,al(Rt),ye,j)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(xr.upload(F,al(Rt),ye,j),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&de.setValue(F,"center",Y.center),de.setValue(F,"modelViewMatrix",Y.modelViewMatrix),de.setValue(F,"normalMatrix",Y.normalMatrix),de.setValue(F,"modelMatrix",Y.matrixWorld),q.uniformsGroups!==void 0){const ge=q.uniformsGroups;for(let Xn=0,vi=ge.length;Xn<vi;Xn++){const hl=ge[Xn];rt.update(hl,nn),rt.bind(hl,nn)}}return nn}function Xh(A,z){A.ambientLightColor.needsUpdate=z,A.lightProbe.needsUpdate=z,A.sunLights.needsUpdate=z,A.sunLightShadows.needsUpdate=z,A.directionalLights.needsUpdate=z,A.directionalLightShadows.needsUpdate=z,A.pointLights.needsUpdate=z,A.pointLightShadows.needsUpdate=z,A.spotLights.needsUpdate=z,A.spotLightShadows.needsUpdate=z,A.rectAreaLights.needsUpdate=z,A.hemisphereLights.needsUpdate=z}function qh(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(A,z,J){const q=Z.get(A);q.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),Z.get(A.texture).__webglTexture=z,Z.get(A.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:J,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,z){const J=Z.get(A);J.__webglFramebuffer=z,J.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(A,z=0,J=0){X=A,O=z,H=J;let q=null,Y=!1,wt=!1;if(A){const bt=Z.get(A);if(bt.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(F.FRAMEBUFFER,bt.__webglFramebuffer),W.copy(A.viewport),ut.copy(A.scissor),it=A.scissorTest,M.viewport(W),M.scissor(ut),M.setScissorTest(it),k=-1;return}else if(bt.__webglFramebuffer===void 0)j.setupRenderTarget(A);else if(bt.__hasExternalTextures)j.rebindTextures(A,Z.get(A.texture).__webglTexture,Z.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const te=A.depthTexture;if(bt.__boundDepthTexture!==te){if(te!==null&&Z.has(te)&&(A.width!==te.image.width||A.height!==te.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");j.setupDepthRenderbuffer(A)}}const Lt=A.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(wt=!0);const Ft=Z.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ft[z])?q=Ft[z][J]:q=Ft[z],Y=!0):A.samples>0&&j.useMultisampledRTT(A)===!1?q=Z.get(A).__webglMultisampledFramebuffer:Array.isArray(Ft)?q=Ft[J]:q=Ft,W.copy(A.viewport),ut.copy(A.scissor),it=A.scissorTest}else W.copy(pt).multiplyScalar(K).floor(),ut.copy(ft).multiplyScalar(K).floor(),it=Yt;if(J!==0&&(q=E),M.bindFramebuffer(F.FRAMEBUFFER,q)&&M.drawBuffers(A,q),M.viewport(W),M.scissor(ut),M.setScissorTest(it),Y){const bt=Z.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+z,bt.__webglTexture,J)}else if(wt){const bt=z;for(let Lt=0;Lt<A.textures.length;Lt++){const Ft=Z.get(A.textures[Lt]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Lt,Ft.__webglTexture,J,bt)}}else if(A!==null&&J!==0){const bt=Z.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,bt.__webglTexture,J)}k=-1};function cl(A){const z=Z.get(A);return(z.__readFormat!==A.format||z.__readType!==A.type)&&(z.__readFormat=A.format,z.__readType=A.type,z.__formatReadable=I.textureFormatReadable(A.format),z.__typeReadable=I.textureTypeReadable(A.type)),z}this.readRenderTargetPixels=function(A,z,J,q,Y,wt,Ct,bt=0){if(!(A&&A.isWebGLRenderTarget)){ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=Z.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ct!==void 0&&(Lt=Lt[Ct]),Lt){M.bindFramebuffer(F.FRAMEBUFFER,Lt);try{const Ft=A.textures[bt],te=Ft.format,se=Ft.type;A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+bt);const It=cl(Ft);if(It.__formatReadable===!1){ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(It.__typeReadable===!1){ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=A.width-q&&J>=0&&J<=A.height-Y&&F.readPixels(z,J,q,Y,Mt.convert(te),Mt.convert(se),wt)}finally{const Ft=X!==null?Z.get(X).__webglFramebuffer:null;M.bindFramebuffer(F.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(A,z,J,q,Y,wt,Ct,bt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=Z.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ct!==void 0&&(Lt=Lt[Ct]),Lt)if(z>=0&&z<=A.width-q&&J>=0&&J<=A.height-Y){M.bindFramebuffer(F.FRAMEBUFFER,Lt);const Ft=A.textures[bt],te=Ft.format,se=Ft.type;A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+bt);const It=cl(Ft);if(It.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(It.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const he=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,he),F.bufferData(F.PIXEL_PACK_BUFFER,wt.byteLength,F.STREAM_READ),F.readPixels(z,J,q,Y,Mt.convert(te),Mt.convert(se),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);const Ee=X!==null?Z.get(X).__webglFramebuffer:null;M.bindFramebuffer(F.FRAMEBUFFER,Ee);const _e=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Cu(F,_e,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,he),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,wt),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(he),F.deleteSync(_e),wt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,z=null,J=0){const q=Math.pow(2,-J),Y=Math.floor(A.image.width*q),wt=Math.floor(A.image.height*q),Ct=z!==null?z.x:0,bt=z!==null?z.y:0;j.setTexture2D(A,0),F.copyTexSubImage2D(F.TEXTURE_2D,J,0,0,Ct,bt,Y,wt),M.unbindTexture()},this.copyTextureToTexture=function(A,z,J=null,q=null,Y=0,wt=0){let Ct,bt,Lt,Ft,te,se,It,he,Ee;const _e=A.isCompressedTexture?A.mipmaps[wt]:A.image;if(J!==null)Ct=J.max.x-J.min.x,bt=J.max.y-J.min.y,Lt=J.isBox3?J.max.z-J.min.z:1,Ft=J.min.x,te=J.min.y,se=J.isBox3?J.min.z:0;else{const ye=Math.pow(2,-Y);Ct=Math.floor(_e.width*ye),bt=Math.floor(_e.height*ye),A.isDataArrayTexture?Lt=_e.depth:A.isData3DTexture?Lt=Math.floor(_e.depth*ye):Lt=1,Ft=0,te=0,se=0}q!==null?(It=q.x,he=q.y,Ee=q.z):(It=0,he=0,Ee=0);const pe=Mt.convert(z.format),ke=Mt.convert(z.type);let Rt;z.isData3DTexture?(j.setTexture3D(z,0),Rt=F.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(j.setTexture2DArray(z,0),Rt=F.TEXTURE_2D_ARRAY):(j.setTexture2D(z,0),Rt=F.TEXTURE_2D),M.activeTexture(F.TEXTURE0),M.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,z.flipY),M.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),M.pixelStorei(F.UNPACK_ALIGNMENT,z.unpackAlignment);const qe=M.getParameter(F.UNPACK_ROW_LENGTH),oe=M.getParameter(F.UNPACK_IMAGE_HEIGHT),nn=M.getParameter(F.UNPACK_SKIP_PIXELS),_n=M.getParameter(F.UNPACK_SKIP_ROWS),Vn=M.getParameter(F.UNPACK_SKIP_IMAGES);M.pixelStorei(F.UNPACK_ROW_LENGTH,_e.width),M.pixelStorei(F.UNPACK_IMAGE_HEIGHT,_e.height),M.pixelStorei(F.UNPACK_SKIP_PIXELS,Ft),M.pixelStorei(F.UNPACK_SKIP_ROWS,te),M.pixelStorei(F.UNPACK_SKIP_IMAGES,se);const xi=A.isDataArrayTexture||A.isData3DTexture,de=z.isDataArrayTexture||z.isData3DTexture;if(A.isDepthTexture){const ye=Z.get(A),Wn=Z.get(z),ge=Z.get(ye.__renderTarget),Xn=Z.get(Wn.__renderTarget);M.bindFramebuffer(F.READ_FRAMEBUFFER,ge.__webglFramebuffer),M.bindFramebuffer(F.DRAW_FRAMEBUFFER,Xn.__webglFramebuffer);for(let vi=0;vi<Lt;vi++)xi&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Z.get(A).__webglTexture,Y,se+vi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Z.get(z).__webglTexture,wt,Ee+vi)),F.blitFramebuffer(Ft,te,Ct,bt,It,he,Ct,bt,F.DEPTH_BUFFER_BIT,F.NEAREST);M.bindFramebuffer(F.READ_FRAMEBUFFER,null),M.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(Y!==0||A.isRenderTargetTexture||Z.has(A)){const ye=Z.get(A),Wn=Z.get(z);M.bindFramebuffer(F.READ_FRAMEBUFFER,C),M.bindFramebuffer(F.DRAW_FRAMEBUFFER,N);for(let ge=0;ge<Lt;ge++)xi?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ye.__webglTexture,Y,se+ge):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ye.__webglTexture,Y),de?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Wn.__webglTexture,wt,Ee+ge):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Wn.__webglTexture,wt),Y!==0?F.blitFramebuffer(Ft,te,Ct,bt,It,he,Ct,bt,F.COLOR_BUFFER_BIT,F.NEAREST):de?F.copyTexSubImage3D(Rt,wt,It,he,Ee+ge,Ft,te,Ct,bt):F.copyTexSubImage2D(Rt,wt,It,he,Ft,te,Ct,bt);M.bindFramebuffer(F.READ_FRAMEBUFFER,null),M.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else de?A.isDataTexture||A.isData3DTexture?F.texSubImage3D(Rt,wt,It,he,Ee,Ct,bt,Lt,pe,ke,_e.data):z.isCompressedArrayTexture?F.compressedTexSubImage3D(Rt,wt,It,he,Ee,Ct,bt,Lt,pe,_e.data):F.texSubImage3D(Rt,wt,It,he,Ee,Ct,bt,Lt,pe,ke,_e):A.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,wt,It,he,Ct,bt,pe,ke,_e.data):A.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,wt,It,he,_e.width,_e.height,pe,_e.data):F.texSubImage2D(F.TEXTURE_2D,wt,It,he,Ct,bt,pe,ke,_e);M.pixelStorei(F.UNPACK_ROW_LENGTH,qe),M.pixelStorei(F.UNPACK_IMAGE_HEIGHT,oe),M.pixelStorei(F.UNPACK_SKIP_PIXELS,nn),M.pixelStorei(F.UNPACK_SKIP_ROWS,_n),M.pixelStorei(F.UNPACK_SKIP_IMAGES,Vn),wt===0&&z.generateMipmaps&&F.generateMipmap(Rt),M.unbindTexture()},this.initRenderTarget=function(A){Z.get(A).__webglFramebuffer===void 0&&j.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?j.setTextureCube(A,0):A.isData3DTexture?j.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?j.setTexture2DArray(A,0):j.setTexture2D(A,0),M.unbindTexture()},this.resetState=function(){O=0,H=0,X=null,M.reset(),Tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=re._getDrawingBufferColorSpace(t),e.unpackColorSpace=re._getUnpackColorSpace()}}class Ne{s;constructor(t=1){this.s=t>>>0||1}next(){let t=this.s+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}range(t,e){return t+(e-t)*this.next()}int(t,e){return Math.floor(this.range(t,e+1))}pick(t){return t[Math.floor(this.next()*t.length)]}}const ax=.5*(Math.sqrt(3)-1),os=(3-Math.sqrt(3))/6,Ao=[[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];class Zi{perm=new Uint8Array(512);constructor(t=1){const e=new Ne(t),n=new Uint8Array(256);for(let s=0;s<256;s++)n[s]=s;for(let s=255;s>0;s--){const r=Math.floor(e.next()*(s+1)),o=n[s];n[s]=n[r],n[r]=o}for(let s=0;s<512;s++)this.perm[s]=n[s&255]}noise(t,e){const n=this.perm,s=(t+e)*ax,r=Math.floor(t+s),o=Math.floor(e+s),a=(r+o)*os,l=t-(r-a),c=e-(o-a),h=l>c?1:0,f=l>c?0:1,u=l-h+os,d=c-f+os,g=l-1+2*os,v=c-1+2*os,m=r&255,p=o&255;let y=0,T=.5-l*l-c*c;if(T>0){const S=Ao[n[m+n[p]]&7];T*=T,y+=T*T*(S[0]*l+S[1]*c)}let _=.5-u*u-d*d;if(_>0){const S=Ao[n[m+h+n[p+f]]&7];_*=_,y+=_*_*(S[0]*u+S[1]*d)}let R=.5-g*g-v*v;if(R>0){const S=Ao[n[m+1+n[p+1]]&7];R*=R,y+=R*R*(S[0]*g+S[1]*v)}return 70*y}fbm(t,e,n=4,s=2,r=.5){let o=1,a=1,l=0,c=0;for(let h=0;h<n;h++)l+=o*this.noise(t*a,e*a),c+=o,o*=r,a*=s;return l/c}ridged(t,e,n=4){let s=.5,r=1,o=0;for(let a=0;a<n;a++){const l=1-Math.abs(this.noise(t*r,e*r));o+=s*l*l,s*=.5,r*=2}return o}}const en=(i,t,e)=>i<t?t:i>e?e:i,Ce=(i,t,e)=>i+(t-i)*e,Kt=(i,t,e)=>{const n=en((e-i)/(t-i),0,1);return n*n*(3-2*n)},lx=(i,t,e,n)=>Ce(i,t,1-Math.exp(-e*n)),cx=i=>{for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;return i},Rv=(i,t,e,n)=>i+cx(t-i)*(1-Math.exp(-e*n)),Ue=800,Cr=401,Ot={startHill:{x:-575,z:290},camp:{x:-178,z:22},campView:{x:-150,z:40},tower:{x:250,z:-118},clearing:{x:425,z:45},mud1:{x:352,z:138},mud2:{x:470,z:118},grove:{x:296,z:252},ford:{x:-2,z:318},bridgeTree:{x:440,z:-214},jadeGate:{x:468,z:-345},rootTunnel:{x:520,z:-430},nineStones:{x:-330,z:-330},fossilSlab:{x:-420,z:-40},sandbank:{x:-95,z:150},thornThicket:{x:-236,z:130},jadeEdge:{x:330,z:-30}},hx=[{x:10,z:-840},{x:60,z:-600},{x:128,z:-380},{x:118,z:-210},{x:40,z:-60},{x:-70,z:25},{x:-112,z:92},{x:-86,z:190},{x:-20,z:300},{x:60,z:420},{x:110,z:600},{x:80,z:840}],ux=[{x:150,z:-262},{x:260,z:-238},{x:360,z:-232},{x:440,z:-238},{x:540,z:-228},{x:650,z:-250},{x:820,z:-240}],fx=[{x:-640,z:-520},{x:-470,z:-250},{x:-430,z:20},{x:-470,z:250},{x:-380,z:470},{x:-560,z:600},{x:-700,z:420},{x:-700,z:0},{x:-720,z:-330}],Cv=[{x:-640,z:-520},{x:-470,z:-250},{x:-430,z:20},{x:-380,z:250},{x:-160,z:330},{x:-10,z:330},{x:170,z:300},{x:330,z:190},{x:420,z:60},{x:330,z:200},{x:120,z:340},{x:-120,z:380},{x:-380,z:470},{x:-700,z:420},{x:-720,z:-330}],dx=[{x:425,z:40},{x:418,z:-30},{x:432,z:-95},{x:428,z:-150},{x:440,z:-198}],Pv=[{x:-420,z:300},{x:-320,z:230},{x:-240,z:170},{x:-170,z:150},{x:-110,z:150}],bn={a:{x:-268,z:118},b:{x:-186,z:208},gap:{x:-226,z:164}},px=[{x:380,z:-8},{x:468,z:-2},{x:492,z:62},{x:452,z:104},{x:390,z:96},{x:358,z:44},{x:452,z:28},{x:430,z:78}];function Or(i,t,e=!1){const n=[],s=i.length,r=a=>e?i[(a%s+s)%s]:i[Math.max(0,Math.min(s-1,a))],o=e?s:s-1;for(let a=0;a<o;a++){const l=r(a-1),c=r(a),h=r(a+1),f=r(a+2);for(let u=0;u<t;u++){const d=u/t,g=d*d,v=g*d;n.push({x:.5*(2*c.x+(-l.x+h.x)*d+(2*l.x-5*c.x+4*h.x-f.x)*g+(-l.x+3*c.x-3*h.x+f.x)*v),z:.5*(2*c.z+(-l.z+h.z)*d+(2*l.z-5*c.z+4*h.z-f.z)*g+(-l.z+3*c.z-3*h.z+f.z)*v)})}}return e||n.push(i[s-1]),n}class zr{pts;cum;length;grid=new Map;cell;constructor(t,e=40){this.pts=t,this.cell=e,this.cum=[0];for(let n=1;n<t.length;n++)this.cum.push(this.cum[n-1]+Math.hypot(t[n].x-t[n-1].x,t[n].z-t[n-1].z));this.length=this.cum[this.cum.length-1];for(let n=0;n<t.length-1;n++){const s=t[n],r=t[n+1],o=Math.floor(Math.min(s.x,r.x)/e)-2,a=Math.floor(Math.max(s.x,r.x)/e)+2,l=Math.floor(Math.min(s.z,r.z)/e)-2,c=Math.floor(Math.max(s.z,r.z)/e)+2;for(let h=o;h<=a;h++)for(let f=l;f<=c;f++){const u=h*100003+f;let d=this.grid.get(u);d||this.grid.set(u,d=[]),d.push(n)}}}nearest(t,e){const n=Math.floor(t/this.cell),s=Math.floor(e/this.cell),r=this.grid.get(n*100003+s);let o=1/0,a=0,l=1,c=0,h=0;if(!r)return{dist:1/0,s:0,tx:1,tz:0,side:0};for(const f of r){const u=this.pts[f],d=this.pts[f+1],g=d.x-u.x,v=d.z-u.z,m=g*g+v*v||1;let p=((t-u.x)*g+(e-u.z)*v)/m;p=p<0?0:p>1?1:p;const y=u.x+g*p,T=u.z+v*p,_=Math.hypot(t-y,e-T);if(_<o){o=_,a=this.cum[f]+Math.sqrt(m)*p;const R=Math.sqrt(m);l=g/R,c=v/R,h=Math.sign(g*(e-u.z)-v*(t-u.x))}}return{dist:o,s:a,tx:l,tz:c,side:h}}pointAt(t){t=Math.max(0,Math.min(this.length,t));let e=0,n=this.cum.length-1;for(;n-e>1;){const l=e+n>>1;this.cum[l]<=t?e=l:n=l}const s=this.cum[n]-this.cum[e]||1,r=(t-this.cum[e])/s,o=this.pts[e],a=this.pts[n];return{x:o.x+(a.x-o.x)*r,z:o.z+(a.z-o.z)*r}}}const on=new zr(Or(hx,16),48),ps=new zr(Or(ux,12),48),ms=new zr(Or(fx,14,!0),60),Lh=new zr(Or(dx,8),40),Pr=i=>7.5-i*.0036;function Fn(i,t,e){const n=Math.hypot(t-Ot.ford.x,e-Ot.ford.z),s=Math.max(0,1-n/70);return 16+6*Math.sin(i*.004)+4*Math.sin(i*.011)+s*14}function mx(i,t){const e=Math.hypot(i-Ot.ford.x,t-Ot.ford.z),n=Math.max(0,1-e/60);return 3.2*(1-n)+.55*n}function gx(i,t){const e=new Ne(t),n=new Uint8Array(i*i*4),s=[8,16,32,64],r=s.map(l=>{const c=new Float32Array(l*l*4);for(let h=0;h<c.length;h++)c[h]=e.next();return c}),o=l=>l*l*(3-2*l);for(let l=0;l<i;l++)for(let c=0;c<i;c++){const h=[0,0,0,0];for(let u=0;u<4;u++){let d=0,g=1,v=0;for(let m=0;m<s.length;m++){const p=(m+u)%s.length,y=s[p],T=r[p],_=c/i*y,R=l/i*y,S=Math.floor(_),P=Math.floor(R),x=o(_-S),b=o(R-P),w=(U,E)=>T[((E%y*y+U%y)*4+u)%T.length],D=(w(S,P)*(1-x)+w(S+1,P)*x)*(1-b)+(w(S,P+1)*(1-x)+w(S+1,P+1)*x)*b;d+=D*g,v+=g,g*=.55}h[u]=d/v}const f=(l*i+c)*4;for(let u=0;u<4;u++)n[f+u]=Math.round(Math.min(1,Math.max(0,(h[u]-.5)*1.8+.5))*255)}const a=new qi(n,i,i,Ze);return a.wrapS=a.wrapT=_s,a.magFilter=Ae,a.minFilter=On,a.generateMipmaps=!0,a.needsUpdate=!0,a}function xx(i,t,e){const n=new Ne(e),s=[];for(let a=0;a<t;a++)for(let l=0;l<t;l++)s.push({x:(l+.15+n.next()*.7)/t,y:(a+.15+n.next()*.7)/t,v:n.next()});const r=new Uint8Array(i*i*4);for(let a=0;a<i;a++)for(let l=0;l<i;l++){const c=l/i,h=a/i,f=Math.floor(c*t),u=Math.floor(h*t);let d=9,g=9,v=0;for(let y=-1;y<=1;y++)for(let T=-1;T<=1;T++){const _=(f+T+t)%t,R=(u+y+t)%t,S=s[R*t+_];let P=S.x+(f+T<0?-1:f+T>=t?1:0),x=S.y+(u+y<0?-1:u+y>=t?1:0);const b=Math.hypot(c-P,h-x);b<d?(g=d,d=b,v=S.v):b<g&&(g=b)}const m=Math.min(1,(g-d)*t*2.2),p=(a*i+l)*4;r[p]=Math.round(m*255),r[p+1]=Math.round(v*255),r[p+2]=Math.round(Math.min(1,d*t*1.4)*255),r[p+3]=255}const o=new qi(r,i,i,Ze);return o.wrapS=o.wrapT=_s,o.magFilter=Ae,o.minFilter=On,o.generateMipmaps=!0,o.needsUpdate=!0,o}const vx=gx(256,99),_x=xx(256,12,7),ve={uTime:{value:0},uSunDir:{value:new L(.3,.5,.2).normalize()},uSunColor:{value:new at(1,.9,.7)},uFogColor:{value:new at(.7,.75,.8)},uFogDensity:{value:.0012},uFogFalloff:{value:.045},uFogBase:{value:0},uMist:{value:0},uCloudCover:{value:.3},uCloudShadow:{value:.55},uWindOffset:{value:new mt},uWetness:{value:0},uWindVec:{value:new L(1,0,.4)},uNoiseTex:{value:vx},uScaleTex:{value:_x}},Ih=`
varying vec3 vWorldPosW;
uniform float uTime;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uFogColor;
uniform float uFogDensity;
uniform float uFogFalloff;
uniform float uFogBase;
uniform float uMist;
uniform float uCloudCover;
uniform float uCloudShadow;
uniform vec2 uWindOffset;
uniform float uWetness;
uniform sampler2D uNoiseTex;
float cloudShadowAt(vec2 xz) {
  float c = texture2D(uNoiseTex, (xz + uWindOffset) * 0.0011).r * 0.65 + texture2D(uNoiseTex, (xz + uWindOffset * 1.3) * 0.0031).g * 0.35;
  float cov = smoothstep(1.0 - uCloudCover - 0.12, 1.0 - uCloudCover + 0.12, c);
  return 1.0 - cov * uCloudShadow;
}
vec3 applyWorldFog(vec3 col, vec3 wp) {
  vec3 d = wp - cameraPosition;
  float dist = length(d);
  float fh = uFogFalloff;
  float y0 = cameraPosition.y - uFogBase;
  float dy = wp.y - cameraPosition.y;
  float k = uFogDensity * exp(-fh * y0);
  float amt = abs(dy) > 0.05 ? k * dist * (1.0 - exp(-fh * dy)) / (fh * dy) : k * dist;
  // 朝霧：地面から数メートルに溜まる霧。遠くほど積分されて白くなる
  float mistH = exp(-max(wp.y - uFogBase - 6.0, 0.0) * 0.09);
  amt += uMist * 0.0065 * dist * mistH * (0.75 + 0.5 * texture2D(uNoiseTex, (wp.xz + uWindOffset * 0.6) * 0.004).b);
  float f = 1.0 - exp(-max(amt, 0.0));
  vec3 v = d / max(dist, 0.001);
  float sunA = pow(max(dot(v, uSunDir), 0.0), 6.0);
  vec3 fc = mix(uFogColor, uSunColor, sunA * 0.55);
  return mix(col, fc, clamp(f, 0.0, 1.0));
}
`,Mx=`
varying vec3 vWorldPosW;
varying vec3 vRestPos;
varying vec3 vRestNormal;
`,Sx=`
{
  vec4 wpW = vec4(transformed, 1.0);
  #ifdef USE_BATCHING
    wpW = batchingMatrix * wpW;
  #endif
  #ifdef USE_INSTANCING
    wpW = instanceMatrix * wpW;
  #endif
  wpW = modelMatrix * wpW;
  vWorldPosW = wpW.xyz;
  vRestPos = position;
  vRestNormal = normal;
}
`;function we(i,t={}){const e=i.onBeforeCompile;i.onBeforeCompile=(r,o)=>{e?.call(i,r,o),Object.assign(r.uniforms,ve),r.vertexShader=Mx+r.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
`+Sx);let a=r.fragmentShader;a=Ih+`varying vec3 vRestPos;
varying vec3 vRestNormal;
uniform sampler2D uScaleTex;
`+a;const l=(t.fogScale??1).toFixed(3),c=(t.haze??0).toFixed(3);if(a=a.replace("#include <fog_fragment>",`gl_FragColor.rgb = mix(gl_FragColor.rgb, applyWorldFog(gl_FragColor.rgb, vWorldPosW), ${l});
      gl_FragColor.rgb = mix(gl_FragColor.rgb, uFogColor, ${c} * (1.0 - exp(-length(vWorldPosW - cameraPosition) * 0.00032)));`),t.noCloud||(a=a.replace("#include <lights_fragment_end>",`#include <lights_fragment_end>
        { float cs = cloudShadowAt(vWorldPosW.xz); reflectedLight.directDiffuse *= cs; reflectedLight.directSpecular *= cs; }`)),a=a.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
      roughnessFactor = mix(roughnessFactor, roughnessFactor * 0.45, uWetness);`),a=a.replace("#include <color_fragment>",`#include <color_fragment>
      diffuseColor.rgb *= mix(1.0, 0.72, uWetness);`),t.terrainDetail||t.rock||t.skin){let h="";t.terrainDetail?h=`
        float camD = length(vWorldPosW - cameraPosition);
        float n1 = texture2D(uNoiseTex, vWorldPosW.xz * 0.045).r;
        float n2 = texture2D(uNoiseTex, vWorldPosW.xz * 0.31).g;
        float n3 = texture2D(uNoiseTex, vWorldPosW.xz * 0.9).b;
        diffuseColor.rgb *= 0.8 + 0.3 * n1;
        diffuseColor.rgb *= mix(0.9 + 0.2 * n2, 1.0, smoothstep(40.0, 120.0, camD));
        float hgt = n2 * 0.7 + n3 * 0.3;
        float bumpS = 1.2 * (1.0 - smoothstep(6.0, 40.0, camD));`:t.rock?h=`
        float camD = length(vWorldPosW - cameraPosition);
        vec3 bw = abs(normalize(vRestNormal)); bw /= (bw.x + bw.y + bw.z);
        float s1 = texture2D(uNoiseTex, vRestPos.yz * 0.5).r * bw.x + texture2D(uNoiseTex, vRestPos.xz * 0.5).r * bw.y + texture2D(uNoiseTex, vRestPos.xy * 0.5).r * bw.z;
        float s2 = texture2D(uNoiseTex, vRestPos.yz * 2.1).g * bw.x + texture2D(uNoiseTex, vRestPos.xz * 2.1).g * bw.y + texture2D(uNoiseTex, vRestPos.xy * 2.1).g * bw.z;
        // 地層の縞
        float strata = sin(vWorldPosW.y * 2.3 + s1 * 3.0) * 0.5 + 0.5;
        diffuseColor.rgb *= 0.72 + 0.3 * s1 + 0.12 * strata;
        // 上向きの面には苔
        float mossy = smoothstep(0.55, 0.9, normalize(vRestNormal).y + s2 * 0.3) * 0.7;
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.20, 0.27, 0.12), mossy * 0.6);
        float hgt = s1 * 0.5 + s2 * 0.5;
        float bumpS = 3.0 * (1.0 - smoothstep(15.0, 90.0, camD));`:t.skin&&(h=`
        float camD = length(vWorldPosW - cameraPosition);
        vec3 bw = pow(abs(normalize(vRestNormal)), vec3(3.0)); bw /= (bw.x + bw.y + bw.z);
        vec3 sp = vRestPos * ${(1/t.skin.scale).toFixed(4)};
        vec4 sx = texture2D(uScaleTex, sp.yz), sy = texture2D(uScaleTex, sp.xz), sz = texture2D(uScaleTex, sp.xy);
        vec4 sc4 = sx * bw.x + sy * bw.y + sz * bw.z;
        float wr = texture2D(uNoiseTex, sp.xz * 0.23).r * bw.y + texture2D(uNoiseTex, sp.xy * 0.23).r * bw.z + texture2D(uNoiseTex, sp.yz * 0.23).r * bw.x;
        float detailFade = 1.0 - smoothstep(12.0, 70.0, camD);
        float crease = (1.0 - sc4.r) * detailFade;
        diffuseColor.rgb *= 1.0 - crease * ${t.skin.crease.toFixed(3)};
        diffuseColor.rgb *= mix(1.0, 0.9 + 0.2 * sc4.g, detailFade);
        diffuseColor.rgb *= 0.85 + 0.3 * wr;
        float hgt = sc4.r * 0.7 + (1.0 - sc4.b) * 0.3 + wr * 0.4;
        float bumpS = ${t.skin.bump.toFixed(3)} * (1.0 - smoothstep(8.0, 60.0, camD));`),a=a.replace("#include <color_fragment>",`#include <color_fragment>
`+h),a=a.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
      {
        vec3 dpdx = dFdx(-vViewPosition), dpdy = dFdy(-vViewPosition);
        float dhx = dFdx(hgt), dhy = dFdy(hgt);
        vec3 r1 = cross(dpdy, normal), r2 = cross(normal, dpdx);
        float det = dot(dpdx, r1);
        vec3 g = sign(det) * (dhx * r1 + dhy * r2);
        normal = normalize(abs(det) * normal - g * bumpS * 0.04);
      }`)}r.fragmentShader=a};const n=JSON.stringify(t),s=i.customProgramCacheKey?.bind(i);return i.customProgramCacheKey=()=>(s?s():"")+"world"+n,i}const We=new Zi(20260921),vr=new Zi(4242),$n=(i,t,e,n,s)=>{const r=Math.hypot(i-e.x,t-e.z)/n;if(r>=1)return 0;const o=1-r*r;return s*o*o};function ya(i,t){const e=We.noise(i/90,t/90)*38;return Kt(215,335,i+e)*(1-Kt(215,300,t+e*.8))}function ba(i,t){const e=Math.hypot(i-Ot.clearing.x,(t-Ot.clearing.z)*1.1);return 1-Kt(70,105,e+We.noise(i/30,t/30)*12)}function wa(i,t){const e=1-Kt(12,24,Math.hypot(i-Ot.mud1.x,t-Ot.mud1.z)+We.noise(i/9,t/9)*4),n=1-Kt(8,17,Math.hypot(i-Ot.mud2.x,t-Ot.mud2.z)+We.noise(i/9+5,t/9)*3);return Math.max(e,n)}function yx(i,t){let e=9+9*We.fbm(i/520,t/520,4)+3.2*We.fbm(i/150+10,t/150,3)+.6*vr.fbm(i/22,t/22,2);const n=ya(i,t);e+=n*(3.5*vr.ridged(i/85,t/85,3)-1.5),e+=$n(i,t,Ot.startHill,135,30),e+=$n(i,t,{x:-470,z:470},120,12),e+=$n(i,t,Ot.tower,70,12),e+=$n(i,t,{x:270,z:-330},300,24),e+=$n(i,t,{x:250,z:-250},150,10),e+=$n(i,t,{x:-300,z:-170},170,10),e+=$n(i,t,Ot.nineStones,70,6),e+=$n(i,t,{x:600,z:250},220,22);const s=Math.hypot(i-Ot.camp.x,t-Ot.camp.z);e=Ce(e,17.5,1-Kt(48,95,s));const r=ba(i,t);e=Ce(e,12+1.5*We.noise(i/60,t/60),r*.75);const o=Math.max(Math.abs(i),Math.abs(t))+We.noise(i/160,t/160)*50,a=Kt(600,800,o);e+=a*a*(70+45*We.fbm(i/260,t/260,4)+40*We.ridged(i/200,t/200,3));const l=ms.nearest(i,t);l.dist<9&&(e-=.8*Math.pow(1-l.dist/9,2));const c=wa(i,t);e-=c*1.1;const h=ps.nearest(i,t);if(h.dist<30){const u=Ce(8.2,-9,Kt(160,300,i))+We.noise(i/25,t/25)*1.2,d=Kt(9,24,h.dist+vr.noise(i/14,t/14)*3);e=Ce(Math.min(u,e),e,d)}const f=on.nearest(i,t);if(f.dist<90){const u=Pr(f.s),d=Fn(f.s,i,t),g=u-mx(i,t)-.4*We.noise(i/12,t/12),v=Math.max(e,u+1.1),m=e>u+12?6:16,p=Kt(d*.5,d+m,f.dist);e=Ce(g,v,p),f.dist>d&&(e=Math.max(e,u+.5+(f.dist-d)*.03))}return e}class bx{res=Cr;cell=Ue*2/(Cr-1);heights;mesh;dataTex;grassDensity;jungle;wet;constructor(){const t=this.res;this.heights=new Float32Array(t*t),this.grassDensity=new Float32Array(t*t),this.jungle=new Float32Array(t*t),this.wet=new Float32Array(t*t);for(let e=0;e<t;e++)for(let n=0;n<t;n++){const s=-Ue+n*this.cell,r=-Ue+e*this.cell;this.heights[e*t+n]=yx(s,r)}}height(t,e){const n=this.res;let s=(t+Ue)/this.cell,r=(e+Ue)/this.cell;s=en(s,0,n-1.001),r=en(r,0,n-1.001);const o=Math.floor(s),a=Math.floor(r),l=s-o,c=r-a,h=this.heights,f=h[a*n+o],u=h[a*n+o+1],d=h[(a+1)*n+o],g=h[(a+1)*n+o+1];return l+c<1?f+(u-f)*l+(d-f)*c:g+(d-g)*(1-l)+(u-g)*(1-c)}normal(t,e,n=new L){const r=this.height(t+1.5,e)-this.height(t-1.5,e),o=this.height(t,e+1.5)-this.height(t,e-1.5);return n.set(-r,2*1.5,-o).normalize()}slope(t,e){return Math.acos(this.normal(t,e).y)}waterLevel(t,e){const n=on.nearest(t,e);return n.dist<Fn(n.s,t,e)+6?Pr(n.s):-1/0}flow(t,e){const n=on.nearest(t,e),s=Fn(n.s,t,e);if(n.dist>s+4)return{x:0,z:0};const r=Math.hypot(t-Ot.ford.x,e-Ot.ford.z),o=(1-Kt(s*.4,s+4,n.dist))*Ce(.35,2.1,Kt(30,80,r));return{x:n.tx*o,z:n.tz*o}}jungleAt(t,e){return ya(t,e)}mudAt(t,e){return wa(t,e)}clearingAt(t,e){return ba(t,e)}grassAt(t,e){const n=this.res,s=en(Math.round((t+Ue)/this.cell),0,n-1),r=en(Math.round((e+Ue)/this.cell),0,n-1);return this.grassDensity[r*n+s]}build(){const t=this.res,e=new Float32Array(t*t*3),n=new Float32Array(t*t*3),s=new Float32Array(t*t*3),r=this.heights,o=new at(10260816),a=new at(6257207),l=new at(11772250),c=new at(3095330),h=new at(3955244),f=new at(8023907),u=new at(9067076),d=new at(11115129),g=new at(3878692),v=new at(8153676),m=new at(4868668),p=new at(9276808),y=new at;for(let w=0;w<t;w++)for(let D=0;D<t;D++){const U=w*t+D,E=-Ue+D*this.cell,C=-Ue+w*this.cell,N=r[U];e[U*3]=E,e[U*3+1]=N,e[U*3+2]=C;const O=r[w*t+Math.max(0,D-1)],H=r[w*t+Math.min(t-1,D+1)],X=r[Math.max(0,w-1)*t+D],k=r[Math.min(t-1,w+1)*t+D],V=O-H,W=X-k,ut=2*this.cell,it=Math.hypot(V,ut,W);n[U*3]=V/it,n[U*3+1]=ut/it,n[U*3+2]=W/it;const zt=Math.acos(ut/it),Gt=ya(E,C),Xt=ba(E,C),Q=We.fbm(E/180,C/180,3)*.5+.5;y.copy(a).lerp(o,Kt(.35,.75,Q)),y.lerp(l,Kt(.6,.9,vr.noise(E/70,C/70)*.5+.5)*.5),y.lerp(c,Gt*(1-Xt*.6)),y.lerp(h,Gt*.35*(We.noise(E/18,C/18)*.5+.5));const K=ms.nearest(E,C);let ct=K.dist<6?Math.pow(1-K.dist/6,1.5)*.55:0;y.lerp(v,ct*(1-Gt));const Et=Lh.nearest(E,C);if(Et.dist<7){const Pt=Math.pow(1-Et.dist/7,1.2)*.6;y.lerp(v,Pt),ct=Math.max(ct,Pt)}const pt=Math.hypot(E-Ot.camp.x,C-Ot.camp.z);y.lerp(v,(1-Kt(18,38,pt))*.6);const ft=on.nearest(E,C);let Yt=0;if(ft.dist<70){const Pt=Pr(ft.s),Nt=Fn(ft.s,E,C),Zt=1-Kt(Nt,Nt+9,ft.dist);y.lerp(d,Zt*.85),N<Pt-.2&&y.lerp(m,.8),Yt=Math.max(Yt,1-Kt(Nt-2,Nt+14,ft.dist))}const $=wa(E,C);y.lerp(g,$),Yt=Math.max(Yt,$);const st=Kt(.55,.85,zt+We.noise(E/10,C/10)*.12),ot=ps.nearest(E,C).dist<40?.7:.25+.3*Kt(300,700,Math.abs(C)+Math.abs(E)*.5);y.lerp(y.clone().copy(f).lerp(u,ot),st),y.lerp(p,Kt(55,120,N)*.6),s[U*3]=y.r,s[U*3+1]=y.g,s[U*3+2]=y.b;let ht=(1-st)*(1-Kt(.18,.42,Gt*(1-Xt)))*(1-$)*(1-ct*.8);ht*=1-(1-Kt(14,34,pt))*.9,ft.dist<60&&(ht*=Kt(Fn(ft.s,E,C)+1,Fn(ft.s,E,C)+8,ft.dist)),ht*=.65+.35*Kt(-.3,.4,We.noise(E/40,C/40)),ht*=1-Kt(40,90,N);const Dt=Dh(E,C,bn.a,bn.b);Dt<3&&(ht*=Dt/3),this.grassDensity[U]=en(ht,0,1),this.jungle[U]=Gt*(1-Xt),this.wet[U]=Yt}const T=new Uint32Array((t-1)*(t-1)*6);let _=0;for(let w=0;w<t-1;w++)for(let D=0;D<t-1;D++){const U=w*t+D,E=U+1,C=U+t,N=C+1;T[_++]=U,T[_++]=C,T[_++]=E,T[_++]=E,T[_++]=C,T[_++]=N}const R=new le;R.setAttribute("position",new Se(e,3)),R.setAttribute("normal",new Se(n,3)),R.setAttribute("color",new Se(s,3)),R.setIndex(new Se(T,1)),R.computeBoundingSphere();const S=new be({vertexColors:!0,roughness:.94,metalness:0});we(S,{terrainDetail:!0});const P=new At(R,S);P.receiveShadow=!0,P.name="terrain",this.mesh=P;const x=new Uint16Array(t*t*4);for(let w=0;w<t*t;w++)x[w*4]=Bs.toHalfFloat(r[w]),x[w*4+1]=Bs.toHalfFloat(this.grassDensity[w]),x[w*4+2]=Bs.toHalfFloat(this.jungle[w]),x[w*4+3]=Bs.toHalfFloat(this.wet[w]);const b=new qi(x,t,t,Ze,xn);return b.magFilter=Ae,b.minFilter=Ae,b.wrapS=b.wrapT=wn,b.needsUpdate=!0,this.dataTex=b,P}}function Dh(i,t,e,n){const s=n.x-e.x,r=n.z-e.z,o=en(((i-e.x)*s+(t-e.z)*r)/(s*s+r*r),0,1);return Math.hypot(i-(e.x+s*o),t-(e.z+r*o))}class wx{cell=16;map=new Map;all=[];key(t,e){return t*73856093^e*19349663}add(t){this.all.push(t);const e=Math.floor((t.x-t.r)/this.cell),n=Math.floor((t.x+t.r)/this.cell),s=Math.floor((t.z-t.r)/this.cell),r=Math.floor((t.z+t.r)/this.cell);for(let o=e;o<=n;o++)for(let a=s;a<=r;a++){const l=this.key(o,a);let c=this.map.get(l);c||this.map.set(l,c=[]),c.push(t)}return t}query(t,e,n,s=[]){s.length=0;const r=Math.floor((t-n)/this.cell),o=Math.floor((t+n)/this.cell),a=Math.floor((e-n)/this.cell),l=Math.floor((e+n)/this.cell);for(let c=r;c<=o;c++)for(let h=a;h<=l;h++){const f=this.map.get(this.key(c,h));if(f)for(const u of f)u.active&&!s.includes(u)&&s.push(u)}return s}resolve(t,e,n=0){const s=this.query(t.x,t.z,e+4,this.tmp);let r=!1;for(const o of s){if(n>o.top)continue;const a=t.x-o.x,l=t.z-o.z,c=Math.hypot(a,l),h=o.r+e;c<h&&c>1e-4&&(t.x=o.x+a/c*h,t.z=o.z+l/c*h,r=!0)}return r}raycast(t,e,n,s,r,o){const a=n-t,l=s-e,c=Math.hypot(a,l),h=Math.ceil(c/4);let f=null,u=1/0;const d=new Set;for(let g=0;g<=h;g++){const v=g/Math.max(1,h);for(const m of this.query(t+a*v,e+l*v,r+4,this.tmp)){if(d.has(m)||o&&!o(m))continue;d.add(m);const p=t-m.x,y=e-m.z,T=a*a+l*l,_=2*(p*a+y*l),R=p*p+y*y-(m.r+r)*(m.r+r),S=_*_-4*T*R;if(S<0)continue;const P=(-_-Math.sqrt(S))/(2*T);P>=0&&P<=1&&P<u&&(u=P,f=m)}}return f}tmp=[]}const Ex=150,Lv={clear:"晴れ",fog:"霧",cloudy:"曇り",rain:"にわか雨"};class Tx{total=5.3;scale=1;n=new Zi(77);get hour(){return(this.total%24+24)%24}get day(){return Math.floor(this.total/24)+1}advance(t){this.total+=t/Ex*this.scale}skipTo(t){let e=t-this.hour;e<=.05&&(e+=24),this.total+=e}label(){const t=Math.floor(this.hour),e=Math.floor((this.hour-t)*60);return`${this.day}日目 ${t}:${e.toString().padStart(2,"0")}`}phaseName(t=this.hour){return t<4.5?"夜":t<7?"夜明け":t<11?"朝":t<15?"昼":t<17.5?"午後":t<19.5?"夕暮れ":"夜"}isNight(t=this.hour){return t<5||t>19.6}daylight(t=this.hour){return Kt(4.6,7.2,t)*(1-Kt(17.4,19.8,t))}weatherAt(t){const e=(t%24+24)%24,n=Math.floor(t/24),s=this.n.fbm(t*.045,3.1,2)*.5+.5,r=this.n.noise(t*.09,17.3)*.5+.5;let a=(.55+.45*(this.n.noise(n*1.7,9.2)*.5+.5))*Kt(3.5,5.5,e)*(1-Kt(8.2,10.5,e));a=Math.max(a,.25*Kt(20,23,e)*(1-Kt(0,3,e)));let l=Kt(.35,.8,s),c=l>.62?Kt(.6,.78,r)*Kt(.62,.8,l):0;t<7.2&&(a=Math.max(a,.9*(1-Kt(6.4,7.2,t))),c=0,l=Math.min(l,.3));let h="clear";return c>.35?h="rain":a>.45?h="fog":l>.55&&(h="cloudy"),{kind:h,fog:en(a,0,1),cloud:l,rain:c}}forecast(t=12){const e=[],n=Math.ceil(this.total);for(let s=0;s<t;s+=2){const r=n+s;e.push({hour:(r%24+24)%24,kind:this.weatherAt(r+.5).kind})}return e}wind(t=this.total){const e=-.6+this.n.noise(t*.03,50.5)*1.6,n=en(.35+this.n.noise(t*.12,81.2)*.35+this.weatherAt(t).rain*.3,.08,1);return{dir:e,strength:n}}}function Nh(i){const t=(i-6)/12*Math.PI,e=Math.sin(t),n=Math.cos(t),s=.35,r=Math.hypot(n,e,s);return{x:n/r,y:e/r,z:s/r}}function Ax(i){const t=Nh((i+12)%24);return{x:t.x*.9,y:t.y,z:-.3}}const cr=[{h:0,zenith:397354,horizon:1385290,sun:9414360,sunI:.16,amb:2767462,ambI:.62,fog:1318972,exposure:1.35},{h:4.4,zenith:528944,horizon:1845836,sun:9414360,sunI:.12,amb:2898530,ambI:.55,fog:1713728,exposure:1.3},{h:5.4,zenith:1912661,horizon:13208170,sun:16751196,sunI:.5,amb:5331066,ambI:.45,fog:10134452,exposure:1.05},{h:6.4,zenith:4156070,horizon:15909263,sun:16760970,sunI:1.5,amb:9082544,ambI:.55,fog:13158080,exposure:1},{h:8.5,zenith:4027583,horizon:12375014,sun:16773334,sunI:2.6,amb:10467023,ambI:.62,fog:12176088,exposure:.92},{h:12,zenith:3042500,horizon:11783654,sun:16775920,sunI:3,amb:10796246,ambI:.66,fog:11913692,exposure:.88},{h:16,zenith:3829688,horizon:13292504,sun:16770752,sunI:2.6,amb:10990532,ambI:.6,fog:12766162,exposure:.92},{h:18,zenith:4018054,horizon:15770728,sun:16750408,sunI:1.6,amb:9207695,ambI:.5,fog:13606786,exposure:1},{h:19.2,zenith:1778248,horizon:9063e3,sun:16739898,sunI:.45,amb:4998246,ambI:.4,fog:5915736,exposure:1.05},{h:20.4,zenith:660272,horizon:1976910,sun:9414360,sunI:.16,amb:2898534,ambI:.58,fog:1516352,exposure:1.3},{h:24,zenith:397354,horizon:1385290,sun:9414360,sunI:.16,amb:2767462,ambI:.62,fog:1318972,exposure:1.35}],Rx=new at,Cx=new at;function Px(i){let t=0;for(;t<cr.length-2&&cr[t+1].h<=i;)t++;const e=cr[t],n=cr[t+1],s=en((i-e.h)/(n.h-e.h),0,1),r=(o,a)=>Rx.set(o).lerp(Cx.set(a),s).clone();return{zenith:r(e.zenith,n.zenith),horizon:r(e.horizon,n.horizon),sun:r(e.sun,n.sun),sunI:Ce(e.sunI,n.sunI,s),amb:r(e.amb,n.amb),ambI:Ce(e.ambI,n.ambI,s),fog:r(e.fog,n.fog),exposure:Ce(e.exposure,n.exposure,s)}}const Lx=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}`,Ix=`
uniform vec3 uZenith, uHorizon, uSunCol, uSunDir, uMoonDir, uFogCol;
uniform float uNight, uCloud, uTime, uMist;
uniform sampler2D uNoise;
varying vec3 vDir;
float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
void main() {
  vec3 d = normalize(vDir);
  float up = max(d.y, 0.0);
  vec3 col = mix(uHorizon, uZenith, pow(up, 0.42));
  // 太陽と散乱
  float sd = max(dot(d, uSunDir), 0.0);
  col += uSunCol * (pow(sd, 6.0) * 0.35 + pow(sd, 64.0) * 0.6) * (1.0 - uNight * 0.8);
  float disc = smoothstep(0.9994, 0.99975, sd);
  col += uSunCol * disc * 6.0 * (1.0 - uCloud * 0.7) * step(-0.02, uSunDir.y);
  // 月
  float md = max(dot(d, normalize(uMoonDir)), 0.0);
  col += vec3(0.75, 0.8, 0.95) * smoothstep(0.99955, 0.9998, md) * uNight * 1.6;
  col += vec3(0.25, 0.3, 0.45) * pow(md, 40.0) * uNight * 0.3;
  // 星（夜だけ。雲で隠れる）
  vec3 sp = floor(d * 420.0);
  float st = hash(sp);
  float star = step(0.9965, st) * (0.6 + 0.4 * sin(uTime * (1.0 + st * 3.0) + st * 40.0));
  col += vec3(0.85, 0.9, 1.0) * star * uNight * smoothstep(0.02, 0.2, d.y) * (1.0 - uCloud);
  // 天の川の帯
  float band = exp(-pow(dot(d, normalize(vec3(0.4, 0.2, 0.9))) * 3.2, 2.0));
  col += vec3(0.12, 0.13, 0.2) * band * uNight * texture2D(uNoise, d.xz * 1.6 + 0.3).r * (1.0 - uCloud) * smoothstep(0.0, 0.3, d.y);
  // 雲（2層の流れる雲）
  vec2 cuv = d.xz / (d.y + 0.12);
  float cl = texture2D(uNoise, cuv * 0.18 + vec2(uTime * 0.0015, 0.0)).r * 0.6 + texture2D(uNoise, cuv * 0.5 + vec2(uTime * 0.003, uTime * 0.001)).g * 0.4;
  float cov = smoothstep(0.62 - uCloud * 0.45, 0.9 - uCloud * 0.3, cl) * smoothstep(0.0, 0.18, d.y);
  vec3 cloudCol = mix(uHorizon * 1.05 + 0.04, uSunCol * 0.9 + uHorizon * 0.3, pow(sd, 4.0) * 0.8);
  cloudCol = mix(cloudCol, uZenith * 0.5 + uHorizon * 0.2, uNight * 0.7);
  col = mix(col, cloudCol, cov * 0.85);
  // 地平線より下は霧の色へ
  col = mix(col, uFogCol, smoothstep(0.06, -0.05, d.y));
  col = mix(col, uFogCol, uMist * 0.5 * smoothstep(0.25, 0.0, d.y));
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;class Dx{mesh;sun;hemi;uniforms;exposure=1;shadowRadius=70;isNight=!1;tmp=new L;constructor(t,e){this.uniforms={uZenith:{value:new at},uHorizon:{value:new at},uSunCol:{value:new at},uSunDir:{value:new L(0,1,0)},uMoonDir:{value:new L(0,1,0)},uFogCol:{value:new at},uNight:{value:0},uCloud:{value:0},uTime:{value:0},uMist:{value:0},uNoise:{value:ve.uNoiseTex.value}};const n=new ui(1,48,24),s=new Be({vertexShader:Lx,fragmentShader:Ix,uniforms:this.uniforms,side:Ke,depthWrite:!1,depthTest:!0});if(this.mesh=new At(n,s),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-10,this.mesh.scale.setScalar(9e3),t.add(this.mesh),this.sun=new sd(16777215,2),this.sun.castShadow=e>0,e>0){this.sun.shadow.mapSize.set(e,e);const r=this.sun.shadow.camera;r.left=-this.shadowRadius,r.right=this.shadowRadius,r.top=this.shadowRadius,r.bottom=-this.shadowRadius,r.near=1,r.far=600,this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.6}t.add(this.sun,this.sun.target),this.hemi=new ed(10533072,4866096,.6),t.add(this.hemi)}setShadowRadius(t){this.shadowRadius=t;const e=this.sun.shadow.camera;e.left=-t,e.right=t,e.top=t,e.bottom=-t,e.updateProjectionMatrix()}update(t,e,n,s,r){const o=Px(t),a=Nh(t),l=Ax(t),c=a.y>-.03,h=1-Kt(-.12,.05,a.y);this.isNight=h>.5;const f=en(e.cloud*.75+e.rain*.6,0,1),u=new at(.55,.58,.62).multiplyScalar(.3+.7*(1-h));o.horizon.lerp(u.clone().multiplyScalar(1.25),f*.6),o.zenith.lerp(u,f*.7),o.fog.lerp(u.clone().multiplyScalar(1.2),f*.5),o.fog.lerp(new at(.8,.8,.8).multiplyScalar(.25+.75*(1-h)).lerp(o.sun,.25),e.fog*.5);const d=this.uniforms;d.uZenith.value.copy(o.zenith),d.uHorizon.value.copy(o.horizon),d.uSunCol.value.copy(o.sun),d.uFogCol.value.copy(o.fog),d.uSunDir.value.set(a.x,a.y,a.z),d.uMoonDir.value.set(l.x,l.y,l.z),d.uNight.value=h,d.uCloud.value=f,d.uTime.value=r,d.uMist.value=e.fog;const g=c?this.tmp.set(a.x,Math.max(a.y,.04),a.z):this.tmp.set(l.x,Math.max(l.y,.2),l.z);g.normalize();const v=o.sunI*(1-f*.7)*(1-e.fog*.35);this.sun.intensity=c?v:.5*(1-f*.6)*Math.max(.3,l.y),this.sun.color.copy(c?o.sun:new at(.66,.76,1));const m=this.shadowRadius*2/this.sun.shadow.mapSize.x,p=Math.round(n.x/m)*m,y=Math.round(n.z/m)*m;this.sun.target.position.set(p,n.y,y),this.sun.position.set(p+g.x*250,n.y+g.y*250,y+g.z*250),this.sun.target.updateMatrixWorld(),this.hemi.color.copy(o.amb),this.hemi.groundColor.copy(o.amb).multiplyScalar(.45).lerp(new at(3813408),.4),this.hemi.intensity=o.ambI*(1+f*.25),this.exposure=o.exposure,ve.uSunDir.value.set(a.x,a.y,a.z),ve.uSunColor.value.copy(o.sun).multiplyScalar(1-h*.7),ve.uFogColor.value.copy(o.fog),ve.uFogDensity.value=55e-5+e.fog*.0012+e.rain*.0012+f*2e-4,ve.uMist.value=e.fog,ve.uCloudCover.value=.18+e.cloud*.6,ve.uCloudShadow.value=c?.5:.2,ve.uWetness.value=Ce(ve.uWetness.value,e.rain>.3?1:0,.004),this.mesh.position.copy(s)}}const Lr=16,gs={uCamXZ:{value:new mt},uHeightTex:{value:null},uMapHalf:{value:Ue},uMapRes:{value:Cr},uPushers:{value:Array.from({length:Lr},()=>new fe(0,0,0,0))},uWind:{value:new L(1,0,.4)},uGrassDry:{value:new at(12101216)},uGrassGreen:{value:new at(7309884)}};function Nx(i,t){const e=[],n=[],s=[];for(let r=0;r<i.blades;r++){const o=r/i.blades*Math.PI+t.range(-.3,.3),a=t.range(-.18,.18),l=t.range(-.18,.18),c=t.range(.05,.3),h=t.range(.7,1.15),f=Math.cos(o),u=Math.sin(o),d=-u,g=f,v=e.length/3;for(let m=0;m<=i.segments;m++){const p=m/i.segments,y=i.bladeWidth*(1-p*.92),T=p*h,_=c*p*p;for(const R of[-1,1]){if(m===i.segments&&R===1)continue;const S=m===i.segments?0:R*y*.5;e.push(a+f*S+d*_,T,l+u*S+g*_),s.push(p)}}for(let m=0;m<i.segments;m++){const p=v+m*2,y=p+1,T=p+2,_=p+3;m===i.segments-1?n.push(p,y,T):n.push(p,y,T,y,_,T)}}return{pos:e,idx:n,tip:s}}class Rc{mesh;constructor(t,e){const n=new Ne(t.seed),s=Nx(t,n),r=new rd;r.setAttribute("position",new Wt(s.pos,3)),r.setAttribute("normal",new Wt(s.pos.map((p,y)=>y%3===1?1:0),3)),r.setAttribute("aTip",new Wt(s.tip,1)),r.setIndex(s.idx);const o=Math.floor(t.tile/t.spacing),a=o*o,l=new Float32Array(a*2),c=new Float32Array(a*4);let h=0;for(let p=0;p<o;p++)for(let y=0;y<o;y++)l[h*2]=(y+n.range(.1,.9))*t.spacing,l[h*2+1]=(p+n.range(.1,.9))*t.spacing,c[h*4]=n.next(),c[h*4+1]=n.next(),c[h*4+2]=n.next(),c[h*4+3]=n.next(),h++;r.setAttribute("aOffset",new Gi(l,2)),r.setAttribute("aRand",new Gi(c,4)),r.instanceCount=a,gs.uHeightTex.value=e;const f=new Kf({side:Xe}),u=t.tile.toFixed(2),d=t.bladeHeight.toFixed(3),g=t.fadeStart.toFixed(1),v=t.fadeEnd.toFixed(1);f.onBeforeCompile=p=>{Object.assign(p.uniforms,gs),p.vertexShader=`
        attribute vec2 aOffset; attribute vec4 aRand; attribute float aTip;
        uniform vec2 uCamXZ; uniform sampler2D uHeightTex; uniform float uMapHalf; uniform float uMapRes;
        uniform vec4 uPushers[${Lr}]; uniform vec3 uWind; uniform float uTime; uniform vec2 uWindOffset;
        uniform sampler2D uNoiseTex; uniform vec3 uGrassDry; uniform vec3 uGrassGreen;
        varying vec3 vGrassCol; varying float vTip;
      `+p.vertexShader.replace("#include <beginnormal_vertex>",`
          vec2 gBase = aOffset + ${u} * floor((uCamXZ - aOffset) / ${u} + 0.5);
          vec2 gUv = ((gBase + uMapHalf) / (2.0 * uMapHalf)) * ((uMapRes - 1.0) / uMapRes) + 0.5 / uMapRes;
          vec4 gD = texture2D(uHeightTex, gUv);
          float gDens = gD.g;
          float gKeep = step(aRand.w, gDens * 1.08) * step(0.12, gDens);
          float gDist = length(gBase - uCamXZ);
          float gFade = 1.0 - smoothstep(${g}, ${v}, gDist + aRand.z * 6.0);
          float gH = ${d} * (0.55 + 0.8 * aRand.y) * (0.45 + 0.55 * gDens) * gKeep * gFade * (1.0 - gD.b * 0.75);
          float gRot = aRand.x * 6.2831;
          float cr = cos(gRot), sr = sin(gRot);
          vec3 objectNormal = vec3(0.0, 1.0, 0.0);
        `).replace("#include <begin_vertex>",`
          vec3 lp = position;
          lp.xz = vec2(cr * lp.x - sr * lp.z, sr * lp.x + cr * lp.z);
          float t = aTip;
          vec2 wd = uWind.xy;
          float gust = texture2D(uNoiseTex, gBase * 0.012 - uWindOffset * 0.02).r;
          float flutter = sin(uTime * 3.1 + aRand.x * 30.0 + gBase.x * 0.3) * 0.12;
          vec2 bend = wd * uWind.z * (0.25 + 1.1 * gust) + vec2(flutter) * uWind.z;
          float flatten = 0.0;
          for (int i = 0; i < ${Lr}; i++) {
            vec4 pu = uPushers[i];
            if (pu.w <= 0.0) continue;
            vec2 dv = gBase - pu.xy;
            float dd = length(dv);
            float inf = (1.0 - smoothstep(pu.z * 0.45, pu.z, dd)) * pu.w;
            bend += (dv / max(dd, 0.05)) * inf * 1.6;
            flatten = max(flatten, inf);
          }
          float bl = length(bend);
          if (bl > 1.4) bend *= 1.4 / bl;
          float hh = gH * (1.0 - flatten * 0.55);
          vec3 transformed = vec3(lp.x, lp.y * hh, lp.z);
          transformed.xz += bend * t * t * hh;
          transformed.y -= min(length(bend), 1.2) * t * t * hh * 0.4;
          transformed += vec3(gBase.x, gD.r - 0.04, gBase.y);
          vec3 dryCol = mix(uGrassGreen, uGrassDry, clamp(aRand.z * 0.8 + gD.a * -0.4 + 0.25, 0.0, 1.0));
          dryCol = mix(dryCol, vec3(0.16, 0.26, 0.11), gD.b);
          vGrassCol = dryCol * mix(0.3, 1.1, pow(t, 0.8)) * (0.78 + 0.4 * aRand.y);
          vTip = t;
        `),p.fragmentShader=`varying vec3 vGrassCol; varying float vTip;
`+p.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 diffuseColor.rgb = vGrassCol;`).replace("#include <normal_fragment_begin>",`#include <normal_fragment_begin>
 normal = normalize(vNormal);`).replace("#include <lights_fragment_end>",`#include <lights_fragment_end>
          {
            vec3 vd = normalize(vWorldPosW - cameraPosition);
            float back = pow(max(dot(vd, uSunDir), 0.0), 3.0);
            reflectedLight.directDiffuse += uSunColor * vGrassCol * back * vTip * 0.9 * step(0.0, uSunDir.y);
          }`)},f.customProgramCacheKey=()=>"grass"+u+d+g+v,we(f);const m=f.customProgramCacheKey;f.customProgramCacheKey=()=>m()+u+d,this.mesh=new At(r,f),this.mesh.frustumCulled=!1,this.mesh.receiveShadow=!0,this.mesh.castShadow=!1,this.mesh.name="grass"}}class Ux{layers=[];group=new xe;pushers=[];constructor(t,e){const n={tile:64,spacing:e==="high"?.36:e==="medium"?.42:.6,bladeHeight:.95,bladeWidth:.052,blades:e==="low"?3:e==="medium"?4:5,segments:3,fadeStart:24,fadeEnd:31,seed:3},s={tile:200,spacing:e==="high"?.95:1.25,bladeHeight:.95,bladeWidth:.22,blades:3,segments:2,fadeStart:70,fadeEnd:e==="high"?100:88,seed:9};this.layers.push(new Rc(n,t)),e!=="low"&&this.layers.push(new Rc(s,t));for(const r of this.layers)this.group.add(r.mesh)}clearPushers(){this.pushers.length=0}addPusher(t,e,n,s,r,o){const a=Math.hypot(t-r,e-o);a>70||this.pushers.push({x:t,z:e,r:n,s,d:a})}update(t,e){gs.uCamXZ.value.set(t.x,t.z),gs.uWind.value.set(Math.cos(e.dir),Math.sin(e.dir),e.strength*.75),this.pushers.sort((s,r)=>s.d-r.d);const n=gs.uPushers.value;for(let s=0;s<Lr;s++){const r=this.pushers[s];r?n[s].set(r.x,r.z,r.r,r.s):n[s].set(0,0,0,0)}ve.uWindOffset.value.x+=0}}function Uh(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new le;let c=0;for(let h=0;h<i.length;++h){const f=i[h];let u=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in f.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in f.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0;const f=[];for(let u=0;u<i.length;++u){const d=i[u].index;for(let g=0;g<d.count;++g)f.push(d.getX(g)+h);h+=i[u].attributes.position.count}l.setIndex(f)}for(const h in r){const f=Cc(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,f)}for(const h in o){const f=o[h][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<f;++u){const d=[];for(let v=0;v<o[h].length;++v)d.push(o[h][v][u]);const g=Cc(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function Cc(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new Se(o,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const f=l/e;for(let u=0,d=h.count;u<d;u++)for(let g=0;g<e;g++){const v=h.getComponent(u,g);a.setComponent(u+f,g,v)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function Fh(i){i.updateMatrixWorld(!0);const t=new Jt().copy(i.matrixWorld).invert(),e=new Map,n=[],s=o=>{for(let a=o;a&&a!==i;a=a.parent)if(a.userData.dynamic)return!0;return!1};i.traverse(o=>{const a=o;if(!a.isMesh||a.isInstancedMesh||a.isSkinnedMesh||Array.isArray(a.material)||s(a))return;const l=a.material;if(l.transparent)return;let c=a.geometry.clone();if(!c.index){const f=c.getAttribute("position").count;c.setIndex([...Array(f).keys()])}for(const f of Object.keys(c.attributes))["position","normal","uv"].includes(f)||c.deleteAttribute(f);c.getAttribute("uv")||c.setAttribute("uv",new Wt(new Float32Array(c.getAttribute("position").count*2),2)),c.getAttribute("normal")||c.computeVertexNormals(),c.applyMatrix4(new Jt().multiplyMatrices(t,a.matrixWorld));let h=e.get(l);h||e.set(l,h={geos:[],cast:!1,receive:!1}),h.geos.push(c),h.cast||=a.castShadow,h.receive||=a.receiveShadow,n.push(a)});for(const o of n)o.parent?.remove(o);let r=0;for(const[o,a]of e){const l=Uh(a.geos,!1);if(!l)continue;l.computeBoundingSphere();const c=new At(l,o);c.castShadow=a.cast,c.receiveShadow=!0,c.matrixAutoUpdate=!1,c.name="baked",i.add(c),r+=a.geos.length}return{meshesMerged:r,drawCalls:e.size}}const Ir=new Zi(555);function Fx(){const t=document.createElement("canvas");t.width=t.height=1024;const e=t.getContext("2d");e.clearRect(0,0,1024,1024);const n=new Ne(12);e.save(),e.translate(256,500);for(let o=0;o<60;o++){const a=o/60,l=-a*470,c=150*Math.sin(Math.PI*Math.min(1,a*1.1+.05))+20;for(const h of[-1,1])e.strokeStyle=`hsl(${95+n.range(-12,12)}, ${40+n.range(0,20)}%, ${55+n.range(-10,12)}%)`,e.lineWidth=7-a*4,e.beginPath(),e.moveTo(0,l),e.quadraticCurveTo(h*c*.5,l-20,h*c,l-45-a*20),e.stroke()}e.strokeStyle="hsl(80,30%,45%)",e.lineWidth=8,e.beginPath(),e.moveTo(0,0),e.lineTo(0,-480),e.stroke(),e.restore(),e.save(),e.translate(768,505);for(let o=0;o<260;o++){const a=n.range(-1.25,1.25),l=n.range(200,470);e.strokeStyle=`hsl(${88+n.range(-15,15)}, ${35+n.range(0,25)}%, ${48+n.range(-12,16)}%)`,e.lineWidth=n.range(2,5),e.beginPath(),e.moveTo(n.range(-10,10),0),e.quadraticCurveTo(Math.sin(a)*l*.4,-l*.6,Math.sin(a)*l,-Math.cos(a)*l),e.stroke()}e.restore();for(let o=0;o<70;o++){const a=n.range(40,470),l=512+n.range(40,470),c=n.range(28,60),h=n.range(0,Math.PI*2);e.save(),e.translate(a,l),e.rotate(h),e.fillStyle=`hsl(${85+n.range(-18,22)}, ${45+n.range(0,20)}%, ${50+n.range(-12,14)}%)`,e.beginPath(),e.moveTo(0,0),e.arc(0,0,c,-2.3,-.8),e.closePath(),e.fill(),e.restore()}e.save(),e.translate(768,1e3);const s=(o,a,l,c,h)=>{const f=o+Math.sin(l)*c,u=a-Math.cos(l)*c;e.strokeStyle=`hsl(${30+n.range(-10,20)}, 30%, ${30+n.range(-6,12)}%)`,e.lineWidth=Math.max(1.5,h*2.2),e.beginPath(),e.moveTo(o,a),e.lineTo(f,u),e.stroke();for(let d=0;d<4;d++){const g=n.next(),v=o+(f-o)*g,m=a+(u-a)*g;e.beginPath(),e.moveTo(v,m),e.lineTo(v+n.range(-14,14),m+n.range(-14,4)),e.stroke()}e.fillStyle=`hsl(${70+n.range(-15,15)}, 30%, ${35+n.range(0,15)}%)`;for(let d=0;d<3;d++)e.beginPath(),e.ellipse(f+n.range(-8,8),u+n.range(-8,8),7,4,n.next()*3,0,7),e.fill();h>0&&(s(f,u,l+n.range(.2,.7),c*.7,h-1),s(f,u,l-n.range(.2,.7),c*.7,h-1))};for(let o=0;o<5;o++)s(n.range(-60,60),0,n.range(-.8,.8),n.range(130,190),3);e.restore();const r=new Ar(t);return r.colorSpace=Fe,r.anisotropy=4,r.generateMipmaps=!0,r}const Oh=[0,.5,.5,1],ki=[.5,.5,1,1],Ox=[0,0,.5,.5],zx=[.5,0,1,.5];function tl(i,t){const e=i.getAttribute("position").count,n=new Float32Array(e*3);for(let s=0;s<e;s++)n[s*3]=t.r,n[s*3+1]=t.g,n[s*3+2]=t.b;return i.setAttribute("color",new Se(n,3)),i}function cn(i,t,e,n,s=8,r=3,o=new at(7035464)){const a=i.distanceTo(t),l=new Ve(n,e,a,s,r,!0);l.translate(0,a/2,0);const c=new ln().setFromUnitVectors(new L(0,1,0),t.clone().sub(i).normalize());return l.applyQuaternion(c),l.translate(i.x,i.y,i.z),tl(l,o)}function Xi(i,t,e,n,s,r,o){const l=[],c=[],h=[],f=new L().crossVectors(t,new L(0,1,0));f.lengthSq()<1e-4&&f.set(1,0,0),f.normalize();for(let g=0;g<=3;g++){const v=g/3,m=i.clone().addScaledVector(t,e*v);m.y-=s*v*v*e;for(const p of[-1,1]){const y=m.clone().addScaledVector(f,p*n*.5);l.push(y.x,y.y,y.z),c.push(p<0?r[0]:r[2],r[1]+(r[3]-r[1])*v)}}for(let g=0;g<3;g++){const v=g*2;h.push(v,v+1,v+2,v+1,v+3,v+2)}const u=new le;u.setAttribute("position",new Wt(l,3)),u.setAttribute("uv",new Wt(c,2)),u.setIndex(h),u.computeVertexNormals();const d=u.getAttribute("normal");for(let g=0;g<d.count;g++)d.setXYZ(g,d.getX(g)*.4,Math.abs(d.getY(g))*.6+.5,d.getZ(g)*.4);return tl(u,o)}function Cs(i,t,e,n,s,r,o,a,l=.3){const c=[];for(let h=0;h<t;h++){const f=h/t*Math.PI*2+a.range(-.3,.3),u=new L(Math.cos(f),l+a.range(-.15,.3),Math.sin(f)).normalize(),d=o.clone().offsetHSL(a.range(-.02,.02),0,a.range(-.06,.06));c.push(Xi(i,u,e*a.range(.8,1.15),n,s,r,d))}return c}function Bx(i){if(!i.getAttribute("uv")){const t=i.getAttribute("position").count;i.setAttribute("uv",new Wt(new Float32Array(t*2),2))}for(const t of Object.keys(i.attributes))["position","normal","uv","color"].includes(t)||i.deleteAttribute(t);return i}function $e(i){const t=i.map(Bx),e=t.every(n=>n.index)?t:t.map(n=>n.index?n.toNonIndexed():n);return Uh(e,!1)}const Ea=new at(7234640),ti=new at(5194806),kx=new at(8022606),zh=new at(6064714),_r=new at(4155962),Hx=new at(8034898),Gx=new at(9079376);function hr(i,t=1,e=0,n=!0){const s=Math.max(e,i.range(30,46)*t),r=i.range(1.1,1.5)*t,o=[],a=[];for(let h=0;h<(n?5:0);h++){const f=h/5*Math.PI*2+i.range(-.3,.3),u=new L(Math.cos(f)*r*2.6,-.4,Math.sin(f)*r*2.6);o.push(cn(u,new L(Math.cos(f)*r*.3,3.2*t,Math.sin(f)*r*.3),r*.35,r*.5,6,2,ti))}o.push(cn(new L(0,-.5,0),new L(i.range(-.6,.6),s,i.range(-.6,.6)),r,r*.55,10,8,Ea));const l=new L(0,s,0),c=(h,f,u,d,g)=>{const v=h.clone().addScaledVector(f,u);if(o.push(cn(h,v,d,d*.7,6,2,Ea)),g===0){a.push(...Cs(v,9,6.2*t,3.6*t,.5,ki,zh,i,.15)),a.push(...Cs(v,5,4.2*t,3*t,.2,ki,_r,i,.7));return}for(const m of[-1,1]){const p=f.clone().applyAxisAngle(new L(0,1,0),i.range(.9,1.6)).add(new L(m*.45,.2,m*.3)).normalize();c(v,p,u*.72,d*.7,g-1)}};for(let h=0;h<2;h++){const f=h*Math.PI+i.range(-.4,.4);c(l,new L(Math.cos(f)*.7,.75,Math.sin(f)*.7).normalize(),5.5*t,r*.5,2)}return{bark:$e(o),leaf:$e(a),trunkR:r*1.05,height:s}}function Pc(i){const t=i.range(16,26),e=i.range(.45,.7),n=[cn(new L(0,-.4,0),new L(0,t,0),e,e*.3,8,5,ti)],s=[],r=4;for(let o=0;o<r;o++){const a=t*(.66+o*.09),l=5.5-o*1.1;for(let c=0;c<6;c++){const h=c/6*Math.PI*2+o*.5+i.range(-.2,.2),f=new L(Math.cos(h),.25,Math.sin(h)).normalize(),u=new L(0,a,0),d=u.clone().addScaledVector(f,l);n.push(cn(u,d,.18,.06,5,1,ti));for(let g=0;g<3;g++){const v=u.clone().lerp(d,.35+g*.28);s.push(Xi(v,new L(f.x,.9,f.z).normalize(),2.4,2.6,.2,ki,_r.clone().offsetHSL(0,0,i.range(-.04,.04)))),s.push(Xi(v,new L(f.x,-.4,f.z).normalize(),2,2.2,.6,ki,_r))}}}return s.push(...Cs(new L(0,t,0),6,2.2,1.8,.3,ki,_r,i,.5)),{bark:$e(n),leaf:$e(s),trunkR:e+.1,height:t}}function Ro(i,t=1){const e=i.range(.8,2.6)*t,n=i.range(.35,.55)*t,s=[cn(new L(0,-.3,0),new L(i.range(-.2,.2),e,i.range(-.2,.2)),n,n*.85,9,3,kx)],r=Cs(new L(0,e,0),14,2.6*t,1.2*t,.5,Oh,Hx,i,.55);return{bark:$e(s),leaf:$e(r),trunkR:n,height:e+1.5}}function Lc(i){const t=i.range(3.5,7.5),e=[cn(new L(0,-.2,0),new L(i.range(-.5,.5),t,i.range(-.5,.5)),.22,.17,6,3,ti)],n=new L(0,t,0),s=Cs(n,11,3.6,1.4,.75,Oh,zh,i,.45);return{bark:$e(e),leaf:$e(s),trunkR:.25,height:t}}function Ic(i){const t=i.range(9,14),e=[cn(new L(0,-.3,0),new L(0,t*.55,0),.5,.35,8,3,ti)],n=[];for(let s=0;s<5;s++){const r=s/5*Math.PI*2+i.range(-.3,.3),o=new L(0,t*.5,0),a=new L(Math.cos(r)*3.5,t*i.range(.8,1),Math.sin(r)*3.5);e.push(cn(o,a,.25,.1,5,1,ti));for(let l=0;l<5;l++){const c=a.clone().add(new L(i.range(-1.5,1.5),i.range(-1,1.2),i.range(-1.5,1.5))),h=new L(i.range(-1,1),i.range(-.2,.8),i.range(-1,1)).normalize();n.push(Xi(c.clone().addScaledVector(h,-1.5),h,3.2,3.2,.1,Ox,Gx.clone().offsetHSL(i.range(-.03,.03),0,i.range(-.05,.05))))}}return{bark:$e(e),leaf:$e(n),trunkR:.55,height:t}}function Dc(i){const t=[],e=new at(6052410);for(let s=0;s<9;s++){const r=s/9*Math.PI*2+i.range(-.3,.3),o=new L(Math.cos(r)*.5,.8+i.range(-.2,.2),Math.sin(r)*.5).normalize();t.push(Xi(new L(Math.cos(r)*.2,-.1,Math.sin(r)*.2),o,i.range(1.3,1.9),1.6,.25,zx,e.clone().offsetHSL(0,0,i.range(-.05,.05))))}const n=[cn(new L(0,-.2,0),new L(0,.6,0),.08,.05,4,1,ti)];return{bark:$e(n),leaf:$e(t),trunkR:.9,height:1.6}}function Nc(i){const t=[];for(let n=0;n<7;n++){const s=i.range(0,Math.PI*2),r=new L(Math.cos(s)*i.range(0,.6),-.1,Math.sin(s)*i.range(0,.6));t.push(Xi(r,new L(i.range(-.15,.15),1,i.range(-.15,.15)).normalize(),i.range(1.6,2.6),.9,.1,ki,new at(9083480)))}const e=[cn(new L(0,-.2,0),new L(0,.3,0),.03,.02,3,1,ti)];return{bark:$e(e),leaf:$e(t),trunkR:0,height:2.4}}function Bh(i,t=2){const e=new Ya(1,t),n=e.getAttribute("position"),s=i.range(.8,1.6),r=i.range(.45,.9),o=i.range(.8,1.4),a=i.range(0,100);for(let l=0;l<n.count;l++){const c=n.getX(l),h=n.getY(l),f=n.getZ(l),u=1+.28*Ir.noise(c*1.3+a,f*1.3+h)+.12*Ir.noise(c*3.1+a,h*3.1-f),d=Math.max(.6,1-Math.max(0,c*.8+h*.3-.4));n.setXYZ(l,c*u*s*d,Math.max(h*u*r,-.3),f*u*o)}return e.computeVertexNormals(),tl(e,new at(9077368).offsetHSL(0,0,i.range(-.08,.05)))}class Vx{constructor(t,e,n){this.terrain=t,this.colliders=e;const s=Fx();this.barkMat=new be({vertexColors:!0,roughness:.92}),we(this.barkMat,{skin:{scale:.55,bump:1.6,crease:.35}}),this.leafMat=new be({vertexColors:!0,map:s,alphaTest:.42,side:Xe,roughness:.8}),this.leafMat.onBeforeCompile=r=>{r.vertexShader=`uniform float uTime; uniform vec3 uWindVec;
`+r.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        {
          vec3 ip = vec3(0.0);
          #ifdef USE_INSTANCING
            ip = instanceMatrix[3].xyz;
          #endif
          float hh = max(position.y, 0.0);
          float ph = uTime * 1.4 + ip.x * 0.07 + ip.z * 0.05;
          float sw = (sin(ph) * 0.6 + sin(ph * 2.3 + position.x) * 0.25) * uWindVec.z;
          transformed.x += uWindVec.x * sw * 0.012 * hh;
          transformed.z += uWindVec.y * sw * 0.012 * hh;
          transformed.y += sin(uTime * 3.0 + position.x * 2.0 + position.z) * 0.03 * uWindVec.z;
        }`),r.fragmentShader=r.fragmentShader.replace("#include <normal_fragment_begin>",`#include <normal_fragment_begin>
 normal = normalize(vNormal);`)},we(this.leafMat),this.rockMat=new be({vertexColors:!0,roughness:.9}),we(this.rockMat,{rock:!0}),this.build(n);for(const r of this.specials.values())r.group.userData.dynamic=!0;Fh(this.group)}terrain;colliders;group=new xe;barkMat;leafMat;rockMat;specials=new Map;lepiProto=[];shaftSpots=[];instanced(t,e,n,s,r){const a=new Map;e.forEach((d,g)=>{const v=g%t.length,m=`${v}:${Math.floor(d.x/260)}:${Math.floor(d.z/260)}`;let p=a.get(m);p||a.set(m,p={proto:v,list:[]}),p.list.push(d)});const l=new Jt,c=new ln,h=new L,f=new L,u=new at;for(const d of a.values()){const g=t[d.proto],v=d.list;if(!v.length)continue;const m=new Ui(g.bark,this.barkMat,v.length),p=new Ui(g.leaf,this.leafMat,v.length);v.forEach((T,_)=>{const R=this.terrain.height(T.x,T.z);c.setFromAxisAngle(new L(0,1,0),T.rot),h.setScalar(T.s),l.compose(f.set(T.x,R,T.z),c,h),m.setMatrixAt(_,l),p.setMatrixAt(_,l),u.setRGB(1,1,1).offsetHSL(0,0,T.tint),p.setColorAt(_,u),m.setColorAt(_,u),s&&g.trunkR>0&&this.colliders.add({x:T.x,z:T.z,r:g.trunkR*T.s,top:R+g.height*T.s,active:!0,kind:"tree"})}),m.castShadow=n,p.castShadow=n,m.receiveShadow=!0,p.receiveShadow=!0,m.name=r,p.name=r,m.computeBoundingSphere(),p.computeBoundingSphere(),this.group.add(m,p);const y=m.boundingSphere.center.clone();this.chunks.push({meshes:[m,p],center:y,radius:m.boundingSphere.radius,shadow:n,far:g.height>12?1500:g.height>3?700:260})}}chunks=[];updateChunks(t,e){for(const n of this.chunks){const s=Math.max(0,Math.hypot(n.center.x-t.x,n.center.z-t.z)-n.radius),r=s<n.far,o=n.shadow&&s<e;for(const a of n.meshes)a.visible=r,a.castShadow=o}}free(t,e,n){if(Math.abs(t)>Ue-40||Math.abs(e)>Ue-40)return!1;const s=on.nearest(t,e);return!(s.dist<Fn(s.s,t,e)+n||ps.nearest(t,e).dist<26+n*.5||Math.hypot(t-Ot.camp.x,e-Ot.camp.z)<60||Math.hypot(t-Ot.tower.x,e-Ot.tower.z)<28||Math.hypot(t-Ot.startHill.x,e-Ot.startHill.z)<30||Dh(t,e,bn.a,bn.b)<6||Lh.nearest(t,e).dist<11+n*.3||this.terrain.slope(t,e)>.62)}scatter(t,e,n){const s=new Ne(e),r=[];for(let o=-Ue;o<Ue;o+=t)for(let a=-Ue;a<Ue;a+=t){const l=a+s.range(.1,.9)*t,c=o+s.range(.1,.9)*t;n(l,c,s)&&r.push({x:l,z:c,rot:s.range(0,Math.PI*2),s:s.range(.85,1.15),tint:s.range(-.06,.06)})}return r}build(t){const e=this.terrain,n=new Ne(31);this.lepiProto=[hr(n),hr(n),hr(n,1.15)];const s=[Pc(n),Pc(n)],r=[Ro(n),Ro(n,1.2),Ro(n,.8)],o=[Lc(n),Lc(n)],a=[Ic(n),Ic(n)],l=[Dc(n),Dc(n)],c=[Nc(n),Nc(n)],h=this.scatter(24,1,(S,P,x)=>{const b=e.jungleAt(S,P)*(1-e.clearingAt(S,P));return b<.45||!this.free(S,P,10)||ms.nearest(S,P).dist<14?!1:x.next()<b*.85});for(const[S,P]of[[0,0],[22,-18],[-18,-30],[30,12],[-6,26],[44,-40],[12,-58]])h.push({x:Ot.jadeEdge.x+S,z:Ot.jadeEdge.z+P,rot:n.range(0,6),s:1.2,tint:0});this.instanced(this.lepiProto,h,!0,!0,"lepidodendron");for(let S=0;S<6;S++){const P=S*1.1;this.shaftSpots.push(new L(Ot.jadeEdge.x+Math.cos(P)*18,0,Ot.jadeEdge.z-10+Math.sin(P)*18))}this.shaftSpots.push(new L(Ot.jadeGate.x,0,Ot.jadeGate.z+10),new L(Ot.jadeGate.x-20,0,Ot.jadeGate.z-20));for(const S of this.shaftSpots)S.y=e.height(S.x,S.z);const f=this.scatter(34,2,(S,P,x)=>{if(e.jungleAt(S,P)>.3||!this.free(S,P,8)||ms.nearest(S,P).dist<16)return!1;const w=Ir.noise(S/220,P/220);return w>.25&&x.next()<(w-.25)*1.6});this.instanced(s,f,!0,!0,"araucaria");const u=this.scatter(14,3,(S,P,x)=>{const b=e.jungleAt(S,P);if(!this.free(S,P,4))return!1;const w=1-Math.abs(b-.4)*2.4;return x.next()<Math.max(0,w)*.45+(b<.2&&Ir.noise(S/60,P/60)>.55?.12:0)});for(let S=0;S<26;S++){const P=n.range(0,Math.PI*2),x=n.range(2,16);u.push({x:Ot.grove.x+Math.cos(P)*x,z:Ot.grove.z+Math.sin(P)*x,rot:n.range(0,6),s:n.range(1,1.5),tint:n.range(-.04,.04)})}this.instanced(r,u,t!=="low",!0,"cycad");const d=this.scatter(11,4,(S,P,x)=>{const b=e.jungleAt(S,P);return b<.35||!this.free(S,P,4)?!1:x.next()<b*.5});this.instanced(o,d,t==="high",!0,"treefern");const g=this.scatter(60,5,(S,P,x)=>e.jungleAt(S,P)<.25&&this.free(S,P,12)&&ms.nearest(S,P).dist>18&&x.next()<.18);this.instanced(a,g,!0,!0,"broadleaf");const v=this.scatter(26,6,(S,P,x)=>e.jungleAt(S,P)<.3&&this.free(S,P,5)&&x.next()<.06),m=[];for(let S=0;S<34;S++){const P=n.range(0,Math.PI*2),x=Math.sqrt(n.next())*26;m.push({x:Ot.thornThicket.x+Math.cos(P)*x,z:Ot.thornThicket.z+Math.sin(P)*x*.7,rot:n.range(0,6),s:n.range(.9,1.4),tint:0})}this.instanced(l,v,!1,!1,"thornbush"),this.thicketPlacements=m,this.thicketMeshes=[];{const S=l[0],P=new Ui(S.bark,this.barkMat,m.length),x=new Ui(S.leaf,this.leafMat,m.length),b=new Jt;m.forEach((w,D)=>{b.compose(new L(w.x,e.height(w.x,w.z),w.z),new ln().setFromAxisAngle(new L(0,1,0),w.rot),new L().setScalar(w.s)),P.setMatrixAt(D,b),x.setMatrixAt(D,b)}),x.castShadow=!0,this.group.add(P,x),this.thicketMeshes.push(P,x)}const p=this.scatter(7,7,(S,P,x)=>{const b=on.nearest(S,P),w=Fn(b.s,S,P);return b.dist<w-1||b.dist>w+7||Math.hypot(S-Ot.ford.x,P-Ot.ford.z)<30?!1:x.next()<.55});this.instanced(c,p,!1,!1,"reeds");const y=[];for(let S=0;S<5;S++)y.push({bark:Bh(n),leaf:new le,trunkR:0,height:0});const T=this.scatter(30,8,(S,P,x)=>{if(!this.free(S,P,3))return!1;const b=e.slope(S,P);return x.next()<.07+b*.3});for(let S=0;S<90;S++){const P=ps.pointAt(n.range(0,ps.length)),x=n.next()<.5?-1:1,b=P.x+n.range(-8,8),w=P.z+x*n.range(26,36);e.slope(b,w)<.45&&T.push({x:b,z:w,rot:n.range(0,6),s:n.range(1,2.2),tint:0})}const _=new Jt,R=y.map(()=>[]);T.forEach((S,P)=>R[P%y.length].push(S)),y.forEach((S,P)=>{const x=R[P],b=new Ui(S.bark,this.rockMat,x.length);x.forEach((w,D)=>{const U=w.s*n.range(.9,2.6),E=e.height(w.x,w.z)-U*.25;_.compose(new L(w.x,E,w.z),new ln().setFromEuler(new Rn(n.range(-.2,.2),w.rot,n.range(-.2,.2))),new L().setScalar(U)),b.setMatrixAt(D,_),U>1.4&&this.colliders.add({x:w.x,z:w.z,r:U*.9,top:E+U*.6,active:!0,kind:"rock"})}),b.castShadow=!0,b.receiveShadow=!0,b.computeBoundingSphere(),this.group.add(b)}),px.forEach((S,P)=>this.addSpecial("arena"+P,S.x,S.z,1,new Ne(100+P),2)),this.addSpecial("bridge",Ot.bridgeTree.x,Ot.bridgeTree.z,1.15,new Ne(777),99,64);for(let S=0;S<9;S++){const P=n.range(0,Math.PI*2),x=n.range(20,70),b=Ot.clearing.x+Math.cos(P)*x,w=Ot.clearing.z+Math.sin(P)*x*.9;this.addLog(b,w,n.range(0,Math.PI),n)}}thicketPlacements=[];thicketMeshes=[];thicketCut=new Set;cutThicket(t){if(this.thicketCut.has(t))return;this.thicketCut.add(t);const e=new Jt().makeScale(0,0,0);for(const n of this.thicketMeshes)n.setMatrixAt(t,e),n.instanceMatrix.needsUpdate=!0}logs=[];addLog(t,e,n,s){this.logs.push({x:t,z:e,rot:n}),this.lepiProto[0];const r=s.range(16,26),o=cn(new L(0,0,0),new L(r,0,0),1.1,.8,9,5,Ea),a=new At(o,this.barkMat),l=this.terrain.height(t,e)+.6;a.position.set(t,l,e),a.rotation.y=n,a.castShadow=!0,a.receiveShadow=!0,this.group.add(a);for(let c=.1;c<1;c+=.2){const h=t+Math.cos(-n)*r*c,f=e+Math.sin(-n)*r*c;this.colliders.add({x:h,z:f,r:1.1,top:l+1.1,active:!0,kind:"tree"})}}addSpecial(t,e,n,s,r,o,a=0){const l=hr(r,s,a,t!=="bridge"),c=new xe,h=new At(l.bark,this.barkMat),f=new At(l.leaf,this.leafMat);h.castShadow=f.castShadow=!0,h.receiveShadow=f.receiveShadow=!0,c.add(h,f);const u=this.terrain.height(e,n);c.position.set(e,u,n),this.group.add(c);const d=this.colliders.add({x:e,z:n,r:l.trunkR,top:u+l.height,active:!0,kind:"tree",id:t});this.specials.set(t,{id:t,group:c,collider:d,height:l.height,fallen:!1,falling:0,fallDir:0,health:o})}fell(t,e){const n=this.specials.get(t);!n||n.fallen||n.falling>0||(n.falling=.001,n.fallDir=e)}setFallen(t,e){const n=this.specials.get(t);n&&(n.fallDir=e,n.falling=1,this.applyFall(n,1),this.finishFall(n))}applyFall(t,e){const n=Math.min(1,e)*(Math.PI/2-.06),s=new L(Math.sin(t.fallDir),0,-Math.cos(t.fallDir));t.group.quaternion.setFromAxisAngle(s,n)}onFallen=null;finishFall(t){if(t.fallen)return;t.fallen=!0,t.collider.active=!1;const e=t.group.position.y;if(t.id!=="bridge")for(let n=3;n<t.height*.95;n+=2.2){const s=t.group.position.x+Math.cos(t.fallDir)*n,r=t.group.position.z+Math.sin(t.fallDir)*n;this.colliders.add({x:s,z:r,r:1,top:e+1.8,active:!0,kind:"tree",id:t.id+"_log"})}this.onFallen?.(t)}update(t){for(const e of this.specials.values())e.falling>0&&e.falling<1&&(e.falling=Math.min(1,e.falling+t*(.12+e.falling*1.3)),this.applyFall(e,e.falling*e.falling),e.falling>=1&&this.finishFall(e))}bridgeHeight(t,e){const n=this.specials.get("bridge");if(!n||!n.fallen)return null;const s=n.group.position.x,r=n.group.position.z,o=Math.cos(n.fallDir),a=Math.sin(n.fallDir),l=(t-s)*o+(e-r)*a,c=Math.abs(-(t-s)*a+(e-r)*o),h=n.height*.92;if(l<-1||l>h+1||c>2.1)return null;const f=this.terrain.height(s,r)+1.2,u=this.terrain.height(s+o*h,r+a*h)+.4,d=Math.max(0,Math.min(1,l/h));return f+(Math.max(u,f-6)-f)*d}}const Wx=`
attribute float aSpeed;
varying vec3 vWorldPosW;
varying vec2 vUv;
varying float vSpeed;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPosW = wp.xyz;
  vUv = uv;
  vSpeed = aSpeed;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Xx=`
${Ih}
uniform sampler2D uHeightTex;
uniform float uMapHalf, uMapRes;
uniform vec3 uSkyZenith, uSkyHorizon;
uniform float uNight;
varying vec2 vUv;
varying float vSpeed;
void main() {
  vec2 huv = ((vWorldPosW.xz + uMapHalf) / (2.0 * uMapHalf)) * ((uMapRes - 1.0) / uMapRes) + 0.5 / uMapRes;
  float bed = texture2D(uHeightTex, huv).r;
  float depth = max(vWorldPosW.y - bed, 0.0);
  vec3 V = normalize(vWorldPosW - cameraPosition);
  float dist = length(vWorldPosW - cameraPosition);
  // 流れる波紋：川に沿った座標 (vUv.y=流下方向の距離) を流速で流す
  float flowT = uTime * vSpeed;
  vec2 p1 = vec2(vUv.x * 0.9, vUv.y * 0.12 - flowT * 0.12);
  vec2 p2 = vec2(vUv.x * 2.3 + 0.37, vUv.y * 0.31 - flowT * 0.31);
  float e = 0.01;
  float h1 = texture2D(uNoiseTex, p1).r + texture2D(uNoiseTex, p2).g * 0.6;
  float hx = texture2D(uNoiseTex, p1 + vec2(e, 0.0)).r + texture2D(uNoiseTex, p2 + vec2(e, 0.0)).g * 0.6;
  float hz = texture2D(uNoiseTex, p1 + vec2(0.0, e)).r + texture2D(uNoiseTex, p2 + vec2(0.0, e)).g * 0.6;
  float amp = mix(0.18, 0.55, clamp(vSpeed, 0.0, 1.0)) * (1.0 - smoothstep(60.0, 260.0, dist) * 0.7);
  vec3 N = normalize(vec3(-(hx - h1) * amp * 12.0, 1.0, -(hz - h1) * amp * 12.0));
  float fres = 0.03 + 0.97 * pow(1.0 - max(dot(-V, N), 0.0), 5.0);
  vec3 R = reflect(V, N);
  vec3 refl = mix(uSkyHorizon, uSkyZenith, pow(max(R.y, 0.0), 0.5));
  float spec = pow(max(dot(R, uSunDir), 0.0), 240.0) * 6.0 + pow(max(dot(R, uSunDir), 0.0), 24.0) * 0.25;
  refl += uSunColor * spec * step(0.0, uSunDir.y);
  // 水の色：浅いほど川底の色を透かし、深いほど暗い碧に
  vec3 shallow = vec3(0.42, 0.5, 0.38);
  vec3 deep = vec3(0.04, 0.11, 0.11);
  float absorb = 1.0 - exp(-depth * 0.55);
  vec3 body = mix(shallow, deep, absorb) * (0.35 + 0.65 * max(uSunDir.y, 0.15)) * (1.0 - uNight * 0.75);
  // 浮遊物と濁り
  float silt = texture2D(uNoiseTex, vec2(vUv.x * 0.5, vUv.y * 0.05 - flowT * 0.05)).b;
  body = mix(body, vec3(0.35, 0.33, 0.25) * (1.0 - uNight * 0.7), smoothstep(0.55, 0.9, silt) * 0.25);
  vec3 col = mix(body, refl, fres * 0.85);
  // 岸と浅瀬の泡
  float foam = smoothstep(0.35, 0.0, depth) * smoothstep(0.45, 0.75, h1 * 0.6 + texture2D(uNoiseTex, p2 * 3.0).b * 0.5);
  foam += smoothstep(0.9, 1.3, vSpeed) * smoothstep(0.7, 0.85, texture2D(uNoiseTex, p2 * 1.7).r) * 0.35;
  col = mix(col, vec3(0.85, 0.88, 0.86) * (1.0 - uNight * 0.7), clamp(foam, 0.0, 1.0) * 0.7);
  float alpha = clamp(mix(0.25, 0.96, absorb) + fres * 0.4 + foam * 0.4, 0.0, 1.0);
  alpha *= smoothstep(0.0, 0.08, depth);
  col = applyWorldFog(col, vWorldPosW);
  gl_FragColor = vec4(col, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;class qx{mesh;uniforms;constructor(t){on.pts;const e=[],n=[],s=[],r=[],o=8,a=5;let l=0;for(let f=0;f<=on.length;f+=a){const u=on.pointAt(f),d=on.pointAt(Math.min(on.length,f+2)),g=on.pointAt(Math.max(0,f-2));let v=d.x-g.x,m=d.z-g.z;const p=Math.hypot(v,m)||1;v/=p,m/=p;const y=-m,T=v,_=Fn(f,u.x,u.z)+7,R=Pr(f),S=Math.hypot(u.x-Ot.ford.x,u.z-Ot.ford.z),P=.3+.9*Kt(30,90,S);for(let x=0;x<=o;x++){const b=x/o*2-1;e.push(u.x+y*_*b,R,u.z+T*_*b),n.push(b*_*.05+.5,f*.05),s.push(P*(1-Math.abs(b)*.5))}if(l>0){const x=(l-1)*(o+1),b=l*(o+1);for(let w=0;w<o;w++)r.push(x+w,b+w,x+w+1,x+w+1,b+w,b+w+1)}l++}const c=new le;c.setAttribute("position",new Wt(e,3)),c.setAttribute("uv",new Wt(n,2)),c.setAttribute("aSpeed",new Wt(s,1)),c.setIndex(r),c.computeBoundingSphere(),this.uniforms={...ve,uHeightTex:{value:t},uMapHalf:{value:Ue},uMapRes:{value:Cr},uSkyZenith:{value:new at},uSkyHorizon:{value:new at},uNight:{value:0}};const h=new Be({vertexShader:Wx,fragmentShader:Xx,uniforms:this.uniforms,transparent:!0,depthWrite:!1});this.mesh=new At(c,h),this.mesh.renderOrder=2,this.mesh.name="river"}update(t){this.uniforms.uSkyZenith.value.copy(t.uniforms.uZenith.value),this.uniforms.uSkyHorizon.value.copy(t.uniforms.uHorizon.value),this.uniforms.uNight.value=t.uniforms.uNight.value}}const Co=new Zi(808);function Yx(i,t=256){const e=document.createElement("canvas");e.width=e.height=t;const n=e.getContext("2d");n.fillStyle="#5d6b62",n.fillRect(0,0,t,t);for(let o=0;o<400;o++)n.fillStyle=`rgba(${40+Math.random()*60},${50+Math.random()*50},${45+Math.random()*40},0.25)`,n.fillRect(Math.random()*t,Math.random()*t,3+Math.random()*8,2+Math.random()*6);n.strokeStyle="#c9d8b4",n.fillStyle="#c9d8b4",n.lineWidth=9;const s=t/2,r=t/2;if(n.beginPath(),n.arc(s,r,t*.42,0,Math.PI*2),n.stroke(),n.lineWidth=7,n.beginPath(),n.moveTo(t*.18,r+30),n.lineTo(t*.82,r+30),n.stroke(),i===0){n.beginPath(),n.arc(t*.7,r+30,34,Math.PI,0),n.fill();for(let o=0;o<5;o++){const a=Math.PI+(o+.5)*Math.PI/5;n.beginPath(),n.moveTo(t*.7+Math.cos(a)*44,r+30+Math.sin(a)*44),n.lineTo(t*.7+Math.cos(a)*62,r+30+Math.sin(a)*62),n.stroke()}}if(i===1){n.beginPath(),n.arc(s,r-50,30,0,Math.PI*2),n.fill();for(let o=0;o<8;o++){const a=o*Math.PI/4;n.beginPath(),n.moveTo(s+Math.cos(a)*40,r-50+Math.sin(a)*40),n.lineTo(s+Math.cos(a)*56,r-50+Math.sin(a)*56),n.stroke()}}return i===2&&(n.beginPath(),n.arc(t*.3,r+30,34,Math.PI,0),n.fill(),n.beginPath(),n.moveTo(t*.3-50,r+52),n.lineTo(t*.3+50,r+52),n.stroke()),i===3&&(n.beginPath(),n.arc(s,r-40,32,0,Math.PI*2),n.fill(),n.fillStyle="#5d6b62",n.beginPath(),n.arc(s+14,r-48,28,0,Math.PI*2),n.fill()),e}function Zx(){const e=document.createElement("canvas");e.width=1024,e.height=512;const n=e.getContext("2d");n.fillStyle="#6a6458",n.fillRect(0,0,1024,512);for(let r=0;r<1600;r++)n.fillStyle=`rgba(${60+Math.random()*70},${55+Math.random()*60},${45+Math.random()*50},0.2)`,n.fillRect(Math.random()*1024,Math.random()*512,2+Math.random()*14,2+Math.random()*8);n.strokeStyle="#d8cfae",n.fillStyle="#d8cfae",n.lineWidth=6;const s=[[180,170,0],[512,90,1],[844,170,2]];n.beginPath(),n.moveTo(80,210),n.quadraticCurveTo(512,20,944,210),n.setLineDash([12,14]),n.stroke(),n.setLineDash([]);for(const[r,o,a]of s)n.beginPath(),a===1?n.arc(r,o,30,0,Math.PI*2):n.arc(r,o+20,30,Math.PI,0),n.fill(),n.font="bold 34px serif",n.fillText(["壱","弐","参"][a],r-16,o+80);n.lineWidth=5;for(let r=0;r<9;r++){const o=120+r*90;n.beginPath(),n.ellipse(o,360,28,14,0,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(o+24,352),n.quadraticCurveTo(o+44,320,o+50,312),n.stroke()}n.beginPath(),n.moveTo(40,470);for(let r=40;r<=984;r+=36)n.quadraticCurveTo(r+18,420,r+36,470);return n.stroke(),n.beginPath(),n.ellipse(512,486,26,10,0,0,Math.PI*2),n.stroke(),n.beginPath(),n.arc(512,486,5,0,Math.PI*2),n.fill(),e}class Kx{constructor(t,e){this.terrain=t,this.colliders=e,this.stoneMat=new be({color:9209462,roughness:.92}),we(this.stoneMat,{rock:!0}),this.woodMat=new be({color:7163959,roughness:.85}),we(this.woodMat),this.clothMats=[11836018,9398858,10391402,8019787].map(n=>we(new be({color:n,roughness:.95,side:Xe}))),this.copperMat=new be({color:5212794,roughness:.45,metalness:.6,emissive:3134384,emissiveIntensity:0}),we(this.copperMat),this.buildArkeaRing(),this.buildFarGround(),this.buildTower(),this.buildCamp(),this.buildFence(),this.buildNineStones(),this.buildFossilSlab(),this.buildJadeGate(),this.buildRootTunnel(),this.group.add(this.museumGroup);for(const n of this.ringStones)n.mesh.userData.dynamic=!0;this.fenceGap.userData.dynamic=!0,this.lookoutA.userData.dynamic=!0,this.lookoutB.userData.dynamic=!0;for(const n of this.photoFrames)n.userData.dynamic=!0;this.bakeInfo=Fh(this.group)}terrain;colliders;group=new xe;stoneMat;woodMat;clothMats;copperMat;towerCore;towerLight;ringStones=[];towerActive=!0;fenceGap;fire;museumSlots=[];museumGroup=new xe;photoFrames=[];lookoutA;lookoutB;arkeaRing;deviceOnShelf=null;bakeInfo={meshesMerged:0,drawCalls:0};y(t,e){return this.terrain.height(t,e)}buildArkeaRing(){const o=Math.PI*.62,a=Math.PI*1.38,l=[],c=[],h=[],f=new at(7305344),u=new at(10130566),d=new at(12763834);for(let m=0;m<=260;m++){const p=o+(a-o)*(m/260),y=m/260*52,T=Math.pow(Math.abs(Math.sin(y*Math.PI)),.35);for(let _=0;_<=10;_++){const R=_/10,S=6700+R*1400,P=Math.sin(R*Math.PI);let x=P*(330+190*T)+Co.ridged(m*.08,_*.4,3)*70*P;x*=.8+.2*Math.sin(m/260*Math.PI);const b=10800+Math.cos(p)*S,w=-900+Math.sin(p)*S;l.push(b,x-60,w);const D=Math.sin(x*.045)*.5+.5,U=f.clone().lerp(u,D*.5).lerp(d,Math.min(1,x/900)*.6);c.push(U.r,U.g,U.b)}}for(let m=0;m<260;m++)for(let p=0;p<10;p++){const y=m*11+p,T=y+10+1;h.push(y,T,y+1,y+1,T,T+1)}const g=new le;g.setAttribute("position",new Wt(l,3)),g.setAttribute("color",new Wt(c,3)),g.setIndex(h),g.computeVertexNormals();const v=new be({vertexColors:!0,roughness:1});we(v,{noCloud:!1,fogScale:1,haze:.8}),this.arkeaRing=new At(g,v),this.arkeaRing.name="arkea-ring",this.group.add(this.arkeaRing)}buildFarGround(){const t=new Za(1100,11500,64,1);t.rotateX(-Math.PI/2);const e=new be({color:7237704,roughness:1});we(e);const n=new At(t,e);n.position.y=4,this.group.add(n)}buildTower(){const t=new xe,e=Ot.tower,n=this.y(e.x,e.z);t.position.set(e.x,n,e.z);const s=new At(new Ve(15,16.5,1.6,40),this.stoneMat);s.position.y=.2,s.receiveShadow=!0,s.castShadow=!0,t.add(s);const r=new Ne(5);for(let d=0;d<10;d++){const g=d/10*Math.PI*2,v=r.range(2.5,7.5),m=new At(new Ve(.7,.85,v,10),this.stoneMat);m.position.set(Math.cos(g)*13,1+v/2,Math.sin(g)*13),m.rotation.z=r.range(-.06,.06),m.castShadow=m.receiveShadow=!0,t.add(m),this.colliders.add({x:e.x+Math.cos(g)*13,z:e.z+Math.sin(g)*13,r:.9,top:n+1+v,active:!0,kind:"struct"})}const o=new At(new Ve(1.7,2.4,15,14),this.stoneMat);o.position.y=8.5,o.castShadow=!0,t.add(o),this.colliders.add({x:e.x,z:e.z,r:2.6,top:n+16,active:!0,kind:"struct"});for(let d=0;d<3;d++){const g=new At(new Ka(2.3-d*.2,.22,8,32),this.copperMat);g.rotation.x=Math.PI/2,g.position.y=6+d*3.4,t.add(g)}this.towerCore=new At(new ui(.9,20,12),this.copperMat),this.towerCore.position.y=16.6,t.add(this.towerCore),this.towerLight=new sc(6287560,0,40,2),this.towerLight.position.y=16.6,t.add(this.towerLight);const a=[3,0,1];for(let d=0;d<3;d++){const g=-Math.PI/2+(d-1)*.75,v=Math.cos(g)*8,m=Math.sin(g)*8,p=new xe;p.position.set(v,1,m);const y=new At(new Ve(.9,1.1,1,12),this.stoneMat);y.position.y=.5,p.add(y);const T=new xe;T.position.y=1.9;const _=[0,1,2,3].map(x=>{const b=new Ar(Yx(x));b.colorSpace=Fe;const w=new be({map:b,roughness:.9});return we(w),w}),R=[_[1],_[3],this.stoneMat,this.stoneMat,_[0],_[2]],S=new At(new De(1.5,1.5,1.5),R);S.castShadow=!0,T.add(S),p.add(T),p.lookAt(new L(0,1,0).add(new L(v,0,m).multiplyScalar(2))),t.add(p);const P=new L(e.x+v,n+2.5,e.z+m);this.ringStones.push({mesh:T,state:a[d],target:a[d],angle:0,pos:P}),this.colliders.add({x:P.x,z:P.z,r:1.1,top:n+3,active:!0,kind:"struct"})}for(const d of this.ringStones)d.angle=this.faceAngle(d.state),d.mesh.rotation.y=d.angle;const l=new xe,c=new At(new De(9,5,.8),this.stoneMat);c.castShadow=c.receiveShadow=!0,l.add(c);const h=new Ar(Zx());h.colorSpace=Fe;const f=new be({map:h,roughness:.95});we(f);const u=new At(new Hn(8.4,4.2),f);u.position.z=-.41,u.rotation.y=Math.PI,l.add(u),l.position.set(0,3.3,11),t.add(l),this.colliders.add({x:e.x-3,z:e.z+11,r:1.6,top:n+6,active:!0,kind:"struct"}),this.colliders.add({x:e.x+3,z:e.z+11,r:1.6,top:n+6,active:!0,kind:"struct"}),this.colliders.add({x:e.x,z:e.z+11,r:1.6,top:n+6,active:!0,kind:"struct"}),this.muralPos=new L(e.x,n+3,e.z+10),this.group.add(t)}muralPos=new L;faceAngle(t){return[0,-Math.PI/2,Math.PI,Math.PI/2][t]}rotateRing(t){const e=this.ringStones[t];e.state=(e.state+1)%4}ringsSolved(){return this.ringStones[0].state===0&&this.ringStones[1].state===1&&this.ringStones[2].state===2}buildCamp(){const t=Ot.camp,e=new Ne(9),n=(b,w,D,U)=>{const E=new xe,C=new At(new pn(3.2*D,4.2*D,9,2,!0),U);C.position.y=2.1*D,C.castShadow=!0,C.receiveShadow=!0,E.add(C);for(let N=0;N<4;N++){const O=N/4*Math.PI*2+.4,H=new At(new Ve(.07,.1,5*D,5),this.woodMat);H.position.set(Math.cos(O)*1.4*D,2.2*D,Math.sin(O)*1.4*D),H.rotation.set(Math.sin(O)*.55,0,-Math.cos(O)*.55),E.add(H)}E.position.set(b,this.y(b,w),w),E.rotation.y=e.range(0,6),this.group.add(E),this.colliders.add({x:b,z:w,r:2.8*D,top:this.y(b,w)+4,active:!0,kind:"struct"})};n(t.x-14,t.z-8,1,this.clothMats[0]),n(t.x-4,t.z-17,.9,this.clothMats[1]),n(t.x+10,t.z-12,1.1,this.clothMats[2]),n(t.x-18,t.z+9,.85,this.clothMats[3]);const s=t.x,r=t.z,o=this.y(s,r),a=new xe;for(let b=0;b<9;b++){const w=b/9*Math.PI*2,D=new At(Bh(e,1),this.stoneMat);D.scale.setScalar(.35),D.position.set(s+Math.cos(w)*1.1,o+.1,r+Math.sin(w)*1.1),a.add(D)}for(let b=0;b<4;b++){const w=new At(new Ve(.12,.14,1.6,6),this.woodMat);w.position.set(s,o+.25,r),w.rotation.set(Math.PI/2-.3,b/4*Math.PI*2,0),a.add(w)}this.group.add(a);const l=new us({color:16752704,transparent:!0,opacity:.85,blending:xs,depthWrite:!1}),c=[];for(let b=0;b<4;b++){const w=new At(new pn(.35-b*.05,1.2-b*.15,7,1,!0),l);w.position.set(s+(b-1.5)*.12,o+.8,r+(b%2-.5)*.15),this.group.add(w),c.push(w)}const h=new sc(16751178,12,26,1.6);h.position.set(s,o+1.4,r),this.group.add(h),this.fire={light:h,flames:c,base:new L(s,o,r)},this.colliders.add({x:s,z:r,r:1.3,top:o+1,active:!0,kind:"struct"});const f=new xe,u=new At(new De(3.6,.3,1.8),this.woodMat);u.position.y=1.1,f.add(u);for(const[b,w]of[[-1.2,-1],[1.2,-1],[-1.2,1],[1.2,1]]){const D=new At(new Ve(.6,.6,.18,12),this.woodMat);D.rotation.x=Math.PI/2,D.position.set(b,.6,w),f.add(D)}const d=new At(new De(1.1,.9,1.1),this.woodMat);d.position.set(.6,1.7,0),f.add(d),f.position.set(t.x+16,this.y(t.x+16,t.z+6),t.z+6),f.rotation.y=.7,f.traverse(b=>{b.isMesh&&(b.castShadow=!0,b.receiveShadow=!0)}),this.group.add(f),this.colliders.add({x:t.x+16,z:t.z+6,r:2.2,top:this.y(t.x+16,t.z+6)+2,active:!0,kind:"struct"});const g=new At(new De(2.2,.12,1.1),this.woodMat),v=t.x+7,m=t.z+8;g.position.set(v,this.y(v,m)+.95,m),g.castShadow=!0,this.group.add(g);for(const[b,w]of[[-1,-.45],[1,-.45],[-1,.45],[1,.45]]){const D=new At(new De(.1,.95,.1),this.woodMat);D.position.set(v+b,this.y(v,m)+.47,m+w),this.group.add(D)}const p=new At(new De(.6,.08,.45),this.clothMats[1]);p.position.set(v-.3,this.y(v,m)+1.05,m),this.group.add(p),this.deskPos=new L(v,this.y(v,m)+1,m),this.colliders.add({x:v,z:m,r:1.1,top:this.y(v,m)+1,active:!0,kind:"struct"});const y=t.x-6,T=t.z+14,_=this.y(y,T),R=new xe;for(let b=0;b<4;b++){const w=new At(new De(4.2,.1,.9),this.woodMat);w.position.y=.3+b*.85,R.add(w)}for(const b of[-2.05,2.05]){const w=new At(new De(.1,2.9,.9),this.woodMat);w.position.set(b,1.45,0),R.add(w)}R.position.set(y,_,T),R.rotation.y=Math.PI,R.traverse(b=>{b.isMesh&&(b.castShadow=!0,b.receiveShadow=!0)}),this.group.add(R);for(let b=0;b<3;b++)for(let w=0;w<3;w++)this.museumSlots.push(new L(y+(w-1)*1.3,_+.42+b*.85,T));this.shelfPos=new L(y,_+1.2,T-.6),this.colliders.add({x:y,z:T,r:2.1,top:_+3,active:!0,kind:"struct"});const S=new At(new De(4.4,2.2,.12),this.woodMat),P=t.x+12,x=t.z+16;S.position.set(P,this.y(P,x)+1.8,x),S.rotation.y=Math.PI+.4,this.group.add(S);for(let b=0;b<3;b++){const w=new At(new Hn(1.2,.8),new us({color:3813926}));w.position.set((b-1)*1.4,0,-.07),w.rotation.y=Math.PI,S.add(w),this.photoFrames.push(w)}this.boardPos=new L(P,this.y(P,x)+1.5,x),this.colliders.add({x:P,z:x,r:1.8,top:this.y(P,x)+3,active:!0,kind:"struct"}),this.lookoutA=this.lookout(Ot.campView.x+4,Ot.campView.z-14,!1),this.lookoutB=this.lookout(-120,128,!1)}deskPos=new L;shelfPos=new L;boardPos=new L;lookout(t,e,n){const s=new xe;s.position.set(t,this.y(t,e),e);const r=new xe;for(let c=0;c<4;c++){const h=new At(new Ve(.06,.08,.8,5),this.woodMat);h.position.set(c%2*2.4-1.2,.4,Math.floor(c/2)*2.4-1.2),r.add(h)}r.name="stakes",s.add(r);const o=new xe;o.name="tower";for(let c=0;c<4;c++){const h=new At(new Ve(.12,.16,7,6),this.woodMat);h.position.set(c%2*2.4-1.2,3.5,Math.floor(c/2)*2.4-1.2),o.add(h)}const a=new At(new De(3.2,.2,3.2),this.woodMat);a.position.y=7,o.add(a);const l=new At(new pn(2.6,1.6,4),this.clothMats[0]);return l.position.y=9.4,l.rotation.y=Math.PI/4,o.add(l),o.traverse(c=>{c.isMesh&&(c.castShadow=!0)}),o.visible=n,s.add(o),this.group.add(s),s}buildLookout(t){const e=t==="A"?this.lookoutA:this.lookoutB;e.getObjectByName("tower").visible=!0,e.getObjectByName("stakes").visible=!1,this.colliders.add({x:e.position.x,z:e.position.z,r:1.9,top:e.position.y+7,active:!0,kind:"struct"})}buildFence(){const t=bn.a,e=bn.b,n=Math.hypot(e.x-t.x,e.z-t.z),s=Math.floor(n/3),r=new xe,o=new xe;for(let a=0;a<=s;a++){const l=a/s,c=t.x+(e.x-t.x)*l,h=t.z+(e.z-t.z)*l,f=Math.hypot(c-bn.gap.x,h-bn.gap.z)<4,u=new At(new Ve(.12,.15,2.2,5),this.woodMat);if(u.position.set(c,this.y(c,h)+1,h),u.rotation.z=Math.sin(a*7.1)*.06,u.castShadow=!0,(f?o:r).add(u),a<s){const d=(a+1)/s,g=t.x+(e.x-t.x)*d,v=t.z+(e.z-t.z)*d,m=Math.hypot((c+g)/2-bn.gap.x,(h+v)/2-bn.gap.z)<4;for(const p of[.6,1.4]){const y=new At(new Ve(.06,.06,3.1,4),this.woodMat);y.position.set((c+g)/2,(this.y(c,h)+this.y(g,v))/2+p,(h+v)/2),y.rotation.set(0,-Math.atan2(v-h,g-c),Math.PI/2),(m?o:r).add(y)}this.colliders.add({x:(c+g)/2,z:(h+v)/2,r:1.2,top:this.y(c,h)+2.2,active:!0,kind:"struct",id:m?"fenceGap":"fence"})}}this.group.add(r,o),this.fenceGap=o}openFenceGap(){this.fenceGap.children.forEach((t,e)=>{t.position.y-this.y(t.position.x,t.position.z)<1&&e%3!==0&&(t.visible=!1)});for(const t of this.colliders.all)t.id==="fenceGap"&&(t.active=!1);this.fenceGapOpen=!0}fenceGapOpen=!1;buildNineStones(){const t=new Ne(99),e=Ot.nineStones;for(let n=0;n<9;n++){const s=-.9+n*.22,r=e.x+Math.cos(s)*30,o=e.z+Math.sin(s)*30,a=3.5+Math.sin(n*1.3)*1.2+t.range(0,1),l=new De(1.4,a,.9,2,4,2),c=l.getAttribute("position");for(let f=0;f<c.count;f++)c.setXYZ(f,c.getX(f)*(1+Co.noise(c.getY(f),n)*.12),c.getY(f),c.getZ(f)*(1+Co.noise(c.getX(f)+n,c.getY(f))*.15));l.computeVertexNormals();const h=new At(l,this.stoneMat);h.position.set(r,this.y(r,o)+a/2-.3,o),h.rotation.set(t.range(-.08,.08),s+Math.PI/2,t.range(-.08,.08)),h.castShadow=h.receiveShadow=!0,this.group.add(h),this.colliders.add({x:r,z:o,r:.9,top:this.y(r,o)+a,active:!0,kind:"struct"})}}buildFossilSlab(){const t=Ot.fossilSlab,e=new At(new De(5,.6,3.4),this.stoneMat);e.position.set(t.x,this.y(t.x,t.z)+.1,t.z),e.rotation.set(.05,.4,-.04),e.receiveShadow=!0,this.group.add(e);const n=new be({color:4867130,roughness:1});we(n);for(let s=0;s<3;s++){const r=new At(new Es(.55,14),n);r.rotation.x=-Math.PI/2,r.position.set(-1.5+s*1.5,.31,s%2*.9-.45),e.add(r)}this.fossilPos=new L(t.x,this.y(t.x,t.z)+.5,t.z)}fossilPos=new L;rootArch(t,e,n,s,r,o,a){const l=new xe,c=new be({color:5917242,roughness:.9});we(c,{skin:{scale:.8,bump:1.2,crease:.25}});for(let h=0;h<r;h++){const f=[],u=a.range(-3,3),d=(h-r/2)*1.6;for(let v=0;v<=10;v++){const m=v/10;f.push(new L((m-.5)*n+u,Math.sin(m*Math.PI)*s*a.range(.85,1.1),d+Math.sin(m*6+h)*.8))}const g=new At(new Ja(new lh(f),24,a.range(.6,1.3),7),c);g.castShadow=g.receiveShadow=!0,l.add(g)}l.position.set(t,this.y(t,e)-.5,e),l.rotation.y=o,this.group.add(l);for(const h of[-1,1]){const f=t+Math.cos(o)*h*n*.5,u=e-Math.sin(o)*h*n*.5;this.colliders.add({x:f,z:u,r:2.5,top:this.y(f,u)+6,active:!0,kind:"struct"})}return l}buildJadeGate(){this.rootArch(Ot.jadeGate.x,Ot.jadeGate.z,26,22,6,.3,new Ne(3))}buildRootTunnel(){const t=this.rootArch(Ot.rootTunnel.x,Ot.rootTunnel.z,12,8,7,.6,new Ne(4)),e=new At(new Es(5.5,20,0,Math.PI),new us({color:329221}));e.position.set(0,.2,-1),t.add(e),this.tunnelPos=new L(Ot.rootTunnel.x,this.y(Ot.rootTunnel.x,Ot.rootTunnel.z)+1,Ot.rootTunnel.z)}tunnelPos=new L;setTowerActive(t){this.towerActive=t}update(t,e,n){for(const o of this.ringStones){let l=this.faceAngle(o.state)-o.angle;for(;l>Math.PI;)l-=Math.PI*2;for(;l<-Math.PI;)l+=Math.PI*2;o.angle+=l*Math.min(1,t*4),o.mesh.rotation.y=o.angle}const s=this.towerActive?(.5+.5*Math.sin(e*2.2))*(.4+n):0;this.copperMat.emissiveIntensity=this.towerActive?.2+s*1.6:.02,this.towerLight.intensity=this.towerActive?s*20:0;const r=this.fire;r.light.intensity=10+Math.sin(e*13)*1.5+Math.sin(e*7.3)*2,r.flames.forEach((o,a)=>{o.scale.y=.8+.3*Math.sin(e*(9+a*2)+a),o.rotation.y=e*(1+a*.3)})}}const Jx={round:0,tri:1,cera:2,small:3,human:4,pad:5},Ta=6;function $x(){const t=document.createElement("canvas");t.width=128*Ta,t.height=128;const e=t.getContext("2d"),n=(h,f,u,d,g=0,v=1)=>{const m=e.createRadialGradient(0,0,0,0,0,1);m.addColorStop(0,`rgba(30,22,14,${.9*v})`),m.addColorStop(.7,`rgba(45,35,22,${.75*v})`),m.addColorStop(.92,`rgba(150,130,100,${.35*v})`),m.addColorStop(1,"rgba(150,130,100,0)"),e.save(),e.translate(h,f),e.rotate(g),e.scale(u,d),e.fillStyle=m,e.beginPath(),e.arc(0,0,1,0,Math.PI*2),e.fill(),e.restore()};n(64,64,52,46);for(let h=0;h<4;h++)n(30+h*22,20,9,7,0,.8);const s=128;n(s+64,84,14,16),n(s+64,40,7,30),n(s+38,54,6,24,-.5),n(s+90,54,6,24,.5);const r=256;n(r+64,76,40,30);for(let h=0;h<4;h++)n(r+26+h*25,34,10,13,(h-1.5)*.25,.9);const o=384;n(o+64,70,18,20);for(let h=0;h<5;h++)n(o+36+h*14,36,5,8,(h-2)*.3,.8);const a=512;n(a+64,44,17,26),n(a+64,92,14,18);const l=640;n(l+64,66,30,32);for(let h=0;h<3;h++)n(l+38+h*26,30,9,9,0,.9);const c=new Ar(t);return c.colorSpace=Fe,c}class Uc{constructor(t,e=2400){this.terrain=t,this.max=e;const n=new Hn(1,1);n.rotateX(-Math.PI/2),this.aTime=new Gi(new Float32Array(e).fill(-1e3),1),this.aKind=new Gi(new Float32Array(e),1),n.setAttribute("aTime",this.aTime),n.setAttribute("aKind",this.aKind);const s=new be({map:$x(),transparent:!0,depthWrite:!1,roughness:1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});s.onBeforeCompile=o=>{Object.assign(o.uniforms,this.uniforms),o.vertexShader=`attribute float aTime; attribute float aKind; uniform float uGameTime; uniform float uLife; varying float vFade;
`+o.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
          vMapUv = vMapUv * vec2(${(1/Ta).toFixed(5)}, 1.0) + vec2(aKind * ${(1/Ta).toFixed(5)}, 0.0);
          float age = uGameTime - aTime;
          vFade = clamp(1.0 - age / uLife, 0.0, 1.0) * step(0.0, age);
          vFade = vFade * vFade;`),o.fragmentShader=`varying float vFade; uniform float uHighlight;
`+o.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
          diffuseColor.a *= vFade * (0.85 + uHighlight * 0.3);`)},we(s),this.mesh=new Ui(n,s,e),this.mesh.frustumCulled=!1,this.mesh.receiveShadow=!0,this.mesh.renderOrder=1,this.recs=new Array(e).fill(null);const r=new Jt().makeScale(0,0,0);for(let o=0;o<e;o++)this.mesh.setMatrixAt(o,r)}terrain;max;mesh;recs;next=0;aTime;aKind;m4=new Jt;q=new ln;up=new L(0,1,0);nrm=new L;uniforms={uGameTime:{value:0},uLife:{value:14},uHighlight:{value:0}};add(t){const e=this.next;this.next=(this.next+1)%this.max;const n=this.terrain.height(t.x,t.z)+.03;this.terrain.normal(t.x,t.z,this.nrm),this.q.setFromUnitVectors(this.up,this.nrm);const s=new ln().setFromAxisAngle(this.up,-t.heading+Math.PI/2);this.q.multiply(s);const r=t.kind==="tri"?1.2:1;this.m4.compose(new L(t.x,n,t.z),this.q,new L(t.size,1,t.size*r)),this.mesh.setMatrixAt(e,this.m4),this.mesh.instanceMatrix.needsUpdate=!0,this.aTime.array[e]=t.time,this.aKind.array[e]=Jx[t.kind],this.aTime.needsUpdate=!0,this.aKind.needsUpdate=!0,this.recs[e]=t}near(t,e,n,s){const r=[];for(const o of this.recs)o&&(s-o.time>this.uniforms.uLife.value||Math.abs(o.x-t)>n||Math.abs(o.z-e)>n||Math.hypot(o.x-t,o.z-e)<=n&&r.push(o));return r}update(t){this.uniforms.uGameTime.value=t}}const Qx=`
attribute vec4 aData; // x=開始時刻 y=寿命 z=大きさ w=種類(0土煙 1水 2火の粉 3葉)
attribute vec3 aVel;
uniform float uNow; uniform float uScale;
varying float vT; varying float vKind;
void main() {
  float t = (uNow - aData.x) / aData.y;
  vT = t; vKind = aData.w;
  vec3 p = position + aVel * (uNow - aData.x);
  float drag = aData.w < 0.5 ? 0.0 : 1.0;
  p.y -= drag * 4.9 * pow(uNow - aData.x, 2.0) * (aData.w > 2.5 ? 0.05 : 1.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float alive = step(0.0, t) * step(t, 1.0);
  float grow = aData.w < 0.5 ? (0.4 + t * 1.6) : 1.0;
  gl_PointSize = alive * aData.z * grow * uScale / max(-mv.z, 0.5);
}`,jx=`
uniform vec3 uDust; uniform vec3 uLight;
varying float vT; varying float vKind;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.0, d);
  vec3 col = uDust * uLight;
  float a = soft * (1.0 - vT) * 0.45;
  if (vKind > 0.5 && vKind < 1.5) { col = vec3(0.8, 0.86, 0.88) * uLight; a = soft * (1.0 - vT) * 0.6; }
  if (vKind > 1.5 && vKind < 2.5) { col = vec3(1.0, 0.6, 0.2) * 2.0; a = soft * (1.0 - vT); }
  if (vKind > 2.5) { col = vec3(0.3, 0.42, 0.2) * uLight; a = step(d, 0.35) * (1.0 - vT); }
  gl_FragColor = vec4(col, a);
}`;class tv{constructor(t=3e3){this.max=t,this.geo=new le,this.pos=new Float32Array(t*3),this.data=new Float32Array(t*4).fill(-100),this.vel=new Float32Array(t*3),this.geo.setAttribute("position",new Se(this.pos,3)),this.geo.setAttribute("aData",new Se(this.data,4)),this.geo.setAttribute("aVel",new Se(this.vel,3));const e=new Be({vertexShader:Qx,fragmentShader:jx,uniforms:this.uniforms,transparent:!0,depthWrite:!1});this.points=new sh(this.geo,e),this.points.frustumCulled=!1,this.points.renderOrder=3}max;points;n=0;pos;data;vel;geo;uniforms={uNow:{value:0},uScale:{value:300},uDust:{value:new at(10127978)},uLight:{value:new at(1,1,1)}};r=new Ne(3);emit(t,e,n,s,r,o,a,l,c=1.5){const h=this.uniforms.uNow.value;for(let f=0;f<s;f++){const u=this.n;this.n=(this.n+1)%this.max,this.pos[u*3]=t+this.r.range(-o,o),this.pos[u*3+1]=e+this.r.range(0,o*.3),this.pos[u*3+2]=n+this.r.range(-o,o),this.vel[u*3]=this.r.range(-1,1)*o*.6,this.vel[u*3+1]=this.r.range(.2,1)*c,this.vel[u*3+2]=this.r.range(-1,1)*o*.6,this.data[u*4]=h+this.r.range(0,.15),this.data[u*4+1]=l*this.r.range(.7,1.3),this.data[u*4+2]=a*this.r.range(.7,1.3),this.data[u*4+3]=r}this.geo.getAttribute("position").needsUpdate=!0,this.geo.getAttribute("aData").needsUpdate=!0,this.geo.getAttribute("aVel").needsUpdate=!0}update(t,e){this.uniforms.uNow.value=t,this.uniforms.uLight.value.copy(e)}}class ev{group=new xe;mat;constructor(t){this.mat=new Be({uniforms:{uTime:ve.uTime,uIntensity:{value:0},uColor:{value:new at(1,.95,.8)},uNoise:{value:ve.uNoiseTex.value}},vertexShader:"varying vec2 vUv; varying vec3 vWp; void main(){ vUv = uv; vec4 wp = modelMatrix * vec4(position,1.0); vWp = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }",fragmentShader:`uniform float uTime, uIntensity; uniform vec3 uColor; uniform sampler2D uNoise; varying vec2 vUv; varying vec3 vWp;
        void main(){
          float edge = sin(vUv.x * 3.14159);
          float streak = texture2D(uNoise, vec2(vUv.x * 2.0 + uTime * 0.01, vUv.y * 0.2)).r;
          float dust = texture2D(uNoise, vec2(vUv.x * 6.0, vUv.y * 3.0 - uTime * 0.03)).g;
          float a = pow(edge, 2.0) * smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.6, vUv.y) * (0.45 + 0.55 * streak) * (0.8 + 0.4 * dust);
          float camD = length(vWp - cameraPosition);
          a *= smoothstep(4.0, 16.0, camD) * (1.0 - smoothstep(70.0, 140.0, camD));
          gl_FragColor = vec4(uColor * a * uIntensity, 1.0);
          #include <colorspace_fragment>
        }`,transparent:!0,depthWrite:!1,blending:xs,side:Xe});const e=new Ne(21);for(const n of t){const s=e.range(28,44),r=new Ve(e.range(1.6,2.6),e.range(.6,1.1),s,16,1,!0);r.translate(0,s/2,0);const o=new At(r,this.mat);o.position.copy(n),o.renderOrder=4,this.group.add(o)}}update(t,e,n){const s=Math.max(.1,Math.min(1,t.y));for(const o of this.group.children)o.rotation.set(0,0,0),o.lookAt(o.position.clone().add(new L(t.x,0,t.z))),o.rotateX(-(1-s)*.6);const r=Math.max(0,Math.min(1,(t.y-.05)*4));this.mat.uniforms.uIntensity.value=r*(.05+e*.16),this.mat.uniforms.uColor.value.copy(n)}}class nv{constructor(t,e=700){this.terrain=t;const n=new Ne(88),s=new Float32Array(e*3),r=new Float32Array(e);for(let l=0;l<e;l++)s[l*3]=n.range(0,120),s[l*3+1]=n.range(.4,3.5),s[l*3+2]=n.range(0,120),r[l]=n.next();const o=new le;o.setAttribute("position",new Se(s,3)),o.setAttribute("aSeed",new Se(r,1));const a=new Be({uniforms:this.uniforms,vertexShader:`attribute float aSeed; uniform float uTime; uniform vec3 uCam; uniform float uNight; varying float vA;
        uniform sampler2D uHeight;
        void main(){
          vec3 p = position;
          p.xz = p.xz + 120.0 * floor((uCam.xz - p.xz) / 120.0 + 0.5);
          p.x += sin(uTime * 0.4 + aSeed * 40.0) * 1.5; p.z += cos(uTime * 0.33 + aSeed * 30.0) * 1.5;
          p.y += sin(uTime * 0.7 + aSeed * 10.0) * 0.5;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float blink = pow(0.5 + 0.5 * sin(uTime * (0.9 + aSeed * 1.5) + aSeed * 60.0), 3.0);
          vA = blink * uNight;
          gl_PointSize = (70.0 / max(-mv.z, 1.0)) * (0.6 + aSeed);
        }`,fragmentShader:"varying float vA; void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(vec3(0.55, 1.0, 0.45) * 3.0 * pow(smoothstep(0.5, 0.0, d), 1.5) * vA, 1.0); }",transparent:!0,depthWrite:!1,blending:xs});this.points=new sh(o,a),this.points.frustumCulled=!1}terrain;points;uniforms={uTime:ve.uTime,uNight:{value:0},uCam:{value:new L}};update(t,e){this.uniforms.uCam.value.copy(t),this.uniforms.uNight.value=e,this.points.position.y=this.terrain.height(t.x,t.z)-.2,this.points.visible=e>.01}}class iv{lines;uniforms={uTime:ve.uTime,uCam:{value:new L},uAmount:{value:0},uLight:{value:new at}};constructor(t=5e3){const e=new Ne(4),n=new Float32Array(t*6);for(let o=0;o<t;o++){const a=e.range(0,60),l=e.range(0,30),c=e.range(0,60);n.set([a,l,c,a+.05,l+.7,c+.02],o*6)}const s=new le;s.setAttribute("position",new Se(n,3));const r=new Be({uniforms:this.uniforms,vertexShader:`uniform float uTime; uniform vec3 uCam; uniform float uAmount; varying float vA;
        void main(){
          vec3 p = position;
          p.y = mod(p.y - uTime * 16.0, 30.0) + uCam.y - 12.0;
          p.xz = p.xz + 60.0 * floor((uCam.xz - p.xz) / 60.0 + 0.5);
          vA = step(fract(position.x * 7.13 + position.z * 3.7), uAmount);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,fragmentShader:"uniform vec3 uLight; varying float vA; void main(){ if (vA < 0.5) discard; gl_FragColor = vec4(uLight * 0.7, 0.35); }",transparent:!0,depthWrite:!1});this.lines=new hf(s,r),this.lines.frustumCulled=!1}update(t,e,n){this.uniforms.uCam.value.copy(t),this.uniforms.uAmount.value=e,this.uniforms.uLight.value.copy(n),this.lines.visible=e>.02}}class sv{group=new xe;mat;constructor(t,e){this.mat=new Be({uniforms:{uTime:ve.uTime,uMist:{value:0},uColor:{value:new at},uNoise:{value:ve.uNoiseTex.value}},vertexShader:"varying vec2 vUv; varying vec3 vWp; void main(){ vUv = uv; vec4 wp = modelMatrix * vec4(position,1.0); vWp = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }",fragmentShader:`uniform float uTime, uMist; uniform vec3 uColor; uniform sampler2D uNoise; varying vec2 vUv; varying vec3 vWp;
        void main(){
          float n = texture2D(uNoise, vWp.xz * 0.004 + vec2(uTime * 0.004, 0.0)).r * 0.6 + texture2D(uNoise, vWp.xz * 0.011 - vec2(0.0, uTime * 0.006)).g * 0.4;
          float edge = smoothstep(0.5, 0.2, length(vUv - 0.5));
          float camD = length(vWp - cameraPosition);
          float a = smoothstep(0.35, 0.8, n) * edge * uMist * 0.55 * smoothstep(8.0, 40.0, camD);
          gl_FragColor = vec4(uColor, a);
          #include <colorspace_fragment>
        }`,transparent:!0,depthWrite:!1});for(const n of e)for(let s=0;s<3;s++){const r=new Hn(n.r*2,n.r*2);r.rotateX(-Math.PI/2);const o=new At(r,this.mat);o.position.set(n.x,t.height(n.x,n.z)+1.5+s*2.2,n.z),o.renderOrder=5,this.group.add(o)}}update(t,e){this.mat.uniforms.uMist.value=t,this.mat.uniforms.uColor.value.copy(e),this.group.visible=t>.02}}const rv={low:{shadow:1024,shadowRadius:55,pixelRatioCap:1,fireflies:700,rain:2500},medium:{shadow:2048,shadowRadius:75,pixelRatioCap:1,fireflies:1400,rain:4e3},high:{shadow:3072,shadowRadius:95,pixelRatioCap:1.5,fireflies:2e3,rain:6e3}};function Iv(i){const t=new ox({antialias:!0,powerPreference:"high-performance",stencil:!1});return t.outputColorSpace=Fe,t.toneMapping=Ca,t.toneMappingExposure=1,t.shadowMap.enabled=!0,t.shadowMap.type=Fc,t.setClearColor(0),i.appendChild(t.domElement),t.domElement.style.display="block",t}class Dv{constructor(t,e){this.quality=t;const n=rv[t];e?.("大地を形づくっています"),this.terrain=new bx,this.scene.add(this.terrain.build()),e?.("空と光を用意しています"),this.sky=new Dx(this.scene,n.shadow),this.sky.setShadowRadius(n.shadowRadius),e?.("草海を広げています"),this.grass=new Ux(this.terrain.dataTex,t),this.scene.add(this.grass.group),e?.("樹海を育てています"),this.flora=new Vx(this.terrain,this.colliders,t),this.scene.add(this.flora.group),this.river=new qx(this.terrain.dataTex),this.scene.add(this.river.mesh),e?.("古い石を並べています"),this.landmarks=new Kx(this.terrain,this.colliders),this.scene.add(this.landmarks.group),this.footprints=new Uc(this.terrain),this.scene.add(this.footprints.mesh),this.staticPrints=new Uc(this.terrain,300),this.staticPrints.uniforms.uLife.value=1e6,this.scene.add(this.staticPrints.mesh),this.particles=new tv,this.scene.add(this.particles.points),this.shafts=new ev(this.flora.shaftSpots),this.scene.add(this.shafts.group),this.fireflies=new nv(this.terrain,n.fireflies),this.scene.add(this.fireflies.points),this.rain=new iv(n.rain),this.scene.add(this.rain.lines),this.mist=new sv(this.terrain,[{x:-470,z:150,r:170},{x:-380,z:-80,r:150},{x:-520,z:-300,r:160},{x:-250,z:320,r:140},{x:60,z:180,r:130},{x:360,z:60,r:120},{x:-40,z:-200,r:130}]),this.scene.add(this.mist.group)}quality;scene=new Xu;terrain;colliders=new wx;sky;grass;flora;river;landmarks;footprints;staticPrints;particles;shafts;fireflies;rain;mist;clock=new Tx;weather={kind:"fog",fog:0,cloud:0,rain:0};wind={dir:0,strength:.4};time=0;resonance=.5;update(t,e,n,s=!0){this.time+=t,s&&this.clock.advance(t);const r=this.clock.weatherAt(this.clock.total);this.weather=r,this.wind=this.clock.wind(),ve.uTime.value=this.time,ve.uWindOffset.value.x+=Math.cos(this.wind.dir)*this.wind.strength*t*6,ve.uWindOffset.value.y+=Math.sin(this.wind.dir)*this.wind.strength*t*6,ve.uWindVec.value.set(Math.cos(this.wind.dir),Math.sin(this.wind.dir),this.wind.strength);const o=n.position;this.sky.update(this.clock.hour,r,e,o,this.time),this.grass.update(o,this.wind),this.flora.update(t),this.flora.updateChunks(o,this.sky.shadowRadius*1.6),this.river.update(this.sky),this.landmarks.update(t,this.time,this.resonance),this.footprints.update(this.clock.total),this.staticPrints.update(this.clock.total);const a=new at().copy(this.sky.hemi.color).multiplyScalar(.6+this.sky.hemi.intensity*.6);this.particles.update(this.time,a),this.shafts.update(ve.uSunDir.value,Math.max(r.fog,.35),ve.uSunColor.value),this.fireflies.update(o,this.sky.uniforms.uNight.value),this.rain.update(o,r.rain,a),this.mist.update(r.fog,ve.uFogColor.value)}}const Po=new Zi(4321);function ov(i,t){const e=[],n=o=>i[Math.max(0,Math.min(i.length-1,o))],s=(o,a,l,c,h)=>.5*(2*a+(-o+l)*h+(2*o-5*a+4*l-c)*h*h+(-o+3*a-3*l+c)*h*h*h);for(let o=0;o<i.length-1;o++)for(let a=0;a<t;a++){const l=a/t,c=n(o-1),h=n(o),f=n(o+1),u=n(o+2);e.push({z:s(c.z,h.z,f.z,u.z,l),y:s(c.y,h.y,f.y,u.y,l),w:Math.max(.005,s(c.w,h.w,f.w,u.w,l)),h:Math.max(.005,s(c.h,h.h,f.h,u.h,l)),belly:Ce(h.belly??.85,f.belly??.85,l),top:Ce(h.top??1,f.top??1,l),u:o+l})}const r=i[i.length-1];return e.push({z:r.z,y:r.y,w:r.w,h:r.h,belly:r.belly??.85,top:r.top??1,u:i.length-1}),e}class av{pos=[];nor=[];col=[];si=[];sw=[];idx=[];vert(t,e,n,s,r){this.pos.push(t.x,t.y,t.z),this.nor.push(e.x,e.y,e.z),this.col.push(n.r,n.g,n.b);const o=[0,0,0,0],a=[0,0,0,0];for(let c=0;c<Math.min(4,s.length);c++)o[c]=s[c],a[c]=r[c];const l=a[0]+a[1]+a[2]+a[3]||1;return this.si.push(...o),this.sw.push(a[0]/l,a[1]/l,a[2]/l,a[3]/l),this.pos.length/3-1}build(){const t=new le;return t.setAttribute("position",new Wt(this.pos,3)),t.setAttribute("normal",new Wt(this.nor,3)),t.setAttribute("color",new Wt(this.col,3)),t.setAttribute("skinIndex",new ka(this.si,4)),t.setAttribute("skinWeight",new Wt(this.sw,4)),t.setIndex(this.idx),t.computeVertexNormals(),t.computeBoundingSphere(),t}}function Lo(i,t,e,n,s){const r=i.pos.length/3,o=new L,a=new L;for(const c of t)for(let h=0;h<e;h++){const f=h/e*Math.PI*2,u=Math.cos(f),d=Math.sin(f),g=d<0?d*c.belly:d*(1+(c.top-1)*Math.pow(Math.max(0,d),3));o.copy(c.c).addScaledVector(c.u,u*c.rx).addScaledVector(c.v,g*c.ry),a.copy(c.u).multiplyScalar(u/c.rx).addScaledVector(c.v,d/c.ry).normalize(),i.vert(o,a,c.colorAt(f),c.bones,c.weights)}for(let c=0;c<t.length-1;c++)for(let h=0;h<e;h++){const f=r+c*e+h,u=r+c*e+(h+1)%e,d=r+(c+1)*e+h,g=r+(c+1)*e+(h+1)%e;i.idx.push(f,u,d,u,g,d)}const l=(c,h)=>{const f=t[c],u=i.vert(f.c,f.u.clone().cross(f.v).multiplyScalar(h?-1:1),f.colorAt(Math.PI/2),f.bones,f.weights);for(let d=0;d<e;d++){const g=r+c*e+d,v=r+c*e+(d+1)%e;h?i.idx.push(u,v,g):i.idx.push(u,g,v)}};n&&l(0,!0),l(t.length-1,!1)}function Nv(i){const t=new av,e=[],n=[],s=i.spine,r=new at(i.colors.back),o=new at(i.colors.belly),a=new at(i.colors.pattern),l=i.colors.head!==void 0?new at(i.colors.head):null,c=new Array(s.length),h=(E,C,N)=>{const O=C>=0?N.clone().sub(n[C]):N.clone();return e.push({name:E,parent:C,pos:O}),n.push(N.clone()),e.length-1};c[i.hip]=h("hip",-1,new L(0,s[i.hip].y,s[i.hip].z));for(let E=i.hip+1;E<s.length;E++)c[E]=h("sp"+E,c[E-1],new L(0,s[E].y,s[E].z));for(let E=i.hip-1;E>=0;E--)c[E]=h("sp"+E,c[E+1],new L(0,s[E].y,s[E].z));const f=(E,C,N)=>{const O=Kt(-.25,.65,Math.sin(C)),H=o.clone().lerp(r,O);let X=0;const k=i.colors.scale;return i.colors.type==="stripes"&&(X=Kt(.35,.6,Math.sin(E*k+Po.noise(E*.3,C)*1.2))*O),i.colors.type==="bands"&&(X=Kt(.5,.7,Math.sin(E*k))*Kt(.1,.5,Math.sin(C)+.4)),i.colors.type==="spots"&&(X=Kt(.45,.65,Po.noise(E*k,(N+Math.cos(C))*k*1.5))*O),i.colors.type==="blotch"&&(X=Kt(.1,.45,Po.noise(E*k*.5,Math.cos(C)*2+Math.sin(C)))*(.3+O*.7)),H.lerp(a,X),H},u=ov(s,5),d=[];for(let E=0;E<u.length;E++){const C=u[E],N=u[Math.max(0,E-1)],O=u[Math.min(u.length-1,E+1)],H=new L(0,O.y-N.y,O.z-N.z).normalize(),X=new L(1,0,0),k=new L().crossVectors(H,X).normalize(),V=Math.floor(C.u),W=C.u-V,ut=c[Math.min(s.length-1,V)],it=c[Math.min(s.length-1,V+1)],zt=l?Kt(i.head-1.2,i.head-.3,C.u):0;d.push({c:new L(0,C.y,C.z),u:X,v:k,rx:C.w,ry:C.h,belly:C.belly,top:C.top,bones:[ut,it],weights:[1-W,W],colorAt:Gt=>{const Xt=f(C.z,Gt,0);return l&&Xt.lerp(l,zt),Xt}})}Lo(t,d,16,!0);const g=[];let v=1/0;i.legs.forEach((E,C)=>{for(const N of[1,-1]){const O=s[E.node],H=new L(E.x*N,O.y+(E.y??0),O.z+(E.z??0)),X=ft=>new L(0,-Math.cos(ft),Math.sin(ft));let k=E.angles[0];const V=H.clone().addScaledVector(X(k),E.len[0]);k+=E.angles[1];const W=V.clone().addScaledVector(X(k),E.len[1]);k+=E.angles[2];const ut=W.clone().addScaledVector(X(k),E.len[2]);E.kind!=="arm"&&(v=Math.min(v,ut.y-E.rad[3]*.6));const it=c[E.node],zt=h(`leg${C}${N>0?"R":"L"}0`,it,H),Gt=h(`leg${C}${N>0?"R":"L"}1`,zt,V),Xt=h(`leg${C}${N>0?"R":"L"}2`,Gt,W);g.push({upper:zt,lower:Gt,foot:Xt,side:N,spec:E,index:C,front:E.node>i.hip});const Q=[H,V,W,ut],K=E.rad,ct=[],Et=4;for(let ft=0;ft<3;ft++)for(let Yt=0;Yt<Et+(ft===2?1:0);Yt++){const $=Yt/Et,st=Q[ft],lt=Q[ft+1],ot=st.clone().lerp(lt,$),ht=lt.clone().sub(st).normalize(),Dt=new L(1,0,0),Pt=new L().crossVectors(ht,Dt).normalize();let Nt=Ce(K[ft],K[ft+1],$);ft===0&&(Nt*=1+.25*Math.sin($*Math.PI)),ft===2&&E.kind!=="arm"&&(Nt*=Ce(1,E.foot,$));const Zt=[zt,Gt,Xt][ft],F=[Gt,Xt,Xt][ft],ie=ft<2?Kt(.55,1,$)*.5:0,Qt=ot.z;ct.push({c:ot,u:Dt,v:Pt,rx:Nt*(ft===2&&E.kind==="column"?1.15:1),ry:Nt*(ft===2?.8:1),belly:1,top:1,bones:[Zt,F],weights:[1-ie,ie],colorAt:I=>f(Qt,I*.5+.8,0).lerp(r,.3).multiplyScalar(.92-ft*.05)})}const pt=ct[0];ct.unshift({...pt,c:pt.c.clone().add(new L(-N*K[0]*.6,K[0]*.6,0)),rx:K[0]*1.1,ry:K[0]*1.1,bones:[it],weights:[1]}),Lo(t,ct,10,!1)}});const m=[];if(i.wings){const E=i.wings;for(const C of[1,-1]){const N=s[E.node];let O=new L(E.x*C,N.y,N.z);const H=c[E.node],X=[],k=[O.clone()],V=[new L(C,.05,.25),new L(C,-.02,.15),new L(C,0,.1),new L(C,0,-.35)];let W=H;for(let K=0;K<4;K++){const ct=h(`wing${C>0?"R":"L"}${K}`,W,O);X.push(ct),W=ct,O=O.clone().addScaledVector(V[K].normalize(),E.len[K]),k.push(O.clone())}const ut=h(`wing${C>0?"R":"L"}tip`,W,O);X.push(ut),m.push({bones:X,side:C});const it=[];for(let K=0;K<4;K++){const ct=k[K],Et=k[K+1],pt=Et.clone().sub(ct).normalize(),ft=new L(0,1,0),Yt=new L().crossVectors(pt,ft).normalize(),$=E.rad*(1-K*.22);it.push({c:ct,u:ft,v:Yt,rx:$,ry:$,belly:1,top:1,bones:[X[K]],weights:[1],colorAt:()=>r.clone().multiplyScalar(.8)}),K===3&&it.push({c:Et,u:ft,v:Yt,rx:$*.3,ry:$*.3,belly:1,top:1,bones:[X[4]],weights:[1],colorAt:()=>r.clone()})}Lo(t,it,6,!1);const zt=10,Gt=new at(E.color),Xt=2,Q=[];for(let K=0;K<=zt;K++){const ct=K/zt,Et=ct*4,pt=Math.min(3,Math.floor(Et)),ft=Et-pt,Yt=k[pt].clone().lerp(k[pt+1],ft),$=[X[pt],X[Math.min(4,pt+1)]],st=[1-ft,ft],lt=Ce(E.node,E.bodyFrom,Math.min(1,ct*1.5)),ot=Math.floor(lt),ht=lt-ot,Dt=s[Math.max(0,Math.min(s.length-1,ot))],Pt=s[Math.max(0,Math.min(s.length-1,ot+1))],Nt=new L(C*Ce(Dt.w,Pt.w,ht)*.8,Ce(Dt.y,Pt.y,ht),Ce(Dt.z,Pt.z,ht));Nt.lerp(Yt,Kt(.75,1,ct));const Zt=[c[Math.max(0,Math.min(s.length-1,ot))],c[Math.max(0,Math.min(s.length-1,ot+1))]];for(let F=0;F<=Xt;F++){const ie=F/Xt,Qt=Yt.clone().lerp(Nt,ie);Qt.y-=Math.sin(ie*Math.PI)*.04*E.len[3];const I=ie<.5?$:Zt,M=ie<.5?st:[1-ht,ht],G=Gt.clone().multiplyScalar(.85+.25*Math.sin(ct*9)*.3);Q.push({p:Qt,c:G,b:I,w:M})}}for(const K of[1,-1]){const ct=t.pos.length/3;for(const Et of Q)t.vert(Et.p,new L(0,K,0),K>0?Et.c:Et.c.clone().multiplyScalar(.8),Et.b,Et.w);for(let Et=0;Et<zt;Et++)for(let pt=0;pt<Xt;pt++){const ft=ct+Et*(Xt+1)+pt,Yt=ft+1,$=ft+Xt+1,st=$+1;C*K>0?t.idx.push(ft,Yt,$,Yt,st,$):t.idx.push(ft,$,Yt,Yt,$,st)}}}}const p=[],y=(E,C=.6)=>{const N=new be({color:E,roughness:C});return we(N,{skin:{scale:.12,bump:.8,crease:.2}}),N},T=(E,C)=>new L(C[0],s[E].y+C[1],s[E].z+C[2]).sub(n[c[E]]),_=c[i.head];let R=-1;for(const E of i.app)if(E.t==="horn"){const C=E.mirror?[1,-1]:[1];for(const N of C){const O=new pn(E.rad,E.len,10,4);if(O.translate(0,E.len/2,0),E.curve){const X=O.getAttribute("position");for(let k=0;k<X.count;k++){const V=X.getY(k)/E.len;X.setZ(k,X.getZ(k)+E.curve*V*V*E.len)}O.computeVertexNormals()}const H=new At(O,y(E.color,.45));H.position.copy(T(E.node,[E.pos[0]*N,E.pos[1],E.pos[2]])),H.quaternion.setFromUnitVectors(new L(0,1,0),new L(E.dir[0]*N,E.dir[1],E.dir[2]).normalize()),H.castShadow=!0,p.push({bone:c[E.node],mesh:H})}}else if(E.t==="frill"){const C=new Es(E.radius,28,Math.PI*.05,Math.PI*.9),N=C.getAttribute("position");for(let W=1;W<N.count;W++){const ut=Math.atan2(N.getY(W),N.getX(W)),it=E.spikes?1+.12*Math.max(0,Math.sin(ut*E.spikes)):1;N.setXYZ(W,N.getX(W)*it,N.getY(W)*it,-Math.pow(Math.hypot(N.getX(W),N.getY(W))/E.radius,2)*E.radius*.08)}C.computeVertexNormals();const O=new Float32Array(N.count*3),H=new at(E.color),X=new at(E.edge);for(let W=0;W<N.count;W++){const ut=Math.hypot(N.getX(W),N.getY(W))/E.radius,it=H.clone().lerp(X,Kt(.55,.95,ut));O.set([it.r,it.g,it.b],W*3)}C.setAttribute("color",new Se(O,3));const k=new be({vertexColors:!0,roughness:.55,side:Xe});we(k,{skin:{scale:.14,bump:.9,crease:.3}});const V=new At(C,k);V.position.copy(T(E.node,E.pos)),V.rotation.x=E.tilt,p.push({bone:c[E.node],mesh:V,double:!0})}else if(E.t==="crest"){const C=new ph;C.moveTo(0,0),C.quadraticCurveTo(E.len*.3,E.height*1.2,E.len,E.height*.2),C.lineTo(E.len*.9,0),C.lineTo(0,0);const N=new qa(C,{depth:.04*E.height+.02,bevelEnabled:!1});N.translate(0,0,-(.02*E.height+.01)),N.rotateY(-Math.PI/2);const O=new At(N,y(E.color,.5));O.position.copy(T(E.node,E.pos)),O.rotation.x=E.angle,p.push({bone:c[E.node],mesh:O,double:!0})}else if(E.t==="sail")for(let C=E.from;C<E.to;C++){const N=s[C],O=s[C+1],H=(C+.5-E.from)/(E.to-E.from),X=E.height*Math.sin((C-E.from)/(E.to-E.from)*Math.PI)+.1,k=E.height*Math.sin((C+1-E.from)/(E.to-E.from)*Math.PI)+.1,V=new le,W=O.z-N.z,ut=O.y-N.y,it=[0,N.h*.8,0,0,N.h*.8+X,0,0,O.h*.8+ut+k,W,0,O.h*.8+ut,W];V.setAttribute("position",new Wt(it,3)),V.setIndex([0,1,2,0,2,3]),V.computeVertexNormals();const zt=new be({color:new at(E.color).offsetHSL(0,0,Math.sin(H*20)*.05),roughness:.6,side:Xe});we(zt);const Gt=new At(V,zt);p.push({bone:c[C],mesh:Gt,double:!0})}else if(E.t==="plates")for(let C=E.from;C<=E.to;C++){const N=s[C];for(let O=0;O<E.rows;O++){const H=E.rows===1?0:(O/(E.rows-1)-.5)*2.2,X=E.size*(.6+.4*Math.sin((C-E.from+.5)/(E.to-E.from+1)*Math.PI));let k;E.kind==="plate"?(k=new pn(X*.5,X,4,1),k.scale(.25,1,1)):E.kind==="spike"?k=new pn(X*.18,X,7,1):(k=new ui(X*.4,7,5),k.scale(1,.55,1.2)),k.translate(0,X*.45,0);const V=new At(k,y(E.color,.55)),W=Math.sin(H)*N.w,ut=Math.cos(H)*N.h*(N.top??1);V.position.copy(T(C,[W,ut*.95,0])),V.rotation.z=-H,V.castShadow=!0,p.push({bone:c[C],mesh:V})}}else if(E.t==="club"){const C=new ui(E.size,12,8);C.scale(1.4,.7,1);const N=new At(C,y(E.color,.5));N.position.copy(T(E.node,[0,0,0])),N.castShadow=!0,p.push({bone:c[E.node],mesh:N})}else if(E.t==="feathers")for(let C=E.from;C<=E.to;C++){const N=s[C];for(let O=0;O<5;O++){const H=(O/4-.5)*E.spread,X=new pn(E.len*.12,E.len,4,1);X.scale(1,1,.25),X.translate(0,E.len*.5,0);const k=new At(X,y(new at(E.color).offsetHSL(0,0,O%2*.05).getHex(),.85));k.position.copy(T(C,[Math.sin(H)*N.w,Math.cos(H)*N.h*.9,0])),k.rotation.set(-1.2,0,-H*.8),k.castShadow=!0,p.push({bone:c[C],mesh:k})}}else if(E.t==="armfeathers")for(const C of g.filter(N=>N.index===E.leg))for(let N=0;N<4;N++){const O=new Hn(E.len*.35,E.len);O.translate(0,-E.len*.5,0);const H=new be({color:E.color,roughness:.85,side:Xe});we(H);const X=new At(O,H);X.position.set(C.side*.02,0,-N*E.len*.18),X.rotation.set(.5+N*.1,C.side*1.3,0),p.push({bone:N<2?C.lower:C.foot,mesh:X,double:!0})}else if(E.t==="beak"){const C=new pn(s[E.node].w*.9,E.len,8,1);C.rotateX(Math.PI/2),C.scale(.8,1.1,1),C.translate(0,0,E.len/2);const N=new At(C,y(E.color,.4));N.position.copy(T(E.node,[0,0,0])),N.castShadow=!0,p.push({bone:c[E.node],mesh:N})}const S=new be({color:1708554,roughness:.08,metalness:.1});for(const E of[1,-1]){const C=new At(new ui(i.eyes.r,10,8),S);C.position.copy(T(i.head,[i.eyes.pos[0]*E,i.eyes.pos[1],i.eyes.pos[2]])),p.push({bone:_,mesh:C})}if(i.jaw){const E=i.jaw,C=new pn(E.w,E.len,8,2);C.rotateX(Math.PI/2),C.scale(1,E.h/E.w,1),C.translate(0,0,E.len/2);const N=new At(C,y(E.color,.6)),O=new L(0,s[i.head].y-s[i.head].h*.55,s[i.head].z-E.len*.35);R=h("jaw",_,O),p.push({bone:R,mesh:N})}const P=new Jt;for(const E of p){const C=E.mesh;C.updateMatrix();let N=C.geometry.clone();if(!N.index){const W=N.getAttribute("position").count;N.setIndex([...Array(W).keys()])}N.computeVertexNormals(),P.makeTranslation(n[E.bone].x,n[E.bone].y,n[E.bone].z).multiply(C.matrix),N.applyMatrix4(P);const O=N.getAttribute("position"),H=N.getAttribute("normal"),X=N.getAttribute("color"),k=C.material.color??new at(1,1,1),V=N.index.array;for(const W of E.double?[1,-1]:[1]){const ut=t.pos.length/3;for(let it=0;it<O.count;it++){const zt=X?new at(X.getX(it),X.getY(it),X.getZ(it)):k.clone();t.vert(new L(O.getX(it),O.getY(it),O.getZ(it)),new L(H.getX(it),H.getY(it),H.getZ(it)).multiplyScalar(W),W>0?zt:zt.multiplyScalar(.85),[E.bone],[1])}for(let it=0;it<V.length;it+=3)W>0?t.idx.push(ut+V[it],ut+V[it+1],ut+V[it+2]):t.idx.push(ut+V[it],ut+V[it+2],ut+V[it+1])}}const x=t.build(),b=new be({vertexColors:!0,roughness:i.roughness,metalness:0});we(b,{skin:i.skin});const w=s.map(E=>E.z),D=Math.max(...w)-Math.min(...w),U=Math.max(...s.map(E=>E.y+E.h));return isFinite(v)||(v=0),{geometry:x,bones:e,spineBones:c,legBones:g,wingBones:m,headBone:_,jawBone:R,material:b,spec:i,length:D,height:U,footY:v}}function Uv(i,t){const e=i.bones.map(a=>{const l=new ih;return l.name=a.name,l.position.copy(a.pos),l});i.bones.forEach((a,l)=>{a.parent>=0&&e[a.parent].add(e[l])});const n=t?i.material.clone():i.material;t&&(n.color.copy(t),n.onBeforeCompile=i.material.onBeforeCompile,n.customProgramCacheKey=i.material.customProgramCacheKey);const s=new sf(i.geometry,n);s.add(e[0]),s.bind(new Ha(e)),s.castShadow=!0,s.receiveShadow=!0,s.frustumCulled=!1;const r=i.jawBone>=0?e[i.jawBone]:null,o=new xe;return o.add(s),{root:o,mesh:s,bones:e,jaw:r,template:i,material:n}}const lv=()=>({speed:0,turnRate:0,headPitch:0,headYaw:0,graze:0,alert:0,jaw:0,rest:0,flying:0,flap:0,rear:0,crouch:0,dead:0});class Fv{constructor(t,e,n){this.rig=t,this.sp=e,this.scale=n}rig;sp;scale;phase=Math.random()*Math.PI*2;flapPhase=Math.random()*6;legPhasePrev=[];smooth=lv();time=Math.random()*100;planted=[];bodyBob=0;legOffset(t){const e=this.rig.template.legBones[t],n=this.rig.template.legBones.filter(r=>r.spec.kind!=="arm"),s=new Set(n.map(r=>r.index)).size>=2;return n.length>6?(e.index*.19+(e.side>0?0:.5))%1:s?(e.front?.25:0)+(e.side>0?0:.5):e.side>0?0:.5}update(t,e){this.time+=t;const n=this.smooth,s=6;for(const w of Object.keys(e)){const D=w==="speed"?4:w==="jaw"?12:w==="dead"?2:s;n[w]=lx(n[w],e[w],D,t)}const r=this.rig.template,o=this.rig.bones,a=this.sp.stride*this.scale,l=n.speed;this.phase+=l/Math.max(.05,a)*Math.PI*2*t;const c=en(l/Math.max(.1,this.sp.walk*this.scale),0,1),h=en((l-this.sp.walk*this.scale*1.3)/Math.max(.1,(this.sp.run-this.sp.walk)*this.scale),0,1),f=(.32+h*.35)*c;this.planted.length=0;const u=n.rest,d=n.dead;r.legBones.forEach((w,D)=>{const U=o[w.upper],E=o[w.lower],C=o[w.foot];if(w.spec.kind==="arm"){const zt=Math.sin(this.phase+(w.side>0?0:Math.PI))*.15*c;U.rotation.set(zt-n.rear*.6,0,0),E.rotation.set(-.2*n.alert+n.jaw*.3,0,0),C.rotation.set(0,0,0);return}const N=this.phase*(n.flying>.5?0:1)+this.legOffset(D)*Math.PI*2,O=Math.cos(N),H=Math.sin(N),X=Math.max(0,-H)*(.35+h*.5)*c;let k=-f*O,V=0,W=0;if(w.spec.kind==="column"?(V=X*.7,W=-X*.35):(k-=X*.25,V=X*1,W=-X*.7),w.front&&n.rear>.01&&(k-=n.rear*.9,V+=n.rear*.8),u>.01||n.crouch>.01){const zt=Math.max(u,n.crouch*.4);k=k*(1-zt)+(w.front?-.5:.9)*zt,V=V*(1-zt)+(w.front?1.1:-1.6)*zt,W=W*(1-zt)+(w.front?-.5:.8)*zt}n.flying>.3&&(k=.9*n.flying,V=-.5*n.flying,W=.9*n.flying),U.rotation.set(k,0,d*.4*w.side),E.rotation.set(V,0,0),C.rotation.set(W,0,0);const ut=(N%(Math.PI*2)+Math.PI*2)%(Math.PI*2),it=this.legPhasePrev[D]??ut;c>.08&&n.flying<.3&&u<.3&&it>ut+.01&&it-ut>Math.PI&&this.planted.push(D),this.legPhasePrev[D]=ut});const g=r.height*this.scale,v=Math.abs(Math.sin(this.phase*2))*.035*c*(1+h);this.bodyBob=-v*g*.35;const m=Math.sin(this.time*(1.2/Math.max(.5,Math.sqrt(g))))*.006*g,p=-u*(g*.32+r.footY*-.2)-n.crouch*g*.12;this.rig.mesh.position.set(0,(this.bodyBob+m)/this.scale+p/this.scale-r.footY,0),this.rig.mesh.rotation.set(-n.rear*.35,0,d*1.45);const y=r.spineBones,T=r.spec.hip,_=r.spec.neckBase,R=r.spec.head,S=T;for(let w=T-1;w>=0;w--){const D=(T-w)/Math.max(1,S),U=Math.sin(this.time*(1.6+h)-D*2.2)*.07*(.4+c)*D;o[y[w]].rotation.set(-.03*D*(1-c)+u*.08,U-n.turnRate*.25*D+0,0)}const P=R-_,x=n.graze*1.2/Math.max(1,P),b=-n.alert*.35/Math.max(1,P);for(let w=T+1;w<y.length;w++){const D=o[y[w]];if(w<=_)D.rotation.set(0,n.turnRate*.06,0);else if(w<=R){const U=n.headPitch/Math.max(1,P)+x+b+u*.25/Math.max(1,P),E=n.headYaw/Math.max(1,P)+n.turnRate*.1,C=Math.sin(this.time*.7+w)*.02*(1-c);D.rotation.set(U+C,E,0)}else D.rotation.set(-(x*P)*.35,0,0)}if(this.rig.jaw&&(this.rig.jaw.rotation.x=n.jaw*.55),r.wingBones.length){this.flapPhase+=t*(3.2/Math.sqrt(Math.max(.3,this.scale)))*(.3+n.flap);for(const w of r.wingBones){const D=w.side,U=Math.sin(this.flapPhase)*.55*n.flap,E=n.flying,C=1-E,N=o[w.bones[0]],O=o[w.bones[1]],H=o[w.bones[3]];N.rotation.set(0,C*-D*1.2,(U+.05*Math.sin(this.time*2))*D*E+C*-D*.9),O.rotation.set(0,C*D*2.3,-U*.4*D*E),o[w.bones[2]].rotation.set(0,0,0),H.rotation.set(0,C*-D*2.6,-U*.3*D*E)}}}}const Ov={seen:"姿を見た",herd:"群れの移動を見た",graze:"食べる様子を見た",drink:"水を飲む姿を見た",sleep:"眠る姿を見た（夜）",call:"鳴き声を聞いた",track:"足跡を調べた",hunt:"狩りを見た",threat:"威嚇を見た",protect:"幼体を守る行動を見た",carcass:"死骸に集まる様子を見た",fly:"飛ぶ姿を見た",feather:"落ちた羽毛・鱗を拾った",fossil:"化石と照らし合わせた",bond:"共に行動した",thorn:"棘の低木を食べる姿を見た",nest:"巣・産卵の場所を見つけた",dig:"地面を掘る様子を見た",burrow:"地中へ潜る姿を見た"},cv={spine:[{z:-14,y:4.3,w:.14,h:.14},{z:-11,y:4.9,w:.34,h:.36},{z:-8,y:5.5,w:.7,h:.72},{z:-5,y:6.1,w:1.25,h:1.3},{z:-2.4,y:6.5,w:1.85,h:1.95,belly:.95,top:1.1},{z:.2,y:6.7,w:2.15,h:2.3,belly:1.05},{z:2.6,y:6.9,w:2,h:2.15,belly:.95},{z:4.6,y:7.4,w:1.55,h:1.75},{z:6.4,y:8.6,w:.95,h:1.1},{z:7.9,y:10,w:.7,h:.82},{z:9.2,y:11.4,w:.56,h:.64},{z:10.3,y:12.6,w:.46,h:.52},{z:11.3,y:13.4,w:.4,h:.46},{z:12.3,y:13.8,w:.42,h:.5},{z:13.3,y:13.7,w:.33,h:.36},{z:14,y:13.5,w:.2,h:.22}],hip:4,neckBase:7,head:13,legs:[{node:4,x:1.35,len:[3.2,2.8,.6],rad:[1,.72,.6,.72],angles:[.12,-.2,.08],kind:"column",foot:1.2},{node:7,x:1.2,y:-.4,len:[3,3.1,.55],rad:[.82,.6,.5,.62],angles:[-.05,.08,0],kind:"column",foot:1.15}],jaw:{len:1,w:.24,h:.12,color:8222052},eyes:{pos:[.34,.14,.1],r:.09},app:[],colors:{back:7564636,belly:11314060,pattern:5196351,type:"stripes",scale:.75},skin:{scale:.33,bump:1.4,crease:.4},roughness:.82},hv={spine:[{z:-2.4,y:1.52,w:.04,h:.05},{z:-1.8,y:1.56,w:.1,h:.12},{z:-1.1,y:1.62,w:.18,h:.21},{z:-.3,y:1.72,w:.3,h:.36},{z:.4,y:1.78,w:.33,h:.4,belly:1},{z:.9,y:1.9,w:.25,h:.3},{z:1.15,y:2.25,w:.09,h:.1},{z:1.33,y:2.62,w:.075,h:.085},{z:1.48,y:2.96,w:.068,h:.075},{z:1.64,y:3.12,w:.09,h:.1},{z:1.84,y:3.1,w:.055,h:.06},{z:1.98,y:3.05,w:.02,h:.025}],hip:3,neckBase:5,head:9,legs:[{node:3,x:.2,len:[.76,.82,.42],rad:[.19,.08,.05,.04],angles:[.5,-1.1,.75],kind:"digit",foot:1.3},{node:5,x:.2,y:-.12,len:[.34,.3,.18],rad:[.06,.04,.03,.02],angles:[.6,.5,.3],kind:"arm",foot:1}],eyes:{pos:[.075,.03,.02],r:.035},app:[{t:"beak",node:10,len:.16,color:3814704},{t:"feathers",from:1,to:5,len:.22,color:9071688,spread:2},{t:"feathers",from:0,to:1,len:.34,color:6967864,spread:1.6},{t:"armfeathers",leg:1,len:.3,color:8019520}],colors:{back:10189909,belly:14470571,pattern:6047794,type:"stripes",scale:4.2,head:7297605},skin:{scale:.05,bump:.6,crease:.15},roughness:.95,sheen:.3},uv={spine:[{z:-3,y:1.36,w:.04,h:.05},{z:-2.2,y:1.4,w:.08,h:.1},{z:-1.4,y:1.46,w:.15,h:.18},{z:-.5,y:1.56,w:.32,h:.38},{z:.3,y:1.62,w:.36,h:.45,belly:.95},{z:.9,y:1.76,w:.3,h:.36},{z:1.25,y:2,w:.16,h:.18},{z:1.5,y:2.22,w:.14,h:.16},{z:1.76,y:2.34,w:.17,h:.21},{z:2.06,y:2.28,w:.12,h:.14},{z:2.3,y:2.2,w:.06,h:.07}],hip:3,neckBase:5,head:8,legs:[{node:3,x:.25,len:[.72,.76,.38],rad:[.23,.1,.06,.05],angles:[.45,-1.05,.75],kind:"digit",foot:1.3},{node:5,x:.23,y:-.1,len:[.42,.38,.22],rad:[.08,.05,.04,.03],angles:[.9,.7,.2],kind:"arm",foot:1}],jaw:{len:.46,w:.1,h:.06,color:4078128},eyes:{pos:[.13,.07,.05],r:.04},app:[{t:"feathers",from:2,to:6,len:.26,color:3814442,spread:2.2},{t:"feathers",from:0,to:2,len:.42,color:3025442,spread:1.4},{t:"armfeathers",leg:1,len:.42,color:3814442},{t:"crest",node:8,pos:[0,.18,-.1],len:.35,height:.12,color:9058856,angle:-.3}],colors:{back:4933178,belly:9471337,pattern:2762015,type:"stripes",scale:3.2,head:5913132},skin:{scale:.05,bump:.6,crease:.2},roughness:.95,sheen:.2},fv={spine:[{z:-1.6,y:.55,w:.08,h:.08},{z:-1.1,y:.6,w:.12,h:.12},{z:-.6,y:.66,w:.25,h:.22},{z:-.1,y:.7,w:.46,h:.34,top:1.2,belly:.6},{z:.5,y:.72,w:.5,h:.36,top:1.2,belly:.6},{z:.9,y:.7,w:.42,h:.32,belly:.7},{z:1.15,y:.66,w:.22,h:.2},{z:1.36,y:.64,w:.22,h:.18},{z:1.6,y:.58,w:.13,h:.11}],hip:3,neckBase:5,head:7,legs:[{node:3,x:.34,len:[.3,.3,.1],rad:[.15,.1,.09,.11],angles:[.1,-.2,.1],kind:"column",foot:1.2},{node:5,x:.32,len:[.28,.29,.09],rad:[.13,.09,.08,.1],angles:[-.1,.15,0],kind:"column",foot:1.2}],eyes:{pos:[.16,.06,.05],r:.025},app:[{t:"plates",from:2,to:6,size:.2,color:6970432,kind:"osteoderm",rows:4},{t:"plates",from:3,to:5,size:.24,color:5917748,kind:"spike",rows:2},{t:"club",node:0,size:.17,color:5917748}],colors:{back:8153931,belly:11770996,pattern:4931371,type:"spots",scale:3,head:6969920},skin:{scale:.08,bump:1.4,crease:.35},roughness:.8},dv={spine:[{z:-.9,y:2,w:.05,h:.05},{z:-.5,y:2.1,w:.18,h:.2},{z:-.15,y:2.2,w:.28,h:.3},{z:.3,y:2.4,w:.32,h:.34},{z:.65,y:2.65,w:.3,h:.3},{z:.9,y:3.15,w:.12,h:.12},{z:1.08,y:3.75,w:.1,h:.1},{z:1.22,y:4.25,w:.1,h:.1},{z:1.38,y:4.5,w:.16,h:.2},{z:1.9,y:4.32,w:.1,h:.11},{z:2.55,y:4.05,w:.03,h:.03}],hip:2,neckBase:5,head:8,legs:[{node:2,x:.2,len:[.78,.86,.26],rad:[.13,.07,.05,.04],angles:[.25,-.45,.4],kind:"digit",foot:1.4}],wings:{node:4,x:.26,len:[.95,1.35,.5,2.9],rad:.09,bodyFrom:1,bodyTo:3,color:6114629},eyes:{pos:[.13,.08,.08],r:.04},app:[{t:"crest",node:8,pos:[0,.16,-.05],len:.9,height:.45,color:11556156,angle:.25}],colors:{back:7035729,belly:13351843,pattern:3879211,type:"blotch",scale:2.2,head:14208440},skin:{scale:.05,bump:.5,crease:.15},roughness:.9,sheen:.2},pv={spine:[{z:-1,y:.5,w:.01,h:.04},{z:-.6,y:.5,w:.015,h:.015},{z:-.25,y:.52,w:.04,h:.04},{z:-.08,y:.53,w:.07,h:.07},{z:.08,y:.55,w:.075,h:.08},{z:.18,y:.6,w:.05,h:.05},{z:.26,y:.66,w:.04,h:.04},{z:.34,y:.7,w:.05,h:.06},{z:.46,y:.68,w:.03,h:.035},{z:.56,y:.65,w:.01,h:.012}],hip:3,neckBase:5,head:7,legs:[{node:3,x:.05,len:[.18,.2,.08],rad:[.03,.018,.012,.01],angles:[.3,-.5,.4],kind:"digit",foot:1.4}],wings:{node:4,x:.06,len:[.16,.22,.08,.5],rad:.018,bodyFrom:2,bodyTo:3,color:4865592},eyes:{pos:[.035,.02,.02],r:.012},app:[{t:"crest",node:0,pos:[0,0,0],len:.12,height:.08,color:10111536,angle:0}],colors:{back:4866106,belly:12101776,pattern:2761760,type:"none",scale:1},skin:{scale:.02,bump:.4,crease:.1},roughness:.9},mv={spine:[{z:-.36,y:.06,w:.008,h:.008},{z:-.2,y:.07,w:.016,h:.016},{z:-.06,y:.085,w:.05,h:.05},{z:.04,y:.09,w:.06,h:.058},{z:.12,y:.088,w:.05,h:.05},{z:.17,y:.095,w:.032,h:.035},{z:.22,y:.095,w:.036,h:.034},{z:.28,y:.085,w:.012,h:.013}],hip:2,neckBase:4,head:6,legs:[{node:2,x:.04,len:[.04,.04,.02],rad:[.022,.012,.009,.009],angles:[.5,-.9,.5],kind:"digit",foot:1.3},{node:4,x:.035,len:[.035,.035,.018],rad:[.018,.01,.008,.008],angles:[-.2,.3,.1],kind:"digit",foot:1.3}],eyes:{pos:[.022,.015,.01],r:.007},app:[],colors:{back:6967864,belly:12099712,pattern:3811866,type:"stripes",scale:30},skin:{scale:.01,bump:.2,crease:.05},roughness:1,sheen:.4},gv={spine:[{z:-4.4,y:1.6,w:.08,h:.08},{z:-3.3,y:1.9,w:.22,h:.24},{z:-2.2,y:2.2,w:.5,h:.56},{z:-1,y:2.46,w:.96,h:1,top:1.1},{z:.3,y:2.42,w:1.12,h:1.12,belly:1},{z:1.5,y:2.22,w:.96,h:1},{z:2.3,y:2.06,w:.62,h:.72},{z:2.95,y:2.02,w:.62,h:.76},{z:3.6,y:1.82,w:.46,h:.56},{z:4.2,y:1.52,w:.2,h:.26}],hip:3,neckBase:5,head:7,legs:[{node:3,x:.72,len:[1,.95,.4],rad:[.46,.3,.24,.3],angles:[.15,-.3,.15],kind:"column",foot:1.25},{node:5,x:.68,len:[.86,.82,.34],rad:[.36,.25,.2,.26],angles:[-.2,.35,-.1],kind:"column",foot:1.2}],jaw:{len:.7,w:.3,h:.18,color:4872762},eyes:{pos:[.52,.28,.1],r:.07},app:[{t:"horn",node:7,pos:[.3,.6,.15],len:1.35,rad:.13,dir:[.18,.55,1],color:14208942,mirror:!0,curve:.18},{t:"horn",node:8,pos:[0,.5,.2],len:.42,rad:.12,dir:[0,1,.55],color:13616288},{t:"frill",node:7,pos:[0,.7,-.4],radius:1.45,tilt:-.28,color:8034906,edge:13676624,spikes:9},{t:"beak",node:9,len:.36,color:3025444}],colors:{back:7244892,belly:12761748,pattern:4218428,type:"blotch",scale:1.1,head:8030812},skin:{scale:.26,bump:1.4,crease:.3},roughness:.78},xv={spine:[{z:-5.5,y:2.6,w:.08,h:.09},{z:-4.2,y:2.8,w:.2,h:.23},{z:-2.8,y:3,w:.45,h:.52},{z:-1.2,y:3.2,w:.76,h:.86},{z:.2,y:3.3,w:.8,h:.96,belly:1},{z:1.3,y:3.42,w:.6,h:.75},{z:2,y:3.8,w:.38,h:.46},{z:2.75,y:4.12,w:.46,h:.62},{z:3.55,y:3.92,w:.34,h:.44},{z:4.25,y:3.7,w:.18,h:.22}],hip:3,neckBase:5,head:7,legs:[{node:3,x:.52,len:[1.5,1.4,.62],rad:[.52,.25,.15,.12],angles:[.3,-.7,.5],kind:"digit",foot:1.4},{node:5,x:.45,y:-.35,len:[.5,.45,.25],rad:[.13,.08,.05,.04],angles:[.8,.6,.3],kind:"arm",foot:1}],jaw:{len:1.25,w:.3,h:.2,color:4864556},eyes:{pos:[.34,.24,.2],r:.07},app:[{t:"horn",node:7,pos:[.25,.52,.2],len:.26,rad:.1,dir:[.1,1,.3],color:6965818,mirror:!0},{t:"plates",from:2,to:6,size:.18,color:3812900,kind:"osteoderm",rows:1}],colors:{back:6048570,belly:11244402,pattern:3811872,type:"bands",scale:1.4,head:6965814},skin:{scale:.12,bump:1.3,crease:.4},roughness:.8},vv=(()=>{const i=[];for(let n=0;n<16;n++){const s=n/15,r=.22*Math.sin(Math.min(1,s*1.15+.08)*Math.PI)+.05;i.push({z:-1.25+s*2.5,y:.16,w:r,h:r*.42,top:.9,belly:.4})}const e=[];for(let n=2;n<14;n+=1)e.push({node:n,x:i[n].w*.9,y:-.04,len:[.08,.1,.03],rad:[.018,.013,.009,.008],angles:[.2,-.5,.3],kind:"digit",foot:1});return{spine:i,hip:8,neckBase:13,head:14,legs:e,eyes:{pos:[.06,.03,.02],r:.012},app:[{t:"plates",from:1,to:14,size:.07,color:4863270,kind:"plate",rows:2}],colors:{back:3878696,belly:6966842,pattern:8018494,type:"bands",scale:38},skin:{scale:.04,bump:.8,crease:.3},roughness:.45}})(),zv={sorakubi:{id:"sorakubi",name:"ソラクビ",kana:"そらくび",motif:"竜脚類（ブラキオサウルス科・ディプロドクス科など）",fossil:"長い首と尾をもつ、四足歩行の巨大な植物食恐竜のなかま。背骨には空洞（含気骨）があり、体の大きさのわりに骨格は軽かったと考えられている。足跡の化石から、群れで移動したこともあったと推定されている。",varuna:"霧の朝に群れで草海を渡り、首を振って霧を割るように進む。何百年も同じ道を歩くため、群れの道は浅い溝になり、雨の季節には小川になる。草海の小川の多くは、ソラクビの古い道である。",role:"歩いた跡が水の通り道になる。高い木の葉を食べ、草地に光を入れる。",researchType:"群れの行動型",obs:["seen","herd","track","call","sleep","protect","fossil"],shape:cv,scale:1,juvenileScale:.34,foot:"round",footSize:1.7,mass:38e3,walk:1.7,run:4.2,turn:.18,stride:4.6,sight:120,fov:3.6,hearing:90,smell:70,disposition:"ignore",activity:"day",diet:"plants",herd:[10,14],hp:5e3,voice:{base:38,kind:"rumble"},viewDistance:2400,bodyRadius:3.2},kazeashi:{id:"kazeashi",name:"カゼアシ",kana:"かぜあし",motif:"オルニトミムス類（ストルティオミムスなど）",fossil:"ダチョウに似た体つきの二足歩行の恐竜のなかま。長い後ろ脚から、速く走れたと考えられている。羽毛をもっていたことを示す化石が見つかっている。",varuna:"草の実と虫を食べながら、小さな群れで草海を走る。臆病だが、風下から身を低くして近づく者には気づきにくい。渡りの民は、群れからはぐれた若い個体と共に暮らし、騎獣にしてきた。",role:"草の実を運び、草地を広げる。肉食獣にとっての主な獲物。",researchType:"関係型（騎乗の共同活動）",obs:["seen","graze","drink","track","bond"],shape:hv,scale:1,juvenileScale:.6,foot:"tri",footSize:.42,mass:160,walk:1.8,run:11,turn:3,stride:1.8,sight:60,fov:4.4,hearing:45,smell:35,disposition:"flee",activity:"day",diet:"omni",herd:[6,9],hp:60,voice:{base:520,kind:"honk"},viewDistance:420,bodyRadius:.5},kusagari:{id:"kusagari",name:"クサガリ",kana:"くさがり",motif:"ドロマエオサウルス類（デイノニクス、ユタラプトルなど）",fossil:"後ろ脚に鎌のような大きな爪をもつ、羽毛の生えた肉食恐竜のなかま。同じ場所から複数の個体の化石が見つかることがあり、群れで行動した可能性が議論されている。",varuna:"霧の日や薄明に、3〜5頭で狩りをする。空腹のときは執拗に追ってくるが、満腹なら威嚇するだけで去る。火と大きな音を嫌う。",role:"弱った個体を間引き、群れを健康に保つ。死骸を作り、腐肉食の生き物を養う。",researchType:"痕跡型",obs:["seen","hunt","threat","track","feather","call"],shape:uv,scale:1,juvenileScale:.6,foot:"tri",footSize:.46,mass:280,walk:1.6,run:9.5,turn:3.5,stride:1.9,sight:70,fov:2.6,hearing:60,smell:80,disposition:"predator",activity:"dusk",diet:"meat",herd:[3,4],hp:90,voice:{base:300,kind:"screech"},viewDistance:420,bodyRadius:.6},himeyoroi:{id:"himeyoroi",name:"ヒメヨロイ",kana:"ひめよろい",motif:"小型の曲竜類（ミンミなど）",fossil:"背中が骨の板（皮骨）で覆われた、四足歩行の植物食恐竜のなかま。小型の種も知られている。",varuna:"家族で一列に歩き、棘のある低木を好んで食べる。雨季の初めに、川の砂州へ移動して卵を産む。驚くと丸くなるだけで、人を襲わない。",role:"棘の低木を食べて減らす。いなくなると、肉食獣が身を隠す茂みが増える。",researchType:"関係型",obs:["seen","thorn","nest","track","threat"],shape:fv,scale:1,juvenileScale:.55,foot:"pad",footSize:.34,mass:300,walk:.9,run:2.2,turn:1.4,stride:.8,sight:25,fov:3.4,hearing:30,smell:30,disposition:"defensive",activity:"day",diet:"plants",herd:[3,4],hp:200,voice:{base:180,kind:"click"},viewDistance:260,bodyRadius:.6},kagewatari:{id:"kagewatari",name:"カゲワタリ",kana:"かげわたり",motif:"アズダルコ科の翼竜（ケツァルコアトルスなど）",fossil:"非常に大きな翼竜のなかま。翼を広げると10mを超える種もいた。地上を4本の脚で歩いて小動物をとらえたと考えられている。",varuna:"晴れた日に上昇気流で旋回し、その影が草海の群れを驚かせる。川辺に降りて小魚やツチネズミを狙う。雨の日は地上を歩く。",role:"小動物の数を調整する。影が群れの移動のきっかけになる。",researchType:"行動型",obs:["seen","fly","hunt","track"],shape:dv,scale:1.25,foot:"tri",footSize:.4,mass:220,walk:1.4,run:3.5,turn:1.2,stride:1.6,sight:160,fov:3,hearing:50,smell:20,disposition:"ignore",activity:"day",diet:"meat",herd:[1,1],hp:150,voice:{base:200,kind:"hiss"},flying:!0,viewDistance:1500,bodyRadius:.8},honetsutsuki:{id:"honetsutsuki",name:"ホネツツキ",kana:"ほねつつき",motif:"小型の翼竜（ランフォリンクス類）",fossil:"長い尾の先に菱形の膜をもつ翼竜のなかま。鋭い歯をもつ種が多い。",varuna:"死骸が出ると、どこからともなく集まって上空を旋回する。その旋回が、草海の民にとって「何かが死んだ」合図になる。ソラクビの背中の虫も食べる。",role:"腐肉食の最初の到着者。死骸の場所を知らせる。",researchType:"関係型",obs:["seen","carcass","fly"],shape:pv,scale:1,foot:"small",footSize:.1,mass:2,walk:.6,run:1.5,turn:3,stride:.2,sight:90,fov:3.4,hearing:20,smell:120,disposition:"flee",activity:"day",diet:"carrion",herd:[6,8],hp:5,voice:{base:1400,kind:"chirp"},flying:!0,viewDistance:500,bodyRadius:.2},tsuchinezumi:{id:"tsuchinezumi",name:"ツチネズミ",kana:"つちねずみ",motif:"初期の哺乳類（モルガヌコドンなど）",fossil:"中生代の小型の哺乳類。多くは夜行性で、虫を食べていたと考えられている。",varuna:"夜に草の間を走り、死骸と種を片付ける。好奇心が強く、静かにしている者には近寄ってくる。",role:"死骸を分解し、種を土に埋める。",researchType:"夜行型",obs:["seen","carcass","burrow"],shape:mv,scale:1,foot:"small",footSize:.05,mass:.1,walk:.5,run:3,turn:5,stride:.1,sight:12,fov:4,hearing:20,smell:15,disposition:"curious",activity:"night",diet:"omni",herd:[3,5],hp:2,voice:{base:3200,kind:"squeak"},viewDistance:45,bodyRadius:.08},suikaku:{id:"suikaku",name:"翠角竜",kana:"すいかくりゅう",motif:"角竜類（トリケラトプス、トロサウルスなど）",fossil:"大きなフリル（首の飾り）と角をもつ、四足歩行の植物食恐竜のなかま。同じ種の骨がまとまって見つかる産地があり、群れで暮らしていた可能性がある。",varuna:"樹海の縁で巨木に角を掛けて倒し、光の入る空き地を作る。空き地には若草が生え、草海の草食獣の道になる。群れの王個体は、並外れて大きく育つ。",role:"木を倒して空き地を作る（地巡り）。",researchType:"化石照合型",obs:["seen","graze","protect","threat","track","fossil"],shape:gv,scale:1,juvenileScale:.3,foot:"cera",footSize:.9,mass:9e3,walk:1.3,run:7,turn:.8,stride:2.2,sight:45,fov:3,hearing:55,smell:60,disposition:"defensive",activity:"day",diet:"plants",herd:[3,5],hp:800,voice:{base:70,kind:"bellow"},viewDistance:900,bodyRadius:1.8},ooagito:{id:"ooagito",name:"オオアギト",kana:"おおあぎと",motif:"大型の獣脚類（アロサウルス、メガロサウルスなど）",fossil:"大きな頭と鋭い歯をもつ、二足歩行の大型肉食恐竜のなかま。目の上に小さな角状の突起をもつ種がある。",varuna:"樹海の縁の縄張りを一頭で巡回する。雨の後、足跡の残りやすい地面で狩りをする。クサガリの群れから獲物を奪う。",role:"最上位の捕食者。大きな死骸を生み、樹海の縁の生き物を養う。",researchType:"痕跡型",obs:["seen","track","threat","carcass","call"],shape:xv,scale:1,foot:"tri",footSize:1.05,mass:2300,walk:1.8,run:7.5,turn:1.2,stride:3.2,sight:80,fov:2.4,hearing:70,smell:110,disposition:"territorial",activity:"day",diet:"meat",herd:[1,1],hp:700,voice:{base:90,kind:"bellow"},viewDistance:700,bodyRadius:1.3},nedamari:{id:"nedamari",name:"ネダマリ",kana:"ねだまり",motif:"アースロプレウラ（石炭紀の巨大な多足類）",fossil:"体長が2mを超えたと考えられる、史上最大級の陸生節足動物。植物を食べていたと推定されている。",varuna:"暗い林床をゆっくり這い、落ち葉と朽ち木を食べる。湿った土と根の空洞を好むので、その跡をたどると根の洞窟に行き着く。",role:"落ち葉を分解し、林床の土を作る。",researchType:"簡易型＋痕跡",obs:["seen","burrow","track"],shape:vv,scale:1,foot:"small",footSize:.08,mass:40,walk:.35,run:.8,turn:.8,stride:.12,sight:6,fov:3,hearing:12,smell:12,disposition:"ignore",activity:"day",diet:"litter",herd:[1,1],hp:40,voice:{base:900,kind:"click"},viewDistance:120,bodyRadius:.3}},Bv={ooyanma:{id:"ooyanma",name:"オオヤンマ",kana:"おおやんま",motif:"メガネウラ（石炭紀の巨大なトンボのなかま）",fossil:"翅を広げると70cm近くになる、古生代の巨大な昆虫。現在のトンボの遠い親戚にあたる。",varuna:"晴れた日の水辺を飛び、水面すれすれで小さな虫を捕らえる。オオヤンマの飛ぶ場所には、必ず水がある。",role:"水辺の目印。",researchType:"簡易型",obs:["seen","fly"]},yoroiuo:{id:"yoroiuo",name:"ヨロイウオ",kana:"よろいうお",motif:"ボトリオレピス（板皮類）",fossil:"頭と胸を骨の板で覆った、デボン紀の魚のなかま。胸びれも骨の筒で覆われていた。",varuna:"大河の底を群れで泳ぐ。群れの向きで、川の流れの速さが分かる。",role:"川の生き物の目印。",researchType:"簡易型",obs:["seen"]},hotaru:{id:"hotaru",name:"ホタルゴケムシ",kana:"ほたるごけむし",motif:"創作（発光する甲虫のなかまを参考にした架空種）",fossil:"（化石の記録に基づかない、ヴァルナ独自の生物）",varuna:"夜の草海と樹海の縁で、緑の光を点滅させて飛ぶ。群れる場所の近くには水がある。",role:"夜の光。",researchType:"夜行型",obs:["seen"]}},kv=["sorakubi","kazeashi","kusagari","himeyoroi","kagewatari","honetsutsuki","tsuchinezumi","suikaku","ooagito","nedamari","ooyanma","yoroiuo","hotaru"];export{Ot as $,Ca as A,le as B,at as C,Xe as D,lv as E,Wt as F,xe as G,xn as H,Ne as I,Ga as J,Jt as K,Bc as L,At as M,zn as N,ja as O,Hn as P,Nv as Q,Sv as R,Be as S,wv as T,Xf as U,mt as V,gn as W,zv as X,Or as Y,fx as Z,Pv as _,Oe as a,Cv as a0,on as a1,Fn as a2,Ce as a3,dx as a4,Iv as a5,ur as a6,Ev as a7,Dv as a8,rv as a9,Es as aa,bv as ab,Fe as ac,Bv as ad,Ov as ae,bn as af,Lv as ag,Ue as ah,kv as ai,Av as aj,_v as ak,Mv as al,ln as am,Tv as an,Nr as ao,Qn as ap,yv as aq,Jf as b,Zf as c,re as d,ue as e,kc as f,Hc as g,Vc as h,Wc as i,Gc as j,L as k,Ve as l,Ka as m,ui as n,pn as o,De as p,be as q,we as r,ah as s,en as t,lx as u,Rv as v,cx as w,rn as x,Uv as y,Fv as z};
