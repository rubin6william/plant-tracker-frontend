import Head from 'next/head'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export async function getServerSideProps() {
  const response = await fetch(`http://host.docker.internal:8080/api/plants`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  })

  const plants = await response.json()

  return {
    props: {
      plants
    },
  }
}

export default function Home ({ plants }) {
  return (
    <>
      <Head>
        <title>Plant Tracker</title>
      </Head>

      <main>
        <div className="lg:flex lg:items-center lg:justify-between px-6 py-4 border border-b border-gray-100">
          <div className="flex-1 min-w-0">
            <h1>
              <Link href="/">
                Plant Tracker
              </Link>
            </h1>
          </div>

          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="hidden sm:block">
              <Link href="/plants/add">
                <a className="px-4 py-2 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-600">Add New Plant</a>
              </Link>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start mt-4 px-6">
          {
            plants.map((plant) => (
              <div key={plant.id}
                   className="border border-gray-300 shadow rounded-md px-6 py-4">
                <div className="bg-gray-100 mb-2 rounded">
                  <img className="object-contain h-40 w-full rounded"
                       src={plant.photo}
                       alt={`${plant.name} photo`}/>
                </div>
                <div>Name: <span className="font-bold">{plant.name}</span></div>
                <div>Species: <span className="font-bold">{plant.species}</span></div>
                <div>Watering instructions:
                  <ReactMarkdown>{plant.watering_instructions}</ReactMarkdown>
                </div>
              </div>
            ))
          }
        </div>
      </main>
    </>
  )
}