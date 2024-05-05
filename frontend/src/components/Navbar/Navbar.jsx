import { Stack, Typography } from "@mui/material"
import { GiFastArrow } from "react-icons/gi"
import { TiLockClosed } from "react-icons/ti"
import { colors } from "../../utils/colors"
import { Link, useNavigate } from "react-router-dom"
import { CgGym } from "react-icons/cg"

const Navbar = () => {
  const navBarItems = [
    { title: "Workouts", link: "/workouts" },
    { title: "Add Workout", link: "/addWorkout" },
  ]

  const navigate = useNavigate()

  const handleAuthClick = () => {
    if (localStorage.getItem("userId")) {
      localStorage.removeItem("userId") // Clear user ID from local storage
      navigate("/") // Optionally navigate to home or login page
    } else {
      navigate("/login") // Direct user to login page
    }
  }

  return (
    <>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        spacing={2}
        padding={4}
        bgcolor={colors.cardBackground}
      >
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
          spacing={2}
        >
          <CgGym size={60} />
          <Typography variant='h4'>Workout Club</Typography>
        </Stack>

        <Stack direction='row' spacing={4}>
          {localStorage.getItem("userId") ? (
            <>
              {navBarItems.map((item, index) => (
                <Link style={{ textDecoration: "none" }} to={item.link}>
                  <Typography
                    key={index}
                    variant='body1'
                    fontWeight='medium'
                    color='white'
                  >
                    {item.title}
                  </Typography>
                </Link>
              ))}
            </>
          ) : (
            <></>
          )}
          {/* {navBarItems.map((item, index) => (
            <Link style={{ textDecoration: "none" }} to={item.link}>
              <Typography
                key={index}
                variant='body1'
                fontWeight='medium'
                color='initial'
              >
                {item.title}
              </Typography>
            </Link>
          ))} */}
        </Stack>

        <Stack direction='row' spacing={4}>
          <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            spacing={1}
          >
            <Link
              style={{ textDecoration: "none" }}
              to='/'
              onClick={handleAuthClick}
            >
              <Typography variant='body1' fontWeight='medium' color='white'>
                {localStorage.getItem("userId") ? "Logout" : "Login"}
              </Typography>
            </Link>
            <TiLockClosed />
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default Navbar
