import { PlusCircle } from 'phosphor-react'
import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  MouseEvent,
  useState
} from 'react'
import { NoTasksAlert } from '../NoTasksAlert'
import { v4 as uuidv4 } from 'uuid'

import { Task } from '../Task'
import S from './style.module.scss'

interface TaskProps {
  id: string
  content: string
  available: boolean
}

export function Main() {
  const [createdTaskNumber, setCreatedTaskNumber] = useState(0)
  const [doneTaskNumber, setDoneTaskNumber] = useState(0)
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [taskText, setTaskText] = useState('')

  function handleTaskTextInvalid(e: InvalidEvent<HTMLInputElement>) {
    e.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function handleAddNewTask(e: FormEvent) {
    e.preventDefault()
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        content: taskText,
        available: true
      }
    ])
    setCreatedTaskNumber(oldState => {
      return oldState + 1
    })
    setTaskText('')
  }

  function handleTaskTextChange(e: ChangeEvent<HTMLInputElement>) {
    e.target.setCustomValidity('')
    setTaskText(e.target.value)
  }

  function HandleAvailableChange(e: MouseEvent<HTMLButtonElement>) {
    const currentId = e.currentTarget.value

    const tasksWithNewAvailableList = tasks.map(task => {
      if (task.id === currentId) {
        task.available = !task.available
        return task
      }
      return task
    })

    setTasks(tasksWithNewAvailableList)
    AvailableTasksCounter()
  }

  function AvailableTasksCounter() {
    let doneTasksCounter = 0
    for (let i in tasks) {
      if (!tasks[i].available) {
        doneTasksCounter += 1
      }
    }
    setDoneTaskNumber(doneTasksCounter)
  }

  function handleRemoveTask(e: MouseEvent<HTMLButtonElement>) {
    const currentId = e.currentTarget.value
    const newFilteredTasks = tasks.filter(task => {
      if (currentId === task.id) {
        return
      }
      return task
    })

    setTasks(newFilteredTasks)

    setCreatedTaskNumber(oldState => {
      return oldState - 1
    })
  }

  return (
    <>
      <form onSubmit={handleAddNewTask} className={S.addTaskForm}>
        <input
          required
          onChange={handleTaskTextChange}
          onInvalid={handleTaskTextInvalid}
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={taskText}
        />
        <button type="submit">
          <span>Criar</span>
          <PlusCircle size={16} />
        </button>
      </form>
      <main className={S.main}>
        <div className={S.TasksData}>
          <div>
            <p className={S.created}>Tarefas criadas</p>
            <span>{createdTaskNumber}</span>
          </div>
          <div>
            <p className={S.done}>Concluídas</p>
            <span>
              {createdTaskNumber > 0
                ? `${doneTaskNumber} de ${createdTaskNumber}`
                : `${doneTaskNumber}`}
            </span>
          </div>
        </div>
        {createdTaskNumber <= 0 ? (
          <NoTasksAlert />
        ) : (
          tasks.map(item => (
            <Task
              key={item.id}
              fullTask={item}
              HandleAvailableChange={HandleAvailableChange}
              handleRemoveTask={handleRemoveTask}
            />
          ))
        )}
      </main>
    </>
  )
}
