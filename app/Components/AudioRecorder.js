"use client";

import { useEffect, useRef, useState } from "react";
const mimeType = "audio/webm";
const AudioRecorder = () => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };
  const checkMicrophonePermission = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: "microphone",
      });

      if (permissionStatus.state === "granted") {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const startRecording = async () => {
    if (audio) setAudio(null);
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };
  const stopRecording = () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };

  useEffect(() => {
    checkMicrophonePermission();
  }, []);
  return (
    <div>
      {/* <h2>Audio Recorder</h2> */}
      <main className="flex items-center gap-2">
        <div className="audio-controls">
          {!permission ? (
            <button
              className="h-10 px-6 font-semibold rounded-md bg-green-600 text-white hover:scale-105 transform transition-all duration-150 ease-in-out hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-white"
              onClick={getMicrophonePermission}
              type="button"
            >
              Get Microphone
            </button>
          ) : null}
          {permission && recordingStatus === "inactive" ? (
            <button
              className="h-10 px-6 font-semibold rounded-md bg-blue-600 text-white hover:scale-105 transform transition-all duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
              onClick={startRecording}
              type="button"
            >
              {audio ? "Record Again" : "Start Recording"}
            </button>
          ) : null}
          {recordingStatus === "recording" ? (
            <button
              className="h-10 px-6 font-semibold rounded-md bg-red-600 text-white hover:scale-105 transform transition-all duration-150 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white"
              onClick={stopRecording}
              type="button"
            >
              Stop Recording
            </button>
          ) : null}
        </div>
        {audio ? (
          <div className="audio-container">
            <audio src={audio} controls></audio>
            {/* <a download href={audio}>
              Download Recording
            </a> */}
            {/* <p>Delete Recording</p> */}
          </div>
        ) : null}
      </main>
    </div>
  );
};
export default AudioRecorder;
