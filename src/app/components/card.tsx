"use client";
import appServices from "@/services/app";
import { Card, Typography } from "antd";
import { useContext, useEffect, useRef } from "react";
import { HomeContext } from "../context";
import SearchInput from "./form";
import ResultBox from "./result";

const { Title } = Typography;

export default function CardComponent() {
  const isLoading = useRef(true);
  const { actions } = useContext(HomeContext);

  // GET INIT DATA
  useEffect(() => {
    try {
      appServices
        .getHomeInitData()
        .then((data) => {
          actions.updateProvinces(data.provinces);
          actions.updateDistricts(data.districts);
          actions.updateChurches(data.churches);
          actions.updateProvinces(data.provinces);
        })
        .finally(() => {
          isLoading.current = false;
        });
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("-- SearchBox");

  return (
    <Card
      style={{ height: "100%" }}
      loading={isLoading.current}
      title={<Title level={3}>Giờ thánh lễ</Title>}
      bordered={false}
    >
      <SearchInput />
      <ResultBox />
    </Card>
  );
}
