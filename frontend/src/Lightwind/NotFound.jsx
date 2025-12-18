// NotFound.jsx

import { Link } from "react-router-dom";

const NotFound = () => {
  
  return (
    <main
      role="main"
      className="min-h-[79.7vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-bg" 
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div className="flex items-center justify-center">
          <div
            className="bg-gradient-to-br from-card to-bg rounded-2xl p-6 sm:p-8 shadow-lg w-full max-w-md border border-border" 
          >
         
            <svg
              viewBox="0 0 300 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block"
            >
              <rect width="300" height="220" rx="16" fill="#31363F" /> {/* colors.card */}
              <g transform="translate(30,30)">
                <circle cx="60" cy="40" r="34" fill="#00B7B5" /> {/* colors.primary */}
                <rect x="110" y="20" width="100" height="12" rx="6" fill="#76ABAE" /> {/* colors.muted */}
                <rect x="110" y="44" width="70" height="12" rx="6" fill="#018790" /> {/* colors.primaryHover */}
                <g transform="translate(0,95)">
                  <rect x="0" y="0" width="240" height="12" rx="6" fill="#005461" /> {/* colors.border */}
                </g>
                <text
                  x="8"
                  y="170"
                  fill="#FF0000" 
                  fontSize="16"
                  fontFamily="sans-serif"
                  opacity="0.95"
                >
                  404 — Not Found
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Content */}
        <section
           className="bg-card rounded-2xl p-6 sm:p-8 shadow-inner w-full border border-border" 
        >
          <h1
              className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 text-white" 
          >
            Page not found
          </h1>

          <p
             className="text-sm sm:text-base mb-6 text-subtle" 
          >
            Looks like the community corner you were trying to reach doesn't exist (yet). It might be a broken link,
            moved content, or a mistyped address — let’s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-lg font-medium transition bg-primary text-darkTextOnPrimary hover:bg-primaryHover"
            >
              ← Go to Home
            </Link>

             <Link
              to="/explore"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-lg transition text-white border border-border hover:text-primary"
            >
              Explore Community
            </Link>
          </div>

           <hr className="my-4 border-border" /> 

          <div className="text-sm text-secondaryText">
            <p>
              Prefer to report an issue?{" "}
              <Link
                to="/contact"
                className="text-primary hover:text-primaryHover transition" 
              >
                Contact Support
              </Link>
            </p>

            <p className="mt-2">Or try searching for topics in the community search bar.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default NotFound;