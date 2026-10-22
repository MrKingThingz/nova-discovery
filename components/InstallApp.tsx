"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownToLine, Share, SquarePlus, X } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";

type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
};

export function InstallApp({ compact = false }: { compact?: boolean }) {
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(display-mode: standalone)");
    const sync = () =>
      setInstalled(
        media.matches ||
          !!(navigator as Navigator & { standalone?: boolean }).standalone,
      );
    sync();
    const available = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallPrompt);
    };
    const done = () => {
      setInstalled(true);
      setPrompt(null);
      dialog.current?.close();
    };
    const consumed = () => setPrompt(null);
    window.addEventListener("discovery-install-prompt-used", consumed);
    window.addEventListener("beforeinstallprompt", available);
    window.addEventListener("appinstalled", done);
    media.addEventListener("change", sync);
    return () => {
      window.removeEventListener("discovery-install-prompt-used", consumed);
      window.removeEventListener("beforeinstallprompt", available);
      window.removeEventListener("appinstalled", done);
      media.removeEventListener("change", sync);
    };
  }, []);
  const close = () => dialog.current?.close();
  const install = async () => {
    if (!prompt) return;
    setBusy(true);
    setFeedback("");
    window.dispatchEvent(new Event("discovery-install-prompt-used"));
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === "accepted") close();
      else setFeedback("You can add Discovery later from your browser menu.");
      setPrompt(null);
    } catch {
      setFeedback(
        "Use your browser menu to add Discovery to your Home Screen.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={
          compact
            ? "button button-small button-quiet"
            : "button button-secondary"
        }
        onClick={() => dialog.current?.showModal()}
        disabled={installed}
      >
        <ArrowDownToLine size={16} aria-hidden="true" />
        <span>{installed ? "On your device" : "Get the app"}</span>
      </button>
      <dialog
        ref={dialog}
        className="install-dialog"
        aria-labelledby={compact ? "install-title-nav" : "install-title-page"}
        onClose={() => trigger.current?.focus()}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
      >
        <div className="install-content">
          <button
            className="icon-button dialog-close"
            aria-label="Close installation instructions"
            onClick={close}
          >
            <X size={20} />
          </button>
          <BrandMark className="install-icon" />
          <p className="eyebrow">YOUR POCKET OBSERVATORY</p>
          <h2 id={compact ? "install-title-nav" : "install-title-page"}>
            A little more universe.
            <br />
            One tap away.
          </h2>
          <p>
            Keep NOVA Discovery on your Home Screen with its own icon and a
            focused reading window.
          </p>
          {prompt ? (
            <button
              className="button button-primary"
              onClick={install}
              disabled={busy}
            >
              {busy ? "Opening install…" : "Install Discovery"}
              <ArrowDownToLine size={17} />
            </button>
          ) : (
            <div className="install-steps">
              <div>
                <Share size={20} />
                <p>
                  <strong>iPhone & iPad</strong>Open in Safari, tap Share, then
                  Add to Home Screen. Enable “Open as Web App” if shown.
                </p>
              </div>
              <div>
                <SquarePlus size={20} />
                <p>
                  <strong>Android & desktop</strong>Open your browser menu and
                  choose Install app or Add to Home screen, when available.
                </p>
              </div>
            </div>
          )}
          {feedback && <p role="status">{feedback}</p>}
          <span className="fine-print">
            Free to read. No account needed. Internet connection required.
          </span>
        </div>
      </dialog>
    </>
  );
}
