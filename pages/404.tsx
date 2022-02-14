import Image from "next/image";

export default function WhereYouGoin() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Image src="/404.png" alt="404" height={216} width={216} quality={100} />
      <span className="relative top-[-24px] h-1 w-48 rounded-full bg-gray-900 dark:bg-white" />
      <h2>Oops! This page doesn&apos;t exist.</h2>
    </div>
  );
}
