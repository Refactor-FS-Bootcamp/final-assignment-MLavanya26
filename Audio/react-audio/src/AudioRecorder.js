import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import WaveSurfer from 'wavesurfer.js';
// import 'wavesurfer.js/dist/wavesurfer.css';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [waveSurfer, setWaveSurfer] = useState(null);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = recordedData => {
    console.log('chunk of real-time data is: ', recordedData);
  };

  const onStop = recordedData => {
    console.log('recordedData of onStop: ', recordedData);
    setAudioBlob(recordedData.blob);
    initializeWaveSurfer();
  };

  const initializeWaveSurfer = () => {
    if (waveSurfer) {
      waveSurfer.destroy();
    }

    const options = {
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple',
      cursorWidth: 1,
      barWidth: 3,
      barRadius: 3,
      responsive: true,
      height: 100,
    };

    const waveSurferObj = WaveSurfer.create(options);
    waveSurferObj.loadBlob(audioBlob);

    setWaveSurfer(waveSurferObj);
  };

  const deleteAudio = () => {
    setAudioBlob(null);
    waveSurfer.destroy();
    setWaveSurfer(null);
  };

  const downloadAudio = () => {
    const url = URL.createObjectURL(audioBlob);
    const link = document.createElement('a');
    link.download = 'my-audio.wav';
    link.href = url;
    link.click();
  };

  return (
    <div>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#FFFFFF"
      />
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      {audioBlob && (
        <div>
          <button onClick={downloadAudio}>Download Audio</button>
          <button onClick={deleteAudio}>Delete Audio</button>
          <div id="waveform"></div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;