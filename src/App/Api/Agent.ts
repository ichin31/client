import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

// const sleep = () => new Promise(resolve => setTimeout(resolve, 50));

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true; //needed for cors make sure its added to startup file


const resBody = (res: AxiosResponse) => res.data; 

axios.interceptors.response.use(async res => {
  // await sleep();
  return res
}, (error:AxiosError) =>{
  // needed to but the error.response as any for typescript 
  const {data, status} = error.response as any;
  switch (status) {
    case 400:
      if (data.errors) {
        const modelStateErrors: string[] = [];
        for (const key in data.errors) {
          if (data.errors[key]) {
            modelStateErrors.push(data.errors[key])
          }
        }
        throw modelStateErrors.flat();
      }
      toast.error(data.title);
      break;
    case 401:
      toast.error(data.title);
      break;
      case 500:
      history.push({
        pathname: '/server-error',
        state: {error:data}
      })
      break;
    default:
      break;
  }
  return Promise.reject(error.response);
} 

)

const req = {
  get: (url:string) => axios.get(url).then(resBody),
  post: (url:string, body:{}) => axios.post(url,body).then(resBody),
  put: (url:string, body:{}) => axios.put(url,body).then(resBody),
  delete: (url:string) => axios.delete(url).then(resBody)
}

const Catalog = {
  list: () => req.get('product'),
  details:(id:number) => req.get(`product/${id}`),
}

const TestErrors = {
  Get404Error: () => req.get('buggy/not-found'),
  Get400Error: () => req.get('buggy/bad-request'),
  Get401Error: () => req.get('buggy/unathorised'),
  GetValidationError: () => req.get('buggy/validation-error'),
  Get500Error: () => req.get('buggy/server-error'),
}


const Basket = {
  get: () => req.get('basket'),
  // addItem: (productId:number, quantity =1) => req.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  addItem: (productId: number, quantity = 1) => req.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId:number, quantity =1) => req.delete(`basket?productId=${productId}&quantity=${quantity}`)

}



const agent = {
  Catalog,
  TestErrors,
  Basket
}

export default agent