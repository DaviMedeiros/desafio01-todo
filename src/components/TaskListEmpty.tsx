import { ClipboardText } from "phosphor-react";
import './TaskListEmpty.css'

export function TaskListEmpty(){
  return (
    <div className="task-empty"> 
      <ClipboardText size={56}/>
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  )
}



