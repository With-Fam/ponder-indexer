import { IndexerParams } from "../types";
import trackHypersubSet from "../stack/trackHypersubSet";

const handleHypersubSetEvent = async ({ event, context }: IndexerParams) => {
  await trackHypersubSet({ event, context });
  console.log(
    `Hypersub ${event.args.hypersub} is configured with Party ${event.args.party} in ManageFamAuthority`
  );
};

export default handleHypersubSetEvent;
