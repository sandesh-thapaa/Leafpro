export default function TenantLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-40 h-16 md:h-20 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="h-5 w-40 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse mx-auto" />
          <div className="h-8 w-64 bg-gray-200 rounded-full animate-pulse mx-auto" />
          <div className="h-5 w-96 bg-gray-200 rounded-full animate-pulse mx-auto" />
        </div>
      </div>
    </div>
  );
}
