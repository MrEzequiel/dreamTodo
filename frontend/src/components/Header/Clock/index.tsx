import React, { useEffect, useState } from 'react'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const Clock: React.FC = () => {
  const [date, setDate] = useState(new Date())

  function refreshClock() {
    setDate(new Date())
  }

  const formateDate = (date: Date) => {
    const month = monthNames[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${month} ${day}, ${year} · ${hours}:${minutes}`
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000)
    return () => clearInterval(timerId)
  }, [])

  return (
    <>
      <p>{formateDate(date)}</p>
    </>
  )
}

export default Clock
