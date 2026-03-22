import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Video, VideoOff, Monitor, BarChart, CheckCircle2, X, MessageSquare, Settings, Volume2, Home, Pause, Play, BookOpen, Info, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage, InterviewerPersona } from '../types';

interface InterviewRoomProps {
  onEnd: () => void;
  onBackToHome: () => void;
  persona: InterviewerPersona;
  skipTraining?: boolean;
}

// Extend Window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function InterviewRoom({ onEnd, onBackToHome, persona, skipTraining = false }: InterviewRoomProps) {
  const [isMicActive, setIsMicActive] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isUserReady, setIsUserReady] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isEnded, setIsEnded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTraining, setIsTraining] = useState(!skipTraining);
  const [showChat, setShowChat] = useState(false);
  const [showEtiquette, setShowEtiquette] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [aiRealtimeSummary, setAiRealtimeSummary] = useState({
    highlights: '正在分析您的表现...',
    suggestions: '等待面试开始...'
  });
  
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Camera Access Logic
  useEffect(() => {
    const startCamera = async () => {
      if (isCameraActive && !isEnded) {
        try {
          setCameraError(null);
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: "user"
            }, 
            audio: false 
          });
          
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            try {
              await videoRef.current.play();
            } catch (playError) {
              console.warn("Auto-play failed, user interaction might be needed:", playError);
            }
          }
        } catch (err: any) {
          console.error("Error accessing camera:", err);
          setCameraError(err.message || "无法访问摄像头");
          setIsCameraActive(false);
        }
      } else {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraActive, isEnded]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'zh-CN';

      recognitionRef.current.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        setInterimTranscript(interim);

        if (final) {
          handleUserSpeech(final);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Start/Stop recognition based on mic state
  useEffect(() => {
    if (isMicActive && recognitionRef.current && !isEnded && !isPaused) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Recognition already started');
      }
    } else if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, [isMicActive, isEnded, isPaused]);

  // Handle pause state for speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      if (isPaused) {
        window.speechSynthesis.pause();
      } else {
        window.speechSynthesis.resume();
      }
    }
  }, [isPaused]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Start interview when user is ready
  useEffect(() => {
    if (isUserReady && messages.length === 0) {
      const greeting: ChatMessage = {
        role: 'ai',
        content: persona.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([greeting]);
      
      // Speak the greeting
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(persona.greeting);
        utterance.lang = 'zh-CN';
        window.speechSynthesis.speak(utterance);
      }

      // Initial AI Summary
      setAiRealtimeSummary({
        highlights: '面试已开始，正在实时监测您的表现。',
        suggestions: '保持微笑，直视摄像头。'
      });
    }
  }, [isUserReady, persona.greeting, messages.length]);

  const handleUserSpeech = (text: string) => {
    const newMessage: ChatMessage = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInterimTranscript('');

    // Simulate AI response
    setIsAiSpeaking(true);
    setTimeout(() => {
      const aiText = '很好。让我们先从你的背景开始。你能告诉我一次你与同事处理困难情况的经历吗？';
      const aiResponse: ChatMessage = {
        role: 'ai',
        content: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsAiSpeaking(false);

      // Update AI Summary silently
      setAiRealtimeSummary({
        highlights: '逻辑条理清晰，能够准确回答面试官的问题。',
        suggestions: '可以尝试加入更多具体的项目数据来增强说服力。'
      });

      // Speak the AI response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiText);
        utterance.lang = 'zh-CN';
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    }, 2000);
  };

  const handleBackToHome = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    onBackToHome();
  };

  const handleEndInterview = () => {
    setIsEnded(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    // Stop all media tracks immediately
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setIsMicActive(false);
    onEnd();
  };

  return (
    <div className="h-screen w-full bg-corporate-50 flex flex-col overflow-hidden text-corporate-900 font-sans relative">
      {/* Training Modal Overlay */}
      <AnimatePresence>
        {isTraining && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-corporate-900/40 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-3xl rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border-4 border-corporate-100"
            >
              <div className="p-8 border-b border-corporate-100 flex justify-between items-center bg-corporate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-corporate-600 rounded-2xl flex items-center justify-center shadow-lg shadow-corporate-200">
                    <BookOpen className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-corporate-900">面试礼仪培训</h3>
                    <p className="text-xs text-corporate-500 font-bold">在开始面试前，让我们先了解一些基本礼仪</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-corporate-50 rounded-3xl border-2 border-white shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-xl bg-corporate-100 flex items-center justify-center">
                        <Info className="w-4 h-4 text-corporate-600" />
                      </div>
                      <h4 className="font-black text-corporate-800">着装与环境</h4>
                    </div>
                    <ul className="space-y-3 text-sm text-corporate-600 font-bold">
                      <li>• 选择商务休闲或正式着装。</li>
                      <li>• 确保背景整洁，光线充足。</li>
                      <li>• 保持安静的环境，避免干扰。</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-corporate-50 rounded-3xl border-2 border-white shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-xl bg-corporate-100 flex items-center justify-center">
                        <Info className="w-4 h-4 text-corporate-600" />
                      </div>
                      <h4 className="font-black text-corporate-800">沟通与表现</h4>
                    </div>
                    <ul className="space-y-3 text-sm text-corporate-600 font-bold">
                      <li>• 保持微笑，眼神平视摄像头。</li>
                      <li>• 语速适中，逻辑清晰。</li>
                      <li>• 积极倾听，不要随意打断。</li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 bg-corporate-100/30 rounded-3xl border-2 border-corporate-100">
                  <h4 className="text-xs font-black text-corporate-800 mb-4 uppercase tracking-widest">AI 提示</h4>
                  <p className="text-sm text-corporate-700 font-bold leading-relaxed italic">
                    “在视频面试中，眼神交流意味着直视摄像头，而不是屏幕上的面试官。这会给对方一种你正在与他进行眼神交流的感觉。”
                  </p>
                </div>
              </div>
              <div className="p-8 bg-corporate-50/50 border-t border-corporate-100 flex justify-end gap-4">
                <button 
                  onClick={() => setIsTraining(false)}
                  className="px-10 py-3 bg-corporate-600 text-white rounded-full font-black hover:bg-corporate-700 transition-all shadow-lg shadow-corporate-200 active:scale-95"
                >
                  我已知晓
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Top Navigation Bar */}
      <header className="h-16 px-8 flex items-center justify-between bg-white/60 backdrop-blur-md border-b border-corporate-100 z-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBackToHome}
            className="p-2.5 hover:bg-corporate-100 rounded-xl transition-all text-corporate-600 active:scale-90"
            title="返回主页"
          >
            <Home className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-corporate-200"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-corporate-400 uppercase tracking-[0.2em]">正在进行中</span>
            <span className="text-sm font-black text-corporate-900">{persona.name} - 模拟面试</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowEtiquette(true)}
            className="flex items-center gap-2 px-4 py-2 bg-corporate-100 text-corporate-700 rounded-full text-xs font-black hover:bg-corporate-200 transition-all active:scale-95"
          >
            <BookOpen className="w-4 h-4" />
            面试礼仪
          </button>
        </div>
      </header>

      {/* Main Video Area */}
      <main className="flex-1 relative p-6 flex flex-col min-h-0">
        {/* Video Feeds Row */}
        <div className="grid grid-cols-2 gap-6 h-full">
          {/* Interviewer Feed */}
          <div className="relative rounded-[2.5rem] overflow-hidden bg-corporate-100 shadow-xl border-4 border-white">
            <img 
              alt={persona.name} 
              className={`w-full h-full object-cover transition-all duration-500 ${isPaused ? 'grayscale opacity-50 scale-105' : 'grayscale-0 opacity-100 scale-100'}`} 
              src={persona.image}
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-corporate-200 shadow-sm">
              <div className={`w-2.5 h-2.5 bg-corporate-600 rounded-full ${isPaused ? '' : 'animate-pulse'}`}></div>
              <span className="text-xs font-bold text-corporate-800">面试官 ({persona.roleDescription})</span>
            </div>
            
            {/* AI Speaking Indicator */}
            {isAiSpeaking && !isPaused && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-corporate-400/90 backdrop-blur-xl px-8 py-4 rounded-3xl border-2 border-white shadow-xl">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map(i => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-5 bg-corporate-900 rounded-full animate-voice-bar animation-delay-${i * 100}`}
                      style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                    ></div>
                  ))}
                </div>
                <span className="text-sm font-black text-corporate-900">面试官正在发言...</span>
              </div>
            )}

            {/* Ready Button Overlay Removed - Integrated into Footer */}

            {/* Subtitles Overlay */}
            {(interimTranscript || messages[messages.length - 1]?.role === 'ai') && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 text-center">
                <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-2xl border-2 border-corporate-100 inline-block shadow-lg">
                  <p className="text-lg font-bold leading-relaxed text-corporate-900">
                    {interimTranscript || (messages[messages.length - 1]?.role === 'ai' ? messages[messages.length - 1].content : '')}
                  </p>
                </div>
              </div>
            )}
            
            {/* Pause Overlay Removed - Integrated into Footer and Visual Grayscale */}
          </div>

          {/* Candidate Feed */}
          <div className="relative rounded-[2.5rem] overflow-hidden bg-corporate-200 shadow-xl border-4 border-white">
            <div className={`w-full h-full ${isCameraActive ? 'block' : 'hidden'}`}>
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted
                className="w-full h-full object-cover mirror-mode"
              />
            </div>
            
            {!isCameraActive && (
              <div className="w-full h-full flex items-center justify-center bg-corporate-100">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
                    <VideoOff className="w-6 h-6 text-corporate-300" />
                  </div>
                  <button 
                    onClick={() => setIsCameraActive(true)}
                    className="text-[10px] font-black bg-corporate-600 text-white hover:bg-corporate-700 px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    开启摄像头
                  </button>
                </div>
              </div>
            )}
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-corporate-200 shadow-sm">
              <div className={`w-2.5 h-2.5 ${isMicActive ? 'bg-emerald-500' : 'bg-red-500'} rounded-full`}></div>
              <span className="text-xs font-bold text-corporate-800">您 (候选人)</span>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Controls Bar */}
      <footer className="h-24 flex items-center justify-center px-8 relative bg-white/40 border-t border-corporate-100">
        <div className="flex items-center gap-6 glass-card px-8 py-3 rounded-full border-4 border-white shadow-2xl">
          <div className="flex items-center gap-3 mr-6 border-r-2 border-corporate-100 pr-6">
            <button 
              onClick={() => setIsMicActive(!isMicActive)}
              className={`p-3 rounded-xl transition-all shadow-sm active:scale-90 ${isMicActive ? 'bg-white text-corporate-600 hover:bg-corporate-50' : 'bg-red-500 text-white hover:bg-red-600'}`}
              title={isMicActive ? "静音" : "取消静音"}
            >
              {isMicActive ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>
            <button 
              onClick={() => setIsCameraActive(!isCameraActive)}
              className={`p-3 rounded-xl transition-all shadow-sm active:scale-90 ${isCameraActive ? 'bg-white text-corporate-600 hover:bg-corporate-50' : 'bg-red-500 text-white hover:bg-red-600'}`}
              title={isCameraActive ? "关闭摄像头" : "开启摄像头"}
            >
              {isCameraActive ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-3 rounded-xl bg-white text-corporate-600 hover:bg-corporate-50 transition-all shadow-sm active:scale-90" title="共享屏幕">
              <Monitor className="w-6 h-6" />
            </button>
            <button className="p-3 rounded-xl bg-white text-corporate-600 hover:bg-corporate-50 transition-all shadow-sm active:scale-90" title="设置">
              <Settings className="w-6 h-6" />
            </button>
          </div>

          <div className="ml-6 border-l-2 border-corporate-100 pl-6 flex items-center gap-3">
            <button 
              onClick={() => {
                if (!isUserReady) setIsUserReady(true);
                else setIsPaused(!isPaused);
              }}
              className={`px-8 py-3 rounded-full font-black flex items-center gap-3 transition-all shadow-lg active:scale-95 ${
                !isUserReady 
                  ? 'bg-corporate-600 text-white shadow-corporate-200 hover:bg-corporate-700' 
                  : isPaused 
                    ? 'bg-amber-500 text-white shadow-amber-200 hover:bg-amber-600'
                    : 'bg-white border-2 border-corporate-100 text-corporate-700 hover:bg-corporate-50'
              }`}
            >
              {!isUserReady ? <Play className="w-5 h-5" /> : isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              {!isUserReady ? '开始面试' : isPaused ? '继续面试' : '暂停面试'}
            </button>
            
            <button 
              onClick={handleEndInterview}
              className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-black flex items-center gap-3 transition-all shadow-lg shadow-red-200 active:scale-95"
            >
              <XCircle className="w-5 h-5" />
              结束面试
            </button>
          </div>
        </div>
      </footer>

      {/* Interview Etiquette Modal */}
      <AnimatePresence>
        {showEtiquette && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-corporate-900/40 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-corporate-50 w-full max-w-2xl max-h-[85vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border-4 border-white"
            >
              <div className="p-8 border-b border-corporate-100 flex justify-between items-center bg-white/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-corporate-600 rounded-2xl flex items-center justify-center shadow-lg shadow-corporate-200">
                    <BookOpen className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-corporate-900">面试礼仪指南</h3>
                </div>
                <button onClick={() => setShowEtiquette(false)} className="p-3 hover:bg-corporate-100 rounded-full transition-colors group">
                  <X className="h-8 w-8 text-corporate-400 group-hover:text-corporate-600" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white rounded-3xl border-2 border-corporate-50 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-xl bg-corporate-100 flex items-center justify-center">
                        <Info className="w-4 h-4 text-corporate-600" />
                      </div>
                      <h4 className="font-black text-corporate-800">着装与环境</h4>
                    </div>
                    <ul className="space-y-3 text-sm text-corporate-600 font-bold">
                      <li>• 选择商务休闲或正式着装。</li>
                      <li>• 确保背景整洁，光线充足。</li>
                      <li>• 保持安静的环境，避免干扰。</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-white rounded-3xl border-2 border-corporate-50 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-xl bg-corporate-100 flex items-center justify-center">
                        <Info className="w-4 h-4 text-corporate-600" />
                      </div>
                      <h4 className="font-black text-corporate-800">沟通与表现</h4>
                    </div>
                    <ul className="space-y-3 text-sm text-corporate-600 font-bold">
                      <li>• 保持微笑，眼神平视摄像头。</li>
                      <li>• 语速适中，逻辑清晰。</li>
                      <li>• 积极倾听，不要随意打断。</li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 bg-corporate-100/30 rounded-3xl border-2 border-corporate-100">
                  <h4 className="text-xs font-black text-corporate-800 mb-4 uppercase tracking-widest">AI 提示</h4>
                  <p className="text-sm text-corporate-700 font-bold leading-relaxed italic">
                    “在视频面试中，眼神交流意味着直视摄像头，而不是屏幕上的面试官。这会给对方一种你正在与他进行眼神交流的感觉。”
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AI Summary Modal Removed - Now Inline */}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes voice-bar {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        .animate-voice-bar {
          animation: voice-bar 0.6s ease-in-out infinite;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .mirror-mode {
          transform: scaleX(-1);
        }
      `}} />
    </div>
  );
}
