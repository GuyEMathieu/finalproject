import * as React from 'react';
import {Accordion, styled} from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomAccordion = styled(Accordion)(({theme}) => ({
    padding: theme.spacing(0,1),
}))
export default function AccordionShell(props) {
    const {
        title = '',
        expanded = false, 
    } = props;

    return (
        <CustomAccordion 
            expanded={expanded === title} 
            onChange={props.handleChange(title)}>
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon />} >
                <Typography >
                    {title}
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                {props.children}
            </AccordionDetails>
        </CustomAccordion>
    );
}
