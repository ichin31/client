import { Backdrop, Box, CircularProgress, Typography } from '@mui/material'


// interface Props {
//     message?:string;
// }


export default function LoadingComponents({message = 'Loading...'}) {
  return (
    <Backdrop open={true} invisible={true}>
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
            <CircularProgress/>
            <Typography variant='h4' sx={{justifyContent: 'center', position:'fixed', top:'60%'}} >{message}</Typography>

        </Box>
    
    </Backdrop>
  )
}
