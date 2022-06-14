import ProductList from './ProductList';
import { useEffect } from 'react';
import LoadingComponents from '../../App/Layout/LoadingComponents';
import { useAppSelector, useAppDispatch } from '../../App/Store/ConfigureStore';
import { fetchFilters, fetchProductsAsync, productSelectors, setProductParams } from './CatalogSlice';
import { Box, Grid, Pagination, Paper, Typography } from '@mui/material';
import ProductSearch from './ProductSearch';
import RadioButtonGroup from '../../App/Components/RadioButtonGroup';
import CheckBoxButtons from '../../App/Components/CheckBoxButtons';
import AppPagination from '../../App/Components/AppPagination';

const sortOptions = [
  {value: 'name', label: 'Alphabetical'},
  {value: 'priceDesc', label: 'Price - High to low'},
  {value: 'price', label: 'Price - Low to high'},
]

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const {productsLoaded, status, filtersLoaded, brands, types, productParams, metaData} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();
// split productsLoaded and filtersLoaded into 2 useEffect Hooks to avoid double hit to APIServer
  useEffect(()=> {
    if(!productsLoaded) dispatch(fetchProductsAsync())
  }, [productsLoaded, dispatch])

  useEffect(()=> {
    if(!filtersLoaded) dispatch(fetchFilters())
  }, [dispatch, filtersLoaded])

    if (status.includes('pending') || !metaData) return <LoadingComponents message='Loading Products ...'/>
 
    return (
      <Grid container columnSpacing={4}> 
        <Grid item xs={3}>
          <Paper sx={{mb: 2}}>
            <ProductSearch/>
          </Paper>  
          <Paper sx={{mb: 2, p:2}}>
            <RadioButtonGroup 
              selectedValue={productParams.orderBy}
              options={sortOptions}
              onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
            />
          </Paper>
          <Paper sx={{mb: 2, p:2}}>
           <CheckBoxButtons 
            items={brands}
            checked={productParams.brands}
            onChange={(items:string[]) => dispatch(setProductParams({brands:items} ))}
           />
          </Paper>
          <Paper sx={{mb: 2, p:2}}>
          <CheckBoxButtons 
            items={types}
            checked={productParams.types}
            onChange={(items:string[]) => dispatch(setProductParams({types:items} ))}
           />
          </Paper>
        </Grid>
        <Grid item xs={9}> 
         <ProductList products = {products}/>
        </Grid>
        <Grid item xs={3}/> 
        <Grid item xs={9} sx={{mb:2}}>
          <AppPagination 
            metaData={metaData}
            onPageChange={(page:number) => dispatch(setProductParams({pageNumber: page})) } 
          />
        </Grid>

      </Grid>
    )
  }




