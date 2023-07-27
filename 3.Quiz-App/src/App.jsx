import Header from './Header';
import Topics from './Topics';
import StartQuiz from './StartQuiz';
import LoadQuiz from './LoadQuiz';
import Questions from './Questions';
import toast, { Toaster } from 'react-hot-toast';
import ProgressBar from './ProgressBar';
import Timer from './Timer';
import Results from './Results';
import { useReducer, useEffect } from 'react';

const initialState = {
  status: 'inactive',
  totalQuestions: 10,
  totalCorrectAnswers: 0,
  difficulty: 'Medium',
  index: 0,
  timer: { minutes: 10, seconds: 0 },
  selectedAnswer: -1,
  selectedAnswerId: -1,
  score: 0,
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
    case 'setTimer':
      return { ...state, timer: action.payload };
    case 'setSelectedAnswer':
      return {
        ...state,
        selectedAnswer: action.payload.answer,
        selectedAnswerId: action.payload.answerId,
      };
    case 'questionsFetched':
      return { ...state, status: 'ready', questionList: action.payload };
    case 'moveToNext':
      if (state.index < state.totalQuestions - 1) {
        return { ...state, index: state.index + 1, selectedAnswer: -1, selectedAnswerId: -1 }; //reset
      } else return state;
    case 'decTimer':
      if (state.timer.minutes >= 0) {
        let seconds = state.timer.seconds;
        let minutes = state.timer.minutes;
        seconds = (--seconds + 60) % 60;
        if (seconds == 59) --minutes;
        if (minutes >= 0) return { ...state, timer: { minutes, seconds } };
      }
      return initialState;
    case 'evaluateAnswer':
      if (action.payload.type === 'correct')
        return {
          ...state,
          totalCorrectAnswers: state.totalCorrectAnswers + 1,
          score: state.score + action.payload.score,
        };
      else if (action.payload.type === 'wrong')
        return { ...state, score: state.score - action.payload.score };
      else return state;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    subject,
    difficulty,
    totalQuestions,
    totalCorrectAnswers,
    status,
    questionList,
    index,
    selectedAnswer,
    selectedAnswerId,
    score,
  } = state;
  console.log(state);
  const topicList = [
    'JavaScript',
    'HTML',
    'PHP',
    'Laravel',
    'Linux',
    'DevOps',
    'Docker',
    'Kubernetes',
    'Bash',
  ];
  useEffect(() => {
    if (index == totalQuestions - 1) {
      toast.success('Successfully Submitted the test');
    }
  }, [index]);

  useEffect(
    function () {
      function fetchQuestions(subject, difficulty, totalQuestions) {
        const API =
          'https://quizapi.io/api/v1/questions?apiKey=WYlIxw9u2SWcvgGURDCfTajwLMrrXTR1qYaDrBBg';

        fetch(`${API}&tags=${subject}&difficulty=${difficulty}&limit=${totalQuestions}`)
          .then((response) => response.json())
          .then((data) => {
            if (!data.error && data.length === totalQuestions) {
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
      {status != 'ready' && status != 'onProgress' && status != 'finished' && (
        <LoadQuiz state={state} dispatch={dispatch} />
      )}
      {status == 'ready' && (
        <StartQuiz
          subject={subject}
          totalQuestions={totalQuestions}
          difficulty={difficulty}
          dispatch={dispatch}
        />
      )}

      {status == 'onProgress' && (
        <>
          <ProgressBar currentQuestion={index + 1} totalQuestions={totalQuestions}>
            {/* <Timer state={state} dispatch={dispatch} /> */}
          </ProgressBar>

          <Questions
            totalQuestions={totalQuestions}
            index={index}
            selectedAnswer={selectedAnswer}
            selectedAnswerId={selectedAnswerId}
            fetchedQuestion={questionList[index]}
            dispatch={dispatch}
          />
        </>
      )}
      {status == 'finished' && (
        <Results
          subject={subject}
          difficulty={difficulty}
          totalCorrectAnswers={totalCorrectAnswers}
          totalQuestions={totalQuestions}
          score={score}
        />
      )}
    </div>
  );
}

export default App;
