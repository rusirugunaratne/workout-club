import { Stack, Typography } from "@mui/material"
import { GiFastArrow } from "react-icons/gi"
import { TiLockClosed } from "react-icons/ti"
import { colors } from "../../utils/colors"
import { Link } from "react-router-dom"
import { CgGym } from "react-icons/cg"

const Navbar = () => {
  const navBarItems = [
    { title: "Home", link: "/workouts" },
    { title: "Add Workout", link: "/addWorkout" },
  ]

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
          <Typography variant='h4' color='initial'>
            Workout Club
          </Typography>
        </Stack>

        <Stack direction='row' spacing={4}>
          {navBarItems.map((item, index) => (
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
          ))}
        </Stack>

        <Stack direction='row' spacing={4}>
          <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            spacing={1}
          >
            <Link style={{ textDecoration: "none" }} to={"/admin/employers"}>
              <Typography variant='body1' fontWeight='medium' color='initial'>
                Login
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
