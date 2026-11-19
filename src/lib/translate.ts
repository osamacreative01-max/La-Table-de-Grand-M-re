export const machineLanguages = [
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "es", label: "Español", dir: "ltr" },
  { code: "it", label: "Italiano", dir: "ltr" },
  { code: "de", label: "Deutsch", dir: "ltr" },
  { code: "pt", label: "Português", dir: "ltr" },
  { code: "zh-CN", label: "中文", dir: "ltr" },
  { code: "hi", label: "हिन्दी", dir: "ltr" },
  { code: "ur", label: "اردو", dir: "rtl" },
] as const;

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
          },
          elementId: string,
        ) => unknown;
      };
    };
  }
}

/**
 * The Google Translate widget powers the extra languages (Arabic, Italian,
 * Spanish, and others). French and English are real, separately authored pages;
 * the widget is only loaded when the visitor opens the language menu, so it
 * never costs anything on first paint.
 */
export function ensureGoogleTranslate(pageLang: string) {
  if (typeof document === "undefined") return;
  if (document.getElementById("google_translate_element")) return;

  const host = document.createElement("div");
  host.id = "google_translate_element";
  document.body.appendChild(host);

  window.googleTranslateElementInit = () => {
    if (!window.google) return;
    new window.google.translate.TranslateElement(
      {
        pageLanguage: pageLang,
        includedLanguages: machineLanguages.map((item) => item.code).join(","),
        autoDisplay: false,
      },
      "google_translate_element",
    );
  };

  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

function selectLanguage(code: string, pageLang: string) {
  let attempts = 0;

  // The widget builds its <select> asynchronously and fills the options in a
  // second pass, so wait for the options before choosing. Keep nudging until
  // the page reports that it has actually been translated.
  const timer = window.setInterval(() => {
    attempts += 1;

    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    const html = document.documentElement;
    const isTranslated =
      html.classList.contains("translated-ltr") ||
      html.classList.contains("translated-rtl");

    if (combo && combo.options.length > 1) {
      if (isTranslated && combo.value === code) {
        window.clearInterval(timer);
        return;
      }

      if (combo.value !== code) {
        combo.value = code;
        combo.dispatchEvent(new Event("change", { bubbles: true }));

        const target = machineLanguages.find((item) => item.code === code);
        html.lang = code === pageLang ? pageLang : code;
        html.dir = target?.dir ?? "ltr";
      }
    }

    if (attempts > 40) window.clearInterval(timer);
  }, 300);
}

export function applyMachineTranslation(code: string, pageLang: string) {
  ensureGoogleTranslate(pageLang);
  selectLanguage(code, pageLang);
}

export function resetTranslation(pageLang: string) {
  selectLanguage(pageLang, pageLang);
}
