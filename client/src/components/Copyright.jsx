import React from 'react'

import {Typography, styled} from '@mui/material';
import {Link} from 'react-router-dom'

const CustomLink = styled(Link)(({theme}) => ({
    textDecoration: 'none',
    color: theme.palette.text.primary
}))
const Typo = styled(Typography)(({theme}) => ({
    color: theme.palette.text.primary,
    margin: theme.spacing(2),
    width: '100%',
}))

export default function Copyright() {
    return (
        <Typo variant="body2" align='center'>
            {'Copyright © '}
            <CustomLink color="inherit" to="/">
                Guy Mathieu
            </CustomLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typo>
    );
}