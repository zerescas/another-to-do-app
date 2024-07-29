import{T as r}from"./ToDoList-CyQjC3zi.js";import{d as c,g as p,c as n,r as l,a as d,b as i,e as o,f as t,o as u}from"./index-IV0rCYNp.js";import{N as m}from"./NavBar-C0jUD1jb.js";const T={class:"app-layout app-layout--desktop-float"},_={class:"app-layout--content app-layout--scrollable app-layout--padding"},P=c({__name:"ProjectsView",setup(j){const e=p(),s=n(()=>`
    Projects
    <sup class="title-superscript">
      ${e.projects.length}  
    </sup>
  `),a=l({color:"projects",customTitle:s,customTitleMode:"html"});return(f,g)=>(u(),d("div",T,[i("div",_,[o(r,{items:t(e).projects,toDoType:"project",onCreateTodo:t(e).createProject,onUpdateTodo:t(e).updateProject,onDeleteTodo:t(e).deleteProject},null,8,["items","onCreateTodo","onUpdateTodo","onDeleteTodo"])]),o(m,{settings:a.value},null,8,["settings"])]))}});export{P as default};
