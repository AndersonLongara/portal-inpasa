import React, { useState, useEffect, useRef } from 'react';
import { 
  motion
} from 'framer-motion';
import DemoPage from './DemoPage';
import SecurityReport from './SecurityReport';
import { 
  Cpu, 
  Activity, 
  Layers, 
  CheckCircle2,
  MessageSquare,
  AlertTriangle,
  Rocket,
  ArrowRight,
  ArrowLeft,
  FileText,
  Database,
  Search,
  Check,
  ChevronRight,
  Bot,
  LayoutDashboard,
  CreditCard,
  DownloadCloud,
  ShieldCheck,
  GlobeLock,
  Server,
  Box
} from 'lucide-react';

import type { Transition } from 'framer-motion';

const springTransition: Transition = { type: 'spring', stiffness: 400, damping: 25 };

// Paleta de Cores (Inpasa / Agro-Tech)

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [systemReady, setSystemReady] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'proposal' | 'demo' | 'security'>('proposal');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setSystemReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: window.innerHeight * index,
        behavior: 'smooth'
      });
    }
  };

  if (currentView === 'demo') {
    return <DemoPage onBack={() => setCurrentView('proposal')} />;
  }

  if (currentView === 'security') {
    return <SecurityReport onBack={() => setCurrentView('proposal')} />;
  }

  if (!systemReady) return <CorporateLoader />;

  return (
    <div className="bg-slate-50 text-slate-900 overflow-hidden font-sans antialiased selection:bg-emerald-600/20 relative h-screen">
      
      <TopNavigation 
        activeSection={activeSection} 
        onNavClick={scrollToSection} 
        onDemoClick={() => setCurrentView('demo')}
        onSecurityClick={() => setCurrentView('security')}
      />

      <main 
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth custom-scrollbar relative z-10"
        onScroll={(e) => {
          const target = e.currentTarget as HTMLDivElement;
          const index = Math.round(target.scrollTop / window.innerHeight);
          setActiveSection(index);
        }}
      >
        <HeroSection onExplore={() => scrollToSection(1)} />
        <DiagnosticSection />
        <SolutionSection />
        <ArchitectureSection />
        <StrategySection />
        <ProtocolSection />
        <Footer onSecurityClick={() => setCurrentView('security')} />
      </main>
    </div>
  );
};

// --- Componentes de UI ---

interface SectionTagProps {
  text: string;
}

const SectionTag: React.FC<SectionTagProps> = ({ text }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded shadow-sm text-slate-600 text-[10px] font-bold tracking-widest uppercase mb-3 motion-gpu"
  >
    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
    {text}
  </motion.div>
);

// --- Seções ---

interface TopNavigationProps {
  activeSection: number;
  onNavClick: (index: number) => void;
  onDemoClick: () => void;
  onSecurityClick: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ activeSection, onNavClick, onDemoClick, onSecurityClick }) => {
  const sections = [
    "Resumo", "O Desafio", "A Plataforma", "Arquitetura", "Roadmap", "Investimento"
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200 z-50 h-16 flex items-center justify-between px-8 shadow-sm transition-all">
      <div className="flex items-center gap-4 group cursor-pointer" onClick={() => onNavClick(0)}>
        <motion.img 
          src="https://www.inpasa.com.br/wp-content/themes/inpasa/assets/images/logo.svg"
          alt="Inpasa"
          className="h-6 w-auto object-contain object-left transition-all motion-gpu"
          onError={(e) => {
             const target = e.target as HTMLImageElement;
             target.style.display = 'none';
             if (target.nextElementSibling) {
               (target.nextElementSibling as HTMLElement).style.display = 'flex';
             }
          }}
        />
        <div className="hidden items-center gap-2">
           <LayoutDashboard className="text-emerald-600" size={24} strokeWidth={2.5} />
           <span className="text-xl font-black tracking-tighter text-slate-900">Inpasa</span>
        </div>
        <div className="flex flex-col border-l border-slate-300 pl-4">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">AltraHub</span>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">Proposal</span>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        {sections.map((name, i) => (
          <button
            key={i}
            onClick={() => onNavClick(i)}
            className={`text-[11px] font-bold uppercase tracking-wider transition-all relative py-1 hover:text-slate-900 ${
              activeSection === i ? 'text-emerald-600' : 'text-slate-400'
            }`}
          >
            {name}
            {activeSection === i && (
              <motion.div layoutId="navline" className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600" transition={springTransition} />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onSecurityClick}
          className="hidden md:flex text-slate-500 hover:text-emerald-600 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5"
        >
          <ShieldCheck size={14}/> Segurança & LGPD
        </button>
        <button 
          onClick={onDemoClick}
          className="hidden md:flex bg-emerald-50 text-emerald-700 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200 hover:bg-emerald-100 transition-all active:scale-95"
        >
          Visualizar Demo Portal
        </button>
        <motion.button 
          onClick={() => onNavClick(5)}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 text-xs text-white font-bold bg-emerald-600 px-4 py-2 rounded-full shadow-md hover:bg-emerald-700 transition-colors motion-gpu"
        >
          Ver Investimento
        </motion.button>
      </div>
    </nav>
  );
};

interface HeroSectionProps {
  onExplore: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => (
  <section className="h-screen w-full snap-start flex flex-col md:flex-row items-center bg-white relative overflow-hidden pt-16">
    <div className="flex-1 px-12 md:px-24 py-12 flex flex-col justify-center relative z-10 h-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl motion-gpu"
      >
        <SectionTag text="Transformação Digital // Março 2026" />
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 text-tight mt-4">
          PORTAL INTELIGENTE DE <br />
          <span className="text-emerald-600">ATENDIMENTO AO CLIENTE</span>
        </h1>
        
        <p className="text-xl text-slate-600 font-normal leading-relaxed mb-10 border-l-4 border-emerald-600 pl-6">
          Projeto executivo para a Transformação B2B/B2C da Inpasa. Um ecossistema digital que centraliza autoatendimento, guiado por um <strong>Assistente Virtual Integrado</strong> ao Salesforce e ERP corporativo.
        </p>

        <motion.button 
          onClick={onExplore}
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.98 }}
          transition={springTransition}
          className="px-8 py-4 bg-emerald-600 text-white font-bold text-sm rounded flex items-center gap-3 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 motion-gpu uppercase tracking-widest"
        >
          Explorar a Solução <ArrowRight size={16} />
        </motion.button>
      </motion.div>
    </div>

    <div className="flex-1 h-full relative hidden md:block">
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-white z-20" />
      <motion.img 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.95 }}
        transition={{ duration: 1.5 }}
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" 
        className="w-full h-full object-cover object-center grayscale-[20%]" 
        alt="Portal de Dados" 
      />
      <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply z-10" />
    </div>
  </section>
);

const DiagnosticSection: React.FC = () => (
  <section className="h-screen w-full snap-start flex flex-col justify-center bg-slate-50 px-12 md:px-24 pt-16">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center w-full">
      <motion.div 
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="motion-gpu"
      >
        <SectionTag text="01 // O Desafio Atual" />
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6 text-tight">
          O custo invisível da <br/><span className="text-rose-600">dependência manual.</span>
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium opacity-90">
          Hoje, a Inpasa lida com um volume mensal de <strong>1.400 a 2.000 chamados</strong>. Este atendimento multicanal sem Portal ou URA inteligente sobrecarrega a equipe, impedindo o escalonamento das vendas e elevando o custo operacional.
        </p>
        
        <div className="space-y-4">
          {[
            { t: 'Sobrecarga da equipe com solicitações básicas', s: 'DESPERDÍCIO DE TEMPO' },
            { t: 'Informações financeiras e comerciais descentralizadas', s: 'FRICÇÃO' },
            { t: 'Dependência do horário comercial para resolução', s: 'ATRASO' }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 10, backgroundColor: '#fff' }}
              transition={springTransition}
              className="flex items-center justify-between p-4 bg-white/50 border border-slate-200 rounded-lg shadow-sm cursor-default motion-gpu"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-rose-500" size={18} />
                <span className="text-sm font-bold text-slate-700">{item.t}</span>
              </div>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded uppercase tracking-wider">{item.s}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ x: 30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 gap-6 motion-gpu"
      >
        <motion.div 
          whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
          className="p-8 bg-white border-t-4 border-emerald-600 rounded-xl shadow-md transition-all h-full flex flex-col justify-center"
        >
           <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-4">A Virada de Chave</p>
           <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
             Transformar atendimento <br/>em autoatendimento.
           </h3>
           <p className="text-base text-slate-600 leading-relaxed mb-6 font-medium">
             Construir um <strong>Ecossistema Integrado</strong> que une Autoatendimento e Inteligência Artificial. A meta é blindar a operação, garantindo <strong>50% a 70% de deflexão</strong> nos chamados e uma redução de custos de no mínimo <strong>40%</strong> no primeiro ano.
           </p>
           
           <div className="flex flex-wrap gap-3 mt-auto">
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2"><Check size={14}/> Deflexão de 70%</span>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2"><Check size={14}/> SLA &lt; 2s (Chatbot)</span>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2"><Check size={14}/> Custo -40%</span>
           </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const SolutionSection: React.FC = () => (
  <section className="h-screen w-full snap-start flex flex-col justify-center bg-white px-8 md:px-16 pt-16">
    <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center py-8">
      <div className="text-center mb-12 shrink-0">
        <SectionTag text="02 // A Solução AltraHub" />
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3 text-tight">
          Os 2 Pilares do Novo Atendimento
        </h2>
        <p className="text-slate-500 font-bold text-sm">
           Uma plataforma dupla desenhada para escalabilidade comercial.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 h-full min-h-0">
        
        {/* Pilar 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm transition-all flex flex-col"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <LayoutDashboard size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Portal do Cliente</h3>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1">Ambiente Web Seguro</p>
            </div>
          </div>

          <p className="text-slate-600 mb-8 font-medium leading-relaxed">
            Uma interface moderna, 100% nativa e integrada ao <strong>Salesforce Sales Cloud</strong> e ao ERP corporativo, onde o cliente da Inpasa resolve demandas recorrentes num ambiente com alta adoção planejada.
          </p>

          <div className="space-y-4 flex-1">
            {[
              { i: <CreditCard size={18}/>, t: 'Consulta de Faturas e Boletos' },
              { i: <FileText size={18}/>, t: 'Visualização de Pedidos em Tempo Real' },
              { i: <DownloadCloud size={18}/>, t: 'Download de Documentos' },
              { i: <MessageSquare size={18}/>, t: 'Abertura de Chamados via Chat' }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="text-emerald-600">{feature.i}</div>
                <span className="text-sm font-bold text-slate-700">{feature.t}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pilar 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl transition-all flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center">
              <Bot size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight leading-none">Assistente Virtual</h3>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-1">Inteligência Integrada</p>
            </div>
          </div>

          <p className="text-slate-300 mb-8 font-medium leading-relaxed relative z-10">
            Um agente cognitivo operando na 1ª linha de defesa, integrado nativamente ao <strong>WhatsApp Business</strong> e ao portal web, com tempo de resposta estrito inferior a 2 segundos.
          </p>

          <div className="space-y-4 flex-1 relative z-10">
            {[
              { t: 'Integração Omnichannel (WhatsApp + Web)' },
              { t: 'Resoluções transacionais em < 2 segundos' },
              { t: 'Consulta direta à situação financeira/pedidos' },
              { t: 'Transbordo humanizado para equipe Inpasa' }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span className="text-sm font-bold text-slate-200">{feature.t}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

const ArchitectureSection: React.FC = () => (
  <section className="h-screen w-full snap-start flex flex-col justify-center bg-slate-900 px-12 md:px-24 pt-16 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none" />
    <div className="max-w-7xl mx-auto w-full relative z-10">
      <div className="text-center mb-12">
        <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} className="inline-block bg-slate-800 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 border border-slate-700">03 // Engenharia & Segurança</motion.div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 text-tight">
          Arquitetura de Grau Institucional
        </h2>
        <p className="text-slate-400 font-medium text-sm max-w-2xl mx-auto">
          Design escalável operando sob 3 linhas de atendimento, com isolamento de dados (Tenant IA) e infraestrutura imune a acessos não autorizados.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Diagrama Esquerdo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="md:col-span-8 bg-slate-800/40 border border-slate-700/60 p-8 rounded-[2rem] flex flex-col justify-center shadow-2xl"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-700 p-4 rounded-2xl relative shadow-lg">
              <GlobeLock className="text-emerald-500" size={24} />
              <div>
                <h4 className="font-bold text-white">WAF & Edge Protection</h4>
                <p className="text-xs text-slate-400 mt-1">Filtro de tráfego na borda. Bloqueio automático de anomalias e negações DDoS.</p>
              </div>
            </div>
            
            <div className="flex justify-center -my-2 opacity-50"><ArrowLeft className="rotate-[-90deg] text-emerald-500" size={20}/></div>
            
            <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-700 p-4 rounded-2xl relative shadow-lg">
              <Server className="text-emerald-500" size={24} />
              <div>
                <h4 className="font-bold text-white">VPC Isolada (Rede Privada)</h4>
                <p className="text-xs text-slate-400 mt-1">Backend blindado com acesso estrito ao Salesforce e instâncias do ERP Inpasa.</p>
              </div>
            </div>

            <div className="flex justify-center -my-2 opacity-50"><ArrowLeft className="rotate-[-90deg] text-emerald-500" size={20}/></div>

            <div className="flex items-center gap-4 bg-emerald-900/20 border border-emerald-500/30 p-5 rounded-2xl relative shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <Box className="text-emerald-400" size={28} />
              <div>
                <h4 className="font-bold text-emerald-100 flex items-center gap-2">
                  IA Cognitiva
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded uppercase tracking-widest border border-emerald-500/20">Zero Retention</span>
                </h4>
                <p className="text-xs text-emerald-200/70 mt-1">Modelos isolados de treinamento externo. Criptografia AES-256 e LGPD nativa na base neural.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Boxes Direita */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex-1 bg-slate-800/40 border border-slate-700/60 p-8 rounded-[2rem] flex flex-col justify-center"
          >
            <Database className="text-emerald-400 mb-4" size={28} />
            <h4 className="text-xl font-bold text-white mb-2">3 Linhas de Defesa</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">Integração viva: WhatsApp (1ª linha), Portal Web (2ª) e Transbordo Humano Inpasa (3ª).</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 bg-slate-800/40 border border-slate-700/60 p-8 rounded-[2rem] flex flex-col justify-center"
          >
            <ShieldCheck className="text-emerald-400 mb-4" size={28} />
            <h4 className="text-xl font-bold text-white mb-2">Transações Seguras</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">Comunicação e payload de chamados trafegam via TLS 1.3 mandatório, assegurando privacidade extrema.</p>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const StrategySection: React.FC = () => (
  <section className="h-screen w-full snap-start flex flex-col justify-center bg-white px-12 md:px-24 pt-16">
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-12 md:flex justify-between items-end">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="motion-gpu">
          <SectionTag text="04 // Execução" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-tight">
            Fases Acionáveis (Go-Live até 12m)
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { step: 'Mapeamento', title: 'Kickoff & APIs', desc: 'Alinhamento com a TI Inpasa, levantamento dos endpoints do ERP e design de interface.', icon: <Search />, highlight: false },
          { step: 'Desenvolvimento', title: 'Portal & IA', desc: 'Programação do ambiente seguro, dashboards e treinamento do modelo de linguagem do assistente.', icon: <Cpu />, highlight: false },
          { step: 'Homologação', title: 'Testes de Risco', desc: 'Validação de segurança, simulação de chamados e testes de carga com a equipe Inpasa.', icon: <CheckCircle2 />, highlight: true },
          { step: 'Entrega', title: 'Go-Live Oficial', desc: 'Publicação da plataforma, treinamento operacional e monitoramento inicial de adoção.', icon: <Rocket />, highlight: false }
        ].map((s, i) => (
          <motion.div 
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`p-8 rounded-xl border transition-all cursor-default motion-gpu flex flex-col h-full ${s.highlight ? 'border-emerald-600/40 bg-slate-50 shadow-lg shadow-emerald-600/5 ring-1 ring-emerald-600/10' : 'border-slate-200 bg-white shadow-sm'}`}
          >
            <motion.div whileHover={{ rotate: 10 }} className={`mb-6 ${s.highlight ? 'text-emerald-600' : 'text-slate-400'} motion-gpu`}>
              {s.icon}
            </motion.div>
            <p className={`text-[10px] font-bold mb-3 uppercase tracking-widest ${s.highlight ? 'text-emerald-600' : 'text-slate-500'}`}>{s.step}</p>
            <h4 className="text-lg font-bold text-slate-900 mb-3 leading-tight tracking-tight">{s.title}</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-bold flex-1">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProtocolSection: React.FC = () => (
  <section className="h-screen w-full snap-start flex flex-col justify-center bg-slate-50 px-8 md:px-12 pt-16">
    <div className="max-w-7xl w-full mx-auto h-full flex flex-col py-4">
      
      {/* Header Compacto */}
      <div className="text-center mb-6 shrink-0">
        <SectionTag text="05 // Estrutura de Investimento" />
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-2 text-tight">
          Proposta Comercial
        </h2>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">
          Pagamento vinculado a entregas claras (Milestones)
        </p>
      </div>
      
      <div className="w-full flex-grow flex flex-col gap-6 justify-center min-h-0">
        
        {/* Setup - Milestones */}
        <motion.div whileHover={{ borderColor: 'rgba(5, 150, 105, 0.4)', boxShadow: '0 20px 25px -5px rgba(5, 150, 105, 0.1)' }} className="bg-white border md:border-2 border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl p-6 lg:p-8 flex flex-col shrink-0 transition-all z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 pb-5 border-b-2 border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                <Layers size={24} />
              </div>
              <div>
                <span className="text-[10px] lg:text-xs text-slate-400 font-black uppercase tracking-[0.2em]">Consultoria & Desenvolvimento</span>
                <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">Portal + Chatbot + UX</h3>
              </div>
            </div>
            <div className="flex items-baseline gap-1 bg-slate-50 px-4 py-2 rounded-xl">
              <span className="text-slate-500 text-lg font-bold">R$</span>
              <span className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">50.000</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '1️⃣ Início do Projeto', pct: '30%', val: '15.000', cond: 'Assinatura',
                items: ['Kickoff Técnico', 'Arquitetura', 'Início dev']
              },
              {
                step: '2️⃣ Portal Funcional', pct: '40%', val: '20.000', cond: 'Piloto Navegável',
                items: ['Login & Dash', 'Pedidos', 'Financeiro']
              },
              {
                step: '3️⃣ Integrações & IA', pct: '20%', val: '10.000', cond: 'Conexões Prontas',
                items: ['Integr. ERP', 'Chatbot', 'Consultas auto']
              },
              {
                step: '4️⃣ Go-live', pct: '10%', val: '5.000', cond: 'Publicação Final',
                items: ['Testes finais', 'Homologação', 'Lançamento']
              }
            ].map((m, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:bg-emerald-50/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md shadow-sm">{m.pct}</span>
                    <span className="font-black text-slate-900 text-lg tracking-tight">R$ {m.val}</span>
                  </div>
                  <p className="text-base font-black text-slate-900 leading-tight mb-1 group-hover:text-emerald-700 transition-colors">{m.step}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight mb-3">Condição: <span className="text-emerald-600">{m.cond}</span></p>
                </div>
                <div className="text-xs font-semibold text-slate-600 leading-relaxed border-t-2 border-slate-200/50 pt-3 mt-1 group-hover:border-emerald-200/50">
                  {m.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-emerald-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Manutenção */}
        <motion.div whileHover={{ borderColor: 'rgba(5, 150, 105, 0.4)' }} className="bg-white border md:border-2 border-slate-200 shadow-lg rounded-3xl p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shrink-0 transition-all z-10">
          <div className="flex items-center gap-5 shrink-0">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border-2 border-emerald-100 shadow-inner">
              <Activity size={24} />
            </div>
            <div>
              <span className="text-[10px] lg:text-xs text-emerald-600 font-black uppercase tracking-[0.2em]">OPEX (SaaS & Nuvem)</span>
              <div className="flex items-baseline gap-2 mt-1">
                 <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-none">Licenças + Infraestrutura</h3>
                 <span className="text-3xl lg:text-4xl font-black text-emerald-600 tracking-tighter ml-2 lg:ml-4">R$ 7.000</span>
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">/ Mês</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 lg:border-l-2 lg:border-slate-100 lg:pl-8">
            {[
              'Infraestrutura em Nuvem Isolada',
              'Licenciamento de Motor IA (Tokens)',
              'Suporte Técnico Pós Go-Live (90d)',
              'SLA: Manutenção Evolutiva'
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> 
                <span className="text-sm font-bold text-slate-700 leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shrink-0 rounded-3xl shadow-2xl mt-6 w-full z-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 blur-[80px] rounded-full pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="flex flex-col">
            <p className="text-white text-lg lg:text-xl font-black tracking-tight leading-relaxed">
              Próximo passo: Reunião de Kickoff Técnico.
            </p>
            <p className="text-emerald-400 text-sm font-medium mt-1">
              Aprovação para início da <strong className="font-black text-white bg-slate-800 px-2 py-0.5 rounded ml-1">Etapa 1 (Kickoff & Arquitetura)</strong>.
            </p>
          </div>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: '#059669', boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://wa.me/5551994195853?text=Ol%C3%A1%20Adriano!%20Gostaria%20de%20aprovar%20a%20proposta%20do%20Portal%20Inpasa%20e%20iniciar%20o%20Kickoff%20T%C3%A9cnico.', '_blank')}
          className="w-full md:w-auto px-10 py-4 lg:px-12 lg:py-5 bg-emerald-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-3 z-10 motion-gpu shrink-0 whitespace-nowrap"
        >
          Aprovar Projeto
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
        </motion.button>
      </div>
    </div>
  </section>
);

const CorporateLoader: React.FC = () => (
  <div className="h-screen w-full bg-slate-50 flex flex-col items-center justify-center font-sans antialiased subpixel-antialiased">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center w-72 motion-gpu"
    >
      <div className="flex justify-center mb-10">
        <div className="relative flex items-center justify-center">
          <motion.img 
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            src="https://www.inpasa.com.br/wp-content/themes/inpasa/assets/images/logo.svg"
            alt="Inpasa"
            className="h-12 w-auto object-contain object-center relative z-10"
            onError={(e) => {
               const target = e.target as HTMLImageElement;
               target.style.display = 'none';
               if (target.nextElementSibling) {
                 (target.nextElementSibling as HTMLElement).style.display = 'flex';
               }
            }}
          />
          <div className="hidden items-center gap-2 relative z-10">
            <LayoutDashboard className="text-emerald-600" size={32} strokeWidth={2.5} />
            <span className="text-3xl font-black tracking-tighter text-slate-900">Inpasa</span>
          </div>

          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-emerald-600 blur-3xl -z-10"
          />
        </div>
      </div>
      <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] font-black mb-8">Inicializando Estrutura</p>
      
      <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="h-full bg-emerald-600"
        />
      </div>
      <div className="flex justify-between mt-3 text-[8px] font-black text-slate-400 uppercase tracking-tighter">
        <span>AltraHub OK</span>
        <span>Mapeamento OK</span>
        <span>ROI OK</span>
      </div>
    </motion.div>
  </div>
);

interface FooterProps {
  onSecurityClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onSecurityClick }) => (
  <footer className="w-full bg-slate-900 rounded-t-[2rem] pt-16 pb-12 px-8 snap-start mt-auto relative overflow-hidden">
    {/* Efeitos Visuais de Fundo */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-800/50 blur-[80px] rounded-full pointer-events-none" />

    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
      
      {/* Coluna 1: Branding */}
      <div className="flex flex-col items-start gap-6 max-w-sm">
        <a 
          href="https://altrahub.com.br" 
          target="_blank" 
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105 active:scale-95 duration-300"
        >
          <img 
            src="/altrahub-logo-light.svg" 
            alt="AltraHub" 
            className="h-8 w-auto"
          />
        </a>
        <p className="text-slate-400 text-sm font-medium leading-relaxed">
          Especialistas em transformar processos complexos em fluxos digitais de alta performance. O DNA AltraHub foca em escala, segurança e excelência estética.
        </p>
      </div>

      {/* Coluna 2: Links e Contato */}
      <div className="flex flex-col md:items-end gap-6 h-full justify-between">
        <div className="flex flex-col md:items-end gap-4">
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Nossos Canais</span>
          <a 
            href="https://altrahub.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest hover:text-emerald-400 transition-colors"
          >
            Conheça o Site Oficial
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <button 
            onClick={onSecurityClick}
            className="group flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-emerald-400 transition-colors mt-2"
          >
            Relatório de Segurança & LGPD
            <ShieldCheck size={14} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="flex flex-col md:items-end gap-1 pt-6 border-t border-slate-800 w-full">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">© 2026 AltraHub Software House</p>
          <a 
            href="https://altrahub.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white text-[11px] font-black hover:text-emerald-400 transition-colors"
          >
            www.altrahub.com.br
          </a>
        </div>
      </div>

    </div>
  </footer>
);

export default App;
