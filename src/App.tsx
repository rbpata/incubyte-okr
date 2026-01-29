import React from 'react';

export default function App() {
  type KeyResult = {
    description: string;
    progress: number;
  };

  const [keyResults, setKeyResults] = React.useState<KeyResult[]>([]);
  const [keyResult, setKeyResult] = React.useState<KeyResult>({
    description: '',
    progress: 0,
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log('Objective is: ' + data.get('objective'));
    console.log('Key Result is: ' + data.get('keyResult'));
  };

  return (
    <>
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
          <div className="flex flex-col item-center gap-2 border p-4  rounded-md bg-gray-200">
            <label id={'keyResultDescription'}>
              Add a Key Result Description
            </label>
            <input
              type="text"
              className={' rounded-md  border'}
              id={'keyResultDescription-input'}
              name="keyResultDescription"
              value={keyResult.description}
              onChange={(e) =>
                setKeyResult({ ...keyResult, description: e.target.value })
              }
              required={true}
            />
            <label id="keyResultProgress">Add a Key Result Progress</label>
            <input
              type="text"
              className={' rounded-md  border'}
              id={'keyResultProgress-input'}
              name="keyResultProgress"
              value={keyResult.progress}
              onChange={(e) =>
                setKeyResult({ ...keyResult, progress: Number(e.target.value) })
              }
              required={true}
            />
            <button
              type="button"
              className={'border rounded-md px-3 py-1 bg-green-500 text-white'}
              onClick={() => {
                setKeyResults([...keyResults, keyResult]);
              }}
            >
              Add Key Result
            </button>
          </div>

          <div
            className={
              'flex flex-col item-center gap-2 border p-4  rounded-md bg-gray-200 max-h-60 overflow-y-auto'
            }
          >
            <p className={'font-bold text-lg'}>Key Results:</p>
            {keyResults.length > 0 &&
              keyResults.map((kr, index) => {
                return (
                  <div key={index} className={'border-b pb-2 mb-2'}>
                    <p className={'font-bold'}>Key Result {index + 1}:</p>
                    <p>Description: {kr.description}</p>
                    <p>Progress: {kr.progress}%</p>
                  </div>
                );
              })}
          </div>

          <div className={'flex gap-4 justify-center'}>
            <button
              className={'border rounded-md px-3 py-1 bg-blue-500 text-white'}
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
    </>
  );
}
