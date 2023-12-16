"use client";

import { useState } from "react";
import SelectFood from "./Components/SelectFood";
import SelectRestaurant from "./Components/SelectRestaurant";
import ContactInformation from "./Components/ContactInformation";
import Image from "next/image";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [audio, setAudio] = useState(null);

  return (
    <main className="bg-pink-100 h-screen relative flex flex-col gap-4">
      <div className="bg-pink-200 h-32 shadow-md shadow-black/10 flex items-center justify-center w-full overflow-hidden">
        <Image src="/logo.png" width={500} height={500} alt="razro logo" />
      </div>
      <div className="h-[calc(100vh-128px)] flex items-center w-[80vw] mx-auto">
        {/* <h1 className="text-5xl font-bold">Welcome to Resva</h1> */}
        {currentPage === 1 ? (
          <SelectRestaurant setCurrentPage={setCurrentPage} />
        ) : currentPage === 2 ? (
          <SelectFood
            setCurrentPage={setCurrentPage}
            audio={audio}
            setAudio={setAudio}
          />
        ) : currentPage === 3 ? (
          <ContactInformation setCurrentPage={setCurrentPage} audio={audio} />
        ) : (
          <h1>Thank you for your order!</h1>
        )}
      </div>
    </main>
  );
}
