import dynamic from "next/dynamic";

const NewPlayer = dynamic(() => import("components/Spotify/NewPlayer"), {
  ssr: true,
});

export default function Page() {
  return (
    <div className="h-full w-full p-3">
      <NewPlayer />
    </div>
  );
}
