/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Pause, 
  MicOff, 
  ArrowRightLeft, 
  Users, 
  Settings, 
  LayoutDashboard, 
  UserCircle, 
  ShieldCheck, 
  MessageSquare, 
  FileText, 
  BarChart3, 
  Cpu, 
  Activity, 
  Search, 
  Bell, 
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  TrendingUp,
  CreditCard,
  PieChart,
  Target,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Maximize2,
  ScreenShare,
  Coffee,
  HelpCircle,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- 类型定义 ---
interface Customer {
  name: string;
  id: string;
  phone: string;
  gender: string;
  age: number;
  occupation: string;
  assets: number;
  liabilities: number;
  activeBalance: number;
  portrait: string[];
}

interface Product {
  name: string;
  value: string;
  type: string;
}

// --- 模拟数据 ---
const MOCK_CUSTOMER: Customer = {
  name: "张三",
  id: "90011",
  phone: "138****8000",
  gender: "男",
  age: 40,
  occupation: "金融业务人员",
  assets: 1000000,
  liabilities: 400000,
  activeBalance: 100000,
  portrait: ["我行员工", "睡眠客户", "代发客户", "预授信客户", "临界客户", "45岁", "金卡潜在提升客户", "敏感职业"]
};

const HOLDINGS = [
  { label: '定期', value: '281万元', color: 'bg-blue-500' },
  { label: '理财', value: '12万元', color: 'bg-emerald-500' },
  { label: '大额存单', value: '20万元', color: 'bg-amber-500' },
  { label: '保险', value: '12万元', color: 'bg-rose-500' },
  { label: '贵金属', value: '281万元', color: 'bg-indigo-500' },
  { label: '通知存款', value: '12万元', color: 'bg-slate-500' },
  { label: '互联网定期', value: '20万元', color: 'bg-cyan-500' },
];

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "总览", active: false },
  { icon: UserCircle, label: "门户", active: false },
  { icon: ShieldCheck, label: "IVR配置管理", active: false },
  { icon: MessageSquare, label: "在线客服", active: false },
  { icon: Phone, label: "呼入系统", active: false },
  { icon: Cpu, label: "智能呼入工作台", active: true },
  { icon: Activity, label: "智能助手管理", active: false },
  { icon: BarChart3, label: "统计分析", active: false },
  { icon: FileText, label: "交易菜单", active: false },
  { icon: Users, label: "多租户", active: false },
  { icon: Target, label: "意图识别管理", active: false },
];

// --- 组件 ---

