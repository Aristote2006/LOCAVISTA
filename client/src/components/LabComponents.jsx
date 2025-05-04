// This file provides compatibility for @mui/lab components
// It re-exports components from @mui/material that were previously in @mui/lab

import { 
  Timeline, 
  TimelineConnector, 
  TimelineContent, 
  TimelineDot, 
  TimelineItem, 
  TimelineOppositeContent, 
  TimelineSeparator 
} from '@mui/material';

import { LoadingButton } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/material';

// Re-export all components
export {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  LoadingButton,
  TabContext,
  TabList,
  TabPanel
};
