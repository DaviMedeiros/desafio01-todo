import { useState, KeyboardEvent, ChangeEvent, FormEvent } from "react";
import { PlusCircle, Trash } from 'phosphor-react'
import { v4 as uuid } from "uuid";

import "./TaskList.css";
import { TaskListEmpty } from "./TaskListEmpty";

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
                                               {
                                                  id:'1',
                                                  title:'Teste', 
                                                  isComplete:false
                                                }
                                              ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [countTaskCompleted, setCountTaskCompleted] = useState(0);

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>){
    event.target.setCustomValidity('')
    setNewTaskTitle(event.target.value)
  }

  function handleCreateNewTask(event: FormEvent) {
    
    event.preventDefault();

    const createNewTask = [
      ...tasks,
      {
        id: uuid(),
        title: newTaskTitle,
        isComplete: false,
      }
    ];

    setTasks(createNewTask);

    setNewTaskTitle("");
  }

  function handleCounterTasksCompleted(newTasks: Task[]){
    let count = 0;
    newTasks.map((task) => {
      if (task.isComplete === true) count++;
    });

    setCountTaskCompleted(count);
  }

  function handleToggleTaskCompleted(id: string) {
    const toggleTasks = tasks.map((task) => {
      if (task.id === id) task.isComplete = !task.isComplete;
      return task;
    });

    handleCounterTasksCompleted(toggleTasks);

    setTasks(toggleTasks);
  }

  function handleRemoveTask(id: string) {
    const toggleTasks = tasks.filter((task) => task.id !== id);
    handleCounterTasksCompleted(toggleTasks);
    setTasks(toggleTasks);    
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const { key } = event;
    if (key === "Enter") handleCreateNewTask(event);
  }

  return (
    <section className="container">
      <header>
        <form onSubmit={handleCreateNewTask}  className="input-group">
          <input
            className="input-new"
            type="text"
            placeholder="Adicionar uma nova tarefa"
            onChange={handleNewTaskChange}
            value={newTaskTitle}
            onKeyDown={handleKeyDown}
            required
          />
          <button type="submit" className="submit">
            Criar
            <PlusCircle/>
          </button>
        
        </form>
      </header>

      <main>
        
        <header className="info-tasks">
          <div>
            <span className="task-created" >Tarefas criadas</span>
            <span className="counter"> {tasks.length} </span>
          </div>
          <div>
            <span className="task-completed" >Concluídas</span>
            <span className="counter"> {countTaskCompleted} de {tasks.length} </span>
          </div>
        </header>
        
        { tasks.length === 0 ? (
            <TaskListEmpty/>
          ) : (
            <>
              <ul>
                {tasks.map((task) => (
                  <li key={task.id}>
                    <div className={task.isComplete ? "completed" : ""} >
                      <input
                        type="checkbox"
                        checked={task.isComplete}
                        readOnly
                        onClick={() => handleToggleTaskCompleted(task.id)}
                      />
                      <label>{task.title}</label>
                    </div>

                    <button
                      type="button"
                      className="button-trash"
                      data-testid="remove-task-button"
                      onClick={() => handleRemoveTask(task.id)}
                    >
                      <Trash size={20}/>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}      
        
      </main>
    </section>
  );
}