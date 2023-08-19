export type TaskPropsAPI = {
  id: number
  canComplete: boolean
  content: string
  'project-id': number
  'project-name': string
  'todo-list-id': number
  status: string
  completed: boolean
  progress: number
  parentTaskId: string
}
export type TaskProps = {
  id: number
  canComplete: Boolean
  content: string
  projectId: number
  projectName: string
  todoListId: number
  status: string
  completed: boolean
  progress: number
  parentTaskId: string
}

// }
export class Task {
  constructor(private readonly props: TaskProps) {}

  public getProps() {
    return this.props
  }
  static getInstanceParsedTaskPropsAPI(data: TaskPropsAPI): Task {
    const alias = {
      projectId: 'project-id',
      projectName: 'project-name',
      todoListId: 'todo-list-id',
      parentTask: 'parent-task',
    }

    let task = <TaskProps>{}
    Object.assign(task, data)

    for (const [newProp, oldProp] of Object.entries<string>(alias)) {
      task[newProp] = data[oldProp]
      delete task[oldProp]
    }
    return new Task(task)
  }
}
