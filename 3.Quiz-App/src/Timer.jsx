import { useEffect } from 'react';

export default function Timer({ state, dispatch }) {
  useEffect(() => {
    function setTimer() {
      const timerConfig = { Easy: 0.6, Medium: 1, Hard: 1.5 };
      const allotedMinutes = Math.floor((state.totalQuestions * timerConfig[state.difficulty]) / 2);
      dispatch({ type: 'setTimer', payload: { minutes: allotedMinutes, seconds: 0 } });
    }

    function decrementTimer() {
      dispatch({ type: 'decTimer' });
    }
    setTimer();

    const timerId = setInterval(decrementTimer, 1000);
    return () => clearInterval(timerId); //state cleanup
  }, []); // run only on mount

  return state.timer !== null ? (
    <button
      className={
        state.timer.minutes < 1
          ? `bg-red-500 px-4 py-2 rounded-full text-white font-semibold`
          : state.timer.minutes < 2
          ? ` bg-orange-500 px-4 py-2 rounded-full text-white font-semibold`
          : ` bg-green-500 px-4 py-2 rounded-full text-white font-semibold`
      }
    >
      {'⌛'}
      {state.timer.minutes < 10 && 0}
      {state.timer.minutes}:{state.timer.seconds < 10 && 0}
      {state.timer.seconds}
    </button>
  ) : null;
}
