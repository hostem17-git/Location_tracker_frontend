import "./App.css";
import Map from "./components/Map.jsx";

function App() {
  const sessions = [
    { sessionId: 1 },
    { sessionId: 2 },
    // { sessionId: 3 },
    // { sessionId: 4 },
    // { sessionId: 5 },
    // { sessionId: 6 },
    // { sessionId: 7 },
    // { sessionId: 8 },
    // { sessionId: 9 },
  ];

  return (
    <div className="text-xs sm:text-base flex w-full h-svh max-h-svh justify-center items-center flex-col">
      <div className="flex w-3/4 h-full min-w-96 justify-around items-center flex-col ">
        <div className="flex w-full ">
          <div className="ALL_SESSIONS flex flex-1 bg-purple-300 h-16 justify-center items-center  ">
            <div className=" currentSession text-center border-r-2 p-2 max-w-40 flex-1">
              <span className="font-bold">Current session</span>
              <br />
              Session Id
            </div>
            <div className=" flex max-w-prose overflow-x-scroll">
              {sessions.map((session) => (
                <div className="flex-1 h-full border p-2 min-h-16 min-w-16">
                  <div className="flex-1 flex items-center h-full justify-center cursor-pointer">
                    <h1 className="m-2">{session.sessionId}</h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="bg-green-500 p-2 text-white  hover:outline hover:outline-green-500  hover:bg-white hover:text-green-500">
            Start broadcast
          </button>
        </div>
        <Map />
      </div>
    </div>
  );
}

export default App;
