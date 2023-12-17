"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { Pause, Play, Volume1, Volume2, VolumeX } from "lucide-react";
import { Slider } from "./slider";

const Starter = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [status, setStatus] = useState(true);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current && window.location.pathname === "/") {
      setStatus(false);
      audioRef.current.play();
    } else {
      console.log("audioRef.current is not defined");
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const VolumeControl = () => (
    <Slider
      min={0}
      max={1}
      step={0.1}
      className="w-full"
      value={[volume]}
      onValueChange={(value) => setVolume(value[0])}
    />
  );

  const playStop = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        setStatus(false);
        audioRef.current.play();
      } else {
        setStatus(true);
        audioRef.current.pause();
      }
    } else {
      console.log("audioRef.current is not defined");
    }
  };

  return (
    <>
      {window.location.pathname !== "/dashboard" && (
        <div className="absolute top-0 right-0 z-50 mt-4 mr-4 flex gap-6">
          <Button
            onClick={playStop}
            className="
            flex items-center justify-center w-12 gap-2"
          >
            {status ? <Play size={23} /> : <Pause size={23} />}
          </Button>
          <div className="flex items-center justify-center w-40 gap-2">
            {volume === 0 ? (
              <VolumeX size={24} />
            ) : volume < 0.5 ? (
              <Volume1 size={24} />
            ) : (
              <Volume2 size={24} />
            )}
            <VolumeControl />
          </div>
        </div>
      )}
      <audio ref={audioRef} loop src="/audios/trilha.mp3"></audio>
    </>
  );
};

export default Starter;
