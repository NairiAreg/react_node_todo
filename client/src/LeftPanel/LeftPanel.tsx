import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'

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
  Login,
  AccountBox,
  PersonAdd,
  Settings,
  VisibilityOff,
  Visibility,
  Logout,
} from '@mui/icons-material'
import {
  IconButton,
  TextField,
  Box,
  Modal,
  FormControl,
  Tooltip,
  InputLabel,
  Button,
  InputAdornment,
  Divider,
  Input,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material'
// import { TabPanel, TabList } from '@mui/lab'
function LeftPanel({
  user,
  setUser,
  register,
  username,
  tasks,
  setUsername,
  loginEmail,
  filteredTasks,
  setTaskListConfig,
  setFilteredTasks,
  setLoginEmail,
  setLoginPassword,
  login,
}: any) {
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  interface State {
    amount: string
    password: string
    weight: string
    weightRange: string
    showPassword: boolean
  }

  const [values, setValues] = React.useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })
  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValues({ ...values, [prop]: event.target.value })
    setLoginPassword(event.target.value)
    // console.log(event.target.value)
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }
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
  useEffect(() => {
    console.log(user, user?._id, user?.name, '💋💋💋')
  }, [user])

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
        {user ? (
          <div className="profile d-flex">
            <Tooltip arrow title="Profile">
              <IconButton onClick={handleClick}>
                {Math.random() < 0 ? (
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
                    {console.log(123123, user, user.name)}
                    {user.name
                      .split(' ')
                      .map((e) => e[0])
                      .join('')}
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
              <MenuItem
                onClick={() => {
                  setUser(null)
                  localStorage.setItem('jwt', '')
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            <div className="d-flex flex-column ms-3">
              <h5>{user.name}</h5>
              <span>{user.email}</span>
            </div>
          </div>
        ) : (
          <>
            <Button
              className="authButton"
              onClick={() => setOpenAuthModal(true)}
            >
              Sign in/up
            </Button>
            <Modal
              open={openAuthModal}
              onClose={() => setOpenAuthModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box id="authModal">
                <div className="authContainer">
                  <input type="radio" id="tab1" name="tab" defaultChecked />
                  <label htmlFor="tab1">
                    <Login />
                    Sign in
                  </label>
                  <input type="radio" id="tab2" name="tab" />
                  <label htmlFor="tab2">
                    <AccountBox />
                    Sign up
                  </label>
                  <div className="line"></div>
                  <div className="content-container">
                    <div className="content" id="c1">
                      {/* <h3>Sign in</h3> */}
                      {/* <p>There really are a lot of features.</p> */}
                      <TextField
                        onChange={(e) => setLoginEmail((e.target as any).value)}
                        id="email"
                        label="Email"
                        variant="standard"
                      />
                      <FormControl
                        sx={{ m: 1, width: '25ch' }}
                        variant="standard"
                      >
                        <InputLabel htmlFor="standard-adornment-password2">
                          Password
                        </InputLabel>
                        <Input
                          id="standard-adornment-password2"
                          type={values.showPassword ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange('password')}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {values.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <Button className="authButton" onClick={() => login()}>
                        Sign in
                      </Button>
                    </div>
                    <div className="content" id="c2">
                      {/* <h3>Sign up</h3> */}
                      <TextField
                        id="username"
                        label="Name"
                        variant="standard"
                        onChange={(e) => setUsername((e.target as any).value)}
                      />
                      <TextField
                        id="emailReg"
                        label="Email"
                        variant="standard"
                        onChange={(e) => setLoginEmail((e.target as any).value)}
                      />
                      <FormControl
                        sx={{ m: 1, width: '25ch' }}
                        variant="standard"
                      >
                        <InputLabel htmlFor="standard-adornment-password">
                          Password
                        </InputLabel>
                        <Input
                          id="standard-adornment-password"
                          type={values.showPassword ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange('password')}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {values.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <Button className="authButton" onClick={() => register()}>
                        Sign up
                      </Button>
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
          </>
        )}
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
            onClick={() => {
              setTaskListConfig({
                title: 'Today',
                allowRename: false,
              })
              setFilteredTasks(
                tasks.filter(
                  (e) =>
                    new Date(e.due_date).toDateString() ==
                    new Date().toDateString(),
                ),
              )
            }}
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
            onClick={() => {
              setTaskListConfig({
                title: 'Important',
                allowRename: false,
              })
              setFilteredTasks(tasks.filter((e) => e.important))
            }}
          >
            {!leftPanelCollapsed ? 'Important' : ''}
          </Button>
        </Tooltip>
        <Tooltip arrow title={`${leftPanelCollapsed ? 'Planned' : ''}`}>
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<DateRange />}
            onClick={() => {
              setTaskListConfig({
                title: 'Planned',
                allowRename: false,
              })
              setFilteredTasks(tasks.filter((e) => e.due_date))
            }}
          >
            {!leftPanelCollapsed ? 'Planned' : ''}
          </Button>
        </Tooltip>
        <Tooltip arrow title={`${leftPanelCollapsed ? 'Tasks' : ''}`}>
          <Button
            className={`${!leftPanelCollapsed ? 'mx-3' : 'mx-1'}`}
            variant="outlined"
            startIcon={<TaskAlt />}
            onClick={() => {
              setTaskListConfig({
                title: 'All Tasks',
                allowRename: false,
              })
              setFilteredTasks(tasks.filter((e) => e))
            }}
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
