import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, IconButton } from '@mui/material';
import { useState, type ReactNode } from 'react';

interface ShowHideProps {
  children: ReactNode;
  label: string
}

const ShowHide = ({ children, label }: ShowHideProps) => {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <Box>
        <IconButton
          onClick={() => setExpand(!expand)}
          aria-expanded={expand}
          aria-label={`show ${label}`}
        >
          {expand ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        <span style={{ marginLeft: 4 }}>
          {expand ? `Hide ` : `Show `}
          {label}
        </span>
      </Box>
      <Collapse sx={{ width: '100%' }} in={expand} timeout={'auto'}>
        {children}
      </Collapse>
    </>
  );
};

export default ShowHide;
