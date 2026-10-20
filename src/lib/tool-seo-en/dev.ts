import type { ToolSeo } from "@/lib/tool-seo";

export const SEO: Readonly<Record<string, ToolSeo>> = {
  "formatar-json": {
    title: "JSON Formatter, Validator and Minifier Online",
    description:
      "Free online JSON formatter and validator. Beautify with 2 or 4 spaces, minify, sort keys and see the exact line and column of errors. Runs in your browser.",
    faq: [
      {
        question: "How do I format JSON online?",
        answer:
          "Paste your JSON into the input box and the formatted result appears instantly. Pick 2 spaces, 4 spaces or tab indentation and click Copy.",
      },
      {
        question: "How can I tell if my JSON is valid?",
        answer:
          "The tool validates as you type. If there is an error, it shows the line and column of the problem, such as a trailing comma or a single quote.",
      },
      {
        question: "What is the difference between beautifying and minifying JSON?",
        answer:
          "Beautifying adds line breaks and indentation so the JSON is easy to read. Minifying strips all unnecessary whitespace to make it smaller. The data is the same.",
      },
      {
        question: "Does JSON support comments?",
        answer:
          "No. Standard JSON does not allow // or /* */ comments. Formats such as JSONC and JSON5 do, but they are not plain JSON.",
      },
      {
        question: "Is my JSON sent to a server?",
        answer: "No. Formatting and validation happen entirely in your browser, so it is safe to use with sensitive data.",
      },
    ],
  },
  "codificar-base64": {
    title: "Base64 Encode and Decode Online",
    description:
      "Encode text to Base64 and decode Base64 to text online, with full UTF-8 support and URL-safe Base64. Free, instant and nothing leaves your browser.",
    faq: [
      {
        question: "How do I decode Base64?",
        answer:
          "Choose Decode, paste the Base64 string and the original text appears instantly. URL-safe Base64 with - and _ is accepted too.",
      },
      {
        question: "Is Base64 encryption?",
        answer:
          "No. Base64 is just an encoding, and anyone can decode it without a key. Never use it to protect passwords or sensitive data.",
      },
      {
        question: "Why does Base64 end with =?",
        answer:
          "The equals sign is padding. Base64 encodes groups of 3 bytes, and when the input does not fill the last group, one or two = signs are added.",
      },
      {
        question: "What is URL-safe Base64?",
        answer:
          "A variant that replaces + with - and / with _, and drops the = padding, so the value can be used in URLs and file names without escaping. JWTs use it.",
      },
      {
        question: "How much bigger does Base64 make data?",
        answer: "About 33%. Every 3 input bytes become 4 Base64 characters.",
      },
    ],
  },
  "gerador-de-uuid": {
    title: "UUID Generator – Bulk UUID v4 and v7 Online",
    description:
      "Generate random UUID v4 and time-ordered UUID v7 values online, up to 500 at once. Uppercase, with or without hyphens, using secure browser crypto.",
    faq: [
      {
        question: "Are UUID and GUID the same thing?",
        answer: "Yes. GUID (Globally Unique Identifier) is Microsoft's name for the same 128-bit identifier standard.",
      },
      {
        question: "Can a UUID be duplicated?",
        answer:
          "Not in practice. A UUID v4 has 122 random bits, so you would need to generate billions of UUIDs per second for decades to have a real chance of a collision.",
      },
      {
        question: "What is the difference between UUID v4 and v7?",
        answer:
          "v4 is fully random. v7 starts with a millisecond timestamp, so IDs sort in creation order, which improves database index performance.",
      },
      {
        question: "Should I use UUIDs as primary keys?",
        answer:
          "You can. Prefer UUID v7 for large tables, because time ordering avoids index fragmentation. In PostgreSQL, use the uuid type instead of text.",
      },
      {
        question: "How many characters are in a UUID?",
        answer: "36 characters with hyphens, or 32 hexadecimal digits without them.",
      },
    ],
  },
  "gerador-de-hash": {
    title: "Hash Generator – MD5, SHA-1, SHA-256 and SHA-512 Online",
    description:
      "Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes of any text at once. Free, fast and computed entirely in your browser.",
    faq: [
      {
        question: "Can an MD5 or SHA-256 hash be decrypted?",
        answer:
          "No. A hash is a one-way function, not encryption. Sites that claim to reverse MD5 only look the hash up in lists of known inputs.",
      },
      {
        question: "Which hash is the most secure?",
        answer:
          "Of the ones listed, SHA-256 and SHA-512. MD5 and SHA-1 have known collisions and should only be used for simple checksums, not security.",
      },
      {
        question: "Can I use SHA-256 to store passwords?",
        answer:
          "It is not ideal. SHA-256 is too fast, which makes brute-force attacks easier. For passwords use bcrypt, scrypt or Argon2, which are slow and salted.",
      },
      {
        question: "Why does the hash change when I add a space?",
        answer:
          "Any change to the input, even a space or a line break, produces a completely different hash. This is called the avalanche effect.",
      },
      {
        question: "How long is each hash?",
        answer: "In hexadecimal, MD5 is 32 characters, SHA-1 is 40, SHA-256 is 64, SHA-384 is 96 and SHA-512 is 128.",
      },
    ],
  },
  "codificar-url": {
    title: "URL Encoder and Decoder Online",
    description:
      "Encode and decode URLs and query string parameters online. Convert spaces, accents and symbols to percent-encoding such as %20 and back again.",
    faq: [
      {
        question: "What does %20 mean in a URL?",
        answer: "It is an encoded space. Spaces are not allowed in URLs, so they become %20, the hexadecimal code of the character.",
      },
      {
        question: "What is the difference between encodeURI and encodeURIComponent?",
        answer:
          "encodeURIComponent encodes everything, including / ? & and =, and is meant for parameter values. encodeURI keeps the URL structure and is meant for a full address.",
      },
      {
        question: "Why did + turn into a space when decoding?",
        answer:
          "HTML forms send spaces as +, so the decoder treats + as a space. For a literal plus sign, use %2B.",
      },
      {
        question: "How are accented characters encoded in a URL?",
        answer: "Each accented letter becomes its UTF-8 bytes in percent-encoding, so é becomes %C3%A9 and ñ becomes %C3%B1.",
      },
    ],
  },
  "decodificar-jwt": {
    title: "JWT Decoder – Decode JSON Web Tokens Online",
    description:
      "Decode JWT tokens online and see the header, payload and issue and expiration dates. The token is decoded in your browser and never sent to a server.",
    faq: [
      {
        question: "Is it safe to paste my JWT here?",
        answer:
          "Yes. Decoding happens in your browser and the token never leaves your device. Still, avoid sharing valid production tokens anywhere.",
      },
      {
        question: "Does decoding a JWT verify its signature?",
        answer:
          "No. Decoding only reads the header and payload. Verifying the signature requires the issuer's secret (HS256) or public key (RS256).",
      },
      {
        question: "How do I know if a JWT has expired?",
        answer:
          "Check the exp claim in the payload. It is a Unix timestamp in seconds, and the tool shows it as a date and tells you whether the token has expired.",
      },
      {
        question: "Is a JWT encrypted?",
        answer:
          "Usually not. A standard JWT (JWS) is only signed, so anyone can read its contents. Encrypted JWTs (JWE) exist but are much less common.",
      },
      {
        question: "What do iat, exp and sub mean?",
        answer: "iat is the issue time, exp is the expiration time and sub is the subject, usually the user ID.",
      },
    ],
  },
  "converter-timestamp": {
    title: "Unix Timestamp Converter – Epoch to Date Online",
    description:
      "Convert Unix timestamps to dates and dates to timestamps online. Supports seconds and milliseconds, shows UTC and your time zone, plus the current epoch time.",
    faq: [
      {
        question: "What is a Unix timestamp?",
        answer: "It is the number of seconds since January 1, 1970 at 00:00:00 UTC, also called epoch time.",
      },
      {
        question: "How do I know if a timestamp is in seconds or milliseconds?",
        answer:
          "By the number of digits. Current dates have 10 digits in seconds and 13 in milliseconds. The tool detects the unit automatically.",
      },
      {
        question: "Does a Unix timestamp have a time zone?",
        answer: "No. It is always counted in UTC. Time zones only matter when the number is displayed as a date and time.",
      },
      {
        question: "How do I convert a timestamp to a date in Excel?",
        answer: "Use =A1/86400+DATE(1970,1,1) and format the cell as date and time. The result is in UTC.",
      },
      {
        question: "What happens in 2038?",
        answer:
          "Systems that store timestamps as 32-bit integers overflow on January 19, 2038. 64-bit systems, which are the norm today, are not affected.",
      },
    ],
  },
  "testar-regex": {
    title: "Regex Tester – Test Regular Expressions Online",
    description:
      "Test regular expressions online with highlighted matches, capture groups and live replacement. Uses the JavaScript regex engine, right in your browser.",
    faq: [
      {
        question: "Which regex flavor does this tester use?",
        answer:
          "JavaScript (ECMAScript). It is compatible with most regex from Python, Java, PHP and C#, with small differences in advanced features.",
      },
      {
        question: "What does the g flag do?",
        answer:
          "The g (global) flag finds every match. Without it, only the first match is used for searching and replacing.",
      },
      {
        question: "How do I use groups in the replacement?",
        answer:
          "Wrap parts of the regex in parentheses and use $1, $2 and so on in the replacement field. $& inserts the whole match.",
      },
      {
        question: "Do I need to escape backslashes?",
        answer:
          "Not in this field. Type the regex as you would between slashes in JavaScript, for example \\d+. You only double backslashes when the regex lives inside a string in your code.",
      },
      {
        question: "What regex validates an email address?",
        answer:
          "A simple, practical one is ^[\\w.+-]+@[\\w-]+\\.[\\w.]+$. Fully validating email with regex is impractical, so confirm addresses with a verification email.",
      },
    ],
  },
  "gerador-de-slug": {
    title: "URL Slug Generator – Convert Text to SEO-Friendly URLs",
    description:
      "Turn titles into URL slugs with no accents, no spaces and hyphen separators. Generate many slugs at once for blog posts, products and pages.",
    faq: [
      {
        question: "What is a URL slug?",
        answer:
          "It is the last part of an address that identifies the page, such as bake-bread in site.com/blog/bake-bread. It uses lowercase letters, digits and hyphens.",
      },
      {
        question: "Should I use hyphens or underscores in slugs?",
        answer: "Hyphens. Google treats a hyphen as a word separator, while an underscore can join words together.",
      },
      {
        question: "Can I use accented characters in URLs?",
        answer:
          "It works, but it is not recommended. Accents turn into codes such as %C3%A9 when the link is copied, making the URL long and hard to read.",
      },
      {
        question: "How long should a slug be?",
        answer: "Three to five words usually work well. Keep the main keyword and drop words that add no meaning.",
      },
    ],
  },
};
