

import ProductList from './ProductList';
import { useEffect } from 'react';
import LoadingComponents from '../../App/Layout/LoadingComponents';
import { useAppSelector, useAppDispatch } from '../../App/Store/ConfigureStore';
import { fetchProductsAsync, productSelectors } from './CatalogSlice';




export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const {productsLoaded, status} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(()=> {
    if(!productsLoaded) dispatch(fetchProductsAsync())
  }, [productsLoaded, dispatch])

    if (status.includes('pending')) return <LoadingComponents message='Loading Products ...'/>
 
    return (
      <> 
        <ProductList products = {products}/>
      </>
    )
  }




