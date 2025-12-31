import React, { useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// Weekly time grid view: horizontal = days (Sun..Sat), vertical = time from 8:30 to 24:00
export default function WorkSessionsCalendarView({ sessions = [], weekDate = new Date() }) {
      const handleDateClick = (arg) => {
    alert(arg)
  }
    return (
        <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            events={sessions.map(s => ({
                title: s.description || "(説明なし)",
                start: new Date(s.start),
                end: s.end ? new Date(s.end) : null,
            }))}
            dateClick={handleDateClick}
        />
    );
}