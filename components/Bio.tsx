import Image from "next/image";

const Bio = () => {
  return (
    <div className="relative h-full">
      <div className="fixed bottom-0 right-0 h-40 w-40 xl:h-48 xl:w-48">
        <Image
          src={"/hello.png"}
          alt="Hello 👋"
          layout="fill"
          quality={100}
          priority
        />
      </div>
    </div>
  );
};

export default Bio;
