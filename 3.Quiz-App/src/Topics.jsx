import Difficulty from './Difficulty';
import Options from './Options';

export default function Topics({ topicList, difficulty, totalQuestions, status, dispatch }) {
  return (
    <section className='flex flex-col justify-center items-center space-y-3'>
      <div className='flex justify-center'>
        <fieldset className='flex flex-wrap gap-3'>
          <legend className='sr-only'>Subjects</legend>
          {topicList.map((item) => (
            <Options status={status} key={item} subject={item} dispatch={dispatch} />
          ))}
        </fieldset>
      </div>
      <Difficulty
        status={status}
        difficulty={difficulty}
        totalQuestions={totalQuestions}
        dispatch={dispatch}
      />
    </section>
  );
}
