import React, { useState, useEffect, useCallback } from 'react'
// import { Link } from 'react-router-dom'

import './RightPanel.scss'
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
function RightPanel(parentCallback:any) {
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const [count, setCount] = useState(0);
  return (
    <div
      id="rightPanel"
      className={`${rightPanelCollapsed ? 'collapsed' : ''} position-relative`}
    >
      <IconButton
        className="menuToggleIcon position-absolute"
        onClick={() => {
          setRightPanelCollapsed(!rightPanelCollapsed)
        }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <button onClick={() => {
        setCount((count) => count + 1);
        parentCallback(count + 1);
      }}>CLICK</button>
    </div>
  )
}

export default RightPanel