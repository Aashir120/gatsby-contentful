import React, { useState } from "react";
import { Link,navigate } from "gatsby";
import { useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { signUpUser } from "../features/firebase";
import { isAuthenticated } from "../features/authSlice";
import styles from "./signup.module.css";
import { increment } from "../features/stateSlice";

export default function signup() {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: any) => state.auth);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmation, setConfirmation] = useState("");
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== confirmation) {
        setError("passwords do Not Match");
      } else {
        setLoading(true);
        const user: any = await signUpUser(email, password);
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
      }
      setLoading(false);
    } catch (error) {
      setError("Failed to Create Account");
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
          <Typography className={styles.title}>SignUp Form</Typography>
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
          <TextField
            type="password"
            id="outlined-password"
            label="Confirm Password"
            value={confirmation}
            onChange={(e: any) => setConfirmation(e.target.value)}
            variant="outlined"
            className={styles.inputField}
            fullWidth
          />
          <Button
            disabled={loading}
            type="submit"
            className={styles.btn}
            variant="contained"
          >
            SignUp
          </Button>
          <Box>
            <Typography className={styles.Link} variant="body1">
              Already have an account? <Link to="/login">Log In</Link>
            </Typography>
          </Box>
        </form>
      </Container>
    </div>
  );
}