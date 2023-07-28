import nextSound from '../public/657947__matrixxx__horror-inspect-sound-ui-or-in-game-notification-01.wav';
import finishSound from '../public/619840__eponn__achievement-accomplish-jingle-app-ui.wav';
import useSound from 'use-sound';
import Answer from './Answer';

export default function Questions({
  index,
  totalQuestions,
  selectedAnswer,
  selectedAnswerId,
  fetchedQuestion,
  dispatch,
}) {
  const { question, answers, correct_answers } = fetchedQuestion;
  const [playNextSound] = useSound(nextSound);
  const [playFinishedSound] = useSound(finishSound);

  function evaluateAnswer() {
    return correct_answers[`${selectedAnswerId}_correct`] === 'true';
  }

  function handleNext(e) {
    // this evaluates too !!
    e.preventDefault();
    if (index == totalQuestions - 1) {
      playFinishedSound();
      dispatch({
        type: 'setStatus',
        payload: 'finished',
      });
    } else playNextSound();
    if (evaluateAnswer()) {
      dispatch({ type: 'evaluateAnswer', payload: { type: 'correct', score: 10 } });
    } else dispatch({ type: 'evaluateAnswer', payload: { type: 'wrong', score: 0 } });
    dispatch({ type: 'moveToNext' });
  }
  return (
    <>
      <div className='max-w-md mx-auto flex flex-col mt-3'>
        <div className='flex justify-evenly items-center bg-amber-100  text-amber-700'>
          <p className='text-md font-semibold p-6'>
            {`${index + 1}. `}
            {question}
          </p>
        </div>
        <fieldset className='space-y-4'>
          <legend className='sr-only'>Answers</legend>
          {Object.entries(answers)
            .filter(([_, value]) => {
              return value !== null && value != '';
            })
            .map(([answerOption, value]) => {
              return (
                <Answer answer={value} answerId={answerOption} key={value} dispatch={dispatch} />
              );
            })}
        </fieldset>
        <div className='max-w-sm self-end mt-6 mb-9'>
          <button
            className='disabled:bg-gray-500 disabled:cursor-not-allowed group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500'
            onClick={(e) => handleNext(e)}
            disabled={selectedAnswer === -1}
          >
            <span className='absolute -end-full transition-all group-hover:end-4'>
              <svg
                className='h-5 w-5 rtl:rotate-180'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </span>

            <span className='text-sm font-medium transition-all group-hover:me-4'>
              {index < totalQuestions - 1 ? 'Next' : 'Finish'}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
