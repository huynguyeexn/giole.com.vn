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
