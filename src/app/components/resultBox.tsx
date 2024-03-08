import { mapChurchType, mapDivisionType } from "@/utils/helpers";
import { List, Typography } from "antd";
import { Church } from "../../types/church";
const { Paragraph, Link } = Typography;

type Props = {
  churches: Church[] | [];
};

export default function ResultBox({ churches }: Props) {
  console.log("ResultBox render");
  return (
    <div
      style={{
        marginTop: "16px",
        height: "calc(100svh - 244px)",
        overflow: "hidden",
        overflowY: "scroll",
      }}
    >
      <List
        itemLayout="vertical"
        dataSource={churches || []}
        renderItem={(item) => (
          <List.Item
            title="Nhấn (click) để xem vị trí nhà thờ trên bản đồ"
            key={item.id}
            actions={[<Link key={item.id}>Góp ý thông tin</Link>]}
          >
            <List.Item.Meta
              title={mapChurchType(item.name, item.type)}
              description={mapAddress(item) || ""}
            />
            <Paragraph>
              <ul>
                <li>Ngày thường: {item.normal_day || ""}</li>
                <li>Thứ Bảy: {item.saturday || ""}</li>
                <li>Chúa Nhật: {item.sunday || ""}</li>
              </ul>
            </Paragraph>
          </List.Item>
        )}
      />
    </div>
  );
}

const mapAddress = (item: Church) => {
  if (!item) {
    return "";
  }

  let districtDivisionType = mapDivisionType(
    item.district.name,
    item.district.division_type
  );

  return `${item.address}, ${districtDivisionType}, ${item.province.name}`;
};
