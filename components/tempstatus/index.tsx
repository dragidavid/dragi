import Wrapper from "components/tempstatus/wrapper";
import LastVisitFrom from "components/tempstatus/last-visit-from";

export default async function Status(props: { play?: boolean }) {
  return (
    <Wrapper {...props}>
      <LastVisitFrom />
    </Wrapper>
  );
}
