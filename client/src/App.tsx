import React, { useState, useEffect } from 'react'
import './App.scss'
import LeftPanel from './LeftPanel/LeftPanel'
import RightPanel from './RightPanel/RightPanel'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// TODO remove example routes
import TaskList from './TaskList/TaskList'
// import Foo from './Foo/Foo'
// import Bar from './Bar/Bar'

function App(): any {
  const [popupMessage, setPopupMessage] = useState('')
  const [user, setUser] = useState<any>(null)
  const [taskListConfig, setTaskListConfig] = useState<object>({title:"All Tasks",allowRename:false})
  const [tasks, setTasks] = useState<any>(null)
  const [selectedTask, setSelectedTask] = useState<object>(null)
  const [filteredTasks, setFilteredTasks] = useState<any>(null)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true)
  const [info, setInfo] = useState('')
  const [username, setUsername] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    if (!newTask) return
    let jwt = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
    fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': jwt },
      body: JSON.stringify({
        user_id: user._id,
        title: newTask,
      }),
    }).then((response) => {
      response.json().then((data) => {
        if (!response.ok) {
          setPopupMessage(JSON.stringify([false, data]))
        } else {
          setPopupMessage(JSON.stringify([true, 'Task Added']))
          setTasks((tasks) => [...tasks, data])
        }
      })
    })
  }, [newTask])
  const updateTask = (taskId:string,query:object,message:string) => {
    console.log("💹🈯💹",taskId,query)
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
          setTasks(filteredTasks.map(e=>e._id == taskId ? {...e,...query} : e))
          selectedTask && setSelectedTask({...selectedTask, ...query})
        }
      })
    })
  }
  const deleteTask = (taskId:string,message:string) => {
    let jwt = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
    fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': jwt },
    }).then((response) => {
      response.text().then((data) => {
        if (!response.ok) {
          setPopupMessage(JSON.stringify([false, data]))
        } else {
          setPopupMessage(JSON.stringify([true, message]))
          setTasks(filteredTasks.map(e=>e._id != taskId))
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
            // console.log("😁😁",JSON.parse(data))
            setTasks(JSON.parse(data))
          }
        })
      })
    }
    if (tasks) {
      console.log('😘😘😘', tasks)
      setFilteredTasks(tasks)
    }
  }, [user, tasks])
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
    // .then((response) => response.text())
    // .then((data) => console.log('✌✌', data, '✌✌'))
  }

  return (
    <div className="App d-flex">
      <LeftPanel
        user={user}
        filteredTasks={filteredTasks}
        setFilteredTasks={setFilteredTasks}
        tasks={tasks}
        setUser={setUser}
        setTaskListConfig={setTaskListConfig}
        login={login}
        register={register}
        username={username}
        setUsername={setUsername}
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
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
