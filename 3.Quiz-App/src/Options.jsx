export default function Options({ subject, dispatch }) {
  return (
    <div>
      <input
        type='radio'
        name='subject'
        value={subject}
        id={subject}
        className='peer hidden'
        onChange={(e) => {
          dispatch({ type: 'setSubject', payload: e.target.value });
          dispatch({ type: 'setStatus', payload: 'active' });
        }}
      />

      <label
        htmlFor={subject}
        className='flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white'
      >
        <p className='text-sm font-medium'>{subject}</p>
      </label>
    </div>
  );
}
