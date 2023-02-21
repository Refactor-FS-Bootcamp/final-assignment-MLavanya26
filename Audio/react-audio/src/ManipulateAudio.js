import React, { useState } from 'react';

const ManipulateAudio = ({ audioUrl }) => {
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  const handleAudioLoad = event => {
    setAudioDuration(event.target.duration);
    setTrimEnd(event.target.duration);
  };

  const handleTrimStartChange = event => {
    setTrimStart(parseFloat(event.target.value));
  };

  const handleTrimEndChange = event => {
    setTrimEnd(parseFloat(event.target.value));
  };

  const handleSplitClick = () => {
    // TODO: Split the audio at the current time
  };

  const handleDeleteClick = () => {
    // TODO: Delete the selected audio segment
  };

  return (
    <div>
      <input type="range" min={0} max={audioDuration} value={trimStart} step={0.1} onChange={handleTrimStartChange} />
      <input type="range" min={0} max={audioDuration} value={trimEnd} step={0.1} onChange={handleTrimEndChange} />
      <button onClick={handleSplitClick}>Split</button>
      <button onClick={handleDeleteClick}>Delete</button>
      {audioUrl && <audio src={audioUrl} controls onLoadedMetadata={handleAudioLoad} />}
    </div>
  );
};

export default ManipulateAudio