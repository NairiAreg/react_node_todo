import React, { useState, useEffect } from 'react'
import './TaskList.scss'
import {
  MoreVert,
  DriveFileRenameOutline,
  Sort,
  StarBorder,
  Star,
  Today,
  SortByAlpha,
  EventNote,
  Palette,
  DeleteForever,
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
  setRightPanelCollapsed,
  setNewTask,
  setFilteredTasks,
  updateTaskList,
  setSelectedTask,
  deleteTaskList,
  taskListConfig,
  tasks,
  updateTask,
}: any) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [inputText, setInputText] = useState('')
  const [createdAtSortFactor, setCreatedAtSortFactor] = useState(-1)
  const [dueDateSortFactor, setDueDateSortFactor] = useState(-1)
  const [importanceSortFactor, setImportanceSortFactor] = useState(true)
  const [alphaSortFactor, setAlphaSortFactor] = useState(true)
  const [themeStyle, setThemeStyle] = useState({})
  const open = anchorEl
  const handleClickListOptions = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const themeColors = [
    '#919191',
    '#61BD4F',
    '#F2D600',
    '#FF9F1A',
    '#EB5A46',
    '#C377E0',
    '#0079BF',
  ]
  useEffect(() => {
    setThemeStyle(taskListConfig.theme ? {color: taskListConfig.theme} : {color: "white"})
    console.log(taskListConfig)
  }, [taskListConfig])
  const formatDate = (date) => {
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
    <div id="taskList" style={themeStyle}>
      <div className="d-flex justify-content-between p-3">
        <div className="d-flex flex-column myDayTitle">
          <h1>{taskListConfig.title}</h1>
          <h6>
            {taskListConfig.taskListDate
              ? formatDate(taskListConfig.taskListDate)
              : new Date().toDateString()}
          </h6>
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
                  <ListItemButton
                    onClick={() => {
                      setFilteredTasks([
                        ...tasks.filter(
                          (e) => e.important == importanceSortFactor,
                        ),
                        ...tasks.filter(
                          (e) => !e.important == importanceSortFactor,
                        ),
                      ])
                      setImportanceSortFactor(!importanceSortFactor)
                    }}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Importance" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setFilteredTasks([
                        ...tasks
                          .filter((e) => e.due_date)
                          .sort(
                            (a, b) =>
                              (new Date(a.due_date).getTime() -
                                new Date(b.due_date).getTime()) *
                              dueDateSortFactor,
                          ),
                        ...tasks.filter((e) => !e.due_date),
                      ])
                      setDueDateSortFactor(dueDateSortFactor * -1)
                    }}
                  >
                    <ListItemIcon>
                      <Today />
                    </ListItemIcon>
                    <ListItemText primary="Due Date" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setFilteredTasks(
                        tasks.sort((a, b) =>
                          a.title.toUpperCase() < b.title.toUpperCase() ==
                          alphaSortFactor
                            ? -1
                            : a.title.toUpperCase() > b.title.toUpperCase() ==
                              alphaSortFactor
                            ? 1
                            : 0,
                        ),
                      )
                      setAlphaSortFactor(!alphaSortFactor)
                    }}
                  >
                    <ListItemIcon>
                      <SortByAlpha />
                    </ListItemIcon>
                    <ListItemText primary="Alphabetically" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setFilteredTasks(
                        tasks.sort(
                          (a, b) =>
                            (new Date(a.createdAt).getTime() -
                              new Date(b.createdAt).getTime()) *
                            createdAtSortFactor,
                        ),
                      )
                      setCreatedAtSortFactor(createdAtSortFactor * -1)
                    }}
                  >
                    <ListItemIcon>
                      <EventNote />
                    </ListItemIcon>
                    <ListItemText primary="Creation date" />
                  </ListItemButton>
                </ListItem>
              </List>
            </MenuItem>

            {taskListConfig.allowTheme && (
              <MenuItem>
                <ListItemIcon>
                  <Palette fontSize="small" />
                </ListItemIcon>
                Change Theme
                <List className="sortOptionsPopup themePopup position-absolute end-100">
                  {themeColors.map((e) => (
                    <ListItem disablePadding key={e}>
                      <ListItemButton
                        style={{ backgroundColor: e }}
                        onClick={()=>{
                          updateTaskList(taskListConfig.taskListId,{theme:e},'Task List Theme Changed')
                        }}
                      ></ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </MenuItem>
            )}
            {taskListConfig.allowRename && (
              <MenuItem
                onClick={() => {
                  deleteTaskList(taskListConfig.taskListId)
                }}
              >
                <DeleteForever /> Delete Task List
              </MenuItem>
            )}
          </Menu>
        </div>
      </div>

      <div id="tasks" className="p-5">
        {tasks?.length ? (
          <>
            {/* {console.log(tasks, '🧡🧡🧡🧡🧡🧡')} */}
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
                    <div className="exactTask p-3 d-flex justify-content-between position-relative">
                      <div>
                        <h6>{task.title}</h6>
                        <span>{task.note && <Assignment />}</span>
                        {task.due_date && (
                          <span>{formatDate(task.due_date)}</span>
                        )}
                      </div>
                      <IconButton
                        onClick={() => {
                          updateTask(
                            task._id,
                            { important: !task.important },
                            task.important
                              ? 'Task removed from Important'
                              : 'Task Added to Important',
                          )
                        }}
                      >
                        {task.important ? <Star /> : <StarBorder />}
                      </IconButton>
                      <span className="bottom-0 end-0 pb-1 pe-2 position-absolute">
                        {formatDate(task.createdAt)}
                      </span>
                    </div>
                  </div>
                )
              })}
            {tasks.find((e) => e.completed) && (
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
                          onClick={() => {
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
                                <span>{formatDate(task.due_date)}</span>
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
            )}
          </>
        ) : (
          <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <Air sx={{ fontSize: 100 }} />
            <h1>No Tasks</h1>
          </div>
        )}
      </div>

      <Box className="addTaskBox d-flex align-items-center">
        <IconButton
          onClick={() => {
            setNewTask(inputText)
            setInputText('')
          }}
        >
          <ControlPoint sx={{ mr: 1, my: 0.5 }} />
        </IconButton>
        <TextField
          onChange={(e) => {
            setInputText(e.target.value)
          }}
          value={inputText}
          id="addTaskInput"
          label="Add a new task"
          variant="filled"
        />
      </Box>
    </div>
  )
}

export default TaskList
