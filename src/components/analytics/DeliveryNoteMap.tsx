import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { DeliveryNote, Client } from '@prisma/client';

interface DeliveryNoteMapProps {
  deliveryNotes: (DeliveryNote & { client: Client })[];
}

export function DeliveryNoteMap({ deliveryNotes }: DeliveryNoteMapProps) {
  const center = { lat: 40.4168, lng: -3.7038 }; // Madrid como centro por defecto

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer center={center} zoom={6} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {deliveryNotes.map((note) => {
          if (note.latitude && note.longitude) {
            return (
              <Marker key={note.id} position={[note.latitude, note.longitude]}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-medium">{note.client.commercialName}</h3>
                    <p className="text-sm text-gray-600">{note.client.address}</p>
                    <p className="text-sm text-gray-600">Estado: {note.status}</p>
                  </div>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
}
