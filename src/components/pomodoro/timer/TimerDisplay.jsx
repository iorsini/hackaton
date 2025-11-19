export default function TimerDisplay({
  timer,
  isBreak,
  selectedMood,
  focusTime,
  breakTime,
  minutes,
  secs,
  currentTask,
}) {
  return (
    <div
      style={{
        position: "relative",
        width: 220,
        height: 150,
        margin: "1rem auto 1.5rem",
      }}
    >
      <svg width="220" height="150" viewBox="0 0 220 150">
        <path
          d="M 10 120 A 100 100 0 0 1 210 120"
          fill="none"
          stroke="#f0f0f0"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 10 120 A 100 100 0 0 1 210 120"
          fill="none"
          stroke={
            selectedMood
              ? selectedMood.gradient.match(/#[a-f0-9]{6}/i)[0]
              : "#667eea"
          }
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={314}
          strokeDashoffset={
            314 - (314 * timer.seconds) / ((isBreak ? breakTime : focusTime) * 60)
          }
          style={{
            transition: "stroke-dashoffset 1s linear, stroke 0.3s ease",
          }}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            fontWeight: 700,
            color: "#1a1a1a",
            lineHeight: 1,
            marginBottom: "0.4rem",
          }}
        >
          {String(minutes).padStart(2, "0")}:
          {String(secs).padStart(2, "0")}
        </div>

        <div
          style={{
            fontSize: "0.8rem",
            color: "#999",
            fontWeight: 600,
            maxWidth: "160px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {currentTask}
        </div>
      </div>
    </div>
  );
}
