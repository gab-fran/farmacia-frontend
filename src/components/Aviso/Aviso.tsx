interface Props {
  mensagem: string;
  erro: boolean;
  fechar: () => void;
}
export default function Aviso({ mensagem, erro, fechar }: Props) {
  if (!mensagem) return null;
  return (
    <div
      className={"aviso " + (erro ? "erro" : "")}
      role={erro ? "alert" : "status"}
    >
      {mensagem}
      <button className="link" aria-label="Fechar mensagem" onClick={fechar}>
        ×
      </button>
    </div>
  );
}
