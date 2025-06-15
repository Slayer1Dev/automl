import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider"; // Importe o ThemeProvider

// Páginas Públicas
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Layout e Páginas do Dashboard
import DashboardLayout from "./pages/dashboard/Layout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import RespostasPage from "./pages/dashboard/RespostasPage";
import CalculadoraPage from "./pages/dashboard/CalculadoraPage";
import ControleEstoquePage from "./pages/dashboard/ControleEstoquePage";
import ConfiguracoesPage from "./pages/dashboard/ConfiguracoesPage";
import AjudaPage from "./pages/dashboard/AjudaPage";

const queryClient = new QueryClient();

// Componente provisório para simular a proteção de rotas.
const ProtectedRoute = ({ children }) => {
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* ... Suas Rotas ... */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<DashboardPage />} />
              <Route path="respostas" element={<RespostasPage />} />
              <Route path="calculadora" element={<CalculadoraPage />} />
              <Route path="estoque" element={<ControleEstoquePage />} />
              <Route path="configuracoes" element={<ConfiguracoesPage />} />
              <Route path="ajuda" element={<AjudaPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
