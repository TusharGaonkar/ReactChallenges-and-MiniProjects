export default function Header() {
  return (
    <header className='bg-gray-50'>
      <div className='mx-auto max-w-screen-xl px-2 py-4 sm:px-6 sm:py-12 lg:px-8'>
        <div className='sm:flex sm:items-center sm:justify-center'>
          <div className='text-center sm:text-left'>
            <h1 className='text-4xl font-bold text-gray-900 sm:text-3xl text-center'>
              The Tech Quiz App!
            </h1>

            <p className='mt-1 text-sm text-gray-500 text-center'>Assess your tech skills now 🎉</p>
          </div>
        </div>
      </div>
    </header>
  );
}
