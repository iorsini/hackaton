export default function NotificationPopup({ message, isBreak, selectedMood }) {
  return (
    <div className="notification-popup">
      <div className="notification-icon" style={{
        background: selectedMood?.gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        {isBreak ? "☕" : "🎯"}
      </div>
      <div className="notification-text">{message}</div>
    </div>
  );
}