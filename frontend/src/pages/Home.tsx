import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { rentalsAPI } from '../services/api';

import RentalCard from '../components/RentalCard';

export default function Home() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['rentals'],
    queryFn: rentalsAPI.getAll,
  });

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState('');
  const [surface, setSurface] = useState('');
  const [price, setPrice] = useState('');
  const [picture, setPicture] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!picture) {
      setFormError('Veuillez sélectionner une photo.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      await rentalsAPI.create({
        name,
        surface: Number(surface),
        price: Number(price),
        picture,
        description,
      });

      // Réinitialisation du formulaire
      setName('');
      setSurface('');
      setPrice('');
      setPicture(null);
      setDescription('');

      // Fermeture de la popup
      setShowForm(false);

      // Actualisation de la liste des locations
      await refetch();
    } catch (error) {
      setFormError(
        "Une erreur est survenue lors de l'ajout de la location.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseForm = () => {
    if (isSubmitting) return;

    setShowForm(false);
    setFormError('');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-600">
          Erreur lors du chargement des locations
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Locations disponibles
        </h1>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Ajouter une location
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.rentals.map((rental) => (
          <RentalCard key={rental.id} rental={rental} />
        ))}
      </div>

      {data?.rentals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            Aucune location disponible pour le moment
          </p>
        </div>
      )}

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseForm();
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Ajouter une location
                </h2>

                <button
                  type="button"
                  onClick={handleCloseForm}
                  disabled={isSubmitting}
                  className="text-gray-500 hover:text-gray-700 text-2xl disabled:opacity-50"
                  aria-label="Fermer"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="rental-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nom de la location
                  </label>

                  <input
                    id="rental-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex : Appartement avec terrasse"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="rental-surface"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Surface (m²)
                    </label>

                    <input
                      id="rental-surface"
                      type="number"
                      min="1"
                      value={surface}
                      onChange={(e) => setSurface(e.target.value)}
                      placeholder="Ex : 75"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="rental-price"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Prix (€ / mois)
                    </label>

                    <input
                      id="rental-price"
                      type="number"
                      min="1"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Ex : 850"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="rental-picture"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Photo
                  </label>

                  <input
                    id="rental-picture"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setPicture(e.target.files?.[0] ?? null)
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                  />
                </div>

                <div>
                  <label
                    htmlFor="rental-description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>

                  <textarea
                    id="rental-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Décrivez la location..."
                    rows={5}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {formError && (
                  <p className="text-sm text-red-600">
                    {formError}
                  </p>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    disabled={isSubmitting}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting
                      ? 'Ajout en cours...'
                      : 'Ajouter la location'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
