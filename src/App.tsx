/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileCheck, 
  Copy, 
  Download, 
  Plus, 
  AlertCircle,
  Gavel,
  ShieldAlert,
  Calendar,
  MapPin,
  ClipboardList,
  User,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { saveAs } from 'file-saver';
import { cn, detectUrdu } from './lib/utils';
import { 
  Accused, 
  PetitionType, 
  Ground, 
  POST_ARREST_GROUNDS, 
  PRE_ARREST_GROUNDS 
} from './types';
import Sidebar from './components/Sidebar';
import ExpertOpinion from './components/ExpertOpinion';
import AccusedTable from './components/AccusedTable';

export default function App() {
  const [activeTab, setActiveTab] = useState<PetitionType>('post-arrest');
  const [copySuccess, setCopySuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    courtName: 'DISTRICT & SESSIONS JUDGE MASTUNG',
    jailName: 'Central Jail Mastung',
    firNo: '',
    firDate: '',
    policeStation: '',
    offenceSections: '',
    complainantName: '',
    complainantFather: '',
    complainantCaste: '',
    complainantAddress: '',
    briefFacts: '',
    highCourtName: 'HONOURABLE HIGH COURT OF BALOCHISTAN AT QUETTA',
    bailCourt: '',
    bailDate: '',
  });

  const [accusedList, setAccusedList] = useState<Accused[]>([
    { id: '1', name: '', father: '', caste: '', address: '' }
  ]);

  const [selectedGrounds, setSelectedGrounds] = useState<string[]>([]);

  // Reset grounds when tab changes
  useEffect(() => {
    setSelectedGrounds([]);
    if (activeTab === 'protective') {
      setFormData(prev => ({ ...prev, courtName: 'HONOURABLE HIGH COURT OF BALOCHISTAN AT QUETTA' }));
    } else {
      setFormData(prev => ({ ...prev, courtName: 'DISTRICT & SESSIONS JUDGE MASTUNG' }));
    }
  }, [activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addAccused = () => {
    setAccusedList(prev => [
      ...prev,
      { id: Math.random().toString(36).substr(2, 9), name: '', father: '', caste: '', address: '' }
    ]);
  };

  const removeAccused = (id: string) => {
    if (accusedList.length > 1) {
      setAccusedList(prev => prev.filter(a => a.id !== id));
    }
  };

  const updateAccused = (id: string, field: keyof Accused, value: string) => {
    setAccusedList(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const toggleGround = (id: string) => {
    setSelectedGrounds(prev => {
      if (prev.includes(id)) return prev.filter(g => g !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  };

  const processedBriefFacts = useMemo(() => {
    if (!formData.briefFacts.trim()) {
      return "The complainant alleged that the accused committed the above-mentioned offences. The applicant is innocent and has been falsely implicated due to ulterior motives.";
    }
    if (detectUrdu(formData.briefFacts)) {
      return `[Translated from Urdu] ${formData.briefFacts}`;
    }
    return formData.briefFacts;
  }, [formData.briefFacts]);

  const availableGrounds = useMemo(() => {
    if (activeTab === 'post-arrest') return POST_ARREST_GROUNDS;
    if (activeTab === 'pre-arrest') return PRE_ARREST_GROUNDS;
    return [];
  }, [activeTab]);

  const finalPetitionText = useMemo(() => {
    const accusedMainStr = accusedList.map(a => `${a.name || '[NAME]'} S/o ${a.father || '[FATHER]'} By caste ${a.caste || '[CASTE]'} R/o ${a.address || '[ADDRESS]'}`).join('\n');
    const accusedNamesOnlyStr = accusedList.map(a => a.name || '[NAME]').join(', ');
    
    const groundsList: string[] = [];
    
    if (activeTab === 'post-arrest') {
      groundsList.push(`A. That the applicant/accused is innocent and has been falsely and maliciously implicated in the instant case by the complainant party due to ulterior motives. The allegations against the applicant are not supported by any credible material, and as such, the case is one of further inquiry under Section 497(2) of the Code of Criminal Procedure, 1898 (Cr.P.C.).`);
      groundsList.push(`B. That the investigation has been completed and the accused/applicant has been shifted to ${formData.jailName} and is no more required for any investigation.`);
      
      const selectedArr = availableGrounds.filter(g => selectedGrounds.includes(g.id));
      selectedArr.forEach((g, i) => {
        const letter = String.fromCharCode(67 + i); // C, D, E, F
        groundsList.push(`${letter}. ${g.text}`);
      });
      
      const nextLetter = String.fromCharCode(67 + selectedArr.length);
      const lastLetter = String.fromCharCode(68 + selectedArr.length);
      groundsList.push(`${nextLetter}. That the applicant is a respectable, peace-loving, and law-abiding citizen with no previous criminal record. There is no apprehension whatsoever that the applicant will abscond or tamper with the prosecution evidence if released on bail. The applicant is ready to furnish reliable surety bonds to the entire satisfaction of this Honourable Court.`);
      groundsList.push(`${lastLetter}. That based on the above-stated facts and circumstances, there are strong prima facie grounds to believe that the applicant is entitled to the grant of post-arrest bail.`);

      return `BEFORE THE COURT OF ${formData.courtName.toUpperCase()}\n\n\n${accusedMainStr}\nNow confined at ${formData.jailName}\n\n...                                                          …Accused/Applicant\n\nV E R S U S\n\nThe State                                                                 Respondent\n\nOFFENCE U/S: ${formData.offenceSections || '[OFFENCE_SECTIONS]'}\n\nAPPLICATION FOR GRANT OF POST-ARREST BAIL UNDER SECTION 497 OF THE CODE OF CRIMINAL PROCEDURE\n\nThe applicant/accused respectfully submits as under:\n\n1. Brief facts of the instant application are that a Case FIR No: ${formData.firNo || '[FIR_NO]'} has been lodged at ${formData.policeStation || '[STATION]'} on the complaint of one ${formData.complainantName || '[NAME]'} S/o ${formData.complainantFather || '[FATHER]'} by caste ${formData.complainantCaste || '[CASTE]'} R/o ${formData.complainantAddress || '[ADDRESS]'} alleging the above mentioned offences against the accused/applicant. ${processedBriefFacts} (copy of FIR is attached).\n\n2. That the accused/applicant was arrested and the accused/applicant is innocent and has not committed any offence whatsoever. Hence the accused/applicant seeks the indulgence of this Honourable Court for his release on post-arrest bail on the following amongst other grounds:\n\nG R O U N D S\n\n${groundsList.join('\n\n')}\n\nP R A Y E R\n\nIn view of the foregoing grounds and circumstances, it is most humbly prayed that this Honourable Court may be graciously pleased to accept this application and order the release of the applicant/accused, ${accusedNamesOnlyStr}, on post-arrest bail until the final disposal of this case, subject to furnishing surety bonds as deemed fit by this Honourable Court.\n\n\nACCUSED/APPLICANT\nTHROUGH COUNSEL\n\n\nCERTIFICATE\n\nIt is certified that no such bail application is filed or pending before any court of law.\n\n\nCOUNSEL FOR ACCUSED/APPLICANT`;
    }

    if (activeTab === 'pre-arrest') {
      groundsList.push(`A. That the accused/applicants are innocent and have not committed any offence whatsoever.`);
      groundsList.push(`B. There has been an inordinate and unexplained delay in the registration of the FIR, which casts serious doubt upon the veracity of the prosecution's narrative as such the accused/applicants are entitled to be admitted to pre-arrest bail.`);
      
      const selectedArr = availableGrounds.filter(g => selectedGrounds.includes(g.id));
      selectedArr.forEach((g, i) => {
        const letter = String.fromCharCode(67 + i);
        groundsList.push(`${letter}. ${g.text}`);
      });
      
      const nextLetter = String.fromCharCode(67 + selectedArr.length);
      const lastLetter = String.fromCharCode(68 + selectedArr.length);
      groundsList.push(`${nextLetter}. That the applicants are prepared to furnish reliable surety to the satisfaction of this Honourable Court and undertake to join the police investigation as and when required by the investigating officer.`);
      groundsList.push(`${lastLetter}. That based on the above-stated facts and circumstances, there are strong prima facie grounds to believe that the applicants are entitled to the grant of pre-arrest bail.`);

      return `BEFORE THE COURT OF ${formData.courtName.toUpperCase()}\n\n\n${accusedMainStr}\n\n...                                                          …Accused/Applicants\n\nV E R S U S\n\nThe State                                                                 Respondent\n\nOFFENCE U/S: ${formData.offenceSections || '[OFFENCE_SECTIONS]'}\n\nAPPLICATION UNDER SECTION 498 Cr.P.C FOR GRANT OF PRE-ARREST BAIL\n\nThe accused/applicants submits as under:\n\n1. Brief facts of this application are that on ${formData.firDate || '[DATE]'} a complainant namely ${formData.complainantName || '[NAME]'} S/o ${formData.complainantFather || '[FATHER]'} has lodged FIR, being FIR No ${formData.firNo || '[FIR_NO]'} of Police Station ${formData.policeStation || '[STATION]'} alleging the above mentioned offences, against the accused/applicants. ${processedBriefFacts} (copy of FIR is attached).\n\n2. On this report FIR was lodged. Same came into the knowledge of accused/applicant, who being innocent surrenders himself to the mercy of this Hon'ble court and prefers bail before arrest application on following amongst grounds:-\n\nG R O U N D S\n\n${groundsList.join('\n\n')}\n\nP R A Y E R\n\nIt is, therefore, most humbly prayed that this Honourable Court may kindly be pleased to grant pre-arrest bail to the applicants/accused in the above-mentioned case in the interest of justice & equity.\n\n\nACCUSED/APPLICANTS\nTHROUGH COUNSEL\n\n\nAFFIDAVIT\n\nWe, ${accusedMainStr}, do hereby solemnly affirm and declare on oath that the contents of this bail application are true and correct to the best of our knowledge and belief, and that nothing has been concealed from this Honourable Court.\n\nDeponents\n\n\nCERTIFICATE\n\nCertified that no such application on behalf of the applicants on similar grounds has previously been filed or pending, or has been decided by this Honourable Court or any other court of competent jurisdiction, except for the present application.\n\n\nCOUNSEL FOR ACCUSED/APPLICANTS`;
    }

    if (activeTab === 'protective') {
      return `BEFORE THE ${formData.courtName.toUpperCase()}\n\n\n${accusedNamesOnlyStr} S/o ${accusedList[0].father} By caste ${accusedList[0].caste} R/o ${accusedList[0].address}\n\n...                                                          …Petitioner/Applicant\n\nV E R S U S\n\nThe State & another                                                       Respondents\n\nOFFENCE U/S: ${formData.offenceSections}\n\nAPPLICATION FOR GRANT OF PROTECTIVE/TRANSITORY BAIL\n\nThe petitioner/applicant respectfully submits as under:\n\n1. Brief facts of the instant application are that a Case FIR No: ${formData.firNo} has been lodged at ${formData.policeStation} alleging the above mentioned offences against the petitioner/applicant. The petitioner is innocent and has been falsely implicated. (copy of FIR is attached).\n\n2. That the petitioner/applicant has genuine apprehension of arrest at the hands of the local police and seeks protective bail from this Honourable Court to enable him to appear before the trial court and join investigation.\n\nG R O U N D S\n\nA. That the petitioner/applicant is innocent and has been falsely implicated in the instant case.\nB. That the petitioner/applicant has genuine apprehension of arrest and seeks protection to approach the competent court of jurisdiction.\nG. That the petitioner/applicant is a permanent resident of Pakistan with deep roots in society and there is no apprehension of absconding.\nH. That the petitioner/applicant undertakes to furnish surety bonds and join investigation as and when required.\n\nP R A Y E R\n\nIt is, therefore, most humbly prayed that this Honourable Court may kindly be pleased to grant protective/transitory bail to the petitioner/applicant for a period of 15 days to enable him to approach the competent court of jurisdiction.\n\n\nPETITIONER/APPLICANT\nTHROUGH COUNSEL\n\n\nAFFIDAVIT\n\nI, ${accusedList[0].name} S/o ${accusedList[0].father}, do hereby solemnly affirm and declare on oath that the contents of this application are true and correct to the best of my knowledge and belief.\n\nDeponent\n\n\nCERTIFICATE\n\nCertified that no such application has previously been filed before this Honourable Court.\n\n\nCOUNSEL FOR PETITIONER/APPLICANT`;
    }

    if (activeTab === 'cancellation') {
       return `IN THE COURT OF THE ${formData.courtName.toUpperCase()}\n\nBail Cancellation No.______/${new Date().getFullYear()}\n\n\n${formData.complainantName} s/o ${formData.complainantFather},\nCaste ${formData.complainantCaste}, Resident of ${formData.complainantAddress}.\n                                                              Complainant/Petitioner:\n\nV E R S U S\n\n${accusedMainStr}\n                                                              Accused/Respondent:\n\nThe State                                                           Respondent.\n\nOFFENCE UNDER SECTION ${formData.offenceSections}\n\nAPPLICATION U/S 497 (5) Cr.P.C. FOR CANCELLATION OF BAIL DATED ${formData.bailDate} PASSED BY ${formData.bailCourt}.\n\nThe complainant/applicant submits as under:\n\n1. Brief facts of the instant application are that a case FIR No. ${formData.firNo} was registered at ${formData.policeStation} on the complaint of the petitioner/complainant alleging the above mentioned offences. The accused committed the alleged offences and were subsequently granted bail. (Copy of FIR is attached).\n\n2. That the accused above named were granted bail vide order dated ${formData.bailDate} by the learned ${formData.bailCourt}.\n\n3. That the accused, while seeking bail, deliberately misrepresented facts and concealed vital circumstances of the case.\n\n4. That after grant of bail, the accused has grossly misused the concession by continuously threatening the complainant and prosecution witnesses with dire consequences.\n\n5. That the Learned ${formData.bailCourt}, while granting bail, has not applied judicial mind and passed the impugned order in a mechanical manner without proper reasoning.\n\n6. That the overall circumstances demonstrate that the accused obtained bail through misrepresentation and continues to misuse liberty.\n\nP   R  A  Y  E  R.\n\nIt is therefore most respectfully prayed that this Hon'ble Court may graciously be pleased to:\n\n1. Cancel the bail granted to accused ${accusedNamesOnlyStr} in FIR No. ${formData.firNo}, ${formData.policeStation}, vide order dated ${formData.bailDate} by the Learned ${formData.bailCourt}; and\n\n2. Direct that the accused be taken into custody forthwith, in the interest of justice, equity, and fair trial.\n\n\nAPPLICANT/COMPLAINANT\nTHROUGH COUNSEL\n\n\nAFFIDAVIT\n\nI, ${formData.complainantName} s/o ${formData.complainantFather}, caste ${formData.complainantCaste}, resident of ${formData.complainantAddress}, do hereby solemnly affirm and state on oath that the contents of the accompanying application for cancellation of bail are true and correct to the best of my knowledge and belief, and nothing has been concealed therein.\n\nDeponent:\n\n\nCERTIFICATE\n\nCertified that no such application has previously been filed before this Honourable Court.\n\n\nCOUNSEL FOR COMPLAINANT/PETITIONER`;
    }

    return '';
  }, [activeTab, formData, accusedList, selectedGrounds, availableGrounds, processedBriefFacts]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(finalPetitionText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const downloadDoc = () => {
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Bail Petition</title>
      <style>
        body { font-family: 'Times New Roman', serif; line-height: 1.5; font-size: 12pt; }
        pre { white-space: pre-wrap; font-family: 'Times New Roman', serif; margin: 0; }
      </style>
      </head><body><pre>${finalPetitionText}</pre></body></html>`;
      
    const blob = new Blob(['\ufeff', header], {
      type: 'application/msword'
    });
    saveAs(blob, `bail-petition-${activeTab}.doc`);
  };

  const scrollToDraft = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="h-[50px] border-b border-border-gold flex items-center px-6 justify-between luxury-gradient shrink-0">
        <div className="flex items-center gap-2">
          <Gavel className="w-5 h-5 text-accent" />
          <h1 className="font-georgia text-base font-bold tracking-[2px] text-accent uppercase">
            Smart Bail Generator
          </h1>
        </div>
        <div className="text-[10px] opacity-60 uppercase tracking-widest hidden sm:block">
          MK Legal Hub | Court Filing Tool v2.4
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[220px_1fr_340px] overflow-hidden">
        <aside className="sidebar border-r border-border-gold p-4 overflow-y-auto hidden lg:block bg-black/10">
          <Sidebar />
        </aside>

        <section className="p-6 overflow-y-auto space-y-5 bg-[#0D121F]">
          <div className="flex gap-1 border-b border-border-gold">
            {['post-arrest', 'pre-arrest', 'protective', 'cancellation'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type as PetitionType)}
                className={cn(
                  "px-3 py-2 text-[10px] uppercase font-bold tracking-wider transition-all border-x border-t border-transparent rounded-t-lg",
                  activeTab === type 
                    ? "bg-accent text-bg border-border-gold opacity-100" 
                    : "text-text-main opacity-50 hover:bg-glass"
                )}
              >
                {type.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-accent/80">Court Name</label>
                <input
                  type="text"
                  name="courtName"
                  value={formData.courtName}
                  onChange={handleInputChange}
                  className="w-full input-thematic rounded px-3 py-2 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-accent/80">Police Station</label>
                <input
                  type="text"
                  name="policeStation"
                  value={formData.policeStation}
                  onChange={handleInputChange}
                  className="w-full input-thematic rounded px-3 py-2 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-accent/80">FIR Number</label>
                <input
                  type="text"
                  name="firNo"
                  value={formData.firNo}
                  onChange={handleInputChange}
                  className="w-full input-thematic rounded px-3 py-2 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-accent/80">Sections (PPC)</label>
                <input
                  type="text"
                  name="offenceSections"
                  value={formData.offenceSections}
                  onChange={handleInputChange}
                  className="w-full input-thematic rounded px-3 py-2 text-xs"
                />
              </div>
            </div>

            {activeTab !== 'cancellation' && (
              <AccusedTable 
                accusedList={accusedList}
                onAdd={addAccused}
                onRemove={removeAccused}
                onChange={updateAccused}
              />
            )}

            <div className="space-y-1">
              <label className="text-[9px] uppercase font-bold tracking-widest text-accent/80">Brief Facts (Urdu/English)</label>
              <textarea
                name="briefFacts"
                value={formData.briefFacts}
                onChange={handleInputChange}
                rows={3}
                className={cn(
                  "w-full input-thematic rounded px-3 py-2 text-xs resize-none",
                  detectUrdu(formData.briefFacts) && "urdu-text text-right text-base"
                )}
                dir={detectUrdu(formData.briefFacts) ? 'rtl' : 'ltr'}
              />
            </div>

            {(activeTab === 'post-arrest' || activeTab === 'pre-arrest') && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[9px] uppercase font-bold tracking-widest text-accent/80">Select Grounds (Max 4)</h4>
                  <span className="text-[8px] bg-accent/20 text-accent px-1.5 py-0.5 rounded leading-none">{selectedGrounds.length}/4</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {availableGrounds.map((ground) => (
                    <button
                      key={ground.id}
                      onClick={() => toggleGround(ground.id)}
                      className={cn(
                        "text-left p-3 rounded border text-[11px] transition-all flex items-start gap-3",
                        selectedGrounds.includes(ground.id)
                          ? "bg-accent/10 border-accent/40 text-white"
                          : "bg-black/20 border-border-gold/30 text-white/50 hover:border-border-gold"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center mt-0.5",
                        selectedGrounds.includes(ground.id) ? "bg-accent border-accent" : "bg-transparent border-white/20"
                      )}>
                        {selectedGrounds.includes(ground.id) && <CheckCircle2 className="w-3 h-3 text-bg" />}
                      </div>
                      <p className="leading-relaxed">{ground.text}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="bg-preview-bg p-5 border-l border-border-gold flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden relative group">
            <div className="preview-paper absolute inset-0 overflow-y-auto p-8 text-[11px] leading-relaxed select-all">
              <h3 className="text-center font-bold text-[13px] underline mb-6 uppercase">
                {activeTab === 'protective' ? 'BEFORE THE HIGH COURT' : 'IN THE COURT OF THE ' + formData.courtName || 'LEARNED COURT'}
              </h3>
              <div className="whitespace-pre-wrap">{finalPetitionText}</div>
            </div>
          </div>
          <div className="h-12 flex gap-3 mt-4">
            <button 
              onClick={downloadDoc}
              className="flex-1 btn-primary flex items-center justify-center gap-2 rounded text-xs"
            >
              <Download className="w-3 h-3" /> Download .DOC
            </button>
            <button 
              onClick={copyToClipboard}
              className={cn(
                "flex-1 btn-outline flex items-center justify-center gap-2 rounded text-xs transition-colors",
                copySuccess && "border-green-500 text-green-500"
              )}
            >
              <Copy className="w-3 h-3" /> {copySuccess ? 'Copied' : 'Copy Text'}
            </button>
          </div>
        </section>
      </main>

      <ExpertOpinion />
    </div>
  );
}
