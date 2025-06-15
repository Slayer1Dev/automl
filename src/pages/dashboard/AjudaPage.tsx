import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  
  export default function AjudaPage() {
    const faqs = [
      {
        question: "Como conecto a minha conta do Mercado Livre?",
        answer: "Vá para a página de Configurações, encontre a secção 'Conexões' e clique no botão 'Conectar com Mercado Livre'. Você será redirecionado para autorizar a nossa aplicação de forma segura."
      },
      {
        question: "As respostas automáticas são enviadas imediatamente?",
        answer: "Sim, assim que uma nova pergunta é recebida e a nossa IA gera uma resposta com alta confiança, ela é enviada. Você pode rever todas as respostas enviadas no painel de Respostas Automáticas."
      },
      {
        question: "A calculadora de lucro considera todas as taxas?",
        answer: "A nossa calculadora considera a comissão padrão da plataforma selecionada. Custos de envio e outras taxas variáveis devem ser considerados por si ao definir o seu preço final."
      },
    ];
  
    return (
      <div className="space-y-6">
         <div>
          <h1 className="text-2xl font-bold tracking-tight">Central de Ajuda</h1>
          <p className="text-gray-500">
            Encontre respostas para as suas perguntas mais frequentes.
          </p>
        </div>
  
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <Card>
          <CardHeader>
            <CardTitle>Não encontrou o que procurava?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Contacte o nosso suporte através do email: <a href="mailto:suporte@hubvendedorpro.com" className="text-blue-600 font-semibold">suporte@hubvendedorpro.com</a>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }