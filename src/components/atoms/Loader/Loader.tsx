import { GridLoader } from "react-spinners";

type Props = {
  color: string;
};

const Loader = ({ color }: Props) => {
  return <GridLoader color={color} />;
};

export default Loader;
