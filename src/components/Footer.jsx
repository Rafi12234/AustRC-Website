import React, { useState } from "react";
import { Globe, Github, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <footer className="bg-[#020f08] text-white pt-10 pb-6 border-t border-green-900/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* LOGO with ImageKit Image */}
        <div>
          <Link 
            to="/" 
            className="flex items-center space-x-3 mb-3 hover:opacity-80 transition-opacity"
          >
            {imageError ? (
              // Fallback design if image fails to load
              <div className="w-10 h-10 bg-green-600/90 rounded-lg shadow-[0_0_20px_#00ff80] flex items-center justify-center">
                <span className="text-white font-bold text-xs">ARC</span>
              </div>
            ) : (
              // Your ImageKit logo - REPLACE WITH YOUR ACTUAL IMAGEKIT URL
              <img 
                src="https://ik.imagekit.io/mekt2pafz/logo2.png?updatedAt=1763912058171" 
                alt="AUST Robotics Club Logo"
                className="w-10 h-10 rounded-lg object-contain"
                onError={() => setImageError(true)}
                width={40}
                height={40}
                loading="lazy"
              />
            )}
            <h3 className="text-lg font-semibold">Aust Robotics Club</h3>
          </Link>
          <p className="text-gray-300 text-sm leading-relaxed">
            Making robotics accessible through innovation.
          </p>

           <div className="flex space-x-3 mt-4">
            {[
              { Icon: Globe, url: "https://www.austrc.com/home", name: "Website" },
              { Icon: Github, url: "https://github.com/webdevaustrc-2025", name: "GitHub" },
              { Icon: Facebook, url: "https://www.facebook.com/AustRoboticsClub", name: "Facebook" },
              { Icon: Linkedin, url: "https://www.linkedin.com/company/aust-robotics-club/", name: "LinkedIn" }
            ].map(({ Icon: IconComponent, url, name }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="w-9 h-9 border border-green-700/40 flex items-center justify-center rounded-md hover:bg-green-600/20 transition cursor-pointer"
              >
                <IconComponent size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-semibold text-base mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/aboutus" },
              { name: "Events", path: "/events" },
              { name: "Achievements", path: "/achievements" }
            ].map((link, index) => (
              <li key={index}>
                <Link 
                  to={link.path} 
                  className="hover:text-green-400 transition-colors cursor-pointer"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h4 className="font-semibold text-base mb-3">Resources</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              { name: "Projects", path: "/projects" },
              { name: "Research", path: "/research" },
              { name: "Mentorship", path: "/mentorship" },
              { name: "Contact", path: "/contact" }
            ].map((link, index) => (
              <li key={index}>
                <Link 
                  to={link.path} 
                  className="hover:text-green-400 transition-colors cursor-pointer"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold text-base mb-3">Contact Us</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a 
                href="https://maps.google.com/?q=AUST+Campus+Dhaka" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors cursor-pointer"
              >
                AUST Campus, Dhaka
              </a>
            </li>
            <li>
              <a 
                href="mailto:contact@ausrc.edu" 
                className="hover:text-green-400 transition-colors cursor-pointer"
              >
                contact@ausrc.edu
              </a>
            </li>
            <li>
              <a 
                href="tel:+8801234567890" 
                className="hover:text-green-400 transition-colors cursor-pointer"
              >
                +880 123 456 7890
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="max-w-7xl mx-auto px-6 mt-6 pt-4 border-t border-green-900/30 text-center">
        <p className="text-gray-400 text-xs">
          © {new Date().getFullYear()} Aust Robotics Club — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;