import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyResultContext } from '../Contexts/KeyResultContext';

export default function KeyResultList() {
   const { keyResultList } = useContext(KeyResultContext);

   if (!keyResultList || keyResultList.length === 0) {
      return (
         <p className="mt-6 text-center text-gray-500 italic">
            No key results added yet
         </p>
      );
   }

   return (
      <div className="mt-6 max-w-md mx-auto space-y-3">
         <AnimatePresence>
            {keyResultList.map((kr, idx) => (
               <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                     scale: 1.02,
                     boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                  }}
                  className="rounded-xl bg-white border border-gray-200 p-4 transition-all"
               >
                  <div className="flex justify-between items-start">
                     <h3 className="font-semibold text-gray-800">
                        {kr.description}
                     </h3>
                     <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        {`${kr.progress}%`}
                     </span>
                  </div>

                  <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                     <div
                        className="h-full bg-linear-to-r from-green-400 to-emerald-500 transition-all"
                        style={{
                           width: `${parseInt(kr.progress) || 0}%`,
                        }}
                     />
                  </div>
               </motion.div>
            ))}
         </AnimatePresence>
      </div>
   );
}
