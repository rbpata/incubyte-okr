import { useRef, type SubmitEvent } from 'react';

function App() {
  const objectiveRef = useRef<HTMLInputElement | null>(null);
  const keyResultRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (objectiveRef.current && keyResultRef.current) {
      console.log(objectiveRef.current);
      console.log(keyResultRef.current.value);
      handleReset();
    }
  }

  function handleReset() {
    if (objectiveRef.current && keyResultRef.current) {
      objectiveRef.current.value = '';
      keyResultRef.current.value = '';
    }
  }

  return (
    <div className={'h-screen flex align-middle'}>
      <form
        className={
          'border rounded-sm m-auto flex py-4 flex-col w-96 px-10 h-60 items-center justify-between'
        }
        onSubmit={handleSubmit}>
        <h1 className={'font-bold mb-2'}>OKR</h1>
        <div className={'flex items-center flex-col h-full gap-4 p-2'}>
          <input
            ref={objectiveRef}
            className={'border rounded-sm w-72 text-center p-1'}
            required
            placeholder={'Objectives'}
          />
          <input
            ref={keyResultRef}
            className={'border rounded-sm w-72 text-center p-1'}
            required
            placeholder={'Key Results'}
          />
        </div>
        <div className={'flex justify-between w-72 mb-2 '}>
          <button
            type="submit"
            className={
              'border hover:cursor-pointer bg-blue-700 text-white px-2 py-1 w-24 rounded-sm'
            }>
            Submit
          </button>
          <button
            type={'reset'}
            className={
              'border bg-red-500 text-white hover:cursor-pointer px-2 py-1 rounded-sm w-24'
            }
            onClick={handleReset}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
