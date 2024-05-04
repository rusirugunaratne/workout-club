import { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Layout from "../pages/Layout"
import SignupPage from "../pages/SignupPage"
import WorkoutsPage from "../pages/WorkoutsPage"
import AddWorkoutPage from "../pages/AddWorkoutPage"
import WorkoutPage from "../pages/WorkoutPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/workouts", element: <WorkoutsPage /> },
      { path: "/addWorkout", element: <AddWorkoutPage /> },
      { path: "/workout/:id", element: <WorkoutPage /> },
    ],
  },
])

export default router
