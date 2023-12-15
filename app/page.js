"use client";

import { useState } from "react";
import SelectFood from "./Components/SelectFood";
import SelectRestaurant from "./Components/SelectRestaurant";
import ContactInformation from "./Components/ContactInformation";
import Image from "next/image";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="bg-pink-100 min-h-screen max-h-full relative">
      <div className="bg-pink-200 absolute top-0 h-32 shadow-md shadow-black/10 flex items-center justify-center p-10 w-full overflow-hidden">
        <Image src="/logo.png" width={500} height={500} alt="razro logo" />
      </div>
      <div className="min-h-screen max-h-full flex items-center w-[80vw] mx-auto">
        {/* <h1 className="text-5xl font-bold">Welcome to Resva</h1> */}
        {currentPage === 1 ? (
          <SelectRestaurant setCurrentPage={setCurrentPage} />
        ) : currentPage === 2 ? (
          <SelectFood setCurrentPage={setCurrentPage} />
        ) : currentPage === 3 ? (
          <ContactInformation setCurrentPage={setCurrentPage} />
        ) : (
          <h1>Thank you for your order!</h1>
        )}
      </div>

      {/* <SelectRestaurant /> */}
    </main>
  );
}
