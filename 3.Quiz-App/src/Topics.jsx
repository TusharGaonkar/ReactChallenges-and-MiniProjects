import Difficulty from './Difficulty';
import Options from './Options';

export default function Topics({ topicList, status, dispatch }) {
  return (
    <section className='flex flex-col justify-center items-center space-y-3'>
      <div className='flex justify-center'>
        <fieldset className='flex flex-wrap gap-3'>
          <legend className='sr-only'>Subjects</legend>
          {topicList.map((item) => (
            <Options key={item} subject={item} dispatch={dispatch} />
          ))}
        </fieldset>
      </div>
      <Difficulty status={status} dispatch={dispatch} />
    </section>
  );
}
