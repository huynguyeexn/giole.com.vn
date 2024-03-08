"use client";
import useSWR from "swr";
import SearchInput from "./searchInput";
import ResultBox from "./resultBox";
import { Card, Typography } from "antd";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { InitResponse } from "../../types/common";
const { Title } = Typography;

const cardStyle: CSSProperties = {
  height: "calc(100svh - 32px)",
  width: "calc(45svw - 32px)",
  position: "absolute",
  top: 0,
  left: 0,
  margin: "16px",
  zIndex: 10,
};

export default function SearchBox() {
  const { data, isLoading } = useSWR<InitResponse>(`/init`);

  const [churches, setChurches] = useState(data?.churches || []);
  const provinces = data?.provinces || [];
  const districts = data?.districts || [];

  useEffect(() => {
    if (data?.churches) setChurches(data.churches);
  }, [data?.churches]);

  return (
    <>
      <Card
        loading={isLoading}
        title={<Title level={3}>Giờ thánh lễ</Title>}
        bordered={false}
        style={cardStyle}
      >
        <SearchInput
          provinces={provinces}
          districts={districts}
          setChurches={setChurches}
        />
        <ResultBox churches={churches} />
      </Card>
    </>
  );
}
