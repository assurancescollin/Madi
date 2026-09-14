import React, { useState } from 'react';
import { X, Upload, Send, CheckCircle2, FileText, Download } from 'lucide-react';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'transmettre' | 'demande' | 'contrats'>('transmettre');

  // État onglet "Transmettre un document"
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docCategory, setDocCategory] = useState('Justificatif de domicile');
  const [docReference, setDocReference] = useState('');
  const [docSent, setDocSent] = useState(false);

  // État onglet "Faire une demande sur vos contrats"
  const [requestSubject, setRequestSubject] = useState('Modification de coordonnées');
  const [requestContract, setRequestContract] = useState('Tous mes contrats');
  const [requestDetails, setRequestDetails] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  if (!isOpen) return null;

  const handleDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDocSent(true);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
  };

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
        className="relative w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div>
            <h3 className="text-base font-semibold text-neutral-950">Espace client</h3>
            <p className="text-xs text-neutral-500">Transmettre un document ou faire une demande sur vos contrats</p>
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
        <div className="flex border-b border-neutral-100 gap-6 text-xs font-medium mt-1">
          <button
            type="button"
            onClick={() => setActiveTab('transmettre')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'transmettre'
                ? 'border-neutral-950 text-neutral-950 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Transmettre un document
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('demande')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'demande'
                ? 'border-neutral-950 text-neutral-950 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Faire une demande sur vos contrats
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('contrats')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'contrats'
                ? 'border-neutral-950 text-neutral-950 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Mes attestations
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-5">
          {/* 1. Transmettre un document */}
          {activeTab === 'transmettre' && (
            <div>
              {docSent ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-neutral-950" />
                  <h4 className="mt-3 text-sm font-semibold text-neutral-950">Document bien reçu</h4>
                  <p className="mt-1 text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                    Votre pièce a été rattachée à votre dossier sociétaire. Un accusé de traitement vous sera envoyé.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setDocSent(false);
                      setDocFile(null);
                      setDocReference('');
                    }}
                    className="mt-4 rounded-full border border-neutral-200 px-4 py-1.5 text-xs font-medium text-neutral-800 hover:bg-neutral-50"
                  >
                    Transmettre un autre document
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDocSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-neutral-700 block mb-1">
                      Type de document
                    </label>
                    <select
                      value={docCategory}
                      onChange={(e) => setDocCategory(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-950 focus:border-neutral-900 focus:outline-hidden bg-white"
                    >
                      <option value="Justificatif de domicile">Justificatif de domicile (- 3 mois)</option>
                      <option value="Relevé d'information">Relevé d'information automobile</option>
                      <option value="RIB">Relevé d'Identité Bancaire (RIB)</option>
                      <option value="Pièce d'identité">Pièce d'identité (CNI / Passeport)</option>
                      <option value="Facture / Devis">Facture / Devis / Constat amiable</option>
                      <option value="Autre pièce">Autre pièce justificative</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-neutral-700 block mb-1">
                      Numéro de contrat ou référence client (optionnel)
                    </label>
                    <input
                      type="text"
                      value={docReference}
                      onChange={(e) => setDocReference(e.target.value)}
                      placeholder="Ex: MAD-2024-8841 ou votre nom"
                      className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-950 focus:border-neutral-900 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-neutral-700 block mb-1">
                      Fichier à téléverser (PDF, JPG, PNG)
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-28 border border-dashed border-neutral-300 rounded-xl cursor-pointer hover:bg-neutral-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 text-neutral-400 mb-2" />
                        <p className="text-xs text-neutral-600">
                          {docFile ? docFile.name : 'Cliquez pour sélectionner un document'}
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setDocFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={!docFile}
                      className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-xs font-medium text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <span>Transmettre le document</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* 2. Faire une demande sur vos contrats */}
          {activeTab === 'demande' && (
            <div>
              {requestSent ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-neutral-950" />
                  <h4 className="mt-3 text-sm font-semibold text-neutral-950">Demande enregistrée</h4>
                  <p className="mt-1 text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                    Votre gestionnaire dédié prend en charge votre demande. Une réponse écrite vous parviendra sous 24h ouvrées.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setRequestSent(false);
                      setRequestDetails('');
                    }}
                    className="mt-4 rounded-full border border-neutral-200 px-4 py-1.5 text-xs font-medium text-neutral-800 hover:bg-neutral-50"
                  >
                    Faire une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-neutral-700 block mb-1">
                      Objet de la demande
                    </label>
                    <select
                      value={requestSubject}
                      onChange={(e) => setRequestSubject(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-950 focus:border-neutral-900 focus:outline-hidden bg-white"
                    >
                      <option value="Modification de coordonnées">Changement d'adresse postale ou email</option>
                      <option value="Modification bancaire">Mise à jour de mes coordonnées bancaires</option>
                      <option value="Ajustement de garanties">Ajout / Retrait d'une option ou garantie</option>
                      <option value="Attestation spécifique">Demande d'attestation spécifique non disponible</option>
                      <option value="Résiliation / Clôture">Demande de résiliation ou transfert</option>
                      <option value="Question générale">Autre question relative à mes contrats</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-neutral-700 block mb-1">
                      Contrat concerné
                    </label>
                    <select
                      value={requestContract}
                      onChange={(e) => setRequestContract(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-950 focus:border-neutral-900 focus:outline-hidden bg-white"
                    >
                      <option value="Tous mes contrats">Tous mes contrats</option>
                      <option value="Habitation">Contrat Habitation</option>
                      <option value="Automobile">Contrat Automobile</option>
                      <option value="Santé">Contrat Complémentaire Santé</option>
                      <option value="Prévoyance">Contrat Prévoyance</option>
                      <option value="Retraite">Plan Épargne Retraite (PER)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-neutral-700 block mb-1">
                      Détail de votre demande
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={requestDetails}
                      onChange={(e) => setRequestDetails(e.target.value)}
                      placeholder="Précisez votre demande, vos nouvelles informations ou vos questions..."
                      className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-950 focus:border-neutral-900 focus:outline-hidden resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-xs font-medium text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <span>Envoyer la demande</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* 3. Attestations immédiates */}
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
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-800 hover:bg-neutral-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="h-3 w-3" />
                  <span>Télécharger</span>
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
                  onClick={() => handleDownloadDoc('Attestation_Tiers_Payant_Madi')}
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-800 hover:bg-neutral-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="h-3 w-3" />
                  <span>Télécharger</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
