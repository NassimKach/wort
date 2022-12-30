import { IconHeart, IconVolume2 } from "@tabler/icons";
import { useState } from "react";
import words from "../data/data";
import toast, { Toaster } from "react-hot-toast";
import Lottie from "lottie-react";
import correctMark from "../assets/green-check.json";
import wrongMark from "../assets/check-mark-x.json";

// shuffle the words

function MainPage() {
  const [progress, setProgress] = useState<number>(0);
  const [steps, setSteps] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<any>(null);
  const [text, setText] = useState<string>("");
  const [data, setData] = useState<any>(words[0].word);
  const [heart, setHeart] = useState<number>(3);
  const [isOver, setIsOver] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text === "") {
      setError(true);
      toast.error("Please enter a word");
    } else if (text === words[steps].translation) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleWiter = () => {
    if (steps <= 19) {
      setSteps(steps + 1);
      setProgress((steps + 1) * 5);
      setData(words[steps + 1].word);
      setIsCorrect(null);
      setText("");
      if (isCorrect === false) {
        setHeart(heart - 1);
        if (heart === 1) {
          setIsOver(true);
          setProgress(0);
        }
      }
    }
  };

  // restart the game

  const handleRestart = () => {
    setSteps(0);
    setProgress(0);
    setIsCorrect(null);
    setText("");
    setData(words[0].word);
    setHeart(3);
    setIsOver(false);
  };

  return (
    <>
      <div
        className="w-[80%] h-[90vh] my-2 mx-auto flex flex-col justify-between items-center"
        style={isOver ? { filter: "blur(3px)" } : { filter: "none" }}
      >
        {/* the progress bar with heart icons*/}
        <div className="w-full">
          <div className="flex justify-between w-full">
            <h1 className="text-2xl font-bold text-[#3E3E3E]">{steps}/20</h1>

            <div className="flex flex-row">
              {Array.from({ length: heart }, (_, i) => (
                <IconHeart
                  key={i}
                  height={"auto"}
                  color={i < heart ? "#F61C1C" : "#E5E7EB"}
                  fill={i < heart ? "#F61C1C" : "#E5E7EB"}
                />
              ))}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
            <div
              className="bg-[#58CC02] h-3 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-[#3E3E3E]">
          Schreiben Sie dies auf Englisch
        </h1>

        {/* paper with speaker */}

        <div className="rounded-2xl flex flex-row gap-2 justify-center items-center border-2 p-2">
          <IconVolume2 color="#1CB0F6" cursor="pointer" fill="#1CB0F6" />
          <h1 className="text-base font-semibold text-[#3E3E3E]">{data}</h1>
        </div>

        {/* input field */}
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-6 w-[60%] m-auto">
            <textarea
              className="w-full h-[40vh] border-2 rounded-lg p-2 focus:outline-none bg-[#F7F7F7] resize-none"
              placeholder="Schreiben Sie hier..."
              value={text}
              onChange={(e) => {
                setText(e.currentTarget?.value);
              }}
            ></textarea>
            <div className="flex w-full justify-between ">
              <button className="bg-[#469e02] rounded-xl border-none outline-offset-4 p-0 cursor-pointer ">
                <span className="block py-[6px] px-[24px] rounded-xl text-lg bg-[#58CC02] text-white translate-y-[-4px] font-medium active:translate-y-[-2px] ">
                  Prüfen
                </span>
              </button>

              {/* if the user is correct or incorrect, the button will change */}
              {isCorrect !== null &&
                (isCorrect ? (
                  <>
                    <Lottie
                      loop={false}
                      animationData={correctMark}
                      style={{ width: "40px" }}
                    />
                    <button
                      className="bg-[#FFA900] rounded-xl border-none cursor-pointer text-white font-medium py-[6px] px-[24px]"
                      onClick={handleWiter}
                    >
                      Witer
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex flex-row justify-center items-center">
                      <Lottie
                        loop={false}
                        animationData={wrongMark}
                        style={{ width: "40px" }}
                      />
                      <p className="font-medium text-[#3E3E3E]">
                        <span className="text-[#F61C1C] font-bold">
                          {words[steps].translation}
                        </span>{" "}
                        ist die richtige Antwort
                      </p>
                    </div>
                    <button
                      className="bg-[#FFA900] rounded-xl border-none cursor-pointer text-white font-medium py-[6px] px-[24px]"
                      onClick={handleWiter}
                    >
                      Witer
                    </button>
                  </>
                ))}
            </div>
          </div>
        </form>
      </div>

      {/* show modal if the game is*/}
      {isOver ? (
        <div
          id="popup-modal"
          className="fixed flex justify-center items-center z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
        >
          <div className="relative w-full h-full max-w-md md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <button
                  data-modal-toggle="popup-modal"
                  onClick={handleRestart}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default MainPage;
