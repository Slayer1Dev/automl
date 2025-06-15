import React, { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarNav } from '@/components/ui/sidebar'; // Adicionado SidebarProvider
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Card* não são usados, mas mantidos caso sejam para uso futuro.
import { Bell, User, Settings, LifeBuoy, LogOut, MessageSquare, Calculator } from 'lucide-react';

import DashboardMain from './DashboardMain';
import RespostasAutomaticas from './RespostasAutomaticas';
import CalculadoraLucro from './CalculadoraLucro';
// O import do GeradorEAN foi removido intencionalmente

type Section = 'dashboard' | 'respostas' | 'calculadora' | 'ajuda' | 'configuracoes' | 'sair';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');

  const mainSidebarNav = [
    { title: 'Painel', icon: User, section: 'dashboard' as Section },
    { title: 'Respostas Automáticas', icon: MessageSquare, section: 'respostas' as Section },
    { title: 'Calculadora de Lucro', icon: Calculator, section: 'calculadora' as Section },
  ];

  const footerSidebarNav = [
    { title: 'Ajuda', icon: LifeBuoy, section: 'ajuda' as Section },
    { title: 'Configurações', icon: Settings, section: 'configuracoes' as Section },
    { title: 'Sair', icon: LogOut, section: 'sair' as Section },
  ];

  const handleSectionChange = (section: Section) => {
    // Se a seção for 'sair', 'ajuda', ou 'configuracoes', você pode querer
    // uma lógica diferente (ex: abrir modal, redirecionar, etc.)
    // Por enquanto, apenas atualiza a seção ativa.
    setActiveSection(section);
    // Exemplo: if (section === 'sair') { /* lógica de logout */ }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardMain />;
      case 'respostas':
        return <RespostasAutomaticas />;
      case 'calculadora':
        return <CalculadoraLucro />;
      // Cases para 'ajuda', 'configuracoes', 'sair' podem renderizar
      // componentes específicos ou serem tratados de outra forma.
      // Por exemplo, 'configuracoes' pode abrir um modal de configurações.
      // 'sair' pode executar uma função de logout.
      // 'ajuda' pode redirecionar para uma página de FAQ.
      case 'configuracoes':
        return <div className="p-6">Página de Configurações (em desenvolvimento)</div>;
      case 'ajuda':
        return <div className="p-6">Página de Ajuda (em desenvolvimento)</div>;
      default:
        // Se 'sair' for clicado, pode não haver um componente para renderizar aqui,
        // a ação de sair seria tratada em handleSectionChange.
        // Retornar DashboardMain como padrão ou uma mensagem.
        return <DashboardMain />;
    }
  };

  // Determina o título do cabeçalho com base na seção ativa
  const currentNavItems = [...mainSidebarNav, ...footerSidebarNav];
  const headerTitle = currentNavItems.find(item => item.section === activeSection)?.title || 'Painel';


  return (
    <SidebarProvider> {/* Envolve todo o layout com SidebarProvider */}
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar> {/* Este Sidebar é de @/components/ui/sidebar */}
          <SidebarNav
            navItems={mainSidebarNav}
            activeSection={activeSection}
            setActiveSection={handleSectionChange} // Usar o handler customizado
          />
          <div className="mt-auto"> {/* Itens de rodapé do Sidebar */}
            <SidebarNav
              navItems={footerSidebarNav}
              activeSection={activeSection} // Opcional: pode destacar se for uma seção
              setActiveSection={handleSectionChange} // Usar o handler customizado
            />
          </div>
        </Sidebar>

        <div className="flex-1 flex flex-col"> {/* Adicionado flex-col para header fixo */}
          <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30"> {/* Header fixo */}
            <h1 className="text-xl font-semibold">
              {headerTitle}
            </h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              {/* Placeholder para avatar do usuário, pode ser um DropdownMenu ou similar */}
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-600">
                {/* Ex: User Initials */}
                <User className="w-4 h-4" />
              </div>
            </div>
          </header>

          <main className="p-6 flex-1 overflow-y-auto"> {/* Conteúdo principal com scroll */}
            {renderActiveSection()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
