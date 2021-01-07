import React, { useState } from "react";
import { Link,navigate } from "gatsby";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { logInUser } from "../features/firebase";
import { isAuthenticated } from "../features/authSlice";
import styles from "./login.module.css";
import { increment } from "../features/stateSlice";

export default function login() {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: any) => state.auth);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await logInUser(email, password);
      console.log(user);
      const payload = {
        email: user?.user?.email,
        token: user?.user?.uid,
        isAuth: true,
        number: 1,
      };
      console.log(payload);
      dispatch(isAuthenticated(payload));
      dispatch(increment(1));
    } catch (error) {
      setError("Failed to Log In");
    }
  };
  return (
    <div className={styles.container}>
      <Container maxWidth="sm">
        {auth.isLoggedIn ? (
          navigate('/blog')
        ) : (
          ""
        )}
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <Typography className={styles.title}>Login Form</Typography>
          {error && <Typography className={styles.error}>{error}</Typography>}
          <TextField
            type="email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            fullWidth
            className={styles.inputField}
          />
          <TextField
            type="password"
            id="outlined"
            label="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            variant="outlined"
            className={styles.inputField}
            fullWidth
          />
          <Button type="submit" className={styles.btn} variant="contained">
            Login
          </Button>
          <Box>
            <Typography className={styles.Link} variant="body1">
              Need an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </Box>
        </form>
      </Container>
    </div>
  );
}