import { useEffect, useState } from 'react';
import Modal from './components/Modal.tsx';
import OkrForm from './components/OkrForm.tsx';
import OkrList from './components/OkrList.tsx';
import type { OkrType } from './Types/okr_types.ts';

const Home = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [okrs, setOkrs] = useState<OkrType[]>([]);
   const BASE_URL = 'http://localhost:3001';

   useEffect(() => {
      fetch(`${BASE_URL}/okrs`)
         .then((res) => res.json())
         .then((data) => setOkrs(data));
   }, []);

   return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
         {/* Header */}
         <header className="flex justify-between items-center px-6 md:px-10 py-5 bg-white border-b border-gray-200 shadow-sm">
            <h1 className="text-2xl font-semibold text-gray-800">My OKRs</h1>
            <button
               className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-medium"
               onClick={() => setIsModalOpen(true)}
            >
               + Add OKR
            </button>
         </header>

         {/* Main content area */}
         <main className="flex-1 overflow-hidden px-6 md:px-10 py-6">
            <div className="h-full">
               <OkrList okrs={okrs} />
            </div>
         </main>

         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <OkrForm />
         </Modal>
      </div>
   );
};

export default Home;
