import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import {Link} from "react-router-dom"
import { currencyFormat } from "../../App/Util/Util";
import BasketSummary from "./BasketSummary";
import { useAppSelector, useAppDispatch } from "../../App/Store/ConfigureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./BasketSlice";

export default function BasketPage() {
  const {basket , status} =  useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

    // check if basket is empty and handle if it is
    if (!basket) return <Typography variant='h3'>Your basket is empty, you know you want to add something.</Typography>
  return (
    <>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map(item => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display='flex' alignItems='center'>
                  <img src={item.pictureUrl} alt={item.name} style={{height:50, marginRight:20}}/>
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price)}</TableCell>
              <TableCell align="center">
                <LoadingButton  
                loading={status === 'pendingRemoveItem' + item.productId + 'rem'}
                onClick = {() => dispatch(removeBasketItemAsync({productId:item.productId , quantity: 1 , name: 'rem' }))} 
                color ='error'>
                  <Remove />
                </LoadingButton>
                {item.quantity}
                <LoadingButton 
                 loading={status === 'pendingAddItem' + item.productId }
                 onClick = {() => dispatch(addBasketItemAsync({productId:item.productId }))} 
                color ='secondary'>
                  <Add />
                </LoadingButton>
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
              <TableCell align="right">
                <LoadingButton  
                loading={status === 'pendingRemoveItem' + item.productId + 'del' }
                onClick = {() => dispatch(removeBasketItemAsync({productId:item.productId, quantity: item.quantity, name: 'del' }))}  
                color="error">
                  <Delete/>
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Grid container justifyContent="flex-end">
      <Grid item xs={6}/>
      <Grid item xs={6}/>
      <Grid>
            <BasketSummary/>
             <Button 
              component={Link}
              to='/checkout'
              variant='contained'
              size='large'
              fullWidth
            >
              Checkout
            </Button> 


      </Grid>
    </Grid>

  </>
  )
}
