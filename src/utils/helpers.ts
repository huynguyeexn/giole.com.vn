import { Church } from "@/schema/church";
import { CHURCH_TYPE, DIVISION_TYPE } from "./constants";

export const mapDivisionType = (name: string, type: string | number) => {
  if (!name) {
    return "";
  }

  let typeStr = "";

  switch (Number(type)) {
    case DIVISION_TYPE.CITY.CODE:
      typeStr = DIVISION_TYPE.CITY.TEXT;
      break;
    case DIVISION_TYPE.COUNTY.CODE:
      typeStr = DIVISION_TYPE.COUNTY.TEXT;
      break;
    case DIVISION_TYPE.DISTRICT.CODE:
      typeStr = DIVISION_TYPE.DISTRICT.TEXT;
      break;
    case DIVISION_TYPE.PROVINCE.CODE:
      typeStr = DIVISION_TYPE.PROVINCE.TEXT;
      break;
    case DIVISION_TYPE.TOWN.CODE:
      typeStr = DIVISION_TYPE.TOWN.TEXT;
      break;
    default:
      break;
  }

  return `${typeStr} ${name}`.trim();
};

export const mapChurchType = (name: string, type: string | number) => {
  if (!name) {
    return "";
  }

  let typeStr = "";

  switch (Number(type)) {
    case CHURCH_TYPE.CHURCH.CODE:
      typeStr = CHURCH_TYPE.CHURCH.TEXT;
      break;
    default:
      break;
  }

  return `${typeStr} ${name}`.trim();
};

export const mapAddress = (item: Church) => {
  if (!item) {
    return "";
  }

  let districtDivisionType = mapDivisionType(
    item.district.name,
    item.district.division_type
  );

  let provinceDivisionType = mapDivisionType(
    item.province.name,
    item.province.division_type
  );

  const address = item.address ? item.address + ", " : "";

  return `${address}${districtDivisionType}, ${provinceDivisionType}`;
};

export function toUnaccentName(str: string): string {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  return str.toLowerCase();
}

export const toQueryString = (input: { [key: string]: string }): string => {
  const filter = Object.fromEntries(
    Object.entries(input).filter(([_, v]) => !!v)
  );
  return new URLSearchParams(filter).toString();
};
