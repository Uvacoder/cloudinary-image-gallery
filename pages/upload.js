import Head from "next/head";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const CLOUDINARY_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const fileChangeHandler = (event) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImage(onLoadEvent.target.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  const uploadHandler = async () => {
    const formData = new FormData();

    formData.append("file", image);

    formData.append("upload_preset", "image_gallery");
    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    console.log(JSON.stringify(data));
    if (!data.secure_url) {
      alert("Something went wrong");
      return;
    }
    alert("Uploaded");
    setImage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Cloudinary Gallery App| Uploader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {image && (
          <img src={image} alt="Uploaded Image" width="500" height="250" />
        )}
        {!image && (
          <div className="flex w-full items-center justify-center mt-4">
            <label className="w-64 flex flex-col items-center px-4 py-6 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Select a file
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={fileChangeHandler}
              />
            </label>
          </div>
        )}
        {image && (
          <div className="flex w-full  items-center justify-center mt-4">
            <button
              onClick={uploadHandler}
              class="btn btn-wide btn-lg btn-primary mx-2"
            >
              Upload!
            </button>
            <button
              onClick={() => setImage(null)}
              className="btn btn-wide btn-lg btn-secondary mx-2"
            >
              Clear
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
