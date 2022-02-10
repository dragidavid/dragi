import useSWR from "swr";

import fetcher from "lib/fetcher";

export default function Spotify() {
  const { data } = useSWR("/api/spotify/now-playing", fetcher, {
    refreshInterval: 30000,
  });

  return (
    <div className="container">
      <h2>Spotify card</h2>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
