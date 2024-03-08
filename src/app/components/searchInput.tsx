import { useDebounce } from "@/hooks/common";
import appServices from "@/services/app";
import provinceServices from "@/services/province";
import { Church } from "@/types/church";
import { mapDivisionType } from "@/utils/helpers";
import { Col, Input, Row, Select } from "antd";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { District } from "../../types/district";
import { Province } from "../../types/province";

type Props = {
  provinces: Province[];
  districts: District[];
  setChurches: Dispatch<SetStateAction<Church[]>>;
};

export default function SearchInput({
  provinces,
  districts: districtInit,
  setChurches,
}: Props) {
  console.log("[1] SearchInput");

  const [districts, setDistricts] = useState(districtInit);
  const [searchInput, setSearchInput] = useState({
    province: -1,
    district: -1,
    name: "",
  });

  const defaultProvince = useMemo(() => {
    if (!provinces) return;
    const id = provinces.find((province: Province) => {
      return province.unaccent_name == "ho chi minh";
    })?.id;

    setSearchInput({
      ...searchInput,
      province: id || -1,
    });

    return id;
  }, [provinces]);

  const handleChangeProvince = useCallback(
    async (provinceId: number) => {
      const response = await provinceServices.getDistrictsByProvinceId(
        provinceId
      );

      setSearchInput({
        ...searchInput,
        province: provinceId,
      });

      if (response?.districts) {
        setDistricts(response.districts);
      }
    },
    [searchInput]
  );

  const handleChangeName = useCallback(
    (name: string) => {
      setSearchInput({
        ...searchInput,
        name,
      });
    },
    [searchInput]
  );

  const handleChaneDistrict = useCallback(
    (districtId: number) => {
      setSearchInput({
        ...searchInput,
        district: districtId,
      });
    },
    [searchInput]
  );

  useEffect(() => {
    console.log(searchInput);
    if (searchInput.name == "") return;
    (async () => {
      const { name, province, district } = searchInput;
      let query = `church=${name}`;

      if (province > 0) {
        query = `${query}&province=${province}`;
      }
      if (district > 0) {
        query = `${query}&district=${district}`;
      }
      const response = await appServices.search(query);
      if (response) {
        setChurches(response);
      }
    })();
  }, [searchInput]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Chọn tỉnh thành..."
          defaultActiveFirstOption={true}
          defaultValue={defaultProvince}
          onChange={handleChangeProvince}
          allowClear={false}
          options={provinces.map((p) => ({
            value: p.id,
            label: p.name,
          }))}
        />
      </Col>
      <Col span={12}>
        <Select
          style={{ width: "100%" }}
          showSearch
          allowClear
          placeholder="Chọn quận huyện..."
          defaultActiveFirstOption={true}
          onChange={handleChaneDistrict}
          optionFilterProp="children"
          options={districts.map((d) => ({
            value: d.id,
            label: mapDivisionType(d.name, d.division_type),
          }))}
        />
      </Col>
      <Col span={24}>
        <NameInput onChange={handleChangeName} />
      </Col>
    </Row>
  );
}

type InputProps = {
  onChange: (value: string) => void;
};
const NameInput = ({ onChange }: InputProps) => {
  const [name, setName] = useState("");
  const searchInputDebound = useDebounce(name, 1000);

  const handleChangeName = useCallback((event: any) => {
    setName(event.target.value);
  }, []);

  useEffect(() => {
    onChange(searchInputDebound);
  }, [searchInputDebound]);

  return (
    <>
      <Input onChange={handleChangeName} placeholder="Tên nhà thờ..."></Input>
    </>
  );
};
