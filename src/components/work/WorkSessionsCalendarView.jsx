import React, { useMemo, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


import { WorkSessionsCalendarEventDetail } from "./WorkSessionsCalendarEventDetail";

// Weekly time grid view: horizontal = days (Sun..Sat), vertical = time from 8:30 to 24:00
export function WorkSessionsCalendarView({ sessions = [], weekDate = new Date() }) {

const [hovered, setHovered] = useState(null)
const [isEventHover, setIsEventHover] = useState(false)
const [isDetailHover, setIsDetailHover] = useState(false)

const open = isEventHover || isDetailHover
useEffect(() => {
  if (!isEventHover && !isDetailHover) {
    setHovered(null)
  }
}, [isEventHover, isDetailHover])

return (
        <>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                events={sessions.map(s => ({
                    title: s.description || "(説明なし)",
                    start: new Date(s.start),
                    end: s.end ? new Date(s.end) : null,
                }))}
 eventMouseEnter={(info) => {
    const rect = info.el.getBoundingClientRect()

    setHovered({
      event: info.event,
      anchorEl: {
        getBoundingClientRect: () => rect,
      },
    })
    setIsEventHover(true)
  }}

  eventMouseLeave={() => {
    setIsEventHover(false)
  }}
            />

<WorkSessionsCalendarEventDetail
  hovered={hovered}
  open={open}
  setIsDetailHover={setIsDetailHover}
/>
        </>
    );

}