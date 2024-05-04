import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createAPIEndpoint, ENDPOINTS } from "../api/api"
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Grid,
  Stack,
} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { copyToClipboard } from "../utils/helpers" // Assuming you have a utility to handle clipboard operations
import toast from "react-hot-toast"
import { colors } from "../utils/colors"

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [currentWorkoutId, setCurrentWorkoutId] = useState(null)
  const navigate = useNavigate()

  const fetchWorkouts = () => {
    createAPIEndpoint(ENDPOINTS.workout)
      .fetch()
      .then((res) => setWorkouts(res.data))
      .catch((err) => console.error("Failed to fetch workouts:", err))
  }

  useEffect(() => {
    fetchWorkouts()
  }, [])

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget)
    setCurrentWorkoutId(id)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleShare = () => {
    copyToClipboard(currentWorkoutId)
    toast("💪🏻 Workout ID Copied to Clipboard")
    handleClose()
  }

  const handleDelete = () => {
    createAPIEndpoint(ENDPOINTS.workout)
      .delete(currentWorkoutId)
      .then((res) => {
        toast("😵 Workout Deleted")
        fetchWorkouts()
      })

    handleClose()
  }

  const handleCardClick = (id) => {
    navigate(`/workout/${id}`)
  }

  const handleAddWorkout = () => {
    navigate("/addWorkout")
  }

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {workouts.map((workout) => (
        <Grid item xs={12} sm={6} md={4} key={workout._id}>
          <Card
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CardActionArea onClick={() => handleCardClick(workout._id)}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ marginRight: 2, bgcolor: "secondary.main" }}>
                  {workout.workoutName[0].toUpperCase()}
                </Avatar>
                <Typography variant='h6'>{workout.workoutName}</Typography>
              </CardContent>
            </CardActionArea>
            <IconButton
              aria-label='settings'
              onClick={(e) => handleClick(e, workout._id)}
              sx={{ position: "absolute", right: 0, top: 0 }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleShare}>Share Workout</MenuItem>
              <MenuItem onClick={handleDelete}>Delete Workout</MenuItem>
            </Menu>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CardActionArea
            onClick={handleAddWorkout}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: 2,
              bgcolor: colors.cardBackground,
            }}
          >
            <Stack
              direction='row'
              justifyContent='center'
              alignItems='center'
              spacing={2}
            >
              <AddCircleOutlineIcon />
              <Typography variant='h6'>Add Workout</Typography>
            </Stack>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}

export default WorkoutsPage
