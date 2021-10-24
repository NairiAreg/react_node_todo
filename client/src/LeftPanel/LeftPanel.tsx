import React, { useState, useEffect, useRef } from 'react'
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

function App() {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  // const [searchFocus, setSearchFocus] = useState(false)
  const searchRef = useRef(null)
  useEffect(() => {
    // leftPanelCollapsed && setSearchFocus(false)
      // searchRef?.current?.focus?.();
  })
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
          <Tooltip title="Profile">
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
            // setSearchFocus(true)
            setTimeout(() => {
              // searchRef?.current?.click?.();
            }, 0);
          }}
        >
          <Tooltip title={`${leftPanelCollapsed ? 'Search' : ''}`}>
            <IconButton>
              <SearchIcon sx={{ mr: 1, my: 0.5 }} />
            </IconButton>
          </Tooltip>
          <TextField
            id="search"
            label="Search"
            variant="filled"
            className={`${leftPanelCollapsed ? 'd-none' : ''}`}
            // autoFocus={searchFocus}
            inputRef={searchRef} 
          />
        </Box>
        <Tooltip title={`${leftPanelCollapsed ? 'Today' : ''}`}>
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<Today />}
          >
            {!leftPanelCollapsed ? 'Today' : ''}
          </Button>
        </Tooltip>
        <Tooltip title={`${leftPanelCollapsed ? 'Important' : ''}`}>
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<StarBorder />}
          >
            {!leftPanelCollapsed ? 'Important' : ''}
          </Button>
        </Tooltip>
        <Tooltip title={`${leftPanelCollapsed ? 'Planned' : ''}`}>
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<DateRange />}
          >
            {!leftPanelCollapsed ? 'Planned' : ''}
          </Button>
        </Tooltip>
        <Tooltip title={`${leftPanelCollapsed ? 'Tasks' : ''}`}>
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<TaskAlt />}
          >
            {!leftPanelCollapsed ? 'Tasks' : ''}
          </Button>
        </Tooltip>

        <Divider />

        <Tooltip title={`${leftPanelCollapsed ? 'Custom Tasks List' : ''}`}>
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<FormatListNumbered />}
          >
            {!leftPanelCollapsed ? 'Custom Tasks List' : ''}
          </Button>
        </Tooltip>
        <Tooltip title={`${leftPanelCollapsed ? 'New List' : ''}`}>
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<PlaylistAddCheck />}
          >
            {!leftPanelCollapsed ? 'New List' : ''}
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}

export default App
