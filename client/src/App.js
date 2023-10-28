import "./App.css";
import { useState } from "react";
import { Routes, BrowserRouter,Route, Outlet } from "react-router-dom";
import { Navigate   } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/header/header";
import DataProvider from "./context/DataProvider";
import NewHome from "./components/NewHome";
import CreatePost from "./components/create/CreatePost";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  console.log(isAuthenticated);
  return isAuthenticated ? <><Header /><Outlet /></> : <Navigate replace to="/login" />
}

function App() {
  const [isAuthenticated, isUserAuthenticated ] = useState(false);

  return (
    
    <BrowserRouter>  
    <DataProvider>
       
     
        <div style={{margin:"64"} }>
          <Header/>
          <Routes>
            
          
            <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            {/* <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />} /> */}

            <Route path='/' element= {<NewHome/>} />
            {/* <Route path='/login' element= {<Login/>} /> */}
            <Route path='/create' element= {<CreatePost/>} />
           </Routes>
           
           
        </div>
        
     
    </DataProvider>
    </BrowserRouter>
  );
}

export default App;
