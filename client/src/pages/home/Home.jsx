import "./home.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#000000]">
      <svg xmlns="http://www.w3.org/2000/svg" height="220" width="220">
        <g style={{ order: -1 }}>
          <polygon
            transform="rotate(45 100 100)"
            strokeWidth="1"
            stroke="#d3a410"
            fill="none"
            points="70,70 148,50 130,130 50,150"
            id="bounce"
          />
          <polygon
            transform="rotate(45 100 100)"
            strokeWidth="1"
            stroke="#d3a410"
            fill="none"
            points="70,70 148,50 130,130 50,150"
            id="bounce2"
          />
          <polygon
            transform="rotate(45 100 100)"
            strokeWidth="2"
            fill="#414750"
            points="70,70 150,50 130,130 50,150"
          />
          <polygon
            strokeWidth="2"
            fill="url(#gradiente)"
            points="100,70 150,100 100,130 50,100"
          />

          <defs>
            <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradiente">
              <stop style={{ stopColor: "#1e2026", stopOpacity: 1 }} offset="20%" />
              <stop style={{ stopColor: "#414750", stopOpacity: 1 }} offset="60%" />
            </linearGradient>
          </defs>

          <polygon
            transform="translate(20, 31)"
            strokeWidth="2"
            fill="#b7870f"
            points="80,50 80,75 80,99 40,75"
          />

          <polygon
            transform="translate(20, 31)"
            strokeWidth="2"
            fill="url(#gradiente2)"
            points="40,-40 80,-40 80,99 40,75"
          />

          <defs>
            <linearGradient y2="100%" x2="0%" y1="-17%" x1="10%" id="gradiente2">
              <stop style={{ stopColor: "#d3a51000", stopOpacity: 1 }} offset="20%" />
              <stop
                style={{ stopColor: "#d3a51054", stopOpacity: 1 }}
                offset="100%"
                id="animatedStop"
              />
            </linearGradient>
          </defs>

          <polygon
            transform="rotate(180 100 100) translate(20, 20)"
            strokeWidth="2"
            fill="#d3a410"
            points="80,50 80,75 80,99 40,75"
          />

          <polygon
            transform="rotate(0 100 100) translate(60, 20)"
            strokeWidth="2"
            fill="url(#gradiente3)"
            points="40,-40 80,-40 80,85 40,110.2"
          />

          <defs>
            <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradiente3">
              <stop style={{ stopColor: "#d3a51000", stopOpacity: 1 }} offset="20%" />
              <stop
                style={{ stopColor: "#d3a51054", stopOpacity: 1 }}
                offset="100%"
                id="animatedStop"
              />
            </linearGradient>
          </defs>

          <polygon
            transform="rotate(45 100 100) translate(80, 95)"
            strokeWidth="2"
            fill="#ffe4a1"
            points="5,0 5,5 0,5 0,0"
            id="particles"
          />
          <polygon
            transform="rotate(45 100 100) translate(80, 55)"
            strokeWidth="2"
            fill="#ccb069"
            points="6,0 6,6 0,6 0,0"
            id="particles"
          />
          <polygon
            transform="rotate(45 100 100) translate(70, 80)"
            strokeWidth="2"
            fill="#fff"
            points="2,0 2,2 0,2 0,0"
            id="particles"
          />
        </g>
      </svg>

      {/* Caption text */}
      <h1 className="text-white text-3xl font-semibold mt-6 tracking-wide">
        Welcome to Tomorrow.
      </h1>
      <p className="text-gray-300 text-lg mt-2">
        Your AI universe begins here.
      </p>
      <div className="mt-10 relative group">
        <div
          className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 opacity-60 blur-2xl transition-all duration-500 group-hover:opacity-90 group-hover:blur-[72px]"
          aria-hidden
        />
        <button
          id="magneticButton"
          onClick={(e) => {
            e.preventDefault();
            navigate('/chat');
          }}
          className="magnetic-btn relative inline-flex items-center justify-center gap-3 overflow-visible px-10 py-3"
        >
          <div className="particles-field" id="particleField"></div>
          <span className="ff">Get Started</span>
          <span className="relative z-10 text-lg">→</span>
        </button>
      </div>
      
      {/* Magnetic button effect script */}
      {useEffect(() => {
        const button = document.getElementById('magneticButton');
        const particleField = document.getElementById('particleField');
        
        // Create particles
        for (let i = 0; i < 30; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.setProperty('--x', `${Math.random() * 100 - 50}px`);
          particle.style.setProperty('--y', `${Math.random() * 100 - 50}px`);
          particle.style.animation = `particleFloat ${1 + Math.random() * 2}s infinite`;
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          particle.style.animationDelay = `${Math.random() * 2}s`;
          particleField.appendChild(particle);
        }

        // Magnetic effect
        const handleMouseMove = (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Calculate distance from center
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const distanceX = x - centerX;
          const distanceY = y - centerY;
          
          // Apply transform based on distance from center
          const strength = 15;
          const moveX = (distanceX / centerX) * strength;
          const moveY = (distanceY / centerY) * strength;
          
          button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };

        const handleMouseLeave = () => {
          button.style.transform = 'translate(0, 0)';
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          button.removeEventListener('mousemove', handleMouseMove);
          button.removeEventListener('mouseleave', handleMouseLeave);
        };
      }, [])}
    </div>
  );
};

export default Home;