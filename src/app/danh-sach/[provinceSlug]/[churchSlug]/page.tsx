type Props = {
  params: {
    provinceSlug: string;
    churchSlug: string;
  };
};

export default function ChurchInfoPage({ params }: Props) {
  console.log("province: ", params.provinceSlug);
  console.log("church: ", params.churchSlug);
}
