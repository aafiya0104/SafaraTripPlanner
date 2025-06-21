import React from "react";

function Hero() {
  const features = [
    {
      icon: "🛡️",
      title: "Safety First",
      desc: "Real-time safety ratings and trusted recommendations",
    },
    {
      icon: "🤖",
      title: "AI Powered",
      desc: "Personalized itineraries crafted by advanced AI",
    },
    {
      icon: "👥",
      title: "Community",
      desc: "Join thousands of confident travelers",
    },
  ];

  const avatarGradients = [
    "from-amber-400 to-yellow-400",
    "from-yellow-400 to-amber-500",
    "from-amber-500 to-yellow-500",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f59e0b\' fill-opacity=\'0.03\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div
        className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-yellow-200 to-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-gradient-to-r from-amber-300 to-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full border border-amber-200 mb-8">
              <span className="text-amber-700 font-medium text-sm">
                Safe Travel for Everyone
              </span>
            </div>

            <h1 className="font-bold text-xl md:text-7xl lg:text-8xl leading-tight bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 bg-clip-text text-transparent">
              Your Safe Journey
              <br />
              <span className="text-gray-800">Starts Here</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            AI-powered trip planning designed specifically for travelers. Get
            personalized itineraries with safety insights, trusted
            accommodations, and confidence for every adventure.
          </p>

=          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a href="/create-trip">
              <button className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-700 hover:via-yellow-700 hover:to-amber-800 text-white rounded-full px-10 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 border-0 group">
                <span className="flex items-center gap-3">
                  ✨ Start Planning Free
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
            </a>
            <a href="https://github.com/aafiya0104/SafaraTripPlanner" target="_blank">
              <button className="flex items-center gap-3 text-amber-700 hover:text-amber-800 font-medium px-6 py-4 rounded-full hover:bg-amber-50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300">
                  <svg
                    className="w-5 h-5 text-amber-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-lg">Watch Demo</span>
              </button>
            </a>
          </div>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((item, index) => (
              <div
                key={index}
                className="text-center space-y-3 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-amber-100 hover:bg-white/70 transition-all duration-300 hover:scale-105"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg text-2xl">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 flex justify-center items-center gap-6 text-sm text-gray-500">
            <span>Trusted by 50K+ travelers</span>
            <div className="flex -space-x-2">
              {avatarGradients.map((gradient, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 bg-gradient-to-r ${gradient} rounded-full border-2 border-white`}
                ></div>
              ))}
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                +
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}

export default Hero;
