import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-gray-500">
          Gira as informações do seu perfil e as suas conexões.
        </p>
      </div>
      
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>
            Estas são as suas informações públicas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" defaultValue="Seu Nome" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="seu-email@exemplo.com" disabled />
          </div>
           <Button disabled>Salvar Alterações</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conexões</CardTitle>
          <CardDescription>
            Conecte a sua conta do Mercado Livre para começar a usar as ferramentas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold">Mercado Livre</h3>
              <p className="text-sm text-gray-500">Não conectado</p>
            </div>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
              Conectar com Mercado Livre
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}