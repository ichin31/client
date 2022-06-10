import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useAppSelector } from "../../App/Store/ConfigureStore";
import { currencyFormat } from "../../App/Util/Util";

export default function BasketSummary() {

    const {basket} =  useAppSelector(state => state.basket);
    const subtotal = basket?.items.reduce((sum?, item?) => sum + (item.quantity * item.price), 0) ?? 0 ;
    // reduce baskets array in sigle array

    //  fix later if Nothing is in basket should you show it ?
    const deliveryFee = subtotal >= 10000 ? 0 : 1000 ;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table sx={{ minWidth: 510 }}>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={4} >Subtotal</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} >Delivery fee*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee) }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} >Total</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>                            
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}