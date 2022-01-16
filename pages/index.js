import Head from 'next/head'
// import Link from 'next/link'

export default function Home () {
  return (
    <>
      <Head>
        <title>Plant Tracker</title>
      </Head>

      <main>
        <div className="lg:flex lg:items-center lg:justify-between px-6 py-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Plant Tracker
            </h2>
          </div>

          {/*<div className="mt-5 flex lg:mt-0 lg:ml-4">*/}
          {/*  <span className="hidden sm:block">*/}
          {/*    <Link href="/plants/add">*/}
          {/*      <a className="px-4 py-2 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-600">Add New Plant</a>*/}
          {/*    </Link>*/}
          {/*  </span>*/}
          {/*</div>*/}
        </div>
      </main>
    </>
  )
}
