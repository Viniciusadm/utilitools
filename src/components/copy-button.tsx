import { Copy } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useUiCopy } from "@/i18n/ui";

type CopyButtonProps = Omit<ButtonProps, "onClick" | "value"> & { value: string; label?: string };

export function CopyButton({ value, label, variant = "secondary", size = "sm", ...props }: CopyButtonProps) {
  const uiCopy = useUiCopy();
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    toast({ title: uiCopy.copied });
  };
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      disabled={!value}
      aria-label={label || uiCopy.generator.copy}
      {...props}
    >
      <Copy className="h-4 w-4" />
      {label ?? uiCopy.generator.copy}
    </Button>
  );
}
