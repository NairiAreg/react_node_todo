import React, { useState, useEffect } from 'react'
import './TaskList.scss'
import {
  PersonAdd,
  Settings,
  Logout,
  MoreVert,
  DriveFileRenameOutline,
  Sort,
  StarBorder,
  Today,
  SortByAlpha,
  EventNote,
  Palette,
  Assignment,
  Air,
  RadioButtonUnchecked,
  CheckCircle,
  ControlPoint,
} from '@mui/icons-material'
import {
  IconButton,
  Tooltip,
  Divider,
  Avatar,
  TextField,
  Box,
  Button,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Paper,
} from '@mui/material'
function Home() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = anchorEl
  const handleClickListOptions = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div id="taskList">
      <div className="d-flex justify-content-between p-3">
        <div className="d-flex flex-column myDayTitle">
          <h1>My Day</h1>
          <h6>{new Date().toDateString()}</h6>
        </div>
        <div>
          <Tooltip arrow title="List Options">
            <IconButton onClick={handleClickListOptions}>
              <MoreVert />
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
              {/* //TODO Remove later */}
              <DriveFileRenameOutline /> Rename List
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Sort fontSize="small" />
              </ListItemIcon>
              Sort
              <List className="sortOptionsPopup position-absolute end-100">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Importance" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Today />
                    </ListItemIcon>
                    <ListItemText primary="Due Date" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SortByAlpha />
                    </ListItemIcon>
                    <ListItemText primary="Alphabetically" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <EventNote />
                    </ListItemIcon>
                    <ListItemText primary="Creation date" />
                  </ListItemButton>
                </ListItem>
              </List>
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <Palette fontSize="small" />
              </ListItemIcon>
              Change Theme
              <List className="sortOptionsPopup themePopup position-absolute end-100">
                <ListItem disablePadding>
                  <ListItemButton
                    style={{ backgroundColor: '#61BD4F' }}
                  ></ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    style={{ backgroundColor: '#F2D600' }}
                  ></ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    style={{ backgroundColor: '#FF9F1A' }}
                  ></ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    style={{ backgroundColor: '#EB5A46' }}
                  ></ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    style={{ backgroundColor: '#C377E0' }}
                  ></ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    style={{ backgroundColor: '#0079BF' }}
                  ></ListItemButton>
                </ListItem>
              </List>
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
        </div>
      </div>

      <div id="tasks" className='p-5'>
        <div className="task d-flex">
          <IconButton>
            <RadioButtonUnchecked />
          </IconButton>
          <div className="exactTask p-3"> 
            <h6>Task #1</h6>
            <span>
            <Assignment />
            </span>
            <span>Today</span>
          </div>
        </div>
      </div>

      <Box className="addTaskBox d-flex align-items-center">
        <IconButton>
          <ControlPoint sx={{ mr: 1, my: 0.5 }} />
        </IconButton>
        <TextField id="addTaskInput" label="Add a new task" variant="filled" />
      </Box>
    </div>
  )
}

export default Home
