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
        handleChange = () => {}
    } = props;

    return (
        <CustomAccordion 
            sx={{padding: 0}}
            expanded={expanded === title} 
            onChange={handleChange(title)}>
            <AccordionSummary 
                sx={{backgroundColor: '#f00', px: 1}}
                expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{color: 'white'}}>
                    {title}
                </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{mt:2}}>
                {props.children}
            </AccordionDetails>
        </CustomAccordion>
    );
}
