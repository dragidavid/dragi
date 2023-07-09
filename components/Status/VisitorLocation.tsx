import { headers } from "next/headers";

export default function VisitorLocation() {
  const headersList = headers();

  console.log(headersList);

  return <span>user location</span>;
}
