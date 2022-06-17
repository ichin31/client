import { Button, Fade, Menu, MenuItem } from "@mui/material";
import React from "react";
import { signOut } from "../../Features/Account/AccountSlice";
import { clearBasket } from "../../Features/Basket/BasketSlice";
import { useAppDispatch, useAppSelector } from "../Store/ConfigureStore";


export default function SignedInMenu() {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.account);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
    setAnchorEl(null);
    };
  return (
    <>
        <Button 
        color="inherit"
        onClick={handleClick}
        sx={{typography:'h6'}}
        >
            {user?.email}
        </Button>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={() => {
                    dispatch(signOut());
                    dispatch(clearBasket());
                }}>Logout</MenuItem>
        </Menu>
    </>
  )
}
