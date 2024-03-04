import { Dialog, Transition } from '@headlessui/react'
import { FC, FormEvent, Fragment, useEffect, useState } from 'react'
import { TiTimes } from 'react-icons/ti';
import InputField from '../form/InputField';
import { useDispatch } from 'react-redux';
import { updateScore } from '../../store/reducer/scoreReducer';

interface ModalProps {
  isOpen: boolean,
  score: any,
  closeModal: any,
}

const UpdateModal: FC<ModalProps> = ({ isOpen, score, closeModal }) => {
  const [name, setName] = useState<string>('');
  const [b4, setB4] = useState<number>(0);
  const [b6, setB6] = useState<number>(0);
  const [totalRun, setTotalRun] = useState<number>(0);
  const [totalBall, setTotalBall] = useState<number>(0);
  const [role, setRole] = useState<string>('');

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter player name');
      return;
    }

    if (b4 < 0 || b6 < 0 || totalRun < 0 || totalBall < 0) {
      alert('Please enter valid numbers for runs and balls');
      return;
    }

    if (!['bat', 'ball'].includes(role)) {
      alert('Please select player role');
      return;
    }

    const obj = {
      id: score._id,
      data: {
        name,
        b4,
        b6,
        totalRun,
        totalBall,
        role
      }
    };

    dispatch(updateScore(obj));
    closeModal();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                  >
                    <div>
                      Update the Record
                    </div>
                    <div>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        <TiTimes />
                      </button>
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white rounded-lg">
                      <div className="mb-4">
                        <InputField label="Name" type='text' placeholder='Player name' name='name' value={score?.name} handleChange={setName} />
                       <input type="text" name="" id="" />
                      </div>
                      <div className="mb-4 grid grid-cols-2 gap-4">
                        
                      </div>
                      <div className="flex items-center justify-center">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Update Record
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default UpdateModal;
