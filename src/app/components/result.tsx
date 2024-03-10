import { mapAddress, mapChurchType } from "@/utils/helpers";
import { EnvironmentOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, List, Typography } from "antd";
import { useContext } from "react";
import { HomeContext } from "../context";
import styles from "./styles.module.scss";

const { Paragraph, Text } = Typography;

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
            key={item.id}
            actions={[
              // <Button type="dashed" key={item.id} icon={<InfoCircleOutlined />}>
              //   Góp ý thông tin
              // </Button>,
              <Button
                type="link"
                icon={<EnvironmentOutlined />}
                key={item.id}
                onClick={() => handleSelectChurch(item.id)}
              >
                Xem vị trí trên bản đồ
              </Button>,
            ]}
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
