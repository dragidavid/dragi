import StyledLink from "@/components/styled-link";

import type { Artist } from "@/lib/types";

export default function Artists({ artists }: { artists: Artist[] }) {
  return artists.map(({ id, artistUrl, name }, index) => (
    <span key={id}>
      <StyledLink href={artistUrl} className="decoration-transparent">
        {name}
      </StyledLink>

      {index !== artists.length - 1 && ", "}
    </span>
  ));
}
