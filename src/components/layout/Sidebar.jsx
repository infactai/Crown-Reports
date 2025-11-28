import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Layers,
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/salespersons", icon: Users, label: "SalesPersons" },
    // { to: "/notes", icon: FileText, label: "Notes" },
    // { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 h-screen sticky top-0 flex flex-col shadow-2xl">
      {/* Logo Section */}
      <div className="p-8 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display text-white">
              CapsuleCRM
            </h1>
            <p className="text-xs text-gray-400 font-medium">
              Reports Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">
          Menu
        </p>
        {navItems.map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            style={{ animationDelay: `${index * 50}ms` }}
            className="block animate-fadeInLeft"
          >
            {({ isActive }) => (
              <div
                className={`
                  flex items-center gap-4 px-4 py-3.5 rounded-xl
                  transition-all duration-300 ease-out group cursor-pointer
                  relative overflow-hidden
                  ${
                    isActive
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-500/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }
                `}
              >
                {/* Animated background on hover */}
                <div
                  className={`
                    absolute inset-0 bg-teal-600/20
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
                    ${isActive ? "scale-x-100" : ""}
                  `}
                />

                {/* Icon */}
                <item.icon
                  className={`
                    w-5 h-5 relative z-10
                    transition-all duration-300
                    ${
                      isActive
                        ? "scale-110"
                        : "group-hover:scale-110 group-hover:rotate-3"
                    }
                  `}
                />

                {/* Label */}
                <span className="font-semibold relative z-10 text-[15px]">
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse relative z-10" />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-6 border-t border-gray-800">
        <div className="bg-teal-600/20 rounded-xl p-4 border border-teal-500/30">
          <p className="text-sm font-semibold text-white mb-1">Need Help?</p>
          <p className="text-xs text-gray-400 mb-3">Check our documentation</p>
          <button className="w-full bg-teal-600 text-white text-sm font-semibold py-2 rounded-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105">
            View Docs
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
