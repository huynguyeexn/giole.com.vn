import { CSSProperties } from "react";
import MapBox from "./components/mapBox";
import SearchBox from "./components/searchBox";

const fullScreenStyle: CSSProperties = {
  height: "100svh",
  width: "100svw",
  overflow: "hidden",
  position: "relative",
  backgroundColor: "rgb(240, 242, 245)",
};

export default function Home() {
  return (
    <div style={fullScreenStyle}>
      <MapBox />
      <SearchBox />
    </div>
  );
}
