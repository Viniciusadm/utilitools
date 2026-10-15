import { enUS, ptBR } from "date-fns/locale";

import type { Localized } from "@/lib/i18n";

export const DATE_FNS_LOCALE = { pt: ptBR, en: enUS } satisfies Localized<unknown>;
