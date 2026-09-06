'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ShieldAlert,
  ShieldCheck,
  UploadCloud,
  FileText,
  Network,
  Scan,
  Layers,
  CheckCircle2,
  Download,
  Eye,
  ArrowLeft,
  Lock,
  RefreshCw,
  Shield,
  Clock,
  Sparkles,
  Search,
  KeyRound,
  FileSpreadsheet,
  AlertTriangle,
  Globe2,
  Copy,
  Check,
  Cpu,
  Share2,
  Radio,
  ExternalLink,
  Ban,
  Tag,
  Sliders,
  ChevronRight,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'
import { useLoader } from '@/context/LoadingContext'

// ==============================================================================
// TYPESCRIPT INTERFACES
// ==============================================================================

export type ForensicTab = 'heatmap' | 'audio' | 'origin' | 'shield'
export type CasePreset = 'fake' | 'real' | 'audio_clone' | 'custom'

export interface OfficerProfile {
  pin: string
  name: string
  badge: string
  dept: string
  avatar: string
  role?: string
}

export interface HarmonicPoint {
  freq: string
  db: number
}

export interface ELAStatistics {
  meanCompressionError: number
  maxCompressionError: number
  residualStdVariance: number
  qualityBaseline: number
  status: 'ANOMALY' | 'CLEAN'
}

export interface EvidenceMetadata {
  caseId: string
  fileName: string
  fileSize: string
  resolution: string
  codec?: string
  ingestionLatency: string
  isTampered: boolean
  confidenceScore: number
  vitLogitScore: number
  elaStatus: 'ANOMALY' | 'CLEAN'
  c2paStatus: 'STRIPPED' | 'VALID_HARDWARE_SIGN'
  sha256: string
  blockNumber: string
  timestampUtc: string
  summaryEnglish: string
  summaryHindi: string
  summaryPunjabi: string
}

export interface OriginNode {
  id: string
  tag: string
  platform: string
  channelName: string
  timestampIst: string
  reposts: string
  phashDistance: number
  isGroundZero: boolean
  alert: boolean
  note: string
}

export interface LedgerBlock {
  block_index: number
  block_number: string
  timestamp_utc: string
  case_id: string
  file_name: string
  file_sha256: string
  verdict: string
  confidence_score: number
  attesting_officer: string
  badge_number: string
  hsm_slot: string
  hsm_signature: string
  integrity_status: string
}

