import { cn } from "lib/cn";

export default function Artists({
  artists,
}: {
  artists: { id: string; artistUrl: string; name: string }[];
}) {
  return artists.map((artist, i: number) => (
    <span key={artist.id}>
      <a
        href={artist.artistUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("hover:cursor-ne-resize hover:underline")}
      >
        {artist.name}
      </a>

      {i !== artists.length - 1 && ", "}
    </span>
  ));
}
