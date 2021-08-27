import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import '../styles/mainpage.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      width: 200,
      height: 80
    },
  },
}));

export default function MainPage ({ history }) {

  const classes = useStyles();

  const [email, setEmail] = useState('');
  const valueRef = useRef('');
  const myStorage = window.sessionStorage;

  const handleLogin = () => {
    axios.post("/login", {
      email: email
    }).then(res => {
      myStorage.setItem('name', res.data.rows[0].name);
      myStorage.setItem('points', res.data.rows[0].points);
    });
    history.push("/findwashroom");
  }
  const handleEmail = () => {
    setEmail(valueRef.current.value);
    handleLogin();
  }
console.log(email)
  return (
    <div className="loginpage">
      <h1>Welcome to Peepoopdog</h1>
      <div className="login">
        <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => {e.preventDefault();}}>
        <TextField id="outlined-basic" label="Email" variant="outlined" inputRef={valueRef} />
        <TextField id="outlined-password-input" label="Password" type="password" variant="outlined" />
        <button className="login-button" onClick={() => {handleEmail();}}>Login</button>
        </form>
      </div>
    </div>
  );
}