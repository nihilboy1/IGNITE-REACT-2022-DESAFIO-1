import { CheckCircle, Circle, Trash } from 'phosphor-react'
import { MouseEvent } from 'react'
import S from './style.module.scss'

interface TaskProps {
  fullTask: {
    id: string
    content: string
    available: boolean
  }
  HandleAvailableChange: (e: MouseEvent<HTMLButtonElement>) => void
  handleRemoveTask: (e: MouseEvent<HTMLButtonElement>) => void
}

export function Task({
  fullTask,
  HandleAvailableChange,
  handleRemoveTask
}: TaskProps) {
  return (
    <div className={S.task}>
      <button className={S.circleButton} onClick={HandleAvailableChange} value={fullTask.id}>
        {fullTask.available ? (
          <Circle size={22} color="#1e6f9f" weight="bold" />
        ) : (
          <CheckCircle
            size={22}
            weight="fill"
            color="#5e60ce"
            className={S.checkCircle}
          />
        )}
      </button>
      <p className={fullTask.available ? '' : S.notAvailable}>
        {fullTask.content}
      </p>
      <button
        onClick={handleRemoveTask}
        value={fullTask.id}
        className={S.trashButton}
      >
        <Trash className={S.trash} size={22} weight="thin" />
      </button>
    </div>
  )
}
