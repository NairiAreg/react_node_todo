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
  PersonAdd,
  Settings,
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
function LeftPanel(props: any) {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = anchorEl
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const avatarColors = [
    'rgb(0,0,0)',
    'rgb(128,0,0)',
    'rgb(0,128,0)',
    'rgb(128,128,0)',
    'rgb(0,0,128)',
    'rgb(128,0,128)',
    'rgb(0,128,128)',
    'rgb(128,128,128)',
    'rgb(255,0,0)',
    'rgb(0,0,255)',
    'rgb(255,0,255)',
  ]
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
            <IconButton onClick={handleClick}>
              {Math.random() < 0.5 ? (
                <Avatar alt="img" src="https://picsum.photos/45/45" />
              ) : (
                <Avatar
                  sx={{
                    backgroundColor:
                      avatarColors[
                        Math.round(Math.random() * avatarColors.length - 1)
                      ],
                  }}
                >
                  NA
                </Avatar>
              )}
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={!!open}
            className="popupMenu"
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: 8,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          >
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
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
        {/* <Link to="/"> */}
        <Tooltip arrow title={`${leftPanelCollapsed ? 'Today' : ''}`}>
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<Today />}
          >
            {!leftPanelCollapsed ? 'Today' : ''}
          </Button>
        </Tooltip>
        {/* </Link> */}
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
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="/foo">Foo</Link> */}
        {/* <Link to="/bar">Bar</Link> */}
      </div>
    </div>
  )
}

export default LeftPanel
