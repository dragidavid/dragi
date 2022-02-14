import Image from "next/image";

export default function Bio() {
  return (
    <div className="h-full rounded-3xl bg-white dark:bg-gray-900">
      <div className="absolute bottom-[-10px] right-0">
        <Image
          src={"/hello.png"}
          alt="Hello 👋"
          height={216}
          width={216}
          quality={100}
        />
      </div>
    </div>
  );
}
