export default function ProgressBar({ currentQuestion, totalQuestions, children }) {
  const progress = Math.floor((currentQuestion / totalQuestions) * 100);

  return (
    <div className='w-full flex items-center justify-center  space-x-4 mt-5'>
      <div className=''>{children}</div>
      <div className='flex-grow bg-gray-200 h-1.5 rounded-full max-w-sm mt-[-20px]'>
        <div
          role='progressbar'
          aria-labelledby='ProgressLabel'
          aria-valuenow={progress}
          className='h-1.5 rounded-full bg-orange-400'
          style={{ width: `${progress}%` }}
        />
        <div className='font-bold text-xs mt-1 text-slate-400'>
          ({currentQuestion}/{totalQuestions})
        </div>
      </div>
    </div>
  );
}
