import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Utilidades para colores y formas
function randomColor() {
  const palette = [
    ["#818cf8", "#f472b6"],
    ["#f9a8d4", "#38bdf8"],
    ["#a78bfa", "#22d3ee"],
    ["#f472b6", "#818cf8"],
    ["#22d3ee", "#a78bfa"],
    ["#38bdf8", "#a78bfa"],
    ["#818cf8", "#f9a8d4"],
    ["#f9a8d4", "#818cf8"],
    ["#f472b6", "#38bdf8"],
    ["#818cf8", "#38bdf8"],
    ["#a78bfa", "#f472b6"],
  ];
  return palette[Math.floor(Math.random() * palette.length)];
}

// Blob SVG Path generator (simple, animated)
function blobPath(seed: number, width: number, height: number, morph: number) {
  const points = Array.from({ length: 6 }).map((_, i, arr) => {
    const angle = (i / arr.length) * Math.PI * 2;
    const r =
      width / 2 -
      10 +
      (Math.sin(morph + seed * (i + 1)) * 18 +
        Math.cos(morph / 1.5 + seed * (i + 2)) * 12);
    const x = width / 2 + Math.cos(angle) * r;
    const y = height / 2 + Math.sin(angle) * r;
    return [x, y];
  });
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    d += ` Q${points[i][0]},${points[i][1]} ${
      points[(i + 1) % points.length][0]
    },${points[(i + 1) % points.length][1]}`;
  }
  d += " Z";
  return d;
}

// Movimiento tipo pez en el agua
function useFishMotion(_unused: number, areaW: number, areaH: number) {
  const [pos, setPos] = useState({
    x: Math.random() * areaW,
    y: Math.random() * areaH,
    angle: Math.random() * Math.PI * 2,
    speed: 0.4 + Math.random(),
  });
  useEffect(() => {
    let frame: number;
    function animate() {
      setPos((prev) => {
        let nx = prev.x + Math.cos(prev.angle) * prev.speed;
        let ny = prev.y + Math.sin(prev.angle) * prev.speed;
        let nangle = prev.angle + (Math.random() - 0.5) * 0.06;
        if (nx < 0 || nx > areaW) nangle = Math.PI - nangle;
        if (ny < 0 || ny > areaH) nangle = -nangle;
        nx = Math.max(0, Math.min(areaW, nx));
        ny = Math.max(0, Math.min(areaH, ny));
        return { ...prev, x: nx, y: ny, angle: nangle };
      });
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [areaW, areaH]);
  return pos;
}

function InteractiveFishBlob({
  areaW,
  areaH,
  seed,
  idx,
}: {
  areaW: number;
  areaH: number;
  seed: number;
  idx: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [exploding, setExploding] = useState(false);
  const [localSeed, setLocalSeed] = useState(seed);

  // Animación de la forma
  const [morph, setMorph] = useState(0);
  useEffect(() => {
    let frame: number;
    function animate() {
      setMorph((m) => m + 0.04 + idx * 0.003);
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [idx]);

  // Movimiento pez en el agua
  const pos = useFishMotion(localSeed, areaW, areaH);

  // Colores
  const [c1, c2] = randomColor();

  // Explosión visual
  const explosion =
    exploding && (
      <div
        style={{
          position: "absolute",
          left: -5,
          top: -5,
          width: 90,
          height: 90,
          pointerEvents: "none",
          zIndex: 2,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.0) 80%)",
          animation: "explodeAnim 0.5s cubic-bezier(.55,2,.6,.5) both",
        }}
      />
    );

  // Extra morph on hover
  const morphValue = morph + (hovered ? 2.5 : 0);

  return (
    <div
      style={{
        position: "absolute",
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        zIndex: 1,
        pointerEvents: "auto",
        transition: "opacity 0.2s",
        opacity: 0.23 + (idx % 7) * 0.07,
        filter: hovered ? "blur(0.5px)" : "blur(2px)",
        cursor: "pointer",
        width: 90,
        height: 90,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setExploding(true);
        setTimeout(() => {
          setExploding(false);
          setLocalSeed(Math.floor(Math.random() * 100000));
        }, 500);
      }}
    >
      {explosion}
      <svg width={90} height={90} viewBox="0 0 90 90" style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          <linearGradient id={`blob${seed}${idx}`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <path
          d={blobPath(localSeed, 90, 90, morphValue)}
          fill={`url(#blob${seed}${idx})`}
          style={{
            transition: "filter 0.2s, transform 0.2s",
            filter: hovered ? "drop-shadow(0 0 24px #fff8)" : "",
            transform: hovered ? "scale(1.07)" : "scale(1)",
          }}
        />
      </svg>
      <style>{`
        @keyframes explodeAnim {
          from { opacity: 0.8; transform: scale(1);}
          to { opacity: 0; transform: scale(2);}
        }
      `}</style>
    </div>
  );
}

function HomePage() {
  // Tamaño del área de movimiento
  const areaW = typeof window !== "undefined" ? window.innerWidth : 1200;
  const areaH = typeof window !== "undefined" ? window.innerHeight : 800;

  // Genera más de 12 peces/blobs extravagantes
  const fishBlobs = Array.from({ length: 16 }).map((_, idx) => (
    <InteractiveFishBlob
      key={idx}
      areaW={areaW - 100}
      areaH={areaH - 200}
      seed={8888 + idx * 123}
      idx={idx}
    />
  ));

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Fondo base */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100" />
        {fishBlobs}
      </div>

      <main className="relative z-10 flex flex-col items-center py-16 px-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 mb-6 drop-shadow-lg animate-fadeIn">
          AI Flutter No Code Platform
        </h1>
        <p className="text-xl sm:text-2xl text-gray-800 max-w-xl text-center mb-8 animate-fadeIn">
          Transforma tus ideas en increíbles apps Flutter sin necesidad de programar. 
          Utiliza nuestra plataforma potenciada con IA para crear, personalizar y lanzar tu proyecto en minutos.
        </p>
        <Link
          to="/projects"
          className="px-8 py-4 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-500 to-pink-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-blue-300 animate-fadeIn"
        >
          Empezar ahora
        </Link>
      </main>
      <footer className="absolute bottom-0 left-0 right-0 flex justify-center items-center pb-4">
        <span className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} AI Flutter No Code. Todos los derechos reservados.
        </span>
      </footer>
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}

export default HomePage;