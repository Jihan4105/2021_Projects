import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default function Login(id, password) {

  const [loginId,setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handlerLogin = () => {
    
    axios.get('http://localhost:3001/todolist/login', {
      params: {

      }
    })
    .then((response) => {

    });
  }

  return(
    <div>
      <div style={{ margin: "10px 30px 0px 0px", display: "flex", justifyContent: "flex-end"}}>
        <a style={{textDecoration: "none"}} href="http://localhost:3000/change_password">Change Password</a>
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <h3 style={{marginTop: "0px"}}>To-Do-List Management System</h3>
      </div>
      <div style={{ display: "flex", justifyContent: "center"}}>
        <h1 style={{ marginTop: "0px"}}>Login</h1>
      </div>
      <div style={{marginTop: "40px", display: "flex", justifyContent: "center"}}>
        <FormControl varaint="standard">
          <InputLabel htmlFor="input-with-icon-adornment">
            Login Id.
          </InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
            value={loginId}
            onChange={(e) => {setLoginId(e.target.value)}}
          />
        </FormControl>
      </div>
      <div style={{marginTop: "40px", display: "flex", justifyContent: "center"}}>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">
            Password
          </InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            }
            type="password"
            value={loginPassword}
            onChange={(e) => {setLoginPassword(e.target.value)}}
          />
        </FormControl>
      </div>
      <div style={{ marginTop: "40px", display: "flex", justifyContent: "center"}}>
        <Button variant="contained" onClick={handlerLogin}>Login</Button>
      </div>
      <div style={ {marginTop: "40px", display: "flex", justifyContent: "center"}}>
        <p>@The copyright is on Jihan Lee. 2021</p>
      </div>
    </div>
  )
}