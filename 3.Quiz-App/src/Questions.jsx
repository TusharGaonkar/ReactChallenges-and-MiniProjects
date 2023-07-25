import nextSound from '../public/657947__matrixxx__horror-inspect-sound-ui-or-in-game-notification-01.wav';
import finishSound from '../public/619840__eponn__achievement-accomplish-jingle-app-ui.wav';
import useSound from 'use-sound';

function Answer({ answer }) {
  return (
    <>
      <div>
        <input
          type='radio'
          name='answers'
          value=''
          id={answer}
          className='peer hidden [&:checked_+_label_svg]:block'
        />

        <label
          htmlFor={answer}
          className='flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500'
        >
          <div className='flex items-center gap-2'>
            <svg
              className='hidden h-5  text-blue-600 w-14'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                clipRule='evenodd'
              />
            </svg>

            <p className='text-gray-700'>{answer}</p>
          </div>
        </label>
      </div>
    </>
  );
}

export default function Questions({ fetchedQuestion, dispatch }) {
  const { question, answers } = fetchedQuestion;
  const [playSound] = useSound(nextSound);
  function handleNext(e) {
    e.preventDefault();
    playSound();
    dispatch({ type: 'moveToNext' });
  }
  return (
    <>
      <div className='max-w-md mx-auto flex flex-col mt-5'>
        <div className='flex justify-evenly items-center bg-amber-100  text-amber-700'>
          <p className='text-md font-semibold p-6'>{question}</p>
        </div>
        <fieldset className='space-y-4'>
          <legend className='sr-only'>Answers</legend>
          {Object.values(answers)
            .filter((answer) => answer !== null)
            .map((answer) => (
              <Answer answer={answer} key={answer} />
            ))}
        </fieldset>
        <div className='max-w-sm self-end mt-6'>
          <button
            className='group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500'
            href='/download'
            onClick={(e) => handleNext(e)}
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

            <span className='text-sm font-medium transition-all group-hover:me-4'>Next</span>
          </button>
        </div>
      </div>
    </>
  );
}
