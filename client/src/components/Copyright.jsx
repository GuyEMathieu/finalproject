import React from 'react'

import {Typography, styled} from '@mui/material';
import {Link} from 'react-router-dom'

const CustomLink = styled(Link)(({theme}) => ({
    textDecoration: 'none',
    color: theme.palette.text.primary
}))
const Typo = styled(Typography)(({theme}) => ({
    color:"textSecondary",
    align:"center",
    margin: theme.spacing(2)
}))

function Copyright() {
    return (
        <Typo variant="body2" >
            {'Copyright © '}
            <CustomLink color="inherit" to="/">
                Guy Mathieu
            </CustomLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typo>
    );
}

export default Copyright