const Sidebar = () => (
  <aside className="w-64 bg-[#001529] h-screen flex flex-col shrink-0 text-slate-300">
    <div className="p-4 flex items-center gap-2 mb-4 border-b border-white/10">
      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
        <Activity className="w-5 h-5 text-white" />
      </div>
      <span className="text-white font-bold tracking-wide">远程银行系统</span>
    </div>
    <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto custom-scrollbar">
      {SIDEBAR_ITEMS.map((item, idx) => (
        <button
          key={idx}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded text-sm transition-colors ${
            item.active 
              ? 'bg-blue-600 text-white' 
              : 'hover:text-white hover:bg-white/5'
          }`}
        >
          <item.icon className="w-4 h-4 shrink-0" />
          {item.label}
          {item.label === '呼入系统' && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
          {item.label === '智能助手管理' && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
        </button>
      ))}
    </nav>
  </aside>
);

const TopNav = () => (
  <div className="bg-[#001529] text-white flex flex-col shrink-0">
    <div className="h-12 px-6 flex items-center justify-between border-b border-white/5">
      <div className="flex items-center gap-6 h-full">
        <div className="flex items-center gap-2 text-sm font-medium h-full border-b-2 border-blue-500 px-2 cursor-pointer">
          <Phone className="w-4 h-4" /> 客户来电
        </div>
        <div className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
          <Activity className="w-4 h-4" /> 实时质检
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-xs">
          <span className="opacity-70">当前状态：</span>
          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-500" /> 未登录</span>
          <span className="opacity-70 ml-4">排队人数：</span>
          <span className="font-bold">0</span>
          <div className="flex items-center gap-0.5 ml-2">
            {[0,0,0,0].map((_,i) => <div key={i} className="w-3 h-4 bg-blue-500/30 rounded-sm border border-blue-400/50 flex items-center justify-center font-mono">0</div>)}
          </div>
        </div>
        
        <div className="flex items-center gap-4 border-l border-white/10 pl-6 h-8">
          <button className="flex flex-col items-center gap-0.5 opacity-70 hover:opacity-100"><Settings className="w-3.5 h-3.5" /><span className="text-[10px]">设置</span></button>
          <button className="flex flex-col items-center gap-0.5 opacity-70 hover:opacity-100"><Users className="w-3.5 h-3.5" /><span className="text-[10px]">签入</span></button>
          <button className="flex flex-col items-center gap-0.5 opacity-70 hover:opacity-100"><Coffee className="w-3.5 h-3.5" /><span className="text-[10px]">示闲</span></button>
          <button className="flex flex-col items-center gap-0.5 opacity-70 hover:opacity-100"><Volume2 className="w-3.5 h-3.5" /><span className="text-[10px]">呼出</span></button>
          <button className="flex flex-col items-center gap-0.5 opacity-70 hover:opacity-100"><Pause className="w-3.5 h-3.5" /><span className="text-[10px]">挂断</span></button>
          <button className="flex flex-col items-center gap-0.5 opacity-70 hover:opacity-100"><ShieldCheck className="w-3.5 h-3.5" /><span className="text-[10px]">保持</span></button>
          <button className="flex flex-col items-center gap-0.5 opacity-70 hover:opacity-100"><ArrowRightLeft className="w-3.5 h-3.5" /><span className="text-[10px]">转接</span></button>
          <button className="flex flex-col items-center gap-0.5 opacity-70 hover:opacity-100"><Users className="w-3.5 h-3.5" /><span className="text-[10px]">签退</span></button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border-2 border-white/20">
            <UserCircle className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
    
    <div className="h-10 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-slate-800">智能呼入工作台</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">最近浏览：</span>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] flex items-center gap-1">模拟控制台 <span className="cursor-pointer">×</span></span>
          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] border border-blue-100 flex items-center gap-1">智能呼入工作台 <span className="cursor-pointer">×</span></span>
        </div>
      </div>
    </div>
  </div>
);

const MarketingInsights = () => (
  <div className="bg-white rounded border border-slate-200 overflow-hidden flex flex-col h-full">
    <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 bg-blue-600 text-white flex items-center justify-center text-[10px] rounded">营</span>
        <span className="text-xs font-bold text-slate-700">营销洞察</span>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
        <Bell className="w-3 h-3" /> 参与一下营销活动，请加强营销力度：1、可以参加分期五折优惠券活动；2、分期满10000元可优惠换购扫地机器人；3、办理3期分期可享
        <ChevronRight className="w-3 h-3" />
      </div>
    </div>
    <div className="p-4 grid grid-cols-2 gap-4 flex-1">
      <div className="space-y-2 border-r border-slate-100 pr-4">
        <div className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-sm inline-block mb-1">增值产品推荐</div>
        <div className="space-y-1">
          {['XX安现实理财类理财...', 'XX银理财XX安活期化...', '“添盈”固定收益类理财...', '“安盈”稳健最低持有30...', '“安盈”最低持有一年'].map((item, i) => (
            <div key={i} className="text-[11px] text-slate-600 truncate flex items-center gap-1.5">
               <div className="w-1 h-1 rounded-full bg-slate-300" /> {item}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-[11px] text-slate-700 leading-relaxed">
          客户可参与一下营销活动，请加强营销力度：1、可以参加分期五折优惠券活动；2、分期满10000元可优惠换购扫地机器人；3、办理3期分期可享受0利息优惠
        </p>
        <div className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-sm inline-block">服务产品推荐</div>
      </div>
    </div>
  </div>
);

const ServiceInsights = () => (
  <div className="bg-white rounded border border-slate-200 overflow-hidden flex flex-col h-full">
    <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 bg-blue-600 text-white flex items-center justify-center text-[10px] rounded">服</span>
        <span className="text-xs font-bold text-slate-700">服务洞察</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-32 h-6 bg-slate-100 rounded-full" />
        <button className="text-[10px] text-blue-600 border border-blue-200 px-2 py-0.5 rounded hover:bg-blue-50">业务特殊判断提示</button>
      </div>
    </div>
    <div className="p-4 grid grid-cols-2 gap-4 flex-1">
      <div className="border border-slate-200 rounded p-2 flex flex-col">
        <div className="flex items-center justify-between mb-2">
           <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">用户洞察</span>
           <span className="text-[10px] text-slate-400 cursor-pointer">更多</span>
        </div>
        <div className="flex-1 bg-slate-50 rounded" />
      </div>
      <div className="border border-slate-200 rounded p-2 flex flex-col">
        <div className="flex items-center justify-between mb-2">
           <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">主动服务</span>
        </div>
        <div className="flex-1 bg-slate-50 rounded" />
      </div>
    </div>
  </div>
);

const RadialChart = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Concentric Circles */}
    <div className="absolute w-[280px] h-[280px] rounded-full border border-blue-100 flex items-center justify-center">
      <div className="w-[200px] h-[200px] rounded-full border border-blue-200 flex items-center justify-center">
        <div className="w-[120px] h-[120px] rounded-full border border-blue-400/30 flex items-center justify-center bg-blue-50/30">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
             <UserCircle className="w-14 h-14 text-white opacity-80" />
          </div>
        </div>
      </div>
    </div>
    
    {/* Labels around the circle */}
    <div className="absolute inset-0">
      {[
        { label: '基本信息', angle: -60 },
        { label: '资产负债', angle: 30 },
        { label: '产品持有', angle: 120 },
        { label: '偏好', angle: 180 },
        { label: '签约信息', angle: 240 },
      ].map((item, i) => {
        const x = Math.cos((item.angle * Math.PI) / 180) * 110;
        const y = Math.sin((item.angle * Math.PI) / 180) * 110;
        return (
          <div 
            key={i} 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
          >
            <div className="bg-white border border-blue-200 text-[10px] px-2 py-1 rounded shadow-sm flex items-center gap-1.5 transform -rotate-[attr(data-angle)]">
               <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
               {item.label}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const BottomBar = () => (
  <footer className="h-10 bg-[#001529] text-white px-4 flex items-center justify-between text-[11px] shrink-0">
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-1"><span className="opacity-60">坐席姓名：</span>李秋水</div>
      <div className="flex items-center gap-1"><span className="opacity-60">坐席工号：</span>90011</div>
      <div className="flex items-center gap-1"><span className="opacity-60">坐席分机号：</span>1001</div>
      <div className="flex items-center gap-1"><span className="opacity-60">时间：</span>2023-12-30</div>
    </div>
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-1"><span className="opacity-60">当日积点：</span>0.00</div>
      <div className="flex items-center gap-1"><span className="opacity-60">金额：</span>0.00</div>
      <div className="flex items-center gap-1"><span className="opacity-60">当日累计积点：</span>0.00</div>
      <div className="flex items-center gap-1"><span className="opacity-60">EPPC：</span>0.00</div>
    </div>
    <div className="flex items-center gap-2">
      <div className="px-2 py-0.5 bg-blue-600 rounded-sm text-[10px]">IM 99+</div>
    </div>
  </footer>
);

// --- Shared Mock Data ---
const MOCK_INSTALLMENTS = [
  { id: '24', plan: '消费分期', type: '消费分期', postDate: '20230627', appDate: '20230629', amount: '899.00', periods: '4/12', waived: '0', rate: '0.08', principal: '33.25', interest: '0.33', total: '33.58', status: '提前还款', remaining: '266.32', annualRate: '1.20', method: '等额本息', last4: '1234', channel: '手机银行', summary: '京东商城消费', isCarLoan: '-', initialTotalInterest: '4.00', prepaymentPenalty: '10.00' },
  { id: '23', plan: '账单分期', type: '账单分期', postDate: '20230627', appDate: '20230627', amount: '399.00', periods: '0/3', waived: '0', rate: '0.05', principal: '133.00', interest: '0.19', total: '133.19', status: '完成', remaining: '0.00', annualRate: '0.90', method: '等额本息', last4: '1234', channel: '微信银行', summary: '美团外卖消费', isCarLoan: '-', initialTotalInterest: '0.57', prepaymentPenalty: '5.00' },
  { id: '22', plan: '现金分期', type: '现金分期', postDate: '20230627', appDate: '20230627', amount: '300.00', periods: '0/8', waived: '0', rate: '0.80', principal: '100.00', interest: '2.40', total: '102.40', status: '完成', remaining: '0.00', annualRate: '12.00', method: '等额本息', last4: '1234', channel: '网点办理', summary: '超市购物分期', isCarLoan: '-', initialTotalInterest: '19.20', prepaymentPenalty: '15.00' },
  { id: '21', plan: '自动分期', type: '自动分期', postDate: '20230701', appDate: '20230701', amount: '1200.00', periods: '1/6', waived: '0', rate: '0.10', principal: '200.00', interest: '1.20', total: '201.20', status: '进行中', remaining: '1006.00', annualRate: '1.50', method: '等额本息', last4: '5678', channel: '系统自动', summary: '大额交易自动分期', isCarLoan: '-', initialTotalInterest: '7.20', prepaymentPenalty: '20.00' },
  { id: '20', plan: '银联pos分期', type: '银联pos分期', postDate: '20230705', appDate: '20230705', amount: '5000.00', periods: '2/24', waived: '0', rate: '0.12', principal: '208.33', interest: '6.00', total: '214.33', status: '进行中', remaining: '4583.34', annualRate: '1.80', method: '等额本息', last4: '9012', channel: '线下商户', summary: '家电卖场消费', isCarLoan: '-', initialTotalInterest: '144.00', prepaymentPenalty: '50.00' },
  { id: '19', plan: '专项分期', type: '专项分期', postDate: '20230710', appDate: '20230712', amount: '15000.00', periods: '5/36', waived: '0', rate: '0.15', principal: '416.67', interest: '22.50', total: '439.17', status: '进行中', remaining: '12916.65', annualRate: '2.20', method: '等额本息', last4: '3456', channel: '网点签约', summary: '装修专项分期', isCarLoan: '-', initialTotalInterest: '810.00', prepaymentPenalty: '150.00' },
  { id: '18', plan: '现金分期', type: '现金分期', postDate: '20230715', appDate: '20230715', amount: '2000.00', periods: '1/12', waived: '0', rate: '0.10', principal: '166.67', interest: '2.00', total: '168.67', status: '进行中', remaining: '1833.33', annualRate: '1.20', method: '等额本息', last4: '6789', channel: '手机银行', summary: '现金周转', isCarLoan: '-', initialTotalInterest: '24.00', prepaymentPenalty: '20.00' },
  { id: '17', plan: '现金分期', type: '现金分期', postDate: '20230720', appDate: '20230720', amount: '3500.00', periods: '3/6', waived: '0', rate: '0.09', principal: '583.33', interest: '3.15', total: '586.48', status: '进行中', remaining: '1750.00', annualRate: '1.10', method: '等额本息', last4: '4321', channel: '网点办理', summary: '教育支出', isCarLoan: '-', initialTotalInterest: '18.90', prepaymentPenalty: '35.00' },
];

const Pagination = ({ 
  total = 0, 
  pageSize = 5, 
  currentPage = 1, 
  onPageChange,
  onPageSizeChange 
}: { 
  total?: number;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}) => {
  const totalPages = Math.ceil(total / pageSize) || 1;

  return (
    <div className="bg-[#f4f6f8] px-4 py-3 flex items-center justify-end gap-3 text-[12px] text-slate-600 border-t border-slate-200">
      <div className="flex items-center gap-4">
        <span>共 {total} 条</span>
        <div className="relative group">
          <div className="flex items-center gap-2 border border-slate-200 bg-white px-3 py-1.5 rounded cursor-pointer hover:border-blue-400 transition-colors">
            <span>{pageSize}条/页</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="absolute bottom-full mb-1 right-0 w-24 bg-white border border-slate-200 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50 overflow-hidden">
            {[5, 10, 20].map(size => (
              <div 
                key={size}
                onClick={() => onPageSizeChange?.(size)}
                className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${pageSize === size ? 'bg-blue-50 text-blue-600 font-bold' : ''}`}
              >
                {size}条/页
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button 
          onClick={() => currentPage > 1 && onPageChange?.(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`w-8 h-8 flex items-center justify-center border border-slate-200 rounded bg-white transition-colors ${currentPage <= 1 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500 hover:text-blue-600'}`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white font-bold shadow-sm">
          {currentPage}
        </button>
        <button 
          onClick={() => currentPage < totalPages && onPageChange?.(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`w-8 h-8 flex items-center justify-center border border-slate-200 rounded bg-white transition-colors ${currentPage >= totalPages ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500 hover:text-blue-600'}`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span>前往</span>
        <input 
          type="text" 
          value={currentPage}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val) && val >= 1 && val <= totalPages) {
              onPageChange?.(val);
            }
          }}
          className="w-12 h-8 border border-slate-200 rounded text-center outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 font-medium tabular-nums shadow-sm"
        />
        <span>页</span>
      </div>
    </div>
  );
};

const InstallmentDetails = ({ onBack }: { onBack: () => void }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(0);
  const [isSearched, setIsSearched] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const paginatedData = MOCK_INSTALLMENTS.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const headers = [
    '分期付款序号', '分期计划', '分期类型', '入账日期', '分期申请日期', '分期金额', '剩余/总期数', 
    '分期利息减免期数', '每期利率', '每期应还本金', '每期应还利息', '每期应还金额', '分期状态', 
    '分期剩余还款金额（含剩余利息）', '年化利率', '还款方式', '卡号末四位', '办理渠道', '交易摘要'
  ];

  const handleSearch = () => {
    setIsSearched(true);
    setCurrentPage(1);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white">
      <div className="flex items-center bg-white border-b border-slate-200">
        <button 
          onClick={onBack}
          className="px-6 py-3 text-xs font-medium text-blue-600 flex items-center gap-2 border-r border-slate-100 hover:bg-slate-50 transition-colors"
        >
          <LayoutDashboard className="w-4 h-4" /> 交易首页
        </button>
        <div className="px-6 py-3 text-xs font-medium text-slate-800 bg-slate-50 flex items-center gap-4 border-r border-slate-100">
          分期付款明细查询 <span className="text-slate-300 hover:text-slate-500 cursor-pointer text-sm">×</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-1 p-4">
          <div className="bg-orange-50 border border-orange-100 p-3 rounded flex items-center gap-3">
            <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
              <AlertCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-bold text-orange-700">温馨提示：</span>
          </div>
          <div className="bg-red-50 border border-red-100 p-3 rounded flex items-center gap-3">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <Activity className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-bold text-red-700">重要提醒：</span>
          </div>
        </div>

        <div className="px-4 py-2 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Cpu className="w-6 h-6 text-blue-600" />
              </motion.div>
            </div>
            <span className="text-lg font-bold text-blue-800 tracking-tight">小雅推荐</span>
          </div>
          <div className="flex items-center gap-0.5">
            <span className="px-3 py-1 bg-blue-600 text-white text-[10px] rounded-l-full font-bold">推荐菜单</span>
            <span className="px-4 py-1 bg-blue-50 text-blue-700 text-[10px] rounded-r-full border border-blue-100 font-medium">分期付款明细查询</span>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <section className="bg-slate-100 p-8 rounded border border-slate-200">
            <div className="text-sm font-bold text-slate-600 mb-6">分期付款明细查询</div>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="text-sm text-slate-500">卡号</span>
              <input 
                type="text" 
                defaultValue="6225 **** **** 1234" 
                className="w-48 h-10 px-4 bg-white border border-slate-200 rounded outline-none focus:ring-1 focus:ring-blue-500 text-sm tabular-nums"
              />
              <span className="text-sm text-slate-500 ml-2">卡类型</span>
              <div className="w-24 h-10 px-4 bg-white border border-slate-200 rounded flex items-center justify-center text-sm text-slate-900 font-medium">
                在线卡
              </div>

              <button 
                onClick={handleSearch}
                className="px-8 h-10 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors ml-4"
              >
                查询
              </button>
            </div>
          </section>

          <section className="space-y-4">
            <div className="text-sm font-bold text-slate-700">分期付款明细查询</div>
            <div className="border border-slate-200 rounded overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse min-w-[2200px]">
                  <thead>
                    <tr className="bg-blue-50/50">
                      <th className="px-4 py-3 border-r border-slate-200 w-12 text-center"></th>
                      <th className="px-4 py-3 text-[11px] font-bold text-slate-600 border-r border-slate-200 text-center">序号</th>
                      {headers.map((header) => (
                        <th key={header} className="px-4 py-3 text-[11px] font-bold text-slate-600 border-x border-slate-200 first:border-l-0 last:border-r-0 whitespace-nowrap text-center">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {isSearched ? (
                      paginatedData.map((row, i) => {
                        const globalIndex = (currentPage - 1) * pageSize + i;
                        return (
                          <tr 
                            key={i} 
                            onClick={() => setSelectedRow(globalIndex)}
                            className={`hover:bg-blue-50/30 cursor-pointer transition-colors border-b border-slate-100 last:border-0 ${selectedRow === globalIndex ? 'bg-blue-50/50' : ''}`}
                          >
                            <td className="px-4 py-3 text-center">
                              <div className={`w-4 h-4 mx-auto rounded-full border flex items-center justify-center transition-all ${selectedRow === globalIndex ? 'border-blue-600 bg-blue-600 shadow-[0_0_0_2px_white_inset]' : 'border-slate-300 bg-white'}`}>
                                {selectedRow === globalIndex && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 tabular-nums text-center">{globalIndex + 1}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 font-medium tabular-nums text-center">{row.id}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 font-medium text-center">{row.plan}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center">{row.type}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 tabular-nums text-center">{row.postDate}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 tabular-nums text-center">{row.appDate}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center tabular-nums">{row.amount}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 tabular-nums text-center">{row.periods}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 tabular-nums text-center">-</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 tabular-nums text-center">{row.rate}%</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center tabular-nums">{row.principal}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center tabular-nums">{row.interest}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center tabular-nums">{row.total}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center">
                              {row.status}
                            </td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center tabular-nums">{row.remaining}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 tabular-nums text-center">{row.annualRate}%</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center">-</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 tabular-nums text-center">{row.last4}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center">{row.channel}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 italic text-center">{row.summary}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={headers.length + 2} className="px-4 py-20 text-center text-slate-400 text-xs">
                          请点击查询获取明细数据
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Pagination 
                total={isSearched ? MOCK_INSTALLMENTS.length : 0} 
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// --- 提前还款组件 ---

const PrepaymentPage = ({ onBack }: { onBack: () => void }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(0);
  const [isSearched, setIsSearched] = useState(false);
  const [queriedPenalties, setQueriedPenalties] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const paginatedData = MOCK_INSTALLMENTS.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const headers = [
    '分期付款序号', '交易日期', '分期计划', '分期类型', '是否购车/二手车分期', '分期初始本金金额', '剩余/总期数', 
    '分期利息减免期数', '每期应还金额', '分期初始总利息', '剩余应还本金', '提前还款利息', '提前还款违约金', 
    '还款方式', '年利率', '剩余应还利息'
  ];

  const handleSearch = () => {
    setIsSearched(true);
    setQueriedPenalties({});
    setCurrentPage(1);
  };

  const handleQueryPenalty = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setQueriedPenalties(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white">
      <div className="flex items-center bg-white border-b border-slate-200">
        <button 
          onClick={onBack}
          className="px-6 py-3 text-xs font-medium text-blue-600 flex items-center gap-2 border-r border-slate-100 hover:bg-slate-50 transition-colors"
        >
          <LayoutDashboard className="w-4 h-4" /> 交易首页
        </button>
        <div className="px-6 py-3 text-xs font-medium text-slate-800 bg-slate-50 flex items-center gap-4 border-r border-slate-100">
          分期付款提前还款 <span className="text-slate-300 hover:text-slate-500 cursor-pointer text-sm">×</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-1 p-4">
          <div className="bg-orange-50 border border-orange-100 p-3 rounded flex items-center gap-3">
            <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
              <AlertCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-bold text-orange-700">温馨提示：</span>
            <span className="text-xs text-orange-600">提前还款可能涉及违约金或手续费，请仔细核对分期计划及剩余金额。</span>
          </div>
          <div className="bg-red-50 border border-red-100 p-3 rounded flex items-center gap-3">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <Activity className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-bold text-red-700">重要提醒：</span>
            <span className="text-xs text-red-600">办理成功后将无法撤销，资金将实时扣划，请确保账户余额充足。</span>
          </div>
        </div>

        <div className="px-4 py-2 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Cpu className="w-6 h-6 text-blue-600" />
              </motion.div>
            </div>
            <span className="text-lg font-bold text-blue-800 tracking-tight">小雅推荐</span>
          </div>
          <div className="flex items-center gap-0.5">
            <span className="px-3 py-1 bg-blue-600 text-white text-[10px] rounded-l-full font-bold">推荐菜单</span>
            <span className="px-4 py-1 bg-blue-50 text-blue-700 text-[10px] rounded-r-full border border-blue-100 font-medium">分期付款提前还款</span>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <section className="bg-slate-100 p-8 rounded border border-slate-200">
            <div className="text-sm font-bold text-slate-600 mb-6">分期付款提前还款</div>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="text-sm text-slate-500">卡号</span>
              <input 
                type="text" 
                defaultValue="6225 **** **** 1234" 
                className="w-48 h-10 px-4 bg-white border border-slate-200 rounded outline-none focus:ring-1 focus:ring-blue-500 text-sm tabular-nums"
              />
              <span className="text-sm text-slate-500 ml-2">卡类型</span>
              <div className="w-24 h-10 px-4 bg-white border border-slate-200 rounded flex items-center justify-center text-sm text-slate-900 font-medium">
                在线卡
              </div>

              <button 
                onClick={handleSearch}
                className="px-8 h-10 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors ml-4"
              >
                查询
              </button>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-slate-700">分期付款提前还款明细</div>
              <button 
                onClick={() => alert('已提交提前还款申请')}
                className="px-8 h-10 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                提前还款
              </button>
            </div>
            <div className="border border-slate-200 rounded overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse min-w-[2200px]">
                  <thead>
                    <tr className="bg-blue-50/50">
                      <th className="px-4 py-3 border-r border-slate-200 w-12 text-center"></th>
                      <th className="px-4 py-3 text-[11px] font-bold text-slate-600 border-r border-slate-200 text-center">序号</th>
                      {headers.map((header) => (
                        <th key={header} className="px-4 py-3 text-[11px] font-bold text-slate-600 border-x border-slate-200 first:border-l-0 last:border-r-0 whitespace-nowrap text-center">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {isSearched ? (
                      paginatedData.map((row, i) => {
                        const globalIndex = (currentPage - 1) * pageSize + i;
                        return (
                          <tr 
                            key={i} 
                            onClick={() => setSelectedRow(globalIndex)}
                            className={`hover:bg-blue-50/30 cursor-pointer transition-colors border-b border-slate-100 last:border-0 ${selectedRow === globalIndex ? 'bg-blue-50/50' : ''}`}
                          >
                            <td className="px-4 py-3 text-center">
                              <div className={`w-4 h-4 mx-auto rounded-full border flex items-center justify-center transition-all ${selectedRow === globalIndex ? 'border-blue-600 bg-blue-600 shadow-[0_0_0_2px_white_inset]' : 'border-slate-300 bg-white'}`}>
                                {selectedRow === globalIndex && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 tabular-nums text-center">{globalIndex + 1}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 font-medium tabular-nums text-center">{row.id}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 tabular-nums text-center">{row.postDate}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 font-medium text-center">{row.type}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center">{row.type}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center">{row.isCarLoan}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center tabular-nums">{row.amount}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 tabular-nums text-center">{row.periods}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 tabular-nums text-center">-</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center tabular-nums">{row.total}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center tabular-nums">{row.initialTotalInterest}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center tabular-nums">{row.remaining}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center tabular-nums">-</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center tabular-nums">
                              {queriedPenalties[globalIndex] ? (
                                row.prepaymentPenalty
                              ) : (
                                <button 
                                  onClick={(e) => handleQueryPenalty(e, globalIndex)}
                                  className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                                >
                                  查询
                                </button>
                              )}
                            </td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center">-</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 tabular-nums text-center">-</td>
                            <td className="px-4 py-3 text-[11px] text-slate-900 text-center tabular-nums">-</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={headers.length + 2} className="px-4 py-20 text-center text-slate-400 text-xs">
                          请点击查询获取明细数据
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Pagination 
                total={isSearched ? MOCK_INSTALLMENTS.length : 0} 
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// --- 主应用 ---

export default function App() {
  const [activeSubTab, setActiveSubTab] = useState('客户画像');
  const [currentView, setCurrentView] = useState<'dashboard' | 'installments' | 'prepayment'>('dashboard');

  return (
    <div className="flex h-screen bg-[#f0f2f5] font-plus-jakarta text-slate-900 overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav />

        {/* 通讯面板 & 核心内容区域 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
          
          {/* Top Sections: Insights */}
          <div className="grid grid-cols-2 gap-3 h-[180px]">
             <MarketingInsights />
             <ServiceInsights />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded shadow-sm flex items-center gap-2"><Users className="w-3.5 h-3.5" /> 菜单选择</button>
              <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded hover:bg-slate-50">挂失</button>
              <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded hover:bg-slate-50">激活</button>
              <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded hover:bg-slate-50">申请进度查询</button>
              <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded hover:bg-slate-50">客户资料修改</button>
              <button 
                onClick={() => setCurrentView('installments')}
                className={`px-3 py-1 text-xs rounded transition-all ${
                  currentView === 'installments' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                分期付款明细查询
              </button>
              <button 
                onClick={() => setCurrentView('prepayment')}
                className={`px-3 py-1 text-xs rounded transition-all ${
                  currentView === 'prepayment' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                分期付款提前还款
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="请输入内容" className="w-56 h-8 pl-9 pr-4 bg-white border border-slate-200 rounded text-xs outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <button className="px-3 h-8 bg-blue-600 text-white text-xs rounded flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> 自定义菜单</button>
              <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded"><Maximize2 className="w-4 h-4" /></button>
              <button className="px-3 h-8 bg-blue-800 text-white text-xs rounded flex items-center gap-1.5"><ScreenShare className="w-3.5 h-3.5" /> 双屏模式</button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {currentView === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded border border-slate-200 flex-1 flex flex-col min-h-[600px]"
              >
                {/* Identity/Search Bar */}
                <div className="p-4 border-b border-slate-100 flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-l border border-blue-100 text-xs font-bold text-blue-700">
                    <ArrowRightLeft className="w-3.5 h-3.5" /> 交易首页
                  </div>
                  <div className="flex-1 flex items-center gap-4 justify-center">
                    <span className="text-sm font-bold text-slate-700">身份认证</span>
                    <div className="flex items-center border border-slate-200 rounded overflow-hidden">
                      <select className="bg-slate-50 px-3 py-1.5 text-xs border-r border-slate-200 outline-none">
                        <option>借记卡</option>
                      </select>
                      <input type="text" placeholder="输入内容.." className="px-4 py-1.5 text-xs outline-none w-64" />
                    </div>
                    <button className="px-6 py-1.5 bg-blue-600 text-white text-xs rounded">查询</button>
                  </div>
                </div>

                {/* Content Tabs */}
                <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-8">
                  {['客户画像', '客户画像(动态)', '客户信息', 'IVR轨迹与MOT', '进线热力图', '交互历史'].map(tab => (
                    <button 
                      key={tab} 
                      onClick={() => setActiveSubTab(tab)}
                      className={`text-xs font-medium pb-2 border-b-2 transition-all ${
                        activeSubTab === tab ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-800'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Dashboard Content */}
                <div className="flex-1 flex p-6 gap-6 overflow-hidden">
                   {/* Left: Basic Info */}
                   <div className="w-[300px] flex flex-col gap-6">
                      <div className="space-y-4">
                         <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            <div className="w-1 h-4 bg-blue-600 rounded-full" /> 基本信息
                         </h3>
                         <div className="grid grid-cols-[80px_1fr] gap-y-3 text-[11px]">
                            <span className="text-slate-400">姓名</span><span className="text-slate-700 font-bold">张三</span>
                            <span className="text-slate-400">性别</span><span className="text-slate-700">男</span>
                            <span className="text-slate-400">职业</span><span className="text-slate-700">金融业务人员</span>
                         </div>
                         <div className="flex flex-wrap gap-2">
                            {['我行员工', '睡眠客户', '代发客户', '预授信客户', '临界客户', '45岁', '金卡潜在提升客户', '敏感职业'].map((tag, i) => (
                              <span key={i} className="text-[10px] px-2 py-0.5 border border-slate-200 text-slate-500 rounded bg-slate-50">{tag}</span>
                            ))}
                         </div>
                      </div>

                      <div className="space-y-4">
                         <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            <div className="w-1 h-4 bg-blue-600 rounded-full" /> 签约信息
                         </h3>
                         <div className="flex flex-wrap gap-2">
                            {['理财签约', '临柜风评', '微信绑卡', '支付绑卡', '廊银小惠绑卡', '微信银行签约', '热力缴费客户'].map((tag, i) => (
                              <span key={i} className="text-[10px] px-2 py-0.5 border border-slate-200 text-slate-500 rounded bg-slate-50">{tag}</span>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* Center: Radial Chart */}
                   <div className="flex-1 min-w-0">
                      <RadialChart />
                   </div>

                   {/* Right: Asset & Product Details */}
                   <div className="w-[340px] flex flex-col gap-6">
                      <div className="space-y-4">
                         <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                              <div className="w-1 h-4 bg-blue-600 rounded-full" /> 资产负债
                            </h3>
                            <div className="text-xs font-bold text-slate-900">100 <span className="font-normal opacity-50">万元</span></div>
                         </div>
                         <div className="h-40 bg-slate-50 rounded flex items-center justify-center border border-slate-100">
                            <div className="w-32 h-32 rounded-full border-[16px] border-blue-500 border-r-emerald-500 border-b-amber-500" />
                            <div className="ml-4 space-y-1">
                               <div className="flex items-center gap-2 text-[10px]"><div className="w-2 h-2 rounded-full bg-blue-500" /> 资产余额 50万元</div>
                               <div className="flex items-center gap-2 text-[10px]"><div className="w-2 h-2 rounded-full bg-emerald-500" /> 负债余额 40万元</div>
                               <div className="flex items-center gap-2 text-[10px]"><div className="w-2 h-2 rounded-full bg-amber-500" /> 活期余额 10万元</div>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            <div className="w-1 h-4 bg-blue-600 rounded-full" /> 产品持有
                         </h3>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="p-2 border border-slate-100 rounded bg-slate-50">
                               <div className="text-[10px] text-slate-400">定期</div>
                               <div className="text-xs font-bold">281万元</div>
                            </div>
                            <div className="p-2 border border-slate-100 rounded bg-slate-50">
                               <div className="text-[10px] text-slate-400">理财</div>
                               <div className="text-xs font-bold">12万元</div>
                            </div>
                            <div className="p-2 border border-slate-100 rounded bg-slate-50">
                               <div className="text-[10px] text-slate-400">大额存单</div>
                               <div className="text-xs font-bold">20万元</div>
                            </div>
                            <div className="p-2 border border-slate-100 rounded bg-slate-50">
                               <div className="text-[10px] text-slate-400">保险</div>
                               <div className="text-xs font-bold">12万元</div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Extreme Right: Menu List */}
                   <div className="w-[200px] border-l border-slate-100 pl-4 space-y-6">
                      <div className="text-[10px] text-blue-600 font-bold flex items-center justify-between mb-4">
                        <span>&gt;&gt; 客户画像信息展示 &lt;&lt;</span>
                      </div>
                      <div className="space-y-4">
                         <div className="flex items-center justify-between text-xs text-slate-700 font-bold cursor-pointer group">
                            <div className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-blue-500" /> 基本信息</div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500" />
                         </div>
                         <div className="flex flex-wrap gap-1">
                            {['性别 女', '年龄 24岁', '学历 本科', '职业 高级客户经理', '婚姻状况 已婚', '所属公司 上市公司'].map((tag, i) => (
                               <span key={i} className="text-[9px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-100">{tag}</span>
                            ))}
                         </div>
                         <div className="flex items-center justify-between text-xs text-slate-700 font-bold cursor-pointer hover:text-blue-600">
                            <div className="flex items-center gap-2"><Target className="w-3.5 h-3.5 text-emerald-500" /> 产品持有</div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                         </div>
                         <div className="flex items-center justify-between text-xs text-slate-700 font-bold cursor-pointer hover:text-blue-600">
                            <div className="flex items-center gap-2"><CreditCard className="w-3.5 h-3.5 text-amber-500" /> 客户偏好</div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                         </div>
                         <div className="flex items-center justify-between text-xs text-slate-700 font-bold cursor-pointer hover:text-blue-600">
                            <div className="flex items-center gap-2"><Activity className="w-3.5 h-3.5 text-purple-500" /> 行为标签</div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                         </div>
                         <div className="flex items-center justify-between text-xs text-slate-700 font-bold cursor-pointer hover:text-blue-600">
                            <div className="flex items-center gap-2"><PieChart className="w-3.5 h-3.5 text-rose-500" /> 资产负债</div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
            {currentView === 'installments' && (
              <motion.div 
                key="installments"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 min-h-0"
              >
                <InstallmentDetails onBack={() => setCurrentView('dashboard')} />
              </motion.div>
            )}
            {currentView === 'prepayment' && (
              <motion.div 
                key="prepayment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 min-h-0"
              >
                <PrepaymentPage onBack={() => setCurrentView('dashboard')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <BottomBar />
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
