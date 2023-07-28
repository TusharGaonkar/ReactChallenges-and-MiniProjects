export default function Header() {
  return (
    <header className='bg-gray-50'>
      <div className='mx-auto max-w-screen-xl px-2 py-6'>
        <div className='sm:flex sm:items-center sm:justify-center'>
          <div className='text-center sm:text-left'>
            <div className='flex justify-center items-center space-x-2'>
              <img src='../public/quiz (1).png' className='w-[50px]'></img>
              <h1 className='text-[#000000ff] text-4xl text-center font-heading'>Tech Quiz App!</h1>
            </div>
            <p className='text-sm text-[#D59C57] text-end'>Assess your tech skills now 🤹🏻‍♀️</p>
          </div>
        </div>
        <div className='h-[0.2px] w-full bg-slate-300 mt-8'></div>
      </div>
    </header>
  );
}
