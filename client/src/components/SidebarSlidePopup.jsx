import {
    Drawer, Box, Divider
} from '@mui/material';

const drawerWidth = 340;

export default function Header(props) {
    return (
        <Drawer
            sx={{
                py: 'auto',
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="persistent"
            anchor="right"
            open={props.open}
        >
          <Box sx={{py:'25vh'}}>
            <Divider  sx={{mb: 3}}/>
              {props.children}
            <Divider  sx={{mt: 3}}/>
          </Box>
            
        </Drawer>
    );
}
