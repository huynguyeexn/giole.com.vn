import ListPageComponent from "./component";

export async function generateMetadata() {
  return {
    title: "Tìm kiếm giờ lễ, thông tin nhà thờ.",
    keywords:
      "Tìm giờ lễ, tìm kiếm giờ thánh lễ, giờ lễ, giờ thánh lễ, danh sách nhà thờ",
  };
}

export default async function ListPage() {
  return <ListPageComponent />;
}
