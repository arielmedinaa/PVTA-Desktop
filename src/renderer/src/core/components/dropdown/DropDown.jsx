import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { RiMore2Line } from "react-icons/ri";

const DropdownMenu = ({
  options,
  triggerIcon: TriggerIcon = RiMore2Line,
  triggerClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (onClick) => {
    if (onClick) {
      onClick();
    }
    setIsOpen(false);
  };

  const visibleOptions = options.filter((option) => option.visible !== false);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${triggerClassName}`}
      >
        <TriggerIcon className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && visibleOptions.length > 0 && (
          <motion.div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
          >
            <div className="py-1" role="menu">
              {visibleOptions.map((option, index) => {
                const Icon = option.icon;
                const isDivider = option.divider;
                const isDisabled = option.disabled;

                if (isDivider) {
                  return (
                    <div
                      key={index}
                      className="border-t border-gray-100 my-1"
                    />
                  );
                }

                return (
                  <motion.button
                    key={index}
                    onClick={() =>
                      !isDisabled && handleOptionClick(option.onClick)
                    }
                    disabled={isDisabled}
                    className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${
                      isDisabled
                        ? "text-gray-400 cursor-not-allowed"
                        : `${option.textColor || "text-gray-700"} hover:bg-gray-100`
                    }`}
                    role="menuitem"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.03,
                      duration: 0.15,
                    }}
                    whileHover={{ x: 4 }}
                  >
                    {Icon && (
                      <Icon
                        className={`mr-3 h-5 w-5 ${option.iconColor || "text-gray-400"}`}
                      />
                    )}
                    <span className={option.textClassName || ""}>
                      {option.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