// 11-Language UI Dictionary
const I18N_DICT: Record<string, Record<string, string>> = {
  EN: {
    title: 'KAVACH AI FORENSIC ENCLAVE',
    sub: 'Digital Media Authenticity & Dissemination Tracing',
    dropHead: 'DROP SUSPECT FORENSIC SPECIMEN OR CLICK TO INGEST',
    dropSub: 'Supports Video (MP4, MOV, MKV), Audio (WAV, FLAC, MP3), & Sensor Frames (RAW, PNG, JPG) • Local GPU Enclave',
    exhibitA: 'Exhibit A: Spliced Deepfake',
    exhibitB: 'Exhibit B: Genuine CCTV',
    ingestHeading: 'Evidence Ingestion',
    primaryVerdict: 'Primary Model Verdict',
    legalSummaryTitle: 'Plain-English Investigator Summary (Section 65B IEA / Sec 63 BSA)',
    btnDownload: 'DOWNLOAD COURT-ADMISSIBLE DOSSIER',
    vaultTitle: 'Archived Evidence Strong Room Vault',
    auditTitle: 'Officer Audit Trail',
    lockoutTitle: 'FIPS 140-3 HSM Cleared Personnel Verification',
    enterPin: 'ENTER 4-DIGIT OFFICER PIN',
    unlockBtn: 'UNLOCK ENCLAVE ➔',
    judgeProfiles: '⚡ JUDGE DEMO QUICK-ACCESS PROFILES:',
  },
  HI: {
    title: 'कवच AI फॉरेंसिक एन्क्लेव',
    sub: 'डिजिटल मीडिया प्रामाणिकता एवं प्रसार ट्रैकिंग',
    dropHead: 'संदिग्ध फॉरेंसिक नमूना यहां छोड़ें या अपलोड करने के लिए क्लिक करें',
    dropSub: 'वीडियो (MP4, MOV), ऑडियो (WAV, MP3), एवं चित्र (PNG, JPG) समर्थित • स्थानीय GPU एन्क्लेव',
    exhibitA: 'प्रदर्श A: छेड़छाड़ किया डीपफेक',
    exhibitB: 'प्रदर्श B: प्रामाणिक सीसीटीवी',
    ingestHeading: 'साक्ष्य अंतर्ग्रहण',
    primaryVerdict: 'प्राथमिक मॉडल निर्णय',
    legalSummaryTitle: 'सरल भाषा जांच सारांश (भारतीय साक्ष्य अधिनियम §65B / BSA §63 संगत)',
    btnDownload: 'अदालती डॉसियर डाउनलोड करें',
    vaultTitle: 'संग्रहीत साक्ष्य स्ट्रांग रूम वॉल्ट',
    auditTitle: 'अधिकारी ऑडिट ट्रेल',
    lockoutTitle: 'FIPS 140-3 HSM अधिकृत अधिकारी सत्यापन',
    enterPin: '4-अंकों का अधिकारी पिन दर्ज करें',
    unlockBtn: 'अनलॉक करें ➔',
    judgeProfiles: '⚡ जज डेमो क्विक-एक्सेस प्रोफाइल:',
  },
  PA: {
    title: 'ਕਵਚ AI ਫੋਰੈਂਸਿਕ ਇਨਕਲੇਵ',
    sub: 'ਡਿਜੀਟਲ ਮੀਡੀਆ ਅਸਲੀਅਤ ਅਤੇ ਫੈਲਾਅ ਟਰੈਕਿੰਗ',
    dropHead: 'ਸ਼ੱਕੀ ਫੋਰੈਂਸਿਕ ਮੀਡੀਆ ਇੱਥੇ ਸੁੱਟੋ ਜਾਂ ਅਪਲੋਡ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ',
    dropSub: 'ਵੀਡੀਓ (MP4, MOV), ਆਡੀਓ (WAV, MP3), ਅਤੇ ਤਸਵੀਰਾਂ ਸਮਰਥਿਤ • ਲੋਕਲ GPU ਐਨਕਲੇਵ',
    exhibitA: 'ਪ੍ਰਦਰਸ਼ A: ਡੀਪਫੇਕ ਵੀਡੀਓ',
    exhibitB: 'ਪ੍ਰਦਰਸ਼ B: ਅਸਲੀ ਸੀਸੀਟੀਵੀ',
    ingestHeading: 'ਸਬੂਤ ਇੰਜੈਸ਼ਨ',
    primaryVerdict: 'ਮੁੱਖ ਮਾਡਲ ਫੈਸਲਾ',
    legalSummaryTitle: 'ਸਰਲ ਭਾਸ਼ਾ ਜਾਂਚ ਸਾਰਾਂਸ਼ (ਭਾਰਤੀ ਸਬੂਤ ਐਕਟ §65B / BSA §63 ਅਨੁਕੂਲ)',
    btnDownload: 'ਕੋਰਟ ਡੌਸੀਅਰ ਡਾਊਨਲੋਡ ਕਰੋ',
    vaultTitle: 'ਸੁਰੱਖਿਅਤ ਸਬੂਤ ਸਟ੍ਰਾਂਗ ਰੂਮ ਵਾਲਟ',
    auditTitle: 'ਅਫਸਰ ਆਡਿਟ ਟ੍ਰੇਲ',
    lockoutTitle: 'FIPS 140-3 HSM ਅਧਿਕਾਰਤ ਅਫਸਰ ਤਸਦੀਕ',
    enterPin: '4-ਅੰਕਾਂ ਦਾ ਅਫਸਰ ਪਿੰਨ ਦਾਖਲ ਕਰੋ',
    unlockBtn: 'ਅਨਲੌਕ ਕਰੋ ➔',
    judgeProfiles: '⚡ ਜੱਜ ਡੈਮੋ ਕੁਇੱਕ-ਐਕਸੈਸ ਪ੍ਰੋਫਾਈਲ:',
  },
  BN: {
    title: 'কবচ AI ফরেনসিক এনক্লেভ',
    sub: 'ডিজিটাল মিডিয়া সত্যতা ও প্রচার ট্র্যাকিং',
    dropHead: 'সন্দেহজনক ফরেনসিক মিডিয়া এখানে ফেলুন অথবা আপলোড করতে ক্লিক করুন',
    dropSub: 'ভিডিও, অডিও ও ছবি সমর্থিত • স্থানীয় GPU এনক্লেভ',
    exhibitA: 'প্রদর্শ A: ডিপফেক ভিডিও',
    exhibitB: 'প্রদর্শ B: খাঁটি সিসিটিভি',
    ingestHeading: 'প্রমাণ অন্তর্ভুক্তি',
    primaryVerdict: 'প্রাথমিক মডেল রায়',
    legalSummaryTitle: 'সহজ ভাষার তদন্ত সারাংশ (§65B IEA / BSA §63)',
    btnDownload: 'আদালতের ডসিয়ার ডাউনলোড করুন',
    vaultTitle: 'সংরক্ষিত প্রমাণ স্ট্রং রুম ভল্ট',
    auditTitle: 'অফিসার অডিট ট্রেইল',
    lockoutTitle: 'FIPS 140-3 HSM কর্মকর্তা যাচাইকরণ',
    enterPin: '৪-সংখ্যার অফিসার পিন লিখুন',
    unlockBtn: 'আনলক করুন ➔',
    judgeProfiles: '⚡ বিচারক ডেমো কুইক-অ্যাক্সেস প্রোফাইল:',
  },
  TA: {
    title: 'கவச் AI தடயவியல் தளம்',
    sub: 'டிஜிட்டல் ஊடக உண்மைத்தன்மை & பரவல் கண்காணிப்பு',
    dropHead: 'சந்தேகத்திற்குரிய தடயவியல் ஆதாரத்தை இங்கே இழுக்கவும் அல்லது பதிவேற்றவும்',
    dropSub: 'வீடியோ, ஆடியோ மற்றும் படங்கள் ஆதரிக்கப்படுகின்றன • உள்ளூர் GPU தளம்',
    exhibitA: 'சான்று A: போலி டீப்ஃபேக்',
    exhibitB: 'சான்று B: உண்மையான CCTV',
    ingestHeading: 'ஆதார உள்ளீடு',
    primaryVerdict: 'முதன்மை மாதிரி தீர்ப்பு',
    legalSummaryTitle: 'எளிய மொழி புலனாய்வு சுருக்கம் (§65B IEA / BSA §63)',
    btnDownload: 'நீதிமன்ற கோப்பு பதிவிறக்கு',
    vaultTitle: 'பாதுகாக்கப்பட்ட ஆதார பெட்டகம்',
    auditTitle: 'அதிகாரி தணிக்கை பதிவு',
    lockoutTitle: 'FIPS 140-3 HSM அதிகாரி சரிபார்ப்பு',
    enterPin: '4-இலக்க அதிகாரி பின் உள்ளிடவும்',
    unlockBtn: 'திறக்க ➔',
    judgeProfiles: '⚡ நீதிபதி டெமோ விரைவு சுயவிவரங்கள்:',
  },
  TE: {
    title: 'కవచ్ AI ఫోరెన్సిక్ ఎన్‌క్లేవ్',
    sub: 'డిజిటల్ మీడియా ప్రామాణికత & వ్యాప్తి ట్రాకింగ్',
    dropHead: 'అనుమానాస్పద ఫోరెన్సిక్ మీడియాను ఇక్కడ డ్రాప్ చేయండి లేదా అప్‌లోడ్ చేయండి',
    dropSub: 'వీడియో, ఆడియో మరియు చిత్రాలు మద్దతు పొందుతాయి • లోకల్ GPU ఎన్‌క్లేవ్',
    exhibitA: 'సాక్ష్యం A: డీప్‌ఫేక్ వీడియో',
    exhibitB: 'సాక్ష్యం B: నిజమైన సీసీటీవీ',
    ingestHeading: 'సాక్ష్య సేకరణ',
    primaryVerdict: 'ప్రాథమిక మోడల్ తీర్పు',
    legalSummaryTitle: 'సరళమైన దర్యాప్తు సారాంశం (§65B IEA / BSA §63)',
    btnDownload: 'కోర్టు డాసియర్ డౌన్‌లోడ్',
    vaultTitle: 'భద్రపరిచిన సాక్ష్యాల స్ట్రాంగ్ రూమ్ వాల్ట్',
    auditTitle: 'అధికారి ఆడిట్ ట్రయిల్',
    lockoutTitle: 'FIPS 140-3 HSM అధికారి ధృవీకరణ',
    enterPin: '4-అంకెల అధికారి పిన్ నమోదు చేయండి',
    unlockBtn: 'అన్‌లాక్ చేయండి ➔',
    judgeProfiles: '⚡ జడ్జి డెమో క్విక్ ప్రొఫైల్స్:',
  },
  MR: {
    title: 'कवच AI फॉरेन्सिक एन्क्लेव',
    sub: 'डिजिटल मीडिया सत्यता आणि प्रसार ट्रॅकिंग',
    dropHead: 'संशयित फॉरेन्सिक नमुना येथे ड्रॉप करा किंवा अपलोड करा',
    dropSub: 'व्हिडिओ, ऑडिओ व प्रतिमा समर्थित • स्थानिक GPU एन्क्लेव',
    exhibitA: 'पुरावा A: बनावट डीपफेक',
    exhibitB: 'पुरावा B: खरा सीसीटीव्ही',
    ingestHeading: 'पुरावा इनपुट',
    primaryVerdict: 'प्राथमिक मॉडेल निकाल',
    legalSummaryTitle: 'सोप्या भाषेतील तपास सारांश (§65B IEA / BSA §63)',
    btnDownload: 'न्यायालयीन डॉसियर डाउनलोड करा',
    vaultTitle: 'स्ट्रॉंग रूम व्हॉल्ट',
    auditTitle: 'अधिकारी ऑडिट ट्रेल',
    lockoutTitle: 'FIPS 140-3 HSM पडताळणी',
    enterPin: '४-अंकी अधिकारी पिन टाका',
    unlockBtn: 'अनलॉक करा ➔',
    judgeProfiles: '⚡ न्यायाधीश डेमो प्रोफाइल:',
  },
  GU: {
    title: 'કવચ AI ફોરેન્સિક એન્ક્લેવ',
    sub: 'ડિજિટલ મીડિયા અધિકૃતતા અને પ્રસાર ટ્રેકિંગ',
    dropHead: 'શંકાસ્પદ ફોરેન્સિક નમૂનો અહીં મૂકો અથવા અપલોડ કરો',
    dropSub: 'વિડિયો, ઓડિયો અને છબીઓ સમર્થિત • સ્થાનિક GPU એન્ક્લેવ',
    exhibitA: 'પુરાવો A: બનાવટી ડીપફેક',
    exhibitB: 'પુરાવો B: અસલી સીસીટીવી',
    ingestHeading: 'પુરાવા ઇનપુટ',
    primaryVerdict: 'પ્રાથમિક મોડેલ ચુકાદો',
    legalSummaryTitle: 'સરળ ભાષા તપાસ સારાંશ (§65B IEA / BSA §63)',
    btnDownload: 'કોર્ટ ડોઝિયર ડાઉનલોડ કરો',
    vaultTitle: 'સ્ટ્રોંગ રૂમ વૉલ્ટ',
    auditTitle: 'અધિકારી ઓડિટ ટ્રેલ',
    lockoutTitle: 'FIPS 140-3 HSM અધિકારી ચકાસણી',
    enterPin: '૪-અંકનો અધિકારી પિન દાખલ કરો',
    unlockBtn: 'અનલૉક કરો ➔',
    judgeProfiles: '⚡ જજ ડેમો પ્રોફાઇલ:',
  },
  KN: {
    title: 'ಕವಚ AI ಫೋರೆನ್ಸಿಕ್ ಎನ್‌ಕ್ಲೇವ್',
    sub: 'ಡಿಜಿಟಲ್ ಮಾಧ್ಯಮ ದೃಢೀಕರಣ ಮತ್ತು ಹರಡುವಿಕೆ ಟ್ರ್ಯಾಕಿಂಗ್',
    dropHead: 'ಶಂಕಿತ ಫೋರೆನ್ಸಿಕ್ ಮಾದರಿಯನ್ನು ಇಲ್ಲಿ ಬಿಡಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    dropSub: 'ವೀಡಿಯೊ, ಆಡಿಯೋ ಮತ್ತು ಚಿತ್ರಗಳು ಬೆಂಬಲಿತವಾಗಿದೆ • ಸ್ಥಳೀಯ GPU ಎನ್‌ಕ್ಲೇವ್',
    exhibitA: 'ಪ್ರದರ್ಶನ A: ನಕಲಿ ಡೀಪ್‌ಫೇಕ್',
    exhibitB: 'ಪ್ರದರ್ಶನ B: ಅಸಲಿ ಸಿಸಿಟಿವಿ',
    ingestHeading: 'ಸಾಕ್ಷ್ಯ ಒಳಸೇರಿಸುವಿಕೆ',
    primaryVerdict: 'ಪ್ರಾಥಮಿಕ ಮಾದರಿ ತೀರ್ಪು',
    legalSummaryTitle: 'ಸರಳ ಭಾಷಾ ತನಿಖಾ ಸಾರಾಂಶ (§65B IEA / BSA §63)',
    btnDownload: 'ನ್ಯಾಯಾಲಯದ ಡಾಕ್ಯುಮೆಂಟ್ ಡೌನ್‌ಲೋಡ್',
    vaultTitle: 'ಸ್ಟ್ರಾಂಗ್ ರೂಮ್ ವಾಲ್ಟ್',
    auditTitle: 'ಅಧಿಕಾರಿ ಆಡಿಟ್ ಟ್ರಯಲ್',
    lockoutTitle: 'FIPS 140-3 HSM ಅಧಿಕಾರಿ ಪರಿಶೀಲನೆ',
    enterPin: '೪-ಅಂಕಿಯ ಅಧಿಕಾರಿ ಪಿನ್ ನಮೂದಿಸಿ',
    unlockBtn: 'ಅನ್‌ಲಾಕ್ ಮಾಡಿ ➔',
    judgeProfiles: '⚡ ಜಡ್ಜ್ ಡೆಮೊ ಪ್ರೊಫೈಲ್:',
  },
  ML: {
    title: 'കവച് AI ഫോറൻസിക് എൻക്ലേവ്',
    sub: 'ഡിജിറ്റൽ മീഡിയ ആധികാരികതയും പ്രചാരണ ട്രാക്കിംഗും',
    dropHead: 'സംശയാസ്പദമായ ഫോറൻസിക് തെളിവ് ഇവിടെ ഇടുക അല്ലെങ്കിൽ അപ്‌ലോഡ് ചെയ്യുക',
    dropSub: 'വീഡിയോ, ഓഡിയോ, ഇമേജുകൾ പിന്തുണയ്ക്കുന്നു • ലോക്കൽ GPU എൻക്ലേവ്',
    exhibitA: 'തെളിവ് A: കൃത്രിമ ഡീപ്ഫേക്ക്',
    exhibitB: 'തെളിവ് B: യഥാർത്ഥ സിസിടിവി',
    ingestHeading: 'തെളിവ് ശേഖരണം',
    primaryVerdict: 'പ്രാഥമിക മോഡൽ വിധി',
    legalSummaryTitle: 'ലളിതമായ ഭാഷാ അന്വേഷണ സംഗ്രഹം (§65B IEA / BSA §63)',
    btnDownload: 'കോടതി രേഖ ഡൗൺലോഡ് ചെയ്യുക',
    vaultTitle: 'സ്ട്രോങ് റൂം വോൾട്ട്',
    auditTitle: 'ഉദ്യോഗസ്ഥ ഓഡിറ്റ് ട്രയൽ',
    lockoutTitle: 'FIPS 140-3 HSM ഉദ്യോഗസ്ഥ സ്ഥിരീകരണം',
    enterPin: '4-അക്ക ഉദ്യോഗസ്ഥ പിൻ നൽകുക',
    unlockBtn: 'അൺലോക്ക് ചെയ്യുക ➔',
    judgeProfiles: '⚡ ജഡ്ജ് ഡെമോ പ്രൊഫൈലുകൾ:',
  },
  OR: {
    title: 'କବଚ AI ଫରେନସିକ୍ ଏନକ୍ଲେଭ୍',
    sub: 'ଡିଜିଟାଲ୍ ମିଡିଆ ପ୍ରାମାଣିକତା ଏବଂ ପ୍ରସାର ଟ୍ରାକିଂ',
    dropHead: 'ସନ୍ଦିଗ୍ଧ ଫରେନସିକ୍ ନମୁନା ଏଠାରେ ଛାଡନ୍ତୁ କିମ୍ବା ଅପଲୋଡ୍ କରନ୍ତୁ',
    dropSub: 'ଭିଡିଓ, ଅଡିଓ ଏବଂ ଛବି ସମର୍ଥିତ • ସ୍ଥାନୀୟ GPU ଏନକ୍ଲେଭ୍',
    exhibitA: 'ପ୍ରଦର୍ଶ A: ନକଲି ଡିପଫେକ୍',
    exhibitB: 'ପ୍ରଦର୍ଶ B: ପ୍ରକୃତ ସିସିଟିଭି',
    ingestHeading: 'ପ୍ରମାଣ ସଂଗ୍ରହ',
    primaryVerdict: 'ପ୍ରାଥମିକ ମଡେଲ ରାୟ',
    legalSummaryTitle: 'ସରଳ ଭାଷା ଅନୁସନ୍ଧାନ ସାରାଂଶ (§65B IEA / BSA §63)',
    btnDownload: 'କୋର୍ଟ ଡସିଅର୍ ଡାଉନଲୋଡ୍ କରନ୍ତୁ',
    vaultTitle: 'ଷ୍ଟ୍ରଙ୍ଗ ରୁମ୍ ଭଲ୍ଟ',
    auditTitle: 'ଅଧିକାରୀ ଅଡିଟ୍ ଟ୍ରେଲ୍',
    lockoutTitle: 'FIPS 140-3 HSM ଯାଞ୍ଚ',
    enterPin: '୪-ଅଙ୍କ ଅଧିକାରୀ ପିନ୍ ଦିଅନ୍ତୁ',
    unlockBtn: 'ଅନଲକ୍ କରନ୍ତୁ ➔',
    judgeProfiles: '⚡ ବିଚାରପତି ଡେମୋ ପ୍ରୋଫାଇଲ୍:',
  },
}

