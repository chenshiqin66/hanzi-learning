import { useState, useEffect } from 'react';
import { stages } from './data/characters';
import StageSelector from './components/StageSelector';
import CharacterGrid from './components/CharacterGrid';
import PageNav from './components/PageNav';

function App() {
  const [currentStage, setCurrentStage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [speakingChar, setSpeakingChar] = useState(null);

  // 当切换阶段时，重置页码
  useEffect(() => {
    setCurrentPage(0);
  }, [currentStage]);

  const stage = stages[currentStage];
  const totalPages = Math.ceil(stage.chars.length / 70);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleCharSpeak = (char) => {
    setSpeakingChar(char);
    setTimeout(() => setSpeakingChar(null), 300);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF8F0' }}>
      {/* 顶部标题栏 */}
      <header
        className="sticky top-0 z-10 shadow-md"
        style={{ backgroundColor: stage.color }}
      >
        <div className="text-center py-4 px-2">
          <h1 className="text-white text-2xl font-bold">
            {stage.name} · {stage.subtitle}
          </h1>
          <p className="text-white text-sm mt-1 opacity-90">
            {stage.range} · 共{stage.chars.length}字
          </p>
        </div>
      </header>

      {/* 阶段选择器 */}
      <StageSelector
        stages={stages}
        currentStage={currentStage}
        onSelect={setCurrentStage}
      />

      {/* 汉字网格 */}
      <main className="max-w-5xl mx-auto">
        <CharacterGrid
          chars={stage.chars}
          color={stage.color}
          page={currentPage}
          onCharSpeak={handleCharSpeak}
        />
      </main>

      {/* 翻页导航 */}
      <PageNav
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        stageColor={stage.color}
      />

      {/* 提示文字 */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>点击汉字卡片即可播放标准普通话发音</p>
        {speakingChar && (
          <p className="mt-2 text-lg font-bold" style={{ color: stage.color }}>
            正在播放: {speakingChar}
          </p>
        )}
      </footer>
    </div>
  );
}

export default App;
