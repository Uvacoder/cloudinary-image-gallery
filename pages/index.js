import Head from "next/head";
import Image from "next/image";
const cloudinary = require("cloudinary").v2;
import Navbar from "../components/Navbar";
export default function Home({ resources }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Cloudinary Gallery App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="p-4 space-x-4 carousel carousel-center bg-neutral rounded-box mt-4">
          {resources.map((resource, index) => {
            return (
              <div key={`carousel-${index}`} class="carousel-item">
                <Image
                  src={resource.url}
                  alt={resource.public_id}
                  width="852"
                  height="480"
                  class="rounded-box"
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const { resources } = await cloudinary.api.resources({
    type: "upload",
    prefix: "Image Gallery",
    max_results: 100,
  });
  return {
    props: {
      resources,
    },
  };
}
