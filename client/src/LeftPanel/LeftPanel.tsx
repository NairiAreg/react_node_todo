import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './LeftPanel.scss'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Today,
  StarBorder,
  DateRange,
  TaskAlt,
  FormatListNumbered,
  PlaylistAddCheck,
} from '@mui/icons-material'
import {
  IconButton,
  TextField,
  Box,
  Tooltip,
  Button,
  Divider,
} from '@mui/material'

function LeftPanel(props: any): any {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  useEffect(() => {}, [])

  return (
    <div
      id="leftPanel"
      className={`${leftPanelCollapsed ? 'collapsed' : ''} position-relative`}
    >
      <IconButton
        className="menuToggleIcon position-absolute"
        onClick={() => {
          setLeftPanelCollapsed(!leftPanelCollapsed)
        }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <div className="leftPanelBody d-flex flex-column mt-5">
        <div className="profile d-flex">
          <Tooltip arrow title="Profile">
            <IconButton>
              <img src="https://picsum.photos/45/45" alt="img" />
            </IconButton>
          </Tooltip>
          <div className="d-flex flex-column ms-3">
            <h5>Nairi Areg Hatspanyan</h5>
            <span>hnairiareg@gmail.com</span>
          </div>
        </div>
        <Box
          className={`searchBox d-flex align-items-center ${
            leftPanelCollapsed ? 'justify-content-center' : ''
          }`}
          onClick={() => {
            leftPanelCollapsed && setLeftPanelCollapsed(!leftPanelCollapsed)
          }}
        >
          <div className="position-relative">
            <IconButton className="position-absolute ps-2">
              <SearchIcon sx={{ mr: 1, my: 0.5 }} />
            </IconButton>
            <Tooltip arrow title={`${leftPanelCollapsed ? 'Search' : ''}`}>
              <TextField id="search" label="Search" variant="filled" />
            </Tooltip>
          </div>
        </Box>
        <Tooltip arrow title={`${leftPanelCollapsed ? 'Today' : ''}`}>
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<Today />}
          >
            {!leftPanelCollapsed ? 'Today' : ''}
          </Button>
        </Tooltip>
        <Tooltip arrow title={`${leftPanelCollapsed ? 'Important' : ''}`}>
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<StarBorder />}
          >
            {!leftPanelCollapsed ? 'Important' : ''}
          </Button>
        </Tooltip>
        <Tooltip arrow title={`${leftPanelCollapsed ? 'Planned' : ''}`}>
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<DateRange />}
          >
            {!leftPanelCollapsed ? 'Planned' : ''}
          </Button>
        </Tooltip>
        <Tooltip arrow title={`${leftPanelCollapsed ? 'Tasks' : ''}`}>
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<TaskAlt />}
          >
            {!leftPanelCollapsed ? 'Tasks' : ''}
          </Button>
        </Tooltip>

        <Divider />

        <Tooltip arrow title={`${leftPanelCollapsed ? 'Custom Task #1' : ''}`}>
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<FormatListNumbered />}
          >
            {!leftPanelCollapsed ? 'Custom Tasks List' : ''}
          </Button>
        </Tooltip>
        <Tooltip arrow title={`${leftPanelCollapsed ? 'New List' : ''}`}>
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<PlaylistAddCheck />}
          >
            {!leftPanelCollapsed ? 'New List' : ''}
          </Button>
        </Tooltip>
        {/* //TODO remove exampel routes */}
        <Link to="/">Home</Link>
        <Link to="/foo">Foo</Link>
        <Link to="/bar">Bar</Link>
      </div>
    </div>
  )
}

export default LeftPanel
