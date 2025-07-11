const CardSkeleton = () => (
  <div className="p-4 border border-gray-200 animate-pulse space-y-4 mb-4">
    <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
    <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
    <div className="h-48 bg-gray-200 rounded"></div>
    <div className="h-10 bg-gray-200 rounded w-1/2"></div>
  </div>
);

export default CardSkeleton;
