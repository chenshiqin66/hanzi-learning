import CharacterCard from './CharacterCard';
import { getPinyin } from '../utils/pinyinDict';

export default function CharacterGrid({ chars, color, page, onCharSpeak }) {
  // 每页70个字符 (14列 x 5行)
  const charsPerPage = 70;
  const startIndex = page * charsPerPage;
  const pageChars = chars.slice(startIndex, startIndex + charsPerPage);

  return (
    <div className="grid grid-cols-14 gap-1 p-2">
      {pageChars.map((char, index) => (
        <CharacterCard
          key={`${startIndex + index}`}
          char={char}
          pinyin={getPinyin(char)}
          color={color}
          onSpeak={onCharSpeak}
        />
      ))}
    </div>
  );
}
