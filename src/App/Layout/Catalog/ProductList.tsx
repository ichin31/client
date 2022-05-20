import {List, ListItem, Avatar, ListItemAvatar, ListItemText, Button, Grid}  from '@mui/material';
import { Product } from '../../Models/product';
import ProductCard from './ProductCard';
interface Props {
    products: Product[];
}

export default function ProductList({products}: Props){
    return(
    <Grid container spacing={4}>
      {products.map( product => (
        <Grid item xs={3} key={product.id}>
          <ProductCard product={product}/>
        </Grid>
        
            ))}
    </Grid>
)

}