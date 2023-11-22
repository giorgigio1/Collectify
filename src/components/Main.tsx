import Collection from "./Collection";
import MainHeader from "./MainHeader";

const Main = () => {
  console.log("base url", process.env.REACT_APP_BASE_URL);
  return (
    <div>
      <MainHeader />
      <Collection />
    </div>
  );
};

export default Main;
