import React, { useState } from 'react';
import { X, Download, CheckCircle2, FileText } from 'lucide-react';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'contrats' | 'sinistre' | 'documents'>('contrats');
  const [claimSent, setClaimSent] = useState(false);
  const [claimType, setClaimType] = useState('Dégât des eaux');
  const [claimDescription, setClaimDescription] = useState('');

  if (!isOpen) return null;

  const handleDownloadDoc = (name: string) => {
    const content = `=====================================================
MADI ASSURANCES — DOCUMENT OFFICIEL
=====================================================
Document : ${name}
Date d'édition : ${new Date().toLocaleDateString('fr-FR')}
Statut : Valide et certifié conforme ACPR
=====================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.replace(/ /g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 backdrop-blur-xs p-4">
      <div
        id="client-portal-modal"
        className="relative w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-7 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div>
            <h3 className="text-base font-semibold text-neutral-950">Espace Client Madi</h3>
            <p className="text-xs text-neutral-500">Gestion de vos contrats et déclarations en ligne</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-neutral-100 gap-6 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('contrats')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'contrats'
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Contrats en cours
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sinistre')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'sinistre'
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Déclarer un sinistre
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('documents')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'documents'
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Attestations
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-5">
          {activeTab === 'contrats' && (
            <div className="space-y-3">
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-xs text-neutral-950 block">
                    Habitation Résidence Principale
                  </span>
                  <span className="text-xs text-neutral-500 mt-0.5 block">
                    Statut : Couverture active sans engagement
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadDoc('Attestation_Assurance_Habitation_Madi')}
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-800 hover:bg-neutral-50 flex items-center gap-1.5 transition-colors"
                >
                  <Download className="h-3 w-3" />
                  <span>Attestation</span>
                </button>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-xs text-neutral-950 block">
                    Complémentaire Santé
                  </span>
                  <span className="text-xs text-neutral-500 mt-0.5 block">
                    Statut : Télétransmission active
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadDoc('Carte_Tiers_Payant_Madi')}
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-800 hover:bg-neutral-50 flex items-center gap-1.5 transition-colors"
                >
                  <Download className="h-3 w-3" />
                  <span>Tiers-payant</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'sinistre' && (
            <div>
              {claimSent ? (
                <div className="py-6 text-center">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-neutral-950" />
                  <p className="mt-3 text-sm font-semibold text-neutral-950">
                    Déclaration enregistrée
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 max-w-sm mx-auto">
                    Votre dossier a été transmis à notre équipe dédiée. Vous serez contacté directement par email ou téléphone.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setClaimSent(false);
                      setClaimDescription('');
                    }}
                    className="mt-4 rounded-full border border-neutral-200 px-4 py-1.5 text-xs font-medium text-neutral-800 hover:bg-neutral-50"
                  >
                    Nouvelle déclaration
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setClaimSent(true);
                  }}
                  className="space-y-3.5"
                >
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Type d'incident
                    </label>
                    <select
                      value={claimType}
                      onChange={(e) => setClaimType(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-900 bg-white focus:border-neutral-950 focus:outline-none"
                    >
                      <option value="Dégât des eaux">Dégât des eaux</option>
                      <option value="Bris de glace">Bris de glace</option>
                      <option value="Accident auto">Accident de la route</option>
                      <option value="Vol">Vol ou vandalisme</option>
                      <option value="Serrurerie">Serrurerie d'urgence</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Description des faits
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={claimDescription}
                      onChange={(e) => setClaimDescription(e.target.value)}
                      placeholder="Expliquez brièvement la situation et les dommages constatés..."
                      className="w-full rounded-xl border border-neutral-200 p-3 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-neutral-950 py-2.5 text-xs font-medium text-white hover:bg-neutral-800 transition-colors"
                  >
                    Transmettre la déclaration
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-3 hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4 text-neutral-600" />
                  <span className="font-medium text-neutral-900">Attestation d'assurance Habitation</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadDoc('Attestation_Habitation')}
                  className="text-xs font-medium text-neutral-950 underline"
                >
                  Télécharger
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-3 hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4 text-neutral-600" />
                  <span className="font-medium text-neutral-900">Carte de Tiers-Payant Santé</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadDoc('Carte_Tiers_Payant')}
                  className="text-xs font-medium text-neutral-950 underline"
                >
                  Télécharger
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-3 hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4 text-neutral-600" />
                  <span className="font-medium text-neutral-900">Tableau des garanties</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadDoc('Tableau_des_garanties')}
                  className="text-xs font-medium text-neutral-950 underline"
                >
                  Télécharger
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
