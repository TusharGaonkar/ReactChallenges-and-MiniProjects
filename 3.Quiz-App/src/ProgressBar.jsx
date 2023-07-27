export default function ProgressBar({ currentQuestion, totalQuestions, children }) {
  const progress = Math.floor((currentQuestion / totalQuestions) * 100);

  return (
    <div className='w-full flex items-center justify-center space-x-4'>
      <div className='ml-2'>{children}</div>
      <div className='flex-grow bg-gray-200 h-2 rounded-full max-w-sm'>
        <div
          role='progressbar'
          aria-labelledby='ProgressLabel'
          aria-valuenow={progress}
          className='h-2 rounded-full bg-green-400'
          style={{ width: `${progress}%` }}
        />
        <div className='font-bold text-slate-400'>
          {currentQuestion}/{totalQuestions}
        </div>
      </div>
    </div>
  );
}
