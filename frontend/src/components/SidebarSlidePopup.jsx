import {
    Drawer, Box, Divider
} from '@mui/material';

const drawerWidth = 340;

export default function SidebarSlidePopup(props) {
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
                {props.children}
            </Box>
            
        </Drawer>
    );
}
