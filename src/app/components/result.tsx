import { mapAddress, mapChurchType } from "@/utils/helpers";
import { EnvironmentOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, List, Space, Typography } from "antd";
import { useContext } from "react";
import { HomeContext } from "../context";
import styles from "./styles.module.scss";

const { Paragraph, Text, Link } = Typography;

export default function ResultComponent() {
  const { state, actions } = useContext(HomeContext);

  const handleSelectChurch = (id: number) => {
    const church = state.churches.find((c) => c.id === id);
    actions.selectChurch(church);
  };

  const handleReportClick = (id: number, name: string) => {
    const formUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || "";
    const paramId = process.env.NEXT_PUBLIC_GOOGLE_FORM_PARAM_CHURCH_ID || "";
    const paramName =
      process.env.NEXT_PUBLIC_GOOGLE_FORM_PARAM_CHURCH_NAME || "";
    if (formUrl === "") return;

    const url = `${formUrl}?entry.${paramId}=${id}&entry.${paramName}=${name}`;
    window.open(url, "_shift");
  };

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
              <Button
                onClick={() => handleReportClick(item.id, item.name)}
                type="dashed"
                key={item.id}
                icon={<InfoCircleOutlined />}
              >
                Góp ý thông tin
              </Button>,
              <Link key={item.id} onClick={() => handleSelectChurch(item.id)}>
                <Space>
                  <EnvironmentOutlined />
                  Xem vị trí trên bản đồ
                </Space>
              </Link>,
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
