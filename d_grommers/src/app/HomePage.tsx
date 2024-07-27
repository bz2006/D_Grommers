import Image from "next/image";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import OrderSection from "./Components/OrderSection";


export default function HomePage() {
  return (
    <>
      <Header />
      <Image src={"https://static-vision.s3.ap-south-1.amazonaws.com/Firefly+20240620103708.png"}
        width={500}
        height={200}
        className="w-full h-auto"
        alt="Banner" />
      <Footer />
    </>

  );
}
