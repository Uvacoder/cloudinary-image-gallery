import Head from 'next/head'
import Image from 'next/image';
const cloudinary = require('cloudinary').v2;

export default function Home({resources}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Cloudinary Gallery App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mt-4">
          Check out my photos!
        </h1>
        <div class="w-full carousel">
          {resources.map((resource,index) => (
            <div id={`carousel-${index}`}key={index} class="relative w-full pt-20 carousel-item">
            <Image src={resource.url} alt={resource.public_id} width="1920" height="1080" class="w-full"/>
            <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            {index > 0 && <a href={`#carousel-${index - 1}`} class="btn btn-circle">❮</a>}
            {index + 1 < resources.length && <a href={`#carousel-${index + 1}`} class="btn btn-circle">❯</a>}
            </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}


export async function getStaticProps() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  const {resources} = await cloudinary.api.resources({type: 'upload',prefix:"Image Gallery",max_results: 100});
    return {
      props: {
        resources
      }
    }
}