import React, { useState } from 'react';
import { X, Send, CheckCircle2, Handshake } from 'lucide-react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    activity: 'Courtier / Intermédiaire',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 backdrop-blur-xs p-4">
      <div
        id="partner-modal"
        className="relative w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-neutral-100 text-neutral-900">
              <Handshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-neutral-950">Devenir partenaire</h3>
              <p className="text-xs text-neutral-500">Cabinets de gestion, courtiers, prescripteurs</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5">
          {submitted ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-neutral-950" />
              <h4 className="mt-4 text-base font-medium text-neutral-950">Demande de partenariat transmise</h4>
              <p className="mt-2 text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                Notre direction des partenariats examinera votre demande sous 24h ouvrées.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-full bg-neutral-950 px-6 py-2 text-xs font-medium text-white hover:bg-neutral-800 transition-colors"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">
                    Structure / Société
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Cabinet, SARL..."
                    className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-950 focus:border-neutral-900 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">
                    Nom du contact
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Prénom et Nom"
                    className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-950 focus:border-neutral-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@societe.com"
                    className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-950 focus:border-neutral-900 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="06 12 34 56 78"
                    className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-950 focus:border-neutral-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">
                  Typologie de partenariat
                </label>
                <select
                  value={formData.activity}
                  onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-950 focus:border-neutral-900 focus:outline-hidden bg-white"
                >
                  <option value="Courtier / Intermédiaire">Courtier / Intermédiaire d'assurance</option>
                  <option value="Gestion de Patrimoine">Gestion de Patrimoine (CGP)</option>
                  <option value="Immobilier / Notariat">Agence Immobilière / Notaire</option>
                  <option value="Entreprise / B2B">Partenariat entreprise / Offre salariés</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">
                  Votre message ou projet de collaboration
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Présentez brièvement vos besoins ou volume envisagé..."
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-950 focus:border-neutral-900 focus:outline-hidden resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2 text-xs font-medium text-white hover:bg-neutral-800 transition-colors"
                >
                  <span>Envoyer la demande</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
