import { createTheme } from '@mui/material/styles'


// // Create theme instance
export const darkTheme = createTheme({

    palette: {
        mode: 'dark',
        background: {
            default: "#0a1929",
            paper: "#001e3c"
        },
        primary: {
            main: "#F3DCE1"
        },
        text: {
            primary: '#ffffff'
        }
    },

    components: {
        MuiButton: {
            defaultProps: {
                size: "medium",
                variant: "contained",
                color: 'primary',
                disableRipple: true,
                fullWidth: true,
            },
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    padding: '0px',
                    marginTop: '0px'
                }
            }
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    //marginTop: '16px',
                    //backgroundColor: '#eeeeee',
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
                fullWidth: true,
                InputLabelProps: {
                    shrink: true,
                    color: 'primary'
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    padding: '0px'
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 4,
                square: true,
            }, 
            styleOverrides: {
                root: {
                    padding: '16px'
                }
            }
        },
        MuiStepper: {
            styleOverrides: {
                root: {
                    padding: '8px'
                }
            }
        },
    },

    overrides: {
        MuiAccordionSummary: {
            root: {
                padding: '0px',
                marginTop: '0px',
            }
        },
        MuiAccordionDetails: {
            root: {
                
                //marginTop: '16px',
                //backgroundColor: '#eeeeee',
            }
        },


        MuiStepper: {
            root: {
                padding: '8px'
            }
        },

        MuiButton: {
            root: {
                textTransform: 'none' // Prevent All Caps
            }
        }
    },


    props: {
        MuiPaper: {
            elevation: 2,
            square: true,
        }
    }
})
