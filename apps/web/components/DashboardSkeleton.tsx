export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mb-8 animate-pulse">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="h-8 bg-gray-200 rounded-full w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-full w-32"></div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm w-full md:w-96">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded-full w-1/3"></div>
                <div className="h-8 bg-gray-200 rounded-full w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 animate-pulse">
        <div className="h-6 bg-gray-200 rounded-full w-48 mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 rounded-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
            </div>
          ))}
        </div>
      </div>

      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded-full w-48 mb-6"></div>
        <div className="bg-white rounded-2xl shadow-sm">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 border-b last:border-b-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded-full w-32"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-24"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-full w-20 ml-auto"></div>
                  <div className="h-3 bg-gray-200 rounded-full w-16 ml-auto"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
}

export default DashboardSkeleton;
