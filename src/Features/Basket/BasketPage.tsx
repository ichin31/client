import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Agent } from "https";
import { useState } from "react";
import agent from "../../App/Api/Agent";
import { useStoreContext } from "../../App/Context/StoreContext";

export default function BasketPage() {
const {basket, setBasket, removeItem} =  useStoreContext();
const [loading , setLoading] =  useState(false);

function handleAddItem(productId: number){
  setLoading(true);
  agent.Basket.addItem(productId)
  .then(basket => setBasket(basket))
  .catch(error => console.log(error))
  .finally(()=> setLoading(false))
}

function handleRemoveItem(productId: number, quantity = 1){
  setLoading(true);
  agent.Basket.removeItem(productId,quantity)
  .then(() => removeItem(productId,quantity))
  .catch(error => console.log(error))
  .finally(()=> setLoading(false))
}

    // check if basket is empty and handle if it is
    if (!basket) return <Typography variant='h3'>Your basket is empty, you know you want to add something.</Typography>
  return (
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
            <TableCell align="right">${(item.price/ 100 ).toFixed(2)}</TableCell>
            <TableCell align="center">
              <LoadingButton  loading={loading} onClick = {() => handleRemoveItem(item.productId)} color ='error'>
                <Remove />
              </LoadingButton>
              {item.quantity}
              <LoadingButton loading={loading} onClick = {() => handleAddItem(item.productId)} color ='secondary'>
                <Add />
              </LoadingButton>
            </TableCell>
            <TableCell align="right">${((item.price/ 100 )* item.quantity).toFixed(2)}</TableCell>
            <TableCell align="right">
              <LoadingButton  loading={loading} onClick = {() => handleRemoveItem(item.productId, item.quantity)} color="error">
                <Delete/>
              </LoadingButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}