import { useEffect } from "react";
import type { ReactNode } from "react";
export default function Modal({
  titulo,
  children,
  fechar,
  ocupado,
  mensagem,
}: {
  titulo: string;
  children: ReactNode;
  fechar: () => void;
  ocupado: boolean;
  mensagem?: string;
}) {
  useEffect(() => {
    const anterior = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      anterior?.focus();
    };
  }, []);
  return (
    <dialog
      ref={(n) => {
        if (n && !n.open) n.showModal();
      }}
      onCancel={(e) => {
        e.preventDefault();
        if (!ocupado) fechar();
      }}
      aria-label={titulo}
    >
      <header>
        <h2>{titulo}</h2>
        <button
          autoFocus
          className="link"
          disabled={ocupado}
          onClick={fechar}
          aria-label="Fechar"
        >
          ×
        </button>
      </header>
      {mensagem && (
        <p className="aviso erro" role="alert">
          {mensagem}
        </p>
      )}
      <fieldset disabled={ocupado}>{children}</fieldset>
    </dialog>
  );
}
