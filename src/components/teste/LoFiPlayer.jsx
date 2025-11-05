import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Music, SkipForward, X } from "lucide-react";

export default function LofiPlayer({ selectedMood }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.05);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStation, setCurrentStation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRef = useRef(null);

  // Estações de lofi/chill que funcionam via stream
  const lofiStations = [
    {
      name: "Chillhop Radio",
      url: "https://streams.fluxfm.de/Chillhop/mp3-320/streams.fluxfm.de/",
    },
    {
      name: "Lofi Café",
      url: "https://stream.zeno.fm/f3wvbbqmdg8uv",
    },
    {
      name: "Beats to Relax",
      url: "https://stream.zeno.fm/66jbevt79k8uv",
    },
    {
      name: "Study Beats",
      url: "https://stream.zeno.fm/c4txeam2qatuv",
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => {
        console.log("Erro ao tocar:", err);
        handleNextStation();
      });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleNextStation = () => {
    const wasPlaying = isPlaying;
    setIsPlaying(false);
    setCurrentStation((prev) => (prev + 1) % lofiStations.length);
    
    setTimeout(() => {
      if (wasPlaying && audioRef.current) {
        audioRef.current.play().catch(err => console.log("Erro ao trocar:", err));
        setIsPlaying(true);
      }
    }, 100);
  };

  const PlayerContent = () => (
    <>
      <div className={`lofi-visualizer ${isPlaying ? "playing" : ""}`}>
        <div className="visualizer-bars">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`visualizer-bar ${isPlaying ? "playing" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="lofi-controls">
        <button className="play-btn" onClick={togglePlay}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: 2 }} />}
        </button>

        <button className="skip-btn" onClick={handleNextStation} title="Próxima estação">
          <SkipForward size={18} />
        </button>

        <div className="volume-control">
          <button className="volume-btn" onClick={toggleMute}>
            {isMuted || volume === 0 ? (
              <VolumeX size={20} />
            ) : (
              <Volume2 size={20} />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
    </>
  );

  return (
    <>
      <style jsx>{`
        /* Mobile: Botão flutuante */
        .floating-music-btn {
          display: none;
        }

        @media (max-width: 768px) {
          .floating-music-btn {
            display: flex;
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: ${
              selectedMood?.gradient ||
              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            };
            color: white;
            border: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
            z-index: 999;
            transition: all 0.3s ease;
          }

          .floating-music-btn:hover {
            transform: scale(1.1);
          }

          .floating-music-btn.playing {
            animation: pulse-float 2s ease-in-out infinite;
          }

          @keyframes pulse-float {
            0%, 100% {
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
            }
            50% {
              box-shadow: 0 8px 32px rgba(102, 126, 234, 0.5);
            }
          }

          .modal-overlay {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            z-index: 1000;
            align-items: flex-end;
            animation: fadeIn 0.3s ease;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .modal-content {
            width: 100%;
            background: white;
            border-radius: 24px 24px 0 0;
            padding: 1.5rem;
            animation: slideUp 0.3s ease;
            max-height: 80vh;
            overflow-y: auto;
          }

          @keyframes slideUp {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }

          .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
          }

          .modal-title {
            font-size: 1.125rem;
            font-weight: 700;
            color: #1a1a1a;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin: 0;
          }

          .close-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            background: #f5f5f5;
            color: #666;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
          }

          .close-btn:hover {
            background: #e8e8e8;
            color: #333;
          }

          .desktop-card {
            display: none;
          }
        }

        /* Desktop: Card normal */
        @media (min-width: 769px) {
          .modal-overlay,
          .floating-music-btn {
            display: none !important;
          }
        }

        .lofi-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .lofi-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .lofi-header h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .lofi-station {
          font-size: 0.875rem;
          color: #666;
          font-weight: 500;
        }

        .lofi-visualizer {
          width: 100%;
          height: 80px;
          border-radius: 16px;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .visualizer-bars {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          height: 60px;
        }

        .visualizer-bar {
          width: 4px;
          background: ${
            selectedMood?.gradient ||
            "linear-gradient(180deg, #667eea 0%, #764ba2 100%)"
          };
          border-radius: 2px;
          transition: height 0.3s ease;
        }

        .visualizer-bar.playing {
          animation: wave 1s ease-in-out infinite;
        }

        .visualizer-bar:nth-child(1) { animation-delay: 0s; height: 20px; }
        .visualizer-bar:nth-child(2) { animation-delay: 0.1s; height: 35px; }
        .visualizer-bar:nth-child(3) { animation-delay: 0.2s; height: 50px; }
        .visualizer-bar:nth-child(4) { animation-delay: 0.3s; height: 40px; }
        .visualizer-bar:nth-child(5) { animation-delay: 0.4s; height: 55px; }
        .visualizer-bar:nth-child(6) { animation-delay: 0.5s; height: 30px; }
        .visualizer-bar:nth-child(7) { animation-delay: 0.6s; height: 45px; }

        @keyframes wave {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.5);
          }
        }

        .lofi-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .play-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          background: ${
            selectedMood?.gradient ||
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          };
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
          flex-shrink: 0;
        }

        .play-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .skip-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: #f5f5f5;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .skip-btn:hover {
          background: #e8e8e8;
          color: #333;
        }

        .volume-control {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .volume-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: #f5f5f5;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .volume-btn:hover {
          background: #e8e8e8;
          color: #333;
        }

        .volume-slider {
          flex: 1;
          height: 6px;
          border-radius: 3px;
          background: #e5e7eb;
          outline: none;
          -webkit-appearance: none;
          cursor: pointer;
        }

        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${
            selectedMood?.gradient ||
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          };
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.2s;
        }

        .volume-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .volume-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${
            selectedMood?.gradient ||
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          };
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      {/* Botão flutuante (mobile) */}
      <button 
        className={`floating-music-btn ${isPlaying ? 'playing' : ''}`}
        onClick={() => setIsModalOpen(true)}
      >
        <Music size={24} />
      </button>

      {/* Modal (mobile) */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                <Music size={20} />
                Lofi Radio
              </h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <span className="lofi-station">{lofiStations[currentStation].name}</span>
            </div>

            <PlayerContent />
          </div>
        </div>
      )}

      {/* Card desktop */}
      <div className="lofi-card desktop-card">
        <div className="lofi-header">
          <h3>
            <Music size={20} />
            Lofi Radio
          </h3>
          <span className="lofi-station">{lofiStations[currentStation].name}</span>
        </div>

        <PlayerContent />
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={lofiStations[currentStation].url}
        preload="none"
        onError={() => {
          console.log("Erro ao carregar stream");
          setIsPlaying(false);
        }}
      />
    </>
  );
}