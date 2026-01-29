import React from 'react';
import { motion } from 'framer-motion';
import KeyResultList from './components/KeyResultList.tsx';
import KeyResultListForm from './components/KeyResultListForm.tsx';
import KeyResultProvider from './Contexts/KeyResultProvider.tsx';

export default function OkrForm() {
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      console.log('Objective:', data.get('objective'));
   };

   return (
      <KeyResultProvider>
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 via-gray-200 to-slate-300 px-4 ">
            <motion.form
               onSubmit={handleSubmit}
               initial={{ opacity: 0, scale: 0.95, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ duration: 0.5, ease: 'easeOut' }}
               className="w-full max-w-2xl rounded-2xl bg-white/70 backdrop-blur border border-gray-200 shadow-2xl p-8 space-y-6"
            >
               <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-center text-gray-800"
               >
                  🎯 OKR Form
               </motion.h1>

               <div className="flex flex-col gap-1">
                  <label
                     htmlFor="objective-input"
                     className="text-sm font-medium text-gray-600"
                  >
                     Objective
                  </label>
                  <input
                     type="text"
                     id="objective-input"
                     name="objective"
                     placeholder="Increase product adoption by Q4"
                     required
                     className="rounded-lg border border-gray-300 px-4 py-2
                        focus:outline-none focus:ring-2 focus:ring-indigo-400
                        focus:border-transparent transition"
                  />
               </div>

               <div className="pt-2">
                  <KeyResultListForm />
                  <KeyResultList />
               </div>

               <div className="flex justify-center gap-4 pt-4">
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     type="submit"
                     className="px-6 py-2 rounded-lg text-white font-medium
                        bg-gradient-to-r from-blue-500 to-indigo-500
                        hover:shadow-lg transition-all"
                  >
                     Submit
                  </motion.button>

                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     type="reset"
                     className="px-6 py-2 rounded-lg font-medium
                        bg-gray-200 text-gray-700
                        hover:bg-gray-300 transition-all"
                  >
                     Clear
                  </motion.button>
               </div>
            </motion.form>
         </div>
      </KeyResultProvider>
   );
}
