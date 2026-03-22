import React, { useState } from 'react';
import { Upload, FileText, Plus, Zap, Check, Eye, ChevronRight, UserCircle2, History, Trash2, ExternalLink, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InterviewerPersona } from '../types';
import { INTERVIEWER_PERSONAS } from '../constants';

interface LandingProps {
  onStart: () => void;
  selectedPersona: InterviewerPersona;
  onPersonaSelect: (persona: InterviewerPersona) => void;
}

export default function Landing({ onStart, selectedPersona, onPersonaSelect }: LandingProps) {
  const [jdMode, setJdMode] = useState<'upload' | 'paste'>('upload');
  const [showHistory, setShowHistory] = useState(false);

  const [selectedInterviews, setSelectedInterviews] = useState<number[]>([]);
  const [historyCategory, setHistoryCategory] = useState<'all' | 'thisMonth' | 'earlier'>('all');
  const [showResumeOptimizer, setShowResumeOptimizer] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => setIsOptimizing(false), 2000);
  };

  const pastInterviews = [
    { id: 1, role: '高级前端工程师', company: '字节跳动', date: '2024-03-15', score: 88, summary: '技术深度扎实，但在系统设计环节对高并发处理的细节描述略显不足。', category: 'thisMonth' },
    { id: 2, role: '全栈开发工程师', company: '阿里巴巴', date: '2024-03-10', score: 75, summary: '沟通表达流畅，项目经验丰富，但对底层原理的理解有待加强。', category: 'thisMonth' },
    { id: 3, role: '后端开发工程师', company: '腾讯', date: '2024-02-20', score: 92, summary: '对数据库优化有独到见解，但在微服务治理方面还需进一步积累。', category: 'earlier' },
  ];

  const filteredInterviews = pastInterviews.filter(i => 
    historyCategory === 'all' || i.category === historyCategory
  );

  const toggleSelect = (id: number) => {
    setSelectedInterviews(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedInterviews.length === filteredInterviews.length) {
      setSelectedInterviews([]);
    } else {
      setSelectedInterviews(filteredInterviews.map(i => i.id));
    }
  };

  const handleBatchDelete = () => {
    alert(`已删除 ${selectedInterviews.length} 条记录`);
    setSelectedInterviews([]);
  };

  const handleBatchExport = () => {
    alert(`已导出 ${selectedInterviews.length} 条报告`);
    setSelectedInterviews([]);
  };

  return (
    <main className="relative pt-24 pb-12 hero-gradient min-h-[90vh] flex items-center bg-corporate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-stretch">
          {/* Left Content: Hero Text */}
          <div className="lg:col-span-2 flex flex-col justify-center py-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-corporate-100 text-corporate-800 text-xs font-black uppercase tracking-wider mb-8 w-fit shadow-sm border border-corporate-200"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-corporate-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-corporate-600"></span>
              </span>
              新一代 AI 面试准备
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-6xl font-black text-corporate-900 leading-[1.1] mb-8"
            >
              用 AI 精度锁定<br /><span className="text-corporate-600">你的梦想职位。</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-corporate-800/80 mb-10 max-w-md leading-relaxed font-bold"
            >
              上传简历与岗位 JD，立即开启沉浸式模拟面试。获取实时反馈和由先进 AI 驱动的个性化辅导。
            </motion.p>

            {/* Stats Card (Removed Success Rate and Hires) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 rounded-[2.5rem] flex gap-8 items-center max-w-sm mb-10 border-corporate-200/50"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    alt={`User ${i}`} 
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="w-px h-10 bg-corporate-200"></div>
              <div>
                <div className="text-xl font-black text-corporate-700">10,000+</div>
                <div className="text-[10px] text-corporate-800/60 uppercase font-black tracking-wider">活跃面试者</div>
              </div>
            </motion.div>

            {/* Quick Features & History Entry */}
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <button 
                onClick={() => {
                  setShowResumeOptimizer(true);
                  handleOptimize();
                }}
                className="flex items-center gap-3 p-3 px-4 rounded-2xl bg-white/80 border border-corporate-100 shadow-sm hover:bg-corporate-50 transition-all active:scale-95"
              >
                <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-xs font-black text-corporate-800">简历精准优化</span>
              </button>
              <button 
                onClick={() => setShowHistory(true)}
                className="flex items-center gap-3 p-3 px-4 rounded-2xl bg-corporate-600 text-white border border-corporate-600 shadow-lg hover:bg-corporate-700 transition-all active:scale-95"
              >
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <History className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-black">往期面试记录</span>
              </button>
            </div>
          </div>

          {/* Right Content: Modular Configuration */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch h-full">
            {/* Column 1: Profile & Persona (Left) */}
            <div className="flex flex-col gap-6">
              {/* Resume Section */}
              <div className="glass-card p-6 rounded-[2.5rem] flex-1 flex flex-col border-corporate-200/50">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-corporate-100 flex items-center justify-center shadow-sm">
                    <Plus className="w-6 h-6 text-corporate-600" />
                  </div>
                  <h3 className="text-sm font-black text-corporate-900 uppercase tracking-widest">1. 上传简历</h3>
                </div>
                <div className="flex-1 border-2 border-dashed border-corporate-200 rounded-3xl p-6 flex flex-col items-center justify-center bg-white/60 hover:bg-white/90 transition-all cursor-pointer group shadow-inner">
                  <Upload className="w-8 h-8 text-corporate-300 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-[10px] text-corporate-800/40 mb-4 text-center font-bold uppercase tracking-widest">支持 PDF/Docx</p>
                  <button className="bg-corporate-100 text-corporate-600 px-5 py-1.5 rounded-full text-[9px] font-black hover:bg-corporate-200 transition-colors border border-corporate-200">
                    选择简历
                  </button>
                </div>
              </div>

              {/* Persona Selection Section */}
              <div className="glass-card p-6 rounded-[2.5rem] flex-[2] flex flex-col border-corporate-200/50">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-corporate-100 flex items-center justify-center shadow-sm">
                    <UserCircle2 className="w-6 h-6 text-corporate-600" />
                  </div>
                  <h3 className="text-sm font-black text-corporate-900 uppercase tracking-widest">2. 选择面试官形象</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {INTERVIEWER_PERSONAS.map((persona) => (
                    <button
                      key={persona.id}
                      onClick={() => onPersonaSelect(persona)}
                      className={`relative rounded-2xl overflow-hidden border-4 transition-all group ${
                        selectedPersona.id === persona.id 
                        ? 'border-corporate-600 shadow-xl scale-105 z-10' 
                        : 'border-transparent hover:border-corporate-200'
                      }`}
                    >
                      <img 
                        src={persona.image} 
                        alt={persona.name}
                        className="w-full aspect-[4/5] object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className={`absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity ${
                        selectedPersona.id === persona.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                      }`}>
                        <span className="text-[10px] font-black text-white truncate">{persona.name}</span>
                      </div>
                      {selectedPersona.id === persona.id && (
                        <div className="absolute top-2 right-2 bg-corporate-600 rounded-full p-1 shadow-md">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="bg-corporate-100/30 p-4 rounded-2xl border border-corporate-100 flex-1">
                  <h4 className="text-xs font-black text-corporate-800 uppercase mb-2 tracking-wider">{selectedPersona.name}</h4>
                  <p className="text-xs text-corporate-900/70 leading-relaxed italic font-bold">
                    "{selectedPersona.description}"
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Job & Results (Right) */}
            <div className="flex flex-col gap-6">
              {/* JD Upload & Additional Info Fused Section */}
              <div className="glass-card p-6 rounded-[2.5rem] flex-[2] flex flex-col border-corporate-200/50">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-corporate-100 flex items-center justify-center shadow-sm">
                      <FileText className="w-6 h-6 text-corporate-600" />
                    </div>
                    <h3 className="text-sm font-black text-corporate-900 uppercase tracking-widest">3. 设置岗位与补充信息</h3>
                  </div>
                  <div className="bg-corporate-100/50 p-1 rounded-2xl flex">
                    <button 
                      onClick={() => setJdMode('upload')}
                      className={`px-4 py-1.5 text-[10px] font-black rounded-xl transition-all ${jdMode === 'upload' ? 'bg-white text-corporate-600 shadow-sm' : 'text-corporate-800/40'}`}
                    >
                      上传文档
                    </button>
                    <button 
                      onClick={() => setJdMode('paste')}
                      className={`px-4 py-1.5 text-[10px] font-black rounded-xl transition-all ${jdMode === 'paste' ? 'bg-white text-corporate-600 shadow-sm' : 'text-corporate-800/40'}`}
                    >
                      直接粘贴
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col gap-4">
                  {jdMode === 'upload' ? (
                    <div className="flex-1 border-2 border-dashed border-corporate-200 rounded-3xl p-6 flex flex-col items-center justify-center bg-white/60 hover:bg-white/90 transition-all cursor-pointer group shadow-inner">
                      <Upload className="w-8 h-8 text-corporate-300 mb-3 group-hover:scale-110 transition-transform" />
                      <p className="text-[10px] text-corporate-800/40 mb-3 text-center font-black">上传 JD 让 AI 更精准</p>
                      <button className="bg-corporate-100 text-corporate-600 px-5 py-1.5 rounded-full text-[9px] font-black hover:bg-corporate-200 transition-colors border border-corporate-200">
                        选择文件
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <textarea 
                        className="w-full h-full bg-white/60 border border-corporate-200 rounded-3xl p-4 text-xs text-corporate-900 placeholder-corporate-800/30 focus:ring-4 focus:ring-corporate-400/20 focus:border-corporate-400 transition-all resize-none custom-scrollbar min-h-[120px] font-bold shadow-inner"
                        placeholder="在此粘贴招聘岗位描述内容..."
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4 text-corporate-400" />
                      <span className="text-[10px] font-black text-corporate-800/40 uppercase tracking-[0.2em]">补充信息 (可选)</span>
                    </div>
                    <textarea 
                      className="w-full bg-white/60 border border-corporate-200 rounded-3xl p-4 text-xs text-corporate-900 placeholder-corporate-800/30 focus:ring-4 focus:ring-corporate-400/20 focus:border-corporate-400 transition-all resize-none custom-scrollbar h-24 font-bold shadow-inner"
                      placeholder="特定项目经历或期望..."
                    />
                  </div>
                </div>
              </div>

              {/* Parsing Results Section */}
              <div className="glass-card p-6 rounded-[2.5rem] flex-1 flex flex-col border-corporate-200/50">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-corporate-100 flex items-center justify-center shadow-sm">
                      <Zap className="w-4 h-4 text-corporate-600" />
                    </div>
                    <h4 className="text-xs font-black text-corporate-900 uppercase tracking-widest">JD 智能解析结果</h4>
                  </div>
                  <span className="text-[10px] font-black text-corporate-600 animate-pulse">解析中...</span>
                </div>
                <div className="flex-1 space-y-4 custom-scrollbar overflow-y-auto max-h-[140px] pr-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/80 p-3 rounded-2xl border border-corporate-100 shadow-sm">
                      <span className="text-[9px] font-black text-corporate-800/30 uppercase tracking-wider">目标公司</span>
                      <p className="text-xs font-black text-corporate-900">等待上传...</p>
                    </div>
                    <div className="bg-white/80 p-3 rounded-2xl border border-corporate-100 shadow-sm">
                      <span className="text-[9px] font-black text-corporate-800/30 uppercase tracking-wider">业务部门</span>
                      <p className="text-xs font-black text-corporate-900">等待上传...</p>
                    </div>
                  </div>
                  <div className="bg-white/80 p-4 rounded-2xl border border-corporate-100 shadow-sm">
                    <span className="text-[9px] font-black text-corporate-800/30 uppercase block mb-2 tracking-wider">核心职责</span>
                    <p className="text-xs text-corporate-800/40 italic font-bold leading-relaxed">自动解析岗位职责详情...</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={onStart}
                className="bg-corporate-600 text-white py-5 rounded-full font-black hover:bg-corporate-700 transition-all shadow-2xl shadow-corporate-600/40 flex items-center justify-center gap-3 group text-base uppercase tracking-[0.2em] active:scale-95"
              >
                保存并开始面试
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* History Modal */}
      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-corporate-900/40 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-corporate-50 w-full max-w-4xl max-h-[85vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border-4 border-white"
            >
              <div className="p-8 border-b border-corporate-100 flex justify-between items-center bg-white/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-corporate-600 rounded-2xl flex items-center justify-center shadow-lg shadow-corporate-200">
                    <History className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-corporate-900">往期面试记录</h3>
                    <div className="flex bg-corporate-100 p-1 rounded-2xl mt-2">
                      <button 
                        onClick={() => setHistoryCategory('all')}
                        className={`flex-1 px-4 py-1.5 text-[10px] font-black rounded-xl transition-all ${historyCategory === 'all' ? 'bg-white text-corporate-600 shadow-sm' : 'text-corporate-400 hover:text-corporate-600'}`}
                      >
                        全部记录
                      </button>
                      <button 
                        onClick={() => setHistoryCategory('thisMonth')}
                        className={`flex-1 px-4 py-1.5 text-[10px] font-black rounded-xl transition-all ${historyCategory === 'thisMonth' ? 'bg-white text-corporate-600 shadow-sm' : 'text-corporate-400 hover:text-corporate-600'}`}
                      >
                        本月面试
                      </button>
                      <button 
                        onClick={() => setHistoryCategory('earlier')}
                        className={`flex-1 px-4 py-1.5 text-[10px] font-black rounded-xl transition-all ${historyCategory === 'earlier' ? 'bg-white text-corporate-600 shadow-sm' : 'text-corporate-400 hover:text-corporate-600'}`}
                      >
                        更早记录
                      </button>
                    </div>
                  </div>
                </div>
                  <div className="bg-corporate-100/50 p-1 rounded-2xl flex items-center gap-2">
                    <button 
                      onClick={toggleSelectAll}
                      className="px-4 py-1.5 text-[10px] font-black text-corporate-600 hover:bg-white rounded-xl transition-all"
                    >
                      {selectedInterviews.length === filteredInterviews.length ? '取消全选' : '全选'}
                    </button>
                    <div className="w-px h-4 bg-corporate-200"></div>
                    <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-corporate-100 rounded-full transition-colors group">
                      <Plus className="h-6 w-6 text-corporate-400 group-hover:text-corporate-600 rotate-45" />
                    </button>
                  </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                {filteredInterviews.map((interview) => (
                  <div 
                    key={interview.id} 
                    onClick={() => toggleSelect(interview.id)}
                    className={`glass-card p-6 rounded-3xl border-2 transition-all group cursor-pointer ${
                      selectedInterviews.includes(interview.id) 
                      ? 'border-corporate-600 bg-corporate-50 shadow-md' 
                      : 'border-white shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex gap-4 flex-1">
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors mt-1 ${
                          selectedInterviews.includes(interview.id) 
                          ? 'bg-corporate-600 border-corporate-600' 
                          : 'border-corporate-200 bg-white'
                        }`}>
                          {selectedInterviews.includes(interview.id) && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-corporate-100 text-corporate-700 rounded-lg text-[10px] font-black uppercase tracking-wider">{interview.company}</span>
                            <span className="text-xs text-corporate-400 font-bold">{interview.date}</span>
                          </div>
                          <h4 className="text-xl font-black text-corporate-900">{interview.role}</h4>
                          <div className="p-4 bg-white/60 rounded-2xl border border-corporate-100">
                            <div className="flex items-center gap-2 mb-2">
                              <MessageCircle className="w-4 h-4 text-corporate-600" />
                              <span className="text-[10px] font-black text-corporate-800 uppercase tracking-widest">AI 总结与建议</span>
                            </div>
                            <p className="text-sm text-corporate-600 font-bold leading-relaxed">{interview.summary}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 pl-10 md:pl-0">
                        <div className="text-center md:text-right">
                          <div className="text-3xl font-black text-corporate-600">{interview.score}%</div>
                          <div className="text-[10px] font-black text-corporate-400 uppercase tracking-widest">综合评分</div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); /* View report logic */ }}
                            className="p-3 bg-white border-2 border-corporate-100 rounded-xl text-corporate-600 hover:bg-corporate-50 transition-all shadow-sm active:scale-90" 
                            title="查看报告"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); /* Delete logic */ }}
                            className="p-3 bg-white border-2 border-corporate-100 rounded-xl text-rose-500 hover:bg-rose-50 transition-all shadow-sm active:scale-90" 
                            title="删除记录"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-corporate-100/50 border-t border-corporate-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {selectedInterviews.length > 0 ? (
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-corporate-900">已选中 {selectedInterviews.length} 项</span>
                      <button 
                        onClick={handleBatchDelete}
                        className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors"
                      >
                        批量删除
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs font-bold text-corporate-400 italic">“每一次模拟都是通往梦想职位的阶梯”</p>
                  )}
                </div>
                <button 
                  onClick={selectedInterviews.length > 0 ? handleBatchExport : () => alert('请先选择记录')}
                  className={`px-8 py-3 rounded-full text-xs font-black transition-all shadow-lg ${
                    selectedInterviews.length > 0 
                    ? 'bg-corporate-600 text-white hover:bg-corporate-700 shadow-corporate-200' 
                    : 'bg-corporate-200 text-corporate-400 cursor-not-allowed'
                  }`}
                >
                  {selectedInterviews.length > 0 ? '导出选中报告' : '导出全部报告'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Resume Optimizer Modal */}
      <AnimatePresence>
        {showResumeOptimizer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-corporate-900/40 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-corporate-50 w-full max-w-4xl max-h-[85vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border-4 border-white"
            >
              <div className="p-8 border-b border-corporate-100 flex justify-between items-center bg-white/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200">
                    <Zap className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-corporate-900">AI 简历精准优化</h3>
                    <p className="text-xs text-corporate-500 font-bold">根据目标岗位 JD，深度优化您的简历竞争力</p>
                  </div>
                </div>
                <button onClick={() => setShowResumeOptimizer(false)} className="p-3 hover:bg-corporate-100 rounded-full transition-colors group">
                  <Plus className="h-8 w-8 text-corporate-400 group-hover:text-corporate-600 rotate-45" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                {isOptimizing ? (
                  <div className="flex flex-col items-center justify-center h-[400px] space-y-6">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-green-100 border-t-green-600 rounded-full animate-spin"></div>
                      <Zap className="absolute inset-0 m-auto w-8 h-8 text-green-600 animate-pulse" />
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-black text-corporate-900">AI 正在深度解析 JD 与简历...</h4>
                      <p className="text-xs text-corporate-500 font-bold mt-2">匹配核心关键词、对齐技术栈、优化业务话术</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-sm font-black text-corporate-900 uppercase tracking-widest flex items-center gap-2">
                        <FileText className="w-4 h-4 text-corporate-400" />
                        原始简历内容
                      </h4>
                      <div className="bg-white rounded-3xl p-6 border border-corporate-100 shadow-inner h-[400px] overflow-y-auto custom-scrollbar">
                        <p className="text-sm text-corporate-600 font-medium leading-relaxed">
                          [简历内容加载中...] <br /><br />
                          当前简历在“分布式系统”和“高并发处理”方面的描述较为笼统，建议结合 JD 中的“千万级 QPS”要求进行针对性强化。
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-sm font-black text-green-600 uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        基于 JD 的 AI 优化建议
                      </h4>
                      <div className="bg-green-50/50 rounded-3xl p-6 border border-green-100 shadow-inner h-[400px] overflow-y-auto custom-scrollbar">
                        <div className="space-y-6">
                          <div className="p-4 bg-white rounded-2xl border border-green-100 shadow-sm">
                            <span className="text-[10px] font-black text-green-600 uppercase tracking-wider mb-2 block">JD 核心匹配增强</span>
                            <p className="text-xs text-corporate-800 font-bold leading-relaxed">
                              当前 JD 强调“高并发架构经验”，建议在简历第一段突出您处理过千万级流量的实战案例，并使用“架构师视角”重构描述。
                            </p>
                          </div>
                          <div className="p-4 bg-white rounded-2xl border border-green-100 shadow-sm">
                            <span className="text-[10px] font-black text-green-600 uppercase tracking-wider mb-2 block">技术栈针对性对齐</span>
                            <p className="text-xs text-corporate-800 font-bold leading-relaxed">
                              JD 提及了对“微服务治理”的要求，建议将您简历中关于 Spring Cloud 的描述细化为：熔断降级策略、服务发现优化及链路追踪实践。
                            </p>
                          </div>
                          <div className="p-4 bg-white rounded-2xl border border-green-100 shadow-sm">
                            <span className="text-[10px] font-black text-green-600 uppercase tracking-wider mb-2 block">业务场景话术优化</span>
                            <p className="text-xs text-corporate-800 font-bold leading-relaxed">
                              针对该岗位的电商背景，建议将通用项目描述转化为：支撑大促期间系统稳定性，通过多级缓存方案解决热点 Key 问题。
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6 bg-corporate-100/50 border-t border-corporate-100 flex justify-end items-center gap-4">
                <button 
                  onClick={() => setShowResumeOptimizer(false)}
                  className="px-8 py-3 bg-white border-2 border-corporate-200 text-corporate-600 rounded-full font-black hover:bg-corporate-100 transition-all active:scale-95"
                >
                  取消
                </button>
                <button 
                  onClick={() => alert('已应用 AI 优化建议到简历')}
                  className="px-8 py-3 bg-green-600 text-white rounded-full font-black hover:bg-green-700 transition-all shadow-lg shadow-green-200 active:scale-95 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  应用优化建议
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}} />
    </main>
  );
}
