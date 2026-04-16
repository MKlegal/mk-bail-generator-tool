export type Accused = {
  id: string;
  name: string;
  father: string;
  caste: string;
  address: string;
};

export type PetitionType = 'post-arrest' | 'pre-arrest' | 'protective' | 'cancellation';

export interface Ground {
  id: string;
  text: string;
  letter: string;
}

export const POST_ARREST_GROUNDS: Ground[] = [
  {
    id: 'pa1',
    letter: 'C',
    text: "That the offences under the mentioned sections are being tried. However, the available material on record does not furnish reasonable grounds for believing that the applicant is guilty of an offence punishable with death or imprisonment for life. The prosecution has failed to bring the case within the prohibitory clause of Section 497(1) Cr.P.C."
  },
  {
    id: 'pa2',
    letter: 'D',
    text: "That the allegations levelled in the FIR are vague and general in nature. The specific, overt, and effective role attributed to the applicant/accused in the commission of the principal offense is neither clearly defined nor corroborated by medical evidence or other independent material."
  },
  {
    id: 'pa3',
    letter: 'E',
    text: "That the rule of consistency demands the release of the applicant on bail. A co-accused, who was similarly situated and charged, has already been acquitted or granted bail from this Honourable Court."
  },
  {
    id: 'pa4',
    letter: 'F',
    text: "That there is an unexplained delay in lodging the FIR, which suggests that the complainant party took time for consultation, deliberation, and false implication, thus casting a serious doubt on the veracity of the prosecution story."
  },
  {
    id: 'pa5',
    letter: 'G',
    text: "That no incriminating article, weapon, or other material evidence has been recovered from the possession of the applicant/accused during the investigation."
  }
];

export const PRE_ARREST_GROUNDS: Ground[] = [
  {
    id: 'pra1',
    letter: 'C',
    text: "That the accused/applicants are innocent and have been falsely implicated in the instant case by the complainant party due to a pre-existing dispute, merely to harass, humiliate, and blackmail them. The allegations are baseless and unsupported by any credible evidence."
  },
  {
    id: 'pra2',
    letter: 'D',
    text: "That the applicants were not present at the crime scene at the time of the alleged incident and have a solid alibi. They were performing their official duties at their respective workplaces, which can be verified through documentary evidence."
  },
  {
    id: 'pra3',
    letter: 'E',
    text: "That the alleged offences do not fall within the prohibitory clause of Section 497(1) of the Cr.P.C. The prosecution has failed to bring the case within the ambit of reasonable grounds for believing guilt."
  },
  {
    id: 'pra4',
    letter: 'F',
    text: "That no specific, overt, or effective role has been attributed to the applicants in the commission of the alleged offence. The allegations are vague, general, and omnibus in nature, making the case one of further inquiry."
  },
  {
    id: 'pra5',
    letter: 'G',
    text: "That the applicants have been falsely roped into this case due to a civil dispute pending between the parties. Criminal proceedings have been initiated with malicious intent to pressurize and coerce the applicants."
  }
];
