
"use client"

import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export interface CalendarProps {
  selected: Date | null
  onChange: (date: Date | null) => void
  minDate?: Date
  maxDate?: Date
  excludeDates?: Date[]
  placeholderText?: string
  className?: string
}

export function Calendar({ selected, onChange, minDate, maxDate, excludeDates, placeholderText, className }: CalendarProps) {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      minDate={minDate}
      maxDate={maxDate}
      excludeDates={excludeDates}
      placeholderText={placeholderText}
      className={className}
      inline
    />
  )
}
