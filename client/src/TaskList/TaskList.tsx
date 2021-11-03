import React, { useState, useEffect } from 'react'
import './TaskList.scss'
import {
  Settings,
  Logout,
  MoreVert,
  DriveFileRenameOutline,
  Sort,
  StarBorder,
  Star,
  Today,
  SortByAlpha,
  EventNote,
  Palette,
  Assignment,
  Air,
  ExpandMore,
  RadioButtonUnchecked,
  CheckCircle,
  ControlPoint,
} from '@mui/icons-material'
import {
  IconButton,
  Tooltip,
  Typography,
  TextField,
  Box,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemButton,
  ListItemIcon,
} from '@mui/material'
function TaskList({
  setInfo,
  setRightPanelCollapsed,
  setNewTask,
  setSelectedTask,
  taskListConfig,
  tasks,
  updateTask,
}: any) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [inputText, setInputText] = useState('')
  const open = anchorEl
  const handleClickListOptions = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  useEffect(() => {
    console.log('🅰🅰🅰', tasks, 123123)
  }, [tasks])
  const formatDueDate = (date) => {
    if (new Date(date).toDateString() == new Date().toDateString())
      return 'Today'
    if (
      new Date(new Date().setDate(new Date().getDate() + 1)).toDateString() ==
      new Date(date).toDateString()
    )
      return 'Tomorrow'

    return new Date(date).toDateString()
  }

  return (
    <div id="taskList">
      <div className="d-flex justify-content-between p-3">
        <div className="d-flex flex-column myDayTitle">
          <h1>{taskListConfig.title}</h1>
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
            {taskListConfig.allowRename && (
              <MenuItem>
                <DriveFileRenameOutline /> Rename List
              </MenuItem>
            )}
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
          </Menu>
        </div>
      </div>

      <div id="tasks" className="p-5">
        {tasks && (
          <>
            {tasks
              .filter((e) => !e.completed)
              .map((task) => {
                return (
                  <div
                    className="task d-flex my-3"
                    key={task._id}
                    data-id={task._id}
                    onClick={(e) => {
                      setSelectedTask(task)
                      setRightPanelCollapsed(false)
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        updateTask(
                          task._id,
                          { completed: true },
                          'Task Completed',
                        )
                      }
                    >
                      <RadioButtonUnchecked />
                    </IconButton>
                    <div className="exactTask p-3 d-flex justify-content-between">
                      <div>
                        <h6>{task.title}</h6>
                        <span>{task.note && <Assignment />}</span>
                        {task.due_date && (
                          <span>{formatDueDate(task.due_date)}</span>
                        )}
                      </div>
                      <IconButton
                        onClick={() =>
                          updateTask(
                            task._id,
                            { important: !task.important },
                            task.important
                              ? 'Task removed from Important'
                              : 'Task Added to Important',
                          )
                        }
                      >
                        {task.important ? <Star /> : <StarBorder />}
                      </IconButton>
                    </div>
                  </div>
                )
              })}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Completed Tasks</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {tasks
                  .filter((e) => e.completed)
                  .map((task) => {
                    return (
                      <div
                        className="task d-flex my-3"
                        key={task._id}
                        data-id={task._id}
                        onClick={(e) => {
                          // console.log(
                          //   (e.target as any).querySelector('h6').innerText,
                          //   '❤',
                          // )
                          // setInfo((e.target as any).querySelector('h6').innerText)
                          setSelectedTask(task)
                          setRightPanelCollapsed(false)
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            updateTask(
                              task._id,
                              { completed: false },
                              'Task Incomplete',
                            )
                          }
                        >
                          <CheckCircle />
                        </IconButton>
                        <div className="exactTask p-3 d-flex justify-content-between">
                          <div>
                            <h6>{task.title}</h6>
                            <span>{task.note && <Assignment />}</span>
                            {task.due_date && (
                              <span>{formatDueDate(task.due_date)}</span>
                            )}
                          </div>
                          <IconButton
                            onClick={() =>
                              updateTask(
                                task._id,
                                { important: !task.important },
                                task.important
                                  ? 'Task removed from Important'
                                  : 'Task Added to Important',
                              )
                            }
                          >
                            {task.important ? <Star /> : <StarBorder />}
                          </IconButton>
                        </div>
                      </div>
                    )
                  })}
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </div>

      <Box className="addTaskBox d-flex align-items-center">
        <IconButton onClick={() => setNewTask(inputText)}>
          <ControlPoint sx={{ mr: 1, my: 0.5 }} />
        </IconButton>
        <TextField
          onChange={(e) => setInputText((e as any).target.value)}
          id="addTaskInput"
          label="Add a new task"
          variant="filled"
        />
      </Box>
    </div>
  )
}

export default TaskList
