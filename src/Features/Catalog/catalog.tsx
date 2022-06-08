

import { Product } from '../../App/Models/product';
import ProductList from './ProductList';
import { useEffect, useState } from 'react';
import agent from '../../App/Api/Agent';
import LoadingComponents from '../../App/Layout/LoadingComponents';



export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading,setLoading] =  useState(true);
  
  useEffect(()=> {
    agent.Catalog.list()
      .then(products => setProducts(products))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [])

    if (loading) return <LoadingComponents message='Loading Products ...'/>
 
    return (
      <> 
        <ProductList products = {products}/>
      </>
    )
  }




