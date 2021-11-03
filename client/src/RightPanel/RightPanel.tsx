import React, { useState, useEffect, useCallback } from 'react'
// import { Link } from 'react-router-dom'

import './RightPanel.scss'
import {
  Today,
  StarBorder,
  Star,
  DeleteForever,
  Repeat,
  DateRange,
  CheckCircle,
  ArrowForwardIos,
  RadioButtonUnchecked,
} from '@mui/icons-material'
import { IconButton, TextField, Tooltip, Button, Divider } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
function RightPanel({
  rightPanelCollapsed,
  setRightPanelCollapsed,
  selectedTask,
  setSelectedTask,
  updateTask,
}: any) {
  const [tmpNoteVal, setTmpNoteVal] = useState('')
  // const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  // const [count, setCount] = useState(0);
  useEffect(() => {
    // console.log(parentCallback,"😁")
    // // props.parentCallback(1)
    // parentCallback(count + 1)
    // console.log(selectedTask, '😁😁😁')
    setTmpNoteVal(selectedTask?.note)
  }, [selectedTask])
  return (
    <div
      id="rightPanel"
      className={`${
        rightPanelCollapsed ? 'collapsed' : ''
      } position-relative d-flex flex-column`}
    >
      <div className="task d-flex">
        <IconButton
          onClick={() =>
            updateTask(
              selectedTask._id,
              { completed: !selectedTask.completed },
              selectedTask?.completed ? 'Task Incomplete' : 'Task Complete',
            )
          }
        >
          {selectedTask?.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
        </IconButton>
        <div className="exactTask p-3 d-flex justify-content-between align-items-center w-100">
          <div>
            <h3>{selectedTask?.title}</h3>
          </div>
          <IconButton
            onClick={() =>
              updateTask(
                selectedTask._id,
                { important: !selectedTask.important },
                selectedTask?.important
                  ? 'Task removed from Important'
                  : 'Task Added to Important',
              )
            }
          >
            {selectedTask?.important ? <Star /> : <StarBorder />}
          </IconButton>
        </div>
      </div>

      <Divider />

      <Button
        className={`mx-1`}
        variant="outlined"
        startIcon={<Today />}
        onClick={() =>
          updateTask(
            selectedTask._id,
            { due_date: new Date() },
            'Task Added to Today',
          )
        }
      >
        Add to Today
      </Button>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Due Date"
            value={selectedTask?.due_date}
            className={`mx-1`}
            onChange={(date) => {
              // setDueDateValue(date)
              updateTask(
                selectedTask?._id,
                { due_date: date },
                'Due Date Changed',
              )
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

      <Button className={`mx-1`} variant="outlined" startIcon={<Repeat />}>
        Repeat
      </Button>

      <div id="notesParent" className="p-3">
        <TextField value={tmpNoteVal} id="notes" label="Notes" multiline maxRows={6} onBlur={(e)=> {
          updateTask(
            selectedTask?._id,
            { note: e.target.value },
            'Note changed',
          )
        }} onChange={e=>setTmpNoteVal(e.target.value)} />
      </div>

      <div className="d-flex align-items-end justify-content-around px-3 bottomButtons">
        <Tooltip arrow title={`Dismiss detail view`}>
          <IconButton
            onClick={() => {
              setRightPanelCollapsed(!rightPanelCollapsed)
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Tooltip>
        <p className="mb-2">Created on {selectedTask && (new Date(selectedTask.createdAt).toDateString())}</p>
        <Tooltip arrow title={`Delete this task`}>
          <IconButton>
            <DeleteForever />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}

export default RightPanel
