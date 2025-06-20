import React, { useEffect, useState, useRef } from 'react';
import { MessageSquare, Calculator, Search, Package, ArrowRight, Play, Check, Zap, Barcode } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

const iconMap = {
  chat: MessageSquare,
  barcode: Barcode,
  calculator: Calculator,
  search: Search,
  package: Package
};

const colorMap = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600',
  indigo: 'from-indigo-500 to-indigo-600'
};

// Custom Hook para animação de "count up"
const useCountUp = (end: number, duration: number, startAnimation: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startAnimation) return;
    let frame = 0;
    const totalFrames = Math.round(duration / (1000 / 60));
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setCount(end * progress);
      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(end);
      }
    }, 1000 / 60);
    return () => clearInterval(counter);
  }, [end, duration, startAnimation]);

  return Math.floor(count);
};

const ToolSection = ({ tool, index, scrollY }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const Icon = iconMap[tool.icon];
  const sectionRef = useRef(null);
  
  // Animação de contagem para a calculadora
  const animatedPrice = useCountUp(89.90, 1500, animationStep >= 3);
  const animatedProfit = useCountUp(28, 1500, animationStep >= 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            setTimeout(() => setAnimationStep(1), 300);
            setTimeout(() => setAnimationStep(2), 600);
            setTimeout(() => setAnimationStep(3), 900);
          }
        });
      },
      { threshold: 0.3 }
    );
    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef) };
  }, [isVisible]);

  const parallaxOffset = (scrollY * 0.15 * (index + 1));
  const parallaxOffsetSlow = (scrollY * 0.05 * (index + 1));
  const isEven = index % 2 === 0;

  const renderMockup = () => {
    switch (tool.mockup) {
      case 'chat-simulation':
        return (
          <div className="space-y-6">
            <div className={`bg-gray-100 p-5 rounded-3xl rounded-br-lg max-w-xs transform transition-all duration-700 delay-300 ${animationStep >= 1 ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-8 opacity-0 scale-95'}`}>
              <p className="text-gray-700 text-sm">Qual o prazo de entrega para SP?</p>
              <span className="text-xs text-gray-400 mt-2 block">há 2 minutos</span>
            </div>
            <div className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-3xl rounded-bl-lg max-w-xs ml-auto transform transition-all duration-700 delay-600 ${animationStep >= 2 ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-8 opacity-0 scale-95'}`}>
              <p className="text-sm leading-relaxed">Olá! O prazo de entrega para São Paulo é de 2-3 dias úteis. Enviamos no mesmo dia para pedidos até 14h! 😊</p>
              <span className="text-xs text-blue-100 mt-2 block">Resposta automática • agora</span>
            </div>
            <div className={`flex items-center gap-3 text-green-600 text-sm transform transition-all duration-500 delay-900 ${animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                <Check className="w-3 h-3" />
              </div>
              <span className="font-medium">Resposta gerada e enviada</span>
            </div>
          </div>
        );

      case 'profit-calculation':
        return (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl max-w-sm">
            <div className="space-y-5">
              <div className={`flex justify-between text-sm transform transition-all duration-300 delay-300 ${animationStep >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                <span className="text-gray-600">Custo do produto:</span>
                <span className="font-semibold">R$ 50,00</span>
              </div>
              <div className={`flex justify-between text-sm transform transition-all duration-300 delay-500 ${animationStep >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                <span className="text-gray-600">Comissão ML (12%):</span>
                <span className="font-semibold text-red-500">- R$ 9,60</span>
              </div>
              <div className={`flex justify-between text-sm transform transition-all duration-300 delay-700 ${animationStep >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                <span className="text-gray-600">Frete estimado:</span>
                <span className="font-semibold text-red-500">- R$ 15,00</span>
              </div>
              <hr className="border-gray-200" />
              <div className={`flex justify-between font-bold text-lg text-green-600 transform transition-all duration-500 delay-900 ${animationStep >= 2 ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}>
                <span>Preço ideal:</span>
                <span>R$ {animatedPrice.toFixed(2).replace('.',',')}</span>
              </div>
              <div className={`text-xs text-green-600 text-center transform transition-all duration-300 delay-1100 ${animationStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                Margem de lucro: {animatedProfit}%
              </div>
            </div>
          </div>
        );
      
      case 'seo-optimization':
        return (
          <div className="space-y-6 max-w-md">
            <div className={`bg-gray-50 p-6 rounded-3xl transform transition-all duration-500 ${animationStep >= 2 ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}>
              <div className="text-xs text-gray-500 mb-3 font-medium">ANTES:</div>
              <div className={`text-sm text-gray-700`}>
                iPhone 12 usado
              </div>
            </div>
            <div className={`flex justify-center transform transition-all duration-500 delay-600 ${animationStep >= 2 ? 'opacity-100 rotate-0 scale-110' : 'opacity-0 rotate-180 scale-50'}`}>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center animate-pulse">
                <Zap className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-100">
              <div className="text-xs text-blue-600 mb-3 font-medium">DEPOIS (Otimizado com IA):</div>
              <div className={`text-sm text-gray-900 font-medium leading-relaxed transform transition-all duration-500 delay-900 ${animationStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                iPhone 12 128GB Desbloqueado Original Apple - Seminovo Premium Garantia 6 Meses
              </div>
              <div className={`text-xs text-green-600 mt-3 flex items-center gap-1 transform transition-all duration-300 delay-1100 ${animationStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                <Check className="w-3 h-3" />
                <span>+187% mais visibilidade</span>
              </div>
            </div>
          </div>
        );
      
      case 'inventory-sync':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-6">
              {[1, 2, 3].map((item, i) => (
                <div key={item} className={`w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center transform transition-all duration-500 delay-${(i + 1) * 200} ${animationStep >= 1 ? 'scale-100 opacity-100 rotate-0' : 'scale-90 opacity-0 -rotate-12'}`}>
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
              ))}
            </div>
            <div className={`flex justify-center transition-all duration-1000 delay-800 ${animationStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-24 h-0.5 bg-blue-300"></div>
            </div>
            <div className={`flex justify-center transform transition-all duration-500 delay-1000 ${animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="bg-white px-6 py-3 rounded-2xl border border-green-200 text-green-600 text-sm font-medium shadow-lg">
                Estoque: 15 unidades sincronizadas
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section 
      id={`tool-${tool.id}`}
      ref={sectionRef}
      className="min-h-screen flex items-center py-32 md:py-40 relative overflow-hidden"
      style={{
        background: index % 2 === 0 
          ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(255, 255, 255, 1) 50%, rgba(79, 70, 229, 0.03) 100%)'
          : 'linear-gradient(135deg, rgba(79, 70, 229, 0.03) 0%, rgba(255, 255, 255, 1) 50%, rgba(59, 130, 246, 0.03) 100%)'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 w-40 h-40 bg-blue-100/20 rounded-full blur-3xl"
          style={{ 
            left: isEven ? '10%' : '75%',
            transform: `translateY(${parallaxOffsetSlow}px)` 
          }}
        ></div>
        <div 
          className="absolute top-1/3 w-32 h-32 bg-indigo-100/30 rounded-full blur-2xl"
          style={{ 
            right: isEven ? '20%' : '10%',
            transform: `translateY(${parallaxOffset}px)` 
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
          
          <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'} flex justify-center`}>
            <div 
              className={`transform transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : `${isEven ? 'translate-x-[-100px]' : 'translate-x-[100px]'} opacity-0`}`}
            >
              <div className="relative">
                {renderMockup()}
              </div>
            </div>
          </div>

          <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} px-4 lg:px-0`}>
            <div 
              className={`transform transition-all duration-1000 ease-out delay-300 ${isVisible ? 'translate-x-0 opacity-100' : `${!isEven ? 'translate-x-[-100px]' : 'translate-x-[100px]'} opacity-0`}`}
            >
              <div className={`inline-flex items-center px-5 py-3 bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm border border-${tool.color}-100 dark:border-slate-700 rounded-2xl text-${tool.color}-700 dark:text-${tool.color}-400 text-sm font-medium mb-8 shadow-lg`}>
                <span className={`w-2.5 h-2.5 bg-gradient-to-r ${colorMap[tool.color]} rounded-full mr-3`}></span>
                Ferramenta #{index + 1}
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-8 leading-tight">
                {tool.title}
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {tool.description}
              </p>
              
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-12 leading-relaxed">
                {tool.details}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className={`bg-gradient-to-r ${colorMap[tool.color]} text-white px-10 py-5 rounded-3xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center group text-lg`}>
                        <Play className="w-5 h-5 mr-3" />
                        Ver em ação
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                      <DialogHeader>
                          <DialogTitle>{tool.title}</DialogTitle>
                          <DialogDescription>Demonstração em vídeo em breve!</DialogDescription>
                      </DialogHeader>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 px-10 py-5 rounded-3xl font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-300 text-lg">
                            Saiba mais
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                          <DialogTitle>Sobre: {tool.title}</DialogTitle>
                          <DialogDescription>{tool.details} Mais informações e documentação detalhada estarão disponíveis aqui em breve.</DialogDescription>
                      </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolSection;