"use client";
import useSWR from "swr";
import { Card, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { InitResponse } from "../../types/common";
import ResultBox from "./result";
import SearchInput from "./form";
import styles from "./styles.module.scss";
import { HomeContext } from "../context";

const { Title } = Typography;

export default function CardComponent() {
  const { data, isLoading } = useSWR<InitResponse>(`/init`);
  const { actions } = useContext(HomeContext);

  useEffect(() => {
    if (!data) return;

    actions.updateProvinces(data.provinces);
    actions.updateDistricts(data.districts);
    actions.updateChurches(data.churches);
    actions.updateProvinces(data.provinces);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  console.log("-- SearchBox");

  return (
    <div className={styles.searchBox}>
      <Card
        loading={isLoading}
        title={<Title level={3}>Giờ thánh lễ</Title>}
        bordered={false}
      >
        <SearchInput />
        <ResultBox />
      </Card>
    </div>
  );
}
