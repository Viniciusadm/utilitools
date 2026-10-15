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
import { useCopy, useLocale } from "@/lib/i18n";
import { parseDecimal } from "@/lib/percentage";
import {
  buildPixPayload,
  MAX_CITY_LENGTH,
  MAX_NAME_LENGTH,
  MAX_TXID_LENGTH,
  pixKeyError,
  type PixKeyError,
  type PixKeyType,
} from "@/lib/pix";

const KEY_TYPES: PixKeyType[] = ["document", "phone", "email", "random"];

const KEY_PLACEHOLDERS: Record<PixKeyType, string> = {
  document: "000.000.000-00",
  phone: "(11) 98765-4321",
  email: "voce@exemplo.com",
  random: "00000000-0000-0000-0000-000000000000",
};

const pt = {
  title: "Gerador de QR Code Pix",
  intro:
    "Gere um QR Code Pix e o código Pix copia e cola para receber pagamentos, com ou sem valor definido. Informe sua chave Pix, nome e cidade. Tudo é gerado no seu navegador: nenhum dado é enviado para servidores.",
  keyTypes: {
    document: "CPF ou CNPJ",
    phone: "Telefone",
    email: "E-mail",
    random: "Chave aleatória",
  } satisfies Record<PixKeyType, string>,
  emailPlaceholder: "voce@exemplo.com",
  keyErrors: {
    required: "Informe a chave Pix.",
    documentLength: "CPF deve ter 11 dígitos e CNPJ 14.",
    phone: "Informe o telefone com DDD.",
    email: "E-mail inválido.",
    randomKey: "A chave aleatória tem 32 caracteres no formato 00000000-0000-0000-0000-000000000000.",
  } satisfies Record<PixKeyError, string>,
  invalidAmount: "Valor inválido.",
  keyTypeLabel: "Tipo de chave",
  keyLabel: "Chave Pix",
  nameLabel: "Nome do recebedor",
  nameHint: (max: number) => `Até ${max} caracteres, sem acentos.`,
  namePlaceholder: "Maria Silva",
  cityLabel: "Cidade",
  cityHint: (max: number) => `Até ${max} caracteres.`,
  cityPlaceholder: "São Paulo",
  amountLabel: "Valor (opcional)",
  amountHint: "Deixe em branco para o pagador digitar o valor.",
  amountPlaceholder: "0,00",
  txidLabel: "Identificador (opcional)",
  txidHint: (max: number) => `Letras e números, até ${max} caracteres.`,
  txidPlaceholder: "PEDIDO123",
  descriptionLabel: "Descrição (opcional)",
  descriptionPlaceholder: "Pagamento do pedido",
  qrAlt: "QR Code Pix gerado",
  copyButton: "Copia e cola",
  copied: "Pix copia e cola copiado!",
  download: "Baixar PNG",
  empty: "Preencha a chave Pix, o nome e a cidade para gerar o QR Code.",
  content: (
    <>
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
    </>
  ),
};

const en: typeof pt = {
  title: "Pix QR Code Generator",
  intro:
    "Create a Pix QR code and a Pix copy-and-paste code (BR Code) to receive payments through Pix, Brazil's instant payment system, with or without a fixed amount. Enter your Pix key, name and city. Everything is generated in your browser: no data is sent to any server.",
  keyTypes: {
    document: "CPF or CNPJ",
    phone: "Phone number",
    email: "Email",
    random: "Random key",
  },
  emailPlaceholder: "you@example.com",
  keyErrors: {
    required: "Enter the Pix key.",
    documentLength: "A CPF must have 11 digits and a CNPJ 14.",
    phone: "Enter the Brazilian phone number with area code (DDD).",
    email: "Invalid email.",
    randomKey: "A random key has 32 characters in the format 00000000-0000-0000-0000-000000000000.",
  },
  invalidAmount: "Invalid amount.",
  keyTypeLabel: "Key type",
  keyLabel: "Pix key",
  nameLabel: "Recipient name",
  nameHint: (max: number) => `Up to ${max} characters, no accents.`,
  namePlaceholder: "Maria Silva",
  cityLabel: "City",
  cityHint: (max: number) => `Up to ${max} characters.`,
  cityPlaceholder: "São Paulo",
  amountLabel: "Amount in BRL (optional)",
  amountHint: "Leave blank to let the payer enter the amount.",
  amountPlaceholder: "0.00",
  txidLabel: "Reference ID (optional)",
  txidHint: (max: number) => `Letters and numbers, up to ${max} characters.`,
  txidPlaceholder: "ORDER123",
  descriptionLabel: "Description (optional)",
  descriptionPlaceholder: "Order payment",
  qrAlt: "Generated Pix QR code",
  copyButton: "Copy and paste code",
  copied: "Pix copy-and-paste code copied!",
  download: "Download PNG",
  empty: "Fill in the Pix key, the name and the city to generate the QR code.",
  content: (
    <>
      <ToolSection title="What is Pix?">
        <p>
          Pix is the instant payment system created by the Central Bank of Brazil (Banco Central do Brasil). Transfers
          settle in seconds, 24/7, and are free for individuals. Payments are sent to a Pix key (a CPF or CNPJ tax ID,
          phone number, email or random key) or by scanning a Pix QR code in any Brazilian banking app.
        </p>
      </ToolSection>

      <ToolSection title="How to create a Pix QR code">
        <ol>
          <li>Choose the key type and enter your Pix key.</li>
          <li>Enter the recipient name and city.</li>
          <li>Optionally, set a fixed amount, a reference ID and a description.</li>
          <li>Download the QR code as a PNG or copy the Pix copy-and-paste code.</li>
        </ol>
        <p>
          <strong>Tip:</strong> before sharing the QR code, make a small test payment to confirm the money lands in the
          right account.
        </p>
      </ToolSection>

      <ToolSection title="Static Pix QR code">
        <p>
          This tool creates a static Pix QR code, the same kind banks offer for receiving payments. It follows the BR
          Code (EMV) standard, can be used many times, never expires and works with any Brazilian banking app. With a
          fixed amount, the payer only confirms; without one, they type how much to pay. Amounts are always in Brazilian
          reais (BRL).
        </p>
      </ToolSection>

      <ToolSection title="Use cases">
        <ul>
          <li>Accept payments at shops, markets and events in Brazil</li>
          <li>Print the QR code on menus, posters and labels</li>
          <li>Send fixed-amount payment requests by WhatsApp or email</li>
          <li>Receive donations and crowdfunding contributions</li>
          <li>Test Pix payment flows in apps and checkouts</li>
        </ul>
      </ToolSection>
    </>
  ),
};

export default function PixQrCode() {
  const copy = useCopy({ pt, en });
  const locale = useLocale();
  const [keyType, setKeyType] = useState<PixKeyType>("document");
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState("");
  const [txid, setTxid] = useState("");
  const [description, setDescription] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");

  const keyError = key ? pixKeyError(keyType, key) : null;
  const parsedAmount = parseDecimal(amount, locale);
  const amountError = amount && (parsedAmount === null || parsedAmount < 0) ? copy.invalidAmount : null;
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
    toast({ title: copy.copied });
  };

  const keyPlaceholder = keyType === "email" ? copy.emailPlaceholder : KEY_PLACEHOLDERS[keyType];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={copy.keyTypeLabel}>
              {(id) => (
                <Select value={keyType} onValueChange={(value) => setKeyType(value as PixKeyType)}>
                  <SelectTrigger id={id}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {KEY_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {copy.keyTypes[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </Field>
            <Field label={copy.keyLabel} hint={keyError ? copy.keyErrors[keyError] : undefined}>
              {(id) => (
                <Input
                  id={id}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder={keyPlaceholder}
                  aria-invalid={Boolean(keyError)}
                />
              )}
            </Field>
            <Field label={copy.nameLabel} hint={copy.nameHint(MAX_NAME_LENGTH)}>
              {(id) => <Input id={id} value={name} onChange={(e) => setName(e.target.value)} placeholder={copy.namePlaceholder} />}
            </Field>
            <Field label={copy.cityLabel} hint={copy.cityHint(MAX_CITY_LENGTH)}>
              {(id) => <Input id={id} value={city} onChange={(e) => setCity(e.target.value)} placeholder={copy.cityPlaceholder} />}
            </Field>
            <Field label={copy.amountLabel} hint={amountError || copy.amountHint}>
              {(id) => (
                <Input
                  id={id}
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={copy.amountPlaceholder}
                  aria-invalid={Boolean(amountError)}
                />
              )}
            </Field>
            <Field label={copy.txidLabel} hint={copy.txidHint(MAX_TXID_LENGTH)}>
              {(id) => <Input id={id} value={txid} onChange={(e) => setTxid(e.target.value)} placeholder={copy.txidPlaceholder} />}
            </Field>
          </div>
          <Field label={copy.descriptionLabel}>
            {(id) => (
              <Input
                id={id}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={copy.descriptionPlaceholder}
              />
            )}
          </Field>
        </div>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-4">
          {payload && qrDataUrl ? (
            <>
              <img src={qrDataUrl} alt={copy.qrAlt} width={320} height={320} className="mx-auto w-full max-w-[280px] rounded-md bg-white" />
              <div className="flex flex-wrap gap-2">
                <Button onClick={copyPayload} className="flex-1 gap-2">
                  <Copy className="h-4 w-4" /> {copy.copyButton}
                </Button>
                <Button variant="secondary" asChild className="flex-1 gap-2">
                  <a href={qrDataUrl} download="qr-code-pix.png">
                    <Download className="h-4 w-4" /> {copy.download}
                  </a>
                </Button>
              </div>
              <p className="break-all rounded-md bg-background p-3 font-mono text-xs text-muted-foreground">{payload}</p>
            </>
          ) : (
            <p className="flex min-h-[280px] items-center justify-center text-center text-sm text-muted-foreground">
              {copy.empty}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}
        <ToolFaq toolId="gerador-de-qr-code-pix" />
        <RelatedTools ids={["calculadora-de-juros-compostos", "calculadora-de-porcentagem", "validar-cpf", "validar-cnpj"]} />
      </div>
    </div>
  );
}
