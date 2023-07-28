export default function Difficulty({ status, difficulty, totalQuestions, dispatch }) {
  return (
    <section className='flex space-x-5 flex-wrap'>
      <div className='flex justify-between items-baseline space-x-3'>
        <label htmlFor='HeadlineAct' className='block text-sm font-medium text-gray-900'>
          Difficulty
        </label>

        <select
          name='difficulty'
          id='difficulty'
          className='mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm'
          onChange={(e) => {
            dispatch({ type: 'setDifficulty', payload: e.target.value });
          }}
          defaultValue={difficulty}
          disabled={status == 'ready' || status == 'onProgress' || status == 'finished'}
        >
          <option value='Easy'>Easy</option>
          <option value='Medium'>Medium</option>
          <option value='Hard'>Hard </option>
        </select>
      </div>
      <div className='flex justify-between items-baseline space-x-3'>
        <label htmlFor='HeadlineAct' className='block text-sm font-medium text-gray-900 min-w-max'>
          Total Questions
        </label>

        <select
          name='totalQuestions'
          id='totalQuestions'
          className='mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm'
          onChange={(e) => {
            dispatch({ type: 'setTotalQuestions', payload: Number(e.target.value) });
          }}
          defaultValue={`${totalQuestions}`}
          disabled={status == 'ready' || status == 'onProgress' || status == 'finished'}
        >
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='15'>15</option>
          <option value='20'>20</option>
        </select>
      </div>
    </section>
  );
}
