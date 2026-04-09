// Web Speech API 封装
// 用于播放汉字发音

const SPEECH_CONFIG = {
  lang: 'zh-CN',
  rate: 0.8,      // 语速稍慢，适合儿童
  pitch: 1.0,    // 音调正常
  volume: 1.0    // 音量最大
};

let lastUtterance = null;

/**
 * 使用Web Speech API播放汉字发音
 * @param {string} text - 要播放的文字
 * @returns {Promise} - 播放完成Promise
 */
export function speak(text) {
  return new Promise((resolve, reject) => {
    // 检查浏览器支持
    if (!('speechSynthesis' in window)) {
      console.warn('Web Speech API not supported');
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // 取消之前的播放
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = SPEECH_CONFIG.lang;
    utterance.rate = SPEECH_CONFIG.rate;
    utterance.pitch = SPEECH_CONFIG.pitch;
    utterance.volume = SPEECH_CONFIG.volume;

    // 尝试选择中文语音
    const voices = window.speechSynthesis.getVoices();
    const chineseVoice = voices.find(v => v.lang.includes('zh') || v.lang.includes('CN'));
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }

    utterance.onend = () => {
      lastUtterance = null;
      resolve();
    };

    utterance.onerror = (event) => {
      lastUtterance = null;
      // 忽略中断错误
      if (event.error !== 'interrupted') {
        reject(event);
      } else {
        resolve();
      }
    };

    lastUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  });
}

/**
 * 停止当前播放
 */
export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * 检查是否正在播放
 */
export function isSpeaking() {
  return 'speechSynthesis' in window && window.speechSynthesis.speaking;
}
