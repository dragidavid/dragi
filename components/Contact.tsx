const Contact = () => {
  return (
    <div className="relative flex h-full flex-col p-9 transition-all duration-500 md:p-6 xl:p-9">
      <h2 className="text-3xl font-bold">Send me a message 📨</h2>

      <textarea className="dark:highlight-white/5 my-6 h-full w-full resize-none rounded-md p-2 text-sm caret-pink-500 shadow-sm ring-1 ring-slate-900/10 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-slate-800 dark:ring-0 dark:focus:bg-slate-900 dark:focus:ring-2 dark:focus:ring-pink-500" />

      <button type="button" className="h-8 w-[30%]">
        Send!
      </button>
    </div>
  );
};

export default Contact;
