import "./home.css";

const Home = () => {
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
    </div>
  );
};

export default Home;