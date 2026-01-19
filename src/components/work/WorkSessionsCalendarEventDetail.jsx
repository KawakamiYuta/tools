import { Popper, Paper, Typography } from "@mui/material"

export function WorkSessionsCalendarEventDetail({
  hovered,
  setIsDetailHover,
  open,
}) {
  if (!hovered) return null

  return (
    <Popper
      open={open}
      anchorEl={hovered.anchorEl}
      placement="right-start"
    >
      <Paper
        onMouseEnter={() => setIsDetailHover(true)}
        onMouseLeave={() => setIsDetailHover(false)}
        sx={{ p: 2, maxWidth: 260 }}
      >
        <Typography fontWeight="bold">
          {hovered.event.title}
        </Typography>
      </Paper>
    </Popper>
  )
}
