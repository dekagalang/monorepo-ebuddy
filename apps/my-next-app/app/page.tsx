"use client";
import React, { useState } from "react";
import { Button, Typography, Container, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateError,
} from "@/store/slices/updateSlices";
import { RootState } from "@/store/slices";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { success, loading, error } = useSelector(
    (state: RootState) => state.update
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateStart());
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(updateSuccess());
    } catch (err) {
      if (err instanceof Error) {
        dispatch(updateError(err.message));
      }
    } finally {
      setEmail("");
      setPassword("");
    }
  };
  console.log(
    "success => " + success,
    "loading => " + loading,
    "error => " + error
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Home;

// import Counter from "../components/Counter";

// const Home = () => {
//   const apiUrl = "http://127.0.0.1:5001/ebuddy-dfdc5/us-central1/helloWorld";
//   async function callApi() {
//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.text();
//       console.log(data);
//     } catch (error) {
//       console.error("Error calling API:", error);
//     }
//   }

//   callApi();
//   return (
//     <div>
//       <h1>Welcome to Next.js with Redux!</h1>
//       <Counter />
//     </div>
//   );
// };

// export default Home;
