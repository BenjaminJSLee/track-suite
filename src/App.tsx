import { useState } from 'react';
import './App.scss';
import StopwatchActive from './components/StopwatchActive';
import StopwatchList from './components/StopwatchList';
import './components/PomodoroTimer'
import PomodoroTimer from './components/PomodoroTimer';

import { ISound, ITimer } from './ts-interfaces/interfaces';

const timerData = [
  {
    id: 1,
    uid: 0,
    name: "Classic Pomodoro",
    cycles: 2,
    work: 25 * 60,
    short_break: 5 * 60,
    long_break: 35 * 60,
    short_b_start_sound: 0,
    short_b_end_sound: 0,
    long_b_start_sound: 0,
    long_b_end_sound: 0,
  },
  {
    id: 2,
    uid: 0,
    name: "Classic Eye-Strain",
    cycles: 3,
    work: 2,
    short_break: 2,
    long_break: 2,
    short_b_start_sound: 0,
    short_b_end_sound: 0,
    long_b_start_sound: 0,
    long_b_end_sound: 0,
  },
  {
    id: 3,
    uid: 0,
    name: "Classic 50-7",
    cycles: 3,
    work: 50 * 60,
    short_break: 7 * 60,
    long_break: 0,
    short_b_start_sound: 0,
    short_b_end_sound: 0,
    long_b_start_sound: 0,
    long_b_end_sound: 0,
  },
  
];

const sounds: ISound[] = [
  {id: 1, file: "test1.mp3"},
  {id: 2, file: "test2.mp3"},
  {id: 3, file: "test3.mp3"},
];

function App() {
  const [timerPresets, setTimerPresets] = useState(timerData);
  const [soundFiles, setSoundFiles] = useState(sounds);

  const handleAddTimer = (timer: ITimer) => {
    setTimerPresets((prev) => {
      if (timer.id === null) {
        return [ ...prev, { ...timer, id: timerPresets.length + 1 } ];
      }
      return prev.map((t) => t.id === timer.id ? {...timer} : t);
    });
    return timerPresets.length + 1;
  };

  return (
    <main>
      <nav className='nav-container'>
        <div className='nav-logo-container'>
          <div className='nav-logo-inner'>
            <div className='nav-title'>TRACK<br />SUITE</div>
          </div>
          <div className='nav-logo-inner'>
            <img src="./assets/suit.png" alt="suit"/>
          </div>
        </div>
      </nav>

      <section className='main-app'>
        <section className='section-pm'>
          <PomodoroTimer 
            timers={timerPresets}
            saveTimer={handleAddTimer}
            sounds={soundFiles}
          />
        </section>
        <section className='section-sw-active'>
          <StopwatchActive />
        </section>
        <section className='section-sw-entries'>
          <StopwatchList />
        </section>
      </section>
    </main>
  );
}

export default App;
