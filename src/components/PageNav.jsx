export default function PageNav({ currentPage, totalPages, onPrev, onNext, stageColor }) {
  return (
    <div className="flex items-center justify-center gap-4 p-3">
      <button
        onClick={onPrev}
        disabled={currentPage === 0}
        className="px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          backgroundColor: stageColor,
          color: 'white'
        }}
      >
        上一页
      </button>

      <span className="text-gray-600 font-medium" style={{ minWidth: '80px', textAlign: 'center' }}>
        {currentPage + 1} / {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage >= totalPages - 1}
        className="px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          backgroundColor: stageColor,
          color: 'white'
        }}
      >
        下一页
      </button>
    </div>
  );
}
