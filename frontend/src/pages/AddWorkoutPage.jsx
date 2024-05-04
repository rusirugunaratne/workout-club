import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material"
import { createAPIEndpoint, ENDPOINTS } from "../api/api"
import toast from "react-hot-toast"

const AddWorkoutPage = () => {
  const navigate = useNavigate()
  const [workoutName, setWorkoutName] = useState("")
  const [exercises, setExercises] = useState([])
  const [workoutId, setWorkoutId] = useState("")

  const saveToUser = (workoutId) => {
    const userId = localStorage.getItem("userId")
    console.log("user id", userId)
    createAPIEndpoint(ENDPOINTS.user)
      .fetchById(userId)
      .then((res) => {
        createAPIEndpoint(ENDPOINTS.user).put(userId, {
          ...res.data,
          workoutIds: [...res.data.workoutIds, workoutId],
        })
        toast("💪🏻 Workout Added")
        navigate("/workouts")
        setTimeout(() => window.location.reload(), 100)
      })
  }

  const handleAddExercise = () => {
    setExercises([...exercises, { name: "", imageUrl: "", sets: [] }])
  }

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises]
    updatedExercises[index][field] = value
    setExercises(updatedExercises)
  }

  const handleAddSet = (exerciseIndex) => {
    const updatedExercises = [...exercises]
    const sets = updatedExercises[exerciseIndex].sets
    updatedExercises[exerciseIndex].sets = [...sets, { weight: "", reps: "" }]
    setExercises(updatedExercises)
  }

  const handleSetChange = (exerciseIndex, setIndex, field, value) => {
    const updatedExercises = [...exercises]
    updatedExercises[exerciseIndex].sets[setIndex][field] = value
    setExercises(updatedExercises)
  }

  const handleRemoveSet = (exerciseIndex, setIndex) => {
    const updatedExercises = [...exercises]
    updatedExercises[exerciseIndex].sets.splice(setIndex, 1)
    setExercises(updatedExercises)
  }

  const handleRemoveExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index)
    setExercises(updatedExercises)
  }

  const handleSave = () => {
    const workoutData = { workoutName, exercises }
    createAPIEndpoint(ENDPOINTS.workout)
      .post(workoutData)
      .then((res) => {
        saveToUser(res.data._id)
      })
      .catch((err) => toast(err.message))
    console.log(workoutData)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("Workout ID:", workoutId)
      createAPIEndpoint(ENDPOINTS.workout)
        .fetchById(workoutId)
        .then((res) => {
          setWorkoutName(res.data.workoutName)
          setExercises(res.data.exercises)
        })
      // Add any other logic you want to execute on Enter press
    }
  }

  return (
    <Container sx={{ marginBottom: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4, mt: 4 }}>
        <Typography variant='h4' gutterBottom>
          Add Workout by ID
        </Typography>
        <TextField
          fullWidth
          label='Workout ID'
          value={workoutId}
          onChange={(e) => setWorkoutId(e.target.value)}
          sx={{ mb: 2 }}
          onKeyDown={handleKeyDown}
        />
        <Box my={2} sx={{ display: "flex", alignItems: "center" }}>
          <Divider sx={{ flexGrow: 1 }} />
          <Box sx={{ px: 2, color: "text.secondary" }}>or</Box>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>
        <Typography variant='h4' gutterBottom>
          Create a Workout
        </Typography>
        <TextField
          fullWidth
          label='Workout Name'
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          sx={{ mb: 2 }}
        />
        {exercises.map((exercise, index) => (
          <Card key={index} variant='outlined' sx={{ mb: 2 }}>
            <CardContent>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={12} sm={1}>
                  <Avatar
                    alt={exercise.name}
                    src={exercise.imageUrl || ""}
                    sx={{ width: 56, height: 56 }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Exercise Name'
                    value={exercise.name}
                    onChange={(e) =>
                      handleExerciseChange(index, "name", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label='Image URL'
                    value={exercise.imageUrl}
                    onChange={(e) =>
                      handleExerciseChange(index, "imageUrl", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => handleRemoveExercise(index)}
                  >
                    Remove Exercise
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={() => handleAddSet(index)}
                    variant='outlined'
                    color='primary'
                  >
                    Add Set
                  </Button>
                </Grid>
                {exercise.sets.map((set, setIndex) => (
                  <Grid item xs={12} key={setIndex}>
                    <Box display='flex' alignItems='center'>
                      <Typography sx={{ width: "100px" }}>
                        Set {setIndex + 1}
                      </Typography>
                      <TextField
                        label='Weight'
                        value={set.weight}
                        onChange={(e) =>
                          handleSetChange(
                            index,
                            setIndex,
                            "weight",
                            e.target.value
                          )
                        }
                        sx={{ mx: 1 }}
                      />
                      <TextField
                        label='Reps'
                        value={set.reps}
                        onChange={(e) =>
                          handleSetChange(
                            index,
                            setIndex,
                            "reps",
                            e.target.value
                          )
                        }
                        sx={{ mx: 1 }}
                      />
                      <Button
                        onClick={() => handleRemoveSet(index, setIndex)}
                        color='error'
                      >
                        Remove Set
                      </Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        ))}
        <Button
          onClick={handleAddExercise}
          variant='contained'
          color='secondary'
          sx={{ mb: 2 }}
        >
          Add Exercise
        </Button>
      </Paper>
      <Button variant='contained' color='primary' onClick={handleSave}>
        Save Workout
      </Button>
    </Container>
  )
}

export default AddWorkoutPage
