import { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/Map.jsx";
import { useGeolocated } from "react-geolocated";
import {
  ERROR,
  LIST_SESSIONS,
  MESSAGE,
  START_SESSION,
  STOP_SESSION,
  UPDATE_LOCATION,
} from "./messages/messages.js";

function App() {
  const wsURL = "ws://localhost:8080";

  const [socket, setSocket] = useState();
  const [message, setMessage] = useState();
  const [sessions, setSessions] = useState([
    { sessionId: 1 },
    { sessionId: 2 },
  ]);
  const [currentPosition, setCurrentPosition] = useState();
  const [currentSession, setCurrentSession] = useState({ sessionId: "none" });
  const [mySession, setMySession] = useState();

  const startBroadCast = () => {
    // check prompt
    if (!socket) {
      alert("connection not ready");
      return;
    }

    socket.send(JSON.stringify({ type: START_SESSION }));

    // const id = navigator.geolocation.watchPosition((pos) => {
    //   console.log(pos.coords);
    //   socket.send(
    //     JSON.stringify({
    //       type: UPDATE_LOCATION,
    //       payload: {
    //         latitude: pos.coords.latitude,
    //         longitude: pos.coords.longitude,
    //       },
    //     })
    //   );
    // });
    // console.log(id);
  };
  // Broadcast if my session is set
  useEffect(() => {
    console.log("mysession  ", mySession);
    if (mySession) {
      const id = navigator.geolocation.watchPosition((pos) => {
        console.log(pos.coords);
        socket.send(
          JSON.stringify({
            type: UPDATE_LOCATION,
            payload: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          })
        );
      });
      console.log(id);
    }
  }, [mySession]);

  const showMyLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos.coords);
      const { latitude, longitude } = pos.coords;
      setCurrentPosition([latitude, longitude]);
    });
  };

  const selectSession = (session) => {
    console.log(session);
    console.log(`selecting session - ${session?.sessionId}`);
    setCurrentSession(session);
  };

  const handleMessage = (data) => {
    switch (data?.type) {
      case START_SESSION:
        setCurrentSession({ sessionId: data.payload.sessionId });
        break;
      case STOP_SESSION:
        setCurrentSession({ sessionId: "none" });
        setCurrentPosition(null);
        break;
      case UPDATE_LOCATION:
        setCurrentPosition([payload.latitude, payload.longitude]);
        break;
      case LIST_SESSIONS:
        setSessions(data.payload);
        break;
      case ERROR:
        break;
      case MESSAGE:
        break;
    }
  };

  useEffect(() => {
    const ws = new WebSocket(wsURL);

    ws.onopen = () => {
      console.log("connnected to server");
    };

    ws.onmessage = (data) => {
      console.log("recieved data", JSON.parse(data.data));
      handleMessage(data?.data);
    };

    ws.onclose = () => {
      console.log("server disconnected");
    };

    setSocket(ws);
  }, []);

  // To update data when selected session changes
  useEffect(() => {}, [currentSession]);

  return (
    <div className="text-xs sm:text-base flex w-full h-svh max-h-svh justify-center items-center flex-col">
      <div className="flex w-3/4 h-full min-w-96 justify-around items-center flex-col ">
        <div className="flex w-full ">
          <div className="ALL_SESSIONS flex flex-1 bg-purple-300 h-16 justify-center items-center relative ">
            <div className=" currentSession text-center border-r-2 p-2 max-w-40 flex-1">
              <span className="font-bold ">Current session</span>
              <br />
              {currentSession.sessionId}
            </div>
            <div className=" flex max-w-prose">
              {sessions.map((session, index) => (
                <div
                  key={index}
                  className="flex-1 h-full border p-2 min-h-16 min-w-16"
                  onClick={() => selectSession(session)}
                >
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
          <button
            className="bg-green-500 p-2 text-white  hover:outline hover:outline-green-500  hover:bg-white hover:text-green-500"
            onClick={startBroadCast}
          >
            Start broadcast
          </button>
        </div>
        <div className="flex h-full w-full relative">
          <Map currentPosition={currentPosition} />
          <div
            className="absolute left-2 bottom-2 z-[1000] locationContainer cursor-pointer"
            onClick={showMyLocation}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
