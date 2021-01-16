import React, { useState } from 'react'

import './StepInput.scss'

const StepInputTimer = function(props: any) {
  const [value, setValue] = useState(props.value || '00:00:00')
  const [dbTime, setDbTime] = useState(new Date(0))

  // Time array --> Date object
  const convertTimeArrToDateObj = (timeArr: number[]) => {
    const [h, m, s] = timeArr
    const seconds = Number(h) * 60 * 60 + Number(m) * 60 + Number (s)
    return new Date(seconds * 1000)
  }
  // Date object --> Time array
  const convertDateObjToArr = (dateObj: Date) => {
    let s: number = dateObj.getUTCSeconds()
    let m: number = dateObj.getUTCMinutes()
    let h: number = dateObj.getUTCHours()
    return [h, m, s]
  }

  // Time array --> Time string
  const convertTimeArrToStr = ([h, m, s]: (number[])) => {
    let ss = ("0" + s).slice(-2);
    let mm = ("0" + m).slice(-2);
    let hh = ("0" + h).slice(-2);
    const timeStr = `${hh}:${mm}:${ss}`
    return timeStr
  }
  // Time string --> Time array
  const convertTimeStrToArr = (rawStr: string | number) => {
    // Let h, m, s from rawStr
    let s: number = Math.floor(Number(rawStr) % 100)
    let m: number = Math.floor((Number(rawStr) / 100) % 100)
    let h: number = Math.floor((Number(rawStr) / 100 / 100) % 100)
    return [h, m, s]
  }

  // Validity check for user's raw input
  const isAllNumbers = (noColons: string): boolean => {
    return /^\d+$/.test(noColons)
  }
  
  // Adjust time with butttons
  const handleClick = (direction: number): void => {
    let dateObj: (Date | number) = convertTimeArrToDateObj(value.split(':'))
    dateObj.setUTCMinutes(dateObj.getUTCMinutes() + direction)

    // Disallow wrapping from 00:00:00 to 23:59:00
    if (Number(dateObj) < 0) return

    const timeArr: number[] = convertDateObjToArr(dateObj)
    setDbTime(convertTimeArrToDateObj(timeArr))
    const timeStr = convertTimeArrToStr(timeArr)
    setValue(timeStr)
  }

  // Adjust time by manually entering a new time
  const handleBlur = (rawStr: string) => {
    const noColons = rawStr.split(':').join('')
    const isValid = isAllNumbers(noColons)
    if (isValid) {
      // noColons is a string of only numbers
      const timeArr = convertTimeStrToArr(noColons)
      // timeArr may include e.g. 90sec, convert to 1min30sec
      const normalizedTimeArr = convertDateObjToArr(convertTimeArrToDateObj(timeArr))
      setDbTime(convertTimeArrToDateObj(normalizedTimeArr))
      const timeStr = convertTimeArrToStr(normalizedTimeArr)
      setValue(timeStr)
    } else {
      const timeStr = convertTimeArrToStr(convertDateObjToArr(dbTime))
      setValue(timeStr)
    }
  }

  return (
    <>
      <i className="fa fa-chevron-up" onClick={e => handleClick(1)}></i>
      <input
        value={value}
        onFocus={e => e.target.select()}
        onChange={e => setValue(e.target.value)}
        onBlur={e => handleBlur(e.target.value)}
        name={props.name}
        type='text'
        step={props.format === 'clock' ? 60 : 1}
      />
      <i className="fa fa-chevron-down" onClick={e => handleClick(-1)}></i>
    </>
  )
}

export default StepInputTimer