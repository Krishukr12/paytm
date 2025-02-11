export default function ComingSoon() {
  return (
    <div className="flex items-center justify-center h-150  from-indigo-950 via-slate-900 to-black text-white w-full max-w-3xl mx-auto px-4 ">
      <div className="relative p-8 max-w-md text-center backdrop-blur-sm bg-white/5 rounded-3xl shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-4xl">🚀</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full blur-xl opacity-50"></div>
          </div>
        </div>

        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mt-8">
          Coming Soon
        </h2>

        <p className="mt-4 text-lg text-gray-300 leading-relaxed">
          We&apos;re crafting something amazing for you. Stay tuned for the big
          reveal!
        </p>

        <div className="mt-8">
          <button className="px-8 py-3 text-base font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25">
            Notify Me When Ready
          </button>
        </div>
      </div>
    </div>
  );
}
