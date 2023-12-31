import coolLady from '../public/3d-business-girl-chatting-online.png';

export default function Results({
  subject,
  difficulty,
  totalCorrectAnswers,
  totalQuestions,
  score,
  dispatch,
}) {
  return (
    <section className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 md:py-16 lg:px-8'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl sm:ml-64'>
            Your {subject} Quiz Results🔥
          </h2>
        </div>

        <div className='mt-6 sm:mt-10'>
          <dl className='grid grid-cols-1 gap-4 sm:grid-cols-4'>
            <img src={coolLady} className='relative z-10 left-5'></img>
            <div className='flex flex-col rounded-lg justify-center bg-blue-100 px-4 py-8 text-center'>
              <dt className='order-last text-lg font-medium text-gray-500'>Difficulty</dt>

              <dd className='text-4xl font-extrabold text-blue-600 md:text-5xl'>{difficulty}</dd>
            </div>

            <div className='flex flex-col justify-center rounded-lg bg-blue-100 px-4 py-8 text-center'>
              <dt className='order-last text-lg font-medium text-gray-500'>Correct Answers</dt>

              <dd className='text-4xl font-extrabold text-blue-600 md:text-5xl'>
                {totalCorrectAnswers}/{totalQuestions}
              </dd>
            </div>

            <div className='flex flex-col rounded-lg justify-center bg-blue-100 px-4 py-8 text-center'>
              <dt className='order-last text-lg font-medium text-gray-500'>Total Score</dt>

              <dd className='text-4xl font-extrabold text-blue-600 md:text-5xl'>
                {score}/{totalQuestions * 10}
              </dd>
            </div>
          </dl>
        </div>
        <div className='flex items-baseline justify-center mt-3 space-x-5 sm:ml-60'>
          <p className='mt-4 text-gray-500'>
            Please feel free to retake the quiz and improve your scores..
          </p>
          <button
            className='group relative inline-block focus:outline-none focus:ring'
            onClick={(e) => {
              e.preventDefault();
              dispatch({
                type: 'retakeQuiz',
                payload: { subject: subject, difficulty, totalQuestions },
              });
            }}
          >
            <span className='absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0'></span>

            <span className='relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75'>
              🔄️Retake
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
