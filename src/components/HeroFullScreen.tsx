import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const HeroFullScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [arrowBounce, setArrowBounce] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const bounceInterval = setInterval(() => {
      setArrowBounce(prev => !prev);
    }, 2000);

    // Auto scroll hint on page load
    setTimeout(() => {
      window.scrollBy({
        top: 25,
        behavior: 'smooth'
      });
      setTimeout(() => {
        window.scrollBy({
          top: -25,
          behavior: 'smooth'
        });
      }, 800);
    }, 2000);

    return () => clearInterval(bounceInterval);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20 pt-16 md:pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/40 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-100/50 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-purple-100/40 rounded-full blur-lg animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-cyan-100/30 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Título Principal Melhorado */}
        <div className={`mb-16 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* A LINHA ABAIXO FOI A ALTERADA */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="block">Gerencie seus
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> anúncios</span>
            </span>
            <span className="block">com inteligência e
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> automação real</span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light max-w-4xl mx-auto">
            Ganhe tempo e aumente sua eficiência com respostas automáticas, análise de lucro e SEO otimizado
          </p>
          
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Centralize e automatize seu atendimento em marketplaces. Compatível com plataformas como grandes marketplaces e lojas virtuais.
          </p>
        </div>

        {/* CTA Button Melhorado */}
        <div className={`mb-20 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-xl font-semibold rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 mb-8">
            Ativar meu painel agora
          </button>
        </div>

        {/* Seta Animada Melhorada */}
        <div className={`transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <button 
            onClick={scrollToContent}
            className="group flex flex-col items-center gap-3 mx-auto hover:scale-110 transition-transform duration-300"
          >
            <div className={`w-16 h-16 bg-white/90 backdrop-blur-sm border border-blue-100 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 ${arrowBounce ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-70'}`}>
              <ArrowDown className="w-6 h-6 text-blue-600 transition-transform duration-300 group-hover:translate-y-1" />
            </div>
            <span className={`text-blue-600 font-medium text-sm tracking-wide transition-all duration-500 ${arrowBounce ? 'opacity-100' : 'opacity-70'}`}>
              Desça e descubra
            </span>
          </button>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroFullScreen;