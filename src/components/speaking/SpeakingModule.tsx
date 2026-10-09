import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Award,
  ChevronRight,
  Info,
  ListOrdered,
  ChevronLeft
} from 'lucide-react';
import { SpeakingLesson } from '../../types';
import { audioService } from '../../services/audioService';
import {
  speechRecognitionService,
  SpeechComparison
} from '../../services/speechRecognitionService';
import { storageService } from '../../services/storageService';

interface SpeakingModuleProps {
  lesson: SpeakingLesson;
}

export const SpeakingModule: React.FC<SpeakingModuleProps> = ({ lesson }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  const [spokenText, setSpokenText] = useState('');
  const [comparison, setComparison] = useState<SpeechComparison | null>(null);
  const [isPlayingSample, setIsPlayingSample] = useState(false);
  const [mode, setMode] = useState<'practice' | 'conversation'>('practice');
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [itemScores, setItemScores] = useState<Record<number, number>>({});

  // Determine current active item
  const items =
    lesson.items && lesson.items.length > 0
      ? lesson.items
      : [
          {
            id: 'default-sp-1',
            title: 'Phát âm chuẩn câu mẫu',
            targetSentence: lesson.targetSentence,
            ipa: lesson.ipa,
            stressGuide: lesson.stressGuide,
            meaningVi: lesson.meaningVi,
            topic: lesson.topic
          }
        ];

  const activeItem = items[activeItemIndex] || items[0];

  // AI Topic Conversation State
  const [selectedTopic, setSelectedTopic] = useState('School');
  const [convoHistory, setConvoHistory] = useState<
    { sender: 'ai' | 'user'; text: string }[]
  >([
    {
      sender: 'ai',
      text: 'Hello! I am your AI speaking partner. What is your favourite subject at school and why do you like it?'
    }
  ]);
  const [userConvoReply, setUserConvoReply] = useState('');
  const [isAiReplying, setIsAiReplying] = useState(false);

  useEffect(() => {
    // Check mic permission on mount
    if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setHasMicPermission(true);
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch(() => {
          setHasMicPermission(false);
        });
    }
  }, []);

  // When lesson changes, reset
  useEffect(() => {
    setActiveItemIndex(0);
    setSpokenText('');
    setComparison(null);
    setItemScores({});
  }, [lesson]);

  const handleSelectItem = (index: number) => {
    if (isRecording) {
      speechRecognitionService.stopListening();
      setIsRecording(false);
    }
    setActiveItemIndex(index);
    setSpokenText('');
    setComparison(null);
  };

  const handleRequestMic = async () => {
    const granted = await speechRecognitionService.requestMicrophonePermission();
    setHasMicPermission(granted);
    if (!granted) {
      alert('Vui lòng bật quyền truy cập Micro trên thanh địa chỉ trình duyệt để luyện nói.');
    }
  };

  const handlePlaySampleAudio = (textToPlay: string) => {
    setIsPlayingSample(true);
    audioService.speak(textToPlay, {
      rate: 0.9,
      accent: 'en-US',
      onEnd: () => setIsPlayingSample(false),
      onError: () => setIsPlayingSample(false)
    });
  };

  const handleStartSpeaking = () => {
    if (!speechRecognitionService.isSupported()) {
      alert('Trình duyệt chưa hỗ trợ Web Speech API. Hãy sử dụng Chrome hoặc Edge trên máy tính/điện thoại.');
      return;
    }

    setSpokenText('');
    setComparison(null);
    setIsRecording(true);

    speechRecognitionService.startListening({
      lang: 'en-US',
      onResult: (res) => {
        setSpokenText(res.transcript);
        if (res.isFinal) {
          handleEvaluateSpeech(res.transcript);
        }
      },
      onError: (err) => {
        setIsRecording(false);
        console.warn('Speech error:', err);
      },
      onEnd: () => {
        setIsRecording(false);
      }
    });
  };

  const handleStopSpeaking = () => {
    speechRecognitionService.stopListening();
    setIsRecording(false);
    if (spokenText) {
      handleEvaluateSpeech(spokenText);
    }
  };

  const handleEvaluateSpeech = (transcript: string) => {
    setIsRecording(false);
    const result = speechRecognitionService.compareSpeech(
      transcript,
      activeItem.targetSentence
    );
    setComparison(result);

    // Save score
    setItemScores((prev) => ({
      ...prev,
      [activeItemIndex]: result.score
    }));

    if (result.score >= 7.0) {
      storageService.updateXP(25);
    }
  };

  // Conversation AI Reply
  const handleSendConvoReply = async () => {
    if (!userConvoReply.trim() || isAiReplying) return;

    const userMsg = userConvoReply.trim();
    const updatedHistory = [...convoHistory, { sender: 'user' as const, text: userMsg }];
    setConvoHistory(updatedHistory);
    setUserConvoReply('');
    setIsAiReplying(true);

    try {
      const res = await fetch('/api/ai/conversation-partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedTopic,
          userMessage: userMsg,
          history: updatedHistory
        })
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || "That's very interesting! Can you tell me more about it?";
        setConvoHistory([...updatedHistory, { sender: 'ai' as const, text: replyText }]);
        // Speak AI response
        audioService.speak(replyText, { rate: 0.95 });
        storageService.updateXP(15);
      } else {
        // Fallback
        const fallback = "Great answer! What else do you enjoy doing in your free time?";
        setConvoHistory([...updatedHistory, { sender: 'ai' as const, text: fallback }]);
        audioService.speak(fallback, { rate: 0.95 });
      }
    } catch {
      const fallback = "I understand! That sounds really nice. How often do you do that?";
      setConvoHistory([...updatedHistory, { sender: 'ai' as const, text: fallback }]);
      audioService.speak(fallback, { rate: 0.95 });
    } finally {
      setIsAiReplying(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-wider mb-1">
            <span>Kỹ năng Luyện Nói & Phát Âm</span>
            <span aria-hidden="true">·</span>
            <span>Lớp {lesson.grade} - Unit {lesson.unit}</span>
            <span aria-hidden="true">·</span>
            <span>{items.length} câu luyện tập</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{lesson.title}</h2>
        </div>

        {/* Mode switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setMode('practice')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'practice' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Luyện {items.length} câu phát âm
          </button>
          <button
            onClick={() => setMode('conversation')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'conversation' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Hội thoại AI ({selectedTopic})
          </button>
        </div>
      </div>

      {/* Mic Permission Alert */}
      {hasMicPermission === false && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-xs text-amber-900">
              <strong>Microphone chưa được cấp quyền:</strong> Hãy bấm "Cho phép Micro" để sử dụng tính năng nhận diện giọng nói.
            </div>
          </div>
          <button
            onClick={handleRequestMic}
            className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-semibold text-xs hover:bg-amber-700 transition-colors shrink-0"
          >
            Cho phép Micro
          </button>
        </div>
      )}

      {mode === 'practice' ? (
        <>
          {/* Item Selector List / Carousel */}
          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Danh sách câu luyện nói ({items.length} câu)
                </span>
              </div>
              <span className="text-2xs text-slate-500 font-medium">
                Đang luyện: <strong>Câu {activeItemIndex + 1} / {items.length}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {items.map((item, idx) => {
                const isSelected = activeItemIndex === idx;
                const score = itemScores[idx];
                return (
                  <button
                    key={item.id || idx}
                    onClick={() => handleSelectItem(idx)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50 text-purple-950 ring-2 ring-purple-600/20'
                        : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-2xs mb-1 font-bold">
                      <span className={isSelected ? 'text-purple-700' : 'text-slate-500'}>
                        Câu {idx + 1}
                      </span>
                      {score !== undefined && (
                        <span
                          className={`px-1.5 py-0.5 rounded text-3xs ${
                            score >= 8
                              ? 'bg-emerald-100 text-emerald-800'
                              : score >= 6
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {score}đ
                        </span>
                      )}
                    </div>
                    <div className="text-2xs font-semibold truncate leading-tight">
                      {item.title || item.topic}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Practice Card */}
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Câu mẫu {activeItemIndex + 1}/{items.length}:
                  </span>
                  <span className="text-2xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    {activeItem.title || activeItem.topic}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  "{activeItem.targetSentence}"
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="font-mono text-indigo-600 font-medium">{activeItem.ipa}</span>
                  <span aria-hidden="true" className="text-slate-300">
                    ·
                  </span>
                  <span className="text-slate-600 text-xs">{activeItem.meaningVi}</span>
                </div>
              </div>

              {/* Sample playback button */}
              <button
                onClick={() => handlePlaySampleAudio(activeItem.targetSentence)}
                disabled={isPlayingSample}
                className="p-3.5 rounded-2xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors shrink-0 shadow-2xs active:scale-95"
                title="Nghe phát âm chuẩn mẫu"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            {/* Stress Guide Card */}
            {activeItem.stressGuide && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Hướng dẫn trọng âm & ngữ điệu:</strong> {activeItem.stressGuide}
                </div>
              </div>
            )}

            {/* Microphone Recording Center */}
            <div className="pt-4 flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                {isRecording && (
                  <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping pointer-events-none" />
                )}
                <button
                  onClick={isRecording ? handleStopSpeaking : handleStartSpeaking}
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${
                    isRecording
                      ? 'bg-rose-500 text-white shadow-rose-500/30 ring-4 ring-rose-200'
                      : 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-purple-500/30 hover:scale-105'
                  }`}
                  title={isRecording ? 'Bấm để dừng và chấm điểm' : 'Bấm để bắt đầu nói'}
                >
                  {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>
              </div>

              <div className="text-center">
                <span className="text-sm font-semibold text-slate-800">
                  {isRecording ? 'Đang lắng nghe giọng của bạn...' : 'Bấm micro và đọc to câu mẫu'}
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Nói rõ ràng từng âm, giữ micro cách miệng 15-20cm.
                </p>
              </div>
            </div>

            {/* Live recognized text transcript */}
            {spokenText && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                  Trình duyệt nhận diện được:
                </span>
                <p className="text-base font-medium text-slate-900 italic">"{spokenText}"</p>
              </div>
            )}

            {/* Quick Next/Prev controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => handleSelectItem(Math.max(0, activeItemIndex - 1))}
                disabled={activeItemIndex === 0}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Câu trước</span>
              </button>

              <button
                onClick={() => handleSelectItem(Math.min(items.length - 1, activeItemIndex + 1))}
                disabled={activeItemIndex === items.length - 1}
                className="flex items-center gap-1 text-xs font-semibold text-purple-700 hover:text-purple-900 disabled:opacity-40"
              >
                <span>Câu tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Assessment & Feedback Results */}
          {comparison && (
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Kết quả đánh giá phát âm (Câu {activeItemIndex + 1})</h4>
                  <p className="text-xs text-slate-500">Phân tích âm học và độ chính xác từ vựng theo GDPT 2018</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-purple-700">
                      {comparison.score} / 10
                    </div>
                    <span className="text-2xs font-semibold text-slate-500">
                      Độ chính xác: {comparison.accuracy}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Word-by-word Breakdown */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Chi tiết từng từ trong câu:
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {comparison.wordStatuses.map((item, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${
                        item.status === 'correct'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {item.word} {item.status === 'correct' ? '✓' : '✗'}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tips & Recommendations */}
              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-800 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Lời khuyên của chuyên gia:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-purple-950">
                  {comparison.tipsVi.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    setSpokenText('');
                    setComparison(null);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Thử phát âm lại</span>
                </button>

                {activeItemIndex < items.length - 1 ? (
                  <button
                    onClick={() => handleSelectItem(activeItemIndex + 1)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-xs transition-colors"
                  >
                    <span>Luyện tiếp câu {activeItemIndex + 2}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Conversation Mode */
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Luyện hội thoại với AI (Roleplay)</h3>
              <p className="text-xs text-slate-500">Đối đáp tự nhiên, phát âm mẫu và nhận phản hồi tức thì.</p>
            </div>

            {/* Topic selector */}
            <div className="flex flex-wrap items-center gap-1.5">
              {['School', 'Family', 'Hobbies', 'Environment', 'Travel', 'Technology'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    selectedTopic === t ? 'bg-purple-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation history bubble stream */}
          <div className="space-y-4 max-h-96 overflow-y-auto p-4 rounded-2xl bg-slate-50 border border-slate-100">
            {convoHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl text-xs max-w-[80%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white font-medium rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-900 rounded-tl-none shadow-2xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => handlePlaySampleAudio(msg.text)}
                      className="mt-2 flex items-center gap-1 text-2xs text-purple-700 font-semibold hover:underline"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe phát âm</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isAiReplying && (
              <div className="flex items-center gap-2 text-xs text-purple-600 italic">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>AI đang suy nghĩ câu trả lời...</span>
              </div>
            )}
          </div>

          {/* User speech or text input for conversation */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={userConvoReply}
              onChange={(e) => setUserConvoReply(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendConvoReply()}
              placeholder="Gõ hoặc nói câu trả lời của bạn..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
            <button
              onClick={handleSendConvoReply}
              disabled={!userConvoReply.trim() || isAiReplying}
              className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-xs transition-colors disabled:opacity-50"
            >
              Gửi trả lời
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
