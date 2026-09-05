'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'en' | 'hi' | 'es'

export interface I18nDictionary {
  nav: {
    analysis: string
    ledger: string
    sentinel: string
    docs: string
    signIn: string
    signOut: string
    status: string
  }
  hero: {
    badge: string
    titlePart1: string
    titlePart2: string
    description: string
    ctaPrimary: string
    ctaSecondary: string
    statTemporal: string
    statTemporalSub: string
    statLatency: string
    statLatencySub: string
    statCustody: string
    statCustodySub: string
    statStandard: string
    statStandardSub: string
  }
  workspace: {
    ingestionTitle: string
    ingestionDesc: string
    threatTitle: string
    threatScore: string
    threatLevel: string
    threatDetail: string
    telemetryTitle: string
    ledgerTitle: string
    blockNumber: string
    sealedStatus: string
    merkleRoot: string
    timestamp: string
    copyHash: string
    copied: string
    exportDossier: string
    dropzoneTitle: string
    dropzoneSub: string
    auditBtn: string
    auditingBtn: string
    clearBtn: string
  }
  evidence: {
    sectionTitle: string
    sectionDesc: string
    comparisonTitle: string
    rawBadge: string
    elaBadge: string
    meshTitle: string
    meshSub: string
    temporalTitle: string
    topologyTitle: string
    enclaveTitle: string
    zoomBtn: string
  }
  pipeline: {
    sectionTitle: string
    sectionDesc: string
  }
  contract: {
    sectionTitle: string
    sectionDesc: string
    sealText: string
  }
}

