export default function MapBox() {
  console.log("MapBox render");
  return (
    <>
      <iframe
        style={{ height: "100%", width: "100%" }}
        src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>
    </>
  );
}
