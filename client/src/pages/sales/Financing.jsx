import {
    Grid, TextField, MenuItem,
    FormLabel, RadioGroup, 
    FormControlLabel, Radio, FormControl
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { RoundToTwo, FormatNumber } from '../../utils/Formatter';

const useStyles = makeStyles(theme => ({
    start:{
        border: '1px solid red',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingRight: theme.spacing(1),
    },
    middle: {
        border: '1px solid red',
    },
    end:{
        border: '1px solid red',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingRight: theme.spacing(1),
    }
}))

const Financing = (props) => {
    const {
        bank = {},
        term
    } = props.purchase.sale.financing

    const handleBankChange = event => {
        const e = {
            target: {
                name: 'bank',
                value: props.defaults.banks.find(bank => bank._id === event.target.value)
            }
        }
        props.handleChange(e)
    }


    return (
        <Grid container spacing={2} sx={{px: 10}}>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        onChange={handleBankChange} value={bank._id}
                        label='Financial Institution' name='bank' select>
                            <MenuItem disabled>Select Bank</MenuItem>
                            {props.defaults && props.defaults.banks.map(b => (
                                <MenuItem key={b._id} value={b._id}>{b.name}</MenuItem>
                            ))}
                    </TextField>
                </Grid>

                {bank._id &&
                    <Grid item xs={12}>
                        <TextField  label={'Bank'}/>
                    </Grid>
                }
            </Grid>
            {bank._id &&
                <Grid item xs={12}>
                    <FormControl component="fieldset" fullWidth sx={{border: '1px solid silver', borderRadius: 1}}>
                        <FormLabel align='left' component="legend">Terms</FormLabel>
                        <RadioGroup
                            sx={{ml: 2}} name="term" value={term} row
                            onChange={props.handleChange}
                        >
                            {bank.terms.map((term, i) => (
                                <FormControlLabel 
                                    color={'silver'}
                                    value={term._id} control={<Radio />} 
                                    label={`${term.termLength} Months Apr: ${(RoundToTwo(term.apr * 100))}%`} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            }
            <Grid item xs={12} container spacing={2}>
                <Grid item xs={12} md={4}>
                    <TextField
                        label='Financed Balance' disabled value={FormatNumber(props.purchase.sale.balance)} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label='Total Interest' disabled value={FormatNumber(props.purchase.sale.financing.totalInterest)} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label='Loan Value + Interest' disabled value={FormatNumber(props.purchase.sale.financing.loanValue)} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label='Monthly Payment' disabled value={FormatNumber(props.purchase.sale.financing.monthlyPayment)} />
                </Grid>
            </Grid>
        </Grid>
    )
}


export default Financing
