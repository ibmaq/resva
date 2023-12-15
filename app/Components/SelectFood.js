import Image from "next/image";
import AudioRecorder from "./AudioRecorder";

export default function SelectFood({ setCurrentPage }) {
  return (
    <div className="flex w-full flex-col gap-4 border border-dashed border-neutral-400 rounded-3xl px-4 py-10 bg-white/60">
      <h1 className="text-3xl self-center border-b p-4">Restaurant Menu</h1>
      <div className="flex w-full h-[80vh] relative">
        <Image src="/menu_1.jpg" fill={true} alt="restaurant menu" />
      </div>

      <div className="bg-white fixed bottom-4 h-10 shadow-md shadow-black/30 rounded-lg flex w-[900px] justify-between items-center gap-4 border p-10 self-center">
        <h1 className="text-xl self-center">Place your order</h1>
        <AudioRecorder />
        <button
          className="h-10 px-6 font-semibold rounded-md bg-slate-900 text-white hover:scale-105 transform transition-all duration-150 ease-in-out hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-white"
          onClick={() => setCurrentPage(3)}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
