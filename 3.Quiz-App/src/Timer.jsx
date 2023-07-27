import { useEffect } from 'react';

export default function Timer({ state, dispatch }) {
  useEffect(() => {
    function setTimer() {
      const timerConfig = { Easy: 0.5, Medium: 1, Hard: 2 };
      const allotedMinutes = (state.totalQuestions * timerConfig[state.difficulty]) / 2;
      dispatch({ type: 'setTimer', payload: { minutes: allotedMinutes, seconds: 0 } });
    }

    function decrementTimer() {
      dispatch({ type: 'decTimer' });
    }
    // setTimer();

    const timerId = setInterval(decrementTimer, 1000);
    return () => clearInterval(timerId); //state cleanup
  }, []); // run only on mount

  return state.timer !== null ? (
    <button className='px-4 py-2 rounded-full bg-slate-400 text-white font-semibold'>
      🕧{state.timer.minutes < 10 && 0}
      {state.timer.minutes} : {state.timer.seconds < 10 && 0}
      {state.timer.seconds}
    </button>
  ) : null;
}
