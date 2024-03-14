"use client";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { HomeContext } from "../context";
import SearchBox from "./card";
import MapBox from "./map";

import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { InitResponse } from "@/types/common";
import { MapProvider } from "react-map-gl";

type Props = {
  initData: InitResponse;
};

export default function HomeComponent({ initData }: Props) {
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

  useEffect(() => {
    try {
      actions.updateProvinces(initData.provinces);
      actions.updateDistricts(initData.districts);
      actions.updateChurches(initData.churches);
      actions.updateProvinces(initData.provinces);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initData]);

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
              type={"text"}
              icon={
                <CloseOutlined
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              }
              size={"large"}
            />
          </Space>
        </div>
        <MapProvider>
          <MapBox />
        </MapProvider>
      </div>
    </div>
  );
}
