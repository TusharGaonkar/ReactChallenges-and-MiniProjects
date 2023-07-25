export default function LoadQuiz({ state, dispatch }) {
  const { subject, difficulty, totalQuestions, status } = state;
  function handleLoadQuiz(e) {
    e.preventDefault();
    dispatch({ type: 'setStatus', payload: 'loading' });
  }
  return (
    <section className='rounded-3xl shadow-2xl max-w-fit mx-auto mt-8'>
      <div className='p-8 text-center sm:p-12'>
        {subject && (
          <p className='text-md font-bold text-pink-500'>
            ⚡Total Questions : {totalQuestions} &nbsp;&nbsp; ⚡Difficulty : {difficulty}
          </p>
        )}

        <h2 className='mt-6 text-2xl font-bold min-w-max'>
          {subject
            ? `Ready to assess your mastery on ${subject} 💪🏻`
            : `Please Select the Subject 😇!`}
        </h2>

        <button
          className='mt-8 inline-block w-full rounded-full bg-pink-600 py-4 text-sm font-bold text-white shadow-xl max-w-xs disabled:bg-gray-400 disabled:cursor-not-allowed'
          onClick={(e) => handleLoadQuiz(e)}
          disabled={!subject}
        >
          {status === 'loading' ? (
            <div className='flex justify-center items-center space-x-2'>
              <span className='font-bold'>Setting up the quiz</span>
              <div
                className='inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                role='status'
              ></div>
            </div>
          ) : (
            'Load Quiz'
          )}
        </button>
      </div>
    </section>
  );
}
