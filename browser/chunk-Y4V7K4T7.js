import{n as _,o as C}from"./chunk-HSCRD5AM.js";import{Ac as g,B as i,Ea as a,Eb as b,Pa as u,ca as p,da as s,eb as m,j as r,ka as c,nb as d,ob as l,tb as h,vb as f}from"./chunk-76IBZPGJ.js";var y=class n{placeholder="Productos";debouncer=new r;onDebounce=new c;ngOnInit(){this.debouncer.pipe(i(300)).subscribe(e=>{this.onDebounce.emit(e)})}onKeyPress(e){this.debouncer.next(e)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=u({type:n,selectors:[["app-search"]],inputs:{placeholder:"placeholder"},outputs:{onDebounce:"onDebounce"},decls:3,vars:1,consts:[["txtInput",""],[1,"search"],["type","text","pInputText","",1,"search__input",3,"keyup","placeholder"]],template:function(t,o){if(t&1){let x=h();d(0,"div",1)(1,"input",2,0),f("keyup",function(){p(x);let I=b(2);return s(o.onKeyPress(I.value))}),l()()}t&2&&(a(),m("placeholder","Buscar "+o.placeholder))},dependencies:[g,C,_],styles:[".search[_ngcontent-%COMP%]{width:100%}.search__input[_ngcontent-%COMP%]{width:100%;font-size:17px;border-radius:0%;padding:10px}@media (min-width: 768px){.search__input[_ngcontent-%COMP%]{border-radius:1rem}}"],changeDetection:0})};export{y as a};