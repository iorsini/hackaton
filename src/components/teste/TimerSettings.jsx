'use client'

import { useState } from "react";

import { Play, Pause, RotateCcw, Plus, X, Menu, Calendar, TrendingUp, Users, Trophy, LogOut, Settings, CheckCircle2, ChevronRight } from 'lucide-react';



const TimerSettings = ({ isOpen, onClose, focusTime, breakTime, onSave }) => {
  const [localFocus, setLocalFocus] = useState(focusTime);
  const [localBreak, setLocalBreak] = useState(breakTime);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localFocus, localBreak);
    onClose();
  };

  return (
    <div className="mobile-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <h3>Configurações do Timer</h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="settings-content">
          <div className="setting-item">
            <label>Tempo de Foco (minutos)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={localFocus}
              onChange={(e) => setLocalFocus(Number(e.target.value))}
              className="setting-input"
            />
          </div>
          <div className="setting-item">
            <label>Tempo de Pausa (minutos)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={localBreak}
              onChange={(e) => setLocalBreak(Number(e.target.value))}
              className="setting-input"
            />
          </div>
        </div>
        <div className="settings-footer">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default TimerSettings