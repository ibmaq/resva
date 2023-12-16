import Image from "next/image";

export default function SelectRestaurant({ setCurrentPage }) {
  const restaurantData = [
    {
      id: 1,
      name: "Delicious Bites",
      cuisine: "Italian",
      location: "Islamabad",
      image: "rest-dummy.jpg",
    },
    {
      id: 2,
      name: "Spicy Haven",
      cuisine: "Mexican",
      location: "Islamabad",
      image: "rest-dummy.jpg",
    },
    {
      id: 3,
      name: "Sushi Delight",
      cuisine: "Japanese",
      location: "Islamabad",
      image: "rest-dummy.jpg",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-4 border border-dashed border-neutral-400 rounded-3xl px-4 py-10 bg-white/60">
      <h1 className="text-3xl self-center border-b p-4">Select a restaurant</h1>
      <div className="grid grid-cols-2 gap-4 p-4">
        {restaurantData.map((restaurant, idx) => (
          <div className="flex border rounded-md bg-white" key={idx * 1000}>
            <div className="flex-none w-48 relative">
              <Image
                src={`/${restaurant.image}`}
                width={400}
                height={200}
                alt={restaurant.name}
              />
            </div>
            <form className="flex flex-col w-full p-4 justify-between">
              <div>
                <h1 className="flex-auto text-2xl font-semibold">
                  {restaurant.name}
                </h1>
                <p className="w-full flex-none text-sm font-medium">
                  {restaurant.location}
                </p>
              </div>
              <div className="flex space-x-4 text-sm font-medium">
                <div className="flex-auto flex space-x-4">
                  <button
                    className="h-10 px-6 font-semibold rounded-md bg-pink-600 text-white hover:scale-105 transform transition-all duration-150 ease-in-out hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 focus:ring-offset-white"
                    type="submit"
                    onClick={() => setCurrentPage(2)}
                  >
                    View Menu
                  </button>
                  {/* <button
                    className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                    type="button"
                  >
                    Add to bag
                  </button> */}
                </div>
                {/* <button
                  className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
                  type="button"
                  aria-label="Like"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    />
                  </svg>
                </button> */}
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
