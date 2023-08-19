import { Injectable } from '@nestjs/common'
import { Task } from '../core/task'

interface TeamwrokTaskCompletedContract {
  execute(taskLink: string): void
  verifyIsMainTask(task: Task): boolean
  verifyIsSubtask(task: Task): boolean
}

@Injectable()
export class TeamworkTaskCompleted implements TeamwrokTaskCompletedContract {
  verifyIsMainTask(task: Task): boolean {
    throw new Error('Method not implemented.')
  }
  verifyIsSubtask(task: Task): boolean {
    throw new Error('Method not implemented.')
  }
  public async execute(taskLink: string) {
    let [, , , , catchedTaskId] = taskLink.split('/')
    const taskId = Number(catchedTaskId)

    // const task = new Task(taskId)

    console.log(taskId)
    return taskId
  }
}
