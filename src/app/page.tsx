import { Box, Heading } from "@radix-ui/themes";
import MapBox from "./components/mapBox";
import ResultBox from "./components/resultBox";
import SearchInput from "./components/searchInput";

export default function Home() {
  return (
    <main className="grid grid-cols-5 h-svh max-h-svh">
      <Box className="col-span-5 md:col-span-2 p-4 h-full max-h-svh">
        <div className="mb-4">
          <Heading>Giờ thánh lễ</Heading>
        </div>
        <SearchInput />
        <Box>
          <ResultBox />
        </Box>
      </Box>
      <Box className="col-span-3 hidden md:block">
        <MapBox />
      </Box>
    </main>
  );
}
