import { Card, Typography } from "antd";
import SearchInput from "./form";
import ResultBox from "./result";

const { Title } = Typography;

export default function CardComponent() {
  return (
    <Card
      style={{ height: "100%" }}
      title={<Title level={3}>Giờ thánh lễ</Title>}
      bordered={false}
    >
      <SearchInput />
      <ResultBox />
    </Card>
  );
}
