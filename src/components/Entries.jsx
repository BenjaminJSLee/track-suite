import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Button from './Button';


function Entries() {
  const [desc, setDesc] = useState('');
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [toggle, setToggle] = useState({
    calendar: false,
    pause: false,
    play: true,
  })

  const calendarState = (value) => {
    setCalendarValue(value)
    setToggle(prev => {
      return {
        ...prev,
        calendar: !prev.calendar,
      };
    })
  }

  // https://stackoverflow.com/questions/10599148/how-do-i-get-the-current-time-only-in-javascript
  const getTimeNow = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });


  return (
    <>
      <form
        autoComplete='off'
        onSubmit={event => event.preventDefault()}
      >

        {/* <EntryDesc />  */}
        <div>
          <input
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
            name='desc'
            type='text'
            placeholder='What are you working on?'
            size='50'
          />

          {console.log(desc)}
        </div>

        {/* <StartEndTime />  */}
        <div>
            {getTimeNow}
        </div>
        {/* no manual input yet */}
        {/* <Intensity /> */}

        <i 
          className='fa fa-calendar-alt fa-lg'
          onClick={(e) => setToggle(prev => {
            return {
              ...prev, 
              calendar: !prev.calendar
            };
          })
        }
        >
          {calendarValue.getMonth() + 1}/{calendarValue.getDate()}
        </i>
      
 
        {toggle.calendar && 
        <Calendar 
          value = {calendarValue}
          onClickDay={(value, event) => calendarState(value)}

        /> 
        }

        {toggle.play &&
        <Button
        onClick={(e) => setToggle(prev => {
          return {
            ...prev,
            play: !prev.play,
            pause: !prev.pause
          };
        })
        }
        >
          <i class="far fa-play-circle fa-lg"></i>
        </Button>
        }


        {toggle.pause &&
        <Button
          onClick={(e) => setToggle(prev => {
            return {
              ...prev,
              play: !prev.play,
              pause: !prev.pause
            };
          })
          }
        >
          <i class="far fa-pause-circle fa-lg"></i>
        </Button>
        }

      
        <Button>
          <i class="far fa-stop-circle fa-lg"></i>
        </Button>


        {console.log({calendarValue})}

        {/* https://www.npmjs.com/package/react-calendar */}
        {/* <TimerDuration /> */}

        {/* <Button /> */}
        {/* Pass in img as prop & conditionals to render the component diff */}
        {/* Play/Pause/Stop/Duplicate/Delete */}

        {/* <ModeToggle /> STRETCH */}

      </form>
    </>
  )
}

export default Entries;