import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

const DropDownError = ({ errorMessage }) => {
    return (
        <AnimatePresence>
            {errorMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    className='p-2 flex w-full bg-red-50 border border-red-200 shadow-md rounded-2xl mt-1 items-center gap-2'
                >
                    <MdOutlineReportGmailerrorred className="w-5 h-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default DropDownError;