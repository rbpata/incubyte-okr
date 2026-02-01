import { useState } from 'react';
import Modal from './components/Modal.tsx';
import OkrForm from './components/OkrForm.tsx';

const Home = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   return (
      <div className="min-h-screen bg-gray-100">
         <div className="flex justify-between items-center px-8 py-6">
            <h1 className="text-2xl font-semibold text-gray-800">My OKRs</h1>
            <button
               className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
               onClick={() => setIsModalOpen(true)}
            >
               + Add OKR
            </button>
         </div>

         <div className="px-8"></div>
         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <OkrForm />
         </Modal>
      </div>
   );
};

export default Home;
