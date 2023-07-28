export default function LoadQuiz({ state, dispatch }) {
  const { subject, difficulty, totalQuestions, status } = state;

  function handleLoadQuiz(e) {
    e.preventDefault();
    dispatch({ type: 'setStatus', payload: 'loading' });
  }

  return subject ? ( // If subject is selected, show content in a flex row layout
    <section className='rounded-3xl shadow-2xl max-w-5xl mx-auto mt-8 flex'>
      <div className='mx-auto flex flex-row items-center justify-center gap-0'>
        <div className='relative' style={{ top: '40px', marginLeft: '-10px' }}>
          <img
            src='../public/3d-casual-life-school-boy-reading-book-with-headphones-on.png'
            alt='Avatar'
            className='h-[350px] object-cover'
          />
        </div>
        <div className='flex flex-col items-center justify-start'>
          <h2 className='text-2xl font-bold min-w-max'>
            Ready to assess your mastery on {subject} 💪🏻
          </h2>
          <p className='text-md font-bold text-pink-500'>
            ⚡Total Questions : {totalQuestions} &nbsp;&nbsp; ⚡Difficulty : {difficulty}
          </p>
          <button
            className='mt-8 inline-block w-full rounded-full hover:bg-pink-600 bg-[#cf789d] py-4 text-sm font-bold text-white shadow-xl max-w-xs'
            onClick={(e) => handleLoadQuiz(e)}
          >
            {status === 'loading' ? (
              <div className='flex justify-center items-center space-x-2'>
                <span className='font-bold'>Setting up the quiz</span>
                <div
                  className='inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                  role='status'
                ></div>
              </div>
            ) : (
              'Load Quiz'
            )}
          </button>
        </div>
      </div>
    </section>
  ) : (
    // If no subject is selected, show image and text in a flex column layout
    <section className='rounded-3xl shadow-2xl max-w-lg p-4 mx-auto mt-8'>
      <div className='flex flex-col items-center'>
        <img
          src='../public/3d-casual-life-young-woman-sitting-on-floor-in-headphones.png'
          alt='Avatar'
          className='w-40 h-40 sm:w-48 sm:h-48 object-cover'
        />
        <h2 className='mt-6 text-2xl font-bold min-w-max'>Please Select the Subject 😇!</h2>
      </div>
    </section>
  );
}
