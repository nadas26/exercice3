import { useContext } from "react";
import AppContext from "./AppContext";

const Stats = (props) => {
  const {
    state: { coins }
  } = useContext(AppContext);
  return (
    <div>
      <h1>${coins}</h1>
    </div>
  );
};

export default Stats;
