import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline,Container } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';
import AboutPage from '../../Features/About/AboutPage';
import Catalog from '../../Features/Catalog/catalog';
import ProductDetails from '../../Features/Catalog/ProductDetails';
import ContactPage from '../../Features/Contact/ContactPage';
import HomePage from '../../Features/Home/HomePage';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';
import ServerError from '../Errors/ServerError';
import NotFound from '../Errors/NotFound';
import BasketPage from '../../Features/Basket/BasketPage';
import LoadingComponents from './LoadingComponents';
import CheckoutPage from '../../Features/Checkout/CheckoutPage';
import { useAppDispatch } from '../Store/ConfigureStore';
import { fetchBasketAsync } from '../../Features/Basket/BasketSlice';
import Login from '../../Features/Account/Login';
import Register from '../../Features/Account/Register';
import { fetchCurrentUser } from '../../Features/Account/AccountSlice';
import PrivateRoute from './PrivateRoute';

function App() {
  const dispatch = useAppDispatch();
  const [loading , setLoading] =  useState(true);
  const initApp =  useCallback(async () =>  {
    try{
      await dispatch(fetchCurrentUser())
      await dispatch(fetchBasketAsync())
    } catch (error){
      console.log(error)
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(()=> setLoading(false))
  }, [initApp])
  
  const [darkMode, setDarkMode]= useState(false);
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette : {
      mode: paletteType,
      background :{
        default : paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

 function handleThemeChange() {
   setDarkMode(!darkMode);
 }

 if (loading) return <LoadingComponents message='Initialising app... '/>

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar/>
      <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange= {handleThemeChange} />
      <Route exact path='/' component={HomePage}/>
      <Route path={'/(.+)'} render={() => (
        <Container>
          <Switch>
            <Route exact path='/catalog' component={Catalog}/>
            <Route path='/catalog/:id' component={ProductDetails}/>
            <Route path='/about' component={AboutPage}/>
            <Route path='/contact' component={ContactPage}/>
            <Route path='/server-error' component={ServerError}/>
            <Route path='/basket' component={BasketPage}/>
            <PrivateRoute path='/checkout' component={CheckoutPage} />
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route component={NotFound}/>
          </Switch>
        </Container>
      )} />
    </ThemeProvider>
  );
}

export default App;
