import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export default function ControleEstoquePage() {
  return (
    <Card className="flex flex-col items-center justify-center text-center p-8 h-full">
      <CardHeader>
        <div className="mx-auto bg-muted p-3 rounded-full">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardTitle className="mt-4">Controle de Estoque</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Esta funcionalidade está em desenvolvimento e estará disponível em breve.
        </p>
      </CardContent>
    </Card>
  );
}