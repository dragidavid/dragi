import Wrapper from "components/Status/Wrapper";
import LastVisitFrom from "components/Status/LastVisitFrom";

export default async function Status(props: { play?: boolean }) {
  return (
    <Wrapper {...props}>
      <LastVisitFrom />
    </Wrapper>
  );
}
