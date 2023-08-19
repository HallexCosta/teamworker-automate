import { Task, TaskPropsAPI } from './task'

describe('Task', () => {
  describe('#getInstanceParsedTaskPropsAPI', () => {
    it('Should be able create task instance with data rececived from API Teamworker.Task', () => {
      const taskAPI: TaskPropsAPI = {
        'project-id': 0,
        'project-name': '',
        'todo-list-id': 0,
        canComplete: false,
        completed: false,
        content: '',
        parentTaskId: '',
        id: 1,
        progress: 100,
        status: 'complete',
      }
      const expectedProps = ['projectId', 'projectName', 'todoListId']
      const unExpectedProps = ['project-id', 'project-name', 'todo-list-id']

      const task = Task.getInstanceParsedTaskPropsAPI(taskAPI)
      expect(task).toBeInstanceOf(Task)

      const findUnexpectedProps = () => {
        console.log(Object.keys(task.getProps()))
        for (const prop of Object.keys(task.getProps())) {
          if (unExpectedProps.includes(prop)) {
            return true
          }
        }
      }

      const propsFiltered = Object.keys(task.getProps()).filter((prop) =>
        expectedProps.includes(prop),
      )

      expect(propsFiltered.length === expectedProps.length).toBeTruthy()
      expect(findUnexpectedProps()).toBeFalsy()
    })
  })
})
