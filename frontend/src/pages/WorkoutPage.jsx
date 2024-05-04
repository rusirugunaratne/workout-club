import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
} from "@mui/material"
import { createAPIEndpoint, ENDPOINTS } from "../api/api"
import toast from "react-hot-toast"

const WorkoutPage = () => {
  const navigate = useNavigate()
  const [workoutName, setWorkoutName] = useState("")
  const [exercises, setExercises] = useState([])

  const { id } = useParams()

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.workout)
      .fetchById(id)
      .then((res) => {
        setWorkoutName(res.data.workoutName)
        setExercises(res.data.exercises)
      })
  }, [])

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
      .put(id, workoutData)
      .then((res) => {
        toast("💪🏻 Workout Updated")
        navigate("/workouts")
      })
      .catch((err) => toast(err.message))
    console.log(workoutData)
  }

  return (
    <Container sx={{ marginBottom: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4, mt: 4 }}>
        <Typography variant='h4' gutterBottom>
          {workoutName}
        </Typography>
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
        Save Routine
      </Button>
    </Container>
  )
}

export default WorkoutPage