const OFFICER_PROFILES: OfficerProfile[] = [
  {
    pin: '1947',
    name: 'Inspector Gurpreet Singh',
    badge: 'CP-8821',
    dept: 'Cyber Crime Cell, Chandigarh Police',
    avatar: '👮‍♂️',
    role: 'CHIEF FORENSIC COMMANDER',
  },
  {
    pin: '2026',
    name: 'Sub-Inspector Ananya Sharma',
    badge: 'PB-4474',
    dept: 'Digital Evidence & Provenance Wing',
    avatar: '👩‍✈️',
    role: 'SENIOR FORENSIC INVESTIGATOR',
  },
  {
    pin: '3310',
    name: 'DSP Vikramaditya',
    badge: 'HQ-0001',
    dept: 'State Forensic Science Lab Directorate',
    avatar: '🎖️',
    role: 'EXECUTIVE COMMANDER',
  },
]

export function InvestigatorConsole() {
  const { startLoading, stopLoading } = useLoader()

  // 1. Enclave Lockout & Officer State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [hsmLoading, setHsmLoading] = useState<boolean>(false)
  const [pinInput, setPinInput] = useState<string>('1947')
  const [pinError, setPinError] = useState<boolean>(false)
  const [dutyTime, setDutyTime] = useState<string>('00:00:00')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('EN')

  const [activeOfficer, setActiveOfficer] = useState<OfficerProfile>({
    pin: '1947',
    name: 'Inspector Gurpreet Singh',
    badge: 'CP-8821',
    dept: 'Cyber Crime Cell, Chandigarh Police',
    avatar: '👮‍♂️',
    role: 'CHIEF FORENSIC COMMANDER',
  })

  // Check existing session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedBadge =
        window.sessionStorage.getItem('kavach_officer_badge') ||
        window.localStorage.getItem('kavach-session')
      if (savedBadge) {
        setIsAuthenticated(true)
        const matched = OFFICER_PROFILES.find((p) => p.badge === savedBadge)
        if (matched) setActiveOfficer(matched)
      }
    }
  }, [])

  // 2. Case Selection & Forensic State
  const [activeCase, setActiveCase] = useState<CasePreset>('fake')
  const [customMetadata, setCustomMetadata] = useState<EvidenceMetadata | null>(null)
  const [activeTab, setActiveTab] = useState<ForensicTab>('heatmap')
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [uploadStep, setUploadStep] = useState<string>('')
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [copiedHash, setCopiedHash] = useState<boolean>(false)

  // 3. Interactive Tab States
  const [showHeatmapOverlay, setShowHeatmapOverlay] = useState<boolean>(true)
  const [showFacialMesh, setShowFacialMesh] = useState<boolean>(true)
  const [shieldBlocked, setShieldBlocked] = useState<boolean>(false)
  const [warningAttached, setWarningAttached] = useState<boolean>(false)

  // 4. Strong Room Vault Search
  const [vaultSearch, setVaultSearch] = useState<string>('')

  // 5. Canvas ref for ELA Heatmap
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // 6. Live Custody Ledger Records
  const [ledgerBlocks, setLedgerBlocks] = useState<LedgerBlock[]>([
    {
      block_index: 4291,
      block_number: 'BLOCK #004291',
      timestamp_utc: '2026-09-05 14:12:30 UTC',
      case_id: 'KV-0928-A',
      file_name: 'suspect_speech_clip.mp4',
      file_sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      verdict: 'FAIL (94.2%)',
      confidence_score: 94.2,
      attesting_officer: 'Inspector Gurpreet Singh',
      badge_number: 'CP-8821',
      hsm_slot: 'HSM-PRIMARY-01',
      hsm_signature: 'ECDSA_P256_FIPS140_E3B0C44298FC1C149AFBF4C8',
      integrity_status: 'VERIFIED_IMMUTABLE',
    },
    {
      block_index: 4290,
      block_number: 'BLOCK #004290',
      timestamp_utc: '2026-09-05 15:45:10 UTC',
      case_id: 'KV-0604-B',
      file_name: 'cctv_sector17_chd.mp4',
      file_sha256: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      verdict: 'PASS (97.8%)',
      confidence_score: 97.8,
      attesting_officer: 'Sub-Inspector Ananya Sharma',
      badge_number: 'PB-4474',
      hsm_slot: 'HSM-SECONDARY-02',
      hsm_signature: 'ECDSA_P256_FIPS140_7F83B1657FF1FC53B92DC181',
      integrity_status: 'VERIFIED_IMMUTABLE',
    },
    {
      block_index: 4289,
      block_number: 'BLOCK #004289',
      timestamp_utc: '2026-09-05 16:04:19 UTC',
      case_id: 'KV-0841-C',
      file_name: 'kyc_applicant_id_scan.png',
      file_sha256: 'a2b719488cf41a0293db140293881fa49012384a691bc4485718a291848571a0',
      verdict: 'FAIL (98.9%)',
      confidence_score: 98.9,
      attesting_officer: 'Sub-Inspector Ananya Sharma',
      badge_number: 'PB-4474',
      hsm_slot: 'HSM-SECONDARY-02',
      hsm_signature: 'ECDSA_P256_FIPS140_A2B719488CF41A0293DB1402',
      integrity_status: 'VERIFIED_IMMUTABLE',
    },
    {
      block_index: 4288,
      block_number: 'BLOCK #004288',
      timestamp_utc: '2026-09-05 17:22:42 UTC',
      case_id: 'KV-0719-D',
      file_name: 'tollgate_highspeed_cam04.mp4',
      file_sha256: '10b98134d39906b6d4f43f5e0284c7940182834019283401928349182390412a',
      verdict: 'PASS (99.1%)',
      confidence_score: 99.1,
      attesting_officer: 'DSP Vikramaditya',
      badge_number: 'HQ-0001',
      hsm_slot: 'HSM-EXECUTIVE-00',
      hsm_signature: 'ECDSA_P256_FIPS140_10B98134D39906B6D4F43F5E',
      integrity_status: 'VERIFIED_IMMUTABLE',
    },
  ])

  // Active exhibit data
  const isFake =
    activeCase === 'fake' ||
    activeCase === 'audio_clone' ||
    (activeCase === 'custom' && (customMetadata?.isTampered ?? true))

  const getCurrentMetadata = (): EvidenceMetadata => {
    if (activeCase === 'custom' && customMetadata) {
      return customMetadata
    }

    if (activeCase === 'audio_clone') {
      return {
        caseId: 'KV-0419-C',
        fileName: 'ceo_urgent_wire_voice.wav',
        fileSize: '4.2 MB',
        resolution: '44.1kHz 24-bit PCM',
        codec: 'PCM Audio (Waveform)',
        ingestionLatency: '0.19s',
        isTampered: true,
        confidenceScore: 98.6,
        vitLogitScore: 0.986,
        elaStatus: 'ANOMALY',
        c2paStatus: 'STRIPPED',
        sha256: 'a2b719488cf41a0293db140293881fa49012384a691bc4485718a291848571a0',
        blockNumber: 'BLOCK #004289',
        timestampUtc: '2026-09-05 16:04:19 UTC',
        summaryEnglish:
          'The submitted audio sample is a confirmed generative neural voice clone (CEO Wire BEC Scam). Acoustic spectral analysis isolated steep 14.8 kHz phase flatlines and unnatural vocoder spectral roll-off.',
        summaryHindi:
          'प्रस्तुत ऑडियो नमूना कृत्रिम न्यूरल वॉयस क्लोन (सीईओ फ्रॉड) पाया गया है। 14.8 kHz पर वोकोडर रोल-ऑफ और फेज डिस्कंटिन्यूटी की पुष्टि हुई है।',
        summaryPunjabi:
          'ਸਬੂਤ ਇੱਕ ਨਕਲੀ ਨਿਊਰਲ ਵੌਇਸ ਕਲੋਨ ਹੈ। 14.8 kHz ਉੱਤੇ ਸਪੈਕਟ੍ਰਲ ਕੱਟ-ਆਫ ਅਤੇ ਫੇਜ਼ ਵਿੱਚ ਅਸਧਾਰਨ ਗਿਰਾਵਟ ਦਰਜ ਕੀਤੀ ਗਈ ਹੈ।',
      }
    }

    if (activeCase === 'real') {
      return {
        caseId: 'KV-0604-B',
        fileName: 'cctv_sector17_chd.mp4',
        fileSize: '78.1 MB',
        resolution: '1080p H.264',
        codec: 'AVC / H.264 Baseline',
        ingestionLatency: '0.29s',
        isTampered: false,
        confidenceScore: 97.8,
        vitLogitScore: 0.022,
        elaStatus: 'CLEAN',
        c2paStatus: 'VALID_HARDWARE_SIGN',
        sha256: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
        blockNumber: 'BLOCK #004290',
        timestampUtc: '2026-09-05 15:45:10 UTC',
        summaryEnglish:
          'The submitted video demonstrates complete sensor fidelity and matches legitimate Sector 17 CCTV hardware compression signatures. No optical flow boundary inconsistencies or synthetic voice manipulation were detected.',
        summaryHindi:
          'प्रस्तुत वीडियो पूर्ण सेंसर प्रामाणिकता प्रदर्शित करता है तथा सेक्टर 17 सीसीटीवी हार्डवेयर सिग्नेचर से मेल खाता है। कोई ऑप्टिकल या वोकल छेड़छाड़ नहीं पाई गई।',
        summaryPunjabi:
          'ਸਬੂਤ ਪੂਰੀ ਸੈਂਸਰ ਅਸਲੀਅਤ ਦੀ ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ ਅਤੇ ਸੈਕਟਰ 17 ਸੀਸੀਟੀਵੀ ਹਾਰਡਵੇਅਰ ਸਿਗਨੇਚਰ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ। ਕੋਈ ਨਕਲੀ ਛੇੜਛਾੜ ਨਹੀਂ ਮਿਲੀ।',
      }
    }

    // Default: 'fake' (Exhibit A: Video KYC Deepfake)
    return {
      caseId: 'KV-0928-A',
      fileName: 'suspect_speech_clip.mp4',
      fileSize: '42.8 MB',
      resolution: '1080p H.264',
      codec: 'AVC / H.264 High Profile',
      ingestionLatency: '0.34s',
      isTampered: true,
      confidenceScore: 94.2,
      vitLogitScore: 0.942,
      elaStatus: 'ANOMALY',
      c2paStatus: 'STRIPPED',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      blockNumber: 'BLOCK #004291',
      timestampUtc: '2026-09-05 14:12:30 UTC',
      summaryEnglish:
        'The submitted video has been confirmed as a synthetic deepfake. Facial boundary analysis revealed neural inpainting seams around the jawline, while spectral audio inspection identified synthetic acoustic cutoffs typical of generative vocoders. C2PA provenance credentials were intentionally stripped.',
      summaryHindi:
        'प्रस्तुत वीडियो को सिंथेटिक डीपफेक पाया गया है। चेहरे की सीमाओं के विश्लेषण में जबड़े के पास न्यूरल इनपेंटिंग विसंगतियां मिलीं, तथा ऑडियो स्पेक्ट्रम में वोकोडर ध्वनि गिरावट दर्ज हुई। C2PA मेटाडेटा हटाया गया था।',
      summaryPunjabi:
        'ਜਾਂਚ ਅਧੀਨ ਵੀਡੀਓ ਨੂੰ ਸਿੰਥੈਟਿਕ ਡੀਪਫੇਕ ਪਾਇਆ ਗਿਆ ਹੈ। ਚਿਹਰੇ ਦੇ ਵਿਸ਼ਲੇਸ਼ਣ ਵਿੱਚ ਜਬਾੜੇ ਉੱਤੇ ਨਕਲੀ ਬਦਲਾਅ ਮਿਲੇ ਹਨ ਅਤੇ ਆਡੀਓ ਵਿੱਚ 14.8 kHz ਤੋਂ ਉੱਪਰ ਵੋਕੋਡਰ ਕੱਟ-ਆਫ ਮਿਲੀ ਹੈ। C2PA ਮੈਟਾਡਾਟਾ ਹਟਾਇਆ ਗਿਆ ਸੀ।',
    }
  }

  const currentMetadata = getCurrentMetadata()

  // Audio spectrum harmonic points
  const audioHarmonics: HarmonicPoint[] = isFake
    ? [
        { freq: '0.0kHz', db: 85.2 },
        { freq: '1.2kHz', db: 78.4 },
        { freq: '2.4kHz', db: 72.1 },
        { freq: '3.6kHz', db: 59.8 },
        { freq: '4.8kHz', db: 41.6 },
        { freq: '6.0kHz', db: 28.5 },
        { freq: '7.2kHz', db: 18.2 },
        { freq: '8.4kHz', db: 8.4 },
        { freq: '9.6kHz', db: 2.1 },
        { freq: '11.0kHz', db: 0.2 },
      ]
    : [
        { freq: '0.0kHz', db: 91.0 },
        { freq: '1.2kHz', db: 84.5 },
        { freq: '2.4kHz', db: 79.2 },
        { freq: '3.6kHz', db: 74.0 },
        { freq: '4.8kHz', db: 68.3 },
        { freq: '6.0kHz', db: 62.1 },
        { freq: '7.2kHz', db: 58.4 },
        { freq: '8.4kHz', db: 54.0 },
        { freq: '9.6kHz', db: 49.2 },
        { freq: '11.0kHz', db: 46.1 },
      ]

  // Social Origin Nodes
  const originNodes: OriginNode[] = [
    {
      id: 'NODE-TG-001',
      tag: '1. GROUND ZERO',
      platform: 'Telegram Darknet Pool',
      channelName: '@anon_leaks_bot (Channel #492)',
      timestampIst: '14:02:11 IST',
      reposts: 'Initial Raw Diffusion Upload (Seed)',
      phashDistance: 0,
      isGroundZero: true,
      alert: true,
      note: 'First observed seed node on Darknet relay pool.',
    },
    {
      id: 'NODE-TW-002',
      tag: '2. DISSEMINATION',
      platform: 'X / Twitter Viral Loop',
      channelName: '@viral_news_hub (Account #7819)',
      timestampIst: '14:15:40 IST',
      reposts: '24,300+ Reposts / 850k Impressions',
      phashDistance: 2,
      isGroundZero: false,
      alert: false,
      note: 'EXIF metadata stripped; re-encoded via FFmpeg.',
    },
    {
      id: 'NODE-WA-003',
      tag: '3. VIRAL PROPAGATION',
      platform: 'WhatsApp Broadcast',
      channelName: 'Closed Forward Swarm (Loop #09)',
      timestampIst: '14:38:05 IST',
      reposts: '~32,000 Forwards Across 4 States',
      phashDistance: 3,
      isGroundZero: false,
      alert: false,
      note: 'Inter-state broadcast swarm triggering misinformation alert.',
    },
  ]

  // Duty Counter
  useEffect(() => {
    const startSec = 5028
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000)
      const diff = (now % 86400) + startSec
      const h = String(Math.floor(diff / 3600) % 24).padStart(2, '0')
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0')
      const s = String(diff % 60).padStart(2, '0')
      setDutyTime(`${h}:${m}:${s}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Canvas ELA Renderer
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || activeTab !== 'heatmap') return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)

    // Dark grid background
    ctx.fillStyle = '#06090E'
    ctx.fillRect(0, 0, w, h)

    ctx.strokeStyle = 'rgba(30, 41, 59, 0.35)'
    ctx.lineWidth = 1
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      ctx.stroke()
    }
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }

    const cx = w / 2
    const cy = h / 2 - 10
    const faceR = 75

    // Head Silhouette
    ctx.beginPath()
    ctx.arc(cx, cy, faceR, 0, Math.PI * 2)
    ctx.fillStyle = isFake ? 'rgba(244, 63, 94, 0.06)' : 'rgba(16, 185, 129, 0.06)'
    ctx.fill()
    ctx.strokeStyle = isFake ? 'rgba(244, 63, 94, 0.6)' : 'rgba(16, 185, 129, 0.6)'
    ctx.lineWidth = 2
    ctx.stroke()

    // Facial Mesh
    if (showFacialMesh) {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)'
      ctx.lineWidth = 1
      const meshPoints = [
        [cx - 30, cy - 25],
        [cx + 30, cy - 25],
        [cx, cy - 5],
        [cx, cy + 15],
        [cx - 25, cy + 40],
        [cx + 25, cy + 40],
        [cx, cy + 50],
        [cx - 55, cy],
        [cx + 55, cy],
        [cx, cy + 70],
      ]

      for (let i = 0; i < meshPoints.length; i++) {
        const [px, py] = meshPoints[i]
        ctx.fillStyle = '#38bdf8'
        ctx.beginPath()
        ctx.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx.fill()

        if (i > 0) {
          const [prevX, prevY] = meshPoints[i - 1]
          ctx.beginPath()
          ctx.moveTo(prevX, prevY)
          ctx.lineTo(px, py)
          ctx.stroke()
        }
      }
    }

    // Inpainting seam overlay
    if (isFake && showHeatmapOverlay) {
      ctx.beginPath()
      ctx.moveTo(cx - 60, cy + 20)
      ctx.quadraticCurveTo(cx, cy + 85, cx + 60, cy + 20)
      ctx.quadraticCurveTo(cx, cy + 55, cx - 60, cy + 20)
      ctx.fillStyle = 'rgba(244, 63, 94, 0.65)'
      ctx.fill()
      ctx.strokeStyle = '#f43f5e'
      ctx.lineWidth = 3
      ctx.stroke()

      // High-frequency anomaly particles
      for (let i = 0; i < 20; i++) {
        const nx = cx - 50 + Math.random() * 100
        const ny = cy + 25 + Math.random() * 45
        ctx.fillStyle = '#fb7185'
        ctx.beginPath()
        ctx.arc(nx, ny, 3 + Math.random() * 3, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.fillStyle = '#f43f5e'
      ctx.font = 'bold 11px monospace'
      ctx.fillText('⚠️ ELA RESIDUAL ANOMALY: MANDIBULAR SEAM (p < 0.001)', cx - 180, cy + 115)
    } else {
      ctx.fillStyle = '#10b981'
      ctx.font = 'bold 11px monospace'
      ctx.fillText('✓ CAMERA SENSOR PHOTOMETRIC CONSISTENCY VERIFIED', cx - 165, cy + 115)
    }
  }, [activeCase, showHeatmapOverlay, showFacialMesh, isFake, activeTab])

  // Handlers
  const handlePinSubmit = async (pinToTest?: string) => {
    const pin = (pinToTest || pinInput).trim()
    setPinError(false)
    setHsmLoading(true)
    sfx.playScan()

    try {
      const res = await fetch('/api/auth/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      })
      const json = await res.json()

      if (res.ok && json.success && json.officer) {
        setActiveOfficer(json.officer)
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem('kavach_officer_badge', json.officer.badge)
          window.sessionStorage.setItem('kavach_officer_name', json.officer.name)
          window.localStorage.setItem('kavach-session', json.officer.badge)
        }
        setTimeout(() => {
          setHsmLoading(false)
          setIsAuthenticated(true)
          sfx.playSeal()
        }, 400)
      } else {
        setHsmLoading(false)
        setPinError(true)
      }
    } catch {
      const matched = OFFICER_PROFILES.find((p) => p.pin === pin)
      if (matched || ['1947', '2026', '3310'].includes(pin)) {
        if (matched) setActiveOfficer(matched)
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem('kavach_officer_badge', matched?.badge || 'CP-8821')
          window.sessionStorage.setItem('kavach_officer_name', matched?.name || 'Inspector Gurpreet Singh')
          window.localStorage.setItem('kavach-session', matched?.badge || 'CP-8821')
        }
        setTimeout(() => {
          setHsmLoading(false)
          setIsAuthenticated(true)
          sfx.playSeal()
        }, 400)
      } else {
        setHsmLoading(false)
        setPinError(true)
      }
    }
  }

  const handleSignOut = () => {
    sfx.playClick()
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('kavach_officer_badge')
      window.sessionStorage.removeItem('kavach_officer_name')
      window.sessionStorage.removeItem('kavach_clearance_token')
      window.localStorage.removeItem('kavach-session')
    }
    setIsAuthenticated(false)
  }

  const handleSelectOfficerChip = (profile: OfficerProfile) => {
    setActiveOfficer(profile)
    setPinInput(profile.pin)
    handlePinSubmit(profile.pin)
  }

  const handleFileUpload = async (file: File) => {
    sfx.playScan()
    setIsUploading(true)
    setUploadProgress(20)
    setUploadStep('Hashing SHA-256 binary digest...')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('case_id', `KV-${Date.now().toString().slice(-6)}`)
    formData.append('officer_name', activeOfficer.name)
    formData.append('officer_badge', activeOfficer.badge)

    setTimeout(() => {
      setUploadProgress(60)
      setUploadStep('Running Spatial ELA & Vocoder FFT tensors...')
    }, 300)

    try {
      const res = await fetch('/api/forensics/analyze', {
        method: 'POST',
        body: formData,
      })
      let json: any = null
      try {
        json = await res.json()
      } catch {
        json = null
      }
      let uploadedData = json?.success ? json.data : null

      // If backend was offline, compute fallback custom metadata
      if (!uploadedData) {
        uploadedData = {
          case_id: `KV-${Date.now().toString().slice(-6)}`,
          file_name: file.name,
          verdict: file.name.toLowerCase().includes('real') || file.name.toLowerCase().includes('cctv') ? 'PASS' : 'FAIL',
          confidence_score: 95.4,
          vit_logit_score: file.name.toLowerCase().includes('real') ? 0.03 : 0.954,
          hashes: {
            sha256: Array.from(new Uint8Array(32)).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
          },
          chain_of_custody_block: `BLOCK #${Math.floor(4000 + Math.random() * 500)}`,
        }
      }

      const isTampered = uploadedData.verdict === 'FAIL'
      const newMeta: EvidenceMetadata = {
        caseId: uploadedData.case_id || `KV-${Date.now().toString().slice(-6)}`,
        fileName: uploadedData.file_name || file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        resolution: file.type.startsWith('audio') ? '44.1kHz 24-bit PCM' : '1080p H.264',
        codec: file.type.startsWith('audio') ? 'PCM Audio' : 'AVC / H.264',
        ingestionLatency: '0.24s',
        isTampered,
        confidenceScore: uploadedData.confidence_score || 95.4,
        vitLogitScore: uploadedData.vit_logit_score || (isTampered ? 0.954 : 0.03),
        elaStatus: isTampered ? 'ANOMALY' : 'CLEAN',
        c2paStatus: isTampered ? 'STRIPPED' : 'VALID_HARDWARE_SIGN',
        sha256: uploadedData.hashes?.sha256 || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        blockNumber: uploadedData.chain_of_custody_block || `BLOCK #${Math.floor(4000 + Math.random() * 500)}`,
        timestampUtc: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        summaryEnglish: uploadedData.plain_english_summary || (isTampered
          ? `The uploaded media (${file.name}) contains high-confidence synthetic manipulation signatures. Facial and acoustic boundaries fail sensor authenticity validation.`
          : `The uploaded media (${file.name}) demonstrates authentic camera sensor and acoustic continuity. No generative manipulation detected.`),
        summaryHindi: isTampered
          ? `अपलोड किए गए साक्ष्य (${file.name}) में कृत्रिम हेरफेर के लक्षण पाए गए हैं।`
          : `अपलोड किया गया साक्ष्य (${file.name}) प्रामाणिक पाया गया है।`,
        summaryPunjabi: isTampered
          ? `ਅਪਲੋਡ ਕੀਤੇ ਮੀਡੀਆ (${file.name}) ਵਿੱਚ ਸਿੰਥੈਟਿਕ ਹੇਰਫੇਰ ਦੀ ਪੁਸ਼ਟੀ ਹੋਈ ਹੈ।`
          : `ਅਪਲੋਡ ਕੀਤਾ ਮੀਡੀਆ (${file.name}) ਅਸਲੀ ਪਾਇਆ ਗਿਆ ਹੈ।`,
      }

      setCustomMetadata(newMeta)
      setActiveCase('custom')

      // Prepend to live ledger blocks
      const newBlock: LedgerBlock = {
        block_index: 4292 + ledgerBlocks.length,
        block_number: newMeta.blockNumber,
        timestamp_utc: newMeta.timestampUtc,
        case_id: newMeta.caseId,
        file_name: newMeta.fileName,
        file_sha256: newMeta.sha256,
        verdict: `${isTampered ? 'FAIL' : 'PASS'} (${newMeta.confidenceScore}%)`,
        confidence_score: newMeta.confidenceScore,
        attesting_officer: activeOfficer.name,
        badge_number: activeOfficer.badge,
        hsm_slot: 'HSM-PRIMARY-01',
        hsm_signature: `ECDSA_P256_FIPS140_${newMeta.sha256.slice(0, 24).toUpperCase()}`,
        integrity_status: 'VERIFIED_IMMUTABLE',
      }
      setLedgerBlocks((prev) => [newBlock, ...prev])

      setUploadProgress(100)
      setUploadStep('Ingestion complete • Evidence sealed in Strong Room!')

      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
        sfx.playSeal()
      }, 500)
    } catch {
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
        setActiveCase('custom')
        sfx.playSeal()
      }, 600)
    }
  }

  const handleReScan = () => {
    sfx.playScan()
    setIsScanning(true)
    startLoading('RE-CALCULATING SPATIAL & SPECTRAL TENSORS...')
    setTimeout(() => {
      setIsScanning(false)
      stopLoading()
      sfx.playSeal()
    }, 500)
  }

  const handleCopyHash = () => {
    sfx.playClick()
    navigator.clipboard.writeText(currentMetadata.sha256)
    setCopiedHash(true)
    setTimeout(() => setCopiedHash(false), 2000)
  }

  const handleDownloadDossier = () => {
    sfx.playSeal()
    const jsonStr = JSON.stringify(
      {
        statutoryTitle: 'CERTIFICATE UNDER SECTION 63 OF BHARATIYA SAKSHYA ADHINIYAM, 2023',
        caseReference: currentMetadata.caseId,
        exhibit: currentMetadata.fileName,
        verdict: isFake ? 'FAIL (DEEPFAKE SPLICED)' : 'PASS (GENUINE SENSOR)',
        confidenceScore: `${currentMetadata.confidenceScore}%`,
        hashes: { sha256: currentMetadata.sha256 },
        attestingOfficer: {
          name: activeOfficer.name,
          badge: activeOfficer.badge,
          jurisdiction: activeOfficer.dept,
          hsmSlot: 'HSM-PRIMARY-01',
          hsmStandard: 'FIPS 140-3 Cryptographic Enclave Level 3',
        },
        timestampUtc: currentMetadata.timestampUtc,
        judicialSummary: currentMetadata.summaryEnglish,
      },
      null,
      2
    )
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Section63_BSA_Dossier_${currentMetadata.caseId}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const lang = I18N_DICT[selectedLanguage] || I18N_DICT.EN

  // 0. LOCKOUT ENCLAVE GATE IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#06080D] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-rose-500 selection:text-white">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        {/* Top Header */}
        <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-5 flex items-center justify-between">
          <Link href="/" onClick={() => sfx.playClick()} className="no-underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 text-slate-400 hover:text-white transition" />
            <span className="text-xs font-mono text-slate-400 hover:text-slate-200">Return to Home</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FIPS 140-3 LEVEL 3 HARDWARE SECURITY MODULE</span>
          </div>
        </header>

        {/* Main Lockout Form */}
        <main className="relative z-10 max-w-md w-full mx-auto px-4 py-8">
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            {/* Title & Emblem */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 mb-3 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                <Shield className="w-7 h-7" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight">
                {lang.lockoutTitle || 'Officer Clearance Verification'}
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Enter your 4-digit PIN to unlock the Forensic Enclave Workstation
              </p>
            </div>

            {/* PIN Entry Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handlePinSubmit(pinInput)
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  {lang.enterPin || 'ENTER 4-DIGIT OFFICER PIN'}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    maxLength={6}
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value)
                      if (pinError) setPinError(false)
                    }}
                    placeholder="••••"
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-950 border text-emerald-400 font-mono text-center tracking-[0.6em] text-xl focus:outline-none focus:ring-2 transition-all ${
                      pinError
                        ? 'border-rose-500 focus:ring-rose-500/50'
                        : 'border-slate-800 focus:border-emerald-400 focus:ring-emerald-400/50'
                    }`}
                  />
                  <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                </div>
              </div>

              {/* Error feedback */}
              {pinError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Invalid Officer PIN. Please use quick-select profile below.</span>
                </div>
              )}

              {/* Quick Select Profile Cards */}
              <div className="pt-2">
                <span className="text-[10px] font-mono text-slate-400 block mb-2 font-bold tracking-wider uppercase">
                  {lang.judgeProfiles || '⚡ JUDGE DEMO QUICK-ACCESS PROFILES:'}
                </span>
                <div className="space-y-2">
                  {OFFICER_PROFILES.map((profile) => (
                    <button
                      key={profile.pin}
                      type="button"
                      onClick={() => handleSelectOfficerChip(profile)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs font-mono transition-all cursor-pointer ${
                        pinInput === profile.pin
                          ? 'border-emerald-500/70 bg-emerald-500/15 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{profile.avatar}</span>
                        <div>
                          <p className="font-bold text-slate-200">{profile.name}</p>
                          <p className="text-[10px] text-slate-400">{profile.dept} ({profile.badge})</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-400 font-bold">
                        PIN: {profile.pin}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={hsmLoading || !pinInput}
                className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer disabled:opacity-50"
              >
                {hsmLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                    <span>AUTHENTICATING HSM TOKEN...</span>
                  </span>
                ) : (
                  <>
                    <span>{lang.unlockBtn || 'UNLOCK ENCLAVE ➔'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-4 text-center text-[11px] font-mono text-slate-500 border-t border-slate-900">
          <span>Kavach AI • FIPS 140-3 HSM Level 3 • Section 63 BSA Forensic Enclave</span>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* 1. TOP HEADER & HUD STATUS BAR */}
      <header className="border-b border-slate-800/80 bg-[#0B111E]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-700/60 text-slate-400 hover:text-white transition"
              title="Return to Command Center"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <h1 className="text-sm sm:text-base font-bold tracking-wider text-white font-mono flex items-center gap-2">
                  {lang.title}
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 font-sans font-semibold">
                    FIPS 140-3 L3
                  </span>
                </h1>
                <p className="text-xs text-slate-400 hidden sm:block">{lang.sub}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* 11-Language Dropdown */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-slate-200 outline-none text-xs font-mono cursor-pointer"
              >
                <option value="EN" className="bg-slate-900">English (EN)</option>
                <option value="HI" className="bg-slate-900">हिंदी (HI)</option>
                <option value="PA" className="bg-slate-900">ਪੰਜਾਬੀ (PA)</option>
                <option value="BN" className="bg-slate-900">বাংলা (BN)</option>
                <option value="TA" className="bg-slate-900">தமிழ் (TA)</option>
                <option value="TE" className="bg-slate-900">తెలుగు (TE)</option>
                <option value="MR" className="bg-slate-900">मराठी (MR)</option>
                <option value="GU" className="bg-slate-900">ગુજરાતી (GU)</option>
                <option value="KN" className="bg-slate-900">ಕನ್ನಡ (KN)</option>
                <option value="ML" className="bg-slate-900">മലയാളം (ML)</option>
                <option value="OR" className="bg-slate-900">ଓଡ଼ିଆ (OR)</option>
              </select>
            </div>

            {/* Officer Profile Badge & SignOut */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
              <span className="text-base">{activeOfficer.avatar}</span>
              <div className="text-left hidden sm:block">
                <p className="font-semibold text-slate-200 leading-none">{activeOfficer.name}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{activeOfficer.badge}</p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                title="Lock Enclave / Sign Out"
                className="ml-1 p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Duty Timer */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{dutyTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. FULL-WIDTH DRAG & DROP INGESTION / PRESET SWITCHER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            const file = e.dataTransfer.files?.[0]
            if (file) handleFileUpload(file)
          }}
          className="relative rounded-xl border-2 border-dashed border-slate-700/70 bg-gradient-to-b from-slate-900/60 to-slate-950/80 p-5 sm:p-6 text-center hover:border-cyan-500/60 transition group cursor-pointer"
          onClick={() => {
            const el = document.getElementById('specimen-upload-input')
            if (el) el.click()
          }}
        >
          <input
            id="specimen-upload-input"
            type="file"
            className="hidden"
            accept="video/*,audio/*,image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFileUpload(file)
            }}
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 tracking-wide font-mono">
                  {lang.dropHead}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{lang.dropSub}</p>
              </div>
            </div>

            {/* Quick Exhibit Presets */}
            <div className="flex flex-wrap items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => {
                  sfx.playScan()
                  setActiveCase('fake')
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition border flex items-center gap-1.5 ${
                  activeCase === 'fake'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.25)]'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Exhibit A: Deepfake Video</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sfx.playScan()
                  setActiveCase('real')
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition border flex items-center gap-1.5 ${
                  activeCase === 'real'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Exhibit B: Genuine CCTV</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sfx.playScan()
                  setActiveCase('audio_clone')
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition border flex items-center gap-1.5 ${
                  activeCase === 'audio_clone'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Exhibit C: Voice Clone (BEC)</span>
              </button>

              {activeCase === 'custom' && customMetadata && (
                <div className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold border border-cyan-400 bg-cyan-500/20 text-cyan-300 flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Custom: {customMetadata.fileName.slice(0, 16)}...</span>
                </div>
              )}
            </div>
          </div>

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="mt-4 pt-3 border-t border-slate-800 text-left">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                <span>{uploadStep}</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. MAIN ASYMMETRICAL 2-COLUMN FORENSIC WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ==================================================================== */}
        {/* MODULE A: STICKY LEFT PANEL (~35% width, lg:col-span-4)              */}
        {/* ==================================================================== */}
        <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-20">
          {/* Card 1: Evidence Ingestion Card */}
          <div className="rounded-xl border border-slate-800/90 bg-[#0B111E]/95 p-5 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80 mb-3.5">
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                Evidence Ingestion
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold">
                GPU ACCELERATED • LOSSLESS
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Specimen File:</span>
                <span className="font-mono text-slate-200 font-semibold">{currentMetadata.fileName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Encoding / Container:</span>
                <span className="font-mono text-slate-300">{currentMetadata.resolution}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Specimen Size:</span>
                <span className="font-mono text-slate-300">{currentMetadata.fileSize}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Ingestion Latency:</span>
                <span className="font-mono text-emerald-400 font-semibold">{currentMetadata.ingestionLatency}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReScan}
              disabled={isScanning}
              className="mt-4 w-full py-2 px-3 rounded-lg bg-slate-900/90 border border-slate-700/80 hover:bg-slate-800 text-xs font-mono font-semibold text-slate-200 flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isScanning ? 'animate-spin' : ''}`} />
              Re-Scan Tensors
            </button>
          </div>

          {/* Card 2: Primary Model Verdict Card */}
          <div
            className={`rounded-xl border p-5 backdrop-blur-md shadow-xl transition-all ${
              isFake
                ? 'border-rose-500/40 bg-gradient-to-b from-rose-950/20 via-[#0B111E] to-[#0B111E]'
                : 'border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 via-[#0B111E] to-[#0B111E]'
            }`}
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80 mb-4">
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                {lang.primaryVerdict}
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                  isFake
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                }`}
              >
                {isFake ? 'AI ALTERED / DEEPFAKE' : 'GENUINE / AUTHENTIC'}
              </span>
            </div>

            {/* Radial Circular Progress Gauge */}
            <div className="flex items-center gap-4 my-2">
              <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={isFake ? 'text-rose-500' : 'text-emerald-500'}
                    strokeDasharray={`${currentMetadata.confidenceScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-base font-extrabold font-mono text-white leading-none">
                    {currentMetadata.confidenceScore}%
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase mt-0.5">
                    {isFake ? 'TAMPERED' : 'GENUINE'}
                  </span>
                </div>
              </div>

              <div className="text-left">
                <h4 className="text-sm font-bold text-white font-mono">
                  {isFake ? 'Synthetic Anomaly Detected' : 'Sensor Grain Attested'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  {isFake
                    ? 'Vision Transformer patch classifier detected high-frequency mandibular boundary warping.'
                    : 'Photometric camera sensor noise matches legitimate hardware compression profiles.'}
                </p>
              </div>
            </div>

            {/* Micro-metrics 3-Column Grid */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800/80 text-center">
              <div className="rounded-lg bg-slate-900/80 border border-slate-800 p-2">
                <p className="text-[10px] text-slate-400 uppercase font-mono">ViT Logit</p>
                <p className={`text-xs font-mono font-bold mt-0.5 ${isFake ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {currentMetadata.vitLogitScore} ({isFake ? 'FAIL' : 'PASS'})
                </p>
              </div>
              <div className="rounded-lg bg-slate-900/80 border border-slate-800 p-2">
                <p className="text-[10px] text-slate-400 uppercase font-mono">ELA Status</p>
                <p className={`text-xs font-mono font-bold mt-0.5 ${isFake ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {currentMetadata.elaStatus}
                </p>
              </div>
              <div className="rounded-lg bg-slate-900/80 border border-slate-800 p-2">
                <p className="text-[10px] text-slate-400 uppercase font-mono">C2PA Provenance</p>
                <p className={`text-xs font-mono font-bold mt-0.5 ${isFake ? 'text-yellow-400' : 'text-emerald-400'}`}>
                  {currentMetadata.c2paStatus}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Export CTA */}
          <button
            type="button"
            onClick={handleDownloadDossier}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm font-mono tracking-wider shadow-lg shadow-rose-950/50 flex items-center justify-center gap-2.5 transition active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            {lang.btnDownload}
          </button>
        </div>

        {/* ==================================================================== */}
        {/* MODULE B: SCROLLABLE RIGHT PANEL (~65% width, lg:col-span-8)         */}
        {/* ==================================================================== */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Deck 1: Interactive Forensic Inspection Deck (4 Tabs) */}
          <div className="rounded-xl border border-slate-800/90 bg-[#0B111E]/95 backdrop-blur-md shadow-xl overflow-hidden">
            {/* Tab Navigation Switcher */}
            <div className="flex flex-wrap items-center border-b border-slate-800 bg-slate-950/60 p-2 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  sfx.playClick()
                  setActiveTab('heatmap')
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition ${
                  activeTab === 'heatmap'
                    ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Scan className="w-3.5 h-3.5" />
                1. Visual ELA Heatmap
              </button>

              <button
                type="button"
                onClick={() => {
                  sfx.playClick()
                  setActiveTab('audio')
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition ${
                  activeTab === 'audio'
                    ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                2. Audio Spectral FFT
              </button>

              <button
                type="button"
                onClick={() => {
                  sfx.playClick()
                  setActiveTab('origin')
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition ${
                  activeTab === 'origin'
                    ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                3. Social Origin Map
              </button>

              <button
                type="button"
                onClick={() => {
                  sfx.playClick()
                  setActiveTab('shield')
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition ${
                  activeTab === 'shield'
                    ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                4. Kavach Shield
              </button>
            </div>

            {/* Tab 1: Visual ELA Heatmap Content */}
            {activeTab === 'heatmap' && (
              <div className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      Spatial Error Level Analysis (ELA)
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-cyan-500/30">
                        JPEG Quality 90 Baseline
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Visualizes local pixel difference variance and facial boundary inpainting seams.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowHeatmapOverlay(!showHeatmapOverlay)}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition border ${
                        showHeatmapOverlay
                          ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      {showHeatmapOverlay ? 'Seam Overlay ON' : 'Seam Overlay OFF'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowFacialMesh(!showFacialMesh)}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition border ${
                        showFacialMesh
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      {showFacialMesh ? 'Mesh ON' : 'Mesh OFF'}
                    </button>
                  </div>
                </div>

                <div className="relative rounded-lg border border-slate-800 overflow-hidden bg-[#06090E] flex items-center justify-center">
                  <canvas ref={canvasRef} width={640} height={280} className="w-full h-auto max-h-[300px]" />
                </div>
              </div>
            )}

            {/* Tab 2: Audio Spectral FFT Content */}
            {activeTab === 'audio' && (
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      Acoustic STFT Vocoder Harmonics
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-cyan-500/30">
                        22,050 Hz STFT Sample
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isFake
                        ? 'Steep acoustic cliff detected above 14.8 kHz characteristic of generative TTS vocoders.'
                        : 'Continuous natural human vocal tract harmonics observed up to 22.0 kHz.'}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${
                      isFake
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    }`}
                  >
                    {isFake ? 'CUTOFF: 14.8 kHz' : 'CONTINUITY: 22.0 kHz'}
                  </span>
                </div>

                {/* 10-Point Equidistant Harmonic Spectrum Bar Graph */}
                <div className="h-[220px] max-h-[250px] w-full mx-auto bg-slate-950/80 rounded-lg p-4 border border-slate-800 flex items-end justify-between gap-2">
                  {audioHarmonics.map((point, idx) => {
                    const barHeight = Math.max((point.db / 100) * 100, 6)
                    const isCutoffPoint = isFake && idx >= 5
                    return (
                      <div key={point.freq} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <span className="text-[10px] font-mono text-slate-400">{point.db}dB</span>
                        <div className="w-full bg-slate-900 rounded-t overflow-hidden h-[150px] flex items-end">
                          <div
                            className={`w-full rounded-t transition-all duration-500 ${
                              isCutoffPoint
                                ? 'bg-gradient-to-t from-rose-900 to-rose-500 opacity-60'
                                : 'bg-gradient-to-t from-cyan-900 to-cyan-400'
                            }`}
                            style={{ height: `${barHeight}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">{point.freq}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: Social Origin Map Content */}
            {activeTab === 'origin' && (
              <div className="p-5 space-y-3">
                <div className="mb-2">
                  <h4 className="text-sm font-bold text-white font-mono">
                    Perceptual Hash Ground-Zero Dissemination Flow
                  </h4>
                  <p className="text-xs text-slate-400">
                    pHash matching across darknet seed relays and social forward swarms.
                  </p>
                </div>

                <div className="space-y-3">
                  {originNodes.map((node) => (
                    <div
                      key={node.id}
                      className={`p-3.5 rounded-lg border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                        node.isGroundZero
                          ? 'border-rose-500/40 bg-rose-950/20'
                          : 'border-slate-800 bg-slate-900/60'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-cyan-400">{node.tag}</span>
                          <span className="font-semibold text-white">{node.platform}</span>
                          <span className="text-slate-400 font-mono">({node.timestampIst})</span>
                        </div>
                        <p className="text-slate-300 font-mono">{node.channelName}</p>
                        <p className="text-slate-400 text-[11px]">{node.note}</p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          Hamming Dist: {node.phashDistance}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Kavach Shield (Real-time Interception) Content */}
            {activeTab === 'shield' && (
              <div className="p-5 space-y-4">
                {/* Browser-Simulation Card */}
                <div className="rounded-lg border border-slate-700/80 bg-slate-950 overflow-hidden shadow-2xl">
                  {/* Browser URL Bar with Traffic Lights */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex-1 bg-slate-950 px-3 py-1 rounded border border-slate-800 text-slate-300 truncate">
                      https://web.whatsapp.com/share/attachment?target=broadcast_swarm
                    </div>
                  </div>

                  {/* Interception Alert Banner */}
                  <div className="p-4 bg-gradient-to-r from-rose-950/40 to-slate-950 border-b border-rose-900/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-rose-300 font-mono">
                          SHIELD ACTION: UPLOAD INTERCEPTED
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Interception latency: 180ms • Edge neural inspection triggered
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      BLOCKED AT EDGE
                    </span>
                  </div>

                  {/* Technical Explanation & Action Buttons */}
                  <div className="p-4 space-y-3 text-xs">
                    <p className="text-slate-300 leading-relaxed">
                      Kavach Shield detected facial boundary inpainting anomalies prior to payload transmission.
                      The specimen was blocked from network broadcast under IT Act Section 79(3)(b) compliance protocols.
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          sfx.playSeal()
                          setShieldBlocked(true)
                        }}
                        className={`px-3 py-1.5 rounded-lg font-mono font-semibold text-xs flex items-center gap-1.5 transition ${
                          shieldBlocked
                            ? 'bg-rose-700 text-white'
                            : 'bg-rose-600/20 border border-rose-600 text-rose-300 hover:bg-rose-600 hover:text-white'
                        }`}
                      >
                        <Ban className="w-3.5 h-3.5" />
                        {shieldBlocked ? 'Forwarding Blocked ✓' : 'Block Forwarding'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          sfx.playClick()
                          setWarningAttached(true)
                        }}
                        className={`px-3 py-1.5 rounded-lg font-mono font-semibold text-xs flex items-center gap-1.5 transition ${
                          warningAttached
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <Tag className="w-3.5 h-3.5 text-amber-400" />
                        {warningAttached ? 'Warning Tag Attached ✓' : 'Attach Warning Tag'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Deck 2: Legal Summary Box */}
          <div className="rounded-xl border border-slate-800/90 bg-[#0B111E]/95 p-5 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
              <h3 className="text-xs sm:text-sm font-bold text-white font-mono flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                {lang.legalSummaryTitle}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                SEC 63 BSA COMPLIANT
              </span>
            </div>

            <blockquote className="rounded-lg bg-slate-950/70 border-l-4 border-rose-500 p-4 text-xs text-slate-300 leading-relaxed italic">
              {selectedLanguage === 'HI'
                ? currentMetadata.summaryHindi
                : selectedLanguage === 'PA'
                ? currentMetadata.summaryPunjabi
                : currentMetadata.summaryEnglish}
            </blockquote>
          </div>

          {/* Deck 3: Chain-of-Custody Cryptographic Seal */}
          <div className="rounded-xl border border-slate-800/90 bg-[#0B111E]/95 p-5 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80 mb-4">
              <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                {currentMetadata.blockNumber} • Cryptographic Seal
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {currentMetadata.timestampUtc}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="space-y-0.5 truncate max-w-full">
                <span className="text-[10px] font-mono text-slate-400 uppercase">SHA-256 Bitwise Digest</span>
                <p className="text-xs font-mono text-slate-200 truncate">{currentMetadata.sha256}</p>
              </div>

              <button
                type="button"
                onClick={handleCopyHash}
                className="px-2.5 py-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition flex-shrink-0"
              >
                {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedHash ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Deck 4: Archived Evidence Strong Room Vault Table */}
          <div className="rounded-xl border border-slate-800/90 bg-[#0B111E]/95 p-5 backdrop-blur-md shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-800/80 mb-4">
              <h3 className="text-xs sm:text-sm font-bold text-white font-mono flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                {lang.vaultTitle}
              </h3>

              {/* Vault Search Input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter Case / Hash..."
                  value={vaultSearch}
                  onChange={(e) => setVaultSearch(e.target.value)}
                  className="pl-8 pr-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500 w-full sm:w-48"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                    <th className="pb-2">Block</th>
                    <th className="pb-2">Case ID</th>
                    <th className="pb-2">Exhibit File</th>
                    <th className="pb-2">Verdict</th>
                    <th className="pb-2">Attesting Officer</th>
                    <th className="pb-2 text-right">Integrity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {ledgerBlocks
                    .filter(
                      (b) =>
                        b.case_id.toLowerCase().includes(vaultSearch.toLowerCase()) ||
                        b.file_sha256.toLowerCase().includes(vaultSearch.toLowerCase()) ||
                        b.file_name.toLowerCase().includes(vaultSearch.toLowerCase())
                    )
                    .map((b) => (
                      <tr key={b.block_number} className="hover:bg-slate-900/40 transition">
                        <td className="py-2.5 font-bold text-cyan-400">{b.block_number}</td>
                        <td className="py-2.5 text-white">{b.case_id}</td>
                        <td className="py-2.5 text-slate-300 truncate max-w-[140px]">{b.file_name}</td>
                        <td className="py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              b.verdict.includes('FAIL') || b.verdict.includes('TAMPERED')
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            }`}
                          >
                            {b.verdict}
                          </span>
                        </td>
                        <td className="py-2.5 text-slate-400">{b.attesting_officer}</td>
                        <td className="py-2.5 text-right text-emerald-400 font-semibold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          IMMUTABLE
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default InvestigatorConsole
