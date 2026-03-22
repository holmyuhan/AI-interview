import React, { useState } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { 
  Check, AlertTriangle, Zap, Download, Share2, 
  Video, Smile, User, Mic, ChevronDown, Lightbulb, ClipboardCheck, Home, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const radarData = [
  { subject: '技术能力', A: 90, fullMark: 100 },
  { subject: '沟通表达', A: 85, fullMark: 100 },
  { subject: '问题解决', A: 95, fullMark: 100 },
  { subject: '自信度', A: 80, fullMark: 100 },
  { subject: '领导力', A: 70, fullMark: 100 },
  { subject: '文化匹配度', A: 88, fullMark: 100 },
];

const sentimentData = [
  { time: 0, value: 65 }, { time: 1, value: 70 }, { time: 2, value: 68 }, { time: 3, value: 85 },
  { time: 4, value: 90 }, { time: 5, value: 88 }, { time: 6, value: 75 }, { time: 7, value: 70 },
  { time: 8, value: 72 }, { time: 9, value: 80 }, { time: 10, value: 95 }, { time: 11, value: 92 },
  { time: 12, value: 88 }, { time: 13, value: 85 }, { time: 14, value: 80 }, { time: 15, value: 78 },
  { time: 16, value: 82 }, { time: 17, value: 85 }, { time: 18, value: 90 }, { time: 19, value: 88 },
];

const psychData = [
  { subject: '内驱力', A: 90 },
  { subject: '情绪控制', A: 95 },
  { subject: '社交敏锐', A: 75 },
  { subject: '抗压性', A: 98 },
  { subject: '协作倾向', A: 80 },
];

interface ReportProps {
  onBackToHome?: () => void;
  onBackToInterview?: () => void;
}

export default function Report({ onBackToHome, onBackToInterview }: ReportProps) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(0);

  const videoSegments = [
    { id: 0, title: '自我介绍', start: 0, end: 120, color: 'bg-emerald-400' },
    { id: 1, title: '项目经验', start: 120, end: 450, color: 'bg-corporate-400' },
    { id: 2, title: '技术深挖', start: 450, end: 720, color: 'bg-amber-400' },
    { id: 3, title: '反向提问', start: 720, end: 765, color: 'bg-rose-400' },
  ];

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handlePostToCommunity = () => {
    alert('已分享到黄油社区！');
    setShowShareModal(false);
  };

  return (
    <div className="p-6 md:p-12 bg-corporate-50 min-h-screen font-sans">
      <main className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-corporate-900 tracking-tight">黄油面试AI 报告</h1>
            <p className="text-corporate-600 font-bold mt-2">候选人：Alex Rivera • 高级软件工程师</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {onBackToInterview && (
              <button 
                onClick={onBackToInterview}
                className="px-8 py-3 bg-corporate-600 text-white rounded-full text-sm font-black hover:bg-corporate-700 transition-all shadow-lg shadow-corporate-200 flex items-center gap-2 active:scale-95"
              >
                <Zap className="w-5 h-5" /> 重新面试
              </button>
            )}
            {onBackToHome && (
              <button 
                onClick={onBackToHome}
                className="px-6 py-3 bg-white border-2 border-corporate-100 rounded-2xl text-sm font-black hover:bg-corporate-50 transition-all flex items-center gap-2 text-corporate-700 shadow-sm active:scale-95"
              >
                <Home className="w-5 h-5" /> 返回主页
              </button>
            )}
            <button className="px-6 py-3 bg-white border-2 border-corporate-100 rounded-2xl text-sm font-black hover:bg-corporate-50 transition-all flex items-center gap-2 text-corporate-700 shadow-sm active:scale-95">
              <Download className="w-5 h-5" /> 下载 PDF
            </button>
            <button 
              onClick={handleShare}
              className="px-6 py-3 bg-white border-2 border-corporate-100 rounded-2xl text-sm font-black hover:bg-corporate-50 transition-all flex items-center gap-2 text-corporate-700 shadow-sm active:scale-95"
            >
              <Share2 className="w-5 h-5" /> 分享报告
            </button>
          </div>
        </header>

        {/* Top Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Overall Score */}
          <section className="glass-card rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center border-4 border-white">
            <h3 className="text-xl font-black text-corporate-800 mb-8">整体评估</h3>
            <div className="relative w-56 h-56">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="stroke-corporate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" />
                <path className="stroke-corporate-600" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="84, 100" strokeLinecap="round" strokeWidth="3.5" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-corporate-900">84%</span>
                <span className="text-xs font-black text-corporate-600 uppercase tracking-widest mt-1">强匹配</span>
              </div>
            </div>
            <p className="mt-8 text-sm font-bold text-corporate-500 leading-relaxed">候选人展现了极高的技术能力和卓越的沟通表达。</p>
          </section>

          {/* Dimension Analysis */}
          <section className="glass-card rounded-[2.5rem] p-10 lg:col-span-2 border-4 border-white">
            <h3 className="text-xl font-black text-corporate-800 mb-6">维度分析</h3>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#fef3c7" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#92400e', fontSize: 13, fontWeight: 700 }} />
                  <Radar name="候选人表现" dataKey="A" stroke="#d97706" fill="#f59e0b" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section className="glass-card rounded-3xl p-8 border-l-8 border-l-emerald-400 border-4 border-white">
              <h3 className="text-xl font-black text-emerald-800 mb-6 flex items-center gap-3">
                <Check className="w-6 h-6" /> 关键亮点
              </h3>
              <ul className="space-y-4 text-corporate-700 text-sm font-bold">
                <li className="flex gap-3"><span className="text-emerald-500">★</span> 深厚的分布式系统架构和微服务经验。</li>
                <li className="flex gap-3"><span className="text-emerald-500">★</span> 能够使用简单有效的类比来阐述复杂的技术概念。</li>
                <li className="flex gap-3"><span className="text-emerald-500">★</span> 在系统可扩展性和边缘情况处理方面表现主动。</li>
              </ul>
            </section>
            <section className="glass-card rounded-3xl p-8 border-l-8 border-l-rose-400 border-4 border-white">
              <h3 className="text-xl font-black text-rose-800 mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6" /> 红线 / 风险
              </h3>
              <ul className="space-y-4 text-corporate-700 text-sm font-bold">
                <li className="flex gap-3"><span className="text-rose-500">⚠</span> 在讨论旧数据库迁移策略时略显犹豫。</li>
                <li className="flex gap-3"><span className="text-rose-500">⚠</span> 针对此全栈岗位，在前端框架（React/Vue）方面的经验有限。</li>
              </ul>
            </section>
          </div>

          <section className="glass-card rounded-3xl p-8 h-full border-4 border-white">
            <h3 className="text-xl font-black text-corporate-900 mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-corporate-600" /> 优化建议
            </h3>
            <div className="space-y-5">
              <div className="p-5 bg-white rounded-2xl border-2 border-corporate-100 shadow-sm">
                <p className="font-black text-corporate-800 text-base mb-2">技术深钻</p>
                <p className="text-sm text-corporate-500 font-bold">安排一次 30 分钟的 React 基础专项面试，以评估其学习速度。</p>
              </div>
              <div className="p-5 bg-white rounded-2xl border-2 border-corporate-100 shadow-sm">
                <p className="font-black text-corporate-800 text-base mb-2">文化匹配面试</p>
                <p className="text-sm text-corporate-500 font-bold">加入一次结对编程环节，以评估其协作解决问题的风格。</p>
              </div>
              <div className="p-5 bg-white rounded-2xl border-2 border-corporate-100 shadow-sm">
                <p className="font-black text-corporate-800 text-base mb-2">入职关注点</p>
                <p className="text-sm text-corporate-500 font-bold">优先进行内部 CI/CD 流程培训，候选人提到这是其待提升领域。</p>
              </div>
            </div>
          </section>
        </div>

        {/* Multimodal Replay */}
        <section className="glass-card rounded-[2.5rem] overflow-hidden border-4 border-white">
          <div className="p-8 border-b border-corporate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/40">
            <div>
              <h3 className="text-2xl font-black text-corporate-900">面试复盘与多模态分析</h3>
              <p className="text-sm text-corporate-500 font-bold mt-2">基于视觉、语音及文本的 AI 深度多维度评估</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 bg-corporate-100 text-corporate-700 rounded-full text-xs font-black">AI 已校准</span>
              <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black">情绪稳定</span>
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-0">
            <div className="xl:col-span-7 bg-corporate-900 aspect-video relative group overflow-hidden">
              {isPlaying ? (
                <div className="w-full h-full relative">
                  <video 
                    autoPlay 
                    controls 
                    className="w-full h-full object-cover"
                    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                  />
                  {/* Overlay for segments when playing */}
                  <div className="absolute bottom-12 left-0 right-0 px-4 flex gap-1 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {videoSegments.map((seg, idx) => (
                      <div 
                        key={seg.id} 
                        className={`flex-1 h-full rounded-full cursor-pointer transition-all hover:h-3 hover:-translate-y-1 ${seg.color} ${currentSegment === idx ? 'ring-2 ring-white' : 'opacity-60'}`}
                        onClick={() => setCurrentSegment(idx)}
                        title={seg.title}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <img 
                    src="https://picsum.photos/seed/candidate-recording/1280/720" 
                    alt="Interview Replay Thumbnail" 
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="w-20 h-20 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-2xl"
                    >
                      <Video className="w-10 h-10 text-white fill-current ml-1" />
                    </button>
                  </div>
                  <div className="absolute top-6 left-6 bg-corporate-900/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                    <span className="text-xs font-black text-white tracking-widest uppercase">候选人面试录像 (12:45)</span>
                  </div>
                </>
              )}
              
              {/* XHS Style Segmented Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex gap-1.5 mb-3">
                  {videoSegments.map((seg, idx) => (
                    <div 
                      key={seg.id} 
                      onClick={() => setCurrentSegment(idx)}
                      className="flex-1 group/seg cursor-pointer"
                    >
                      <div className={`h-1.5 rounded-full transition-all mb-1 ${currentSegment === idx ? seg.color : 'bg-white/20 group-hover/seg:bg-white/40'}`}></div>
                      <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${currentSegment === idx ? 'text-white' : 'text-white/40 group-hover/seg:text-white/60'}`}>
                        {seg.title}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center text-white text-[10px] font-black">
                  <div className="flex items-center gap-4">
                    <span className="text-corporate-400">正在分析: <span className="text-white">{videoSegments[currentSegment].title}</span></span>
                    <span>04:12 / 12:45</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="hover:text-corporate-200 transition-colors">AI 智能切片</button>
                    <button className="hover:text-corporate-200 transition-colors">1.0x</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-5 p-8 space-y-8 bg-white/30">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-base font-black text-corporate-800 flex items-center gap-2">
                    <Smile className="w-5 h-5 text-corporate-600" /> 表情分析 (Facial Expressions)
                  </h4>
                  <span className="text-[10px] font-black text-corporate-400 uppercase tracking-widest">实时情感曲线</span>
                </div>
                <div className="h-28 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sentimentData}>
                      <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between text-[11px] font-black text-corporate-500 mt-3 italic">
                  <span>专注度: 92%</span>
                  <span>亲和力: 88%</span>
                  <span>压力感: 低</span>
                </div>
              </div>
              <div className="pt-6 border-t border-corporate-100">
                <h4 className="text-base font-black text-corporate-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-corporate-600" /> 动作分析 (Body Language)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded-xl border-2 border-corporate-50 shadow-sm">
                    <p className="text-[11px] font-black text-corporate-700 mb-1">姿态反馈</p>
                    <p className="text-[11px] text-corporate-500 font-bold">挺拔自信，无多余手势。</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border-2 border-corporate-50 shadow-sm">
                    <p className="text-[11px] font-black text-corporate-700 mb-1">眼神交流</p>
                    <p className="text-[11px] text-corporate-500 font-bold">视线平视镜头，稳定度高。</p>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-corporate-100">
                <h4 className="text-base font-black text-corporate-800 mb-4 flex items-center gap-2">
                  <Mic className="w-5 h-5 text-corporate-600" /> 语气分析 (Tone & Voice)
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[11px] font-black mb-1.5">
                      <span className="text-corporate-600">语速稳定性</span>
                      <span className="text-corporate-800">95%</span>
                    </div>
                    <div className="w-full bg-corporate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-corporate-600 h-full w-[95%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-black mb-1.5">
                      <span className="text-corporate-600">语言感染力</span>
                      <span className="text-corporate-800">82%</span>
                    </div>
                    <div className="w-full bg-corporate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-corporate-600 h-full w-[82%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Assessment */}
        <section className="glass-card rounded-[2.5rem] overflow-hidden mt-8 border-4 border-white">
          <div className="p-8 border-b border-corporate-100 bg-white/40">
            <h3 className="text-2xl font-black text-corporate-900">深度行为与心理评估</h3>
            <p className="text-sm text-corporate-500 font-bold mt-2">基于 AI 心理学模型与行为学识别的高级洞察</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-corporate-100">
            <div className="p-8 border-r border-corporate-100 space-y-8">
              <h4 className="text-lg font-black text-corporate-800 flex items-center gap-3">
                <ClipboardCheck className="w-6 h-6 text-corporate-600" /> 行为分析 (Behavioral Analysis)
              </h4>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-4 bg-white rounded-2xl border-2 border-corporate-50 shadow-sm">
                    <p className="text-xs font-bold text-corporate-400 mb-1">逻辑条理性</p>
                    <p className="text-2xl font-black text-corporate-700">92%</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border-2 border-corporate-50 shadow-sm">
                    <p className="text-xs font-bold text-corporate-400 mb-1">抗压表现</p>
                    <p className="text-2xl font-black text-corporate-700">88%</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border-2 border-corporate-50 shadow-sm">
                    <p className="text-xs font-bold text-corporate-400 mb-1">应变速度</p>
                    <p className="text-2xl font-black text-corporate-700">85%</p>
                  </div>
                </div>
                <div className="bg-corporate-100/30 p-6 rounded-3xl border-2 border-corporate-100">
                  <h5 className="text-xs font-black text-corporate-800 mb-4 uppercase tracking-widest">关键行为观测点</h5>
                  <ul className="space-y-3 text-sm text-corporate-600 font-bold">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-corporate-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>在回答复杂技术问题时，手势平稳，语调坚定，未出现重复性小动作。</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-corporate-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>面对压力追问（02:10），保持平视且语速无明显加快，显示出极强的心理自我调控。</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-corporate-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>叙述逻辑采用典型的 STAR 法则，结构清晰，因果关系论述严密。</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-8 space-y-8">
              <h4 className="text-lg font-black text-corporate-800 flex items-center gap-3">
                <Zap className="w-6 h-6 text-corporate-600" /> 心理分析 (Psychological Analysis)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={psychData}>
                      <PolarGrid stroke="#fef3c7" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#92400e', fontSize: 11, fontWeight: 700 }} />
                      <Radar dataKey="A" stroke="#d97706" fill="#f59e0b" fillOpacity={0.2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-[11px] font-black mb-1.5">
                      <span className="text-corporate-600">职业动机</span>
                      <span className="text-corporate-800">内驱型</span>
                    </div>
                    <div className="w-full bg-corporate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-corporate-600 h-full w-[90%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-black mb-1.5">
                      <span className="text-corporate-600">心理稳定性</span>
                      <span className="text-corporate-800">极高</span>
                    </div>
                    <div className="w-full bg-corporate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-corporate-600 h-full w-[95%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-black mb-1.5">
                      <span className="text-corporate-600">亲和力</span>
                      <span className="text-corporate-800">良好</span>
                    </div>
                    <div className="w-full bg-corporate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-corporate-600 h-full w-[80%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 bg-corporate-100/40">
            <h4 className="text-base font-black text-corporate-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-corporate-600" /> 专家综合建议
            </h4>
            <div className="p-6 bg-white border-2 border-corporate-100 rounded-3xl shadow-sm">
              <p className="text-base text-corporate-700 font-bold leading-relaxed">
                <strong className="text-corporate-900">面试结论：</strong> 基于行为和心理多维数据，该候选人展现出卓越的逻辑思考能力和极高的情绪稳定性。其抗压表现位列同类候选人前 5%，心理韧性极强，能够有效应对高强度的工作负荷及复杂的突发状况。<strong>强烈建议：</strong> 该候选人非常适合节奏快、技术挑战大的初创团队环境或核心基座研发岗位。在入职初期，建议给予其在系统架构决策上的适度自主权，以充分激发其内在职业动机。
              </p>
            </div>
          </div>
        </section>

        {/* Consolidated Q&A and Transcript */}
        <section className="glass-card rounded-[2.5rem] overflow-hidden mt-8 border-4 border-white">
          <div className="p-8 border-b border-corporate-100 bg-white/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="text-2xl font-black text-corporate-900">面试回答摘要与完整记录</h3>
              <p className="text-sm text-corporate-500 font-bold mt-2">AI 深度解析与对话原文对照</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-corporate-100 p-1 rounded-2xl">
                <button 
                  onClick={() => setShowTranscript(false)}
                  className={`px-4 py-1.5 text-[10px] font-black rounded-xl transition-all ${!showTranscript ? 'bg-white text-corporate-600 shadow-sm' : 'text-corporate-400'}`}
                >
                  回答摘要
                </button>
                <button 
                  onClick={() => setShowTranscript(true)}
                  className={`px-4 py-1.5 text-[10px] font-black rounded-xl transition-all ${showTranscript ? 'bg-white text-corporate-600 shadow-sm' : 'text-corporate-400'}`}
                >
                  完整记录
                </button>
              </div>
              <button 
                className="p-2 hover:bg-corporate-100 rounded-xl transition-all text-corporate-600 shadow-sm border border-corporate-100 bg-white"
                title="导出记录"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-8 space-y-10">
            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <span className="flex-shrink-0 w-10 h-10 bg-corporate-100 text-corporate-700 rounded-xl flex items-center justify-center font-black text-lg shadow-sm">01</span>
                <div className="flex-1">
                  <h4 className="text-lg font-black text-corporate-800 mb-4">“你能描述一次你必须处理关键生产环境故障的经历吗？”</h4>
                  
                  {showTranscript ? (
                    <div className="mb-6 p-6 bg-corporate-900/5 rounded-3xl border-2 border-dashed border-corporate-200">
                      <div className="flex gap-4 mb-4">
                        <span className="flex-shrink-0 w-16 font-black text-corporate-400 text-[10px] uppercase tracking-widest">面试官:</span>
                        <p className="text-sm text-corporate-700 font-bold italic">“你能描述一次你必须 handle 关键生产环境故障的经历吗？”</p>
                      </div>
                      <div className="flex gap-4">
                        <span className="flex-shrink-0 w-16 font-black text-corporate-900 text-[10px] uppercase tracking-widest">候选人:</span>
                        <p className="text-sm text-corporate-700 font-bold">“好的。在我之前的职位上，我们的缓存层出现了级联失效。我的首要任务是隔离。我启动了断路器来保护数据库，然后我们回滚了最后的部署，同时监控遥测数据……”</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="p-6 bg-white rounded-3xl border-2 border-corporate-50 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 bg-corporate-400 rounded-full"></div>
                          <span className="text-xs font-black text-corporate-700 uppercase tracking-widest">回答亮点</span>
                        </div>
                        <p className="text-sm text-corporate-600 font-bold leading-relaxed">提到了缓存层级联失效的具体场景；展示了“首要任务是隔离”的正确优先级意识；描述了启动断路器和回滚部署的具体操作流程。</p>
                      </div>
                      <div className="p-6 bg-corporate-50 rounded-3xl border-2 border-corporate-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 bg-corporate-600 rounded-full"></div>
                          <span className="text-xs font-black text-corporate-800 uppercase tracking-widest">AI 最佳建议</span>
                        </div>
                        <p className="text-sm text-corporate-700 font-bold leading-relaxed">应采用 STAR 法则：1. 描述故障对业务的具体量化影响；2. 强调跨团队沟通与同步机制；3. 详细说明根因分析 (RCA) 过程；4. 阐述后续如何通过监控告警优化防止此类问题再次发生。</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Community Share Modal (Maimai Style) */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-corporate-900/40 backdrop-blur-md">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border-4 border-corporate-100">
              <div className="p-6 border-b border-corporate-100 flex justify-between items-center bg-corporate-50/50">
                <h3 className="text-xl font-black text-corporate-900">分享到黄油社区</h3>
                <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-corporate-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-corporate-400" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="p-6 bg-corporate-50 rounded-3xl border-2 border-corporate-100 space-y-4">
                  <div className="flex items-center gap-3">
                    <img src="https://picsum.photos/seed/user1/100/100" className="w-10 h-10 rounded-full border-2 border-white" alt="Avatar" />
                    <div>
                      <p className="text-sm font-black text-corporate-900">Alex Rivera</p>
                      <p className="text-[10px] text-corporate-400 font-bold uppercase tracking-widest">刚刚发布</p>
                    </div>
                  </div>
                  <p className="text-sm text-corporate-700 font-bold leading-relaxed">
                    刚刚在黄油面试AI完成了一次模拟面试，获得了 84% 的强匹配评分！技术能力和沟通表达都得到了 AI 的认可。推荐大家也来试试！🚀 #面试准备 #AI面试 #职业成长
                  </p>
                  <div className="bg-white rounded-2xl p-4 border border-corporate-100 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 bg-corporate-600 rounded-xl flex items-center justify-center text-white font-black">84%</div>
                    <div>
                      <p className="text-xs font-black text-corporate-900">高级软件工程师 - 模拟报告</p>
                      <p className="text-[10px] text-corporate-400 font-bold">点击查看我的深度解析</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handlePostToCommunity}
                    className="w-full py-4 bg-corporate-600 text-white rounded-full font-black hover:bg-corporate-700 transition-all shadow-lg shadow-corporate-200 active:scale-95"
                  >
                    立即发布
                  </button>
                  <p className="text-center text-[10px] text-corporate-400 font-bold uppercase tracking-widest">
                    发布后，社区用户将能看到你的脱敏报告摘要
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
      <footer className="mt-16 text-center text-xs font-black text-corporate-400 pb-12 uppercase tracking-[0.3em]">
        © 2026 黄油面试AI. 版权所有。为梦想而建。
      </footer>
    </div>
  );
}
