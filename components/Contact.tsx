import { useState } from "react";

const Contact = () => {
  const [isInFocus, setIsInFocus] = useState<boolean>(false);

  console.log(isInFocus);

  return (
    <div className="grid-tile flex flex-col">
      <h1 className="gradient-contact bg-clip-text text-3xl font-bold text-transparent">
        Send me a message
      </h1>

      <textarea
        onFocus={(e) => setIsInFocus(true)}
        onBlur={(e) => setIsInFocus(false)}
        className="dark:highlight-white/5 my-6 h-full w-full resize-none rounded-md p-2 text-sm caret-pink-500 shadow-sm ring-1 ring-slate-900/10 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-slate-800 dark:ring-0 dark:focus:bg-slate-900 dark:focus:ring-2 dark:focus:ring-pink-500"
      />

      <button type="button" className="h-8 w-[30%]">
        Send!
      </button>
    </div>
  );
};

export default Contact;
