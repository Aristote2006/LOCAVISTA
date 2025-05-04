// This file provides compatibility for @mui/lab components
// It creates custom components to replace @mui/lab functionality

import React from 'react';
import {
  Button,
  CircularProgress,
  Box,
  Tabs,
  Tab,
  Typography
} from '@mui/material';

// Custom LoadingButton implementation
export const LoadingButton = ({
  loading = false,
  loadingPosition = 'center',
  children,
  startIcon,
  endIcon,
  ...props
}) => {
  const loadingIndicator = (
    <CircularProgress
      color="inherit"
      size={16}
      sx={{
        position: 'absolute',
        ...(loadingPosition === 'start' && { left: 14 }),
        ...(loadingPosition === 'end' && { right: 14 }),
      }}
    />
  );

  return (
    <Button
      {...props}
      disabled={loading || props.disabled}
      startIcon={loadingPosition === 'start' && loading ? null : startIcon}
      endIcon={loadingPosition === 'end' && loading ? null : endIcon}
      sx={{
        position: 'relative',
        ...props.sx
      }}
    >
      {loading && loadingPosition === 'center' && loadingIndicator}
      {loading && loadingPosition === 'start' && loadingIndicator}
      {loading && loadingPosition === 'end' && loadingIndicator}
      {children}
    </Button>
  );
};

// TabContext implementation
export const TabContext = React.createContext(null);

export const TabContextProvider = ({ value, children }) => {
  return (
    <TabContext.Provider value={value}>
      {children}
    </TabContext.Provider>
  );
};

// TabList implementation
export const TabList = ({ onChange, children, ...props }) => {
  const value = React.useContext(TabContext);

  return (
    <Tabs
      value={value}
      onChange={onChange}
      {...props}
    >
      {children}
    </Tabs>
  );
};

// TabPanel implementation
export const TabPanel = ({ value, index, children, ...props }) => {
  const contextValue = React.useContext(TabContext);

  return (
    <div
      role="tabpanel"
      hidden={contextValue !== value}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...props}
    >
      {contextValue === value && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Timeline components
export const Timeline = ({ children, position = 'alternate', ...props }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        margin: 0,
        ...props.sx
      }}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { position });
        }
        return child;
      })}
    </Box>
  );
};

export const TimelineItem = ({ children, position, ...props }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        minHeight: 70,
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export const TimelineSeparator = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export const TimelineConnector = (props) => {
  return (
    <Box
      sx={{
        width: 2,
        backgroundColor: 'divider',
        flexGrow: 1,
        ...props.sx
      }}
      {...props}
    />
  );
};

export const TimelineDot = ({ variant = 'filled', color = 'primary', ...props }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        width: 24,
        height: 24,
        backgroundColor: variant === 'filled' ? `${color}.main` : 'transparent',
        border: variant === 'outlined' ? `2px solid ${color}.main` : 'none',
        ...props.sx
      }}
      {...props}
    />
  );
};

export const TimelineContent = (props) => {
  return (
    <Box
      sx={{
        padding: 2,
        flexGrow: 1,
        ...props.sx
      }}
      {...props}
    />
  );
};

export const TimelineOppositeContent = (props) => {
  return (
    <Box
      sx={{
        padding: 2,
        flexGrow: 1,
        ...props.sx
      }}
      {...props}
    />
  );
};
