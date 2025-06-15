import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas Públicas
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Layout e Páginas do Dashboard
import DashboardLayout from "./pages/dashboard/Layout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ConfiguracoesPage from "./pages/dashboard/ConfiguracoesPage";
import AjudaPage from "./pages/dashboard/AjudaPage";
import RespostasPage from "./pages/dashboard/RespostasPage";
import CalculadoraPage from "./pages/dashboard/CalculadoraPage";

const queryClient = new QueryClient();

// Componente provisório para simular a proteção de rotas.
const ProtectedRoute = ({ children }) => {
  // A lógica de verificação do Clerk virá aqui.
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rotas Protegidas (utilizam o DashboardLayout) */}
          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="respostas" element={<RespostasPage />} />
            <Route path="calculadora" element={<CalculadoraPage />} />
            <Route path="configuracoes" element={<ConfiguracoesPage />} />
            <Route path="ajuda" element={<AjudaPage />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;