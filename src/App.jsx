import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search,
  ChevronUp,
  ChevronDown,
  Menu,
  X,
  MapPin,
  BookOpen,
  Users,
  Award,
  Folders,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';
import { SiFacebook, SiX, SiInstagram } from '@icons-pack/react-simple-icons';

const headerImageUrl = "https://www.lam-iam.co.uk/index_htm_files/3819@2x.png";

/*
 * LAM Observers Homepage
 */

const AppContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items based on the official LAM site structure
  const navItems = [
    { name: 'Home', id: 'home', path: '/', active: true },
    { name: 'Training', id: 'training-root', path: '/training', hasDropdown: true,
      dropdownOptions: [
        { name: 'Advanced Driver Course', id: 'training', path: '/training' },
        { name: 'National Observer Course', id: 'training-observer', path: '/training-observer' }
      ]
    },
    { name: 'Drive Centres', id: 'centres', path: '/centres' },
    { name: 'Events', id: 'events', path: '/events' },
    { name: 'Resources', id: 'resources', path: '/resources' },
  ];

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // --- SUB-COMPONENTS ---

  const Navbar = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={() => navigateTo('/')}
          >
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center p-1 overflow-hidden transition-transform group-hover:scale-105">
              <div className="text-[#004a87] font-bold text-xs leading-none text-center">
                LAM<br/><span className="text-[8px] text-slate-600">OBSERVERS</span>
              </div>
            </div>
            <span className="text-lg font-light tracking-wide hidden sm:block">LAM Observers</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center h-full">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative h-full flex items-center"
                onMouseEnter={() => item.hasDropdown && setIsDropdownOpen(true)}
                onMouseLeave={() => item.hasDropdown && setIsDropdownOpen(false)}
                ref={item.hasDropdown ? dropdownRef : null}
              >
                <button
                  onClick={() => !item.hasDropdown && navigateTo(item.path)}
                  className={`flex items-center text-sm font-medium transition-colors hover:text-blue-400 h-full px-1 ${
                    (location.pathname === item.path || (item.hasDropdown && location.pathname.startsWith('/training'))) ? 'text-blue-400' : 'text-slate-300'
                  }`}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown size={14} className={`ml-1 opacity-70 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />}
                </button>

                {item.hasDropdown && isDropdownOpen && (
                  <div className="absolute top-16 left-0 w-64 bg-[#212121] shadow-xl border-t-2 border-blue-600 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-2">
                      {item.dropdownOptions.map((opt) => (
                        <button
                          key={opt.name}
                          onClick={() => navigateTo(opt.path)}
                          className="w-full text-left block px-6 py-4 text-sm text-slate-200 hover:bg-[#2a2a2a] hover:text-white transition-colors border-b border-slate-800 last:border-none"
                        >
                          {opt.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors ml-4" aria-label="Search">
              <Search size={18} />
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-[#2a2a2a] border-t border-slate-700 overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => !item.hasDropdown && navigateTo(item.path)}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                {item.name}
              </button>
              {item.hasDropdown && (
                <div className="pl-6 space-y-1 border-l border-slate-700 ml-3 my-1">
                  {item.dropdownOptions.map(opt => (
                    <button
                      key={opt.name}
                      onClick={() => navigateTo(opt.path)}
                      className="w-full text-left block px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      {opt.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-slate-950 text-slate-400 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 text-white mb-6">
              <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center p-1">
                <div className="text-[#004a87] font-bold text-xs leading-none text-center">
                LAM<br/><span className="text-[8px] text-slate-500">OBS</span>
                </div>
              </div>
              <span className="text-xl font-light tracking-wide">London Advanced Motorists</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed">
              Promoting road safety through advanced driving skills in London and the surrounding areas since 1956.<br/>Registered Charity No. 1043841.
            </p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest text-center md:text-left">Contact Us</h5>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center justify-center md:justify-start gap-3 hover:text-white transition-colors cursor-pointer">
                <Mail size={16} className="text-blue-500" /> info@lam.org.uk
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 hover:text-white transition-colors cursor-pointer">
                <Phone size={16} className="text-blue-500" /> 020 8XXX XXXX
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest text-center md:text-left">Follow Us</h5>
            <div className="flex space-x-5">
              <SiFacebook size={22} className="hover:text-white cursor-pointer transition-colors" />
              <SiX size={22} className="hover:text-white cursor-pointer transition-colors" />
              <SiInstagram size={22} className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs gap-4 text-slate-600">
          <p>&copy; 2026 London Advanced Motorists. A non-profit organization.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <a href="#" className="hover:text-white transition-colors">Volunteer Login</a>
          </div>
        </div>
      </div>
    </footer>
  );

  // --- PAGE: HOME ---
  const HomePage = () => (
    <>
      <section id="home" className="relative pt-16 bg-white">
        <div className="w-full aspect-[4/1] md:aspect-[12/3] overflow-hidden bg-[#2c3e50] flex items-center justify-center">
          <img 
            src={headerImageUrl} 
            alt="London Advanced Motorists Banner" 
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>
      </section>

      <main>
        <section className="py-12 md:py-20 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light text-[#004a87] mb-8">Welcome to London Advanced Motorists</h2>
          
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <p className="font-semibold text-blue-700 italic border-l-4 border-blue-600 pl-4">
              Better skills. More confidence. Safer roads.
            </p>
            
            <p>
              At London Advanced Motorists, we've spent decades coaching drivers to go beyond the basics. 
              As an <span className="font-semibold text-slate-900">IAM RoadSmart partner</span> and registered charity (1043841), we provide expert preparation for the Advanced Driving Test.
            </p>

            <div className="mt-12 bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">What we offer:</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Expert Experience", desc: "Prepare for your Advanced Test with local experts.", icon: <Award size={20} /> },
                  { title: "Further Advanced Training", desc: "Train towards National Observer or IAM Masters.", icon: <BookOpen size={20} /> },
                  { title: "Member Resources", desc: "Manage bookings and membership online easily.", icon: <Folders size={20} /> },
                  { title: "Driving Community", desc: "Join skilled drivers and attend social events.", icon: <Users size={20} /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-blue-600 p-2 rounded-lg text-white">
                        {item.icon}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="training-preview" className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-[#004a87] mb-8 text-left md:text-center">The Advanced Driving Course</h2>
            <div className="space-y-6 text-slate-700 text-lg text-left md:text-center">
              <p>The Advanced Driving Course will teach you to become a more confident, efficient, and safer driver.</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
                <button 
                  onClick={() => navigateTo('/training')}
                  className="flex-1 max-w-sm bg-[#004a87] text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10"
                >
                  <BookOpen size={20} /> Explore the Course
                </button>
                <button className="flex-1 max-w-sm bg-white border-2 border-slate-200 text-slate-700 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:border-blue-400 hover:text-blue-700 transition-all">
                  <MapPin size={20} /> Find a Drive Centre
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );

  // --- PAGE: TRAINING COURSE ---
  const TrainingPage = () => {
    const [activeStage, setActiveStage] = useState(0);
    const [isDriveTopicsOpen, setIsDriveTopicsOpen] = useState(false);

    const ipsgaStages = [
      { 
        letter: 'I', name: 'Information', 
        content: "Use all the information around you - in front, behind and to the side, to determine the hazards that exist, or may exist in the future. If you need to position your car differently on the road, consider whether a signal is appropriate to warn other road users."
      },
      { 
        letter: 'P', name: 'Position', 
        content: "After giving a clear signal (if required), position your car in the appropriate part of the carriageway. Check your mirrors before committing yourself to the new position."
      },
      { 
        letter: 'S', name: 'Speed', 
        content: "Now alter your road speed, based on the hazard. Usually this will be by using the brakes or easing off the accelerator, but in some cases may require further acceleration instead. Remember to continue your observation and use your mirrors as your speed & location changes."
      },
      { 
        letter: 'G', name: 'Gear', 
        content: "In most cases, only now will you consider changing gear, if required, to match the new road speed."
      },
      { 
        letter: 'A', name: 'Acceleration', 
        content: "Once past the hazard and it is safe to do so, continue at a suitable & appropriate speed, accelerating as required."
      }
    ];

    const driveTopics = [
      {
        title: "Drive 1: Introduction",
        items: ["Advanced driving demonstration", "Pre-drive checks", "The human factor (Chapter 1)", "IPSGA (Chapter 2)", "Core Driving Skills (Chapter 3)"]
      },
      {
        title: "Drive 2:",
        items: ["Bends (Chapter 4)", "Junctions & Roundabouts (Chapter 5)"]
      },
      {
        title: "Drive 3:",
        items: ["Overtaking (Chapter 6)", "Motorways & dual carriageways (Chapter 7)"]
      },
      {
        title: "Drive 4:",
        items: ["Manoeuvring (Chapter 8)"]
      },
      {
        title: "Drive 5:",
        items: ["Spoken thoughts (Chapter 9)"]
      },
      {
        title: "Drive 6-8:",
        items: ["Tailored drives", "Polish and sparkle", "Mock test"]
      }
    ];

    return (
      <>
        {/* Training Hero Section */}
        <section className="relative pt-16 bg-[#2c3e50]">
          <div className="w-full py-16 md:py-32 flex flex-col items-center justify-center text-center px-4 overflow-hidden relative">
            {/* Subtle background pattern/overlay like in image_2445b8.jpg */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-slate-900/40 pointer-events-none"></div>
            <h1 className="relative text-white text-4xl md:text-6xl font-light tracking-wide animate-in fade-in slide-in-from-bottom-4 duration-700">
              Training Course
            </h1>
          </div>
        </section>

        <main className="bg-white">
          {/* Course Intro */}
          <section className="py-12 md:py-20 max-w-5xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed">
                The IAM Roadsmart Advanced Driver course is the UK's leading advanced driving qualification.
              </h2>
              <p className="text-lg md:text-xl text-[#004a87] font-medium italic">
                Upgrade your skills to become a more confident, efficient, and safer driver!
              </p>
            </div>

            <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
              <p>
                LAM delivers the Advanced Driving Course on behalf of the IAM and follows the course material set out in the <a href="#" className="text-blue-600 font-semibold hover:underline">ADC Handbook</a> which contains all the information required for the Advanced Test. We supplement this information using further knowledge from <a href="#" className="text-blue-600 font-semibold hover:underline">Roadcraft: The Police Driver's Handbook</a>.
              </p>

              <div className="mt-12 bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">By the time you take the Advanced Driving Test, the group's aim is that you will be able to drive:</h3>
                <ul className="space-y-4">
                  {[
                    "To a very high level of safety, with a level of driving skill and technique based on the same principles taught to police drivers.",
                    "Ensuring a high level of passenger comfort & confidence.",
                    "Enabling the vehicle to be maneuvered with accuracy and safety, additionally reducing wear and tear on the vehicle."
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* IPSGA Section */}
          <section id="ipsga" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-3xl font-light text-[#004a87] mb-8">The System of Car Control - IPSGA</h2>
              <div className="space-y-6 text-slate-700 text-lg">
                <p className="font-medium text-slate-900">
                  Advanced driving isn't about driving faster; it's about control.
                </p>
                <p>
                  The system of car control we use is referred to as the <span className="font-bold">IPSGA</span> framework—the same system used by police and emergency services—to manage hazards and make safe progress.
                </p>
                <p>
                  IPSGA is the backbone of the skills for advanced driving; it is fully documented in the ADC Handbook and forms the basis of the guidance offered by our observers.
                </p>

                <div className="mt-12">
                  <p className="text-sm text-slate-500 mb-8 italic">Click the stages below to explore the system:</p>
                  
                  {/* IPSGA Button Row */}
                  <div className="relative">
                    <div className="grid grid-cols-5 gap-2 md:gap-4 mb-0">
                      {ipsgaStages.map((stage, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => setActiveStage(idx)}
                          className={`relative z-10 flex flex-col items-center justify-center py-6 md:py-8 rounded-t-xl transition-all duration-300 ${
                            activeStage === idx 
                              ? 'bg-blue-600 text-white shadow-[0_-4px_20px_-5px_rgba(37,99,235,0.4)]' 
                              : 'bg-[#1a2130] text-slate-400 hover:bg-[#232d3f] hover:text-slate-200'
                          }`}
                        >
                          <span className="text-3xl md:text-5xl font-bold mb-1">{stage.letter}</span>
                          <span className="text-[9px] md:text-[11px] uppercase tracking-widest font-bold">{stage.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Single Joined Info Box */}
                    <div className="relative group">
                      {/* Visual Arrow/Connector */}
                      <div 
                        className="absolute -top-2 w-4 h-4 bg-blue-600 rotate-45 transition-all duration-300 hidden md:block"
                        style={{ left: `calc(${(activeStage * 20) + 10}% - 8px)` }}
                      />
                      
                      <div className="bg-blue-600 text-white p-8 md:p-12 rounded-b-xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl">
                            {ipsgaStages[activeStage].letter}
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{ipsgaStages[activeStage].name}</h3>
                        </div>
                        <p className="text-lg md:text-xl leading-relaxed text-blue-50">
                          {ipsgaStages[activeStage].content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Observed Drives Section */}
          <section id="observed-drives" className="py-16 md:py-24 border-t border-slate-200">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-3xl font-light text-[#004a87] mb-8">Observed Drives</h2>
              <div className="space-y-6 text-slate-700 text-lg leading-relaxed mb-12">
                <p>
                  Our team of observers will help you to apply the skills in the ADC Handbook through 1-to-1 driving sessions, which typically last an hour and a half and will take you on a wide range of roads.
                </p>
                <p>
                  Each drive will cover a section of the ADC, where the observer will help explain the theory as well as how it is applied to real-driving conditions. We aim to get our associates test ready within 8 observed drives.
                </p>
              </div>

              {/* Drive Topics Collapsible */}
              <div className="border-t border-slate-300">
                <button 
                  onClick={() => setIsDriveTopicsOpen(!isDriveTopicsOpen)}
                  className="w-full py-6 flex justify-between items-center group"
                >
                  <h3 className="text-2xl font-light text-slate-900 group-hover:text-blue-700 transition-colors">Drive Topics</h3>
                  <ChevronUp 
                    size={24} 
                    className={`text-slate-400 transition-transform duration-300 ${isDriveTopicsOpen ? '' : 'rotate-180'}`} 
                  />
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isDriveTopicsOpen ? 'max-h-[1000px] opacity-100 pb-12' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-10 pl-4">
                    {driveTopics.map((topic, idx) => (
                      <div key={idx} className="space-y-4">
                        <h4 className="text-lg font-medium text-slate-900">{topic.title}</h4>
                        <ul className="space-y-3">
                          {topic.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-600">
                              <span className="mt-2.5 w-1.5 h-1.5 bg-slate-400 rounded-sm flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-slate-300"></div>
              </div>
            </div>
          </section>
          
          {/* The Test Section */}
          <section id="test" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-3xl font-light text-[#004a87] mb-8">The Test</h2>
              <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
                <p>
                  At the end of the course, when you are confident and have been recommended to take the advanced test. You will then be booked take the Advanced Test to be conducted by an external IAM Examiner.
                </p>
                <p>
                  The assessment will last approximately 90 minutes with 1 hour for driving across a wide variety of roads, while the examiner marks you on all the key skills covered within the ADC. At the conclusion of your drive, you will be awarded a "pass" or "fail"; those who exceed in every skill will be awarded a "F1rst" the highest grade.
                </p>
                <p>
                  With a pass you will become a full member of the IAM and of LAM.
                </p>
              </div>
            </div>
          </section>
              
          <div className="mt-24 mb-24 flex justify-center">
            <button className="bg-[#004a87] text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20">
              Start Your Course <ArrowRight size={20} />
            </button>
          </div>
        </main>
      </>
    );
}

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-blue-100 flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/training-observer" element={<TrainingPage />} />
          <Route path="/centres" element={<HomePage />} />
          <Route path="/events" element={<HomePage />} />
          <Route path="/resources" element={<HomePage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router basename="/LondonAdvancedMotoristsWeb">
      <AppContent />
    </Router>
  );
};

export default App;