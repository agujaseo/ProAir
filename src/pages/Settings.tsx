import { useState } from 'react';
import { Settings as SettingsIcon, Users, Sprout, Tag, BarChart } from 'lucide-react';
import { Modal } from '../components/Modal';
import { UserForm } from '../components/forms/UserForm';
import { AromaForm } from '../components/forms/AromaForm';
import { ServiceForm } from '../components/forms/ServiceForm';
import { Analytics } from '../components/Analytics';
import type { User, Service, Aroma } from '../types';

const settingsSections = [
  {
    id: 'users',
    name: 'Usuarios',
    description: 'Gestionar usuarios y permisos',
    icon: Users,
  },
  {
    id: 'aromas',
    name: 'Aromas',
    description: 'Configurar catálogo de aromas',
    icon: Sprout,
  },
  {
    id: 'services',
    name: 'Servicios',
    description: 'Gestionar servicios y precios',
    icon: Tag,
  },
  {
    id: 'analytics',
    name: 'Análisis',
    description: 'Ver estadísticas y reportes',
    icon: BarChart,
  },
];

export default function Settings() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [aromas, setAromas] = useState<Aroma[]>([]);

  const handleAddUser = (user: Omit<User, 'id'>) => {
    setUsers([...users, { ...user, id: Date.now().toString() }]);
  };

  const handleAddService = (service: Omit<Service, 'id'>) => {
    setServices([...services, { ...service, id: Date.now().toString() }]);
  };

  const handleAddAroma = (aroma: Omit<Aroma, 'id'>) => {
    setAromas([...aromas, { ...aroma, id: Date.now().toString() }]);
  };

  const renderModalContent = () => {
    switch (selectedSection) {
      case 'users':
        return (
          <div>
            <UserForm onSubmit={handleAddUser} />
            <div className="mt-6">
              <h4 className="text-lg font-medium">Usuarios Existentes</h4>
              <div className="mt-4 space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email} - {user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'aromas':
        return (
          <div>
            <AromaForm onSubmit={handleAddAroma} />
            <div className="mt-6">
              <h4 className="text-lg font-medium">Aromas Disponibles</h4>
              <div className="mt-4 space-y-4">
                {aromas.map((aroma) => (
                  <div key={aroma.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{aroma.name}</p>
                      <p className="text-sm text-gray-500">{aroma.description}</p>
                    </div>
                    <span className="text-sm font-medium">Stock: {aroma.stock}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'services':
        return (
          <div>
            <ServiceForm onSubmit={handleAddService} />
            <div className="mt-6">
              <h4 className="text-lg font-medium">Servicios Disponibles</h4>
              <div className="mt-4 space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.description}</p>
                    </div>
                    <span className="font-medium">{service.price}€</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return <Analytics users={users} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Configuración
          </h2>
        </div>
      </div>

      <div className="mt-8">
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center">
              <SettingsIcon className="h-5 w-5 text-gray-400" />
              <h3 className="ml-2 text-lg font-medium leading-6 text-gray-900">
                Configuración del Sistema
              </h3>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  <div className="flex-shrink-0">
                    <section.icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900">{section.name}</p>
                    <p className="text-sm text-gray-500">{section.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={selectedSection !== null}
        onClose={() => setSelectedSection(null)}
        title={settingsSections.find(s => s.id === selectedSection)?.name || ''}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}
