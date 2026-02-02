import { useEffect, useState } from 'react';
import Modal from './components/Modal.tsx';
import OkrForm from './components/OkrForm.tsx';
import OkrList from './components/OkrList.tsx';
import type { OkrType } from './Types/okr_types.ts';
import KeyResultProvider from './Contexts/KeyResultProvider.tsx';

const Home = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [okrs, setOkrs] = useState<OkrType[]>([]);
   const [editingOkr, setEditingOkr] = useState<OkrType | null>(null);
   const BASE_URL = 'http://localhost:3001';

   useEffect(() => {
      fetch(`${BASE_URL}/okrs`)
         .then((res) => res.json())
         .then((data) => setOkrs(data));
   }, [okrs]);

   const deleteOkr = async (id: string | number) => {
      try {
         const res = await fetch(`${BASE_URL}/okrs/${id}`, {
            method: 'DELETE',
         });

         if (!res.ok) throw new Error('Failed to delete OKR');

         setOkrs((prevOkrs) => prevOkrs.filter((okr) => okr.id !== id));
      } catch (error) {
         console.error(error);
         alert('Something went wrong while deleting OKR');
      }
   };

   const handleSaveOkr = (newOkr: OkrType) => {
      if (editingOkr) {
         setOkrs((prevOkrs) =>
            prevOkrs.map((okr) => (okr.id === newOkr.id ? newOkr : okr))
         );
         setEditingOkr(null);
      } else {
         setOkrs((prevOkrs) => [...prevOkrs, newOkr]);
      }
      setIsModalOpen(false);
      setEditingOkr(null);
   };

   return (
      <KeyResultProvider>
         <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="flex justify-between items-center px-6 md:px-10 py-5 bg-white border-b border-gray-200 shadow-sm">
               <h1 className="text-2xl font-semibold text-gray-800">My OKRs</h1>
               <button
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-medium"
                  onClick={() => {
                     setIsModalOpen(true);
                     setEditingOkr(null);
                  }}
               >
                  + Add OKR
               </button>
            </header>

            <main className="flex-1 overflow-hidden px-6 md:px-10 py-6">
               <div className="h-full">
                  <OkrList
                     okrs={okrs}
                     onEdit={(okr) => {
                        setEditingOkr(okr);
                        setIsModalOpen(true);
                     }}
                     onDelete={deleteOkr}
                  />
               </div>
            </main>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
               <OkrForm initialOkr={editingOkr} onSave={handleSaveOkr} />
            </Modal>
         </div>
      </KeyResultProvider>
   );
};

export default Home;
