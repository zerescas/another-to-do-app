import{T as l}from"./ToDoList-DasZH896.js";import{N as c}from"./NavBar-CH7aeHDl.js";import{d as p,u,c as s,r as i,a as d,b as T,e as a,f as e,o as m}from"./index-BhN4RD5f.js";const k={class:"app-layout app-layout--desktop-float"},_={class:"app-layout--content app-layout--scrollable app-layout--padding"},D=p({__name:"TasksView",setup(f){const t=u(),o=s(()=>t.tasksWithoutProjectPin),n=s(()=>`
    Tasks
    <sup class="title-superscript">
      ${o.value.length}  
    </sup>
  `),r=i({color:"tasks",customTitle:n,customTitleMode:"html"});return(v,h)=>(m(),d("div",k,[T("div",_,[a(l,{items:o.value,toDoType:"task",onCreateTodo:e(t).createTask,onUpdateTodo:e(t).updateTask,onDeleteTodo:e(t).deleteTask},null,8,["items","onCreateTodo","onUpdateTodo","onDeleteTodo"])]),a(c,{settings:r.value},null,8,["settings"])]))}});export{D as default};
