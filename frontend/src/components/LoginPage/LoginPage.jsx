import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextField, Button, Typography, Container, Box } from "@mui/material"

const LoginPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    console.log("Username:", username, "Password:", password)
    navigate("/workouts") // Navigate to the workouts page after logging in
  }

  const handleRegister = () => {
    navigate("/signup") // Navigate to the signup page when the user clicks on register
  }

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Box
          component='form'
          onSubmit={(e) => e.preventDefault()}
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            type='password'
            id='password'
            label='Password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography variant='body2'>
            Are you a new user?{" "}
            <Button color='primary' onClick={handleRegister}>
              Register
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginPage
