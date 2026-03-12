import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ArrowLeft, 
  FileKey, 
  Database, 
  Server, 
  Fingerprint,
  EyeOff,
  History,
  Activity,
  CheckCircle2,
  Box,
  GlobeLock,
  Network
} from 'lucide-react';

interface SecurityReportProps {
  onBack: () => void;
}

const SecurityReport: React.FC<SecurityReportProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500/30">
      {/* Navbar de Navegação */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 z-50 h-16 flex items-center justify-between px-8 shadow-sm">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para a Proposta
        </button>
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-emerald-500" size={20} />
          <span className="text-sm font-black tracking-widest text-white uppercase">AltraHub Security Center</span>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        
        {/* Header Hero */}
        <section className="px-8 md:px-16 max-w-7xl mx-auto mb-20 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-emerald-500/10 rounded-3xl border border-emerald-500/30 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
          >
            <ShieldCheck className="text-emerald-400" size={40} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6"
          >
            Confiança Construída <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
              Linha a Linha.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl leading-relaxed"
          >
            O Portal Inpasa operará sob a arquitetura de grau militar da AltraHub. Conheça nossas camadas de proteção, isolamento de dados e total conformidade com a LGPD.
          </motion.p>
        </section>

        {/* Sec 1: Arquitetura AI-Native */}
        <section className="px-8 md:px-16 max-w-7xl mx-auto mb-32">
          <div className="mb-12">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2 block">Camadas de Defesa</span>
            <h2 className="text-3xl font-black text-white tracking-tight">Arquitetura de Isolamento (Tenant AI)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Diagrama Esquerdo (Big Box) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-8 bg-slate-800/40 border border-slate-700/60 p-8 rounded-[2rem] relative overflow-hidden flex flex-col justify-center min-h-[400px]"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
              
              <div className="relative z-10 w-full">
                <div className="flex flex-col gap-4">
                  {/* Layer 1 */}
                  <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-700 p-4 rounded-2xl relative shadow-lg">
                    <GlobeLock className="text-slate-400" size={24} />
                    <div>
                      <h4 className="font-bold text-white">WAF & DDoS Protection (Cloudflare)</h4>
                      <p className="text-xs text-slate-400 mt-1">Filtro de tráfego na borda. Bloqueio automático de anomalias.</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center -my-2 opacity-50"><ArrowLeft className="rotate-[-90deg] text-emerald-500" size={20}/></div>
                  
                  {/* Layer 2 */}
                  <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-700 p-4 rounded-2xl relative shadow-lg">
                    <Server className="text-slate-400" size={24} />
                    <div>
                      <h4 className="font-bold text-white">VPC Isolada (Rede Privada)</h4>
                      <p className="text-xs text-slate-400 mt-1">Apenas o Backend tem acesso ao banco de dados e APIs internas Inpasa.</p>
                    </div>
                  </div>

                  <div className="flex justify-center -my-2 opacity-50"><ArrowLeft className="rotate-[-90deg] text-emerald-500" size={20}/></div>

                  {/* Layer 3 - AI Enclave */}
                  <div className="flex items-center gap-4 bg-emerald-900/20 border border-emerald-500/30 p-5 rounded-2xl relative shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                    <Box className="text-emerald-400" size={28} />
                    <div>
                      <h4 className="font-bold text-emerald-100 flex items-center gap-2">
                        LLM Enclave (Processamento de IA)
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded uppercase tracking-widest border border-emerald-500/20">Zero Retention</span>
                      </h4>
                      <p className="text-xs text-emerald-200/70 mt-1">Os modelos não usam dados da Inpasa para treinamento. O histórico é encriptado via AES-256 e o token da OpenAI/Anthropic é estrito (Tier Enterprise).</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Boxes Direita */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex-1 bg-slate-800/40 border border-slate-700/60 p-8 rounded-[2rem]"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
                  <Database size={24} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Encryption at Rest</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">Os bancos de dados (PostgreSQL/Redis) são encriptados no nível do disco em datacenters com certificação ISO 27001 e SOC 2.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="flex-1 bg-slate-800/40 border border-slate-700/60 p-8 rounded-[2rem]"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
                  <Network size={24} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Criptografia in-Transit</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">Todo tráfego entre o cliente, o portal e as APIs da Inpasa ocorre via TLS 1.3 obrigatório. Nenhum payload descriptografado transita em rede aberta.</p>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Sec 2: LGPD Compliance (Grid de Bento) */}
        <section className="px-8 md:px-16 max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2 block">Conformidade Legal</span>
            <h2 className="text-3xl font-black text-white tracking-tight">Preparação LGPD Nativa</h2>
            <p className="text-slate-400 mt-3 max-w-2xl font-medium">Desde a base de dados até ao prompt da inteligência artificial, construímos fluxos auditáveis para atender todos os pilares da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {[
              {
                icon: <FileKey />,
                title: "Consentimento e Termos",
                desc: "Gestão inteligente de aceite das Políticas de Privacidade. Versionamento automático para caso haja disputa com usuários.",
                highlight: true
              },
              {
                icon: <Fingerprint />,
                title: "Anonimização de IA",
                desc: "PII (Personally Identifiable Information) como CPFs ou Cartões são hasheados/mascarados antes de atingir os motores NLP."
              },
              {
                icon: <EyeOff />,
                title: "Direito ao Esquecimento",
                desc: "APIs prontas para apagar de forma irreversível registros de usuários (em cache ou DBs) caso demandem exclusão de dados."
              },
              {
                icon: <History />,
                title: "Auditoria Restrita (Logs)",
                desc: "Registro imutável (Audit Trail) de 'quem acessou qual dado e quando'. Essencial para comprovação perante a ANPD."
              },
              {
                icon: <CheckCircle2 />,
                title: "Zero Data Sharing",
                desc: "Garantia contratual de que os relatórios, fluxos financeiros e conversas no chatbot jamais serão vendidos ou compartilhados."
              },
              {
                icon: <Activity />,
                title: "Monitoramento Ativo",
                desc: "Sistemas IDS (Intrusion Detection) rodando 24/7. Em caso de brecha, alertas instantâneos para mitigação proativa."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`p-8 rounded-[2rem] border transition-all ${
                  item.highlight 
                    ? 'bg-gradient-to-br from-emerald-900/40 to-slate-900 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.05)]' 
                    : 'bg-slate-800/20 border-slate-700/50 hover:bg-slate-800/40'
                }`}
              >
                <div className={`mb-6 ${item.highlight ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {React.cloneElement(item.icon, { size: 32 })}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}

          </div>
        </section>

      </main>
    </div>
  );
};

export default SecurityReport;
