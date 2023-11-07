import StyledLink from "components/styled-link";

import { type Artist } from "lib/types";

export default function Artists({ artists }: { artists: Artist[] }) {
  return artists.map(({ id, artistUrl, name }, index) => (
    <span key={id} className="text-secondary">
      <StyledLink href={artistUrl} label={name} />

      {index !== artists.length - 1 && ", "}
    </span>
  ));
}
