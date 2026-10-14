import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field } from "@/components/form-field";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { toast } from "@/hooks/use-toast";
import { parseDecimal } from "@/lib/percentage";
import {
  buildPixPayload,
  MAX_CITY_LENGTH,
  MAX_NAME_LENGTH,
  MAX_TXID_LENGTH,
  pixKeyError,
  type PixKeyType,
} from "@/lib/pix";

const KEY_TYPES: { value: PixKeyType; label: string; placeholder: string }[] = [
  { value: "document", label: "CPF ou CNPJ", placeholder: "000.000.000-00" },
  { value: "phone", label: "Telefone", placeholder: "(11) 98765-4321" },
  { value: "email", label: "E-mail", placeholder: "voce@exemplo.com" },
  { value: "random", label: "Chave aleatória", placeholder: "00000000-0000-0000-0000-000000000000" },
];

export default function PixQrCode() {
  const [keyType, setKeyType] = useState<PixKeyType>("document");
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState("");
  const [txid, setTxid] = useState("");
  const [description, setDescription] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");

  const keyError = key ? pixKeyError(keyType, key) : null;
  const parsedAmount = parseDecimal(amount);
  const amountError = amount && (parsedAmount === null || parsedAmount < 0) ? "Valor inválido." : null;
  const ready = key && !keyError && name.trim() && city.trim() && !amountError;

  const payload = useMemo(
    () => (ready ? buildPixPayload({ keyType, key, name, city, amount: parsedAmount, txid, description }) : ""),
    [ready, keyType, key, name, city, parsedAmount, txid, description],
  );

  useEffect(() => {
    if (!payload) return;
    let cancelled = false;
    QRCode.toDataURL(payload, { width: 320, margin: 2, errorCorrectionLevel: "M" }).then((url) => {
      if (!cancelled) setQrDataUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [payload]);

  const copyPayload = async () => {
    await navigator.clipboard.writeText(payload);
    toast({ title: "Pix copia e cola copiado!" });
  };

  const currentKeyType = KEY_TYPES.find((type) => type.value === keyType)!;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Gerador de QR Code Pix</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Gere um QR Code Pix e o código Pix copia e cola para receber pagamentos, com ou sem valor definido. Informe sua
          chave Pix, nome e cidade. Tudo é gerado no seu navegador: nenhum dado é enviado para servidores.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Tipo de chave">
              {(id) => (
                <Select value={keyType} onValueChange={(value) => setKeyType(value as PixKeyType)}>
                  <SelectTrigger id={id}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {KEY_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </Field>
            <Field label="Chave Pix" hint={keyError ?? undefined}>
              {(id) => (
                <Input
                  id={id}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder={currentKeyType.placeholder}
                  aria-invalid={Boolean(keyError)}
                />
              )}
            </Field>
            <Field label="Nome do recebedor" hint={`Até ${MAX_NAME_LENGTH} caracteres, sem acentos.`}>
              {(id) => <Input id={id} value={name} onChange={(e) => setName(e.target.value)} placeholder="Maria Silva" />}
            </Field>
            <Field label="Cidade" hint={`Até ${MAX_CITY_LENGTH} caracteres.`}>
              {(id) => <Input id={id} value={city} onChange={(e) => setCity(e.target.value)} placeholder="São Paulo" />}
            </Field>
            <Field label="Valor (opcional)" hint={amountError ?? "Deixe em branco para o pagador digitar o valor."}>
              {(id) => (
                <Input
                  id={id}
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0,00"
                  aria-invalid={Boolean(amountError)}
                />
              )}
            </Field>
            <Field label="Identificador (opcional)" hint={`Letras e números, até ${MAX_TXID_LENGTH} caracteres.`}>
              {(id) => <Input id={id} value={txid} onChange={(e) => setTxid(e.target.value)} placeholder="PEDIDO123" />}
            </Field>
          </div>
          <Field label="Descrição (opcional)">
            {(id) => (
              <Input
                id={id}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Pagamento do pedido"
              />
            )}
          </Field>
        </div>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-4">
          {payload && qrDataUrl ? (
            <>
              <img src={qrDataUrl} alt="QR Code Pix gerado" width={320} height={320} className="mx-auto w-full max-w-[280px] rounded-md bg-white" />
              <div className="flex flex-wrap gap-2">
                <Button onClick={copyPayload} className="flex-1 gap-2">
                  <Copy className="h-4 w-4" /> Copia e cola
                </Button>
                <Button variant="secondary" asChild className="flex-1 gap-2">
                  <a href={qrDataUrl} download="qr-code-pix.png">
                    <Download className="h-4 w-4" /> Baixar PNG
                  </a>
                </Button>
              </div>
              <p className="break-all rounded-md bg-background p-3 font-mono text-xs text-muted-foreground">{payload}</p>
            </>
          ) : (
            <p className="flex min-h-[280px] items-center justify-center text-center text-sm text-muted-foreground">
              Preencha a chave Pix, o nome e a cidade para gerar o QR Code.
            </p>
          )}
        </div>
      </div>

      <div className="space-y-8 border-t border-border pt-10">
        <ToolSection title="Como gerar um QR Code Pix">
          <ol>
            <li>Escolha o tipo de chave e digite sua chave Pix.</li>
            <li>Informe o nome do recebedor e a cidade.</li>
            <li>Se quiser, defina um valor fixo, um identificador e uma descrição.</li>
            <li>Baixe o QR Code em PNG ou copie o código Pix copia e cola.</li>
          </ol>
          <p>
            <strong>Dica:</strong> antes de divulgar o QR Code, faça um pagamento de teste com um valor baixo para
            confirmar que o dinheiro cai na conta certa.
          </p>
        </ToolSection>

        <ToolSection title="QR Code Pix estático">
          <p>
            Esta ferramenta gera um QR Code Pix estático, o mesmo tipo que os bancos oferecem para receber pagamentos. Ele
            pode ser usado várias vezes, não expira e funciona em qualquer aplicativo de banco. Com valor definido, o
            pagador só confirma; sem valor, ele digita quanto quer pagar.
          </p>
        </ToolSection>

        <ToolSection title="Para que usar">
          <ul>
            <li>Receber pagamentos em lojas, feiras e eventos</li>
            <li>Colocar o QR Code em cardápios, cartazes e etiquetas</li>
            <li>Enviar cobranças com valor fixo por WhatsApp ou e-mail</li>
            <li>Receber doações e vaquinhas</li>
          </ul>
        </ToolSection>

        <ToolFaq segment="gerador-de-qr-code-pix" />
        <RelatedTools segments={["calculadora-de-juros-compostos", "calculadora-de-porcentagem", "validar-cpf", "validar-cnpj"]} />
      </div>
    </div>
  );
}
