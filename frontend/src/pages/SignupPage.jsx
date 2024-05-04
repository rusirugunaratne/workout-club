import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextField, Button, Typography, Container, Box } from "@mui/material"
import { createAPIEndpoint, ENDPOINTS } from "../api/api"
import toast from "react-hot-toast"

const SignupPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    workoutIds: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSignUp = () => {
    const { username, email, password, confirmPassword } = formData
    // Here you can add validation or further logic
    console.log(
      "Username:",
      username,
      "Email:",
      email,
      "Password:",
      password,
      "Confirm Password:",
      confirmPassword
    )

    createAPIEndpoint(ENDPOINTS.user)
      .post(formData)
      .then((res) => {
        localStorage.setItem("userId", res.data._id)
        navigate("/workouts")
      })
      .catch((err) => toast(err.message))
  }

  const handleSignIn = () => {
    navigate("/") // Navigate to the login page when the user clicks on sign in
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
          Sign Up
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
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='new-password'
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            id='confirmPassword'
            autoComplete='new-password'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Typography variant='body2'>
            Already registered?{" "}
            <Button color='primary' onClick={handleSignIn}>
              Sign In
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default SignupPage
