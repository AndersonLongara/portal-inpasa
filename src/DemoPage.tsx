import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  PackageSearch, 
  Wallet, 
  BookOpen, 
  Rocket, 
  Briefcase, 
  ChevronRight,
  Headset, 
  CheckCircle2, 
  Cloud, 
  MessageCircle, 
  Bot, 
  X, 
  Search, 
  SlidersHorizontal, 
  Truck, 
  QrCode, 
  Copy,
  Plus,
  Percent,
  FileText,
  MessageSquare,
  MessageCircle as MessageCircleIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'dashboard' | 'pedidos' | 'financeiro' | 'faq' | 'suporte';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
}

interface DemoPageProps {
  onBack?: () => void;
}

const DemoPage: React.FC<DemoPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { id: 1, type: 'bot', text: 'Olá, Agropecuária Fazenda Bela! Sou a IA da Inpasa conectada ao seu Portal e ERP. Como posso otimizar seu dia hoje?' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ id: '', amount: '' });
  
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages, isChatOpen]);

  const handleSimularResposta = (tipo: string) => {
    let userMsg = "";
    let botMsg = "";

    switch(tipo) {
      case 'rastreio':
        userMsg = "Rastrear pedido ativo";
        botMsg = "Você tem o pedido **PED-9928 (Etanol Anidro)** em trânsito. A previsão de chegada é para hoje às 14:00 no seu local de descarga. Deseja visualizar no mapa?";
        break;
      case 'boleto':
        userMsg = "Emitir 2ª via de Boleto";
        botMsg = "Identifiquei a fatura **FAT-4490 (Atrasada)** no valor de R$ 89.500,00. Clique para baixar o PDF do Boleto ou digite PIX para pagar agora.";
        break;
      case 'faq':
        userMsg = "Dúvida técnica / Base de Conhecimento";
        botMsg = "Sem problemas! Tenho acesso a toda nossa Base de Conhecimento. Qual o assunto? (ex: Laudo Nutricional DDGS, FISPQ Etanol, Processo de Carga).";
        break;
      case 'humano':
        userMsg = "Escalar para Atendimento Humano";
        botMsg = "Transferindo seu histórico completo para o próximo agente disponível via Salesforce Service Cloud. Número do Protocolo: CAS-8991-W. Um momento...";
        break;
    }

    const newUserMsg: Message = { id: Date.now(), type: 'user', text: userMsg };
    setChatMessages(prev => [...prev, newUserMsg]);

    setTimeout(() => {
      const newBotMsg: Message = { id: Date.now() + 1, type: 'bot', text: botMsg };
      setChatMessages(prev => [...prev, newBotMsg]);
    }, 800);
  };

  const openModalPix = (id: string, amount: string) => {
    setModalData({ id, amount });
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-inpasa-lightbg font-sans text-slate-800 overflow-hidden relative selection:bg-inpasa-yellow selection:text-white">
      {/* BARRA LATERAL (SIDEBAR) */}
      <aside className="w-[280px] bg-gradient-to-b from-inpasa-darkblue to-inpasa-blue text-white flex flex-col shadow-2xl z-20 shrink-0 relative transition-all duration-300">
        {/* Logo Area */}
        <div className="p-8 flex items-center gap-4 border-b border-white/10">
          <div className="w-12 h-12 bg-gradient-to-br from-inpasa-yellow to-inpasa-darkyellow rounded-xl flex items-center justify-center font-black text-inpasa-blue text-2xl shadow-lg transform hover:scale-105 transition-transform">
            IN
          </div>
          <div>
            <h1 className="font-black text-2xl tracking-tight leading-none">INPASA</h1>
            <p className="text-[11px] text-inpasa-yellow font-semibold uppercase tracking-widest mt-1 opacity-90">Portal Omnichannel</p>
          </div>
        </div>

        {/* Menu de Navegação */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Painel Geral' },
            { id: 'pedidos', icon: PackageSearch, label: 'Meus Pedidos' },
            { id: 'financeiro', icon: Wallet, label: 'Financeiro e Faturas' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`nav-btn w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all relative overflow-hidden ${
                activeTab === item.id 
                  ? 'bg-white/10 text-white shadow-sm active' 
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {activeTab === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-1 bg-inpasa-yellow rounded-r-full" />
              )}
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-inpasa-yellow' : 'text-slate-400'}`} />
              {item.label}
            </button>
          ))}
          
          <div className="pt-4 pb-2 px-4">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Atendimento & Ajuda</p>
          </div>

          {[
            { id: 'faq', icon: BookOpen, label: 'Base de Conhecimento' },
            { id: 'suporte', icon: Bot, label: 'Tickets Omnichannel' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`nav-btn w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all relative overflow-hidden ${
                activeTab === item.id 
                  ? 'bg-white/10 text-white shadow-sm active' 
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {activeTab === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-1 bg-inpasa-yellow rounded-r-full" />
              )}
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-inpasa-yellow' : 'text-slate-400'}`} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer Sidebar */}
        <div className="p-6 border-t border-white/10 bg-black/20 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase">
            <CheckCircle2 className="w-4 h-4 text-green-400" /> Sistema Integrado
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-white/10 rounded text-[10px] text-white font-medium border border-white/10 flex items-center gap-1">
              <Cloud className="w-3 h-3 text-[#00A1E0]" /> Salesforce
            </span>
            <span className="px-2 py-1 bg-white/10 rounded text-[10px] text-white font-medium border border-white/10">
              ERP Sincronizado
            </span>
          </div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* CABEÇALHO */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-10 shrink-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Olá, Agropecuária Fazenda Bela 👋</h2>
            <div className="text-sm text-slate-500 mt-1 font-medium flex items-center gap-2">
              CNPJ: 12.345.678/0001-90 | 
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Conectado via API
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            {onBack && (
              <button 
                onClick={onBack}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-xs transition-all flex items-center gap-2 border border-slate-200"
              >
                ← VOLTAR PARA PROPOSTA
              </button>
            )}

            {/* Integração WhatsApp (Aviso) */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-inpasa-whatsapp/10 rounded-full border border-inpasa-whatsapp/20 cursor-pointer hover:bg-inpasa-whatsapp/20 transition-colors">
              <MessageCircle className="w-4 h-4 text-inpasa-whatsapp" />
              <span className="text-xs font-bold text-green-800">Atendimento via WhatsApp Ativo</span>
            </div>

            <div className="flex items-center gap-3 pl-8 border-l border-slate-200 cursor-pointer group">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold text-slate-800 group-hover:text-inpasa-blue transition-colors">João Silva</p>
                <p className="text-xs text-slate-500 font-medium">Gestor de Compras</p>
              </div>
              <div className="w-11 h-11 rounded-full bg-inpasa-blue/10 flex items-center justify-center text-inpasa-blue font-bold border-2 border-transparent group-hover:border-inpasa-blue/20 transition-all">JS</div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-10 relative">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-7xl mx-auto"
              >
                <div className="mb-8 bg-gradient-to-r from-inpasa-blue to-inpasa-darkblue rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Bot className="w-6 h-6 text-inpasa-yellow" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Novo Ecossistema de Atendimento Inpasa!</h3>
                      <p className="text-sm text-white/80 mt-1">Agora você resolve pendências, rastreia pedidos e baixa faturas em menos de 2 segundos via Chatbot ou WhatsApp 24/7.</p>
                    </div>
                  </div>
                  <button onClick={() => setIsChatOpen(true)} className="px-5 py-2.5 bg-inpasa-yellow text-inpasa-darkblue font-black rounded-xl text-sm hover:bg-white transition-colors shadow-sm whitespace-nowrap">
                    Testar Assistente Agora
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: 'Pedidos em Trânsito', val: '01', sub: '', color: '', onClick: () => setActiveTab('pedidos') },
                    { label: 'Volume Mensal', val: '165', sub: 'Ton', color: '', onClick: null },
                    { label: 'Faturas Atrasadas', val: '01', sub: '', color: 'text-red-600', border: 'border-l-4 border-l-red-500', onClick: () => setActiveTab('financeiro') },
                    { label: 'Tickets Abertos', val: '02', sub: 'Via WhatsApp', badge: true, color: 'text-inpasa-yellow', onClick: () => setActiveTab('suporte') },
                  ].map((card, i) => (
                    <div 
                      key={i} 
                      onClick={card.onClick || undefined}
                      className={`bg-white p-6 rounded-[2rem] shadow-card border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer ${card.border || ''}`}
                    >
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
                      <div className="flex justify-between items-baseline">
                        <h4 className={`text-4xl font-black ${card.color || 'text-slate-800'}`}>
                          {card.val}{card.sub && !card.badge && <span className="text-lg text-slate-400 font-semibold ml-1">{card.sub}</span>}
                        </h4>
                        {card.badge && card.sub && (
                          <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded text-slate-500 font-bold uppercase tracking-tighter">{card.sub}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-card border border-slate-100 p-10">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-black text-slate-800 flex items-center gap-4">
                      <span className="w-12 h-12 rounded-2xl bg-inpasa-blue/10 flex items-center justify-center text-inpasa-blue"><Truck className="w-6 h-6" /></span>
                      Logística Sincronizada com ERP (Tempo Real)
                    </h3>
                    <button className="text-sm text-inpasa-blue font-bold hover:underline" onClick={() => setActiveTab('pedidos')}>Ver todos os pedidos</button>
                  </div>
                  
                  <div className="p-8 border-2 border-slate-100 rounded-[2rem] bg-slate-50/50 hover:border-inpasa-blue/30 transition-all cursor-pointer group" onClick={() => setActiveTab('pedidos')}>
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <span className="font-black text-2xl text-slate-800 group-hover:text-inpasa-blue transition-colors">PED-9928</span>
                        <span className="text-xs px-3 py-1.5 ml-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-black uppercase tracking-widest">Etanol Anidro (45.000 L)</span>
                        <p className="text-base text-slate-500 mt-4 font-medium">Previsão: <strong className="text-inpasa-blue font-black">Hoje, às 14:00</strong></p>
                      </div>
                      <span className="text-[10px] px-4 py-2 rounded-full font-black uppercase tracking-widest bg-inpasa-yellow/20 text-inpasa-darkyellow">Em Trânsito</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full mb-4 overflow-hidden shadow-inner">
                      <div className="h-full bg-inpasa-blue rounded-full w-[75%] shadow-[0_0_15px_rgba(48,79,126,0.3)]"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'pedidos' && (
              <motion.div 
                key="pedidos"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-7xl mx-auto"
              >
                <div className="bg-white rounded-[2.5rem] shadow-card border border-slate-100 p-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                      <h2 className="text-3xl font-black text-slate-800 tracking-tight">Meus Pedidos</h2>
                      <p className="text-slate-500 text-sm mt-2 font-medium">Controle total sobre seus carregamentos e fluxos logísticos.</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                      <div className="relative flex-1 md:w-72">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Buscar ID, Produto ou Placa..." className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm focus:outline-none focus:border-inpasa-blue transition-all" />
                      </div>
                      <button className="flex items-center gap-2 px-5 py-3.5 bg-white border-2 border-slate-100 hover:bg-slate-50 rounded-2xl text-sm font-bold transition-all">
                        <SlidersHorizontal className="w-4 h-4" /> Filtros
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-[2rem] border border-slate-100">
                    <table className="w-full text-sm text-left">
                      <thead className="text-[10px] text-slate-400 uppercase bg-slate-50 border-b border-slate-200 font-bold tracking-[0.2em]">
                        <tr>
                          <th className="px-8 py-6">ID Pedido</th>
                          <th className="px-8 py-6">Produto</th>
                          <th className="px-8 py-6">Volume</th>
                          <th className="px-8 py-6 whitespace-nowrap">Data do Pedido</th>
                          <th className="px-8 py-6 whitespace-nowrap">Previsão/Chegada</th>
                          <th className="px-8 py-6 text-center">Status</th>
                          <th className="px-8 py-6 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {/* Pedido 1 */}
                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-8 py-6 font-black text-slate-800">PED-9928</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-2.5 h-2.5 rounded-full bg-inpasa-yellow shadow-[0_0_8px_rgba(234,162,57,0.4)]"></div>
                              <span>Etanol Anidro</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">45.000 L</td>
                          <td className="px-8 py-6 text-slate-500 underline decoration-slate-200">20/02/2026</td>
                          <td className="px-8 py-6 font-black text-slate-800">25/02/2026</td>
                          <td className="px-8 py-6 text-center">
                            <span className="px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase bg-inpasa-yellow/20 text-inpasa-darkyellow whitespace-nowrap">EM TRÂNSITO</span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="text-inpasa-blue hover:text-white font-black text-xs uppercase tracking-widest bg-inpasa-blue/5 hover:bg-inpasa-blue px-4 py-2 rounded-xl transition-all">Detalhes</button>
                          </td>
                        </tr>
                        {/* Pedido 2 */}
                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-8 py-6 font-black text-slate-800">PED-9929</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-900 shadow-[0_0_8px_rgba(120,53,15,0.4)]"></div>
                              <span>DDGS Alta Proteína</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">120 Ton</td>
                          <td className="px-8 py-6 text-slate-500 underline decoration-slate-200">22/02/2026</td>
                          <td className="px-8 py-6 font-black text-slate-800">27/02/2026</td>
                          <td className="px-8 py-6 text-center">
                            <span className="px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase bg-blue-50 text-blue-500 whitespace-nowrap">A PREPARAR</span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="text-inpasa-blue hover:text-white font-black text-xs uppercase tracking-widest bg-inpasa-blue/5 hover:bg-inpasa-blue px-4 py-2 rounded-xl transition-all">Detalhes</button>
                          </td>
                        </tr>
                        {/* Pedido 3 */}
                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-8 py-6 font-black text-slate-800">PED-9920</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-600 shadow-[0_0_8px_rgba(180,83,9,0.4)]"></div>
                              <span>Óleo de Milho (IOP)</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">30 Ton</td>
                          <td className="px-8 py-6 text-slate-500 underline decoration-slate-200">10/02/2026</td>
                          <td className="px-8 py-6 font-black text-slate-800">20/02/2026</td>
                          <td className="px-8 py-6 text-center">
                            <span className="px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase bg-green-50 text-green-600 whitespace-nowrap">ENTREGUE</span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="text-slate-500 hover:text-white font-black text-xs uppercase tracking-widest bg-slate-100 hover:bg-slate-800 px-4 py-2 rounded-xl transition-all flex items-center gap-2 ml-auto shadow-sm">
                              <FileText className="w-4 h-4" /> NF / Recibo
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'financeiro' && (
              <motion.div 
                key="financeiro"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-7xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-[2rem] shadow-card border border-slate-100 p-8 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-500" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total em Atraso</p>
                    <p className="text-5xl font-black text-red-600 tracking-tighter">R$ 89.500<span className="text-2xl text-red-300">,00</span></p>
                  </div>
                  <div className="bg-white rounded-[2rem] shadow-card border border-slate-100 p-8 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-slate-800" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">A Vencer (Próximos 30 dias)</p>
                    <p className="text-5xl font-black text-slate-800 tracking-tighter">R$ 145.000<span className="text-2xl text-slate-400">,00</span></p>
                  </div>
                  <div className="bg-gradient-to-br from-inpasa-yellow to-inpasa-darkyellow rounded-[2rem] shadow-float p-8 flex flex-col justify-center text-white relative overflow-hidden group">
                    <Percent className="absolute -right-6 -bottom-6 w-40 h-40 text-white opacity-10 group-hover:scale-110 transition-transform duration-500" />
                    <p className="text-xs font-black uppercase tracking-widest text-white/90 mb-4 z-10">Maximize seu Fluxo</p>
                    <button className="bg-white text-inpasa-darkyellow px-6 py-4 rounded-2xl text-sm font-black w-full hover:bg-slate-50 hover:shadow-2xl transition-all z-10 active:scale-95 shadow-xl">
                      Simular Antecipação
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-8">
                  <h2 className="text-2xl font-black text-slate-800 mb-8">Minhas Faturas</h2>
                  <div className="overflow-x-auto rounded-[2rem] border border-slate-100">
                    <table className="w-full text-sm text-left">
                      <thead className="text-[10px] text-slate-400 uppercase bg-slate-50 border-b border-slate-200 font-bold tracking-[0.2em]">
                        <tr>
                          <th className="px-8 py-6">Fatura / Doc</th>
                          <th className="px-8 py-6">Data Emissão</th>
                          <th className="px-8 py-6">Vencimento</th>
                          <th className="px-8 py-6">Valor Total</th>
                          <th className="px-8 py-6">Status</th>
                          <th className="px-8 py-6 text-right">Ações e Pagamento</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {/* Fatura 1 */}
                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-8 py-6 font-black text-slate-800">FAT-4490</td>
                          <td className="px-8 py-6 text-slate-500 underline decoration-slate-200">10/01/2026</td>
                          <td className="px-8 py-6 font-black text-red-600">
                            10/02/2026 <span className="text-[9px] font-medium ml-1">(Vencido)</span>
                          </td>
                          <td className="px-8 py-6 font-black text-slate-800 tracking-tight">R$ 89.500,00</td>
                          <td className="px-8 py-6">
                            <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-red-100 text-red-500 whitespace-nowrap">Em Atraso</span>
                          </td>
                          <td className="px-8 py-6 flex items-center justify-end gap-3">
                            <button className="p-2 text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                              <FileText className="w-4 h-4" />
                            </button>
                            <button onClick={() => openModalPix('FAT-4490', 'R$ 89.500,00')} className="px-5 py-2.5 bg-inpasa-darkblue text-white font-black rounded-xl text-xs hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm whitespace-nowrap">
                              <QrCode className="w-4 h-4 text-inpasa-yellow" /> Pagar PIX
                            </button>
                          </td>
                        </tr>
                        {/* Fatura 2 */}
                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-8 py-6 font-black text-slate-800">FAT-4501</td>
                          <td className="px-8 py-6 text-slate-500 underline decoration-slate-200">25/01/2026</td>
                          <td className="px-8 py-6 font-black text-slate-800 tracking-tight">25/02/2026</td>
                          <td className="px-8 py-6 font-black text-slate-800 tracking-tight">R$ 145.000,00</td>
                          <td className="px-8 py-6">
                            <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-slate-100 text-slate-500 whitespace-nowrap">A Vencer</span>
                          </td>
                          <td className="px-8 py-6 flex items-center justify-end gap-3">
                            <button className="p-2 text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                              <FileText className="w-4 h-4" />
                            </button>
                            <button onClick={() => openModalPix('FAT-4501', 'R$ 145.000,00')} className="px-5 py-2.5 bg-inpasa-darkblue text-white font-black rounded-xl text-xs hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm whitespace-nowrap">
                              <QrCode className="w-4 h-4 text-inpasa-yellow" /> Pagar PIX
                            </button>
                          </td>
                        </tr>
                        {/* Fatura 3 */}
                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-8 py-6 font-black text-slate-800">FAT-4320</td>
                          <td className="px-8 py-6 text-slate-500 underline decoration-slate-200">15/12/2025</td>
                          <td className="px-8 py-6 font-black text-slate-800 tracking-tight">15/01/2026</td>
                          <td className="px-8 py-6 font-black text-slate-800 tracking-tight">R$ 45.200,00</td>
                          <td className="px-8 py-6">
                            <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-green-50 text-green-500 whitespace-nowrap">Pago</span>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <button className="px-4 py-2 border border-slate-100 text-slate-400 font-bold rounded-xl text-xs hover:bg-slate-50 transition-all flex items-center gap-2 ml-auto">
                              <CheckCircle2 className="w-4 h-4 text-green-500" /> Ver Recibo
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'faq' && (
              <motion.div 
                key="faq"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-7xl mx-auto"
              >
                <div className="bg-white rounded-[2.5rem] shadow-card border border-slate-100 p-12 text-center max-w-5xl mx-auto">
                    <div className="max-w-3xl mx-auto">
                        <div className="w-16 h-16 bg-inpasa-darkblue text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-800 mb-2 tracking-tighter">Base de Conhecimento</h2>
                        <p className="text-slate-400 mb-10 text-sm font-medium">Encontre rapidamente manuais, FISPQs, processos logísticos e dúvidas financeiras. <br/>Resolva você mesmo, sem esperas.</p>
                        
                        <div className="relative flex items-center bg-slate-50 rounded-2xl p-1.5 border border-slate-100 shadow-inner">
                            <Search className="absolute left-6 text-slate-400 w-5 h-5" />
                            <input type="text" placeholder="Como posso ajudar? Busque por palavra-chave..." className="w-full pl-14 pr-4 py-4 bg-transparent text-sm focus:outline-none placeholder:text-slate-400" />
                            <button className="px-8 py-3.5 bg-inpasa-darkblue text-white font-black rounded-xl text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-95">Buscar</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
                    {[
                        { 
                            title: 'Manuais e Laudos Técnicos', 
                            icon: <FileText className="w-6 h-6 text-inpasa-yellow" />, 
                            links: ['FISPQ Completa - Etanol Anidro', 'Níveis de garantia DDGS Inpasa', 'Armazenagem de Óleo (IOP)'] 
                        },
                        { 
                            title: 'Logística e Entregas', 
                            icon: <Rocket className="w-6 h-6 text-inpasa-yellow" />, 
                            links: ['Regras para entrada de motoristas', 'Janelas de carregamento', 'O que fazer em caso de atraso?'] 
                        },
                        { 
                            title: 'Financeiro', 
                            icon: <Briefcase className="w-6 h-6 text-inpasa-yellow" />, 
                            links: ['Como gerar 2ª via via WhatsApp?', 'Benefícios do PIX B2B Inpasa', 'Regras de faturamento'] 
                        }
                    ].map((cat, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-card hover:shadow-xl transition-all group">
                            <div className="flex items-center gap-3 mb-6">
                                {cat.icon}
                                <h3 className="font-black text-slate-800 text-lg tracking-tight">{cat.title}</h3>
                            </div>
                            <ul className="space-y-4">
                                {cat.links.map((link, j) => (
                                    <li key={j} className="flex items-center gap-2 text-slate-500 hover:text-inpasa-blue cursor-pointer transition-colors text-xs font-bold group/link">
                                        <ChevronRight className="w-3 h-3 text-slate-300 group-hover/link:translate-x-1 transition-transform" /> {link}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'suporte' && (
              <motion.div 
                key="suporte"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-7xl mx-auto"
              >
                       <div className="bg-white rounded-[2rem] shadow-card border border-slate-100 p-8">
                    <div className="flex justify-between items-center mb-10 px-4">
                      <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                            <Cloud className="w-8 h-8 text-[#00A1E0]" /> Histórico Consolidado (Salesforce Service)
                        </h2>
                        <p className="text-slate-400 text-sm font-medium mt-1">Visão centralizada de todos os seus contatos conosco, independente do canal.</p>
                      </div>
                      <button className="bg-inpasa-darkblue text-white px-8 py-3.5 rounded-xl text-xs font-black flex items-center gap-3 hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                          <Plus className="w-5 h-5" /> Abrir Ticket via Portal
                      </button>
                    </div>

                    <div className="overflow-x-auto rounded-[2rem] border border-slate-100">
                      <table className="w-full text-sm text-left">
                        <thead className="text-[10px] text-slate-400 uppercase bg-slate-50 border-b border-slate-200 font-bold tracking-[0.2em]">
                          <tr>
                            <th className="px-8 py-6">Protocolo / Ticket</th>
                            <th className="px-8 py-6">Assunto</th>
                            <th className="px-8 py-6">Canal de Origem</th>
                            <th className="px-8 py-6">Agente/IA Responsável</th>
                            <th className="px-8 py-6 text-center">Status</th>
                            <th className="px-8 py-6 text-right">Ação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                          {/* Ticket 1 */}
                          <tr className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-8 py-8 font-black text-slate-800">CAS-8812-X</td>
                            <td className="px-8 py-8">
                              <p className="font-bold">Atraso na descarga - Filial Sul</p>
                            </td>
                            <td className="px-8 py-8">
                              <span className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold border border-green-100 flex items-center gap-2 w-fit">
                                <MessageCircleIcon className="w-4 h-4" /> WhatsApp Business
                              </span>
                            </td>
                            <td className="px-8 py-8">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">AM</div>
                                <span>Aline M. (Humano)</span>
                              </div>
                            </td>
                            <td className="px-8 py-8 text-center">
                              <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-orange-100 text-orange-500 whitespace-nowrap">Em Análise</span>
                            </td>
                            <td className="px-8 py-8 text-right">
                              <button className="text-inpasa-blue font-black text-xs uppercase tracking-widest hover:underline">Ver Transcrição</button>
                            </td>
                          </tr>
                          {/* Ticket 2 */}
                          <tr className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-8 py-8 font-black text-slate-800">CAS-8799-Y</td>
                            <td className="px-8 py-8">
                              <p className="font-bold">2ª Via de Boleto FAT-4490</p>
                            </td>
                            <td className="px-8 py-8">
                              <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold border border-blue-100 flex items-center gap-2 w-fit">
                                <LayoutDashboard className="w-4 h-4" /> Assistente Virtual (Web)
                              </span>
                            </td>
                            <td className="px-8 py-8">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-inpasa-yellow flex items-center justify-center shadow-inner">
                                  <Bot className="w-4 h-4 text-inpasa-darkblue" />
                                </div>
                                <div className="text-left">
                                  <p className="leading-tight">Chatbot Inpasa</p>
                                  <p className="text-[9px] text-slate-400 font-medium">(Deflexão)</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-8 text-center">
                              <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-green-100 text-green-600 whitespace-nowrap">Resolvido (&lt; 2s)</span>
                            </td>
                            <td className="px-8 py-5 text-right">
                              <button 
                                onClick={() => setIsChatOpen(true)}
                                className="text-inpasa-blue font-black text-xs uppercase tracking-widest hover:underline"
                              >
                                Ver Chat
                              </button>
                            </td>
                          </tr>
                          {/* Ticket 3 */}
                          <tr className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-8 py-5 font-black text-slate-800">CAS-8650-Z</td>
                            <td className="px-8 py-5">
                              <p className="font-bold">Dúvida Técnica - Laudo IOP</p>
                            </td>
                            <td className="px-8 py-5">
                              <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200 flex items-center gap-2 w-fit">
                                <Search className="w-4 h-4" /> Portal B2B
                              </span>
                            </td>
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">CT</div>
                                <span>Carlos T. (Qualidade)</span>
                              </div>
                            </td>
                            <td className="px-8 py-5 text-center">
                              <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-slate-200 text-slate-600 whitespace-nowrap">Fechado</span>
                            </td>
                            <td className="px-8 py-5 text-right">
                              <button className="text-inpasa-blue font-black text-xs uppercase tracking-widest hover:underline">Ver Histórico</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* CHATBOT WIDGET */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
             initial={{ y: 20, opacity: 0, scale: 0.95 }}
             animate={{ y: 0, opacity: 1, scale: 1 }}
             exit={{ y: 20, opacity: 0, scale: 0.95 }}
             className="fixed bottom-28 right-8 w-[320px] bg-white rounded-[1.25rem] shadow-chat border border-slate-200 z-50 flex flex-col overflow-hidden"
          >
             <div className="bg-[#1e2d44] p-4 text-white relative">
                <button onClick={() => setIsChatOpen(false)} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2.5">
                    <div className="w-11 h-11 bg-[#eaa239] rounded-full flex items-center justify-center border-2 border-[#1e2d44] relative shadow-lg">
                        <Bot className="w-5.5 h-5.5 text-[#1e2d44]" />
                        <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-[#23c55e] rounded-full border-2 border-[#1e2d44]"></span>
                    </div>
                    <div>
                        <h4 className="font-extrabold text-sm tracking-tight leading-none uppercase">Assistente Inpasa 24/7</h4>
                        <p className="text-[9px] text-white/40 font-medium mt-1">Respostas automáticas em &lt; 2s</p>
                    </div>
                </div>
            </div>

            <div className="h-[360px] bg-[#f8fafc] p-4 overflow-y-auto flex flex-col gap-4 text-sm scroll-smooth custom-scrollbar" ref={chatBodyRef}>
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex items-start gap-3 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                    {msg.type === 'bot' && (
                      <div className="w-8 h-8 bg-[#304f7e] rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div className={`p-3.5 rounded-2xl shadow-sm max-w-[85%] leading-relaxed border z-10 text-[12px] ${
                      msg.type === 'bot' 
                        ? 'bg-white border-slate-100 text-slate-700 font-medium' 
                        : 'bg-[#304f7e] text-white border-transparent'
                    }`}>
                        {msg.text}
                    </div>
                  </div>
                ))}

                {/* Quick Action Buttons */}
                {chatMessages.length === 1 && (
                  <div className="flex flex-col gap-1.5 mt-1 pl-11">
                    {[
                      { id: 'rastreio', label: 'Rastrear pedido ativo', icon: Truck },
                      { id: 'boleto', label: 'Emitir 2ª via de Boleto', icon: FileText },
                      { id: 'faq', label: 'Dúvida técnica / Base de Conhecimento', icon: Search },
                      { id: 'humano', label: 'Escalar para Atendimento Humano', icon: Headset },
                    ].map((btn) => (
                      <button 
                        key={btn.id}
                        onClick={() => handleSimularResposta(btn.id)}
                        className="flex items-center gap-2.5 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-[11px] hover:border-inpasa-blue hover:text-inpasa-blue transition-all shadow-sm active:scale-95 group text-left"
                      >
                        <btn.icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-inpasa-blue transition-colors" />
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}
            </div>

            <div className="px-4 py-4 bg-white border-t border-slate-100">
               <div className="flex items-center gap-2 justify-between">
                  <span className="text-[9px] font-black tracking-widest text-slate-300 uppercase whitespace-nowrap">Prefere o celular?</span>
                  <button className="bg-[#e9fbf0] text-[#1caf5e] px-3.5 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1.5 hover:bg-[#d4f7e3] transition-all border border-[#1caf5e]/10">
                    <MessageCircleIcon className="w-3.5 h-3.5" /> Continuar no WhatsApp
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-[#eaa239] to-[#d69330] rounded-2xl shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all z-50 border-2 border-black/10 group"
      >
        <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      </button>

      {/* MODAL PIX */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50">
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="bg-white w-full max-w-md rounded-[2.5rem] shadow-chat overflow-hidden flex flex-col max-h-[95vh]"
            >
              <div className="bg-slate-900 p-10 text-white relative text-center">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                    <X className="w-5 h-5" />
                </button>
                <div className="w-20 h-20 bg-inpasa-yellow/10 rounded-[2rem] mx-auto flex items-center justify-center mb-6 border border-inpasa-yellow/20">
                    <QrCode className="w-10 h-10 text-inpasa-yellow" />
                </div>
                <h3 className="text-3xl font-black tracking-tighter mb-2">Pagamento PIX</h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{modalData.id}</p>
              </div>
              <div className="p-10">
                <div className="text-center mb-8">
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">Valor Total do Título</p>
                    <p className="text-5xl font-black text-slate-900 tracking-tighter">{modalData.amount}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center mb-8">
                    <div className="w-44 h-44 bg-white border border-slate-200 rounded-2xl flex items-center justify-center p-4 shadow-inner relative overflow-hidden group">
                        <QrCode className="w-full h-full text-slate-800" />
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] opacity-10 group-hover:opacity-0 transition-opacity" />
                    </div>
                </div>
                <button className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-xl transition-all flex justify-center items-center gap-3 shadow-xl active:scale-95">
                    Copiar Código PIX <Copy className="w-5 h-5 text-inpasa-yellow" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DemoPage;
