import { CSSProperties } from "react";
import MapBox from "./components/map";
import SearchBox from "./components/card";
import HomeContextProvider from "./context";

const fullScreenStyle: CSSProperties = {
  height: "100svh",
  width: "100svw",
  overflow: "hidden",
  position: "relative",
  backgroundColor: "rgb(240, 242, 245)",
};

export default function Home() {
  console.log("Home");

  return (
    <HomeContextProvider>
      <div style={fullScreenStyle}>
        <MapBox />
        <SearchBox />
      </div>
    </HomeContextProvider>
  );
}
