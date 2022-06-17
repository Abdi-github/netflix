import { useAuth } from "../context/AuthContextProvider";
import useSubscription from "./useSubscription";

const route = () => {
  const { user } = useAuth();
  const subs = useSubscription();
  return <div>Enter</div>;
};

export default route;
