const BREAK_MESSAGES = [
  "Beba um copo d'água 💧",
  "Alongue os ombros e pescoço",
  "Olhe pela janela por um minuto",
  "Respire fundo 3 vezes",
  "Levante e caminhe um pouco",
  "Olhe para longe por 20 segundos 👀",
];

const BreakMessage = ({ mood }) => {
  const [message] = useState(
    () => BREAK_MESSAGES[Math.floor(Math.random() * BREAK_MESSAGES.length)]
  );

  return (
    <div
      className={`break-message bg-gradient-to-r ${
        mood?.gradient || "from-green-400 to-blue-500"
      }`}
    >
      <div className="break-icon">✨</div>
      <p className="break-text">{message}</p>
    </div>
  );
};
export default BreakMessage;
