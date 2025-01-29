import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, useColorScheme } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

const Mode = (props) => {
  const { mode, systemMode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMode = (targetMode) => () => {
    setMode(targetMode);
    handleClose();
  };
  const resolvedMode = systemMode || mode;

  return (
    <Box
      sx={{
        verticalAlign: "bottom",
        display: "inline-flex",
        width: "2.25rem",
        height: "2.25rem",
      }}
    >
      <IconButton
        color="info"
        sx={(theme) => ({
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: "1px solid",
          borderColor: (theme.vars || theme).palette.info,
        })}
        data-screenshot="toggle-mode"
        onClick={handleClick}
        disableRipple
        size="small"
        aria-controls={open ? "color-scheme-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        {...props}
      >
        {mode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            variant: "outlined",
            sx: {
              my: "4px",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem selected={mode === "system"} onClick={handleMode("system")}>
          System
        </MenuItem>
        <MenuItem selected={mode === "light"} onClick={handleMode("light")}>
          Light
        </MenuItem>
        <MenuItem selected={mode === "dark"} onClick={handleMode("dark")}>
          Dark
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default Mode;
