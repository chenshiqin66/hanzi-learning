export default function StageSelector({ stages, currentStage, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 p-3 justify-center">
      {stages.map((stage, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className="px-3 py-2 rounded-lg font-medium transition-all duration-200"
          style={{
            backgroundColor: currentStage === index ? stage.color : `${stage.color}20`,
            color: currentStage === index ? 'white' : stage.color,
            border: `2px solid ${stage.color}`,
            fontSize: '14px'
          }}
        >
          {stage.name.replace('第', '').replace('阶段', '')}期
          <span className="ml-1 text-xs opacity-80">
            {stage.chars.length}字
          </span>
        </button>
      ))}
    </div>
  );
}