export const translations: Record<Language, I18nDictionary> = {
  en: {
    nav: {
      analysis: 'Live Analysis',
      ledger: 'Ledger Vault',
      sentinel: 'Sentinel Monitoring',
      docs: 'Documentation',
      signIn: 'Analyst Login',
      signOut: 'Sign Out',
      status: 'System Active: Secure',
    },
    hero: {
      badge: 'Kavach Deepfake Defense Engine',
      titlePart1: 'Deterministic Media Verification',
      titlePart2: 'Cryptographic Provenance Chain',
      description:
        'Verify digital video, audio, and images against deepfake manipulation. Every audit generates mathematically verified proofs and tamper-proof custody records.',
      ctaPrimary: 'Start Media Analysis',
      ctaSecondary: 'Inspect Evidence Lab',
      statTemporal: '18-Frame',
      statTemporalSub: 'Temporal Lattice',
      statLatency: '0.04 ms',
      statLatencySub: 'Inference Latency',
      statCustody: 'SHA-256',
      statCustodySub: 'Sealed Ledger',
      statStandard: 'ISO/IEC 27037',
      statStandardSub: 'Court Compliant',
    },
    workspace: {
      ingestionTitle: 'Media Upload & Verification',
      ingestionDesc: 'Upload video, audio, or image evidence for multi-layer neural inspection.',
      threatTitle: 'Risk Assessment',
      threatScore: 'Anomaly Score',
      threatLevel: 'High Risk Detected',
      threatDetail: 'Neural residual signals detect generative diffusion alterations across facial keyframes.',
      telemetryTitle: 'Signal Telemetry Matrix',
      ledgerTitle: 'Cryptographic Ledger Vault',
      blockNumber: 'Block Record',
      sealedStatus: 'Cryptographically Sealed',
      merkleRoot: 'Merkle Root',
      timestamp: 'Logged UTC',
      copyHash: 'Copy Hash',
      copied: 'Hash Copied',
      exportDossier: 'Export Certified Court Dossier',
      dropzoneTitle: 'Drag & Drop Media Evidence Here',
      dropzoneSub: 'Supports MP4, MOV, WAV, FLAC, PNG, JPEG up to 500MB',
      auditBtn: 'Run Neural Verification',
      auditingBtn: 'Analyzing Media Keyframes...',
      clearBtn: 'Clear Asset',
    },
    evidence: {
      sectionTitle: 'Forensic Evidence Lab',
      sectionDesc: 'Inspect raw evidence alongside neural error level heatmaps and 3D biometric landmarks.',
      comparisonTitle: 'Error Level Analysis (ELA) Lens',
      rawBadge: 'Authentic Baseline Capture',
      elaBadge: 'Synthetic Residual Heatmap',
      meshTitle: '3D Biometric Facial Scanner',
      meshSub: 'Tracking 68 standardized biometric landmarks for sub-pixel boundary drift.',
      temporalTitle: 'Spatial-Temporal Motion Lattice',
      topologyTitle: 'Dissemination Network Topology',
      enclaveTitle: 'Hardware Security Enclave',
      zoomBtn: '1.5x Lens Zoom',
    },
    pipeline: {
      sectionTitle: 'Verification Pipeline Architecture',
      sectionDesc: 'Deterministic multi-stage pipeline designed for legal admissibility and auditability.',
    },
    contract: {
      sectionTitle: 'Certified Forensic Dossier Standards',
      sectionDesc: 'All reports adhere to strict ISO/IEC 27037 digital evidence preservation requirements.',
      sealText: 'ISO/IEC 27037 Certified',
    },
  },
  hi: {
    nav: {
      analysis: 'लाइव विश्लेषण',
      ledger: 'लेज़र वॉल्ट',
      sentinel: 'निगरानी प्रणाली',
      docs: 'दस्तावेज़',
      signIn: 'विश्लेषक लॉगिन',
      signOut: 'लॉग आउट',
      status: 'प्रणाली स्थिति: सुरक्षित',
    },
    hero: {
      badge: 'कवच डीपफेक सुरक्षा इंजन',
      titlePart1: 'सटीक मीडिया सत्यापन प्रणाली',
      titlePart2: 'क्रिप्टोग्राफिक साक्ष्य श्रृंखला',
      description:
        'डिजिटल वीडियो, ऑडियो और छवियों की प्रामाणिकता की पुष्टि करें। प्रत्येक विश्लेषण कानूनी रूप से मान्य और सुरक्षित साक्ष्य रिकॉर्ड उत्पन्न करता है।',
      ctaPrimary: 'जांच शुरू करें',
      ctaSecondary: 'साक्ष्य प्रयोगशाला देखें',
      statTemporal: '18-फ्रेम',
      statTemporalSub: 'टेम्पोरल विश्लेषण',
      statLatency: '0.04 ms',
      statLatencySub: 'प्रसंस्करण गति',
      statCustody: 'SHA-256',
      statCustodySub: 'सील लेज़र',
      statStandard: 'ISO/IEC 27037',
      statStandardSub: 'न्यायालय अनुरूप',
    },
    workspace: {
      ingestionTitle: 'मीडिया अपलोड और सत्यापन',
      ingestionDesc: 'बहु-स्तरीय तंत्रिका विश्लेषण के लिए वीडियो, ऑडियो या छवि अपलोड करें।',
      threatTitle: 'जोखिम मूल्यांकन',
      threatScore: 'विसंगति स्कोर',
      threatLevel: 'उच्च जोखिम का पता चला',
      threatDetail: 'चेहरे के प्रमुख बिंदुओं पर कृत्रिम हेरफेर के संकेत मिले हैं।',
      telemetryTitle: 'सिग्नल टेलीमेट्री मैट्रिक्स',
      ledgerTitle: 'क्रिप्टोग्राफिक लेज़र वॉल्ट',
      blockNumber: 'ब्लॉक रिकॉर्ड',
      sealedStatus: 'क्रिप्टोग्राफिक रूप से सील',
      merkleRoot: 'मर्कल रूट',
      timestamp: 'समय UTC',
      copyHash: 'हैश कॉपी करें',
      copied: 'हैश कॉपी हो गया',
      exportDossier: 'प्रमाणित कोर्ट रिपोर्ट डाउनलोड करें',
      dropzoneTitle: 'मीडिया साक्ष्य यहाँ खींचें और छोड़ें',
      dropzoneSub: 'MP4, MOV, WAV, FLAC, PNG, JPEG (500MB तक)',
      auditBtn: 'सत्यापन शुरू करें',
      auditingBtn: 'विश्लेषण जारी है...',
      clearBtn: 'रीसेट करें',
    },
    evidence: {
      sectionTitle: 'डिजिटल साक्ष्य प्रयोगशाला',
      sectionDesc: 'मूल साक्ष्य और कृत्रिम ताप मानचित्र की तुलना करें।',
      comparisonTitle: 'त्रुटि स्तर विश्लेषण (ELA) लेंस',
      rawBadge: 'मूल प्रामाणिक छवि',
      elaBadge: 'कृत्रिम विसंगति हीटमैप',
      meshTitle: '3D बायोमेट्रिक फेशियल स्कैनर',
      meshSub: 'चेहरे के 68 बायोमेट्रिक बिंदुओं पर सूक्ष्म विचलन की निगरानी।',
      temporalTitle: 'स्थानिक-कालिक गति जालक',
      topologyTitle: 'प्रसार नेटवर्क टोपोलॉजी',
      enclaveTitle: 'हार्डवेयर सुरक्षा एन्क्लेव',
      zoomBtn: '1.5x लेंस ज़ूम',
    },
    pipeline: {
      sectionTitle: 'सत्यापन पाइपलाइन वास्तुकला',
      sectionDesc: 'कानूनी रूप से स्वीकार्य और पारदर्शी बहु-चरणीय सत्यापन प्रक्रिया।',
    },
    contract: {
      sectionTitle: 'प्रमाणित फॉरेंसिक दस्तावेज़ मानक',
      sectionDesc: 'सभी रिपोर्ट ISO/IEC 27037 डिजिटल साक्ष्य संरक्षण मानकों के अनुरूप हैं।',
      sealText: 'ISO/IEC 27037 प्रमाणित',
    },
  },
  es: {
    nav: {
      analysis: 'Análisis en Vivo',
      ledger: 'Bóveda Criptográfica',
      sentinel: 'Monitoreo Sentinel',
      docs: 'Documentación',
      signIn: 'Acceso Analista',
      signOut: 'Cerrar Sesión',
      status: 'Sistema: Seguro',
    },
    hero: {
      badge: 'Motor de Defensa contra Deepfakes',
      titlePart1: 'Verificación Determinista de Medios',
      titlePart2: 'Cadena de Custodia Criptográfica',
      description:
        'Verifique videos, audios e imágenes contra manipulaciones sintéticas con registros forenses admisibles en tribunales.',
      ctaPrimary: 'Iniciar Investigación',
      ctaSecondary: 'Inspeccionar Laboratorio',
      statTemporal: '18 Cuadros',
      statTemporalSub: 'Malla Temporal',
      statLatency: '0.04 ms',
      statLatencySub: 'Latencia de Inferencia',
      statCustody: 'SHA-256',
      statCustodySub: 'Registro Sellado',
      statStandard: 'ISO/IEC 27037',
      statStandardSub: 'Conforme a Ley',
    },
    workspace: {
      ingestionTitle: 'Carga y Verificación de Medios',
      ingestionDesc: 'Cargue evidencia multimedia para una inspección neuronal exhaustiva.',
      threatTitle: 'Evaluación de Amenazas',
      threatScore: 'Puntuación de Anomalía',
      threatLevel: 'Alto Riesgo Detectado',
      threatDetail: 'Se detectaron patrones de difusión sintética en los fotogramas faciales.',
      telemetryTitle: 'Matriz de Telemetría',
      ledgerTitle: 'Bóveda de Registro Criptográfico',
      blockNumber: 'Número de Bloque',
      sealedStatus: 'Sellado Criptográficamente',
      merkleRoot: 'Raíz de Merkle',
      timestamp: 'Hora UTC',
      copyHash: 'Copiar Hash',
      copied: 'Hash Copiado',
      exportDossier: 'Exportar Informe Forense Judicial',
      dropzoneTitle: 'Arrastre y Suelte Evidencia Aquí',
      dropzoneSub: 'Soporta MP4, MOV, WAV, FLAC, PNG, JPEG hasta 500MB',
      auditBtn: 'Ejecutar Verificación',
      auditingBtn: 'Analizando Fotogramas...',
      clearBtn: 'Limpiar',
    },
    evidence: {
      sectionTitle: 'Laboratorio de Evidencia Forense',
      sectionDesc: 'Compare la evidencia original con mapas térmicos de error residual.',
      comparisonTitle: 'Lente de Análisis de Nivel de Error (ELA)',
      rawBadge: 'Captura Base Original',
      elaBadge: 'Mapa Térmico Residual',
      meshTitle: 'Escáner Facial Biométrico 3D',
      meshSub: 'Rastreo de 68 puntos faciales para detectar desviaciones sub-pixel.',
      temporalTitle: 'Malla de Movimiento Temporal',
      topologyTitle: 'Topología de Red y Difusión',
      enclaveTitle: 'Enclave Seguro de Hardware',
      zoomBtn: 'Zoom de Lente 1.5x',
    },
    pipeline: {
      sectionTitle: 'Arquitectura del Pipeline Forense',
      sectionDesc: 'Proceso determinista de múltiples fases con validez jurídica.',
    },
    contract: {
      sectionTitle: 'Estándares del Expediente Forense',
      sectionDesc: 'Todos los informes cumplen con la norma ISO/IEC 27037 de preservación digital.',
      sealText: 'Certificado ISO/IEC 27037',
    },
  },
}

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: I18nDictionary
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('kavach-lang') as Language
    if (saved && translations[saved]) {
      setLangState(saved)
    }
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('kavach-lang', newLang)
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
