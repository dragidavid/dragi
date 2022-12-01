import { SignalIcon, SignalSlashIcon } from "@heroicons/react/24/solid";

interface PlaybackStatusProps {
  isPlaying: boolean;
}

export default function PlaybackStatus({ isPlaying }: PlaybackStatusProps) {
  if (isPlaying) {
    return (
      <div className="mb-3 flex items-center text-xs font-black uppercase">
        <span>now playing</span>
        <SignalIcon className="ml-2 w-5 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="mb-3 flex items-center text-xs font-black uppercase">
      <span>last played</span>
      <SignalSlashIcon className="ml-2 w-5" />
    </div>
  );
}
