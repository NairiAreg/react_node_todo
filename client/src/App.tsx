import React, { useState, useEffect } from 'react'
import './App.scss'
import LeftPanel from './LeftPanel/LeftPanel'
import RightPanel from './RightPanel/RightPanel'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TaskList from './TaskList/TaskList'

function App(): any {
  const [popupMessage, setPopupMessage] = useState('')
  const [user, setUser] = useState<any>(null)
  const [taskListConfig, setTaskListConfig] = useState<object>({
    title: 'All Tasks',
    allowRename: false,
  })
  const [tasks, setTasks] = useState<any>(null)
  const [selectedTask, setSelectedTask] = useState<object>(null)
  const [filteredTasks, setFilteredTasks] = useState<any>(null)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true)
  const [info, setInfo] = useState('')
  const [username, setUsername] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [newTask, setNewTask] = useState('')
  const [taskLists, setTaskLists] = useState(null)
  const [taskForTaskList, setTaskForTaskList] = useState('')

  useEffect(() => {
    if (!newTask) return
    let jwt = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
    fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': jwt },
      body: JSON.stringify({
        user_id: user._id,
        title: newTask,
        ...taskForTaskList && {task_list: taskForTaskList}
      }),
    }).then((response) => {
      response.json().then((data) => {
        if (!response.ok) {
          setPopupMessage(JSON.stringify([false, data]))
        } else {
          console.log('New Task added 💨💨💨', data)
          setPopupMessage(JSON.stringify([true, 'Task Added']))
          setTasks((tasks) => [...tasks, data])
        }
      })
    })
  }, [newTask])
  const updateTask = (taskId: string, query: object, message: string) => {
    console.log('💹🈯💹', taskId, query)
    let jwt = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
    fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': jwt },
      body: JSON.stringify(query),
    }).then((response) => {
      response.text().then((data) => {
        if (!response.ok) {
          setPopupMessage(JSON.stringify([false, data]))
        } else {
          setPopupMessage(JSON.stringify([true, message]))
          setTasks(
            filteredTasks.map((e) =>
              e._id == taskId ? { ...e, ...query } : e,
            ),
          )
          setFilteredTasks(tasks)
          selectedTask && setSelectedTask({ ...selectedTask, ...query })
        }
      })
    })
  }
  const deleteTask = (taskId: string, message: string) => {
    let jwt = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
    fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'auth-token': jwt },
    }).then((response) => {
      response.text().then((data) => {
        if (!response.ok) {
          setPopupMessage(JSON.stringify([false, data]))
        } else {
          setPopupMessage(JSON.stringify([true, message]))
          setTasks(filteredTasks.filter((e) => e._id != taskId))
          selectedTask && setSelectedTask(null)
        }
      })
    })
  }
  useEffect(() => {
    if (!popupMessage.length) return
    // console.log('🤞🤞🤞 popupMessage changed: ', popupMessage)

    let data = JSON.parse(popupMessage)
    data[0] ? toast.success(data[1]) : toast.error(data[1])
  }, [popupMessage])
  useEffect(() => {
    // console.log(user,localStorage.getItem("jwt"),"✔✔✔")

    let jwt = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
    console.log(`✨✨✨\nJWT: ${jwt} \nUser:`)
    console.log(user)
    console.log('%c Tasks:', 'color:red')
    console.log(tasks)
    console.log('\n✨✨✨')
    if (!user && jwt) {
      fetch('http://localhost:3000/api/user/get_data', {
        method: 'GET',
        headers: { 'auth-token': jwt },
      }).then((response) => {
        // console.log(response,"✔✔✔")
        response.text().then((data) => {
          if (!response.ok) {
            console.error(JSON.stringify(data))
          } else {
            console.log(JSON.stringify('Got all Data 🐱‍🏍🐱‍🏍🐱‍🏍'))
            // console.log("😁😁",JSON.parse(data))
            setUser(JSON.parse(data))
          }
        })
      })
      fetch('http://localhost:3000/api/tasks', {
        method: 'GET',
        headers: { 'auth-token': jwt, 'Content-Type': 'application/json' },
      }).then((response) => {
        // console.log(response,"✔✔✔")
        response.text().then((data) => {
          if (!response.ok) {
            console.error(JSON.stringify(data))
          } else {
            console.log(JSON.stringify('Got all Data 🐱‍🏍🐱‍🏍🐱‍🏍'))
            setTasks(JSON.parse(data))
          }
        })
      })
      fetch('http://localhost:3000/api/tasklists', {
        method: 'GET',
        headers: { 'auth-token': jwt, 'Content-Type': 'application/json' },
      }).then((response) => {
        // console.log(response,"✔✔✔")
        response.json().then((data) => {
          if (!response.ok) {
            console.error(JSON.stringify(data))
          } else {
            setTaskLists(data)
            console.log(taskLists)
          }
        })
      })
    }
    if (tasks) {
      console.log('😘😘😘', tasks)
      setFilteredTasks(tasks)
    }
    console.log(11111111)
  }, [tasks, user, taskLists])
  const login = () => {
    fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    }).then((response) => {
      response.text().then((data) => {
        if (!response.ok) {
          setPopupMessage(JSON.stringify([false, data]))
        } else {
          setPopupMessage(JSON.stringify([true, 'Logged in']))
          setUser('')
          localStorage.setItem('jwt', data)
        }
      })
    })
  }
  const register = () => {
    fetch('http://localhost:3000/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: username,
        email: loginEmail,
        password: loginPassword,
      }),
    }).then((response) => {
      response.text().then((data) => {
        if (!response.ok) {
          setPopupMessage(JSON.stringify([false, data]))
        } else {
          setPopupMessage(JSON.stringify([true, 'Registered please sign in']))
        }
      })
    })
  }
  const createTaskList = (title) => {
    if (!taskLists) return
    let jwt = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
    fetch('http://localhost:3000/api/tasklists/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': jwt },
      body: JSON.stringify({
        title: title,
      }),
    }).then((response) => {
      response.text().then((data) => {
        if (!response.ok) {
          setPopupMessage(JSON.stringify([false, data]))
        } else {
          setTaskLists([...taskLists, JSON.parse(data)])
          setPopupMessage(JSON.stringify([true, 'Task List created']))
        }
      })
    })
  }

  return (
    <div className="App d-flex">
      <LeftPanel
        user={user}
        filteredTasks={filteredTasks}
        setFilteredTasks={setFilteredTasks}
        tasks={tasks}
        taskLists={taskLists}
        setUser={setUser}
        setTaskListConfig={setTaskListConfig}
        login={login}
        register={register}
        username={username}
        setUsername={setUsername}
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        setTaskForTaskList={setTaskForTaskList}
        loginPassword={loginPassword}
        createTaskList={createTaskList}
        setLoginPassword={setLoginPassword}
      />
      <TaskList
        setRightPanelCollapsed={setRightPanelCollapsed}
        setInfo={setInfo}
        updateTask={updateTask}
        setNewTask={setNewTask}
        setSelectedTask={setSelectedTask}
        taskListConfig={taskListConfig}
        tasks={filteredTasks}
      />
      <RightPanel
        setRightPanelCollapsed={setRightPanelCollapsed}
        rightPanelCollapsed={rightPanelCollapsed}
        setSelectedTask={setSelectedTask}
        selectedTask={selectedTask}
        info={info}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
