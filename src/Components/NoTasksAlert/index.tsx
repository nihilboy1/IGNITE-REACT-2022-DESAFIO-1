import { ClipboardText } from 'phosphor-react'
import S from './style.module.scss'

export function NoTasksAlert() {
  return (
    <div className={S.noTasks}>
      <ClipboardText weight="thin" size={58} className={S.clipboardText} />
      <p className={S.noTasksP}>Você ainda não tem tarefas cadastradas</p>
      <p className={S.createTasksP}>
        Crie tarefas e organize seus itens a fazer
      </p>
    </div>
  )
}
