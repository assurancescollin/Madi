import React, { useState, useEffect } from 'react';
import { X, Check, Download, ShieldCheck } from 'lucide-react';
import { ProductItem } from '../types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
  initialOption?: string;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  product,
  initialOption,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSubOption, setSelectedSubOption] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState('');

  useEffect(() => {
    if (initialOption) {
      setSelectedSubOption(initialOption);
    } else if (product?.id === 'prevoyance') {
      setSelectedSubOption('individuelle');
    }
  }, [initialOption, product]);

  if (!isOpen || !product) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setReference(`MADI-${product.id.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`);
        setStep(3);
      }, 500);
    }
  };

  const getSubOptionLabel = () => {
    if (product.id !== 'prevoyance') return product.title;
    return selectedSubOption === 'emprunteur'
      ? 'Prévoyance — Assurance Emprunteur'
      : 'Prévoyance — Individuelle & Famille';
  };

  const handleDownload = () => {
    const content = `=====================================================
ATTESTATION OFFICIELLE D'ASSURANCE — MADI
=====================================================
Référence du contrat : ${reference}
Date d'émission : ${new Date().toLocaleDateString('fr-FR')}

ASSURÉ :
Nom : ${formData.lastName.toUpperCase()} ${formData.firstName}
Email : ${formData.email}
Téléphone : ${formData.phone}
Adresse : ${formData.address}, ${formData.city}

PRODUIT :
Couverture : ${getSubOptionLabel()}
Modalité : Souscription en ligne, sans engagement

GARANTIES :
- Prise d'effet immédiate dès validation bancaire
- Assistance et gestion des sinistres 24h/24 et 7j/7
- Espace adhérent sécurisé sur madi.fr

Ce document certifie la recevabilité de votre dossier de souscription auprès de Madi Assurances.
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Attestation_Madi_${product.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 backdrop-blur-xs p-4">
      <div
        id="subscription-modal"
        className="relative w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-7 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-neutral-400">
              {product.title}
            </span>
            <h3 className="text-base font-semibold text-neutral-950 mt-0.5">
              {step === 3 ? 'Souscription confirmée' : 'Souscription en ligne'}
            </h3>
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-3.5">
              {/* Option Selector specifically for Prévoyance */}
              {product.id === 'prevoyance' && (
                <div className="mb-4 p-1.5 bg-neutral-50 rounded-xl border border-neutral-200 flex gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedSubOption('individuelle')}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all cursor-pointer ${
                      selectedSubOption !== 'emprunteur'
                        ? 'bg-white text-neutral-950 shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    Prévoyance Individuelle
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSubOption('emprunteur')}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all cursor-pointer ${
                      selectedSubOption === 'emprunteur'
                        ? 'bg-white text-neutral-950 shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    Assurance Emprunteur
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Camille"
                    className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Laurent"
                    className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="camille.laurent@example.com"
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="06 12 34 56 78"
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Adresse
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="14 rue de la Paix"
                    className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Ville
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Paris"
                    className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-neutral-950 py-2.5 text-xs font-medium text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Continuer vers les options
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="rounded-xl border border-neutral-200 p-4 bg-neutral-50/50">
                <span className="text-xs font-semibold text-neutral-950 block mb-1">
                  Récapitulatif de votre demande
                </span>
                <p className="text-xs text-neutral-600">
                  Offre sélectionnée : <strong className="text-neutral-950">{getSubOptionLabel()}</strong>
                </p>
                <p className="text-xs text-neutral-600 mt-1">
                  Souscripteur : {formData.firstName} {formData.lastName}
                </p>
                <p className="text-xs text-neutral-600">
                  Contact : {formData.email} · {formData.phone}
                </p>
              </div>

              <div className="space-y-2 text-xs text-neutral-600">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 rounded border-neutral-300" />
                  <span>J'accepte les conditions générales et la notice d'information légale.</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 rounded border-neutral-300" />
                  <span>Je certifie l'exactitude des informations fournies sur l'honneur.</span>
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-full border border-neutral-200 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-full bg-neutral-950 py-2 text-xs font-medium text-white hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Validation...' : 'Valider la souscription'}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-3 border border-emerald-200">
                <Check className="h-6 w-6" />
              </div>
              <h4 className="text-base font-semibold text-neutral-950">
                Souscription validée avec succès
              </h4>
              <p className="text-xs text-neutral-600 mt-1 max-w-sm mx-auto">
                Votre contrat <strong className="text-neutral-950">{getSubOptionLabel()}</strong> est bien enregistré sous la référence <strong className="font-mono text-neutral-950">{reference}</strong>.
              </p>
              <p className="text-xs text-neutral-500 mt-2">
                Un email de confirmation contenant votre dossier a été envoyé à <strong>{formData.email}</strong>.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 py-2.5 text-xs font-medium text-neutral-800 hover:bg-neutral-50 hover:border-neutral-950 transition-colors cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Télécharger l'attestation</span>
                </button>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="flex-1 rounded-full bg-neutral-950 py-2.5 text-xs font-medium text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
