"use client";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { HomeContext } from "../context";
import SearchBox from "./card";
import MapBox from "./map";

import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";

export default function HomeComponent() {
  const { state, actions } = useContext(HomeContext);

  const [drawerOpen, setDrawer] = useState(false);

  const handleCloseDrawer = () => {
    setDrawer(false);
    actions.selectChurch(undefined);
  };

  useEffect(() => {
    if (state.churchSelected) {
      setDrawer(true);
    }
  }, [state.churchSelected]);

  return (
    <div className={styles.page}>
      <div className={styles.searchWrapper}>
        <SearchBox />
      </div>
      <div
        className={
          styles.mapWrapper + " " + (!drawerOpen ? styles.close : styles.open)
        }
      >
        <div className={styles.mapBoxHeader}>
          <Space>
            <Button
              onClick={handleCloseDrawer}
              type="text"
              icon={<CloseOutlined />}
              size={"large"}
            />
          </Space>
        </div>
        <MapBox />
      </div>
    </div>
  );
}
