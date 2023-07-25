export default function StartQuiz({ subject, totalQuestions, dispatch }) {
  function handleStartQuiz(e) {
    e.preventDefault();
    dispatch({ type: 'setStatus', payload: 'onProgress' });
  }
  return (
    <div className='mx-auto  max-w-screen-xl px-4 py-5 lg:flex lg:items-center mt-6'>
      <div className='mx-auto max-w-xl text-center'>
        <h1 className='text-3xl font-extrabold sm:text-5xl'>
          Welcome to the
          <strong className='font-extrabold text-red-700 sm:block'>{subject} Quiz.</strong>
        </h1>

        <p className='mt-4 sm:text-xl/relaxed'>
          {totalQuestions}{' '}
          <span className='whitespace-nowrap rounded-full bg-blue-500 px-2.5 py-0.5 text-sm font-bold text-white'>
            Hard
          </span>{' '}
          questions to assess your {subject} skill!
        </p>

        <div className='mt-8 flex flex-wrap justify-center gap-4'>
          <button
            className='block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto'
            onClick={(e) => handleStartQuiz(e)}
          >
            Start Quiz
          </button>

          <button
            className='block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto'
            disabled
          >
            Test Instructions
          </button>
        </div>
      </div>
    </div>
  );
}
