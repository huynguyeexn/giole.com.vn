import HomeContextProvider from "./context";
import HomeComponent from "./components/home";
import appServices from "@/services/app";

export default async function HomePage() {
  const initData = await appServices.getHomeInitData();

  return (
    <HomeContextProvider>
      <HomeComponent initData={initData} />
    </HomeContextProvider>
  );
}
