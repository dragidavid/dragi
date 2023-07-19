import Link from "components/Spotify/Link";

export default function Artists({
  artists,
}: {
  artists: { id: string; artistUrl: string; name: string }[];
}) {
  return artists.map((artist, i: number) => (
    <span key={artist.id}>
      <Link href={artist.artistUrl} label={artist.name} />

      {i !== artists.length - 1 && ", "}
    </span>
  ));
}
