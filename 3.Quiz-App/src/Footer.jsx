export default function Footer() {
  return (
    <footer className='bg-[#D59C57] w-full fixed bottom-0'>
      <div className='mx-auto max-w-screen-xl px-4 py-4 flex justify-between items-center'>
        <p className='text-sm text-slate-100 text-start'>
          💥<b>The Quiz App</b>
          <br />
          by Tushar Gaonkar
        </p>

        <p className='text-center text-sm text-slate-100'>
          <a
            href='https://github.com/TusharGaonkar/ReactChallenges-and-MiniProjects'
            target='__blank'
          >
            Github
          </a>
          <br />
        </p>
      </div>
    </footer>
  );
}
