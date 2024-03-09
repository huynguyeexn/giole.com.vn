import { mapDivisionType, toUnaccentName } from "@/utils/helpers";
import { Col, Form, Input, Row, Select } from "antd";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { HomeContext } from "../context";
import provinceServices from "@/services/province";
import appServices from "@/services/app";

const { Item } = Form;

type FormTypes = { province: number; district: number; name: string };

export default function FormComponent() {
  console.log("---- SearchInput");
  const debounce = useRef<any>(null);
  const [isLoadDistricts, setIsLoadDistricts] = useState<boolean>(false);
  const { state, actions } = useContext(HomeContext);
  const [form] = Form.useForm<FormTypes>();

  const handleChangeProvince = async (value: number) => {
    setIsLoadDistricts(true);
    const response = await provinceServices.getDistrictsByProvinceId(value);
    console.log(response);
    if (response.districts) {
      actions.updateDistricts(response.districts.sort());
      form.setFieldValue("district", undefined);
      setIsLoadDistricts(false);
    }
  };

  const handleChangeForm = (_: any, values: FormTypes) => {
    if (debounce.current) {
      clearTimeout(debounce.current);
    }
    if (!values.name) return;

    debounce.current = setTimeout(async () => {
      console.log("[3] handleChangeForm debounce", values);
      actions.updateSearching(true);
      const { name, province, district } = values;
      let query = `church=${name}`;

      if (province > 0) {
        query = `${query}&province=${province}`;
      }
      if (district > 0) {
        query = `${query}&district=${district}`;
      }
      const response = await appServices.search(query);
      if (response) {
        actions.updateChurches(response);
      }
      actions.updateSearching(false);
    }, 1000);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: number }
  ) => toUnaccentName(option?.label ?? "").includes(toUnaccentName(input));

  return (
    <>
      {state.provinces.length > 0 && (
        <Form
          form={form}
          onValuesChange={handleChangeForm}
          initialValues={{
            province: state?.provinces.find(
              (p) => p.unaccent_name == "ho chi minh"
            )?.id,
          }}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Item name="province" style={{ marginBottom: 0 }}>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Chọn tỉnh thành..."
                  allowClear={false}
                  filterOption={filterOption}
                  onChange={handleChangeProvince}
                  options={state.provinces.map((p) => ({
                    value: p.id,
                    label: p.name,
                  }))}
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item name="district" style={{ marginBottom: 0 }}>
                <Select
                  loading={isLoadDistricts}
                  style={{ width: "100%" }}
                  showSearch
                  allowClear
                  placeholder="Chọn quận huyện..."
                  defaultActiveFirstOption={true}
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={state.districts.map((d) => ({
                    value: d.id,
                    label: mapDivisionType(d.name, d.division_type),
                  }))}
                />
              </Item>
            </Col>
            <Col span={24}>
              <Item name="name" style={{ marginBottom: 0 }}>
                <Input placeholder="Tên nhà thờ..."></Input>
              </Item>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
}
