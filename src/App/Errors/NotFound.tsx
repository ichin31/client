import { Paper,Container, Typography, Divider,  Button  } from "@mui/material";
import {Link} from "react-router-dom"



export default function NotFound() {
  return (
    <Container component={Paper} sx={{hieght:400}} >
        <Typography gutterBottom variant="h3">Oops-we could not find what you are looking for</Typography>
        <Divider/>
        <Button fullWidth component={Link} to='/catalog' >Go back to shop</Button>
    </Container>
  )
}
