import { useState } from 'react';
import { FileText } from 'lucide-react';
import { Modal } from '../../components/Modal';
import { DeliveryNoteForm } from './components/DeliveryNoteForm';
import { DeliveryNoteList } from './components/DeliveryNoteList';
import { useDeliveryNotes } from './hooks/useDeliveryNotes';
import { useServices } from './hooks/useServices';
import { useAromas } from './hooks/useAromas';
import { useUsers } from './hooks/useUsers';
import type { DeliveryNoteFormData } from './types';

export default function DeliveryNotes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: deliveryNotes = [], isLoading: isLoadingNotes } = useDeliveryNotes();
  const { data: services = [], isLoading: isLoadingServices } = useServices();
  const { data: aromas = [], isLoading: isLoadingAromas } = useAromas();
  const { data: users = [], isLoading: isLoadingUsers } = useUsers();

  const commercials = users.filter(user => 
    user.role === 'commercial' || user.role === 'admin'
  );

  const isLoading = isLoadingNotes || isLoadingServices || isLoadingAromas || isLoadingUsers;

  const handleAddDeliveryNote = async (data: DeliveryNoteFormData) => {
    try {
      // TODO: Implement delivery note creation
      console.log('New delivery note:', data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating delivery note:', error);
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Albaranes
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <FileText className="-ml-0.5 mr-1.5 h-5 w-5" />
            Nuevo Albarán
          </button>
        </div>
      </div>
      
      <DeliveryNoteList 
        deliveryNotes={deliveryNotes} 
        isLoading={isLoading} 
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nuevo Albarán"
      >
        <DeliveryNoteForm
          onSubmit={handleAddDeliveryNote}
          services={services}
          aromas={aromas}
          commercials={commercials}
        />
      </Modal>
    </div>
  );
}
