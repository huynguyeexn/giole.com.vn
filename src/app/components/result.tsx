import { mapChurchType, mapDivisionType } from "@/utils/helpers";
import { List, Typography } from "antd";
import { Church } from "../../types/church";
import { useContext } from "react";

import { HomeContext } from "../context";
import styles from "./styles.module.scss";

const { Paragraph, Link, Text } = Typography;

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

export default function ResultComponent() {
  const { state, actions } = useContext(HomeContext);

  const handleSelectChurch = (id: number) => {
    const church = state.churches.find((c) => c.id === id);
    actions.selectChurch(church);
  };

  console.log("---- ResultBox");
  return (
    <div className={styles.resultBox}>
      <Text type="secondary">
        {state.churches.length} kết quả được tìm thấy
      </Text>
      <List
        loading={state.isSearching}
        itemLayout="vertical"
        dataSource={state.churches || []}
        renderItem={(item) => (
          <List.Item
            onClick={() => handleSelectChurch(item.id)}
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
