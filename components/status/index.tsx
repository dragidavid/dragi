import Wrapper from "components/status/wrapper";
import LastVisitFrom from "components/status/last-visit-from";

export default async function Status(props: { play?: boolean }) {
  return (
    <Wrapper {...props}>
      <LastVisitFrom />
    </Wrapper>
  );
}
