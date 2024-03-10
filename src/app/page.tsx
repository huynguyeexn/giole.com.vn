import HomeContextProvider from "./context";
import HomeComponent from "./components/home";

export default function HomePage() {
  return (
    <HomeContextProvider>
      <HomeComponent />
    </HomeContextProvider>
  );
}
