(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ab136"],{1474:function(e,t,a){"use strict";a.r(t);var c=a("7a23");const o=Object(c["I"])("data-v-a77e009a");Object(c["u"])("data-v-a77e009a");const r={class:"boardspage container-fluid"},n={class:"row"},s={class:"input-group  mb-3"},d=Object(c["h"])("button",{class:"btn btn-outline-success shadow",type:"submit",id:"button-addon2"},[Object(c["h"])("i",{class:"fa fa-plus","aria-hidden":"true"})],-1),b={class:"row"};Object(c["s"])();const l=o((e,t,a,o,l,u)=>{const i=Object(c["y"])("BoardComponent");return Object(c["r"])(),Object(c["e"])("div",r,[Object(c["h"])("div",n,[Object(c["h"])("div",s,[Object(c["h"])("form",{class:"col-6  d-flex flex-row",onSubmit:t[2]||(t[2]=Object(c["H"])((...e)=>o.create&&o.create(...e),["prevent"]))},[Object(c["G"])(Object(c["h"])("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=e=>o.state.newBoard.title=e),class:"form-control shadow",placeholder:"New Board Title","aria-label":"Recipient's username","aria-describedby":"button-addon2"},null,512),[[c["D"],o.state.newBoard.title]]),d],32)])]),Object(c["h"])("div",b,[(Object(c["r"])(!0),Object(c["e"])(c["a"],null,Object(c["x"])(o.state.boards,e=>(Object(c["r"])(),Object(c["e"])(i,{key:e._id,"board-prop":e},null,8,["board-prop"]))),128))])])});var u=a("83fc"),i=a("8a4e"),p=a("37c0"),j=a("7b76"),O={name:"Boardspage",setup(){const e=Object(c["v"])({boards:Object(c["c"])(()=>u["a"].boards),user:Object(c["c"])(()=>u["a"].user),account:Object(c["c"])(()=>u["a"].account),newBoard:{}});return Object(c["p"])(async()=>{try{await p["a"].getAllBoards()}catch(e){i["a"].error(e)}}),{state:e,async create(){try{await p["a"].create(e.newBoard,e.account.id),e.newBoard.title=""}catch(t){i["a"].error(t)}}}},components:{BoardComponent:j["default"]}};O.render=l,O.__scopeId="data-v-a77e009a";t["default"]=O}}]);