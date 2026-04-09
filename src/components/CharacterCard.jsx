import { speak } from '../utils/speech';

export default function CharacterCard({ char, pinyin, color, onSpeak }) {
  const handleClick = async () => {
    // 播放发音
    await speak(char);
    // 通知父组件完成
    if (onSpeak) onSpeak(char);
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center justify-center rounded-lg transition-all duration-150 cursor-pointer"
      style={{
        backgroundColor: `${color}15`,
        border: `2px solid ${color}40`,
        minHeight: '60px',
        width: '100%',
        aspectRatio: '1 / 0.9'
      }}
    >
      <span
        className="text-gray-600 font-medium select-none"
        style={{ fontSize: '11px', lineHeight: 1.2 }}
      >
        {pinyin}
      </span>
      <span
        className="text-gray-800 font-bold select-none"
        style={{ fontSize: '20px', lineHeight: 1.3 }}
      >
        {char}
      </span>
    </button>
  );
}
