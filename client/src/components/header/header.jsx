import React from 'react'
import { AppBar,Toolbar,Typography ,styled } from '@mui/material';
import { Link } from 'react-router-dom';

const Component =styled(AppBar)`
background:#fffff,
color:#000;

`
const Container=styled(Toolbar)`
justify-content:center; 
& > a{
   padding:  20px;
   color:#000;
   text-decoration:none   
}
`


   
const header=()=> {
  return (
    <Component>
        <Container >
             <Link to ='/'>HOME</Link>
             <Link to ='/about'>ABOUT</Link>
             <Link to ='/contact'>CONTACT</Link>
             <Link to ='/login'> LOGOUT</Link>
        </Container> 
    </Component>
  )
}; 
export  default  header;