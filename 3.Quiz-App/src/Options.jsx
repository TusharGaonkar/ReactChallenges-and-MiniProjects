export default function Options({ status, subject, dispatch }) {
  return (
    <div>
      <input
        type='radio'
        name='subject'
        value={subject}
        id={subject}
        className='peer hidden'
        onChange={() => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'setSubject', payload: subject });
          dispatch({ type: 'setStatus', payload: 'active' });
        }}
        disabled={status === 'onProgress'}
      />

      <label
        htmlFor={subject}
        className='flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-[#498888] peer-checked:text-white'
      >
        <p className='text-sm font-regular'>{subject}</p>
      </label>
    </div>
  );
}
