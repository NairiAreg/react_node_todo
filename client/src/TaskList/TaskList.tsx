import React from 'react'
import "./TaskList.scss"
function Home() {
  return (
    <div id="taskList">
      <div className="d-flex justify-content-between p-3">
        <div className="d-flex flex-column myDayTitle">
          <h1>My Day</h1>
          <h6>{(new Date).toDateString()}</h6>
        </div>
      </div>
    </div>
  )
}

export default Home
