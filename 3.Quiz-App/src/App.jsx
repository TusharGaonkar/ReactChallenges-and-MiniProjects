import Header from './Header';
import Topics from './Topics';
import StartQuiz from './StartQuiz';
import LoadQuiz from './LoadQuiz';
import Questions from './Questions';
import toast, { Toaster } from 'react-hot-toast';
import { useReducer, useEffect } from 'react';

const initialiState = {
  status: 'inactive',
  totalQuestions: 10,
  difficulty: 'Medium',
  index: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setSubject':
      return { ...state, subject: action.payload };
    case 'setDifficulty':
      return { ...state, difficulty: action.payload };
    case 'setTotalQuestions':
      return { ...state, totalQuestions: action.payload };
    case 'setStatus':
      return { ...state, status: action.payload };
    case 'questionsFetched':
      return { ...state, status: 'ready', questionList: action.payload };
    case 'moveToNext':
      if (state.index < state.totalQuestions - 1) {
        return { ...state, index: state.index + 1 };
      } else return state;
    default:
      return state;
  }
}

function ProgressBar({ currentQuestion, totalQuestions }) {
  const progress = Math.floor((currentQuestion / totalQuestions) * 100);
  console.log(progress);
  return (
    <div className='max-w-sm mx-auto mt-8 h-2'>
      <span id='ProgressLabel' className='sr-only'>
        Loading
      </span>

      <span
        role='progressbar'
        aria-labelledby='ProgressLabel'
        aria-valuenow={progress}
        className='block rounded-full bg-gray-200'
      >
        <span
          className='block h-4 rounded-full bg-green-400 text-center text-[10px]/4'
          style={{ width: `${progress}%` }}
        >
          <span className='font-bold text-white'>
            {' '}
            {currentQuestion}/{totalQuestions}
          </span>
        </span>
      </span>
    </div>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialiState);
  const { subject, difficulty, totalQuestions, status, questionList, index } = state;
  console.log(state);
  const topicList = [
    'JavaScript',
    'HTML',
    'PHP',
    'Laravel',
    'Linux',
    'DevOps',
    'Networking',
    'Docker',
    'Kubernetes',
    'Bash',
  ];

  useEffect(
    function () {
      function fetchQuestions(subject, difficulty, totalQuestions) {
        const API =
          'https://quizapi.io/api/v1/questions?apiKey=WYlIxw9u2SWcvgGURDCfTajwLMrrXTR1qYaDrBBg';

        fetch(`${API}&tags=${subject}&difficulty=${difficulty}&limit=${totalQuestions}`)
          .then((response) => response.json())
          .then((data) => {
            if (!data.error) {
              dispatch({ type: 'questionsFetched', payload: data });
              dispatch({ type: 'setStatus', payload: 'ready' });
            } else dispatch({ type: 'setStatus', payload: 'error' });
          });
      }
      if (subject && status === 'loading') fetchQuestions(subject, difficulty, totalQuestions);

      if (status == 'error') {
        toast.error(
          `Oops! No ${difficulty} questions found for ${subject}. Please try different parameters. 🫠`
        );
        dispatch({ type: 'setStatus', payload: 'active' });
      }
    },
    [status, subject, totalQuestions, difficulty]
  );

  return (
    <div className='bg-gray-50 h-screen'>
      <Header />
      <Topics topicList={topicList} status={status} dispatch={dispatch} />
      <Toaster position='top-right' />
      {status != 'ready' && status != 'onProgress' && (
        <LoadQuiz state={state} dispatch={dispatch} />
      )}
      {status == 'ready' && (
        <StartQuiz subject={subject} totalQuestions={totalQuestions} dispatch={dispatch} />
      )}

      {status == 'onProgress' && (
        <>
          <ProgressBar currentQuestion={index + 1} totalQuestions={totalQuestions} />
          <Questions fetchedQuestion={questionList[index]} dispatch={dispatch} />
        </>
      )}
    </div>
  );
}

export default App;
