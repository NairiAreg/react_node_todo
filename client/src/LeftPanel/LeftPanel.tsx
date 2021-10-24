import React, { useState, useEffect } from 'react'
import './LeftPanel.scss'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Today,
} from '@mui/icons-material'
import { IconButton, TextField, Box, Tooltip, Button } from '@mui/material'

function App() {
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
      <div
        className="leftPanelBody d-flex flex-column mt-5"
        onClick={() =>
          leftPanelCollapsed && setLeftPanelCollapsed(!leftPanelCollapsed)
        }
      >
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
        >
          <Tooltip title="Search">
            <IconButton>
              <SearchIcon sx={{ mr: 1, my: 0.5 }} />
            </IconButton>
          </Tooltip>
          <TextField
            id="search"
            label="Search"
            variant="filled"
            className={`${leftPanelCollapsed ? 'd-none' : ''}`}
          />
        </Box>
        {/* {leftPanelCollapsed ? <Tooltip title="Today"> : ''} */}
        //TODO Make toolip on collapsed
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<Today />}
          >
            {!leftPanelCollapsed ? 'Today' : ''}
          </Button>
        {/* </Tooltip> */}
      </div>
    </div>
  )
}

export default App
