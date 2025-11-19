import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import MoodIndicator from "./MoodIndicator";
import DailyProgress from "./DailyProgress";

export default function Timer({
  timer,
  isBreak,
  setIsBreak,
  selectedMood,
  tasks,
  currentTaskIndex,
  focusTime,
  breakTime,
  minutes,
  secs,
  handleStart,
  setShowMoodSelector,
  completedTasks,
  progress
}) {
  return (
    <div className="right-panel">

      <div className="timer-card">
        {/* BADGE DE STATUS */}
        <div className={`status-badge ${isBreak ? "break" : ""}`}>
          <div
            style={{
              width: 8,
              height: 8,
              background: "currentColor",
              borderRadius: "50%",
            }}
          />
          {isBreak ? "Intervalo" : "Tempo de Foco"}
        </div>

        {/* DISPLAY DO TIMER */}
        <TimerDisplay
          timer={timer}
          isBreak={isBreak}
          selectedMood={selectedMood}
          focusTime={focusTime}
          breakTime={breakTime}
          minutes={minutes}
          secs={secs}
          currentTask={
            tasks[currentTaskIndex] && !tasks[currentTaskIndex].completed
              ? tasks[currentTaskIndex].text
              : "Nenhuma tarefa"
          }
        />

        {/* CONTROLES */}
        <TimerControls
          timer={timer}
          isBreak={isBreak}
          setIsBreak={setIsBreak}
          focusTime={focusTime}
          breakTime={breakTime}
          handleStart={handleStart}
          selectedMood={selectedMood}
        />

        {/* HUMOR */}
        <MoodIndicator
          selectedMood={selectedMood}
          setShowMoodSelector={setShowMoodSelector}
        />
      </div>

      {/* CARTÃO DE PROGRESSO */}
      <DailyProgress
        progress={progress}
        completedTasks={completedTasks}
        totalTasks={tasks.length}
      />

    </div>
  );
}
    