type Props = {
  params: {
    provinceSlug: string;
  };
};

export default function ProvinceInfoPage({ params }: Props) {
  console.log("province: ", params.provinceSlug);
}
