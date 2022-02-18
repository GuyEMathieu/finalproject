import { createTheme } from '@mui/material/styles'


// // Create theme instance
export const lightTheme = createTheme({

    palette: {
        mode: 'dark',
        background: {
            default: "#bbdefb",
            paper: "#0d47a1"
        },
        primary: {
            main: "#ff1744"
        },
        text: {
            primary: '#FFFFFF'
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
        MuiAccordion: {
            styleOverrides: {
                root: {
                    color: 'primary',
                    padding: '0px',
                    marginTop: '0px'
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
                elevation: 1,
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
                //margin: '3px'
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
                //borderRadius: 20,
                textTransform: 'none' // Prevent All Caps
            }
        }
    },


    props: {
        MuiPaper: {
            elevation: 1,
            square: true,
        }
    }
})
