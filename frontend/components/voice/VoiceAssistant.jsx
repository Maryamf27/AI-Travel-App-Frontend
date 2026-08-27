'use client';

import { useEffect, useRef, useState } from 'react';
import { voiceApi } from '@/lib/api';
import { BTN_GRADIENT, BTN_GLOW } from '@/lib/uiTokens';

const STATE_COPY = {
  idle: 'Talk to TravelAI',
  listening: 'Listening…',
  processing: 'Thinking…',
  speaking: 'TravelAI is speaking…',
  error: 'Unable to connect to Voice Assistant',
  'permission-denied': 'Microphone access denied',
};

export default function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState('idle');
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      mediaRecorderRef.current?.stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  async function startListening() {
    setErrorMessage('');
    setTranscript('');
    setReply('');

    if (!navigator.mediaDevices?.getUserMedia) {
      setState('error');
      setErrorMessage('Your browser does not support microphone access.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await sendToVoiceAgent(audioBlob);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setState('listening');
    } catch (err) {
      if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
        setState('permission-denied');
      } else {
        setState('error');
        setErrorMessage(err?.message || 'Could not access the microphone.');
      }
    }
  }

  function stopListening() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      setState('processing');
      mediaRecorderRef.current.stop();
    }
  }

  async function sendToVoiceAgent(audioBlob) {
    try {
      const data = await voiceApi.query(audioBlob);
      setTranscript(data.transcript || '');
      setReply(data.reply || '');

      if (data.audioBase64) {
        setState('speaking');
        const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
        audioRef.current = audio;
        audio.onended = () => setState('idle');
        audio.onerror = () => setState('idle');
        await audio.play();
      } else {
        setState('idle');
      }
    } catch (err) {
      setState('error');
      setErrorMessage(err?.message || 'Something went wrong. Please try again.');
    }
  }

  function handleMicClick() {
    if (state === 'idle' || state === 'error' || state === 'permission-denied') {
      startListening();
    } else if (state === 'listening') {
      stopListening();
    }
  }

  function handleClose() {
    audioRef.current?.pause();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setOpen(false);
    setState('idle');
  }

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Talk to TravelAI"
        className={`fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full ${BTN_GRADIENT} ${BTN_GLOW} flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 ${
          open ? 'hidden' : ''
        }`}
      >
        <MicIcon className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed bottom-5 right-5 z-40 w-76 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-900">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  state === 'error' || state === 'permission-denied'
                    ? 'bg-red-500'
                    : state === 'idle'
                    ? 'bg-zinc-300 dark:bg-zinc-700'
                    : 'bg-emerald-500 animate-pulse'
                }`}
              />
              <span className="text-[13px] font-semibold">Voice Assistant</span>
            </div>
            <button
              onClick={handleClose}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              aria-label="Close voice assistant"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-4 flex flex-col items-center text-center">
            <button
              onClick={handleMicClick}
              disabled={state === 'processing' || state === 'speaking'}
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-200 hover:scale-105 active:scale-95 ${
                state === 'listening'
                  ? 'bg-red-500 animate-pulse'
                  : `${BTN_GRADIENT}`
              } disabled:opacity-60 disabled:hover:scale-100`}
            >
              <MicIcon className="w-7 h-7 text-white" />
            </button>

            <p className="text-[13.5px] font-semibold mb-1">{STATE_COPY[state]}</p>

            {state === 'permission-denied' && (
              <p className="text-[12px] text-zinc-500 dark:text-zinc-400">
                Enable microphone access in your browser settings, then tap the mic to try again.
              </p>
            )}

            {state === 'error' && errorMessage && (
              <p className="text-[12px] text-red-500 dark:text-red-400">{errorMessage}</p>
            )}

            {(transcript || reply) && (
              <div className="w-full mt-3 text-left space-y-2">
                {transcript && (
                  <div className="text-[12.5px] px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">
                    <span className="font-semibold">You: </span>
                    {transcript}
                  </div>
                )}
                {reply && (
                  <div className="text-[12.5px] px-3 py-2 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-zinc-700 dark:text-zinc-200">
                    <span className="font-semibold">TravelAI: </span>
                    {reply}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function MicIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8" />
    </svg>
  );
}
