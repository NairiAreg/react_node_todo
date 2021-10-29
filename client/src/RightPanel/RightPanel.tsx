import React, { useState, useEffect, useCallback } from 'react'
// import { Link } from 'react-router-dom'

import './RightPanel.scss'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Today,
  StarBorder,
  DeleteForever,
  TaskAlt,
  Repeat,
  FormatListNumbered,
  PlaylistAddCheck,
  PersonAdd,
  DateRange,
  ArrowForwardIos,
  Settings,
  RadioButtonUnchecked,
  Assignment,
  Logout,
} from '@mui/icons-material'
import {
  IconButton,
  TextField,
  Box,
  Tooltip,
  Button,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material'
function RightPanel({ rightPanelCollapsed, setRightPanelCollapsed }: any) {
  // const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  // const [count, setCount] = useState(0);
  useEffect(() => {
    // console.log(parentCallback,"😁")
    // // props.parentCallback(1)
    // parentCallback(count + 1)
  }, [])
  return (
    <div
      id="rightPanel"
      className={`${
        rightPanelCollapsed ? 'collapsed' : ''
      } position-relative d-flex flex-column`}
    >
      <div className="task d-flex">
        <IconButton>
          <RadioButtonUnchecked />
        </IconButton>
        <div className="exactTask p-3 d-flex justify-content-between align-items-center w-100">
          <div>
            <h3>Task #1</h3>
          </div>
          <IconButton>
            <StarBorder />
          </IconButton>
        </div>
      </div>

      <Divider />

      <Button className={`mx-1`} variant="outlined" startIcon={<Today />}>
        Add to Today
      </Button>

      <Button className={`mx-1`} variant="outlined" startIcon={<DateRange />}>
        Add due date
      </Button>

      <Button className={`mx-1`} variant="outlined" startIcon={<Repeat />}>
        Repeat
      </Button>

      <div id="notesParent" className="p-3">
        <TextField id="notes" label="Notes" multiline maxRows={6} />
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
        <p className="mb-2">Created on Sun. Oct 24</p>
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
