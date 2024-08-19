javascript:(async ()=>{
if (!window._my_custom_methods) window._my_custom_methods = {};
/* minified and bundled pako for gzip functionality */;
if (!window._my_custom_methods.hasOwnProperty("compressAndBase64Encode")) (()=>{function he(e){let i=e.length;for(;--i>=0;)e[i]=0}var Ki=0,fi=1,Pi=2,Xi=3,Yi=258,wt=29,Re=256,ve=Re+1+wt,fe=30,bt=19,oi=2*ve+1,Q=15,Ye=16,Gi=7,gt=256,_i=16,hi=17,di=18,lt=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),Fe=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),ji=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),si=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Wi=512,P=new Array((ve+2)*2);he(P);var ge=new Array(fe*2);he(ge);var ke=new Array(Wi);he(ke);var Ee=new Array(Yi-Xi+1);he(Ee);var pt=new Array(wt);he(pt);var Me=new Array(fe);he(Me);function Ge(e,i,t,n,r){this.static_tree=e,this.extra_bits=i,this.extra_base=t,this.elems=n,this.max_length=r,this.has_stree=e&&e.length}var ci,ui,wi;function je(e,i){this.dyn_tree=e,this.max_code=0,this.stat_desc=i}var bi=e=>e<256?ke[e]:ke[256+(e>>>7)],me=(e,i)=>{e.pending_buf[e.pending++]=i&255,e.pending_buf[e.pending++]=i>>>8&255},N=(e,i,t)=>{e.bi_valid>Ye-t?(e.bi_buf|=i<<e.bi_valid&65535,me(e,e.bi_buf),e.bi_buf=i>>Ye-e.bi_valid,e.bi_valid+=t-Ye):(e.bi_buf|=i<<e.bi_valid&65535,e.bi_valid+=t)},M=(e,i,t)=>{N(e,t[i*2],t[i*2+1])},gi=(e,i)=>{let t=0;do t|=e&1,e>>>=1,t<<=1;while(--i>0);return t>>>1},Vi=e=>{e.bi_valid===16?(me(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):e.bi_valid>=8&&(e.pending_buf[e.pending++]=e.bi_buf&255,e.bi_buf>>=8,e.bi_valid-=8)},Ji=(e,i)=>{let t=i.dyn_tree,n=i.max_code,r=i.stat_desc.static_tree,a=i.stat_desc.has_stree,o=i.stat_desc.extra_bits,f=i.stat_desc.extra_base,c=i.stat_desc.max_length,l,_,m,s,h,u,T=0;for(s=0;s<=Q;s++)e.bl_count[s]=0;for(t[e.heap[e.heap_max]*2+1]=0,l=e.heap_max+1;l<oi;l++)_=e.heap[l],s=t[t[_*2+1]*2+1]+1,s>c&&(s=c,T++),t[_*2+1]=s,!(_>n)&&(e.bl_count[s]++,h=0,_>=f&&(h=o[_-f]),u=t[_*2],e.opt_len+=u*(s+h),a&&(e.static_len+=u*(r[_*2+1]+h)));if(T!==0){do{for(s=c-1;e.bl_count[s]===0;)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[c]--,T-=2}while(T>0);for(s=c;s!==0;s--)for(_=e.bl_count[s];_!==0;)m=e.heap[--l],!(m>n)&&(t[m*2+1]!==s&&(e.opt_len+=(s-t[m*2+1])*t[m*2],t[m*2+1]=s),_--)}},pi=(e,i,t)=>{let n=new Array(Q+1),r=0,a,o;for(a=1;a<=Q;a++)r=r+t[a-1]<<1,n[a]=r;for(o=0;o<=i;o++){let f=e[o*2+1];f!==0&&(e[o*2]=gi(n[f]++,f))}},Qi=()=>{let e,i,t,n,r,a=new Array(Q+1);for(t=0,n=0;n<wt-1;n++)for(pt[n]=t,e=0;e<1<<lt[n];e++)Ee[t++]=n;for(Ee[t-1]=n,r=0,n=0;n<16;n++)for(Me[n]=r,e=0;e<1<<Fe[n];e++)ke[r++]=n;for(r>>=7;n<fe;n++)for(Me[n]=r<<7,e=0;e<1<<Fe[n]-7;e++)ke[256+r++]=n;for(i=0;i<=Q;i++)a[i]=0;for(e=0;e<=143;)P[e*2+1]=8,e++,a[8]++;for(;e<=255;)P[e*2+1]=9,e++,a[9]++;for(;e<=279;)P[e*2+1]=7,e++,a[7]++;for(;e<=287;)P[e*2+1]=8,e++,a[8]++;for(pi(P,ve+1,a),e=0;e<fe;e++)ge[e*2+1]=5,ge[e*2]=gi(e,5);ci=new Ge(P,lt,Re+1,ve,Q),ui=new Ge(ge,Fe,0,fe,Q),wi=new Ge(new Array(0),ji,0,bt,Gi)},xi=e=>{let i;for(i=0;i<ve;i++)e.dyn_ltree[i*2]=0;for(i=0;i<fe;i++)e.dyn_dtree[i*2]=0;for(i=0;i<bt;i++)e.bl_tree[i*2]=0;e.dyn_ltree[gt*2]=1,e.opt_len=e.static_len=0,e.sym_next=e.matches=0},vi=e=>{e.bi_valid>8?me(e,e.bi_buf):e.bi_valid>0&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0},mt=(e,i,t,n)=>{let r=i*2,a=t*2;return e[r]<e[a]||e[r]===e[a]&&n[i]<=n[t]},We=(e,i,t)=>{let n=e.heap[t],r=t<<1;for(;r<=e.heap_len&&(r<e.heap_len&&mt(i,e.heap[r+1],e.heap[r],e.depth)&&r++,!mt(i,n,e.heap[r],e.depth));)e.heap[t]=e.heap[r],t=r,r<<=1;e.heap[t]=n},yt=(e,i,t)=>{let n,r,a=0,o,f;if(e.sym_next!==0)do n=e.pending_buf[e.sym_buf+a++]&255,n+=(e.pending_buf[e.sym_buf+a++]&255)<<8,r=e.pending_buf[e.sym_buf+a++],n===0?M(e,r,i):(o=Ee[r],M(e,o+Re+1,i),f=lt[o],f!==0&&(r-=pt[o],N(e,r,f)),n--,o=bi(n),M(e,o,t),f=Fe[o],f!==0&&(n-=Me[o],N(e,n,f)));while(a<e.sym_next);M(e,gt,i)},ft=(e,i)=>{let t=i.dyn_tree,n=i.stat_desc.static_tree,r=i.stat_desc.has_stree,a=i.stat_desc.elems,o,f,c=-1,l;for(e.heap_len=0,e.heap_max=oi,o=0;o<a;o++)t[o*2]!==0?(e.heap[++e.heap_len]=c=o,e.depth[o]=0):t[o*2+1]=0;for(;e.heap_len<2;)l=e.heap[++e.heap_len]=c<2?++c:0,t[l*2]=1,e.depth[l]=0,e.opt_len--,r&&(e.static_len-=n[l*2+1]);for(i.max_code=c,o=e.heap_len>>1;o>=1;o--)We(e,t,o);l=a;do o=e.heap[1],e.heap[1]=e.heap[e.heap_len--],We(e,t,1),f=e.heap[1],e.heap[--e.heap_max]=o,e.heap[--e.heap_max]=f,t[l*2]=t[o*2]+t[f*2],e.depth[l]=(e.depth[o]>=e.depth[f]?e.depth[o]:e.depth[f])+1,t[o*2+1]=t[f*2+1]=l,e.heap[1]=l++,We(e,t,1);while(e.heap_len>=2);e.heap[--e.heap_max]=e.heap[1],Ji(e,i),pi(t,c,e.bl_count)},zt=(e,i,t)=>{let n,r=-1,a,o=i[0*2+1],f=0,c=7,l=4;for(o===0&&(c=138,l=3),i[(t+1)*2+1]=65535,n=0;n<=t;n++)a=o,o=i[(n+1)*2+1],!(++f<c&&a===o)&&(f<l?e.bl_tree[a*2]+=f:a!==0?(a!==r&&e.bl_tree[a*2]++,e.bl_tree[_i*2]++):f<=10?e.bl_tree[hi*2]++:e.bl_tree[di*2]++,f=0,r=a,o===0?(c=138,l=3):a===o?(c=6,l=3):(c=7,l=4))},St=(e,i,t)=>{let n,r=-1,a,o=i[0*2+1],f=0,c=7,l=4;for(o===0&&(c=138,l=3),n=0;n<=t;n++)if(a=o,o=i[(n+1)*2+1],!(++f<c&&a===o)){if(f<l)do M(e,a,e.bl_tree);while(--f!==0);else a!==0?(a!==r&&(M(e,a,e.bl_tree),f--),M(e,_i,e.bl_tree),N(e,f-3,2)):f<=10?(M(e,hi,e.bl_tree),N(e,f-3,3)):(M(e,di,e.bl_tree),N(e,f-11,7));f=0,r=a,o===0?(c=138,l=3):a===o?(c=6,l=3):(c=7,l=4)}},qi=e=>{let i;for(zt(e,e.dyn_ltree,e.l_desc.max_code),zt(e,e.dyn_dtree,e.d_desc.max_code),ft(e,e.bl_desc),i=bt-1;i>=3&&e.bl_tree[si[i]*2+1]===0;i--);return e.opt_len+=3*(i+1)+5+5+4,i},en=(e,i,t,n)=>{let r;for(N(e,i-257,5),N(e,t-1,5),N(e,n-4,4),r=0;r<n;r++)N(e,e.bl_tree[si[r]*2+1],3);St(e,e.dyn_ltree,i-1),St(e,e.dyn_dtree,t-1)},tn=e=>{let i=4093624447,t;for(t=0;t<=31;t++,i>>>=1)if(i&1&&e.dyn_ltree[t*2]!==0)return 0;if(e.dyn_ltree[9*2]!==0||e.dyn_ltree[10*2]!==0||e.dyn_ltree[13*2]!==0)return 1;for(t=32;t<Re;t++)if(e.dyn_ltree[t*2]!==0)return 1;return 0},At=!1,nn=e=>{At||(Qi(),At=!0),e.l_desc=new je(e.dyn_ltree,ci),e.d_desc=new je(e.dyn_dtree,ui),e.bl_desc=new je(e.bl_tree,wi),e.bi_buf=0,e.bi_valid=0,xi(e)},ki=(e,i,t,n)=>{N(e,(Ki<<1)+(n?1:0),3),vi(e),me(e,t),me(e,~t),t&&e.pending_buf.set(e.window.subarray(i,i+t),e.pending),e.pending+=t},an=e=>{N(e,fi<<1,3),M(e,gt,P),Vi(e)},rn=(e,i,t,n)=>{let r,a,o=0;e.level>0?(e.strm.data_type===2&&(e.strm.data_type=tn(e)),ft(e,e.l_desc),ft(e,e.d_desc),o=qi(e),r=e.opt_len+3+7>>>3,a=e.static_len+3+7>>>3,a<=r&&(r=a)):r=a=t+5,t+4<=r&&i!==-1?ki(e,i,t,n):e.strategy===4||a===r?(N(e,(fi<<1)+(n?1:0),3),yt(e,P,ge)):(N(e,(Pi<<1)+(n?1:0),3),en(e,e.l_desc.max_code+1,e.d_desc.max_code+1,o+1),yt(e,e.dyn_ltree,e.dyn_dtree)),xi(e),n&&vi(e)},ln=(e,i,t)=>(e.pending_buf[e.sym_buf+e.sym_next++]=i,e.pending_buf[e.sym_buf+e.sym_next++]=i>>8,e.pending_buf[e.sym_buf+e.sym_next++]=t,i===0?e.dyn_ltree[t*2]++:(e.matches++,i--,e.dyn_ltree[(Ee[t]+Re+1)*2]++,e.dyn_dtree[bi(i)*2]++),e.sym_next===e.sym_end),fn=nn,on=ki,_n=rn,hn=ln,dn=an,sn={_tr_init:fn,_tr_stored_block:on,_tr_flush_block:_n,_tr_tally:hn,_tr_align:dn},cn=(e,i,t,n)=>{let r=e&65535|0,a=e>>>16&65535|0,o=0;for(;t!==0;){o=t>2e3?2e3:t,t-=o;do r=r+i[n++]|0,a=a+r|0;while(--o);r%=65521,a%=65521}return r|a<<16|0},ye=cn,un=()=>{let e,i=[];for(var t=0;t<256;t++){e=t;for(var n=0;n<8;n++)e=e&1?3988292384^e>>>1:e>>>1;i[t]=e}return i},wn=new Uint32Array(un()),bn=(e,i,t,n)=>{let r=wn,a=n+t;e^=-1;for(let o=n;o<a;o++)e=e>>>8^r[(e^i[o])&255];return e^-1},Z=bn,te={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},de={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8},{_tr_init:gn,_tr_stored_block:ot,_tr_flush_block:pn,_tr_tally:j,_tr_align:xn}=sn,{Z_NO_FLUSH:W,Z_PARTIAL_FLUSH:vn,Z_FULL_FLUSH:kn,Z_FINISH:C,Z_BLOCK:Rt,Z_OK:I,Z_STREAM_END:Tt,Z_STREAM_ERROR:H,Z_DATA_ERROR:En,Z_BUF_ERROR:Ve,Z_DEFAULT_COMPRESSION:mn,Z_FILTERED:yn,Z_HUFFMAN_ONLY:Ne,Z_RLE:zn,Z_FIXED:Sn,Z_DEFAULT_STRATEGY:An,Z_UNKNOWN:Rn,Z_DEFLATED:Ke}=de,Tn=9,Dn=15,Zn=8,In=29,On=256,_t=On+1+In,Nn=30,Ln=19,Un=2*_t+1,Cn=15,v=3,G=258,B=G+v+1,$n=32,oe=42,xt=57,ht=69,dt=73,st=91,ct=103,q=113,we=666,O=1,se=2,ie=3,ce=4,Fn=3,ee=(e,i)=>(e.msg=te[i],i),Dt=e=>e*2-(e>4?9:0),Y=e=>{let i=e.length;for(;--i>=0;)e[i]=0},Mn=e=>{let i,t,n,r=e.w_size;i=e.hash_size,n=i;do t=e.head[--n],e.head[n]=t>=r?t-r:0;while(--i);i=r,n=i;do t=e.prev[--n],e.prev[n]=t>=r?t-r:0;while(--i)},Hn=(e,i,t)=>(i<<e.hash_shift^t)&e.hash_mask,V=Hn,L=e=>{let i=e.state,t=i.pending;t>e.avail_out&&(t=e.avail_out),t!==0&&(e.output.set(i.pending_buf.subarray(i.pending_out,i.pending_out+t),e.next_out),e.next_out+=t,i.pending_out+=t,e.total_out+=t,e.avail_out-=t,i.pending-=t,i.pending===0&&(i.pending_out=0))},U=(e,i)=>{pn(e,e.block_start>=0?e.block_start:-1,e.strstart-e.block_start,i),e.block_start=e.strstart,L(e.strm)},z=(e,i)=>{e.pending_buf[e.pending++]=i},ue=(e,i)=>{e.pending_buf[e.pending++]=i>>>8&255,e.pending_buf[e.pending++]=i&255},ut=(e,i,t,n)=>{let r=e.avail_in;return r>n&&(r=n),r===0?0:(e.avail_in-=r,i.set(e.input.subarray(e.next_in,e.next_in+r),t),e.state.wrap===1?e.adler=ye(e.adler,i,r,t):e.state.wrap===2&&(e.adler=Z(e.adler,i,r,t)),e.next_in+=r,e.total_in+=r,r)},Ei=(e,i)=>{let t=e.max_chain_length,n=e.strstart,r,a,o=e.prev_length,f=e.nice_match,c=e.strstart>e.w_size-B?e.strstart-(e.w_size-B):0,l=e.window,_=e.w_mask,m=e.prev,s=e.strstart+G,h=l[n+o-1],u=l[n+o];e.prev_length>=e.good_match&&(t>>=2),f>e.lookahead&&(f=e.lookahead);do if(r=i,!(l[r+o]!==u||l[r+o-1]!==h||l[r]!==l[n]||l[++r]!==l[n+1])){n+=2,r++;do;while(l[++n]===l[++r]&&l[++n]===l[++r]&&l[++n]===l[++r]&&l[++n]===l[++r]&&l[++n]===l[++r]&&l[++n]===l[++r]&&l[++n]===l[++r]&&l[++n]===l[++r]&&n<s);if(a=G-(s-n),n=s-G,a>o){if(e.match_start=i,o=a,a>=f)break;h=l[n+o-1],u=l[n+o]}}while((i=m[i&_])>c&&--t!==0);return o<=e.lookahead?o:e.lookahead},_e=e=>{let i=e.w_size,t,n,r;do{if(n=e.window_size-e.lookahead-e.strstart,e.strstart>=i+(i-B)&&(e.window.set(e.window.subarray(i,i+i-n),0),e.match_start-=i,e.strstart-=i,e.block_start-=i,e.insert>e.strstart&&(e.insert=e.strstart),Mn(e),n+=i),e.strm.avail_in===0)break;if(t=ut(e.strm,e.window,e.strstart+e.lookahead,n),e.lookahead+=t,e.lookahead+e.insert>=v)for(r=e.strstart-e.insert,e.ins_h=e.window[r],e.ins_h=V(e,e.ins_h,e.window[r+1]);e.insert&&(e.ins_h=V(e,e.ins_h,e.window[r+v-1]),e.prev[r&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=r,r++,e.insert--,!(e.lookahead+e.insert<v)););}while(e.lookahead<B&&e.strm.avail_in!==0)},mi=(e,i)=>{let t=e.pending_buf_size-5>e.w_size?e.w_size:e.pending_buf_size-5,n,r,a,o=0,f=e.strm.avail_in;do{if(n=65535,a=e.bi_valid+42>>3,e.strm.avail_out<a||(a=e.strm.avail_out-a,r=e.strstart-e.block_start,n>r+e.strm.avail_in&&(n=r+e.strm.avail_in),n>a&&(n=a),n<t&&(n===0&&i!==C||i===W||n!==r+e.strm.avail_in)))break;o=i===C&&n===r+e.strm.avail_in?1:0,ot(e,0,0,o),e.pending_buf[e.pending-4]=n,e.pending_buf[e.pending-3]=n>>8,e.pending_buf[e.pending-2]=~n,e.pending_buf[e.pending-1]=~n>>8,L(e.strm),r&&(r>n&&(r=n),e.strm.output.set(e.window.subarray(e.block_start,e.block_start+r),e.strm.next_out),e.strm.next_out+=r,e.strm.avail_out-=r,e.strm.total_out+=r,e.block_start+=r,n-=r),n&&(ut(e.strm,e.strm.output,e.strm.next_out,n),e.strm.next_out+=n,e.strm.avail_out-=n,e.strm.total_out+=n)}while(o===0);return f-=e.strm.avail_in,f&&(f>=e.w_size?(e.matches=2,e.window.set(e.strm.input.subarray(e.strm.next_in-e.w_size,e.strm.next_in),0),e.strstart=e.w_size,e.insert=e.strstart):(e.window_size-e.strstart<=f&&(e.strstart-=e.w_size,e.window.set(e.window.subarray(e.w_size,e.w_size+e.strstart),0),e.matches<2&&e.matches++,e.insert>e.strstart&&(e.insert=e.strstart)),e.window.set(e.strm.input.subarray(e.strm.next_in-f,e.strm.next_in),e.strstart),e.strstart+=f,e.insert+=f>e.w_size-e.insert?e.w_size-e.insert:f),e.block_start=e.strstart),e.high_water<e.strstart&&(e.high_water=e.strstart),o?ce:i!==W&&i!==C&&e.strm.avail_in===0&&e.strstart===e.block_start?se:(a=e.window_size-e.strstart,e.strm.avail_in>a&&e.block_start>=e.w_size&&(e.block_start-=e.w_size,e.strstart-=e.w_size,e.window.set(e.window.subarray(e.w_size,e.w_size+e.strstart),0),e.matches<2&&e.matches++,a+=e.w_size,e.insert>e.strstart&&(e.insert=e.strstart)),a>e.strm.avail_in&&(a=e.strm.avail_in),a&&(ut(e.strm,e.window,e.strstart,a),e.strstart+=a,e.insert+=a>e.w_size-e.insert?e.w_size-e.insert:a),e.high_water<e.strstart&&(e.high_water=e.strstart),a=e.bi_valid+42>>3,a=e.pending_buf_size-a>65535?65535:e.pending_buf_size-a,t=a>e.w_size?e.w_size:a,r=e.strstart-e.block_start,(r>=t||(r||i===C)&&i!==W&&e.strm.avail_in===0&&r<=a)&&(n=r>a?a:r,o=i===C&&e.strm.avail_in===0&&n===r?1:0,ot(e,e.block_start,n,o),e.block_start+=n,L(e.strm)),o?ie:O)},Je=(e,i)=>{let t,n;for(;;){if(e.lookahead<B){if(_e(e),e.lookahead<B&&i===W)return O;if(e.lookahead===0)break}if(t=0,e.lookahead>=v&&(e.ins_h=V(e,e.ins_h,e.window[e.strstart+v-1]),t=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),t!==0&&e.strstart-t<=e.w_size-B&&(e.match_length=Ei(e,t)),e.match_length>=v)if(n=j(e,e.strstart-e.match_start,e.match_length-v),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=v){e.match_length--;do e.strstart++,e.ins_h=V(e,e.ins_h,e.window[e.strstart+v-1]),t=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart;while(--e.match_length!==0);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=V(e,e.ins_h,e.window[e.strstart+1]);else n=j(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(U(e,!1),e.strm.avail_out===0))return O}return e.insert=e.strstart<v-1?e.strstart:v-1,i===C?(U(e,!0),e.strm.avail_out===0?ie:ce):e.sym_next&&(U(e,!1),e.strm.avail_out===0)?O:se},re=(e,i)=>{let t,n,r;for(;;){if(e.lookahead<B){if(_e(e),e.lookahead<B&&i===W)return O;if(e.lookahead===0)break}if(t=0,e.lookahead>=v&&(e.ins_h=V(e,e.ins_h,e.window[e.strstart+v-1]),t=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=v-1,t!==0&&e.prev_length<e.max_lazy_match&&e.strstart-t<=e.w_size-B&&(e.match_length=Ei(e,t),e.match_length<=5&&(e.strategy===yn||e.match_length===v&&e.strstart-e.match_start>4096)&&(e.match_length=v-1)),e.prev_length>=v&&e.match_length<=e.prev_length){r=e.strstart+e.lookahead-v,n=j(e,e.strstart-1-e.prev_match,e.prev_length-v),e.lookahead-=e.prev_length-1,e.prev_length-=2;do++e.strstart<=r&&(e.ins_h=V(e,e.ins_h,e.window[e.strstart+v-1]),t=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart);while(--e.prev_length!==0);if(e.match_available=0,e.match_length=v-1,e.strstart++,n&&(U(e,!1),e.strm.avail_out===0))return O}else if(e.match_available){if(n=j(e,0,e.window[e.strstart-1]),n&&U(e,!1),e.strstart++,e.lookahead--,e.strm.avail_out===0)return O}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=j(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<v-1?e.strstart:v-1,i===C?(U(e,!0),e.strm.avail_out===0?ie:ce):e.sym_next&&(U(e,!1),e.strm.avail_out===0)?O:se},Bn=(e,i)=>{let t,n,r,a,o=e.window;for(;;){if(e.lookahead<=G){if(_e(e),e.lookahead<=G&&i===W)return O;if(e.lookahead===0)break}if(e.match_length=0,e.lookahead>=v&&e.strstart>0&&(r=e.strstart-1,n=o[r],n===o[++r]&&n===o[++r]&&n===o[++r])){a=e.strstart+G;do;while(n===o[++r]&&n===o[++r]&&n===o[++r]&&n===o[++r]&&n===o[++r]&&n===o[++r]&&n===o[++r]&&n===o[++r]&&r<a);e.match_length=G-(a-r),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=v?(t=j(e,1,e.match_length-v),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(t=j(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),t&&(U(e,!1),e.strm.avail_out===0))return O}return e.insert=0,i===C?(U(e,!0),e.strm.avail_out===0?ie:ce):e.sym_next&&(U(e,!1),e.strm.avail_out===0)?O:se},Kn=(e,i)=>{let t;for(;;){if(e.lookahead===0&&(_e(e),e.lookahead===0)){if(i===W)return O;break}if(e.match_length=0,t=j(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,t&&(U(e,!1),e.strm.avail_out===0))return O}return e.insert=0,i===C?(U(e,!0),e.strm.avail_out===0?ie:ce):e.sym_next&&(U(e,!1),e.strm.avail_out===0)?O:se};function F(e,i,t,n,r){this.good_length=e,this.max_lazy=i,this.nice_length=t,this.max_chain=n,this.func=r}var be=[new F(0,0,0,0,mi),new F(4,4,8,4,Je),new F(4,5,16,8,Je),new F(4,6,32,32,Je),new F(4,4,16,16,re),new F(8,16,32,32,re),new F(8,16,128,128,re),new F(8,32,128,256,re),new F(32,128,258,1024,re),new F(32,258,258,4096,re)],Pn=e=>{e.window_size=2*e.w_size,Y(e.head),e.max_lazy_match=be[e.level].max_lazy,e.good_match=be[e.level].good_length,e.nice_match=be[e.level].nice_length,e.max_chain_length=be[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=v-1,e.match_available=0,e.ins_h=0};function Xn(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=Ke,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(Un*2),this.dyn_dtree=new Uint16Array((2*Nn+1)*2),this.bl_tree=new Uint16Array((2*Ln+1)*2),Y(this.dyn_ltree),Y(this.dyn_dtree),Y(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(Cn+1),this.heap=new Uint16Array(2*_t+1),Y(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(2*_t+1),Y(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}var Te=e=>{if(!e)return 1;let i=e.state;return!i||i.strm!==e||i.status!==oe&&i.status!==xt&&i.status!==ht&&i.status!==dt&&i.status!==st&&i.status!==ct&&i.status!==q&&i.status!==we?1:0},yi=e=>{if(Te(e))return ee(e,H);e.total_in=e.total_out=0,e.data_type=Rn;let i=e.state;return i.pending=0,i.pending_out=0,i.wrap<0&&(i.wrap=-i.wrap),i.status=i.wrap===2?xt:i.wrap?oe:q,e.adler=i.wrap===2?0:1,i.last_flush=-2,gn(i),I},zi=e=>{let i=yi(e);return i===I&&Pn(e.state),i},Yn=(e,i)=>Te(e)||e.state.wrap!==2?H:(e.state.gzhead=i,I),Si=(e,i,t,n,r,a)=>{if(!e)return H;let o=1;if(i===mn&&(i=6),n<0?(o=0,n=-n):n>15&&(o=2,n-=16),r<1||r>Tn||t!==Ke||n<8||n>15||i<0||i>9||a<0||a>Sn||n===8&&o!==1)return ee(e,H);n===8&&(n=9);let f=new Xn;return e.state=f,f.strm=e,f.status=oe,f.wrap=o,f.gzhead=null,f.w_bits=n,f.w_size=1<<f.w_bits,f.w_mask=f.w_size-1,f.hash_bits=r+7,f.hash_size=1<<f.hash_bits,f.hash_mask=f.hash_size-1,f.hash_shift=~~((f.hash_bits+v-1)/v),f.window=new Uint8Array(f.w_size*2),f.head=new Uint16Array(f.hash_size),f.prev=new Uint16Array(f.w_size),f.lit_bufsize=1<<r+6,f.pending_buf_size=f.lit_bufsize*4,f.pending_buf=new Uint8Array(f.pending_buf_size),f.sym_buf=f.lit_bufsize,f.sym_end=(f.lit_bufsize-1)*3,f.level=i,f.strategy=a,f.method=t,zi(e)},Gn=(e,i)=>Si(e,i,Ke,Dn,Zn,An),jn=(e,i)=>{if(Te(e)||i>Rt||i<0)return e?ee(e,H):H;let t=e.state;if(!e.output||e.avail_in!==0&&!e.input||t.status===we&&i!==C)return ee(e,e.avail_out===0?Ve:H);let n=t.last_flush;if(t.last_flush=i,t.pending!==0){if(L(e),e.avail_out===0)return t.last_flush=-1,I}else if(e.avail_in===0&&Dt(i)<=Dt(n)&&i!==C)return ee(e,Ve);if(t.status===we&&e.avail_in!==0)return ee(e,Ve);if(t.status===oe&&t.wrap===0&&(t.status=q),t.status===oe){let r=Ke+(t.w_bits-8<<4)<<8,a=-1;if(t.strategy>=Ne||t.level<2?a=0:t.level<6?a=1:t.level===6?a=2:a=3,r|=a<<6,t.strstart!==0&&(r|=$n),r+=31-r%31,ue(t,r),t.strstart!==0&&(ue(t,e.adler>>>16),ue(t,e.adler&65535)),e.adler=1,t.status=q,L(e),t.pending!==0)return t.last_flush=-1,I}if(t.status===xt){if(e.adler=0,z(t,31),z(t,139),z(t,8),t.gzhead)z(t,(t.gzhead.text?1:0)+(t.gzhead.hcrc?2:0)+(t.gzhead.extra?4:0)+(t.gzhead.name?8:0)+(t.gzhead.comment?16:0)),z(t,t.gzhead.time&255),z(t,t.gzhead.time>>8&255),z(t,t.gzhead.time>>16&255),z(t,t.gzhead.time>>24&255),z(t,t.level===9?2:t.strategy>=Ne||t.level<2?4:0),z(t,t.gzhead.os&255),t.gzhead.extra&&t.gzhead.extra.length&&(z(t,t.gzhead.extra.length&255),z(t,t.gzhead.extra.length>>8&255)),t.gzhead.hcrc&&(e.adler=Z(e.adler,t.pending_buf,t.pending,0)),t.gzindex=0,t.status=ht;else if(z(t,0),z(t,0),z(t,0),z(t,0),z(t,0),z(t,t.level===9?2:t.strategy>=Ne||t.level<2?4:0),z(t,Fn),t.status=q,L(e),t.pending!==0)return t.last_flush=-1,I}if(t.status===ht){if(t.gzhead.extra){let r=t.pending,a=(t.gzhead.extra.length&65535)-t.gzindex;for(;t.pending+a>t.pending_buf_size;){let f=t.pending_buf_size-t.pending;if(t.pending_buf.set(t.gzhead.extra.subarray(t.gzindex,t.gzindex+f),t.pending),t.pending=t.pending_buf_size,t.gzhead.hcrc&&t.pending>r&&(e.adler=Z(e.adler,t.pending_buf,t.pending-r,r)),t.gzindex+=f,L(e),t.pending!==0)return t.last_flush=-1,I;r=0,a-=f}let o=new Uint8Array(t.gzhead.extra);t.pending_buf.set(o.subarray(t.gzindex,t.gzindex+a),t.pending),t.pending+=a,t.gzhead.hcrc&&t.pending>r&&(e.adler=Z(e.adler,t.pending_buf,t.pending-r,r)),t.gzindex=0}t.status=dt}if(t.status===dt){if(t.gzhead.name){let r=t.pending,a;do{if(t.pending===t.pending_buf_size){if(t.gzhead.hcrc&&t.pending>r&&(e.adler=Z(e.adler,t.pending_buf,t.pending-r,r)),L(e),t.pending!==0)return t.last_flush=-1,I;r=0}t.gzindex<t.gzhead.name.length?a=t.gzhead.name.charCodeAt(t.gzindex++)&255:a=0,z(t,a)}while(a!==0);t.gzhead.hcrc&&t.pending>r&&(e.adler=Z(e.adler,t.pending_buf,t.pending-r,r)),t.gzindex=0}t.status=st}if(t.status===st){if(t.gzhead.comment){let r=t.pending,a;do{if(t.pending===t.pending_buf_size){if(t.gzhead.hcrc&&t.pending>r&&(e.adler=Z(e.adler,t.pending_buf,t.pending-r,r)),L(e),t.pending!==0)return t.last_flush=-1,I;r=0}t.gzindex<t.gzhead.comment.length?a=t.gzhead.comment.charCodeAt(t.gzindex++)&255:a=0,z(t,a)}while(a!==0);t.gzhead.hcrc&&t.pending>r&&(e.adler=Z(e.adler,t.pending_buf,t.pending-r,r))}t.status=ct}if(t.status===ct){if(t.gzhead.hcrc){if(t.pending+2>t.pending_buf_size&&(L(e),t.pending!==0))return t.last_flush=-1,I;z(t,e.adler&255),z(t,e.adler>>8&255),e.adler=0}if(t.status=q,L(e),t.pending!==0)return t.last_flush=-1,I}if(e.avail_in!==0||t.lookahead!==0||i!==W&&t.status!==we){let r=t.level===0?mi(t,i):t.strategy===Ne?Kn(t,i):t.strategy===zn?Bn(t,i):be[t.level].func(t,i);if((r===ie||r===ce)&&(t.status=we),r===O||r===ie)return e.avail_out===0&&(t.last_flush=-1),I;if(r===se&&(i===vn?xn(t):i!==Rt&&(ot(t,0,0,!1),i===kn&&(Y(t.head),t.lookahead===0&&(t.strstart=0,t.block_start=0,t.insert=0))),L(e),e.avail_out===0))return t.last_flush=-1,I}return i!==C?I:t.wrap<=0?Tt:(t.wrap===2?(z(t,e.adler&255),z(t,e.adler>>8&255),z(t,e.adler>>16&255),z(t,e.adler>>24&255),z(t,e.total_in&255),z(t,e.total_in>>8&255),z(t,e.total_in>>16&255),z(t,e.total_in>>24&255)):(ue(t,e.adler>>>16),ue(t,e.adler&65535)),L(e),t.wrap>0&&(t.wrap=-t.wrap),t.pending!==0?I:Tt)},Wn=e=>{if(Te(e))return H;let i=e.state.status;return e.state=null,i===q?ee(e,En):I},Vn=(e,i)=>{let t=i.length;if(Te(e))return H;let n=e.state,r=n.wrap;if(r===2||r===1&&n.status!==oe||n.lookahead)return H;if(r===1&&(e.adler=ye(e.adler,i,t,0)),n.wrap=0,t>=n.w_size){r===0&&(Y(n.head),n.strstart=0,n.block_start=0,n.insert=0);let c=new Uint8Array(n.w_size);c.set(i.subarray(t-n.w_size,t),0),i=c,t=n.w_size}let a=e.avail_in,o=e.next_in,f=e.input;for(e.avail_in=t,e.next_in=0,e.input=i,_e(n);n.lookahead>=v;){let c=n.strstart,l=n.lookahead-(v-1);do n.ins_h=V(n,n.ins_h,n.window[c+v-1]),n.prev[c&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=c,c++;while(--l);n.strstart=c,n.lookahead=v-1,_e(n)}return n.strstart+=n.lookahead,n.block_start=n.strstart,n.insert=n.lookahead,n.lookahead=0,n.match_length=n.prev_length=v-1,n.match_available=0,e.next_in=o,e.input=f,e.avail_in=a,n.wrap=r,I},Jn=Gn,Qn=Si,qn=zi,ea=yi,ta=Yn,ia=jn,na=Wn,aa=Vn,ra="pako deflate (from Nodeca project)",pe={deflateInit:Jn,deflateInit2:Qn,deflateReset:qn,deflateResetKeep:ea,deflateSetHeader:ta,deflate:ia,deflateEnd:na,deflateSetDictionary:aa,deflateInfo:ra},la=(e,i)=>Object.prototype.hasOwnProperty.call(e,i),fa=function(e){let i=Array.prototype.slice.call(arguments,1);for(;i.length;){let t=i.shift();if(t){if(typeof t!="object")throw new TypeError(t+"must be non-object");for(let n in t)la(t,n)&&(e[n]=t[n])}}return e},oa=e=>{let i=0;for(let n=0,r=e.length;n<r;n++)i+=e[n].length;let t=new Uint8Array(i);for(let n=0,r=0,a=e.length;n<a;n++){let o=e[n];t.set(o,r),r+=o.length}return t},Pe={assign:fa,flattenChunks:oa},Ai=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{Ai=!1}var ze=new Uint8Array(256);for(let e=0;e<256;e++)ze[e]=e>=252?6:e>=248?5:e>=240?4:e>=224?3:e>=192?2:1;ze[254]=ze[254]=1;var _a=e=>{if(typeof TextEncoder=="function"&&TextEncoder.prototype.encode)return new TextEncoder().encode(e);let i,t,n,r,a,o=e.length,f=0;for(r=0;r<o;r++)t=e.charCodeAt(r),(t&64512)===55296&&r+1<o&&(n=e.charCodeAt(r+1),(n&64512)===56320&&(t=65536+(t-55296<<10)+(n-56320),r++)),f+=t<128?1:t<2048?2:t<65536?3:4;for(i=new Uint8Array(f),a=0,r=0;a<f;r++)t=e.charCodeAt(r),(t&64512)===55296&&r+1<o&&(n=e.charCodeAt(r+1),(n&64512)===56320&&(t=65536+(t-55296<<10)+(n-56320),r++)),t<128?i[a++]=t:t<2048?(i[a++]=192|t>>>6,i[a++]=128|t&63):t<65536?(i[a++]=224|t>>>12,i[a++]=128|t>>>6&63,i[a++]=128|t&63):(i[a++]=240|t>>>18,i[a++]=128|t>>>12&63,i[a++]=128|t>>>6&63,i[a++]=128|t&63);return i},ha=(e,i)=>{if(i<65534&&e.subarray&&Ai)return String.fromCharCode.apply(null,e.length===i?e:e.subarray(0,i));let t="";for(let n=0;n<i;n++)t+=String.fromCharCode(e[n]);return t},da=(e,i)=>{let t=i||e.length;if(typeof TextDecoder=="function"&&TextDecoder.prototype.decode)return new TextDecoder().decode(e.subarray(0,i));let n,r,a=new Array(t*2);for(r=0,n=0;n<t;){let o=e[n++];if(o<128){a[r++]=o;continue}let f=ze[o];if(f>4){a[r++]=65533,n+=f-1;continue}for(o&=f===2?31:f===3?15:7;f>1&&n<t;)o=o<<6|e[n++]&63,f--;if(f>1){a[r++]=65533;continue}o<65536?a[r++]=o:(o-=65536,a[r++]=55296|o>>10&1023,a[r++]=56320|o&1023)}return ha(a,r)},sa=(e,i)=>{i=i||e.length,i>e.length&&(i=e.length);let t=i-1;for(;t>=0&&(e[t]&192)===128;)t--;return t<0||t===0?i:t+ze[e[t]]>i?t:i},Se={string2buf:_a,buf2string:da,utf8border:sa};function ca(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}var Ri=ca,Ti=Object.prototype.toString,{Z_NO_FLUSH:ua,Z_SYNC_FLUSH:wa,Z_FULL_FLUSH:ba,Z_FINISH:ga,Z_OK:He,Z_STREAM_END:pa,Z_DEFAULT_COMPRESSION:xa,Z_DEFAULT_STRATEGY:va,Z_DEFLATED:ka}=de;function De(e){this.options=Pe.assign({level:xa,method:ka,chunkSize:16384,windowBits:15,memLevel:8,strategy:va},e||{});let i=this.options;i.raw&&i.windowBits>0?i.windowBits=-i.windowBits:i.gzip&&i.windowBits>0&&i.windowBits<16&&(i.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Ri,this.strm.avail_out=0;let t=pe.deflateInit2(this.strm,i.level,i.method,i.windowBits,i.memLevel,i.strategy);if(t!==He)throw new Error(te[t]);if(i.header&&pe.deflateSetHeader(this.strm,i.header),i.dictionary){let n;if(typeof i.dictionary=="string"?n=Se.string2buf(i.dictionary):Ti.call(i.dictionary)==="[object ArrayBuffer]"?n=new Uint8Array(i.dictionary):n=i.dictionary,t=pe.deflateSetDictionary(this.strm,n),t!==He)throw new Error(te[t]);this._dict_set=!0}}De.prototype.push=function(e,i){let t=this.strm,n=this.options.chunkSize,r,a;if(this.ended)return!1;for(i===~~i?a=i:a=i===!0?ga:ua,typeof e=="string"?t.input=Se.string2buf(e):Ti.call(e)==="[object ArrayBuffer]"?t.input=new Uint8Array(e):t.input=e,t.next_in=0,t.avail_in=t.input.length;;){if(t.avail_out===0&&(t.output=new Uint8Array(n),t.next_out=0,t.avail_out=n),(a===wa||a===ba)&&t.avail_out<=6){this.onData(t.output.subarray(0,t.next_out)),t.avail_out=0;continue}if(r=pe.deflate(t,a),r===pa)return t.next_out>0&&this.onData(t.output.subarray(0,t.next_out)),r=pe.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===He;if(t.avail_out===0){this.onData(t.output);continue}if(a>0&&t.next_out>0){this.onData(t.output.subarray(0,t.next_out)),t.avail_out=0;continue}if(t.avail_in===0)break}return!0};De.prototype.onData=function(e){this.chunks.push(e)};De.prototype.onEnd=function(e){e===He&&(this.result=Pe.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg};function vt(e,i){let t=new De(i);if(t.push(e,!0),t.err)throw t.msg||te[t.err];return t.result}function Ea(e,i){return i=i||{},i.raw=!0,vt(e,i)}function ma(e,i){return i=i||{},i.gzip=!0,vt(e,i)}var ya=De,za=vt,Sa=Ea,Aa=ma,Ra=de,Ta={Deflate:ya,deflate:za,deflateRaw:Sa,gzip:Aa,constants:Ra},Le=16209,Da=16191,Za=function(i,t){let n,r,a,o,f,c,l,_,m,s,h,u,T,k,g,S,p,d,y,D,w,A,E,b,x=i.state;n=i.next_in,E=i.input,r=n+(i.avail_in-5),a=i.next_out,b=i.output,o=a-(t-i.avail_out),f=a+(i.avail_out-257),c=x.dmax,l=x.wsize,_=x.whave,m=x.wnext,s=x.window,h=x.hold,u=x.bits,T=x.lencode,k=x.distcode,g=(1<<x.lenbits)-1,S=(1<<x.distbits)-1;e:do{u<15&&(h+=E[n++]<<u,u+=8,h+=E[n++]<<u,u+=8),p=T[h&g];t:for(;;){if(d=p>>>24,h>>>=d,u-=d,d=p>>>16&255,d===0)b[a++]=p&65535;else if(d&16){y=p&65535,d&=15,d&&(u<d&&(h+=E[n++]<<u,u+=8),y+=h&(1<<d)-1,h>>>=d,u-=d),u<15&&(h+=E[n++]<<u,u+=8,h+=E[n++]<<u,u+=8),p=k[h&S];i:for(;;){if(d=p>>>24,h>>>=d,u-=d,d=p>>>16&255,d&16){if(D=p&65535,d&=15,u<d&&(h+=E[n++]<<u,u+=8,u<d&&(h+=E[n++]<<u,u+=8)),D+=h&(1<<d)-1,D>c){i.msg="invalid distance too far back",x.mode=Le;break e}if(h>>>=d,u-=d,d=a-o,D>d){if(d=D-d,d>_&&x.sane){i.msg="invalid distance too far back",x.mode=Le;break e}if(w=0,A=s,m===0){if(w+=l-d,d<y){y-=d;do b[a++]=s[w++];while(--d);w=a-D,A=b}}else if(m<d){if(w+=l+m-d,d-=m,d<y){y-=d;do b[a++]=s[w++];while(--d);if(w=0,m<y){d=m,y-=d;do b[a++]=s[w++];while(--d);w=a-D,A=b}}}else if(w+=m-d,d<y){y-=d;do b[a++]=s[w++];while(--d);w=a-D,A=b}for(;y>2;)b[a++]=A[w++],b[a++]=A[w++],b[a++]=A[w++],y-=3;y&&(b[a++]=A[w++],y>1&&(b[a++]=A[w++]))}else{w=a-D;do b[a++]=b[w++],b[a++]=b[w++],b[a++]=b[w++],y-=3;while(y>2);y&&(b[a++]=b[w++],y>1&&(b[a++]=b[w++]))}}else if(d&64){i.msg="invalid distance code",x.mode=Le;break e}else{p=k[(p&65535)+(h&(1<<d)-1)];continue i}break}}else if(d&64)if(d&32){x.mode=Da;break e}else{i.msg="invalid literal/length code",x.mode=Le;break e}else{p=T[(p&65535)+(h&(1<<d)-1)];continue t}break}}while(n<r&&a<f);y=u>>3,n-=y,u-=y<<3,h&=(1<<u)-1,i.next_in=n,i.next_out=a,i.avail_in=n<r?5+(r-n):5-(n-r),i.avail_out=a<f?257+(f-a):257-(a-f),x.hold=h,x.bits=u},le=15,Zt=852,It=592,Ot=0,Qe=1,Nt=2,Ia=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),Oa=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),Na=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),La=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]),Ua=(e,i,t,n,r,a,o,f)=>{let c=f.bits,l=0,_=0,m=0,s=0,h=0,u=0,T=0,k=0,g=0,S=0,p,d,y,D,w,A=null,E,b=new Uint16Array(le+1),x=new Uint16Array(le+1),J=null,Et,Ie,Oe;for(l=0;l<=le;l++)b[l]=0;for(_=0;_<n;_++)b[i[t+_]]++;for(h=c,s=le;s>=1&&b[s]===0;s--);if(h>s&&(h=s),s===0)return r[a++]=1<<24|64<<16|0,r[a++]=1<<24|64<<16|0,f.bits=1,0;for(m=1;m<s&&b[m]===0;m++);for(h<m&&(h=m),k=1,l=1;l<=le;l++)if(k<<=1,k-=b[l],k<0)return-1;if(k>0&&(e===Ot||s!==1))return-1;for(x[1]=0,l=1;l<le;l++)x[l+1]=x[l]+b[l];for(_=0;_<n;_++)i[t+_]!==0&&(o[x[i[t+_]]++]=_);if(e===Ot?(A=J=o,E=20):e===Qe?(A=Ia,J=Oa,E=257):(A=Na,J=La,E=0),S=0,_=0,l=m,w=a,u=h,T=0,y=-1,g=1<<h,D=g-1,e===Qe&&g>Zt||e===Nt&&g>It)return 1;for(;;){Et=l-T,o[_]+1<E?(Ie=0,Oe=o[_]):o[_]>=E?(Ie=J[o[_]-E],Oe=A[o[_]-E]):(Ie=96,Oe=0),p=1<<l-T,d=1<<u,m=d;do d-=p,r[w+(S>>T)+d]=Et<<24|Ie<<16|Oe|0;while(d!==0);for(p=1<<l-1;S&p;)p>>=1;if(p!==0?(S&=p-1,S+=p):S=0,_++,--b[l]===0){if(l===s)break;l=i[t+o[_]]}if(l>h&&(S&D)!==y){for(T===0&&(T=h),w+=m,u=l-T,k=1<<u;u+T<s&&(k-=b[u+T],!(k<=0));)u++,k<<=1;if(g+=1<<u,e===Qe&&g>Zt||e===Nt&&g>It)return 1;y=S&D,r[y]=h<<24|u<<16|w-a|0}}return S!==0&&(r[w+S]=l-T<<24|64<<16|0),f.bits=h,0},xe=Ua,Ca=0,Di=1,Zi=2,{Z_FINISH:Lt,Z_BLOCK:$a,Z_TREES:Ue,Z_OK:ne,Z_STREAM_END:Fa,Z_NEED_DICT:Ma,Z_STREAM_ERROR:$,Z_DATA_ERROR:Ii,Z_MEM_ERROR:Oi,Z_BUF_ERROR:Ha,Z_DEFLATED:Ut}=de,Xe=16180,Ct=16181,$t=16182,Ft=16183,Mt=16184,Ht=16185,Bt=16186,Kt=16187,Pt=16188,Xt=16189,Be=16190,K=16191,qe=16192,Yt=16193,et=16194,Gt=16195,jt=16196,Wt=16197,Vt=16198,Ce=16199,$e=16200,Jt=16201,Qt=16202,qt=16203,ei=16204,ti=16205,tt=16206,ii=16207,ni=16208,R=16209,Ni=16210,Li=16211,Ba=852,Ka=592,Pa=15,Xa=Pa,ai=e=>(e>>>24&255)+(e>>>8&65280)+((e&65280)<<8)+((e&255)<<24);function Ya(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}var ae=e=>{if(!e)return 1;let i=e.state;return!i||i.strm!==e||i.mode<Xe||i.mode>Li?1:0},Ui=e=>{if(ae(e))return $;let i=e.state;return e.total_in=e.total_out=i.total=0,e.msg="",i.wrap&&(e.adler=i.wrap&1),i.mode=Xe,i.last=0,i.havedict=0,i.flags=-1,i.dmax=32768,i.head=null,i.hold=0,i.bits=0,i.lencode=i.lendyn=new Int32Array(Ba),i.distcode=i.distdyn=new Int32Array(Ka),i.sane=1,i.back=-1,ne},Ci=e=>{if(ae(e))return $;let i=e.state;return i.wsize=0,i.whave=0,i.wnext=0,Ui(e)},$i=(e,i)=>{let t;if(ae(e))return $;let n=e.state;return i<0?(t=0,i=-i):(t=(i>>4)+5,i<48&&(i&=15)),i&&(i<8||i>15)?$:(n.window!==null&&n.wbits!==i&&(n.window=null),n.wrap=t,n.wbits=i,Ci(e))},Fi=(e,i)=>{if(!e)return $;let t=new Ya;e.state=t,t.strm=e,t.window=null,t.mode=Xe;let n=$i(e,i);return n!==ne&&(e.state=null),n},Ga=e=>Fi(e,Xa),ri=!0,it,nt,ja=e=>{if(ri){it=new Int32Array(512),nt=new Int32Array(32);let i=0;for(;i<144;)e.lens[i++]=8;for(;i<256;)e.lens[i++]=9;for(;i<280;)e.lens[i++]=7;for(;i<288;)e.lens[i++]=8;for(xe(Di,e.lens,0,288,it,0,e.work,{bits:9}),i=0;i<32;)e.lens[i++]=5;xe(Zi,e.lens,0,32,nt,0,e.work,{bits:5}),ri=!1}e.lencode=it,e.lenbits=9,e.distcode=nt,e.distbits=5},Mi=(e,i,t,n)=>{let r,a=e.state;return a.window===null&&(a.wsize=1<<a.wbits,a.wnext=0,a.whave=0,a.window=new Uint8Array(a.wsize)),n>=a.wsize?(a.window.set(i.subarray(t-a.wsize,t),0),a.wnext=0,a.whave=a.wsize):(r=a.wsize-a.wnext,r>n&&(r=n),a.window.set(i.subarray(t-n,t-n+r),a.wnext),n-=r,n?(a.window.set(i.subarray(t-n,t),0),a.wnext=n,a.whave=a.wsize):(a.wnext+=r,a.wnext===a.wsize&&(a.wnext=0),a.whave<a.wsize&&(a.whave+=r))),0},Wa=(e,i)=>{let t,n,r,a,o,f,c,l,_,m,s,h,u,T,k=0,g,S,p,d,y,D,w,A,E=new Uint8Array(4),b,x,J=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(ae(e)||!e.output||!e.input&&e.avail_in!==0)return $;t=e.state,t.mode===K&&(t.mode=qe),o=e.next_out,r=e.output,c=e.avail_out,a=e.next_in,n=e.input,f=e.avail_in,l=t.hold,_=t.bits,m=f,s=c,A=ne;e:for(;;)switch(t.mode){case Xe:if(t.wrap===0){t.mode=qe;break}for(;_<16;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}if(t.wrap&2&&l===35615){t.wbits===0&&(t.wbits=15),t.check=0,E[0]=l&255,E[1]=l>>>8&255,t.check=Z(t.check,E,2,0),l=0,_=0,t.mode=Ct;break}if(t.head&&(t.head.done=!1),!(t.wrap&1)||(((l&255)<<8)+(l>>8))%31){e.msg="incorrect header check",t.mode=R;break}if((l&15)!==Ut){e.msg="unknown compression method",t.mode=R;break}if(l>>>=4,_-=4,w=(l&15)+8,t.wbits===0&&(t.wbits=w),w>15||w>t.wbits){e.msg="invalid window size",t.mode=R;break}t.dmax=1<<t.wbits,t.flags=0,e.adler=t.check=1,t.mode=l&512?Xt:K,l=0,_=0;break;case Ct:for(;_<16;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}if(t.flags=l,(t.flags&255)!==Ut){e.msg="unknown compression method",t.mode=R;break}if(t.flags&57344){e.msg="unknown header flags set",t.mode=R;break}t.head&&(t.head.text=l>>8&1),t.flags&512&&t.wrap&4&&(E[0]=l&255,E[1]=l>>>8&255,t.check=Z(t.check,E,2,0)),l=0,_=0,t.mode=$t;case $t:for(;_<32;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}t.head&&(t.head.time=l),t.flags&512&&t.wrap&4&&(E[0]=l&255,E[1]=l>>>8&255,E[2]=l>>>16&255,E[3]=l>>>24&255,t.check=Z(t.check,E,4,0)),l=0,_=0,t.mode=Ft;case Ft:for(;_<16;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}t.head&&(t.head.xflags=l&255,t.head.os=l>>8),t.flags&512&&t.wrap&4&&(E[0]=l&255,E[1]=l>>>8&255,t.check=Z(t.check,E,2,0)),l=0,_=0,t.mode=Mt;case Mt:if(t.flags&1024){for(;_<16;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}t.length=l,t.head&&(t.head.extra_len=l),t.flags&512&&t.wrap&4&&(E[0]=l&255,E[1]=l>>>8&255,t.check=Z(t.check,E,2,0)),l=0,_=0}else t.head&&(t.head.extra=null);t.mode=Ht;case Ht:if(t.flags&1024&&(h=t.length,h>f&&(h=f),h&&(t.head&&(w=t.head.extra_len-t.length,t.head.extra||(t.head.extra=new Uint8Array(t.head.extra_len)),t.head.extra.set(n.subarray(a,a+h),w)),t.flags&512&&t.wrap&4&&(t.check=Z(t.check,n,h,a)),f-=h,a+=h,t.length-=h),t.length))break e;t.length=0,t.mode=Bt;case Bt:if(t.flags&2048){if(f===0)break e;h=0;do w=n[a+h++],t.head&&w&&t.length<65536&&(t.head.name+=String.fromCharCode(w));while(w&&h<f);if(t.flags&512&&t.wrap&4&&(t.check=Z(t.check,n,h,a)),f-=h,a+=h,w)break e}else t.head&&(t.head.name=null);t.length=0,t.mode=Kt;case Kt:if(t.flags&4096){if(f===0)break e;h=0;do w=n[a+h++],t.head&&w&&t.length<65536&&(t.head.comment+=String.fromCharCode(w));while(w&&h<f);if(t.flags&512&&t.wrap&4&&(t.check=Z(t.check,n,h,a)),f-=h,a+=h,w)break e}else t.head&&(t.head.comment=null);t.mode=Pt;case Pt:if(t.flags&512){for(;_<16;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}if(t.wrap&4&&l!==(t.check&65535)){e.msg="header crc mismatch",t.mode=R;break}l=0,_=0}t.head&&(t.head.hcrc=t.flags>>9&1,t.head.done=!0),e.adler=t.check=0,t.mode=K;break;case Xt:for(;_<32;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}e.adler=t.check=ai(l),l=0,_=0,t.mode=Be;case Be:if(t.havedict===0)return e.next_out=o,e.avail_out=c,e.next_in=a,e.avail_in=f,t.hold=l,t.bits=_,Ma;e.adler=t.check=1,t.mode=K;case K:if(i===$a||i===Ue)break e;case qe:if(t.last){l>>>=_&7,_-=_&7,t.mode=tt;break}for(;_<3;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}switch(t.last=l&1,l>>>=1,_-=1,l&3){case 0:t.mode=Yt;break;case 1:if(ja(t),t.mode=Ce,i===Ue){l>>>=2,_-=2;break e}break;case 2:t.mode=jt;break;case 3:e.msg="invalid block type",t.mode=R}l>>>=2,_-=2;break;case Yt:for(l>>>=_&7,_-=_&7;_<32;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}if((l&65535)!==(l>>>16^65535)){e.msg="invalid stored block lengths",t.mode=R;break}if(t.length=l&65535,l=0,_=0,t.mode=et,i===Ue)break e;case et:t.mode=Gt;case Gt:if(h=t.length,h){if(h>f&&(h=f),h>c&&(h=c),h===0)break e;r.set(n.subarray(a,a+h),o),f-=h,a+=h,c-=h,o+=h,t.length-=h;break}t.mode=K;break;case jt:for(;_<14;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}if(t.nlen=(l&31)+257,l>>>=5,_-=5,t.ndist=(l&31)+1,l>>>=5,_-=5,t.ncode=(l&15)+4,l>>>=4,_-=4,t.nlen>286||t.ndist>30){e.msg="too many length or distance symbols",t.mode=R;break}t.have=0,t.mode=Wt;case Wt:for(;t.have<t.ncode;){for(;_<3;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}t.lens[J[t.have++]]=l&7,l>>>=3,_-=3}for(;t.have<19;)t.lens[J[t.have++]]=0;if(t.lencode=t.lendyn,t.lenbits=7,b={bits:t.lenbits},A=xe(Ca,t.lens,0,19,t.lencode,0,t.work,b),t.lenbits=b.bits,A){e.msg="invalid code lengths set",t.mode=R;break}t.have=0,t.mode=Vt;case Vt:for(;t.have<t.nlen+t.ndist;){for(;k=t.lencode[l&(1<<t.lenbits)-1],g=k>>>24,S=k>>>16&255,p=k&65535,!(g<=_);){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}if(p<16)l>>>=g,_-=g,t.lens[t.have++]=p;else{if(p===16){for(x=g+2;_<x;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}if(l>>>=g,_-=g,t.have===0){e.msg="invalid bit length repeat",t.mode=R;break}w=t.lens[t.have-1],h=3+(l&3),l>>>=2,_-=2}else if(p===17){for(x=g+3;_<x;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}l>>>=g,_-=g,w=0,h=3+(l&7),l>>>=3,_-=3}else{for(x=g+7;_<x;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}l>>>=g,_-=g,w=0,h=11+(l&127),l>>>=7,_-=7}if(t.have+h>t.nlen+t.ndist){e.msg="invalid bit length repeat",t.mode=R;break}for(;h--;)t.lens[t.have++]=w}}if(t.mode===R)break;if(t.lens[256]===0){e.msg="invalid code -- missing end-of-block",t.mode=R;break}if(t.lenbits=9,b={bits:t.lenbits},A=xe(Di,t.lens,0,t.nlen,t.lencode,0,t.work,b),t.lenbits=b.bits,A){e.msg="invalid literal/lengths set",t.mode=R;break}if(t.distbits=6,t.distcode=t.distdyn,b={bits:t.distbits},A=xe(Zi,t.lens,t.nlen,t.ndist,t.distcode,0,t.work,b),t.distbits=b.bits,A){e.msg="invalid distances set",t.mode=R;break}if(t.mode=Ce,i===Ue)break e;case Ce:t.mode=$e;case $e:if(f>=6&&c>=258){e.next_out=o,e.avail_out=c,e.next_in=a,e.avail_in=f,t.hold=l,t.bits=_,Za(e,s),o=e.next_out,r=e.output,c=e.avail_out,a=e.next_in,n=e.input,f=e.avail_in,l=t.hold,_=t.bits,t.mode===K&&(t.back=-1);break}for(t.back=0;k=t.lencode[l&(1<<t.lenbits)-1],g=k>>>24,S=k>>>16&255,p=k&65535,!(g<=_);){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}if(S&&!(S&240)){for(d=g,y=S,D=p;k=t.lencode[D+((l&(1<<d+y)-1)>>d)],g=k>>>24,S=k>>>16&255,p=k&65535,!(d+g<=_);){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}l>>>=d,_-=d,t.back+=d}if(l>>>=g,_-=g,t.back+=g,t.length=p,S===0){t.mode=ti;break}if(S&32){t.back=-1,t.mode=K;break}if(S&64){e.msg="invalid literal/length code",t.mode=R;break}t.extra=S&15,t.mode=Jt;case Jt:if(t.extra){for(x=t.extra;_<x;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}t.length+=l&(1<<t.extra)-1,l>>>=t.extra,_-=t.extra,t.back+=t.extra}t.was=t.length,t.mode=Qt;case Qt:for(;k=t.distcode[l&(1<<t.distbits)-1],g=k>>>24,S=k>>>16&255,p=k&65535,!(g<=_);){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}if(!(S&240)){for(d=g,y=S,D=p;k=t.distcode[D+((l&(1<<d+y)-1)>>d)],g=k>>>24,S=k>>>16&255,p=k&65535,!(d+g<=_);){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}l>>>=d,_-=d,t.back+=d}if(l>>>=g,_-=g,t.back+=g,S&64){e.msg="invalid distance code",t.mode=R;break}t.offset=p,t.extra=S&15,t.mode=qt;case qt:if(t.extra){for(x=t.extra;_<x;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}t.offset+=l&(1<<t.extra)-1,l>>>=t.extra,_-=t.extra,t.back+=t.extra}if(t.offset>t.dmax){e.msg="invalid distance too far back",t.mode=R;break}t.mode=ei;case ei:if(c===0)break e;if(h=s-c,t.offset>h){if(h=t.offset-h,h>t.whave&&t.sane){e.msg="invalid distance too far back",t.mode=R;break}h>t.wnext?(h-=t.wnext,u=t.wsize-h):u=t.wnext-h,h>t.length&&(h=t.length),T=t.window}else T=r,u=o-t.offset,h=t.length;h>c&&(h=c),c-=h,t.length-=h;do r[o++]=T[u++];while(--h);t.length===0&&(t.mode=$e);break;case ti:if(c===0)break e;r[o++]=t.length,c--,t.mode=$e;break;case tt:if(t.wrap){for(;_<32;){if(f===0)break e;f--,l|=n[a++]<<_,_+=8}if(s-=c,e.total_out+=s,t.total+=s,t.wrap&4&&s&&(e.adler=t.check=t.flags?Z(t.check,r,s,o-s):ye(t.check,r,s,o-s)),s=c,t.wrap&4&&(t.flags?l:ai(l))!==t.check){e.msg="incorrect data check",t.mode=R;break}l=0,_=0}t.mode=ii;case ii:if(t.wrap&&t.flags){for(;_<32;){if(f===0)break e;f--,l+=n[a++]<<_,_+=8}if(t.wrap&4&&l!==(t.total&4294967295)){e.msg="incorrect length check",t.mode=R;break}l=0,_=0}t.mode=ni;case ni:A=Fa;break e;case R:A=Ii;break e;case Ni:return Oi;case Li:default:return $}return e.next_out=o,e.avail_out=c,e.next_in=a,e.avail_in=f,t.hold=l,t.bits=_,(t.wsize||s!==e.avail_out&&t.mode<R&&(t.mode<tt||i!==Lt))&&Mi(e,e.output,e.next_out,s-e.avail_out),m-=e.avail_in,s-=e.avail_out,e.total_in+=m,e.total_out+=s,t.total+=s,t.wrap&4&&s&&(e.adler=t.check=t.flags?Z(t.check,r,s,e.next_out-s):ye(t.check,r,s,e.next_out-s)),e.data_type=t.bits+(t.last?64:0)+(t.mode===K?128:0)+(t.mode===Ce||t.mode===et?256:0),(m===0&&s===0||i===Lt)&&A===ne&&(A=Ha),A},Va=e=>{if(ae(e))return $;let i=e.state;return i.window&&(i.window=null),e.state=null,ne},Ja=(e,i)=>{if(ae(e))return $;let t=e.state;return t.wrap&2?(t.head=i,i.done=!1,ne):$},Qa=(e,i)=>{let t=i.length,n,r,a;return ae(e)||(n=e.state,n.wrap!==0&&n.mode!==Be)?$:n.mode===Be&&(r=1,r=ye(r,i,t,0),r!==n.check)?Ii:(a=Mi(e,i,t,t),a?(n.mode=Ni,Oi):(n.havedict=1,ne))},qa=Ci,er=$i,tr=Ui,ir=Ga,nr=Fi,ar=Wa,rr=Va,lr=Ja,fr=Qa,or="pako inflate (from Nodeca project)",X={inflateReset:qa,inflateReset2:er,inflateResetKeep:tr,inflateInit:ir,inflateInit2:nr,inflate:ar,inflateEnd:rr,inflateGetHeader:lr,inflateSetDictionary:fr,inflateInfo:or};function _r(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}var hr=_r,Hi=Object.prototype.toString,{Z_NO_FLUSH:dr,Z_FINISH:sr,Z_OK:Ae,Z_STREAM_END:at,Z_NEED_DICT:rt,Z_STREAM_ERROR:cr,Z_DATA_ERROR:li,Z_MEM_ERROR:ur}=de;function Ze(e){this.options=Pe.assign({chunkSize:1024*64,windowBits:15,to:""},e||{});let i=this.options;i.raw&&i.windowBits>=0&&i.windowBits<16&&(i.windowBits=-i.windowBits,i.windowBits===0&&(i.windowBits=-15)),i.windowBits>=0&&i.windowBits<16&&!(e&&e.windowBits)&&(i.windowBits+=32),i.windowBits>15&&i.windowBits<48&&(i.windowBits&15||(i.windowBits|=15)),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Ri,this.strm.avail_out=0;let t=X.inflateInit2(this.strm,i.windowBits);if(t!==Ae)throw new Error(te[t]);if(this.header=new hr,X.inflateGetHeader(this.strm,this.header),i.dictionary&&(typeof i.dictionary=="string"?i.dictionary=Se.string2buf(i.dictionary):Hi.call(i.dictionary)==="[object ArrayBuffer]"&&(i.dictionary=new Uint8Array(i.dictionary)),i.raw&&(t=X.inflateSetDictionary(this.strm,i.dictionary),t!==Ae)))throw new Error(te[t])}Ze.prototype.push=function(e,i){let t=this.strm,n=this.options.chunkSize,r=this.options.dictionary,a,o,f;if(this.ended)return!1;for(i===~~i?o=i:o=i===!0?sr:dr,Hi.call(e)==="[object ArrayBuffer]"?t.input=new Uint8Array(e):t.input=e,t.next_in=0,t.avail_in=t.input.length;;){for(t.avail_out===0&&(t.output=new Uint8Array(n),t.next_out=0,t.avail_out=n),a=X.inflate(t,o),a===rt&&r&&(a=X.inflateSetDictionary(t,r),a===Ae?a=X.inflate(t,o):a===li&&(a=rt));t.avail_in>0&&a===at&&t.state.wrap>0&&e[t.next_in]!==0;)X.inflateReset(t),a=X.inflate(t,o);switch(a){case cr:case li:case rt:case ur:return this.onEnd(a),this.ended=!0,!1}if(f=t.avail_out,t.next_out&&(t.avail_out===0||a===at))if(this.options.to==="string"){let c=Se.utf8border(t.output,t.next_out),l=t.next_out-c,_=Se.buf2string(t.output,c);t.next_out=l,t.avail_out=n-l,l&&t.output.set(t.output.subarray(c,c+l),0),this.onData(_)}else this.onData(t.output.length===t.next_out?t.output:t.output.subarray(0,t.next_out));if(!(a===Ae&&f===0)){if(a===at)return a=X.inflateEnd(this.strm),this.onEnd(a),this.ended=!0,!0;if(t.avail_in===0)break}}return!0};Ze.prototype.onData=function(e){this.chunks.push(e)};Ze.prototype.onEnd=function(e){e===Ae&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=Pe.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg};function kt(e,i){let t=new Ze(i);if(t.push(e),t.err)throw t.msg||te[t.err];return t.result}function wr(e,i){return i=i||{},i.raw=!0,kt(e,i)}var br=Ze,gr=kt,pr=wr,xr=kt,vr=de,kr={Inflate:br,inflate:gr,inflateRaw:pr,ungzip:xr,constants:vr},{Deflate:yr,deflate:zr,deflateRaw:Sr,gzip:Er}=Ta,{Inflate:Ar,inflate:Rr,inflateRaw:Tr,ungzip:Dr}=kr;var Bi=Er;function mr(e){let i=new TextEncoder().encode(e),t=Bi(i);return btoa(String.fromCharCode(...t))}window._my_custom_methods||(window._my_custom_methods={});window._my_custom_methods.compressAndBase64Encode=mr;})();    
if (!window._my_custom_data) window._my_custom_data = {};
if (!window._my_custom_menu) window._my_custom_menu = {};
[
    'email',
    'case',
    'dashboard'
].forEach(type=>{if (!window._my_custom_menu[type]) window._my_custom_menu[type] = {}});
if (!window._my_modal_settings) window._my_modal_settings = {};
if (!window._my_custom_data.intervals) window._my_custom_data.intervals = {};
if (!window._my_custom_data.sla_alarm_aknowledged) window._my_custom_data.sla_alarm_aknowledged = false;
if (!window._my_custom_data.sla_alarm_silence_counter) window._my_custom_data.sla_alarm_silence_counter = 0;
window._my_custom_data.alarm_sound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYxLjEuMTAwAAAAAAAAAAAAAAD/+1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJbmZvAAAADwAAAHQAAL4zAAUHCQwOEBQXGRsdHyQmKCotLzM1ODo8PkNFR0lLTlBUVlhbXV9jZmhqbG5zdXd5fH6ChIeJi42PlJaYmp2fo6Woqqyus7W3ubu+wsTGycvNz9TW2Nrc3+Pl5+rs7vL19/n7/QAAAABMYXZjNjEuMy4AAAAAAAAAAAAAAAAkAvQAAAAAAAC+M1oTHKYAAAAAAAAAAAAAAAAAAAAA//uQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//uSZECP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7kmRAj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JkQI/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//uSZECP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVc4Tn070OBmWjgbvKIYTkbwLEHGevp+YunJ5/89e7f0ows+b4scYOHGxLP/mk067b92169+87eZvYqExeSxDBMRzMzM373bX3maUXv/uLFlDgntHBgsowsc+aTlKUp+r169fc7PyQBwsLE5Pjv97t3XvzSl1793/mcbssbsYOUp8zf/7kmRAj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABBY5SlL3vt7nZm/NE5PaMDxhZdevXr179/mbvy2WYQSdyGIael14VFnjgyfeKQ0ObxOo3lu+3j0y1Q9oywYgBiJ5xLRGZAYm8LApz7CnTsvC+eTE59qkUlrnu3AkMu7KoLbG1eDK6lociNQJLZXIL8gnbNPA8hnHclt2KZQa/7IV6vyxshO5TZGxLlGnv0pBzXAfZuD8xfOllMpo25t/FHFqQQkgux6mfP9ONZQLgdTSMMtXZAEtrS1l9bOTQ8zuu595z33flW8RGVTXq3UtivC8yWoX5WItHnDhUsJfWFIR0mdB8ivoUAiM4SYlKAJEhQvEVCPkg6oL4uTTYI8iBnPRkOgubcOwkSQFgAfIiwxhrEJL23oOC1Mzer4kVhV6OemcuTvQqGmXezIQAAInD7dwKWZ5YsHBqEtFdTUDBvezBOiwtAs4hQzBYjWS8a2EiEiTr3MFieNdVbM2xbQnKLrqVIBAETNc8QAcYpBqaZvycOsGY8hoYGlqZ3mKZDj/+5Jk/4f09mq7AHlkEgAADSAAAAEhabTnDmH1wAAANIAAAATuY2h2tUxQJYxwEs0DTkzrEkwcAgwnDNC4xNKE0iQQxIBJbKD8Kjqp3XuSP4nD84QcuYLgmTm5RXbJLnlLYlGoFydtQKEiSPV14QlMoJ9qMzexXQJk8meRgbls12yAUGBASVGVitGKyMVhixQ4jNwmuSQgu2uRr+5o5QxNd9tqYomCYuKCdu7m23KEIWK25hs+BCGZ5FdekKSbjiCkiSIHX0fhYhgYGKWlo0MTLp7NTEAwMGTKpxNfmULGo1gikJoFCRjAMGr36cFPpgIYGRCkYEDLEgVBlTc04sWYpzIH7UzXUn+ECSd5ixUOLZj/gYMFGVCpmQiIwgWHREsHlloGkjnkwWhjVjQ2ISCAcRHp5SQbgLGDBTqqmMIEjLBhSMNyZuybDwQ5Sy+7nemkvGSZ28MOJoyMC+WAAJF0EUb6QKKQQQFBIu3CiA2kQFRPBNcjJGZ7DuY97//CvWLzrpQdOH/rHHIfnyFOUdpk1ZMWRVVQCADfy4dGTIQ5QgxM//uSZOmA92ZiwZs9TMIAAA0gAAABGpEjLa5tMZAAADSAAAAEhJRQSODl+U9E1NcbA7rNkjDfFgwZNNxezMxI2xsNoSDA0s4heNuXDQgE5PXAxu+CJiqqAthikEJbJ4MVgdJdK8CQKYYQpJ5qsxAGwUgyjAqWMcZJycLKHsDBfCciIYdE3oxsYBuAK028JGEYE0Lg4zYjyn+cD1ULygeKAyHV0mdajjb1ZtQjUZSakYGy6jplIs7c3v7QGW9u3tOWbIQQjdNBwGTuy7hlRv/zI3PrunF/cgpAwnZM+wcWTtAIBCBAgCABAmFk2ZBCCbO7LEICAAQFZHKYOoGJg3j9mhaA8cNSRhkiieGGiniYsIzpjvjsGDcEgYQ4UxMBgYFgCJgLgnmAKAwYBgBBgegTmBmD6BgHjvfMWcHUmAybZCpw4sx9xZRdQIGEgF4pXMMhovOewCixWIhzQ3YQl03VOxBVAY0V9WfS1ym3hyG3cVGo+nJDcurKV2om1/qzVak5Jlx4DaGxllkCV90nZwYKCGAcOohF5FRGOTlyfhd6nvpVlf/7kmTHgPbfY1D7bzXSAAANIAAAARstjUvvZQ/AAAA0gAAABJWK0vhqVVVVVWaGZmZlmFmq7v//4ZoZmaCTVrJN/9mu6iGhroo5lQAB9qgyLjZphMWJY8yqTMh5N2X4DKkxPLTH5HOusTYCowk2P75wwdBvmfaOm/kxvwidAUGPgIY3HUZZEBmTOBgYcY+abFGctcWlBqcmqARMDk5gDRxmohBmBMhhAzREeBGF1BHBNc1gwHJACLULMkabvLBqgNCQYcGAKbmYsCko6BZIshp7PVFoYIg0bd2w/UZtOHOwdlzBw+dlN3Dvf3eWAxVCLACeo7i2dlWoLPOqep916kHpYkMUYD6QtMAqOLypMBkbwUazN6MMZjozklzZIMMSsg2u2xA6zSdsM7EMxWkDEtbMnmEyeZDZmg0c9NZFBYDNegxEgHDH5oXcCQUwZEOZOQWDApRMIJzEAAysMNg+BU4JKCsAKChARAgMLGzZjjCKTlrDBD1LBKDFQqETGBTylT2MincQmBMfolkgYiyxJ+LDxlN0vwlPRp/xWdp9/nZjtPL/+5Jkq472FC1Pk5vSQAAADSAAAAEYrLFATm9MyAAANIAAAAT9btfXwqXt/UVzovaJHSZySbtP9r9Hj7Xd0tZqmksy+F17uJDGN5wNhHg+HcJJygXMAAEv3pxx+Z/iGJjBrDJVDbDDiJzVnDSmjknAsYAgs494wwsyUs7xQqkDKFwMqLTMjUWCBBwRQ0xV4BhmcIVMOHNIQFEHHJTKKg5EOCKRboZENhTVcJZ7oS94mgziwDwS93JRtAvoyOHGJ+P16/3f3l/KKsc6eeXodHHmTSKj2u2j1bCtYXQu2XQvQuwPMqbPNWMVJ0rMVBlQyue0Ml5ihHLhabPYD5OewutLmVrS5m1eaeZ5qzT7MVr1palrusR3do7A9rrDV1sK2B5lawu4v7ywDAICGJlOdIDBxENGpzueXB4HHps0/mZ+ycIXRkUDmnwaZKbxktcmHhoQEgGiAzmNTLZ3MqKMwUTDB53MfOkqgoxkFjAwfDvBl2or4NGXM8SLdCdcxZEBATJq0W2SGYlAFAZN0YAEBrSbgwCDktsLCH5X4rUgdACxmzXX//uSZKaO9o1jVBtYZLIAAA0gAAABGaVjRE5os0gAADSAAAAE2ZTC2sJbwbKE3nBaE06XO5L62rz3P/F5fNWd5nERUXRVAZSFMZTig05R7IOd0ZqmkXOSi3Ta1j0cla1edCrJpV/ZnaqNsagpwuj24yJr1o/8noAAAFtyMkHTDm8DvxC6YrYuiNEBRMBEoD14GZpaYUQfsl/CYQXE86f5pJGl4xZSyJpohULdliqfkUPuk8Mojy7mlWFrQ1JpOs1ceLymanbzaxCWUg6bwnayJesJkcR/y+7ZbaRH5NCMWFkf1qcjEkJB1JQSB6bFQsvNqjm5SOXio7x2qqdx7Db6Q/MOdevztv6V8t0/e/qmkKsmMj+5RW9CyjcL5RODE0u0aYkWvHB0oTpjxlIscT2uZtcdtOUhX5C/u/zGpFQBXqYSAHPlp8YsZAYmqrBlEOYikg0FMdhAMUmSLRxOwAnc0sQNN1hLvM+DDFik74eEQ+LUJUaxCUjwuDRUswK7hbM+xVtGYqZkxf4xDhphA1RRhwmAiyCqAFOaR6taUL7P+jm5Lf/7kmSWBPY2ZNe7OGJ2AAANIAAAARkVW0wt5FOIAAA0gAAABPiSzR3tW+0FXUDOY5eCgbAnBXqvls0lkjQFh6DDN34rBr6QzI3sfSXvtco5ZN3KScheq8nvV6AGAnEBSDKIKpii0K66Lj6S0f/to1ixK1mY9VGPDM4KiHB6xOkxFb6npt+RN7UAWllgGmrpgCEEZxFYwYDIFuMZrAxMkzVRkOgAU04iTK56NlocdDgGBhg1xGKiGisYhQgNBJgINGZeGPTmrDnGXgaKYWeZg+a4+IkhIGNKhBAgxBY2oAwCwDSDDgACAMmKN0WMSCKBoOrhhV5n6e62yRN8SDqBERuvHTACb76PslRHnzhLcWsudFHbdF57MJpHYbO7sD37eFDS01PX/Ls1f+rctWryDKKcB2IKEOhj6G9wYxZEMbM0Sf9lIuPJ8/+Z/llON/rMljet53pRyRjuJJObSDaDwJGzOZg+grDhYg5DD0A5ACNLSjwkwyhHAgkaweGKhpsoubeBQoFPSHxcwwJI0701IIwAo4YJTYukVT4ZXBIgcHGNOhf/+5JkjQ72nWRSC5ocdgAADSAAAAEYrVlOTejPyAAANIAAAAQiW4MNBSsKiZ1EdZChPJG5mybxqAkTVJtuLAGwNbTSa2zJHKRxFm0Wj87NxyAH0s0slgtn7tv070/E87bj2H9nnceUjtnxqtJn6cWoBlr03CoVqLNLlf9/rqERm4rxMZyu9//s2qwz5GoHSWZr/elj/Zzqpwl1GEi33JvyCcOcwAAAAAEqYtmZYObgqeBUIWwATHxUE/ABIiFCMTDYlDb0DuCDOEjZNSwAJlRkWRjT4QjLEQQER4iCJLP1/rvb8HBQjTrJXM7b4zHAdKBrYOUhY/qVS+GGMAXtKWh0FCty1AN1yN0kVf5eOUOyay8TwPVlR0KAsntH7KxKsQNd2IrWRfKmQoXO8rQoaTrf//FX++riHcaTZ7p1LH1G6/ThJDCbCZw00rcXImsQrb0U+5qk2cLuDUbPGkjhtx1Qm9seyJ+2Y/peoJusfGCIz2WMRrUDzbCI1M6NfVVeGPERtrYIAYwkBMSOxG2qwGPswKWT7kgC1M8UKzh/gxmGZpyZ//uSZH+G9jRkVNNYTMAAAA0gAAABFjjZTG3oT8AAADSAAAAEhnpyyZuw5jUhglos6a6BDZhhRnRZCECxYOeOWraYNK2WOKrmMIQ1WlKRFEssOCxa0+C24Ga7PTEahivAVNBUbn7jNb0lgV05DlJoFkesQpxbQ5CD/d7vKzLUSeREUNQCBUxKChYeNpov+pDGMKk1lBHKlTs8NSIg4pUABWgIvAYvEmNNYKShGFmDFJwDkgKM5Pj4tzYiyUqZzUaZ8LaDKBjBnTiczUjDMCFSHbekIMmxKAiEYzkDe0jCsODgaCQMBKdwtI4KKR0VMBYuYwUCAF5N0LeIrBH1TK5M79cN4jzyMfxilvgJ91NU2IyvZ2tNJp4ld5aWNvZKart/eHfXze+b3vrN73hv345YnB8+GROHwOpr3s6qv8oQOSggBCogw4PBAAEGiRwwBuUxKEINpulACfKzlcQ94MyQkx5Y0hQ1hwwgkzBMyC04AcQDDPEkBpSKHThtxpyIkZ4WXL7khagYIUT7KCCa8ucgjMWFPtPlNEzAF6PMm6ApHcvK+v/7kmSCDvV2NdQTenp0AAANIAAAARQcsVRtZNFIAAA0gAAABGJG6Mufy5RctwXEIrLpU/zD71LrscFUWHeV0yRCjLSKTXS8FFBr3uTb2z+/7+RHus6YKwf0Zw+T8OaU/nrc5LJcwKOm/m/2iGlJ+UKAAAATl7DmUAkeZjIRBVXGZQHCgq0lgOMiQFApRECMQSNeOGmKYKcpoBi9UJKGwKCK8TQRXURQWTgXYn3C4NVVWuvByXOY62V92QMcq5o7NaCZL6zWupJpWrEUWPzGO0KVM5lAZUjNyPN84xVjzWaZ/8/8iJPKcinWLJr2+oxxnq+pUz4GydZYYpWtNQT+2a3bc9WoY3VgqBygAAABTblUvAWmkBQijFeHQaNSdmjYa5r6v4IGxepI/DATSwDR26wazceqjF7TsdEM2SYGDYa36Gc1D/tiVk76RDHwpTa+d3+M+gpeQrWaJV/E0uGyjtryv3LbV11r6Y/3f7JORY3XtLO47VTHBDp8Jadx7cB/3UxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JkmQT0ymbXO0weEAAADSAAAAEOzLltrDDO2AAANIAAAARVVVVVVVVVVVVVVVVVVYAAAAAAU25KJEQl8ECDzAZQ1RXqE5CTmoyJYCGY/X4iVb1acCogw3M+3rY+VcsZewQEbauqcCELmolTCFZ6nU5VXYuayGJRZ5SVZzDNfRyZ3bks+xNl3WSyHkIbdqvn1/dXujOrURJ9UrorndCM7IRXsxQM6OJclV8BHYAAAAGnLuNRSEjBgIUdcicFDi2pfJ3LFiRNg4dgnCUdAzSctbskYt9qqsjWPpFUXcE3X0r1V4VtV8IajthHIfRKXwTiSPee93+UbCQbYKi5hVjWMPssYfvOHD5y8INCAeaGDbGNOG5AnJe0XViF6luRrfNqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqgAAADFxHJUmFdxOJMQGJDplExrwAJCgoGFsRiUJEvT7NKeFyqlYgEEawhGjBEkKVGg0vByCq+FB2IyRo4BFdRwVgFHWTqKBclYFWJ/G4//uSZLgE89VeXOnoFbYAAA0gAAABDniVa+w8zUAAADSAAAAEx19aWJzkmjzL4GhVFfpF+zEdeOxqmnOWKGgpxAskGV+GIQnNCVNByQQdm5QumZ8I7lS/I8+n/TTMvM05Hpwrlcyztz/8/NbX80V9q4N3nAr5MYD9BSIUHJQAwKILytxT7EBMZICA4XX2YqAnDnkDmBAIqHmCoQsMEwMCUIzMBDBlqRl4ARQXFlowed760lFh4hNMSUWQAjkSAcNNpmBccOsXrcgNAp7I7KZRE36dNgMJoncSka375PJNZyt/3rp6GjkVi5YjMrq0lFO5uNOSQfeEIFN0Mp8+9XdpLI6RCAwAxO/HOsW1guIihcolaBqrmsipgXKME76WjYY4vUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXAAAAAAAOafxlImyDGFB4vDSdiz30hLEBvLcXuSVFG0p+LRpn3k5CHB4mbRJBeSRTef1WVWT+1YJOlRuxoRv/7kmTmDvURYdYzWRvmAAANIAAAARUQ5VQt5RGAAAA0gAAABEmjvJt7VVW15mct5Iz81j3MiYqWPgJnKyMBBIrQtkRRK4FXAswRPjZLWIpYYVLLcWHTcFXEhYGoGAFAxVcQD0AUQxOuDGJGBwOMpqgzschCaTOY8Fog7yG/JxlYcazZHxJhPVBUSMscT3m044EBxGJAZghwBFkxMgMwUDvzER8Zh4ZCiBQOMHwinC54Sl5sp+b2Ig4mMdFzWTU8AWeKIpkAjmGpGQEntsnLbIB1iLOlkEurAcHqPNjABsPTM0Yo0vt02VRyobLmxBT17dfs9Kudq48s97R2ccd4faxvZC4GJ4s4SB2lcrFybxSAHwVM31o10GjpUNorETjt79JMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqrAAAAADLboowFd4OERcaoz0YEfRxFOelPr6ds6wQsNV7dZMSjSglDsLqVS97Vlq4deUQQ0yFzGbvu98daxG/3YVXYU2PRP/n6x4pD+UL8fad9/1caNFhe0YH5xadLi2OiUyKL/+5Jk3gTztidaaw8zwAAADSAAAAEYhM9ALm8pwAAANIAAAASATz+IE8JYlpRQTToSDk6Iis7P1hLOG3zg5OUfp1S0t62YH5Idw4ZTOxQo3S3SV6xiE7fTrmV8cB5ZZTDBlgn2Q1y1/6vq3O9xPBKdlhFuRRuePjxoABaWjMYAcjrkZisrlIAgzMENxXkQwYSAlDPAPQdPmFDpiQQKJI1rDgYFxAaPDcT0bKAx4KlNjEvGRnNUO4xMgKjxVCwObcYmAjAK9n2Foao+vm/iS6O1iWUk0HJ3KSiWElEOXn9kWMOtwY7UgCAXDuthSTEWE5ttEDEMZmumdQQqtnu653a48zs6+0FIS7xXe3od+fPsuuhdXu+/D/8enX7XWXr2vv4dTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVWAAAAEXjL3AgPGIBsBw0hGgJAoHMBkYAgQGiVYMzqIDF4KMAg4tCZDC4kogCJwAKhENDRpUQBAwEAENCSQCRhCKVFQo6Cr1KQSSQJHQQvdSQJAIGAcAxFPVdSl8HqELDDQ8Pwxiggb6fg5//uSZPCE9bxi2VMGZiYAAA0gAAABFQTLUK3lMVgAADSAAAAEr9LKYvDDru9QTjly52KeCo5D8agaXRujxi0kxl0rknJ6IbnrE3Vo7mdqp3JJshtTLc0zSnE65nEPOJEc//OJeIbbwsWUST83mtcouj1OEQCfd5tKes1vAAbKF6AkQBoUYwdJQrFMCQzbJsWQUIRQNEdyaaLwORCZhiIjg4hEMQOn/iDCSUF+jXGEo3nFBUEQNEkSPCn0V4d0sEiWPI34dRxRSrzTMWUS16qNEZikTph+R3UBSDozXrUrSqi59bAWzpbixMij1Ud+vTrLXYWvW2Nve2m1r989P3Z7szVqbSxQkUeEj7BoJEwLA84t4sVPqPqB+pa6XDtagBkKVUxBTUUzLjEwMFVVVQABsBHGHwUFzBKOMFmUHAwhB44RzCsmMNgcKANA0RFUDatBKNQRhcckGDRRZQeGHuuER5Q8uyFhxFGacyMuYJlFeQ6XBJvKsSn2aDJAISw/eCAzcZW0d4VHmzYuCrh5Nw23dAZLKkfbRvoJX86zHJStGYMKIf/7kmT0BvYGTdQzmRziAAANIAAAARSw9VcN5Y9AAAA0gAAABCYBR60bmQYy0YiUc8jEZ1c0y046UyczbR9ow2SWtUpSzbVimCiw5q18G3qYJeyFdsfY/mNtM2j/3Wl7tHq1mKK7tTqOHYvVb1L7latdV0+hd1myWKrWt2hejWJW4eaS3XQNx9AAAAU28PNWLxMVADetcbPFNTFx0xm1UWMIGIwbzOmFwJcZki733Hj+VOwpVaBqSHGaJxzuT4Jpo1u3IHxXfa06DDMYcAhmCQKm9igXzpcnxNIl9s4zBvcvWbu0UM9GZ+moZ9ZyjjVU3uZuOvG4Zmw8VdOnD6HUlM9nJUpez+dkKfxzbQly9mEqAsDVDBEvF4QKbhIjDIaixopMQU1FMy4xMDCqqqqqqqqqqqqqAEMIWliMNEc2aVeCMBRkMJGTnF8mzEGjDjgxEsOjLjAgwUNDQgA0wuZcYQDmNEprjoJEBUDy0SM41EFvmYM6MKH0D3+QlFAiNSaO6cpKKmWhD6RwRAya6tMYsoclg7c83dTp/Im8aebkc7PpRSL/+5Jk+YT2w2dUk5pjcAAADSAAAAETIZlhTSR5AAAANIAAAASi1KqdDHk6QUhwCg5xxMj9J9JsFFHCovgxg5bWusLLrVda1uqzq3rechtvM2E10oxJR45rQjpDuWL9tPlwTUyBTQ4l2iCqHdM+57mKOcLVIH+3VUgQedcEgJjS2d05goATfMDJDXK4wYTTCLTmCGRhQQgWYGFJbGAH7SwURhQLAqYBrBwJEJCxkgSmlAiqIFGk+4k0QChBWNslXgpSFAdl9Z9hwBcX7LMiYXkdNaZ9Jq7ZV0NQq3ZU9sjuwXJpe2+BQd27H6K7KUio28bPcs+irsCqvZHTMhUmd4v5HaXS6mzRrzWxSW7djTv9lkPnS5DkNytjlwfWZmYlomYvVjJAONEwzBGzypeCAuWZMOEg6qaCJ9GJhkYzCpo64GwDmocyEySATfbQR+MgKjSgowwEG/lEIDCZopeBy4yogMUATMCMw4CBoUSgBjIICZExJEUwDkEgKDFFJEqVu4Y8LmZAjrRlRsyoulMZmVlJ4PVGRGCGDAs80lDguRplmGVg//uSZPYH9gxi1AtsHyIAAA0gAAABFS1pVK2wfFAAADSAAAAEGTdf1mSekll0olMKmv43mzkwWWcqsp0Uac5rqvMzlM1Vb92ZWFS/eLlLWyK2NihPsBW5ccmmjgWvRA43/Cv042X7lQWFBSwOD7Iy45hNSnPi0IAOsgWDQ8gQhRpjmCCSF0YcdJYOAQAOGWimyntyFBgsVMC2PEZHgQkMAg1AYPAE2EDQqyFqFAPJlVDSEWLLvLAYvugZUtDAYDDYGddZKMbe35Q1woA1vbmUDuX3MS3Y5LJRLWPsMEUWY86xHF7mhKDUpwbBSyw2AQYQHgPnDiBBDdliMHhbnhwNHJJQpFD0qae53j4R+EepfR3tOKe+u+4r+vm/jj/ZOnj4l9keKdKxsOkDFYAAAAAAADFpyIKEoBMWE000j0IDCYDICaZNDRmcMDgtEQiAI1O3lIIC5KMjCAyMWkAAFU9TCJzVnTkpwMKEizkFnlKgcLAgESdCVV0DOBkaheuBhDIguCQAjxWLLGL/Aae1lsY4PMYLYPHX1Tba3KnGiYUExq0zdf/7kmT/hvYvPFGDmzPyAAANIAAAARgNi07OaQ3IAAA0gAAABHK4JTFZlIGX0vFO2zVstM81z7s8COi0hhSWzVS6ebMxsKpMUTBVykIKxiuFfl+T+olt28V0V/5FKBXZmSXAr4TpvBXb1ogKS1JZDELg0IRQwAkM1ZDEDlAzzMIAeDQwQnYk4CgqjGYgGJjsVlBALVBcOmDHObpDIKB5hAEOYYhGocDCyIJsjqa5MbQBghWdQIZQC/gqHNyIFnFeiGRwJTNTgECAlVh4fjm7IsXe2kiJVHZyx1V3Ji0XZpI6ijeUVXBqzcbDcpNxPOvqxSRenpJZnep7UkhzGn6V0JJpxN6WmUQy2jUELW02kYujM7Q6eXTYesqDjDz4BOF6nRBRaZRB0D02INfxIERJpAQwDBzScIaPsYigJJnFOW5WwZq4UXqgAAAAACh2aWXeRsPlF0P30CAc2uVBIEqxVUwVCMGqQMBKUhUFN8tjOiZWSCTI6wRIS7QkpPGOVpMoPLREigSjQAU5eUxspC6sOBwsxCFNNVgMKk4VYaS/BESnpin/+5Jk+wb16jbTY5ob8gAADSAAAAEbdZ9KbmjTgAAANIAAAATTojOFYYBQdJsH1axXtwWkuOh+vMhbY4KRzWi0pnFYXD9dWBpWuk6ih+FA9byfIqPnzv5SPZrWCnuw2yC973XU6G7Cwp/K5R0G/mNifXqsbM+9v7C6M5/O16bhAAAMxkFk4U529MyExmawyrBSRg5eNJZwCSOcBLhMDn5MSAQwmAQwxP2tkCjcz8DVoIcgYBBAMi/Lpl8TBYBBwiYPADNRUTt0xlgABaJE/Su2m5AdBTt3cqcl/GLSe7D8ri87KMVLJrs7ZDFUl4bvsNA2dy7BVbZgOT7cOziK7K6tHVjc6sOOZQTuYfto5lUJPLs5Jyt5nCczfK1i6hkrWEmRhiLd3JnUCBk6GoMrLLr8FkxBTUUzLjEwMMgAwAAAAGE6ZgCgFSXQSmNXuM4CN4M/n8ARlHokfnKDKhhoKnASnHiVhYND0xoW1AwAFAUgiPaaMjiEMM5pVIYHpM6gJJWbwoXxZU9+Vl2WOb1HGj0n7mmb6y7V3W1dCH8T27are73w//uQZO2G9bpC09t6Y+IAAA0gAAABFll9U44wfEgAADSAAAAExOO9JJNlOD0Cz8zjV3pGVXLzJ9rxlLY/1LQr6lpamXChZ7M/QzehFMDBygzMsYAvJ+T5nZSHW6LB1moEAbemdGNiqmARSYQW4H7qv2hmAQ0b1ZIJADMTAoeMCPkeUP+KBzDmTiSkvSzBiRQGhhlpfyFQMfCF6htBg6OEdgSuZvUmuDAEv2ja9osrnIKZ6HLbNh81bFQX5tsYCZTlyHUOUWs3IIQhsbh5vqPnwy70tx2ukSH5DCRMkyFrMsLmEMaTWJmr04im6vFFJ6rCLOcXc6nnc23P+mYVDJMb6bT/VszWuafGFtazJONbSefYSmndVF3z153bfeweKBbNoBCAAAAAGNGVnLCyAQmOS7KC4wiAAYNAOdGPpwJjGQEI0esAA4YTIo8SHuZQYSA4Nnahkn0LIHCK9xUBSfNFJ7riHIIQIkbV66m/P14wnaPDQ7NUpQFu5DCekM8+lZr/zDAaSzWji98N2aLPGpZotfctUV+pcws53ce/MXt8z0DI//uSZPKG9Ptj1utJHxIAAA0gAAABGIl7Sg5pL8gAADSAAAAE0IRTMF8jEHon8Kp4Jkptk7qf0+mZPzz8n+FT3MqXCyF4BCiEKaPoW3hfk3RxRwQeAAsAUmQSBUHDcj2MAgdyiQUGnK4faAq5kZDFxhNzHsWIDAjB4+MWnUrOjSCUQGDguZ6RhMTI2NCg7acNRMXJFZjQRCpkMtQ+NLeHlLlPkNCjGkIVZTKFeqIjxwO8SRMcoH3UyaR1rDBhZvL7XFlP/lDzM0AFWOMZX692ciuOXUp3JadO5QYz2Vfp0afOpAcfksvlsRCEl8FT8D4qBMWkSlVIkA2w04UhKLaoqFEis2z7miJHFhC6FSIZNxbRo1l0TDGI4Wk9hdWvAUVFmG01OeyaYWu51esT2bTFRQZTWHZ1gSAAAAGGheH4ZFQ4wuXgpeCMZlO8V9C7FtGEghjZ2zaKwGBCsihc09iwAGOtsViDnEoKUL+a2UExgolDlRjZhoUmxMQE00wUHeeclRAJjwLlO5IDsLkTQYgdixgKtZhFb3MFwHY4ymSvlaXlzv/7kmT/hvWFZtTjmRxwAAANIAAAARwdj0quaTOIAAA0gAAABMt+sil9uPWTlHN3smPYR0xyqoXY4cwozmbRNWlUwfrM6f5K+UCM5P61bVSn/l6/JMm1B0iUYgv0ECQVCW0TEAEzFoKQoaGYdBhiR1Sl/g4VmJMUcaG4cCGNofmjUcUAGMtIJQAYgAL/M4IQ4YNTyOdV/hIECy6qpemEgCMduDBBIGYmxE5IaBAUc1TzVmtoLILz9xeLJIO1RDpkn+kkjZ4tcqEIKhVm7TDEo3J5CCDUiUCS1p0zO3ccLhOgWGQfWjOAN9dgextOlITJlw5G9WfSvWlxN/6gqLQFdnW2Ekd2lpax2wn/h9KzJjg7X6v/mX+dr+T0PdSsVrqnbwq6wLjiPj1isV9s2t1Ye2fq/ZL76kxBTQABAAAAKYdhpBbEzGzWWQ2JA4wnNjbAUEgIXpFQmZkRqPkbgAwAI2Oz5UAAYSdni0KmWgBBgefg/qbxsEjLIkFhINVCTCzEo2a0zWkcoKqEoJ2c4pGIOvTCZDLL1puE/IsKeZTzvdbAvLn/+5Jk9YL1TF7VS2weogAADSAAAAEafZtPLmWUwAAANIAAAARq7DynrOemI3ak23MIys4A0SwKkWSwYekEomuYBX8uG73AqJkoTclg1roSvcuI1WggD3iiPRBNYyCWtqHr1FfHx19/Gn3F81Xq/3x8j4pS1IAExs37YAgDO64igAh8FDBi8wD8gWDXKBQIbbxBjC9zxmPlaEUZTsAxEaooJNOo6QMAAdZQ1MCIGM8dFmnRaCxRXVOTajQ9a1e7WL6kV37dImChHKjgsrz5AzN6bUTXi/lq5TLZvcqw67tzGUzk9hXskzdFQVvcIhxS7Iqy1/OWMv29IKyCBnwDy+LxRP8l0WQlNiXpP9Z+yfBhyg3sXrLvOr/puOn1fz4rfn9VgAAAAACOcNjQLOC5li7gJDiE/C9VQNT2CocODd95GIEoHMNH8w6BYwhKBI9NEjgSAtTIgMBmMAS2HC5RzWjR7uoSTQSMwN/5xg5+7KQpYASSaRDu5YZSbr2JUqUi6fqywMKJS23MsVARsjuOQgHbNOTD/qultJTNgtY2n0aB2/Ss//uSZPQG9dBk1FuaQ/IAAA0gAAABFaEXUK3lNRgAADSAAAAElptSl63nwwlC7qLO2AQIPiTIVqOojtrYG2MUHhqBeQELQSHTrqkwe6sqlCvKCx9h2JoY+5yU6s92ozhGpZeklTrx3fufWJxv2t7aqVXFWOdfCQxB4BO0oYmWaimS/IEQnmGkYGtlEBpZUChmHBM5icwBBSJFaVXysBmTEiRA6HGthUoxJ1ayCQx05QSA4gAFCOT50kVMM3ZzWgjYslsbbACSU1jTouLwt50EvU9uIy5GvLCnSpb/lzjryPHFKScx+PCp+QAMKKowHksYG7iUC97hyqjRoRD9UfZS/NBsaqC1PBQdjvcfXcnzTn3VXPr91cd3A7oub7rjJ33v+7vzanutNFxiapIwAAAxiAFwvoWTNKy9rLE0MDCKKOOAdU5IBmeGEfCjG/j3kQAGik5TokIGAiudhrM6X9B1BkrdniNvHHituElhEChkVqrrMYfKBU5diRb+RWHwcds26UgCBg2394lBrd1QpTMgpf3Rqv5nc1f+geKHf+gfD8Kzsv/7kmT/h/aSZlKrmU1QAAANIAAAARaBlU6OaRNAAAA0gAAABNW1qPQ/Y7p9am9nE15REfP1J2YgRS5xK40jF+wqO5H53dWWhH+725A7+0tv4/a6L7qve+Z3hrx9bux3pf8omJyqUMUAjAcCWWJlJEGXSfK3F9wIBhgSIIZSCXhaUAgMZnQERBu0GDxUMjAwBHddouaZJi6HBy5zsNQMgRiTYhoGaweJI4qnY3EjWPJJVWGOmQ9d6wgGkIftu0gXB1qqu5eFrXSQTbsYu4pjL9VHIJhf/OQFY5WWVC9dmjscB4oSwmkQpzkSEupsCtr0UnmxQD8FBBF/4CT8oGL6ZRmu5pi2YM/FG8+RyMKXzbYuGRO1+tDcz/+aLMg+XhorzFGX2vI7Csv3PEMETYAQAAAHAF20QlFTm8nVvlyaAJT4PFKFjHkkTecvCBCRBNzBCEAE6F6vQSgEzsewgd3HaBDo9kuOoVQDWEEjorBhROYbMDX1gjdXW5P3kQgXLTfHF6NMw29RWhnugVVpMdsKLcVs5Ircr6ryCnchGGmjNC3yOAH/+5Jk+wb1xl3Tw5o04gAADSAAAAEY3ZFNjukzSAAANIAAAARNygKEeoA4ETrweLugwDgj2wdG32AMfUCcUvsPuOSE2c3gtREgpati1pOUqxo6+V6glryhVa6Fvg01pbnpnbgHP5kBOlkSXlTNwC4KOINgoF8ZR0BK7NDAtkCfJgUDm5BKAjkzVsQNOm4DtMZiSjjfcAUGdmRl/mAkwPNAgYttDeFO1hG538qwYAGQNHMxkFO3m7xSp1aLUkXvKsdLTm7HIMcexliCWG7INiDDSmkGBvooJ4+NYUj/0oXkxu0n3LDc09Z7uDdB7lqS6ehOssp+hO1ZlNhCfACcDdQiqyfB3zj1F+tpPuPnMpzPw989hSBITSQVVpFz61n4IPinbn8QGYgd8E3xAc/+IHRAc+UcoEDkQHP6gQOLBwMf4IHFg+cl/xA5YPh5QiAAACIVyFuyaRzlbuMv6JAl4hUXpGJlgAAm5cMJHlk6mAjL5mkKtEhkcARpUvDR4geQEygDIyY1hKAKhUh2AG+DZPb7wK2JoNPpECjTGoZ7gOhW0scd//uSZPoHBdRWU0OZRNIAAA0gAAABFSUVTw5pbcjkgB5wAAAAIaUXcLy2WmTnukECYXzr6vpZ7BDkw3/ZS6GPZUcOuyKCBuKiCOxBiGkwoHyXRAkbsIBPiBpb0knfBNbOSk3TKM+Sk4arXGkfdKqD4hQ/cqmk3590qoJ/N3Mwn8/6T79t8pK3w39Kb6Nxjdq2qramv9C0WLRZ3UXTfN18XqYK1fmthtSb++2OpjruypTIpXIUCKD8ioBDpBodKBBGBxhImpRKnG2ALCMyp9TFIHZUouBSGLQ5w2jFUJgVbggEuFdLDQDqT6pICMIdMeeesCqnu6NBUrhDmgchfqM7BscNZQymHDdFrAmWsayfFJiiwmRlJ1MrjYkzLGF1Dtez7BTy4fWFh/mBTXhRKO2h/P24oUuGDrfbiAXvNh+Zxj+7cNy0MVI/UEFxCKVeouycormHfaDOWO97PqF72nX1NH76O3MtPVvRj6UZxKyTlPukP/7qM/6z7cp/DHlPOSn/xusPrHvLg/FTmv/d8/5d4BAAAQEZStENY58oUNCF9R0xI//7kmTqh/XqZtNDmlzQKCAXoAAAABeBk0yuZXNIgYAggBCJeHPJAwMRFoQKPHHfBn4ErC08eFTFBh0YkgjNOJyZikENijQQBS9oDBBYZazMhQsZQ/TUgVYKOM/ZiIRpPSbUtgPPkFF/YtjagFXtndMhzhNrT7Mn5rkTk1/lZb1/CvNTneWXCn+5UFjn7jFrxkn+wOpzYjfh2byxHrBs+bfkT0oc9tnV7108VwUvxH1B+yd651Q81MORNOSOsaqCgr4I1D/////////9REFIRGOZAScRsgihQsmAci22J0l6IUqqRI/z/bMrwTAIoG4ffwuedgyqfYIwMxYZPZBiYHhSKp940ESifb6MuB4o2abbgCJgaLobmipIXdtUyjoVrh28+hhhHNPZtTj/lKOpywYItNaqezrepkqmSDXtkZr2vt2Xux+Ppn4Z4Ko9795ISirUJLDkcAdM/D82bkfyZ6xc7YHx8ZFO/JTdahZXKpy/J98KbOXVNO+KO303ruXV0yuEjnxN8qG9TZecrRdUUhM76dL2nuUqOSuMAACB//////z/+5JkyIbFk17UQ3lE5iWqWKAA7/QWBZdRLeVzSI6o5wwQKyLzS///+0Lg0DYHydhUEAIQQ5c0VCAQIpFgLh1jIAABDgLGnEQCdHVJ8xpeYqaANWZWk4Ixs5z7EQO/jwEoeasHxCJsAMnbDOA5+50LvCECjxf82iShOTRtcoDqYvRVS+5SRPWGMAQjuHoNuXZ5KyQely4o8uK/jBqbWH+2NtLOO2WvfzccZ7rLgJYcjeAVc2PD46Erao3J32Ot0ysQl8FEVuN65KX9sKvhxzrHbPLD93McTPTmVPLYYzTq4m/yj2sWqtW+5TuYYtVOSrPeYoDAAED0u//////////////+TaDs+Lty+2ChCJQTpzWxussVH/QiXTSwUKAE1s+1RrsQTmHEENPpjywJVBhjabA4fMZdAQk80GJ1/XEyTFLLMQA+Boqm4ZAAjNZFTmDRQgfYwVmMjBCtTYignKDx+ESAU1T7Bmge8LlSgXSmzpiYryIsDWGp9ok0aQXqSWtd8PVHxsWkK1xSAa98i4a+EgRlnQUjQs5EEkvrSEHfA9GU//uSZLGH5Zpi1EN5XNIkSknTACzKlnFnTw49eICBKObAALMq+PlcjyXRtN/hI1rg5fKKXR13XCLu5X2zVV636v8rxWpoRWCix9hNSkcc5f//////////////WtSytHIlEYs1YfMrNCMVTgXKlaAwgAAkumNHx0DGg6IqNdaVYzBjGYqVvTWCgJNps0FJBeyf4CFhucAFAKa4DQSZMbJoEDtkqBciAFriUskElIYuu1EbzRnb+6AgHjbzH44EDK2Nh0xItj8pHS0Qs73IPsVwKDWbTYwWx78c2eT35YMF1/IBczDtxmWW9Spq/dbfGl68AlsoDVwo+Jg5MH7YpbURS+PB70Cx2otSgnGNBG7jLJKu4S8T+F+K8HfU/D///rMky6ViMhtBzwnII8MsOwDeEGBZByRcEqJEmDeA2RlkE2NVsAggmLQUgleAKBMxvSy4TdFADAToASoL6qHEALNXHEEAFnDriJCEpKZbQiMHGhnAaLES3FNxEBQVP2PPyqsYsoTM719sxniT3XtkB8nczsQcNMpbn5M9g7HCmCo1itr6jf/7kmSahvVyUFKjmjziJgpogAANnlaJX0tuaPVIoCdgQBALCEd5SwqC4vW22NfmPdL6//mFTTmWMBub/1HjvY8ksq5rUM3/jgJcCAaoOCvUVEeJK4rDtxU+PjbUkQTF/E5bjvUlSQ6OuUzJE28yrBlZZp7ji60yP/yEL/9//+a/2+v5v/f/0/+q///6mM+gYz1ARIKhMFj35IQ8iq7N/vXIAIAAAACYCBKCKGCgJmpn8Dh2xEqgAwivANKUFJUhkZFKQCGzkvgYFHhoQGkwAWHSkMpxoMSjS4iYJwcKkj7Ln3ClhIKitsKOCJea9QrdF3MtyUfMGPeXnVgEzKKVv4OA2/sbgxjlynwEQFOKixpa859NQyf9ZwXO9wEQxMa8qirUMdrmXM7IhtSrRjPiIqZPjR2pWdHNytob7b9DdWqMe8pHLEWGir49GBPTTcfod0v6N3S+qj4u3UKM+tvUz9mYG83T5gxzf7EVi/sqZxfxTAIAS7ltkeWlBYRP/lxoMUZL+GDphyA2iQ+4JLTFnoFLK/5aFQUw0nyf9JkWGw0IYur/+5JkgQb1blxS45os0iLAB5AEAAATAQVNrejzCHgAHQAAAADgw6c5zl3K94GXHqmZoYBGuPOZb6OAg1JYm24l5p7mkOySNqr1hjHrOckn6Shrq2KT5ooC3MFIfwo2lpg8+hvtspnKra2cVfov9y0EleFr8Nc5zpzv/LBdYFaLmlv31DnK9Ay1Q++/Z/0Z7rO0Vf+2Wfyv/6K8RVPt/v8Nee/+p8jWdtllpECAAAAAMtwjBs6sqjPgEXEHBRgAKiwFRLow+v0zat8oeoUJgcyh+mbKZO6DjMajqSoYyy/MdVERT/h4yI9SnCCATrURXjyrjadaYjBDTIXcU4vPlbrfmb6k9RXVsfatTO3r6mVNmNSML7KvTi/udYZ4HjKg44qeOk1kDCSR+oU4qQ7zuVsJOF/RDDMoycKeZ6eZoK+qeNRHzL5/HiloqQP1HRW9EHqoqqw50hB2XgXM3GBQkeMQ62w6S1MR2e5KiwmO2D7IEeK2oyUHeop0LHwX+MzHBpjpDALjjOnMdNFU4WPg4OLRZ2MC0EBdJp+ASFzIBzHiuySB//uSZHyG9rpn1mtRfcQAAA0gAAABExz7T648eIgAADSAAAAEyUhGYBA9LZBGEzFTJFlmnxDarAMcGSz1csCooSsW2jwYgG05YvCgwQh/OCA/1XPlhfR6Px9Ed8L4xM6jjKVO/gxKY0Xef/MWn/fMOI+BSyzPeZ2Squ1LZP3fgflGesaRjYt+5tzfad29Hqn8qdqPfQeQ7uyu9d2qqBBAAAAALkjO06qQOCzrIEeEgcAJ1jAKTM4kDNxWUYhgLQeNgBfY0gHhirGjNDQMo29ppUIw212zCis2v2WrmMjcmrbKpckFO17iJqn+dmUgN5aGQMm9IB9vsRgTPgg+KFFf+f2u95w3p5UTb4Vjw4Jdwu2n8iZ6qdQLdISpQpxs1LsvkPB9k1Tej9JEcr5tLYTtQQ2IuJxKhuM0wEXiQ8zUW9Iovqm1KhhlqCZSk6Ql/CMMvjHPOYprKzZ7GCxMkI4zEc6sJpMsdtOxD9Tvz6TcB8cqmo4ryvVEHE+hCrZHBS7wAKDie0RtEAASvMLCA1aCFJteAAPNitEBK0WB1gCjM4KSQP/7kmSDBvbsZ1Tra36kAAANIAAAARSUu0bOabMIAAA0gAAABEDkiQuJABYjOIgceGmrGyiPTUiohDh/27sQDz7VJLDUmMDUPOfa8/EyYCkuzG24AYJpIbjhgBY8Hou7Dh1HrsQHiPMDosi0wRDCLRe115/H5VSjND8KDuXRs695DYrEmTYxhqujtzqkv5f8Yd8tDf7M3LNx8rCXF+SWj/7VlAAAASY/LWxwABUJTGaAwUG6Qi3jAIfjAUOFoo8GAoimPitmNoFgIAASAJhUVhl2RCdMrEQCGMKaGQARKDpIGAj5lhetabcAwM1K4J1owFSE2FXfiUzgNFjjQRkzOFTGMlZEGz1lWZCuKRGCSAYHhK7WxDAydlWMPrdtfQ09vvFH1WYfhhznsZvgycx03+WT/1mx06/MIK/KIP279onPZ6e+ye//Ie9+NEfWiPn7/M7vd7/d7dRF3bQYQQh3IAiiFnp74dPuuIJhgnJalk7Si6yDFKJgycrAguTBCwq2C3rMwkE9ojAAjJAjAS5lz8mBg5Q4SKhhkMgnu1dHRkmHc7r/+5JkgIb2PmTRu7s00AAADSAAAAEWFZdXrbDbAAAANIAAAATkg4AqUumNlBnR7vLMqY/afreFZIZZsrihFbxX3S205MpXZmq+dlYT3uYAub7YuGv1gSjvlmgGO08sHeb44IrQlRA6unSyPjoSJpy/r5dJ34lvX6zX6kfFwTeyzkipOavNxGJw3Y+4gu0Ma01/E6zTD1vFj67IlsrAEAAAEjoLAbcgYInE/qKMiawCAABoI8Es2Cgec6HlF4n2qQw1DNaP1cRJP8wfBMeD45KRgSNgFIVW0DLyc3mTpAc+Hd0BKuGLMnqTYJCbN9SCUKPpm6IrqR1jVd/mN5RuK87SsBs/uV2O93GcdeuMl+2n4z4dX4SIZ3kP+kQzuSW31C/5K1q4N68rb8J1WVxfCteq6/bfqnoLWnUMWVudcgxfIOm6gAgjyO/z2BgMfNQCRE7Kbhg4yaoFucqQVITTvUxEJXIwMKIZ3ZqPBTaMrMetQyXkF4Ai44St9ZlQ4UkQ7Y2zwywAda7HCoIhAo51SPDIfd7yUDwbYtwYSB5j0y2j+m9R//uSZIMG9SxN08N5XUQAAA0gAAABFKGTT228+ogAADSAAAAEkvtaySr/RhvK5ySKb6TKu/5UW1pfTlfY7J64DOKA9aBI/D1yL54yfil88k+J30TlT+jddDvtnNzmzm482PGplJzIvKFKgCBAAA0Nl6plBAJOchkWHjB0QBGXzNYfQqSpZMY2bBjkBNRSrMFCg0eYEz44t4xURBqfrhhRgCpr1TaUk6CXY8tu1GNHFIM0tR4ZQmyDafeShwVcV61BjrzkT20BGPfY+4uNe80ebvf13c+/FaHmV1R23hyIupZ7yNyDPnG953TYop3CediUKTnieZQjE5MKIkeVFTQXE62ExcqO8e8hKcjLcs+cS7kPIGw8tTltaeQuIn10YAobu/BRdM7YxzFoJToQ3EA9N6g9AdH0NTTZyCFol2zgCkA2QKBICuuOAICQ4x2HFH2ELnN0PKx3vSOUSZRP0CBRwgbe90DB4PeQJfgkxp6m3SunA927Tihx6rtqUOLf3yHWhcykq6ufp95z8aBCRlvUcUJs9xUXp+9pl7//H2fLVQYdmP/7kmSch/WbVNMjmlTgAAANIAAAARaVgUsOaVOAAAA0gAAABCoHVeDS1BJviuS6iyZUSibKF+x3JnoLz9SQtnGJkL5Aj5PypOuMC3FjqT8q9ZyaRAABEDs4fIAIb7jRggDPMvsEBYHh5WN4CoDSrGywA4aZwYLIpj4bq2SuWmR1AZqADX7SwIKW6eOPCoS1LZq2h0KybL6u5ECkjJs4MUpgXW4ikhjHLSPSre8laWd+7tDx8730gcBbH6fWEf3FX9nuQaE2k2Cg26ongevNRWa/OCK5Ml42yaFqOchdvN3SIrsyEET6C71EhTOHNBovws+cE3CuYN4RfOCJiTc/KPyMSmCp1HAQQJBBOW7iAyCm0e6x06C55gS4aaDJ9wlhxljMRKz2P2FBsW24IpFFQSZi0rCoIIAIyYYZrWqipSi3+KjREq6wpUZCJFnsci+D577NowXq1RCfO//IxnzNolrnuA1flJGqpBJP9pBvcwFTJ6GFeIdRyP1eoX/lN8QWX6BcKO2LJgpsZWr7v6dejaE4N9RfBF5X1AOCErgbYU7VoED/+5Jkp4b1kV7TK4wvkAAADSAAAAETUZNTjaxciAAANIAAAATAAAsT2EPih2AM8RQZ+quVUUYgDCOKvxAADHZ2BQkbeuFAwVB0lbEkdTB6rAQJgaMNCCwxh7eIoQw4P9sVzE4AezDYiCQkBbWd0BiVH6IUsDMAuJ96vIeETzmFBxmGeOs5jLOfgorereeV/RyTW/Ihf+T3f7wc84E84KccLJjxDkNR/5m5/ZKGmWkj9CXHzeP807luj8o3Iy7oYk2BAholODBQiCZm2Sl4QwBJCiE/EUgR5WGfkw2hRIewM1gGgYSkBEAYKRnMEIkOSbTJE6hiMMNnrxsEkMaI01NwQYkCMv3sRhJXcip4KKgFhvLUXSyt0uawAzrcCdMW6bnD0ZeIR2+R3jjopEnvBctZLxG/EMujgdXyqR/anXpGf5SWrr1PgxJdT7o3K+YmhHqDJqE505m3Fd24vg24OtXAIMAAFYanNKVzHgcgsJMJT0AJQPxLlswa+YwuhyG6lQEj5hJqhFAq8jHjIeu3VjTLwg9nbbpiiCLNd74yYiMWNSml//uSZMAH9O5eVCOPPjAAAA0gAAABE9GLUI4sWsAAADSAAAAEFh+exyQGM2q5KNtIzwtKpEibQEnFCG4/sClXckPy/RAt7QEt8isvvoPN8kCQ/cDavOYmf0PN+qXV0IYbwriL6i3Gj3xBsl9/fr5/bVee1RrtiFZKoaXXCpfFH3AAFPPsUoRKF5agw2fRs8totEuEZKixh8QJ4oJyIeG5woREdwRGBjAsWMjhRuMqRBMxgB2J+ADAhdHmk28qRmMPEO/TxxEEHEZ54YiYBGFNblCwI8IaOVRprSt1lzEn3ao+S+Mm7Gc3QZD9D0tVkMB3SdXDbnxcyT7tXJNma9FOa/w1CPRtWPVKVxs/Mb3BOCLrLwZTTgRTnBSvxQ83OQJMvQJ53aeObHqrfZNZyldWo75adrhWvaxvMn/aj/M/KN+qZUqAEIAABwPBoChJas70VxoPL1Q8MEtUz4PTAICZGXhNIkgyYFVfw6OFIz0NGXtuqQwq5DIwCeOpDwGPDez0FEJLCEE61I3cwaPKDOOJ7tNaH8EGCxCuGmzl5d9s+c1HG//7kmTgh/TPXtQjay6wAAANIAAAARjxl0iuPXrAAAA0gAAABOP1aovuCW8heswFOswHpnlFrWyqja0mVFPSESA4nu2wvLJ7otbjehh515yl/lO7/ECDr9EC4+OgW0CNnnCInFjygVLsxAXtWvG7VMI1s86zZR+d0MWpz55H5HYINIE5otDZQATlbkEiKhG5AgV5rEOjwKfwlBph59vUy5nBgUFmfBq2KXOqYTBhRCFPyxgZh8D027gySQ4/QjNGcqj9ve23pAQUhUB0BgAHpNzmCywwDPdhkyAsF8rgFosXejZLWfwzjPulWQpM76ocL1X0Jn/MJR6tIqnudzM1fdMOes4Om302tGbNTNr9FDfcITuBpn1NXOItziAfxIzb+Zsx1kifkqJplpeF7ir9ork3VFPtNsEqoBAAAEqIQDEgKJzmHXGimlQFQCYYPJ0kFiwuWaBgEasHRE+ysAO+ABybTGqunIVTMJrkzkA2dS1lAULYXZUFvYemfLBWEykCkwmZsMiv1VdkxFBk0pzXYawBB0S626oabG0Y0LrKlYG5357/+5Jk7of12mDSo48+sgAADSAAAAEWwXtNDj0ayAAANIAAAAQrAflaaMjTPY2GXvLls4Gh2oHd7Coy1EId9jTsaU68CUy1GF1MDauRgnXKLMuBh/7mX0d/Y6+mX7r6Kr8mJCt4wewlL5GbYSTAXDepHUZBAzZq4UAp+AKA5gIPxq6PhQCb1jgBGI7SGEwRK30ZgsLBguNQ4ALdiECwukICBVskyWACEIC4x1RwkJ8iMe7AS9zCES1w339bsUPRaAGJB5RQzFpCVJgAu7liBB08eAtfOmQRI6aiHS1/yPlCpfAnyJfSr7n209ZvvRCCo64A4VvQPl4YbWSMOqYtd0vlBGnzUvUYPppq46aolY7X6a/af4v9q+G/j9Uv4HyWFZ2LS7pMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqEDCAIIBV24lsobcIARn26oYQkjhDIFSsulIjLW69z+K+Gkdd6KBsX18wihOf6S8K7/HcdpGFMZKBN5wJviOboM9hHfUVfE7//uSZPSH9ZlTUiOaRNAAAA0gAAABFtVnRK7lFtAAADSAAAAEmPy/RO3+QErYqvzprFX0AnPYcl3KBgJkmtYvWf7NlOkX7bcK8OSOnCVoeGfeoWsERNFAAAAAAAKg8AwyAgiAUwdGY4Q+gxRB4sqggMFXUPCDQMRATMAQGMAw9M4IFMiQZDgUTrCprmc51mCIKIsl0hACIKpoaDBr6VRlGSpEIDZl5mGiVhB3zC2ACBxliBBMlk9gYHmOTCwmHUCzSNgwU4rlEiU4VBKGbkAMbiTOaoIAETaQPQjCOOwMkmbENkLR7YrOJPl1orlQIcm07SiWAoOTA8XMFYc5mhEe7Ues3lX49O1L9vdun+b5tHP7tqxnMK6tsi1kDzal3s7oqkxBTYAAAAA3DQFJ0orGDgEnitngJPQgNzBIIDJMVz7AvwwZUO6V5ilIxkeAQsBqE8FDYanj0ChEKANQjMUFgB09p8FwjAYNjFwvAUJLnPkYKpCYkgY0tnIJBMxwKN15BfQSGIbLvepQ80OAicWmduweqGNDGxvIDAQ82vdZkSTZc//7kmTjAPPRXVlrKh3WAAANIAAAARlNdT1O6VbIAAA0gAAABMTmlieNaca06I1sGyqqgyJAHMo5lG95c8slezn8oKLPVyWVf/Wfxhg0bmeooP41+Hk1PxhOX1/xi4xXuIu1wO9RNnodnqI1i67DCOsWxxlCcpQEGHOqWiPLEAmNSgogBRg94myhaSgRI1RgyOOjJgGcN0BGBDpAwMTY2k4Y10GZhT04ILgxvrRiOBaFFiWB8C7pgKARAFW2n5ArfSSCAuCkQLPfGhJnzq7YGx7P5sVGLMonEGQ4c5cqKWPf3OOIk2e8ZDb154K+eZyb15GRXmeLHGY3fECjSpA1j2egvbRDv93sJ5aqvqRPq3N6CFepCRo0mLOcTkhIOVk5eoAAAAAqkQIPwhUYSBAfExsZUAYJBWXwMEo/N3z/MGweRhxML2RMXhpSbU4MGSXBKAgIFAYAIqERiu/RosHhe98A4NDKFJoaeZDwwfT0BKIUAOo8AQUMSzBDj19oEW8JR7zM/tGAQLzyxwk3TKDxCl//MEEAgiqVJYYontAaU6id4K7/+5Bk/gb2ZF9PO7otwgAADSAAAAEVoX9I7m1P0AAANIAAAASYFnpgwcQfiB5Uh8AhuNcbEnSoVFePSsJZ/31Y7hzOMz3/hr2qGZEI1xdMIj+MbIO4mbQ+kvv6LV30Ts+Js27yIII5GIdCiZDoxxdGUYUYSExKPVAAFd0mGHp6AUHnPtaCh+goWrMWD8jx5WA3sSTMSL0FF5QBIcwcAjXYyGhG/MVMJnwOqjb2TBYJMsIOBoxAAjP4s2WLX39MfBweHGZolOIkSHOWoyL/zzgACdpKejHGJd4fWBqu008zgpbLL/UGaXD4LDhd+agKRf+remV+VmUkU5NJn1h/0wIr9KVVFMDK6ZTlpT9xzzsXkjd0S1keJA8V9KEUFcoRZNnWAKDq1kY5mTtUh3BL4lsSydju5W0BYN2Ts3UMpCQavwnBIPeUISmB9QYOyyjJ9otNwBAAAAAFRQ14n3EQENK9QIAk4XnMGLY22HEK7KIRjRXCSOT5hosEYzMVmMtOX6YVG4lQG+gUWKHtwKvlmJgp57BEDvU+ps2DVpFxkgtcUQj/+5Jk/4b2q2TPO7stwgAADSAAAAEbKZdJTmGWyAAANIAAAASGQ4QeSjybmENoPpaMdDL2s6oREJl9+mJQjEe53GEWr1WKvxj3bxZc84UKYRGmwmr2DKoM7nbMPajrUrvQZyimo13uflbQeWhi6CC5h6so0/GM7B1nKUVOiGEXnC3ZxINVoYHIpMEAbT2VTXkIA2Yp74oAVGh0BijWNVGIu6p8LAIyOuBZCLrUACA2Y0HbQn+ZCYXbZmwDtTlgFABo4nxrsPiAKD8DeQG1ow19i9JRlRMEBIFrU6EtTjVp/SJhZznxAUr73JAoKk9eFJ3Cwef77U5B32iJA4dyWRY5xoJ53oVmz+ATFPIhbV5Lb8l1+o6vO16tO4u/vrmHXsu/qaqevPRfE39PqmxXpoN4NSe3hN1WbFl6sHXaB9tbT0WnCsAAAAEoEjMoBFQ0b66xh0AL5QEGDTcfSGAYQUrhYAmSWiCjqy5mIUBoQuhoDUi0zGPMQgrPnDTEPFAisFnYuBBg4oJvXFymCOUNTsOgICNXBVRQ/OFQJn/rp/A4Dl01//uSZOcG9ahhUtOaLNIAAA0gAAABFy2VSy5pdQAAADSAAAAED5VIEmMcqoCC5uV6ReGjeBt7YLOZTzPmD4blC8mzb+u4lj+tH/varU9/jBFv6ANL54Y4gNzReWx8xqGvsupraHLjyNUdbNIvQVPxl8fNqgktjgu1FWrjGaPtj4u8E+AwAgHkioK5QACJ2+iixxSTAAMMWqM7UhUDGECoCMfM8yCAVYHvFAcYaECnoAdcwEuwyRtchRKEAjMsTppSOyg/BWiS/zVsyYjA7oFVafEsxaM4gwIlHT6gAtVQySRCEsPGbf2jEBoPsbQFh0qR8yTKlv1JlGrn0DI2g9/Bc5vFbvaQq8tJQ1vcoQTmyqcq4a6rk+ZPg4nGwlumDA1vo6Z8yOz4IBGuTZvwW/JvXzF3q3+fe/SdO9v8sqZiq5upz8dQm6oRAABwsizmkwKPPF4eLSVqdhhGfmEzaAiEiqBR4ZaiAKTSlLGG2JRaTBC8uoAAMBW9tXXYYa5FpEAr0PjBMAyNYhG2AmOAORDvy3IZ3PpxhsOWxhB/pdOU6GreSv/7kmTuhvXzYVJDmzxyAAANIAAAARg9l0kOaXUQAAA0gAAABKTkABEZlqImWHIrMCjh40tT5ULG57lLVSsncrpILR69oCx3wfHLKYCMz1RNzBcd9i/wmjwpS1xd8JGh32PX4IBlzSN+ULc5q/lhZ9rX+WbbUP/KF+k/5dd7m1zb/e37TD8cTDDDidZEDBwmjAGKhS5BOYkHycnhuYcgEiiBA+Ms0iMagCGgTchbZgyCQsGErYeYBhHdkT+sqLBge4nQ/faWYTDGZB6nCqiIJjdErBAz3AwFE7FQl5n9AoCy2RTD8iwszV6M0lh4kuWJsOSGLwhppCQgocjdaPs4bPatt0FgHu4+jKnHZztpW/91nsivfXZ7Z38Rl3PKW/C9+pH2OuuSof/x/ZeeC86hsWLzYmdqGA0eoO6uCotdqD0z1GuuDC7+e+L+K4lpz6ZfbSZfLy/tpleAEAAAKCS8b6BcGm6o+Ag2mIFQCYkMR08eDwPfRyTBL9EQFYlLBkDhCEKwFKYYMEIAiNz+0igZ9ZbbYL5C+h7+SJrRkYZQQrSURJj/+5Jk7QP172LSK5ldsAAADSAAAAEaIZdEDu1xwAAANIAAAATEH3+feGAuxUnScbkJHc6bN90Se58IkUimpCOARZJO6xYFYytPg8+X7aQ2fWlBnP5dIetJs6ghoL1n08mIaJIHs4W6yDyaWvkVeYko1RfNOUV5k2o70H6fvrT83fmjaSGZNyrqKblYaRZN0YBAztnYwSAJ+AqA5gk1xlCUxgQA7YggIjNQjxJah4CGPhQETg1FvoZKoMK+hkwU0unMQEDkJJQN9logiONZB5cyl1CZ0StlsdMDTjrw0DBzMXEMsDhJWlsXa2ZmGqMyy6MgZEC0e5aJLt6Aoy5AY0yHKhHQGlpLsSYV3PBN5qVXFEQO2wqLJ5AMLaySDtuoCptWQYDB7kdRC+UCiZePANTEgPr8g2X6zr5JJ3yaTfKjQ9sJbuZH+vEIt9w7H+qOdskW/yy+kibU5Sd9Q9dgp+0AUAAACRIjb1CodMM61ZIgASKhgOFHehoHCFnZIDjDl6AAOeGHwIIjQRhp89OGCuglOPPCEujM2t2rUyVSQmlqN+LJ//uSZOSH9YVl00OabNAAAA0gAAABGqWFRA7tb8gAADSAAAAEh4snjIn8C5OcqFJxs4nyVITojtxbJgQxPzHGjq03sbgkT9pp5WQoLedwR0w3nEHh73UASfvqPGqJAWEoBOquRh1ZwGGaYHDFUEd5wU3Ep9SXkK89+ScYFuIfjM7Qacob3bU59H69ffo2hBLhV0IIAAgM0rIUSEANHQkaIlRbJKcABIDD8pQI0ORIBIKmZQ6NK1Qp1BCEjMQAlNNFGbFfT96WEBHzm7xGGh/+jnoPGG7Vd9hBKZykEvhEjHRSBl11RoDWyy3xqr8/3MeAwyniQRUOuloBY0vUcBpfUXOXo63sJv5QvxJd+T69Q3rylf4ISvKL9UdTb3CA4YN7vKz7eDt3xXyi38uv0j35TP5l8igbTCo3MpYlEbYdD3cqJj8y1FCP47RtO84EAAkyclrXgIHzvNtMKANCswADDHNrOPK1YJpAoGzIXfMOgFu1IYBHJiwooVU0OmDzWHPmGoOQOMWplPi7bLLiz2h+KO6YWLy36R5yALmwg8RBhncADv/7kmTghPV8YtKjm1PwAAANIAAAARdtmU+uZXFIAAA0gAAABBREgnGKFSoBJt7ozgvGKYW4wRA6ijbrDIcc+xeYwwYlKJMnGfKozwmla0jXfZ1RrwCZz/B3o/fgHTPr5Ke+MHY++YCfp+kjn5YSM/kj2LTz+Rf/J7+BF/8SH/4av2H73EL7lXnMBt1iZFXiS9Yu67QXfgmvOUrUNjgANUOaICfJA46A4IhISCG/BkOcyUhws00QgBnhcLHzQX7aARVTnyiCRGVrlyruQISxWj9Q4Rqt1KA1phzCqIhHIrQInZMAk4r1qDREDHWUBkJCkJCmbBiAl7rUKjbjxQrKym1BNCtZdXUSCs6YXURPMOVeVc4SOsiI6ibppHdJaeZp5kc7n9RU2mUucbcvZ8qHKmpMkiipNIkXdM+eqpn7kutbLL2JMCBAAAAAmBj7OCwLMOBQ6CXBIiF/jAoLMVDE/yJjF4AQEkIaMtwwxcBmluwMD4zkVi/rjRMwEhRId1ryJZurcG/MCMyNYo1K2kG6RkQOkloNKHRDwp1GnmDsSSlp2iH/+5Jk6gb2aWXRq483IAAADSAAAAEU+ZdVreG0iAAANIAAAASYGqWW5YxGRzvcUKqKZzgcilS7GlXfFbWUcaHz82GSnHa4MGXjtLXcG5l5SBn4HUd9ABn6FSPsEP8gCH9UdbPKxB1DTA56a1XrOvzWvROX5LWvktv0m3wTXdBgauz4JbLVLC90pl6TpIqajaJBKOaIJoGyCAeGkvdwLg030+QUI0UASBzEzkOqj4KAFMYQAkzCzwxGs2ZwYPDZ8I7CsZGOQx83IM1EDhznYzzFUZjxkZdhpIVdDwiVuwISJtQUPtwcIOHlY6F3obKLdLet00s5usW1l92dQLIlV69Qo8tS58Awre5h4srXlQHlsfbhhtAQ4ERnEwOzsmQdILuFj2qLOpfUdahpvnvncfO406EOJ+cXWjltBtxs8FZI5DETqhAAARDSIPSFgca95hhwAOGh1C92OMKQxECy5wXFJkhumRwWpowswASQNqkvl+svHgCUMKWUhcY0QZV06kgxdHQCTEWdYC4x4LuaBiU4gZ5aNYAYop8xqga6BsEO4x9U//uSZO6G9o9lUuOaXNIAAA0gAAABFWlxTK5o79AAADSAAAAEjM94TJiwWUtgUkFixKW8mioMY9ZqXVWc5EGxN5/CkRDJkpjtOQ8d36hNbuIAz9wIU7yBDnCo2/JUP/wPR32ki/VPe83Z7m3y1vSNVUJM5s3+VV+GEi+EC33ps+TOvUVlyqlXAJWQCg4RH5h4YBcUbFEGDwIAxh2NBxIAAOFFcUwYDHMYagEumTmAwaDuQvDD1KALQLVTkDqYnvXLPr0Yo1FnKiD1s9B1kWZyaLhYoB6LyNLioMDiR+xpeQ6Xf6UyWRMWzuQGAAMvmIqVR4cAlvcWbRTuVA0nWeThwd3jA1XvD4nUKsW8uXi1CCjzo4ZyPKPCg7r7SGud4j38Ea+UH+qlXZ455gbu87S3op7IP8y697zee1Cz1iY3aUu/Njnwb9ZTb+iy6kxBTUUzLjEwMKqqqqqqsEGBAAABRTpoQasZMEEixnlQz5BGBBwwVfPGLQEIF93EMjPg40d9rCI57CsUu8GLlvUuFYPVg7OySgjTtexVBKjfaqjISqsxV//7kmTuhvYgX1Irml1CAAANIAAAARgpl0rO6W/AAAA0gAAABIOFNtd1HUFqPn40fP2wK/q86KhHPVClPs8Zv6Hs77x1L6ijq2lU9NI/wbreob/lL/y3+C++DRnxfLlHVsazlk+kj+47807tU58qR1m3DlCyocXn72neEVVa3NL6pOvRhd9ooYAARkwcwpnuBiE7+MeAjwcABhH5NenMeAabHzLyQ4LTeSBwc3jlLSFRYtynubIncJ/yqDGkmuxIhCwv+PUNM6OkvgPweKzABdW7JFusIrOMdAXD2IAk6zEp8er5gSXu+ivj5dcd6kuOl9Rc+oFuHm8Pqw3NrF5vNqpxuOG6jzZQSdhU2gt2GwZocGUNaGWQ8WDZkYsmYNkUi9USAAAAQIWCSGoqGA8bBCgPCkCgQMBQFMQjXOdxFBQfFAAAUDTGIxQwsy/Cg5gQGB/bCYs0xAq9gl4wd4nCBfVQmmowIpD8s7VSpNEgIj0fboCVZwRDO3Qhox68SGy6OsqNSLaFSS5lKWWWcQHRUxTS8YBCVmQ90t9qG8aVrnPrP9D/+5Jk44L1T2ZV63lbcAAADSAAAAETaY1ZrTT4iAAANIAAAAR+tisA2ZRDz0KDLOF48NoFRGlQaGxcKdQsPw/oosn6jbUVXqxTU0zY19F2I3sh71I2eg3e6iZU4dLIkUXQVi1HHuhEiqAAKFWBH/AgBGt50CwuNyBIGmIhpHD4iBAPuqt4xsOYMJJAKtgwHB49gHFgl1mWByUGbDvSabOZD835zQwHuWT1obNBFWBRGLDhqbMNNZp2uAg7anjMJLiMggOrKU7F/Z0kFEofYlUDFggEgW19CQAdP2/JGA8zzbBhvzx4tCIcdDBuW3FBlQunygkthQCnUFa4zE5sPHyMaaGF8oSpkZ2rvkB3JU1InoLy3Gj6EugxbKH6k7ZGXlDkMExBTUUzLjEwMKqqqqqqqqqqqtMgAABGzQACJrwFQ05LhLflwDARUGaBiC4YMAq1KWGUugQkNvAgjHTDzNg0ojoFSQ5prXmEGfCEh7ndEnjCJw4AAdLuxLwYCDUS3kN3k6Fn49lgOJZZ3cwrNbwD0WbtIIY87awI406tIU3zijh+//uSZP+G9ipi0ku6U/AAAA0gAAABFzWDSK7tT9AAADSAAAAEoQjNShE+hhDHBYymifxe+JjNRI5UN8LpqHcRuhds07NQ+x573HC1Y0M1Jvic9T4kVOBcWmCoS3qLSdypRqHkGZx2DAJgUfWeP+IAQZDtwOBgBAYABRg1rHuhEChyhKTFMYuUw4C25NzMDAIz+JhoByh/QskwUHXSrs3POhn4rGwsgFwshuyUwkJRmBqcKsDBlZReiZVTNKy7PD1eR8zQ7LVq/okHyC7Fh0ETH6TPAOh/jKXYI5ZUqkFHCJbewunzB1dkl1RJG4oiN+R/vx7u8wLX1mhv8qHPSLK96vEw6drr2G7eVDtRsNvVUX6QJszI912me+DTfsRgDk6MRUxBTUUzLjEwMFVVVVWCAAAABMaNLls+FAGZFoKwocAzAwYMTjE8wOygC9VcZWIZl8AvJaKogOwKcl9oJJN4dvmtpoHGfSuJTZVWEVi/WiRnw8onpanMGk3uhx7gSAKwm+t3BAarq+9S/MsK5VETs3TKNDSvWF1Sm3/btLf1iwu7vv/7kmT2BvV+ZVRLbz6QAAANIAAAARdlhU0uaXMIAAA0gAAABA4D0gsqPcYe44L2NgoTqOBK+XGODx6ic7g+ahcZ1H/N5/QdbU7s+hNsTLyO5odUoEDmsPnOhw9oTLuiqVZJJpoEAXKDarqiC4gN2Tww6CE2wQFjDNDNUJUwWBEBIjChVmBi8RMjWgYFFpxKrRqRU5jHIH18iaYZrdpQHx4Ouh7ZAkGuQaIbcksoKqU54pY9JFh1Gq2tOqNGcHzmXW6ROx7xkhO7EcHaHo0u5pYCT4VvmsvziMH3PHgH6IMGUG1pwzaTMqPBsliEtU4LnYVLtUBJ7VDWokk2nBtHmFzqF/P0euL1mzM4XvQUhgzEclhCWLR8ITyk0kWxqTLWEpUSAAABGg4rt+GAKa4l2GDKXyUDMHFNOHRhMLQGTpLgGUooDyEotuCYCAydmBqLLVXMZo8HOhziS4wIIMygBofgadKrEY4G0Wl2mImiEFE8RCfmqDTyvHLQoKjQHjm6Y07vPq6nvn3GJhYinJbOEgKRF13mlTQJnlUhvfKzPIVvTDz/+5Jk+Qb1nmXTy5o78gAADSAAAAEXkZVLLmjvwAAANIAAAASkQdFOCeJ1BHHy0A2XyoUBJg+fVgoGniSONYKiakjWIn2Vs9Hxn1M4gz3qIhsjLZoschFFDSTQ0atbmFirVOMpH5okODzsUMBQNN7ihDivAQIGCoUmKgeHfIdEQzltEEJhzDJheEaIT7gwTDDogh4RWBkgEDCWBxXL9eUxsDMxwwULPbODLIsNFIfGQYxNrKwyQs7BxIRug8EQXAJhRMhFZwHAMygOpcJMQjb6dmYBEZaxWkbUZLVEaOUpMKUyaYRRl7w3AoGTyTK9w/Lq553KTB3qyLKyL9oBN/qQOlxzyN7/gF3m/RZ46+VqD+8WZvhgv/LG15F3j4hsk/901/Ihtv1IrZvVJsv8q3N80VOMXYr+zzPw3RL+zfbXsr5v4yzKKqEgAAAABUDkxCFNwIGDgcmDgxBAJCZjagG/UIIwq+gNAw00B6FKtZkAQOaCDJEGMmQGBV4YgAkPw6AgKI0g/MgxBtBfOQTb0HU47sYgkk8CjqYE5D4zUmZ3NWQK//uSZP+H9hdl0kO7U/AAAA0gAAABG+mVRA7t8wAAADSAAAAEGu9nZRlinNzZKBL6kmGDxICn6qA4OMorBMu4AfBa9iS3k+3chm/0RorsMovKif+WGfvHV+QJbe8hXeSkb0JOVshu4+n6qa/LzL3B6feYL35YvwiTqhAKSNdJgZXdIeinyo+adUuca57X5wfxYDAA8NZbBAyETSGLBQjTAGQOYToh3YwGAACxcUGxgGfDAGePIlB5zoi81E0gqvhRwOu5AOBzEH97YteFDwaM4szCGjOQwmCJHSkQkHk7+OxkgDJhyjpHbMjDIPy4yN18fmRUBdaYjKToYgXsrKizUc9cazh+27xXvjA0t5hjxBBT6BCk0EoavYAz1QhCOuoKb8aDT6EIdzi8eWfWMFK4IS/ZuSTa8mvg78rr1v5T+K/e/d54Mq4GJG4+1YIAAAAFwwdWFM/GAYMHGWJQECoEmBwPGHIaHHAIBwOojFqDJMGQ47CYAoZCgPGYpQbJG0KHYL+S6AUSDm6G/vYglELSqCLsIMZxhUheoqOTdlF2wVHAa//7kmTtBvZEZNLTmV0yAAANIAAAARdRl0sObQ/IAAA0gAAABHU1+01UFaJBapGjwrDDEYBSimqLQEptFlgi/T5fWbff13hjWHkQh3ygmJkxawyXQVSfhorw88L7kIWGqGJuof7jA7chSiGUZuZ0LOjlTOMjONnmhVE1qhcnzx8CvIAyZ7iFSxUkRGHhrUABYuOCtIwIHziPPEjChuYGDBlG+n7Eik9KxGLTEOXMICFmFEYTApySPKHCXaKxJzQTlcAIgbs9reszBYBBafruy7pjkg+zUFzGAEJ1AYTCrA5YYoajyHSxWGzKy1zpZSIc3Ymc5kCiMIpoPJRgMPZddlTQVOb32GuXsMZmB730BIeiCotriU/eP8Q4eD3sHtfweOfAD2tzAjXAeF/KR8nUEKO5Hd8QW/Z9vzVzwzujvEwc+CyvTW+CAvpM9xZstxZnHyt9p1WAAAAYkuU/oJAh0CEExKbVbQUvZ2VImJwMGAUHAM1oAh6PpAJjgwGmuQC50YaSIkyDjzA0EoqHzyKFQ3FUiwy+/a7GTGfEiwV/lzkqQ5z/+5Jk6ob2AWVSy7pT8gAADSAAAAEYyZdGrm1vwAAANIAAAAStMSJvqFFwsuh2RMJMIodeQSxZJEE3c2mxI77vDIpEeGrMqHQ0EW78kUjY/ke1rJwnPuCgx0DfEZsRl0EZ6jxbHgHdwR4OjFqCOhMhqGPIakDONOY1UHjc1tDmx0tyrXHS3HWuqajusoyAcCk63IsobSgULDylUAQRMTiLO7wrMOQEMAgFHQ2MIl6AAVJ6ukYACAbNMBgK4TRQrboHuRZQjOsTZfA8gEZ6aCDQeyNN8zBBEh+MM9IRo7sjSzbRp5UVohO319Agvadap09SIhsVfQHTt20yIoT7dmqkenjcsO+JC8v37PJNd4oAxngOG5QAwbcftkBfnPkhj1GLZi2IwozZri22RjlSofmUGAUugyNyAetQYLqP2Shfnm7etUZtSN6EY/z7WIx+yhYHYm0gwDBE1uQ0DDGAACMCwnMRlOOeTIAwBtsWwMwwZBSQoEy/hg+C5xD+48vhsAPokZs0fctqciXKvjcPFVbEmCXywcASWeGQZlKyiUbNZQlM//uSZOYH9bdl0iuaPNQAAA0gAAABGEWXRq7tT8AAADSAAAAE26OOYCLESZuclJmoxDz+R1+yYdxwpVmtQxonhKBuL2JKKBb/0mKqpZTmXIu+WWUYU0qCiN1YXdemPN6jAwzlWfPI49uO43eslD+obtYkp3MRyNpjwfHCnkk7rm7vUb6BkhqQbTW+k65l1nn2L3JFsxNMAADEiiDI+KARu+UpZ1RcLdx0jYAhVOYgDTCcEFBbPG7lzQ3ENCqsvHD48nvVlOh8TT080KBwVEswBLhpGUHaOgeETUPLBlQKixoDlYkgGU27nyxLDPt1k9jWMFsk/WocfPPscTp5/wTe/4ubEwb1GvUx883Rm0M4+9TyfFDaEOPl+N+hHlH5LlW1Z85dLJII9XOsfajHtY1bKQfHnNLEAAAAAABRhUFI6ALPgYC5hItrc3DAgDGFZdHRAkA4cUxkOY8iBEYSUD9iAIj1dEaYtKS9pR+7dQ5nfNpR8f5TQFvH4aXEjFWU5Yg9JCMADFqlOxAUZwDUrvUGXmhRCXkoAmId5QjQSQZZuioRY//7kmTohvYkZVGDu2vwAAANIAAAARPFlVEt6O/IAAA0gAAABD2hOuflEiYXR80qnF8+6BDGeYdn7EDP1JBs7Rmp2uhv8ve+2m93DX9JsZcld/YfnLqZ7RM71A3XUKy/6rdfo3+cHX0kv+if7mZZ3DqG66LfNJFlwKsb6FKkRABCuYGATlKPiMWGTpoWeRvAgWMbrs/gpwgIJzkAUMUQAu0z9lBgcDnMmssm4AZwNSsazsnGPYWulRAeAfR12QgiINBqWVCMWB80b3wQFUL7vvAEVKTVGrIRIcbfFLoz3NjDi83QxqEXd3EcN92o231z2gRE3oRwahuSjK9U3rYanr8dLq0yPFyi5nblpk+Xt5ctctXZ0b15yfkrM+5Mj1dENUuNF7lj49SpmyN/JNh8kw97TRbh59lBgaTqwAAABAoJy1wjAwBN2z0MJqjIWBBiv3m23iZJDBakRA4moRoAEJdx0ABE1mSEooFgwwIQSHPlHVMz11Wt0kNjlofAMmbg6Rl4gksjcuABc8ihXtPDqX5E6pMWNA6nP14GKhYiS2cpsKH/+5Jk9gb2OWVS47pL8AAADSAAAAEXhYdNjmlvyAAANIAAAAR1x1tRqPY9xbR5abKaQTz36SVZvX/SVNH34BgTP9sZq5/Kcr3w6b/4in+q1v6Kvyq+dNQxvVJM/7ee4yzlkV+0r9pH5eKjWdJucaSP/1PPazf6RDPJlCMvlHazqI9/qoP/fBgoABAYABAKSgpjkQXfku8ZuGShYCABg0MmFiaUpYWDTmrBmATeHBl/I4OAIBFBoNrYqth/2X5OjMt+VNBj8sokQRZrlXJDG4ryV6kdXFzsrZZ3U8k46fM48hg23co66ue4QW9UFPggT3vEZ3ksy+Cx3CBbXld/FX6pt7CDbyfErHpkp96CjNA0rlN7Ye9K+nLuqbl580XqXGR7ppOu4at0r1wmpXJIPbDctuXHb7SOrszfGWwBAAAAALERGl0aLoGtxEPBlogFBZiZXHhzYBQuhIWmDkqDh3CJ5Hs28N+qtcRoVxX8XfNyju9pAuYFw8WksyBDo0bpIyl8dkGpOUyNNBAnnnSoAoOuzyyl/2vuQ3GMvjjT7X6hqEd1//uSZPMA9k1l0jOaTHAAAA0gAAABFomXV+5hcUgAADSAAAAExseH5QXKNeoLxNeKBAlsJAIcMIZ3BC/Ydj/sX9nuOg7n3lpkQz6uAgvoWX4mNo+2hJniqqOLzFuBtvQy6nsu/e0blJWTlBQKFzMSAJWEZ92AMAzbjHEhunwCQWKXw700DHgNRGTEKqWRe7K0FDRxlryqWFTCkVKIiyg4ghnUYehiQmGZvEXZBjgMHOzkOBzjMmhymHxhEPF4vhKUOte/FkniJPPfTioWhs8lC0J3unrVBjnflUX5xoq3e/gQpRJKGJZsDMQLowypubG9UmPhnwUkivMGR6jua/kmfKk++kPg9XJhdy5Wa4/pWfj/bV1CZverLJ56c1Z/lM3ee65RaUxBTUWEAAEAAAAAqDyPgB0woBjKrAR8UDBgGMShQ98ExYiq+gQFCYmKEDwhAGcZLGuzQNog4X3XmnIOLWwUVGh1qUS4ElkzNSlMgLE22r05AMZNb7NAwBCM6KukFP8uqKwfl2+ynmWB8ds0raXmIR/Ii9ahed8Qy38xW+1Pk//7kmTzBvWQYdRjmkPyAAANIAAAARa5l00OaW/IAAA0gAAABMv6hbXpV/X7FPku/YXXsuf2XyTL2PNPlhm/+PTf+nNwqgVN1ZO6DIY9I6ee5E7HBSu4sGwACHEc8rRhgERDBaIJfMwKCox5ec4ITMKA4tUvuYGlOYIAi3JqpgIAJ66wvTrtmA8YGnnOlaKxnTuiV9cwEnHoNraqjCDDUEicYtSsGOVLmpWFYxUeDgC5SNgMDL0YLNdgK7pFlHhEIN9j2AVjcs0pYB2uV/oEkZNhk1xQik9UB0R7ysA8/KA8nlNUqrzULN8EV3mw7/hE1+B6ZwYIMZlZH83J1/nb1Dp/kwZLog5G8h+s878sv6udUrby1v6Czrp+/m+IKD7WKqJMQU1FMy4xMAMAAAASDus3EGgwZWLkHAttV5hwr50OYphWBgYAq1zC4AQcGz8t2QIHnDRWLUDcRW7Hp6KSlDEAN0AWJWICcBATbU7kBZjWTSUDgi1bDM9LyUaQG2uUyAx+9ZwQkx3GICMEV5uri5E5ltN2Ecre1e7h7hPjhuRtLLz/+5Jk/AL1bWPU65pbcgAADSAAAAEZIZVGru1vyAAANIAAAASkAxvikR+5BGOO3BzmBvPVoh+bEGt3qgls7SN2cSXzcka+VL5gevZC35WyOjn3p1w9n81zK/U/7pvh3fLJ4ReqLBwJTMaLUmi55hwYjgAGA4OmHg5HYoqCQztqh2MDh2Sjf3QBBUyTHtj8VhsQFKY8gLeiy5jD0U2byqjHTwFQ5jRZwWdHnoEzcs+WRoK8+YykkRfo44ASKTVGQBKCQJyYbumbb63Ree/ycl9bvNSG3910FX59IIDBl8Dao1MFCZfh9rkgATI4KV4tIYszBUn+8yfwWL/BgZ3JQbVuQX9RZb4/syMvct+oz02rdnDlcx70EPl3eocuLtn2cdSkMAAAAVhpQgBMFgA50KhYloKGAQmZAzwEfBgQHoLKeMVjAmAEucMwEEDDqgTDhcuBBdA0SgKdXYZmGBMEpNcEQDAxFkMspwAaHCswUQAcQDK/Wi6Tg8CavKw6CYrnPIvAsZtQBTax8IoJubUh6EmtuCSb+kYDlbdDKTX7GF1fXOxw//uSZPuH9c5j0sO7W/IAAA0gAAABF4mPSg7ldQgAADSAAAAE/yTr8iorOeRF51HrMkgo9hPr1EPwS3dQf+R7Z+OuuZLPeud4ksryotjyS31DvyPKPlD+pVWiVK7kl1G22vhVieCBgCAL2M7CgHGlZlAYVC24AAwxROo78HQw6AcOAIu6Sgy6MjYgBgbMohteKVw+DRlMmQJikQaofccNCJHAKM48dvMYeceFD0CfuoyG6J81kSAhoDR6gIvZbs33CDE89zN24HvaurupdcUagbP8G9z59Cyq7zFWWV6+6nBjjqJXuautJy4AoIl5LI8YIz8iEAS5YMP4kG34iCNVlhvvEEh9QaJEwCHChKOrgu6yza+7/V+RIZNEH1Gj/AfN2JXH9BJ3ChoZdUAAAldQugW7MuFtEg/WDMCAcMXUXOAjpMDgEdN0jAQCgwBIo3MUC0zJCRLqKvQIhDMpQAiPsKOpbb99KFYEs/G3ahBi44QdiXGXj6tm0IkaiTFPvzAcaU9YnXRBwaL/pMVcerMfRVq99n1/XMExqfWVVKCd7k7rUv/7kmT/g/YKZdLDj16iAAANIAAAARilm0qu6ROAAAA0gAAABMN6Sv1/xyDv/TKKP0yczeGZYzUIdfzg6bmar0iGuaHq60Rpp2STW5onrcmBL97V/aQFfkyfIPqVX/LDW9RBatx6uVV/adX4Sq9RWgIJAW5PQaQB4wzgjAQCXmnsYEsZ6dZmLwEXxC4EHQ4JFl3Yks01QLkkZFIATFF0bO4YUxMz0VZK8BkeXmtxN1AJbFndFYIBJtlDm6vkgpM2zyhGCstsUrdQcUs9rRtqW8qsro/3Hnvz/NaM/rOCnR5nk3K1v9sAvf9NO8/Un66sPlqiSJbyhz0HgcPjBfE4m4obQJz5wnCTcryge+cXXHW1SrCMWaaa+PnPOctmk1qWvslDhl6FgAAQQCjwtiJALMo15MEgHQQGAIMjROHNYXDQxLNjQJBlscjnAqA59aqQU67YBrgr+1KIMfMDrX7L6dASGXHybq1kyxYFOnVlc6FC6oLcnIBi6LF2DAYMnu0y0CIq9n6eKR7tXYrPcqUj3Z/QMgtd3cVHa+UiH8gAVW6BIHf/+5Bk+wP2GGZSq7pc4AAADSAAAAEWsY9NDmjxwAAANIAAAATe8gTnpI3ahIJVWgcZ8GVbyIeqFjJkQkZe4t96pGrYcvzE0vskL+8qP1mCPzzyka/Nz8w3he/h3fK7/173r1aAMPEmXKCmBwocQdwcOhoAGBQWYYmwBfhgwFqBDgDMIl8aFUOTxgAGGe6Q/DzDSHKPk2PRFS0xjCeitsKHAGVYpYa2Q2Gmw7UrGZJN7ckRIabv/YgBg9q/Ik3gELosbjSItzkfXtf3gtN5stXLEst3IDdqv1IBEs6QPGZ81OWWRM14r75CIU5iQDu/KXnVAc9D6bh7mZ9pyl7ZHJ3RyHxeG3ijEenE1vWQ5/5e4CnKTG4f4N7s5O9qlfvQHm96Bv+sR4oASYMIq6xWABqKBw8MKOZgAAxhiVByYEgcQKOTYTC4KiYJm8mggBzDgh1/ZzQgJcHCUozDDSiFoiBl0dLHxxj1oAjRltCZkisR80g1aMpEIQpjGrToUuvLONzHro3ygR2ZpZ1JVhJZz2EtX/66q8nwzlIsBeyvt2eTn+z/+5Jk/Qb13WXTK7pb8gAADSAAAAEYWZtMzmkvwAAANIAAAAT/uGGDz97qUce5QzHTjqCURMYVHNUWk8dGx9QqWeaGdxMLdAvZFF74qa6jTzur6EzKmnNQVEy8dFh08dLUQUvj5fQbMpAIACIyddgwSFzikvEjGnKYGEhkFsnNmeDgA1lVIELB3IzIjCACMylxLKs3QZUpgcDSN52lAUmpdw1DoBAJFD3ubE2QAk8PjJ5C/QhLT4xZOxqeXzQziMUt5eIGpZrWG5JM38MFA6LmTI5FV5gsI51TcSVXz5eaM1DueS2Nbztz3/UlcmdGLm0EHagzJXjIKc10DwmOqB18Zjmggi2TCLfBlLRpyB7qcW0MTKvqSN355z49eqFs4YJqT6i8tUxBTUUzLjEwMFVVVVVVVUBAAAAAJMOZQ2EUAhkOQIqLrR3MEI852VwUKmWtUMDiAMIDtv4nEZsGMYidAIzKxWzJYJMTA5QqMx4cBYJCEM2oOLAzpbn7IAVB1e2HweEmYhJyGP58DhcJ48NK3y1DgiZ6dQF9tQbCs1bJBt/C//uSZPyC9fVmUwu5POAAAA0gAAABF6GZTQ5hVwAAADSAAAAEQKT+Uudf5jIr8HezvhAMUE4l84yyi93YTNoLz9hjULq2UeonL7Eu4vVVH1ehVdXzGV8fOmGHn0d2RB17LSZfHWkBwNgNhQwITN99BAHEQEMEh8xshDzKOBwDpIZMMnUSSLTmxlgLmmwMozLYACh9DDZBLRIJMYkBGi11VUMZLaNzfIRCsiB8IrqGAgEt52GkCm3s3apKEXZmM5UCLi0rCcZKrgItU5uklY+vQWsyc4mC23vq4tP5SaM/6YVMTM7AgomBWrgaEXmQXcCU6+CpvcPHns1vBpd8iL3eI7zIa/GhaIcc/oH0fL+MEa/EM+vbuBvU5C32OrUYKwsmrExBTUVCAQAAIgg/T+g0CG2m4GFZHFYclaxw5BGGgCmMnqKp0LgFr0sZKaMED27gIQEkDJR5ZesMFjGLAGkjoqQ51d6DdmRw9eK0bPkA0J7hLkz9Y1kxGhzuVctJFf5EGoXcppOHX3W4PPhu6sDb780mfa/bVGo8/TtZfuszfv8eKf/7kmT2B/V0ZlTbjz4wAAANIAAAAReNl06uPRqIAAA0gAAABOawExj1d5EeTOg9HGmGCwyRF6iAP0GRZ7CfqVFK1IuRixoRO1RRzztSFHliV9n1KsrHknMN3P0UvAAMDhkrbkQCmrIEAooAcA5gICBiGCZxUMo8KrLkjzBwZxIqmaSeeMuxrdqQzw4GYKR1yX3ZSaq8LD516CQiB5yo5xY5JKVNHardgQXprekl0k7WcFCpyMW408BggL5Z3FkDwCplklFb/jpDRPt7Nnr381HVMJf3NJxUG/9sMm37xrO3rN6KPjA7fBBvvUHg5GVGdxI9k2t5o7oPw5vhI7FoEg76IybpkuvVEt1A8fsLuLVPfa1ebI37o+nVw2v3/zH6RnVMQU1FVUIAAAASIMbfQLgs2ZBQcP2KIuGAVuZpWpgsCJqrDGLDsTI51YCLmGYjETAHLocBAc+JlsUlO9gOEfuCBg07koLlEXMFImFt2NBciQ1Z1RtaVSl4pNcM9MRYMftc61QoBzz2ja+fOPWqKn+4jJC8f9stHvSsjHd/qALP6iL/+5Jk/YP1rWZUQ5hVUAAADSAAAAEYeZlMrulzgAAANIAAAASvMe7j0smHgKPWVIPQXkaD482BpDl2zgL8LkEoJL8GqiA8bQjxsW5AvlTNnNx8Z3ruTap7PiclzNBwuNBZKmqlQGjDdqAQAUOBUDTCQPRsCxYVk+UpjA8sAQBjsy4wBAMxrJtMyKyICCAPII4jrqHAggVE5iDXhNKtoT4QAIzSZ2LY2wvDDcxZUfbSESqCSFGU3ceAQCz/FFB5TO1BhANKrNaGQcRS2polEvWsc1kUfNqpOL+9N2s9+SMp7+M7JolUBVf2mUclLuUTWrgQ6+R7Py55BV5FvqBu+DEjzwYFt8D9fKxG/XX3okJW9q/onL5df1vuXR7pM4lzq3ZmDAdd1Q4wADEzxj8wuBMgAAwFBMxuXgxTUIcA1rwMAAwLJAx+AtV8CGCwJGGiAI8w9BJYKgyCDFcz7l3TlZhac12FpVnbaEQJ+ndFLZQVn7TMwKmdCrSuoJRWOUNYOKpEXMEngaLgTCqmELRZdt9i7cJ7okCAobDHbo0ChEi+WJUx//uSZP0H9bVmVEOZPOAAAA0gAAABGEmZTg7ldUAAADSAAAAEivokFI1ZfdZPW7qXlAKmxxdN/b/HjVNP3dxiHufUf2i787L9dzFNY/p41TJiAzXQIt8Ggav7FZMijYRVvG8hdZUbxA6iBCs7MBAx1S/A8OrPnv0TyVvYt8mhDfBJ4UJMUAACw0LjQyEAI3cjA41M5FAAY3SB6oYBhRSuZaY3Q5QSW+dwDBcxYhVBJfUHCMTC1izoSo5Sh6mB6AcDABFFfayCD6HPkApWr17GmHPXRY0CEpdNnk0nVF7Ele1cFJZj7pd/UFRO/hVUxi/Pgpq9jmBYfH5iPTeHhes8Qt8lIw+R3z8FMdlC96pvHqnF/advhvyk1nF7eCffmse04t7y35Vn1H36Veq79x/4w+rU8vJagAAAsF4gyMwUEjqLOM0AgwSATAwYMevc980QUDKERgcxs0TBYDUsVvEhYcHOkIyxMJkJGmXxlbRgZRigElFCqiBwYcjSsJlzuNKoZFRxl2ajsFSgOv1m8QABaBU5KQhC1fmXLIkbGLPSgW9cxv/7kmT/h/cJZlIDulzwAAANIAAAARYNdVCOZXNIAAA0gAAABBpOLWuJdOfqp7lVf9drm67Sr1wz+Anmq/WV13cbiW6VANPReBp0tHdXyND+CBLPcS6vQHfw05bKPEjnShfzebhVE7wyq1F+tInX3VOyktb9r8pOjhpzhVrWykb00BAGIwEIQarIVBKbY85hcNhQBO8BLie5bJj0HBgRLZGOg8JP9grYguFDpgbDC66zgiMPhAgkUfTEMMGRcrFcm5GIwvFmtpoGAUGDn/bZC5PWSV+7MLCwoivT3HbDFc3DVuUDSmW5zI4fIgtzb6I0TWU9ML+z1pKzPvzbeznwCMjyUAnv06Ll5VDR1UeI3rl0ugpJzabC3JIfEQQaF9mv6Bf9qP7zXjcs63svhWm+6u2HvqffBr7munepPaj/nby8y7LZVcAAAAAAAlgEBQCBS8R0LDEZ5DBkDEABgaC4OKE6/GoSIZJFN4xtANDAGhw6YCjniuagTTYKHDsiFaGOJVGgjJa2XSwKmploc1dO9nBlQQPYz5S4DBJyx0nzG5GKjgn/+5Jk9Yf2SWXSq5ldUgAADSAAAAEYYY9Ijml2yAAANIAAAAQrTHvSJEkurw8SABbd+EX8ET7EqRb6z4uxjRt4J/JXWlb8ZTuvqE8+dwN4zXVa+Y/8BkU36eHeCuBf4/6H6Vx/vBc2RUGdjl+sjt367FEblb5NzDsAAhAbFtWJGFQYm78RmWQUhcCjAsSTGS0jEWaDFoLzAEAAQBJhyU4COtN4EgGYgCwBUUMGQLcRwiQcwMQE66RAAhQiqaT2xIwQDsz+FwFAqrkuOYIKYZWRNZeMQPxouSCAJMta5gSkTH8piybpWztNeuHhkQDiejwiJCKkwDHpYnePL0ujOEMRicxsDoU5t/b0I4Z5GADg5MoNOeGA1r73eotF09c58RDnrmez092Do8nYD4xvDPf1J+dtmeetk5kf3D83izND+FmAAAAAAYOB7fPqNAI8gtxqHo8hQOGDOKoaQwLxxAyYWCF7QhQBVMvVDAxkQPsKxYYd+CAoVgqIf1/rgKphJNeJwzAD44w3HgBbBacwkYDGVWNTAuufq2A4DWYXbESgYsKR//uSZO4G9Y4y0mO7evIAAA0gAAABGSDnPw7tdsgAADSAAAAEeMMhDoRks9SMCIj6RX6YQCqcEtlrIQEASGmsLwU9a3wQBMhrclDO63KCCJD29jDd/GksT1rlWzazwsZ5cx+xjhezz3dCFHWuIxydB/UnEZghwiJgq/Uimd8gBweOepIfLq7a0lcAAAATuHrWBAI0UUBRk9ZF/ETwYCDFq7OlIUtpALWjDbkNJm0VAZzTcas0zMSiJyntmWUjQvC6SmiyeVNShd7e1uVk+iTchZYRCQHDUkHgcZ5yCQGt7zMydpC2bgXEPPhVbYSH6/V/dTuJZxBX9WTONy3wdrhRlRppzG+7uuu2O4bfuVPTmMPtQd/G8mRcJFkO0XuSijznvT3LuQc5j1mOYdtyK/Siq1QqhCqQAAhgvKapPDIAmQMEgoGUMCwABh5Op5WqpiaFBgUBoiBQwjOYHKgkneMDgoMMphIZdeKAkUCSSNMkIgEZygEHKduSYGYGygbAmZtQIhgmRnkX2IQ4+l3CCpyE8xCuByY88iUqMmOSYKnYqOgbNv/7kmTvhvYvOVDLntmCAAANIAAAARVJmVHuaWvAAAA0gAAABIrPxkCAyeN6cWDCBJ5qsogJQqR/MCMBilrrS233uQ0UOw8CZZRw0fJQNQtGgF8yI4MOouAlVkBw/YcDh+55UZbyqEROlI8zNveTEQNESvKW+hvxB27leW6aJ/Cc5dk5ewjTksABAYR3CSJEgXMnjAAwXDwAGBIGiRKh6jgoW26DAAmNp8gIXXW4NCjvcXHfhNMobi1BMyNiEAbOeWdi0rEZ0B35HGIUQOocmYYLB0zMhCuCp8v8NEMaWmMqmfTCQrbIjt/C6svCkolFYpj+EdZmsBcttxZP/ypeLHZiaKkaVH8wHdpxro8q43LbLUXtf18tjBNAobhDgPzLhI5Hbq3kf99jFJB2dWJd5E+gQNSVl9QawCACAAAAALhhokMASYZiROD8YzINEhIKgoAoDpqRCaqbpqRqLHaKjfmBAJkZoUCcVumQLRjALCIBmDKhAaJpJUGRkWXp+UNyQHMVll9kpiwm7EnjDGU4ZBafVW1OGkxZixy1+DLJDq7JWCf/+5Jk9gb2iV5Qq7tD8gAADSAAAAEV7PNKzumNyAAANIAAAAQ5MAjbM3ik5iw2KmvEE0NasgrdeLZJJVMqP9yjaaIHqzsjkuYtGuSLfAfHxkH3DsqauO8kqnEUoqAdtvQidLpFmIF/oQeWWy6To3ksc8+PdQX4ZBZjThDgcViEQAiAOTVJ+TFkEQ4AwIAhhKHh4IJ5QHLF0GjE8/jAMFBIAWACgBGJgJioEPrGiQ4BoqGxxF6TkiSg8zlsQghmwDJ0z1AKr0iZBMKmMuLgKcolAYFv2nSCxVPmgsu+UANWsUapDnYgBJmtO3CQBH5ZzqC0pz9P1vN1NtrKufJKtFjqmkvcKaxJ/LBo0YCRprCEF1lRFaaJOtYF3fwWR4YE0zIK14kIothJDdJ34/rJ/Uck4wrGrDdnEvUFrdKckyMiuh0xk1UAAgAAAYSADhodRgLGW/UYiBhcMABAx3ETfSDAwKaK4Jg8VGQgDMp3GBgINZlV7DqGH/FEBb8tpRM4PGojD4qRNsFeeRqAMIRzp5tJcwoCZwlbxqwfjJIpWlnuyUEL//uSZPSC9gdl1GtpNxIAAA0gAAABGTmVSC7pE4gAADSAAAAEFJHyAC7+VqJL/qY3GFVM8+MFu5126yDnHADG8CQLmJAci0eIgj25BPUh+ro9n3BkVpSbn3H3FR8RU30o6Y4XuxeroaLXcEP8CqVuORyxj0g5joh6uypV2M6kbulNqQAGAUKgCt4Eh6aJxKNFqOgA+Bg0vpqaAZgqAyOOQhFMHEZKKhukG4a8NMggNPi0nFSvCRntZmomsI1NLrNkQxGoVI+txFiJfbgshDorXZWxCTW7ely0WNPKGhS3tC/GdEWIR4wR2ASGo+aUwcg1HWosxOwNh9XIrUzIrUxQtM2gtN1cU0cXX5JvOzTszLqvTrVaX1Mfx/tKxzS2tU6NxZVw+SaCgv5ON2oAAbBQOyORg/AomCWBSazREwYSGYPAAxglgemEwJqagIVBgBgNmAEAsCQZTDdNzMQsHcwGADgqAKJAcHzsjYC5w8BDsIVqpb4QgKsR0H6Dq97HxFAQyIohabqXppgWJXTJXvZCZaCM0ZGiqMBgkVSyRzgFD1aL0f/7kmTuA/XcYtNLmkPyAAANIAAAARUdeUqu5Q3IAAA0gAAABNYEGDVvDy+kMT9OtiXYWLad7Eqn5QbepuzM3vGQdD5tQ5cm1LiV7/Rr7tWmmaYv5q4iLVtUaV+PI/1uR3ZP4yVhv5brKb9rlVXpWcdxrTbF0MqGl/JlJm3AQBDoBGAIFJnH260Ap1YqAQhMXF8MbTYMFAXVuMAwDNei6NKweCCl76c8RBTArWAstB0FI2GggVMXmgMzNNpxwYAwbFGRr7GYAaUndkSqg0cvlXgIZKn8t35KuuW0m5KnDT94nPvvZUgfnegAUFwi8BN8DRLf0d4w479u9v6aG5HVCpfUHXwHT17c4w5ryaixoxcdDXXMcrTXV/1UcNUFeMKLFTUHvTcGkjIfNMhyaxw1vxUVTEFNRTMuMTAwVVUAAAKgRAaGBoAyIwEACKKaHjOZithEmBgAhIAqZ4aeQRQCDdMAUAsKAtGFud8YMQIAoAemkFgKzIFBqVa6MrMlxBr/bd9TCQ8cgQUO5Q4FFYFMcZQmFAWY7zGUCisbgLqPlD8owRD/+5Jk+o72a2XOE9tD8AAADSAAAAEW0Zc8bu0NyAAANIAAAAQRjggGD8a7AZWHTPb7PBYFo6W+AAlcUhpVZxGASvnXShnD7ih/f1de+j9FDT0EDcYHSdn0b7aIb/9bbf1XyKtcjY3HMZSE5TACA4AgAhgcAyGDGE+YV7kwQPcBQMTAmBYML0LQzfA0zBeAADABzAWBjMTUUAaLoKATx4AAZAwMXIF8MAFc5pIIHBcHZk7oCFDDaRkVCVAYxpYNfD3LGAISBjAx03ABYM5iqpyhs+7splhdWDAqzqGTASJqE9aZk0LCrSFgAnrvKIWBYrTKFQbqyg4Osggx67oJZMkgHpbc8gOp091JdUJkZur62aYpjV8zRzj6lbxtdH/9jg69AAAUtReMIgfMNRIMBg9Nc/fAQkCwzGBgDGP7MmIx5lzkhDAIQTFJrTPoHwcCy3RkETR0JjAYEEIWdmChR0oO06ICo4YgHjRTLk0DQRoPSp6PMxMJVx4hl0lV0bKUqDYScElDsW848YUMr03m+k5vPBU9m11skP5bgYBVxmdjF0oZ//uSZPIO9VlLTJvbPGAAAA0gAAABFvUpMm9tUUAAADSAAAAEug9bF5hxjepzczo6/qxHmqaeh5xC5AOCpYo6Eij84qkOcr/yYjNm82VMMQXzU/Q50n+DJXA4CAsDBDB1MVQ584NRfzNkMBIlDDUhjvzlTaUjjGYIh4UjFg6DlQujRg4SgMy1JjIV51eFBguABgIABgmIxnom5iaC6xQMBJjDBJwyDRQH7djA4AjFIOUYFAVLBEVpi2rBgoBojARGMwQFwMOSFLoKoJmWI0DQUt1XEIRSHATadMvOYACWNA319mHBgFSvOou6/hjio1e+vN1b1i60KTTMaqT1Z384g2lLS6s//yKEf+60Z/D8+c1JZrv/hjl/27FzWqmVN+XYthuv3U3nGDLAqAxUBxc3/6FKAIqAoSIhAjMEIAs03RHzFEBUCAShCCqYPgJBpViDDQT5gEAOmBGH4Y8RqhiJhFmGgOgCGWIfJkppYvJjEAKMexc+CAl7iIHCAQiOYGFggkkOggxhozMyGAQXbkzIxCPRIt0LNwMMDaSfDhigOgwoH//7kmT/jvUrSE0bu1RQAAANIAAAAR0hISIt+6KAAAA0gAAABAsfXXg9P8z8UWSyZmxbYIXz/TMjL5EwjlllWdAXcvZAzDHjaNHI9gNeRSYTYLaPSoqVpnJSv5cnfPO7b8Sp8MezlvE7JP80qtomAqgMXLnDyv/vAwwFgFxUB4QAamAuB0aaRp5gfgrhAEBgHgPmDML4YNYlhgRANiQB4MBmMT0uYwogYAcQwAEjFIQPVZgywD3eLNGLHuNnplCyzBInNf9VQpDVGMw8KzrAyL0Jx1zFAaBxChhrIyPDEoLUGXIpYMF8eHtNDLWzC4oas5L2DgJIiNIeP6IAI2125ESgCT960BFMQQ6EyYqJpk0PBW2k7xrDy+qv206af//j+VUbc8elS91P6882VknFryVMQU0ABMMA8AwwDQLjAfAxMAUPQz2UdjDqCKMAUAUwBAAjA5HSCGMAME4DgFjAGAtMNEjcwHgAwwBIsGYZSZL9oVAyj6ERkcvnEwBD5esSLpoDHMr0sswkljeQ/DApBKI5iJNOwy2AkhjNJUKwZDi4BAT/+5Jk9w72GEXKC9xbdAAADSAAAAEXHScsT3ENwAAANIAAAARQ42RmcYWYCHMVlMpHAC59LblCe8ZqdiDLu8QSC6ReABLLIzHlxaI5owJ2j00YHHn3fI2nI/+b1ayq3KGrm+TEbmWVzTmzfIxGACCmBgTDA+AlMGcKswvGkTA6CDMBoBBaIVDKMuQTsSFVEgIDATBHMM4H0EgohgDhgIgKjQhpkuklF5G4EoBJgUBwgYpN1RCAEYmPmBfI1ipvF3QDsHRsqNSARe5qMgbAAQ/AQ4FmeHIYgyJaojVTDAOApeKgJl603lI8pCHrOn8L8Xl9vTRkiYXxi4QNQKZ0YhETi4gG7UVaEIqkg8c22nR/9OiqpAjcx3yxlzyxjk9Wx8kpMEAGUwIwEzAPBzMEMXoxCq9jFVAfMB8CMwFgYDCJCvM0gcAwoQRQQASFQgTBEF+MJsJAwHwFzAMBMMJ0OA0Qg2zFeAzDgNgaAEb8Gx9cUIdgUAzAilMmnoEi9aAwDzJc4N/rwkAI4GDBISMAvEHdVUyXoyDDhRBFhg0d3A4ikwui//uSZPaO9bZPSxPcU3AAAA0gAAABFqEhKi9tUxAAADSAAAAEcvIBiAEGNAF6lqjgRBwcp57YgAiAB1LaT5ZKFfdiarL+tsslsnwj8SyuQTbtSq9LJbUw1H2C0VXkarZywPI7bHwh/ykO5TufBTE1k8X37AyBQAKCQ/qw8BJgTgTKcFpTB4DgMxlbkwCAIwME8GASGGCHiYCweJgHgPJbmBMC0YRgHRiWAkIEmimA+GGZH4lq/gwAFZ5gShLGLWAW8RbMZUzc+Ee0l+JjmeMxwAKUGiv4EGNUGCLCnBdo2k5hhnsvbdEvGsSBpgaM0OxYQ5kQTO/MttF5Ni9KZutafFjvP+Hrk7yOvln4ch7hzYlMvcrCtLJU8ERH3AxFfyD+e6Fb3uhQQk/hJgsy/3iZ7j3/kDAeA4MCcAICBAGBeI8aIyIBjBhTGCYAMYAYLZgiEUmXeDKRA5MsMAkGQx5wOzA8BrLUA0DmYDsbI9xisDp9CAAGRsEddITEYsYwAhkXmBwqVcqUyanjfJ/f5ZpMCTCwKMJgR2XCGRmZrDyF7eyOBf/7kmT/jvbFRciD3DRwAAANIAAAARbtFShPbRNAAAA0gAAABBIrwzmoaYkCOD3PIVACqWUdrDQQQNs4RBJC39x4Pc5uyGO3l8GJY14ysm9gxKnLIXo35rn0uzN+ostXvj/7zM1mL5llHkTUU5ye0f0lCnv//2ImBGAoBmBgATAjA8MJkBY2MRlzCIAuIhkMBxBNBDqNhTuMIQPKgGIoG3nDmVYdiQRGBQEGKYYGvTemGoChgBmCgtA2KjJ0GjBIAUtDDEJjIh4QMGKawUAE2pOM7iAUNqoJ4mDwZkQPK5MYUDHeKA0Wt/NmHGQGRoBlqShEdv1GoYFRlb09VmgUJLdkdtNpW2/vGLc7qVs9kUW94bF39YQVLZHQRmnxt97MSf6bWWvw336Cc/DCbq9zr8/8P/9XPqVrP0evl+XLG5cZcUNw2A10xb/vvaoAAJEgS0RjAyAAMGQK42kiUzA5AiGgUAEAMYFRChi/BlDwBo4AOYzRRzJpGrVMLE1pwjOZ2/UAINJ1BUzGW2IQCNGN2zBAzNRY4iU48BDAoEMeFo1cGAf/+5Jk9o72EkZJg9xjcAAADSAAAAEaZRUkL3dl0AAANIAAAAQSDA4FAAIMav00GGUJzOSqVjC6tVWYSreITQLBB0X/kxhMHvPELA4EQXTqdcgTLq2TmB/R/g7fVsdG4ot5SbfmyylGpeksomStWBokW522mvDj//Os3dyxn0z+L/fMXyRcQ8fe/j4tWsHOKesMMlGBTQBQD/5GRYBgMAcmBIwND8wMMA6JvgOUAwFAUCAQYll8bfC0REYu8GBUYgwIZdAmIAN7zBzUyjdEgSOInhxMAp5qUMmEgpsZyHG8wz8C0hyqOgALAGp41YgAWFLXnWOa2VJ9twe8KjCEMi3NgoQtZZwyA5W+3dUOa8pM9RY7NarrcsfWg4cRW+OEtRtasf1+vnTc5fHTL4ffvm8/f8GUDDn03VkT/uoFABGBGAwYBwChhHjhmP1LKYOQO5gBgLGAYBQYPpNJmfDjhAfIQBMEDIcLo+C4oMPQOHANMgCmPFaOMNARURBAKgxTyZImOOSYcAwYBtcYMgcNAWXEMFSMPwRHGg/BQQgUOzEdhDA0//uSZOqO9nNISRPcevAAAA0gAAABE90JLE7tbYgAADSAAAAEHlDX7AgWmhwFJAtKYdSt83KlYoYRgGixflcoL87q8SuHtmASk1GYgELUKLQ/1jSRZeqG0gCtdKA64RxzWLa5rtQ9uW6702/9dV1pLtlmyduRcByZ1tVZ1AZ90Q94tUUCot80jxOtNj+FOVhvMsE4XAmFgVRAAGDgYTHAWKMDcDIwAABSEBQwDhyRAEOYDIAwMAIMAsFswSiFzCUCZEYAz6GCKAMZYQi4cCTLVBTBrfCGHDTGjBI8MfHMHDhuZagx6wz25UMWgFOwWARksvAACrOWiQAowqM1sP7iVQWRBPHrCgUSWOV76tjt5fy/nnafBzcP5EKfxglRsnwPJhOzEmcgNJmlixpqxXL2+drkH+JNMNykmyYlNI1RDD8uf6kiJHBod01qc4/HavJqdmVqMDkEcOB4MBkCQwQQWzR9TJMQICcHApEADpgUjlmbCEaYHYEgkBCYE4IJihD4BB7zImJGCED2ZTYiAqBULACqDGQJqaVCUvQ5AQsGTX4YYP/7kmTyj/atSMeD3XrwAAANIAAAARf1IyQPcTFAAAA0gAAABALvlUCGIsuZqaQOAdAisYgNZa5T7atzMokxtHBhwhD4kNrXEdA45uLqVkIMb61hlXlFJqaT6nf/Gm7lDb+T1C/DovbL9JgUaENFEYrOE0ChMj9nj/VxyY5i6AhlVg39KrNLe/8NZKUyWsDlpc6PfIM32X+ABBCcLBFiSUBicIHWhoEItEQtWZCGhr0WLAqHhQKGHKcYSECQ7CAKZHEEQQOyKoAS9OORXEJRmDCgdAkDAQhK4JVtO/gjEpR2ghl1YFr6YYx7nvUUBH2b8BDPGgYaopX8UkqmrHI+7os/RTrIYj6mqRQfNNGZ7GT7G+quvu2XZNJd5cmq3f9/b1rY2pVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUUAAAICowHCyIsBkQzyLuMSAQeC7VgqtjMINg5CJAIdrEk6KjEuhTY2dfZp3gMP26Oe2AuoY/rDQT/+5Jk5ob2E0XIA9xMYgAADSAAAAERkSExTmztgAAANIAAAARJZWFg43gfjE86QqLwdWzUaCDnWd8lAGLYfHh4esZ27g84PihsgO/ZpVShRGNGxc8UkoX5Ijk5AOqebTMZdVKuq12bTOPdz3+VyrytRF7yl4i+IAMGWpeHzwTSEzYtFHR6wIgACSXTDIPc5zAaCzbEjSRAQEAoTMBJIyWEwEJxEGBUNjEbMAg9aFhHQyBOQhrRwkG1LJTcBIMYLDoDY9YReGh2FTcwpot+cxcoeE4PudQ8kmOrKIkVz70A7QpvfzjRB3GqOEUK4s/Dgg2CzB0QjBCZhLQPFi5KqYb6qAmOPeujKhKnEW2Vrdjxk2n//93lxVTyObGTM9j7e8eqOgYjdCUwkBNNgDKLZ+MDUDgwQA1uJgfnx/hBRAEI0BRhKIJ0owx36G5g0B6F5jakZi5FZjQByDqfpgqiI0qqe6NpiEJxrJVBiaAi8yUBhGYRnEHjvKdoAyqPhMZ9VowNE0wJE4vWiA25hSGw0Nj70RCARhqFbaQ3FkZysH/t3Hma//uSZNuE9NJFy7ubUvQAAA0gAAABE10hM05srZgAADSAAAAEt34+16m7Tz0Vp5BSz0WUEkdI164v17qm/wnrsPTv3JTUeXGHqj0SjN8Kkllu7kouSducCc1VeuKyufk1lpUjl7d3Ff6VSyrJH8a3YvfSyqN1n3j0EPBbYLorOCABwzeInlMEhIwANTFsvGlqLCMwkCDIJmPqDEmDqYYiDRgbJGLSE36t5iYCHGywmu76+TFakImIKqmFiRwNagPh6jGDYI4b9LkpcmtjfVtIjF7OwQOA7Fcq1tYatZ+Sri7/wXzd7k5z3OdKjTgo3hKMIotr0Qs2xcdr96VXY7x9nrvM/Ddu0y7p/ubrUh85fLSk5+RK10HbWndVAUZMVYLLEUPAEe1ZFwarKja1VQAQAHjBYLTBoASYBTBcIDL4bygo1EBQGjAZLTlY0xIPmjgwRGz1sc0BwXAYIARg0nH0icRJxG5d5gSVmIA2oso2YSEBvxVAolRQhAIgSAsoGsUrdTDwYwsVVHAED5qG5QOA979Z0KAXPGWwGCW2VANlSWDOeP/7kGT/hvbfR8aDfuiAAAANIAAAARWpPyrubNFQAAA0gAAABJ9OShxppySJ6toqNdUnIESARZBVaqiq9vazYWcxq9Z/B2rNp4ohTgT2mRVpwG/6OsJkONR6cOlnq/D1Ndv0Dm1OMi6DqyaHl0INgAAZlGEqtzWxgNTQfBjHgACYAxEGRh29pgoXJjGEQWAUwQCc2JVc5kCEFB0NAIYjpCapxqXiCAlCoAGCzhmaIDKFFUBBoTP7ajeBKRI2gHePve2dMzVOZ6phxPlACnZkJRArs14ZFibGezLBA0yX0iBF78fpUO9f8qDndRHlYTIugTNW249nNkwcdEZmiqOp0f/jUWm6AuKZoh9EhLJ43v0C0sPihDWLjd48IxucokL0g/NzKuAe4zpK7uzM9M5P70NDP77NpQWKQkpCTAAAIwoGwwhAkwCAhJYyqmsqBCMgEIQLMLDdNlwXFhvLYCo9mIfehQhwIChgSDpi0LRtSmA8SzUBoEjIKMa+k+C4bIjMt8UBY0/hhKEfKLCxGuWGEHCKPznbAdIMU+6KESxq0xHBAP/7kmT5DPX5T0kbvErwAAANIAAAARlxPRxO7ZMAAAA0gAAABEsdzvOil3/dzlr97l/caGAeay+ogLOUxOw5p/AsSQclVShrmk0rYYyF7JvCcUJC+SpAki5U2hrcLq0rlthBU3NModIKJ/2F0J2drJD0vekqT/ozPRSrQAkAWSU6AjzSmtBUEZZMRZ1eKcmQZHDQDyJAAIQJ/BwfiUYf4VVANZRZmppMQFCUtqvIQoScWcGEIGWancLRIAJBZ4yRkPN9Wk1H6l+j3zcTUGyzvUVFM2azvd+DF5JFBHxV3cYOpZoWNe56g4cMeTBSs1hWzzuFH1+VCh8w0HGakCog72IRysMGSSqkCKspHdtVTR113///DvHVJYylvDbqOd8fmZpMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqjGQjQgCCYI0LzGFfjD0NAgAyEDDCdJDLQbB4VS65gIORj9/BkCGgqB6/TCkaTTdgzDcFgUCqaRgqYCq1pLgBUaM1i6iecAChGDvwSBXsaUZmPJbQrRYABwOk0umAaGpw1I72U5VbzP/+5Jk8gT15UfIE7tkVAAADSAAAAEUzWsxTW0PmAAANIAAAAQVqXr/HH7/6iVL2BwvXTibGAVAHc6utROxxKExoPpfjbs0PR/VYrMhKLKSjNmYyT9jVfT2HJf672QuqBAOdZOLwxn2XTmzqZn9gDvaYoNgYAOZvDY0IA4BEojEV3EgKJAZxzDKMPXBMFBkeBRg4dHOYccyIA0Xy8JjgbGs7QYVAddDgzUFeXGW3GDrTSZ24r5rCGwHvZF0ZhGTbjc0i8ZEK9lWMDAlz87k1X1r8QFVqY5Kv1WprxMMKAssWSJx12QIG1TaQy5CjniYXNoxZmBpWDJFonfsgfdhvti+M7cdkSDTUuXPTtqCjr9mBVO7anRylD3hgWP8ff0fpO31MVB5McwAUxMFBXNkmuEIHFgCQABhiGHJxsC5QAIXAgwKCMwj8k1kEMMBIt4YpiMbPKCRCgiUv01mZDqQWHm8HAsyn+JQaRypJQrKKZ+XZMWPG2lscEICY6CM/dmgTdHg+/14Gqz0o1xyhbquJ/f85Y8ai6YX1VS+c1Pp3Enrg7MW//uSZPKG9atIR4O7ZFAAAA0gAAABFcEjIS5pMQAAADSAAAAEcplI3KSOvpE1E8yq+LZSSxWxDT/9W9xw2STrmlZPmC8seR+ERAokbacEPhmWokmnZzrdNCXrv4+P/6+mM5znr7TpCabURksQqLlgLnp5WAnqJB8wMAjFuZNIFFBgYABikDmTISbXGphABBUDmEDWcxLQsLpQQAUwnXRCDUu6QOPmP/jRFt33ES45g5mtx4wdOUJ1skDhFCcf2ogwgdX/ZhRTHYvjY3smrXU154TtfJZEP1hTIaYeEGDXNrYwS/hKFovfjPFITREzJsGZwU1yFfimPlVSbjM/q/FSg43JILFgflZTWUTE5KikOCMrUlokP/fbTN+nvp1vyDdLx8WQ8hajvd1KAABzHMWDCUCGViAFDhhOzEsRWdDQHGHy+mnI1hwFAABSyRksrBm2EwcCMNKamWwXF5VBhkCTBx5x5d1KoLFgFMLSGTFmnrGJB1DbuReOAI7EakTUNJgcml2xkY1bmcCGQKvlTdrKiqj3+iGTT6sZIrR9rnZyt7mix//7kmT/jvYYUkaDu3xAAAANIAAAARhNSRouaZLQAAA0gAAABEI578Xsxv5aMa5Tic1NOOdRkGTTUpMCSqA9qr0LUGsdNJcyWMmno63AtGVRxF/J4goqVjydukht6VjwEmqo2cagQ9Y+PmDSmqy1hPh7Hll3OUYWty1pQpAHxqoAWMYA2NPcOAQ3jKDCwoQjRDAodAWWUKfFNAx2lgENGl2BkGmaRWRAZtWXghMlDzYI5DEwMNB4KTUGjImGgW707EyQBRXu30SwpZiq2RGDD7Supfj2OI8W32Goyp4El4E2MFCF3ZAWCDfMGozSM4Ix3D5IiE+HqdWnQzZQ3v/ItZRCtccv/9NpQPNQKAg2eTyzPlmNekjI6vSsg6SEf/OlGU75rKdDN7umqB9sqiAQAAAAAUMgpkIOYVAim5oL2mOhGIwADQmZMTxrsnCoBfqXmEkaGI1h0BmCh0IVku2MO8ZIIZw0BkQFVMOCE0eORYA5L5CpwB52JUsvMTXZtYuraNOVi1NpE8iI0HZtLC7LZ9jTT78/o2iWMjypPhswsK5fL5z/+5Jk+4b2mVHGE7p9IAAADSAAAAEVpZUg7iRbCAAANIAAAAQUkGgxCtGwGsJXVFIm6KioJIbFkQzYzE4wtBFERhjr+V3TkdTqBc+AnKvMFw9MjwdiYOAoBqHI+8aYTY5vbJl7k2ta1LMG2V2x3HdmZmemWfnGcLj6i2SC6hzmxvCl5zBzqHkOneVCoa6wRj0VLNFAAWJYeyUAYcq+CgiZG4CxTQLsMnFz5sNy5CWBA0C6E8tsyayBZoxk1C87IhCTORh71O42Y4mOkt2AlomDijH6sEBQ1ez6Pgg8/nGghpdIWZU4dV2ZCD/OU6YJ8QaxUA2x1bELYGkWyIfreZDtOMz9XIQOYur2Vjay/JeE3IQf6QfUTLkhcqv2xK41tbPKHc/DnQ5BMZRnkdxso5yU4sxfVheFqYWOSA8xnPzvfj2eGw8GiP//6BMgAAAAAWNnJS4bEEyjhTUeKVPgwEMzMz6CsiHWJIglUxJgGLPGYEAnShwcJMNJQICOAOtpXAS20mlmXeodVQw7BEvIGYrDKscjCgkUobC0Gp91cfb886Yt//uSZPoG9qhYxlOaZSIAAA0gAAABGMExFg5t6cAAADSAAAAEs7+zBGd3Xu5KM/YuZvh5AwdGC6BbY+iMzxp+pK3Mjn7aJbhta999B9q0yed5/eqDyVH2a21HrZ2sqXoeQ4q5M7P5Eszp3/3IQZLXqqHgJPr9XdQh9+iBKg3BxLWYBAucmcg8JV3AYCiGcnIBykM0FyTHRZAxjaBDxIfDFx8HgbBKsxl2SGRQg67hMxAQ4SK0z1rgIrFKnclkbHiHTX6fUsCjPG4jYa2OFoEnbU0zGl5VgYvxJU3GrezU9ckIlgQVW2qRTpxVTMLO0E6b0VCW2VnmwsdQN8ej5Csas4x0NKRYV0JsVbC/QhtORshNp0xrrjcA3iZLNek1RJFQk/VSojthrhUwcLh3vGY+viBjWratCGjvqU9dcqgiSbjhCK0CEAAAAADTBSEeH6UGixuJ2LBkqaOANU0c1BwcnyWqJkkDNUCXwCLGZmq/YacksIkWkc23MCCNL8lIBAHB7+PGxUAEaeM5VWUDhqGrk+jcrTevU0H1c5ufOz00hyD7/P/7kmTrhvV1V8hTbBbCAAANIAAAARkhPRauafLQAAA0gAAABAULr5cqSFAiPCcRxNZt6dSZvnFMXDkrtmn6/G15KoYOQGctlFsfTrHzxpVLE/fDSOs7tUNAGHtkY7jSV/TpH5zPmZmTIiaf8h0aaQp7DfCg7da01u6CYyHRj0CJMAQAm4g4YBCKAAwCCzHxPO1j4eBy+RwXGivcaIESqLkAwNGlkMsV5pkweRj0DXC/psVVaWzIVCHtBxqecAEsC4xpBll+eMCkih2SLpDHNSNin2q0NKNnN5kQ9SxLlFVOnlET6SRBRQi5xTGVLPhrVJ2opvwz5wgW60yuNWVOo9IKc14+CivMQc/mpPot3LvcQ0Ji4e6r0t2tbKZi4mcmo6YSoXaUpLEUkKk5EE3EguEhYj60qoON3uYlC0SaEAAABGjjmZdFJQDSoFDP4paAtgLgkwIsCAWIKrOAwYOSvk2IDxIJKgCAsYzSaQ0CypEIFKXejpVDGFKqRduGBCROiAi8dXcVX8iyghsJMElv4gPanzeSaOyFvPBbnVtjcHAcbEz/+5Jk7ob1olxHU2wWwgAADSAAAAEYbScULmnwkAAANIAAAAS9SuFS8J0nTWxDvajyW08NF0ya0oXJ7lGObEYSv2YR0ELZ0mQhpqR8kEyW5oTrNHWmpRE8QKrOahxHOxzFuJi/NNRv4Lil4tI08tGdMUcaMJDZsb3rO7U3v2iULmassnUVcpa2hCFziLlhMam4FCZnL/mUAchNftkgyWDcgcLokIAC4nIdSZjDqPie5gIUGdTVHa0fky5n7sMaMaERcMtmCQMmBARQ6nCQOF6ezm4HTlTuORrVh6u9PNMKxMO4eqnWoDd3ul7VMtQ20fb5VSFQvN57Ng3RH7MCoXv1BksoPonJnB6YkOnNBuhVt4olearDFsIEMUJ0HCmRExEWLtuWd2GCGo0xMoMoZ65+fP1/79M/2x/45G+5KnLauqoAQAGcLpemRjgADn5TBl6PBioKfoRoGQ6YGBnZER4ocNEKmRgoIN8o8atOjMBvDXa0SBxqKO4tI+rMQWq8lM4QFGHkJHfgoaXo6tUgDtC/CcHIwNjwVA0jQ1aVGVj6kzTR//uSZPGO9nNPxTOafDAAAA0gAAABFl1DGC49ltAAADSAAAAEKP2iwmPLLDl0WFZDBjQYmyZStdORELvrS57qcRbGKseCKVlTJYKwFqAKJDB0W2yWLBkcFVEfH+M7YnPaT1xm0OGQA1PICkASaxIJAqHh5RvVpAQAgIQf0FuWgPMPhrMMwDj5CABARZjMKaYyIIWDQxYlRIpE1YYQjSZtkeuqGYCW44UHPwMAoZdCMl1FpSQECb2aSgJOkZaSkesQgz5UdNyU8sVduV0+JqtNhOYqnVRyq44JqQILeTdSnCh0MVMCGc6lV86OeOR0NqweC5Sa2W5pjEKVxKjJPhykZDEQppUSuIjsmh/lUh0yr2sn6IclI0B3EPdalPk/WeYfK5rg/9HdMcrkh8+LPtAQBiEDG0m/J853BxSxhl746gIQEAAAwwaZcqiQjBmk4OgS82uDq2bSPhAkquYAGHEogDACIO/oCIBfgkjIowmOp1zTFjys2+iHEpisbNVpSk6+Ms7ACoZb+VOJ78tqix6VSWUyAqOWyyhEWUIlo1o4hO9iQf/7kmTvgvWWSEWreWUUAAANIAAAARkZKxMO4fRAAAA0gAAABNot1UWmUpIoC1yVVZEeRGi2yHwjJY/R3Mh0aJRYSpIC8hOYSBHP0o4FUn1MLoZYgZMS1qV1aWLL4zoy+JhIpSTrM+o60a5JdrHGGuYEWBgWATAAAjIYUbRlosADcqfEhisAXvAA5OGhwHBMqgYVA5l3ZmiAeyZ3DBoBNqH0aAkvlJVBosbOtlRkMvDiXw/ctjQqwuPWnc7vskQ/Y16TMy6OhW0by3Lq6jQT5VkrjNMR6zKOckCFsZz7W2uGnmhrbzgURzltbE0cKEKx2swEGyJETKIW1Tj5eqCSOu1YwqqrCP5jmbDtV1XNTo6VD2A27KZbvFPRSla1SR+nlmzKa80u+RuSm7ahOuEFyXkDqnrWZFhCXU0mhCFVEAAJncoY2BOo0Y8gTDgdCgvuYEjGelSQqqgBHzcOM38xS8UzBhadODkwu/NohdD1cZYl+eZ78dukIJdyrNW3KimdRu01OYbr1YpK408tWJxpkpkoVnhBJI9eKSSXjweDokPuiML/+5Jk8IL1mEhGS3pjUAAADSAAAAEZDT8VLjx3gAAANIAAAAQjLp75Z5WXT0YkHKCCWjEvrSY0cqTI4JXNrOKZZLIkqwzfH9wnlYig0JRATNkxp7X7XCsZjuBR1huP5+NUe51tlP2dHRhDAaDbPT/Snqp0md0YZYDaY4gERrE/BYFZ1DAJSDMgrDbHQAZ6mhv0CLlakDBRoqTMXWRBBNsOOs6d5xTxEoTMUypRKbB1rFkYTKbfPBroXrrtUnQaJ6nGhbXM4JUeg84BKjzVShfItDiSKoWFD1DlXkpZVhgcE3DNCPYi1t26U0I5SFZKI58q9ApMfr5cq4/1Owk2QCMTb5OukYqTxRXPKKTlVxvo5IzaME6TpOBOtMEzjiztwSFrPnGDq+NwoW64hslJB5jv1W6jzEOoR6UATRKlAwoSSYkY4VYXA89DBec0UMWJM/EAYMcxYxAMkU3gBwPMmE1JC/eBiLWtHqRrZlET26auH0B1s+2DvUSCksQg22DaLXCtcDSVI3FGjXMi3VpmdrdTRIqamzFeuLKHA1aiEwen6zGb//uSZPGG9aFMxSt5ZEAAAA0gAAABGJU9EA5p7QAAADSAAAAEkcBuqovruA1pFbgnHpQrsnzCkkSixwlNBqkmYtW6EhKAZ2Mkx1EEiuBpKrfqSJ3m5mnKhpOUm9ZmV+7khatDr1xMAScImF9+5aO35/8GAvVY9r5iflzNPSUH94AkIADnosCQWICoYxG5JaW0w4RJlwsGdBKk15EJWrqeNLgTrJZzkeBNMSHxijcQ0w6N2pmMM6O8mRuJ4qLSiJg0byVLpgZtK1nPyZGML4vhTssHEzAX9+vMlGxfwmmp6jj+ORWGlKXNmhHsiFQvn+zYQmzeXzM+Dc1tiYTTRbkgc/e04dDgX9CXmY+YeIMMpoEdMq6MyrjX57mVX222tJEfrHYlGWWduS0Vuf//frO/rHf/GSnvWZsPbXl5pf1etAQACbmSl1qRBk2srEgmah1aIOJn1ZQrOZBaoD4lFxweMuDoBlUpBC2RG8oooUYGAuxXtEwTOsbHf4lCYFzZ2d6rW5crDgp1YdMDUGEwM0NZeHPEmQzznWsXUqGuoCFnAkDvLP/7kmT0AvYrUMQLjzV2AAANIAAAARfxnRUtPNXIAAA0gAAABGxvzljRTPUidek41HLcwUPRMLcRrc3w+TpUhbUUplCt53tMuoqYRsBAfbZSVOQ5cERgZACzmqiU3CmlAlcpeFrCwOBU2RbyiEomvYiNQIjBQagAzn44ITmgqpnNB6cU5L5bLFZ3lR6MeSAg+XrJyYHMmPWbULjGBC5ExQ5IoZKASKwxHR0AIhPGZmYcNdzkRY64T7bUrVK3RZTiRx1PVAyudZDsSiibW436t7tSwohasSoO80T2XRzTrir1RsUY/zjdqd+iUfM+goKdUJuApzHPE7ltWyStZN3i5YWQqkFEMMHKe2wII1wrwtiMMKpLRIOEZkxFjmuf/+5bHlLdtdSOo7P8DlClQHDdFRByAAAAjCYkxIpGgMkBjUT4mBcobYsLABeUv26Biqg6sAtJGhE30uaFXmhERERVXjVcAgTuvTNVkJUb3EElE2zPR3ngnWhw23EtPsUMrZK/fJcuESTDGcKjVi+ez1UOl5C1Sqol0i5EJYzvT5sQYx/ZOJD/+5Jk8Ir1o0vFK29NZAAADSAAAAEXIZsSzbx3QAAANIAAAAT2I9yUNJ2ngTSqnStxbrtzaPhK2ZsP10xtFG0digO5l0Odu2Dbg0kxLhgbGQY4gGgImWhnyM2fv//HSCNc67Q1JAetj2f3Cf4ADABuyRzzCWSbh0usDwLFIyu9TBXZZMzbEIWQp/iVEJyBYbHZeKNAcOoMGEggjjMNNDVsyPboQT5WQsqgeDDNRwRYzkaaIhZlr7mWwTQsMJycEyyJ1nRqJUjcDdRRNH7MehFHi/ONHRB9qlP7IK6HpL6XhyTa2wlsQI50WiVKDlJGhUgnKUyppU6OpnW2Gx7oTDlUFoqTEdyVrLMyiiZKDmjLPvLR1A09BwJRJCUSMNL12n//eq8YwrM3JeUXLb99TmoGzlfuD9UIAAAEclQGB1XodADgj75PkghSbfzjNxEhXji8hbslIrszh0YSJ8QzBEYMWEm3ght4XdgCPxsUDm0yxUULfRQmc2FzJs5qtjNtJoIeQrsVXr92F8caP1hlYBd7EXHujkY+eEEOsuZwwSxsRjtZ//uSZPiD9dlNxEtvHdIAAA0gAAABGQ2JDQ081YgAADSAAAAEaqdx0qjZRjIilIUKHk4EgFC49LoDXzcrkEWulM1C4dqMM3o44jrjfXd5YzG1e0F47Xh9zmmHo8efzDbH3MWLX5pxX8jbeCUE/jyJUVAUmM0aeCSpGeKhAvsYAwMmuhCjmrTIpeOgwwlEHXXOASjddzIJbC2jsOsgMkNoXwa8oakQzqWKtXc2HCdTWWpkE8OsCXH7l61Hmh421yHQ6y+0wkHLEQYlrqOfKYGRZzbEMYD3WCyXJWB1CxFzE0NMkw4Mq0pISdL+QxBiWXKdO019XT879RPo7K5vmtoVqiVSgor4Ix0ZukUnERZkPqez/YIEGTk7V024T5BCJnhc0rk+zr6rpV3kSpr7oeo4H4H1+vR9q81MQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVAQAJjMwMmKgHGJC05A3ikm3aDUT7JqD0k4FoxwurLHogFU4DCzaDiNgAZRoUaLcbshos5YkaOJoOc4EWhKhbVTh+jY5+rMFtUJPozP/7kmT1hvXpT0OzT2XCAAANIAAAARhVRQoNPTdIAAA0gAAABHAUK044hZfoSoW9DF2csFWFWLSwsyAJufaHJQ21A+R5eX0xmiwvFpNHmcBlTMaVVTawJ9DGNhWkQY2sWkOIXI0UyiK/CRFjjWSzpFmCUchKEmfGSI27DEsiX840/2slqWXFKgz8vx1x9v/YLEJkA2EHFIC6E1JEUI9yCDWCQhahvjNFyM08hJSYC+DUjuNNAmTolFNEufMSsU0OBKUjs0LS1jreyw8to80+elY7NRKSrHZXJVBOKqgtHSdYvWG4+g2BUcwhBIhkQRiqsVW1iM9OkNY+Vw2KybmiIqQHyWu0KRCME4lFS7MtleS2NNIU3NEgqAiOEm//9JIcj95MQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+5Jk5Qr1tUtDKw808gAADSAAAAESSRT2B7EzgAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
/*
UTILITY FUNCTIONS
*/;

window._my_custom_methods.get_page_type = function get_page_type() {
    var page_types = [
        ['email', '[title="Email"]'],
        ['case', '[aria-label="Case Form"]'],
        ['dashboard', '[id^="Dashboard_Selector_"]'],
    ];
    var current_page = page_types.map(item=>document.querySelector(item[1]) == null ? null : item[0]).filter(item=>item!==null);
    return (current_page.length > 0) ? current_page[0] : null;
};
window._my_custom_methods.clickAndWaitForElement = async function clickAndWaitForElement(clickElement, targetContainer, targetSelector, timeout = 5000) {
    // Check if the target element is already present before clicking
    let targetElement = targetContainer.querySelector(targetSelector);
    if (targetElement !== null) {
        return targetElement;
    }

    // Click the element to trigger the potential appearance of the target
    clickElement.click();

    const searchTarget = async () => {
        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            targetElement = targetContainer.querySelector(targetSelector);
            if (targetElement !== null) {
                return targetElement;
            }
            await new Promise(resolve => setTimeout(resolve, 100)); // Sleep for a short interval before checking again
        }
        return null; // Return null if the target element is not found within the timeout
    };

    // Wait for the element to appear or timeout
    targetElement = await searchTarget();
    return targetElement;
};
window._my_custom_methods.textContentFixer = function textContentFixer(text) {
    var textHalfwayPoint = Math.floor(text.length / 2);
    return (text.slice(0,textHalfwayPoint) == text.slice(textHalfwayPoint, text.length)) ? text.slice(0,textHalfwayPoint) : text;
};
window._my_custom_methods.copyToClipboard = function copyToClipboard (text) {
    var textarea = document.createElement("textarea");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.value = text.replace("\n","\r\n");
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Text copied to clipboard: " + text);
};
function setup_interval_runner(interval_id, callable, seconds) {
    if (window._my_custom_data.intervals[interval_id]) {
        clearInterval(window._my_custom_data.intervals[interval_id]);
        delete window._my_custom_data.intervals[interval_id];
    };
    window._my_custom_data.intervals[interval_id] = setInterval(callable, (seconds * 1000));
};
window._my_custom_methods.sanitize_weird_char = function sanitize_weird_char (text) {
    var charCodes = [59198, 59758, 61033];
    let sanitizedText = text;

    charCodes.forEach(charCode => {
        sanitizedText = sanitizedText.replaceAll(String.fromCharCode(charCode), '');
    });

    return sanitizedText;
};
window._my_custom_methods.delay = function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/* MODAL FUNCTIONS
*/;
/* Function to show a basic modal */
window._my_custom_methods.showModal = function showModal(message) {
    /* Create modal container */
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `;
  
    /* Create modal content */
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
    `;
  
    /* Create message paragraph */
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = message;
  
    /* Create OK button */
    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.style.cssText = `
      margin-top: 10px;
      padding: 5px 10px;
      cursor: pointer;
    `;
  
    /* Add click event listener to OK button */
    okButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  
    /* Assemble modal */
    modalContent.appendChild(messageParagraph);
    modalContent.appendChild(okButton);
    modal.appendChild(modalContent);
  
    /* Add modal to the DOM */
    document.body.appendChild(modal);

    /* Focus the OK button */
    okButton.focus();
};

/* Function to show settings modal */
window._my_custom_methods.showModalSettings = function showModalSettings(message, settings) {
    let modal = document.getElementById('my-modal-settings');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'my-modal-settings';
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.zIndex = '1000';
        modal.style.left = '50%';
        modal.style.top = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = '#f0f0f0';
        modal.style.padding = '20px';
        modal.style.border = '1px solid #888';
        modal.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';

        document.body.appendChild(modal);
    }

    if (!window._my_modal_settings) {
        window._my_modal_settings = {};
    }

    modal.textContent = '';

    const messageElement = document.createElement('h2');
    messageElement.textContent = message;
    modal.appendChild(messageElement);

    settings.forEach(setting => {
        if (!window._my_modal_settings.hasOwnProperty(setting.name)) {
            window._my_modal_settings[setting.name] = setting.value;
        }

        const settingDiv = document.createElement('div');
        settingDiv.style.marginBottom = '20px';
        settingDiv.id = `setting-container-${setting.name}`;

        const label = document.createElement('label');
        label.textContent = `${setting.name}: ${setting.description}`;
        label.style.display = 'block';
        label.style.marginBottom = '5px';
        settingDiv.appendChild(label);

        let input;

        switch (setting.type) {
            case 'String':
                input = document.createElement('input');
                input.type = 'text';
                input.value = window._my_modal_settings[setting.name];
                break;
            case 'Boolean':
                input = document.createElement('input');
                input.type = 'checkbox';
                input.checked = window._my_modal_settings[setting.name];
                break;
            case 'radio':
                if (!Array.isArray(setting.available_values) || setting.available_values.length === 0) {
                    throw new Error(`Radio setting "${setting.name}" must have non-empty available_values array`);
                }
                if (!setting.available_values.includes(setting.value)) {
                    throw new Error(`Value "${setting.value}" for setting "${setting.name}" is not in available_values`);
                }
                if (!window._my_modal_settings.hasOwnProperty("radio_fields")) {
                    window._my_modal_settings.radio_fields = {};
                };
                input = document.createElement('div');
                window._my_modal_settings.radio_fields[setting.name] = setting.available_values;
                setting.available_values.forEach((value, index) => {
                    const radioDiv = document.createElement('div');
                    radioDiv.style.marginBottom = '5px';
                    
                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = setting.name;
                    radioInput.value = value;
                    radioInput.checked = value === window._my_modal_settings[setting.name];
                    
                    const radioLabel = document.createElement('label');
                    radioLabel.textContent = value;
                    radioLabel.style.marginLeft = '5px';
                    
                    radioDiv.appendChild(radioInput);
                    radioDiv.appendChild(radioLabel);
                    input.appendChild(radioDiv);
                });
                break;
            default:
                throw new Error(`Unknown setting type: ${setting.type}`);
        }

        settingDiv.appendChild(input);
        modal.appendChild(settingDiv);
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.onclick = function() {
        settings.forEach(setting => {
            const settingDiv = document.getElementById(`setting-container-${setting.name}`);
            if (setting.type === 'String') {
                const input = settingDiv.querySelector('input[type="text"]');
                window._my_modal_settings[setting.name] = input.value;
            } else if (setting.type === 'Boolean') {
                const input = settingDiv.querySelector('input[type="checkbox"]');
                window._my_modal_settings[setting.name] = input.checked;
            } else if (setting.type === 'radio') {
                const selectedRadio = settingDiv.querySelector('input[type="radio"]:checked');
                if (selectedRadio) {
                    window._my_modal_settings[setting.name] = selectedRadio.value;
                }
            }
        });
        console.log('Updated settings:', window._my_modal_settings);
        window._my_custom_methods.showModal('Updated settings.');
    };

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.onclick = function() {
        modal.style.display = 'none';
    };

    const buttonDiv = document.createElement('div');
    buttonDiv.style.marginTop = '20px';
    buttonDiv.appendChild(submitButton);
    buttonDiv.appendChild(closeButton);
    modal.appendChild(buttonDiv);

    modal.style.display = 'block';
};

/* Initialize settings */
window._my_custom_methods.settings_list = function settings_list(){
    return [
        {
            "name": "Output Format",
            "description": "Choose from available output formats.",
            "type": "radio",
            "value": "markdown",
            "available_values": ["json", "markdown", "html"]
        }
    ];
}
window._my_custom_methods.initialize_settings = function initialize_settings(settings_list) {
    if (!window._my_modal_settings) {
        window._my_modal_settings = {};
    }
    settings_list.forEach(setting=>{
        if (!(window._my_modal_settings.hasOwnProperty(setting.name))) {
            window._my_modal_settings[setting.name] = setting.value;
        }
    });
};

/* Trigger Settings Modal */
window._my_custom_methods.setting_click = (() => {
    window._my_custom_methods.showModalSettings("Settings", window._my_custom_methods.settings_list());
});

/* Create dropdown button and modal for settings */
window._my_custom_methods.createDropdownButton = function createDropdownButton(id) {
    const button = document.createElement('button');
    button.setAttribute('data-custom-dropdown', id);
    const arrow = document.createTextNode('\u25BC'); /* Downward arrow character */
    button.appendChild(arrow);
    button.style.cssText = `
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    `;
    document.body.appendChild(button);
    return button;
};

window._my_custom_methods.createModal = function createModal(items, id) {
    const modal = document.createElement('div');
    modal.setAttribute('data-custom-modal', id);
    modal.style.cssText = `
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
    `;

    items.forEach(item => {
    const element = document.createElement('div');
    element.textContent = item.text;
    element.style.cssText = `
        padding: 8px 0;
        cursor: pointer;
    `;
    element.addEventListener('click', item.onClick);
    modal.appendChild(element);
    });

    document.body.appendChild(modal);
    return modal;
};

/* Setup dropdown menu with settings */
window._my_custom_methods.setupDropdown = function setupDropdown(items, id) {
    const button = window._my_custom_methods.createDropdownButton(id);
    const modal = window._my_custom_methods.createModal(items, id);

    button.addEventListener('click', () => {
    if (modal.style.display === 'none') {
        modal.style.display = 'block';
        /* Position the modal below the button */
        const rect = button.getBoundingClientRect();
        modal.style.top = `${rect.bottom}px`;
        modal.style.left = `${rect.left}px`;
    } else {
        modal.style.display = 'none';
    }
    });

    /* Close the modal when clicking outside */
    window.addEventListener('click', (event) => {
    if (event.target !== button && !modal.contains(event.target)) {
        modal.style.display = 'none';
    }
    });

    /* Remove the button from the body (it was added in window._my_custom_methods.createDropdownButton) */
    document.body.removeChild(button);

    return button;
};

/* Initialize settings and setup the dropdown menu */
window._my_custom_methods.initialize_settings(window._my_custom_methods.settings_list());

/* Add menu items and settings */
window._my_custom_menu["email"].items = [
    {text: 'IR SLA', onClick: (()=>{window._my_custom_methods.copyToClipboard('Hello,\n\n\nMy name is Brandon, and I am the tech that has been assigned your case. Please allow me to look over your case so that I am best equipped to help you.\n\n\nThank you,\nBrandon\nMicrosoft Teams CSS Support')})},
    {text: 'Get Survey Link', onClick: (()=>{var emailSubjectElement = document.querySelector('[aria-label="Subject"]');
        var emailSubject = emailSubjectElement.getAttribute('title');
        var caseNumberMatch = emailSubject.match(/(\d{16})/);
        var caseNumber = (caseNumberMatch.length > 0) ? caseNumberMatch[0] : "";
        var surveyLink = `https://admin.microsoft.com/adminportal/home#/support/feedback/${caseNumber}`;
        window._my_custom_methods.copyToClipboard(surveyLink);
    })},
    {text: 'Signature', onClick: (()=>{window._my_custom_methods.copyToClipboard('\n\nThank you,\nBrandon\nMicrosoft Teams CSS Support')})}
];
/* Add menu items and settings */
window._my_custom_menu["case"].items = [];
window._my_custom_menu["dashboard"].items = [];

window._my_custom_methods.get_nav_bar = function get_nav_bar(){
    var page_type = window._my_custom_methods.get_page_type();
    switch (page_type) {
        case 'case':
            output = document.querySelector('[data-id="form-header"]');
            break;
        case 'email':
            output = document.querySelector('[data-id="form-header"]');
            break;
        case 'dashboard':
            output = null;
            break;
        default:
            output = null;
            break;
    };
    return output;
};
window._my_custom_methods.getMenu = function getMenu() { 
    window._my_custom_data.custom_id = "my_modal_trigger";
    window._my_custom_data.custom_id_css_selector_dropdown = '[data-custom-dropdown="'+window._my_custom_data.custom_id+'"]';
    window._my_custom_data.custom_id_css_selector_modal = '[data-custom-modal="'+window._my_custom_data.custom_id+'"]';
    return {
        "dropdown": document.querySelector(window._my_custom_data.custom_id_css_selector_dropdown),
        "modal": document.querySelector(window._my_custom_data.custom_id_css_selector_modal)
    };
};
window._my_custom_methods.deleteMenu = function deleteMenu(modal_elements) {
    if (modal_elements.dropdown !== null) {
        modal_elements.dropdown.parentElement.removeChild(modal_elements.dropdown);
    };
    if (modal_elements.modal !== null) {
        modal_elements.modal.parentElement.removeChild(modal_elements.modal);
    };
};
window._my_custom_methods.addMenu_func = function addMenu_func(items) {
    const menu_check = window._my_custom_methods.getMenu();
    if (menu_check.modal != null || menu_check.dropdown != null) window._my_custom_methods.deleteMenu(menu_check);
    const dropdown = window._my_custom_methods.setupDropdown(items, window._my_custom_data.custom_id);
    window._my_custom_methods.get_nav_bar().appendChild(dropdown);
};

/* Mutation observer and menu setup */
window._my_custom_methods.setup_menu = (()=>{
    var page_type = window._my_custom_methods.get_page_type();
    var menu_check = window._my_custom_methods.getMenu()
    if (!(menu_check.dropdown && menu_check.modal)) {
        var items = (()=>{return window._my_custom_menu[page_type].items})()
        if (items.length > 0) window._my_custom_methods.addMenu_func(items);
    };
});
/*
ELEMENT MODIFIERS
*/;
window._my_custom_methods.assignOnclickCopy = function assignOnclickCopy(node, text) {
    node.onclick = ()=>{
        window._my_custom_methods.copyToClipboard(text);
        node.setAttribute('copyfuncadded', true);
    };
};
function make_contacts_click_copy() {
    var contactsElement = document.querySelector('[data-id^="ref_pan_Summary_tab_section"]');
    var rowsElements = Array.from(contactsElement.querySelector('[class="ag-center-cols-viewport"]').querySelectorAll('[role="row"]'));
    var rowsOfCells = rowsElements.map(row=>Array.from(row.querySelectorAll('[class^="ag-cell"]')).map(cell=>cell.querySelector('[class^="ms-TooltipHost"]')));
    rowsOfCells.forEach(row=>row.forEach(cell=>{
        if (cell !== null && !(cell.getAttribute('copyfuncadded') == 'true') && cell.textContent !== '') {
            var textToCopy = window._my_custom_methods.textContentFixer(cell.textContent);
            window._my_custom_methods.assignOnclickCopy(cell.parentElement.parentElement, textToCopy);
        };
    }));
};
/*
DASHBOARD FUNCTIONS
*/;
window._my_custom_methods.get_pending_sla_container = function get_pending_sla_container() {return document.querySelector('[data-id="MscrmControls.Containers.DashboardControl-cases_pending_sla"]')};
window._my_custom_methods.hasPendingSla = function hasPendingSla() {
    var container = window._my_custom_methods.get_pending_sla_container();
    if (!container) return false;
    var checkFullSize = container.querySelector('[class="ag-center-cols-container"]');
    var checkCompact = window._my_custom_methods.get_pending_sla_container().querySelectorAll('[role="listitem"]');
    var elementList = (checkFullSize !== null) ? Array.from(checkFullSize.childNodes) : Array.from(checkCompact);
    return container !== null ? elementList.length > 0 : false;
};
window._my_custom_methods.get_active_cases_container = function get_active_cases_container() {return document.querySelector('[data-id="dataSetRoot_all_active_cases"]')};
window._my_custom_methods.dfm_dash_refresh = function dfm_dash_refresh () {
    var targetTitle = "MY NEW DASHBOARD";
    var dashboardTitleElement = document.querySelector('[id^="Dashboard_Selector"]');
    var dashboardTitle = dashboardTitleElement != null ? dashboardTitleElement.textContent.trim() : "";
    var refreshButton = document.querySelector('[id="RefreshDashboard-button"]');
    if (refreshButton != null && dashboardTitle == targetTitle) refreshButton.click();
};
window._my_custom_methods.alarm_loop = async function alarm_loop(seconds=5) {
    if (window._my_custom_data.alarm_loop_active === true) return;
    while (true) {
        window._my_custom_data.alarm_loop_active = true;
        if (window._my_custom_data.isAlert) {
            if (window._my_custom_data.alarm_sound.paused) {
                await window._my_custom_data.alarm_sound.play();
            }
        } else {
            if (!window._my_custom_data.alarm_sound.paused) {
                window._my_custom_data.alarm_sound.pause();
                window._my_custom_data.alarm_sound.currentTime = 0;
            }
            break;
        }
        await new Promise(resolve => setTimeout(resolve, (seconds * 1000)));
    }
    window._my_custom_data.alarm_loop_active = false;
    return;
};
window._my_custom_methods.pendingSlaAlarm = async function pendingSlaAlarm(seconds, sleep_counter) {
    if (window._my_custom_data.sla_alarm_silence_counter > sleep_counter) window._my_custom_data.sla_alarm_aknowledged = false;
    window._my_custom_methods.dfm_dash_refresh();
    if (window._my_custom_methods.hasPendingSla() && window._my_custom_data.sla_alarm_aknowledged !== true && window._my_custom_data.isAlert !== true) {
        window._my_custom_data.isAlert = true;
        window._my_custom_methods.alarm_loop(seconds=5);
        window._my_custom_data.sla_alarm_aknowledged = window.confirm(`Case pending SLA detected. Silence Alarm for ${seconds * sleep_counter} seconds?`);
        if (window._my_custom_data.sla_alarm_aknowledged == true) {
            window._my_custom_data.isAlert = false;
            window._my_custom_data.sla_alarm_silence_counter = 0;
        } else if (window._my_custom_data.sla_alarm_aknowledged == false) {
            window._my_custom_methods.pendingSlaAlarm(seconds, sleep_counter);
        }
    };
    window._my_custom_data.sla_alarm_silence_counter = window._my_custom_data.sla_alarm_silence_counter + 1;

};
/*
CASE VIEW FUNCTIONS
*/;
window._my_custom_methods.expandTimelineElements = async function expandTimelineElements(){
    var timelineElements = Array.from(document.querySelector('[data-id="notescontrol-unPinnedAccordion-incident"]','[data-id="notescontrol-unPinnedAccordion-incident"]').querySelectorAll('li'));
    var results = [];
    var completedCount = 0;

    var processElement = function(timelineElement, index) {
        var moreButton = timelineElement.querySelector('[aria-label="View more Collapse"]');
        var lessButton = timelineElement.querySelector('[aria-label="View less Expand"]');

        if (moreButton !== null) {
            moreButton.click();

            /* Wait for expansion to complete */;
            setTimeout(function(){
                finalize();
            }, 2000); /* 2 seconds delay to allow for expansion */;
        } else if (lessButton !== null) {
            checkForData(timelineElement);
            finalize();
        } else {
            finalize();
        }
    };

    var finalize = function() {
        completedCount++;
        if (completedCount === timelineElements.length) {
            alert("All timeline elements expanded.");
        }
    };

    timelineElements.forEach(processElement);
};
window._my_custom_methods.get_case_contacts = async function get_case_contacts() {
    var header_mappings = {
        "Toggle selection of all rows": "null",
        "Role (To)": "role",
        "Connected To": "contact_name",
        "Email (Connected To)": "email",
        "International Phone Number (Connected To)": "phone_number",
        "Preferred method of contact (Connected To)": "modality",
        "Company Name (Connected To)": "company"
    }
    var contact_store = [];
    var contactsElement = document.querySelector('[data-id^="ref_pan_Summary_tab_section"]');
    if (contactsElement) {
        var contactHeaderElement = contactsElement.querySelector('[class="ag-header-container"]');
        var columnTitlesRaw = Array.from(contactHeaderElement.querySelectorAll('[class^="ag-header-cell pcf-grid-header"]')).map(element=>window._my_custom_methods.textContentFixer(window._my_custom_methods.sanitize_weird_char(element.textContent.trim())));
        var columnTitles = columnTitlesRaw.map(title=>header_mappings[title]);
        var rowsElements = Array.from(contactsElement.querySelector('[class="ag-center-cols-viewport"]').querySelectorAll('[role="row"]'));
        var rowsOfCells = rowsElements.map(row=>Array.from(row.querySelectorAll('[class^="ag-cell"]')).map(cell=>cell.querySelector('[class^="ms-TooltipHost"]')));
        rowsOfCells.forEach((row)=>{
            var contact_info = {};
            row.forEach((cell,index)=>{
                if (columnTitles[index] !== 'null') contact_info[columnTitles[index]] = window._my_custom_methods.textContentFixer(['null', 'undefined'].includes(typeof cell?.textContent) ? '':  cell.textContent);
            });
            contact_store.push(contact_info);
        });
    };
    return contact_store;
};
window._my_custom_methods.case_view_header_enhancer = async function case_view_header_enhancer() {
    var caseViewHeader = document.querySelector('[data-id="form-header"]');
    var current_page_type = window._my_custom_methods.get_page_type()
    if (current_page_type == 'case') {
        var caseInfoHeaderParts = Array.from(caseViewHeader.querySelector('[id^="headerControlsList"]').querySelectorAll('[data-preview_orientation="column"]'));
        var caseNumberElement = caseInfoHeaderParts[0];
        var caseSeverityElement = caseInfoHeaderParts[1];
        var caseStatusElement = caseInfoHeaderParts[2];
        var caseAssignedToElement = caseInfoHeaderParts[3];
        var caseNumberMatch = caseNumberElement.textContent.match(/(\d{16})/);
        var caseNumber = caseNumberMatch.length > 0 ? caseNumberMatch[0] : '';
        caseNumberElement.onclick = ()=>{
            var textToCopy = caseNumber;
            window._my_custom_methods.copyToClipboard(textToCopy);
        };
        var caseSeverity = 'Severity '+ caseStatusElement.textContent.replace('Severity', '');
        caseSeverityElement.onclick = ()=>{
            var textToCopy = caseSeverity;
            window._my_custom_methods.copyToClipboard(textToCopy);
        };
        var caseStatus = caseStatusElement.textContent.replace('Status reason', '');
        caseStatusElement.onclick = ()=>{
            var textToCopy = caseStatus;
            window._my_custom_methods.copyToClipboard(textToCopy);
        };
        var caseTitleElement = caseViewHeader.querySelector('[data-id="header_title"]');
        var caseTitle = caseTitleElement.textContent.replace('- Saved', '');
        caseTitleElement.onclick = ()=>{
            var textToCopy = caseTitle;
            window._my_custom_methods.copyToClipboard(textToCopy);
        };
        
        var groupChatTitleButton = document.createElement('button');
        groupChatTitleButton.textContent = "CSAM/IM Chat Title";
        var groupChatTitleButton_id_string = "csam_im_group_chat_title_button";
        groupChatTitleButton.id = groupChatTitleButton_id_string;
        groupChatTitleButton.onclick = ()=>{
            var textToCopy = `${caseNumber} | ${caseTitle}`;
            window._my_custom_methods.copyToClipboard(textToCopy);
        };
        if (!document.getElementById(groupChatTitleButton_id_string)) caseViewHeader.appendChild(groupChatTitleButton);
    

        var startNewNotesButton = document.createElement('button');
        startNewNotesButton.textContent = "New Notes Import String";
        var startNewNotesButton_id_string = "new_notes_import_button";
        startNewNotesButton.id = startNewNotesButton_id_string;
        startNewNotesButton.onclick = async ()=>{
            /* Async calls first await later */;
            var case_contacts_promise = window._my_custom_methods.get_case_contacts();
            var restrictedInformationContainerElement = document.querySelector('[aria-label="Restricted information"]');
            var infoExpandButton = restrictedInformationContainerElement.querySelector('button');
            var targetelementSelector = '[aria-label="Customer Statement"]';
            var customerStatementElement_promise = window._my_custom_methods.clickAndWaitForElement(clickElement=infoExpandButton, targetContainer=document, targetSelector=targetelementSelector, timeout = 5000)
            var case_contacts = await case_contacts_promise;
            var primaryContact = case_contacts.filter(contact=>contact.role == 'Primary');
            primaryContact = (primaryContact.length > 0) ? primaryContact[0] : {'email': ''};
            var customerStatementElement = await customerStatementElement_promise;
            var customerStatement = customerStatementElement?.textContent;
            customerStatement = customerStatement !== null ? customerStatement : '';
            customerStatement = customerStatement.replaceAll('\r\n', '\n').replaceAll('\n', '\r\n');
            var case_notes_object = {
                "caseContactTextBox": primaryContact.email,
                "caseStatusComboBox": caseStatus,
                "problemDescriptionTextArea": customerStatement,
                "nextActionTextArea": ""
            };
            var base64EncodedJsonString = window._my_custom_methods.compressAndBase64Encode(JSON.stringify(case_notes_object));
            var textToCopy = base64EncodedJsonString;
            window._my_custom_methods.copyToClipboard(textToCopy);
        };
        if (!document.getElementById(startNewNotesButton_id_string)) caseViewHeader.appendChild(startNewNotesButton);

        var expandTimelineButton = document.createElement('button');
        expandTimelineButton.textContent = "Expand Timeline";
        var expandTimelineButton_id_string = "expand_timeline_button";
        expandTimelineButton.id = expandTimelineButton_id_string;
        expandTimelineButton.onclick = ()=>{
            window._my_custom_methods.expandTimelineElements();
        };
        if (!document.getElementById(expandTimelineButton_id_string)) caseViewHeader.appendChild(expandTimelineButton);

        var lastNoteImportButton = document.createElement('button');
        lastNoteImportButton.textContent = "Last Note Import";
        var lastNoteImportButton_id_string = "last_note_import_button";
        lastNoteImportButton.id = lastNoteImportButton_id_string;
        lastNoteImportButton.onclick = ()=>{
            window._my_custom_methods.lastcaseImportString();
        };
        if (!document.getElementById(lastNoteImportButton_id_string)) caseViewHeader.appendChild(lastNoteImportButton);

    };
};
window._my_custom_methods.email_view_header_enhancer = async function email_view_header_enhancer() {
    var emailViewHeader = document.querySelector('[data-id="form-header"]');
    var current_page_type = window._my_custom_methods.get_page_type()
    if (current_page_type == 'email') {
        window._my_custom_methods.setup_menu();
    };
};
window._my_custom_methods.expandTimelineElements = async function expandTimelineElements(callback) {
    var timelineElements = window._my_custom_methods.getTimelineElements();
    var promises = [];

    for (const timelineElement of timelineElements) {
        promises.push(window._my_custom_methods.processElement(timelineElement));
    }

    await Promise.all(promises);

    if (typeof callback === 'function') {
        callback();
    } else {
        alert("All timeline elements expanded.");
    }
}

window._my_custom_methods.lastcaseImportString = async function lastcaseImportString() {
    var results = [];

    await window._my_custom_methods.expandTimelineElements(async function() {
        var timelineElements = window._my_custom_methods.getTimelineElements();
        for (const timelineElement of timelineElements) {
            await window._my_custom_methods.checkForData(timelineElement, results);
        }
        
        if (results.length > 0) {
            window._my_custom_methods.copyToClipboard(results[0].replace(":End Compressed Base64Encoded JSON", ""));
        } else {
            alert("No matching data found.");
        }
    });
}

window._my_custom_methods.getTimelineElements = function getTimelineElements() {
    return Array.from(document.querySelector('[data-id="notescontrol-unPinnedAccordion-incident"]').querySelectorAll('li'));
}

window._my_custom_methods.processElement = async function processElement(timelineElement) {
    var moreButton = timelineElement.querySelector('[aria-label="View more Collapse"]');
    var lessButton = timelineElement.querySelector('[aria-label="View less Expand"]');

    if (moreButton !== null) {
        moreButton.click();
        await window._my_custom_methods.delay(2000); // Wait 2 seconds for expansion
    }
}

window._my_custom_methods.checkForData = function checkForData(timelineElement, results) {
    var dataMatch = timelineElement.textContent.match(/Compressed Base64Encoded JSON:\s*(H4sIA[^\s<]+):End Compressed Base64Encoded JSON/g);
    if (dataMatch && dataMatch.length > 0) {
        results.push(dataMatch[0]);
    }
}
/*
INTERVAL RUNNERS
*/;
function autoPendingSlaAlarm(seconds, sleep_counter) {
    setup_interval_runner(interval_id='autoSlaAlarm', callable=()=>{window._my_custom_methods.pendingSlaAlarm(seconds=seconds, sleep_counter=sleep_counter)}, seconds=seconds);
};
function dfm_dash_refresh_auto(seconds) {
    setup_interval_runner(interval_id='myDashboardInterval', callable=window._my_custom_methods.dfm_dash_refresh, seconds=seconds);
};

function make_contacts_click_copy_auto(seconds) {
    setup_interval_runner(interval_id='myContactsCopyable', callable=(()=>{if (document.querySelector('[data-id^="ref_pan_Summary_tab_section"]') !== null) make_contacts_click_copy()}), seconds=seconds);
};
function make_case_details_click_copy_auto(seconds) {
    setup_interval_runner(interval_id='headerEnhancer', callable=window._my_custom_methods.case_view_header_enhancer, seconds=seconds);
};
/* dfm_dash_refresh_auto(seconds=10) */;
make_contacts_click_copy_auto(seconds=10);
autoPendingSlaAlarm(seconds=10, sleep_counter=6);
make_case_details_click_copy_auto(seconds=5);
})();
