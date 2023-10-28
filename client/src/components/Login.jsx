import React from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API, API_URL } from "../service/api";
import { DataContext } from "../context/DataProvider";

const Component = styled(Box)`
  width: 600px;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  box-shadow: 5px 2px 5px 12px rgb(0 0 0/0.6);
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;
const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0 ",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  height: 48px;

  padding: 5px;
  border-radius: 2px;
  box-shadow: 0 4px 6px 0 rgb(10 0 0/80%);
`;
const SignupButton = styled(Button)`
  background-color: #fff;
  height: 48px;
  padding: 5px;
  border-radius: 2px;
  box-shadow: 0 4px 6px 0 rgb(10 0 0/80%);
`;
const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
  text-align: center;
`;
const Text_header = styled(Typography)`
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
`;

const loginInitialValues = {
  email: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  email: "",
  password: "",
};

const Login = ({ isUserAuthenticated }) => {
  const imageUrl =
    "https://imgs.search.brave.com/PA7Ynqhc42P0idNpzVja-1vq82Lq5dn5aXiZDWJOzW4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/Y29sbGVnZXByYXZl/c2guY29tLzIwMTUv/MTEvSUlJVC1VbmEt/TG9nby5wbmc";

  // usestates

  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState("");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [logEmail, setLogEmail] = useState();
  const [logPassword, setLogPassword] = useState();
  const [login, setLogin] = useState(loginInitialValues);
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleSignup = () => {
    toggleAccount("signup");
  };
  const toggleLogin = () => {
    toggleAccount("login");
  };

  // const [cpassword,setCpassword]=useState()

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  //  const signupUser = async () => {
  //   let res = await axios.post(`${API_URL}/signup`, signup);

  // };
  const signupUser = async () => {
    const detail = {
      name,
      email,
      password,
    };

    try {
      let res = await axios.post(`${API_URL}/signup`, detail).then((res) => {
        if (res.data == true) {
          console.log("signed in ");
        } else {
          console.log("error in login");
          showError("Something went wrong! please try again later");
        }
      });
      // alert(res.status);
      showError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } catch (error) {
      showError("Something went wrong! please try again later");
    }
    // let response = await API.userSignup(signup);

    // console.log(res);
    // if (res) {
    //     console.log("hello")

    // } else {

    // }
  };
  const loginUser = async () => {
    const detailCheck = {
      logEmail,
      logPassword,
    };

    try {
      // let res = await axios.post(`${API_URL}/login`, detailCheck).then((res) => {
      //   console.log(detailCheck);
      //   if (res.data == true) {
      //     console.log("logged in ");
      //   } else {
      //     console.log("error in login");
      //     showError("Something went wrong! please try again later");
      //   }
      // });
      let res = await axios.post(`${API_URL}/login`, detailCheck);
      console.log(res.isSuccess);
      
        showError("");
        sessionStorage.setItem("accessToken", `Bearer ${res.data.accessToken}`);
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${res.data.refreshToken}`
        );

        setAccount({ email: res.data.email, name: res.data.name });
        isUserAuthenticated(true);
        setLogin(loginInitialValues);
      
      navigate("/");
      // toggleAccount("login");
    } catch (error) {
      showError("Something went wrong! please try again later");
    }
  };

  // const onValueChange =(e) => {
  //   setLogin({...login, [e.target.email]: e.target.value });
  // };

  // const loginUser=async()=>{
  //   try {
  //     let res = await axios.post(`${API_URL}/login`, login);
  //     showError("");
  //   } catch (error) {
  //     showError("error coming while login ")
  //   }

  // }

  return (
    <Component>
      <Box>
        <Image src={imageUrl} alt="login" />
        <Text_header>PROJECT-HUB</Text_header>
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => setLogEmail(e.target.value)}
              name="logEmail"
              label="Enter E-mail"
            />
            <TextField
              variant="standard"
              onChange={(e) => setLogPassword(e.target.value)}
              name="logPassword"
              label="Enter password"
            />
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Text>OR</Text>
            <SignupButton onClick={() => toggleSignup()}>
              create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => setName(e.target.value)}
              name="name"
              label="Enter your Name"
            />
            <TextField
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              label="Enter E-mail"
            />

            <TextField
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              label="Enter password"
            />
            {/* <TextField variant='standard'onChange={(e)=>onInputChange(e)} name="confirmpassword" label ="Confirm password"/>   */}

            {/* <TextField variant='standard' onChange={(e)=>onInputChange(e)} name="Roll number" label ="Enter your Roll Number"/>   */}
            {error && <Error>{error}</Error>}

            <SignupButton onClick={() => signupUser()}>Sign Up</SignupButton>
            <Text>OR</Text>
            <LoginButton onClick={() => toggleLogin()} variant="contained">
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
