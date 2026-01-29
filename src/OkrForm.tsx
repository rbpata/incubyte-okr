import React from 'react';
import KeyResultList from './components/KeyResultList.tsx';
import KeyResultListForm from './components/KeyResultListForm.tsx';
import KeyResultProvider from './Provider/KeyResultProvider.tsx';

export default function OkrForm() {
   const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      console.log('Objective is: ' + data.get('objective'));
      console.log('Key Result is: ' + data.get('keyResult'));
   };

   return (
      <KeyResultProvider>
         <div
            className={
               'flex w-full min-h-screen justify-center items-center border  font-mono bg-gray-300 '
            }
         >
            <form
               className={
                  'flex flex-col w-100 h-auto gap-5 p-10 border rounded-md shadow-xl bg-gray-100'
               }
               onSubmit={handleSubmit}
            >
               <p className={'font-bold text-3xl items-center'}>OKR Form</p>
               <div className="flex flex-col item-center justify-center  gap-2">
                  <label id="objective-label">Add an Objective</label>
                  <input
                     type="text"
                     className={' rounded-md  border'}
                     id={'objective-input'}
                     name="objective"
                     required={true}
                  />
               </div>
               <KeyResultListForm />
               <KeyResultList />

               <div className={'flex gap-4 justify-center'}>
                  <button
                     className={
                        'border rounded-md px-3 py-1 bg-blue-500 text-white'
                     }
                  >
                     Submit
                  </button>
                  <button
                     type="reset"
                     className={'border rounded-md px-3 py-1 bg-gray-300'}
                  >
                     Clear
                  </button>
               </div>
            </form>
         </div>
      </KeyResultProvider>
   );
}
