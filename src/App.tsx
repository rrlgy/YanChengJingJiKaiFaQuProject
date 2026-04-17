/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  QrCode, 
  ShieldCheck, 
  User, 
  Download, 
  BookOpen, 
  ExternalLink, 
  AlertCircle,
  Phone, 
  MapPin, 
  Map,
  HelpCircle,
  ChevronRight,
  Monitor,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

// --- Components ---

const TabButton = ({ active, onClick, children, className = "" }: { active: boolean, onClick: () => void, children: React.ReactNode, icon: any, className?: string }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center py-4 px-2 transition-all relative cursor-pointer min-w-0 ${
      active ? 'text-primary' : 'text-text-gray hover:text-primary'
    } ${className}`}
  >
    {/* Use a hidden bold text to reserve space and prevent width jumping */}
    <div className="relative flex items-center justify-center">
      <span className={`text-base block ${active ? 'font-semibold' : 'font-normal'}`}>{children}</span>
      <span className="text-base font-semibold invisible h-0 overflow-hidden block" aria-hidden="true">{children}</span>
    </div>
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-primary"
      />
    )}
  </button>
);

const DownloadButton = ({ icon: Icon, label, sublabel }: { icon: any, label: string, sublabel?: string }) => (
  <button className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all group">
    <div className="p-2 bg-blue-500/20 rounded-md group-hover:bg-blue-500/40 transition-colors">
      <Icon size={18} className="text-blue-400" />
    </div>
    <div className="text-left">
      <div className="text-sm font-medium text-white">{label}</div>
      {sublabel && <div className="text-[10px] text-blue-200/60">{sublabel}</div>}
    </div>
  </button>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'scan' | 'ca' | 'user'>('scan');
  const [showPassword, setShowPassword] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowBubble(true);
      setTimeout(() => {
        setShowBubble(false);
      }, 1000);
    }, 6000); // 5s interval + 1s display = 6s cycle

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col font-sans bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="h-20 bg-white border-b border-gray-200 flex items-center px-6 md:px-12 flex-shrink-0 z-50 shadow-sm">
        <div className="flex items-center h-full py-2">
          <img src="/web-title.png" alt="盐城经济技术开发区公共资源电子交易平台系统" className="h-full w-auto object-contain" referrerPolicy="no-referrer" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden flex flex-col min-h-0">
        {/* Background with tech pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          {/* Decorative circles */}
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-400/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto max-w-[1600px] px-6 md:px-12 flex-1 flex flex-col md:flex-row items-center justify-center gap-20 z-10 py-8">
          
          {/* Left Side: Promo */}
          <div className="hidden lg:flex flex-col gap-10 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img src="/bzt_intro.png" alt="标证通介绍" className="w-full h-auto drop-shadow-2xl" referrerPolicy="no-referrer" />
            </motion.div>
          </div>

          {/* Right Side: Login Card */}
          <div className="relative flex items-center">
            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[420px] h-[580px] bg-white rounded-[24px] shadow-2xl border border-border-clean overflow-hidden flex flex-col z-20 relative"
            >
              {/* Tabs */}
              <div className="flex border-b border-border-clean px-4">
                <TabButton active={activeTab === 'scan'} onClick={() => setActiveTab('scan')} icon={QrCode} className="w-1/2">标证通登录</TabButton>
                <TabButton active={activeTab === 'ca'} onClick={() => setActiveTab('ca')} icon={ShieldCheck} className="w-1/2">CA证书登录</TabButton>
              </div>

              <div className="p-10 flex-1 flex flex-col">
                <div className="h-[260px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'scan' && (
                      <motion.div
                        key="scan"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center space-y-4"
                      >
                        <div className="text-center space-y-1">
                          <p className="text-[13px] text-text-gray">
                            <span className="text-blue-500 underline cursor-pointer">下载</span>新点标证通APP，免费注册绑定，购买证书后，
                          </p>
                          <p className="text-sm font-medium text-text-dark">扫码即可直接登录平台</p>
                        </div>
                        
                        <div className="p-2 border border-border-clean rounded-lg bg-white shadow-sm">
                          <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=login-token-123" alt="Login QR" className="w-[140px] h-[140px]" />
                        </div>
                        
                        <p className="text-sm text-text-gray">
                          打开新点标证通，扫一扫登录
                        </p>
                      </motion.div>
                    )}

                    {activeTab === 'ca' && (
                      <motion.div
                        key="ca"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-12 py-4"
                      >
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 border-r pr-3 border-gray-200">
                             <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
                               <Lock size={16} className="text-gray-400" />
                             </div>
                          </div>
                          <input 
                            type="password" 
                            placeholder="请输入密码" 
                            className="w-full pl-20 pr-4 py-3.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none transition-all group-hover:border-gray-300"
                          />
                        </div>

                        <button className="w-full py-3.5 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-200 text-lg">
                          立即登录
                        </button>
                      </motion.div>
                    )}

                    {/* Removed User Login and Register Link */}
                  </AnimatePresence>
                </div>

                {/* Only Troubleshooting and Download buttons at the bottom */}
                <div className="mt-auto space-y-6">
                  {/* Troubleshooting Links */}
                  <div className="flex flex-col gap-2 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1.5 text-[12px]">
                      <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">!</div>
                      <span className="text-text-dark font-medium">无法登录？请点击</span>
                      <a href="#" className="text-orange-600 underline font-medium">环境一键修复</a>
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px]">
                      <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">!</div>
                      <span className="text-text-dark font-medium">仍然无法登录？请点击</span>
                      <a href="#" className="text-orange-600 underline font-medium">常见问题</a>
                    </div>
                  </div>

                  {/* Horizontal Action Buttons */}
                  <div className="flex gap-4">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-orange-400 hover:bg-orange-500 text-white text-xs font-bold rounded shadow-sm transition-colors">
                      <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center"><Download size={10} /></div>
                      手册下载
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-orange-400 hover:bg-orange-500 text-white text-xs font-bold rounded shadow-sm transition-colors">
                      <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center"><Download size={10} /></div>
                      驱动下载
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Platform Help Toggle (Tech Badge Style - Integrated to Card Edge) */}
            <button 
              onClick={() => setShowHelp(!showHelp)}
              className={`absolute right-[-28px] top-[100px] w-[32px] h-[130px] z-[40] transition-all duration-300 transform active:scale-95 group focus:outline-none flex`}
            >
              <div 
                className={`w-full h-full flex flex-col items-center justify-center relative transition-colors duration-300 ${showHelp ? 'bg-orange-600 shadow-inner' : 'bg-orange-500 shadow-[4px_0_12px_rgba(249,115,22,0.4)] group-hover:bg-orange-600'}`}
                style={{
                  clipPath: 'polygon(0% 0%, 100% 8%, 100% 92%, 0% 100%)',
                }}
              >
                {/* Decorative Tech Accents (matching user reference image style) */}
                <div className="absolute top-1.5 left-2 right-2 h-[1px] bg-white/30"></div>
                <div className="absolute bottom-1.5 left-2 right-2 h-[1px] bg-white/30"></div>
                <div className="absolute top-[40%] right-0 w-[1.5px] h-[20%] bg-white/30"></div>

                <div className="[writing-mode:vertical-rl] text-white text-[12px] font-bold tracking-[0.4em] mb-1 drop-shadow-sm select-none">
                  平台帮助
                </div>
                
                <motion.div
                  animate={{ rotate: showHelp ? 180 : 0 }}
                  className="mt-1 opacity-80"
                >
                  <ChevronRight size={14} strokeWidth={3} />
                </motion.div>

                {/* Vertical Inner Glow (Card side) */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10 group-hover:bg-white/20"></div>
              </div>
            </button>

            {/* Platform Help Panel (Dynamic Appearance) */}
            <AnimatePresence mode="wait">
              {showHelp && (
                <motion.div
                  initial={{ opacity: 0, x: -20, scaleX: 0 }}
                  animate={{ opacity: 1, x: 0, scaleX: 1 }}
                  exit={{ opacity: 0, x: -20, scaleX: 0 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  style={{ originX: 0 }}
                  className="absolute left-[420px] top-0 ml-11 w-max h-auto z-10 pointer-events-auto"
                >
                  {/* Decorative Badge Link Top */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 px-8 py-2 bg-blue-600 rounded-t-xl border-x border-t border-blue-400/50 flex items-center gap-2 shadow-[0_-5px_15px_-3px_rgba(37,99,235,0.4)] z-20">
                    <span className="text-white text-sm font-bold tracking-widest">平台帮助</span>
                    <ChevronRight size={14} className="text-white/60 rotate-90" />
                  </div>

                  {/* Panel Content - Styled like the screenshot */}
                  <div className="w-[360px] bg-[#1a4ea8]/95 backdrop-blur-2xl border border-blue-400/30 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden relative p-8 pt-10">
                    <div className="flex flex-col gap-y-4 pr-2">
                      {[
                        "基本信息如何填写/修改/提交/审核？",
                        "如何上传投标文件？",
                        "如何投标？如何报名？",
                        "如何下载招标文件？",
                        "如何办理CA？",
                        "如何找回账号密码？"
                      ].map((text, idx) => (
                        <div key={idx} className="flex items-start gap-2 group/item cursor-pointer border-b border-white/5 pb-3 last:border-0 last:pb-0">
                          <span className="text-blue-200/60 text-xs font-mono mt-0.5">{idx + 1}、</span>
                          <span className="text-white/90 text-[13px] leading-relaxed group-hover/item:text-orange-300 transition-colors">
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Robot Mascot Container - Lower Z-index to stay behind login card */}
            <div className="absolute -right-20 bottom-12 hidden xl:block z-0">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="relative group cursor-pointer"
              >
                {/* Speech Bubble - High Z-index to float ABOVE everything */}
                <AnimatePresence>
                  {(showBubble || true) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ 
                        opacity: showBubble ? 1 : 0, 
                        y: showBubble ? 0 : 10,
                        scale: showBubble ? 1 : 0.9
                      }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className={`absolute -top-24 left-12 bg-white p-4 rounded-2xl shadow-2xl text-[12px] text-gray-700 w-48 leading-relaxed z-[999] border border-blue-100 pointer-events-none transition-opacity duration-300 ${showBubble ? 'opacity-100' : 'group-hover:opacity-100 group-hover:translate-y-0'}`}
                    >
                      <div className="font-bold text-blue-600 mb-1">HI，我是客服小桥！</div>
                      您的专属招投标服务向导，有问题请点我咨询哦~
                      <div className="absolute bottom-[-8px] left-6 w-4 h-4 bg-white rotate-45 border-l border-b border-blue-100"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Robot Image - Stays behind because parent is z-0 */}
                <div className="w-24 h-24 relative">
                  <img 
                    src="/robot.png" 
                    alt="Robot Mascot" 
                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-16 h-3 bg-black/20 rounded-[100%] blur-md"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Platform Help Section - Hidden to fit one screen */}
        {/*
        <div className="container mx-auto max-w-[1600px] px-6 md:px-12 pb-16 z-10">
          ...
        </div>
        */}
      </main>

      {/* Footer */}
      <footer className="bg-[#1e293b] text-[#94a3b8] py-8 px-10 border-t border-white/5 flex-shrink-0">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            {/* Left: Identification Images & New Icon Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="/dangzheng.png" alt="党政机关" className="h-14 w-auto" referrerPolicy="no-referrer" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="/zhaocuo.png" alt="政府网站找错" className="h-14 w-auto" referrerPolicy="no-referrer" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="/jubao.png" alt="不良信息举报中心" className="h-14 w-auto" referrerPolicy="no-referrer" />
              </a>
              
              {/* Custom Icon Links */}
              <a href="#" className="flex flex-col items-center justify-center w-14 h-14 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all group">
                <Phone size={18} className="text-blue-400 group-hover:scale-110 transition-transform mb-1" />
                <span className="text-[10px] text-white/60">联系我们</span>
              </a>
              <a href="#" className="flex flex-col items-center justify-center w-14 h-14 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all group">
                <Map size={18} className="text-blue-400 group-hover:scale-110 transition-transform mb-1" />
                <span className="text-[10px] text-white/60">网站地图</span>
              </a>
            </div>

            {/* Right: Detailed Info Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-4 text-[13px] leading-relaxed">
              <div className="space-y-1">
                <p>版权所有：盐城经济技术开发区管理委员会</p>
                <p>盐城经济技术开发区党政办公室主办</p>
              </div>
              <div className="space-y-1">
                <p>备案序号：苏ICP备05002185号-1</p>
                <p className="flex items-center gap-1">
                  <img src="/guohui.png" alt="网安备案" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />
                  苏公网安备 32099102000193号
                </p>
              </div>
              <div className="space-y-1">
                <p>政府网站标识码：3209000013</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
