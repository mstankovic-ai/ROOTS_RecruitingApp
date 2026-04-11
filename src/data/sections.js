/**
 * SECTIONS – the complete interview structure for both rounds.
 * Erstgespräch: 9 blocks, Zweitgespräch: 7 blocks.
 * Every question has a stable ID so state keys never shift.
 */

import { SELBSTVORSTELLUNG_CHECKS } from './templates';

const CASE_A =
  'Ein etablierter Konsumgüterhersteller in Deutschland bemerkt, dass der Absatz ihrer Kernmarke in den letzten 2 Jahren um 15\u00A0% gesunken ist – trotz nach wie vor starker Markenposition (Top-3 in Zielgruppe). Das Management ist ratlos und fragt uns um Rat.\n\nWas würdest Du als ersten Schritt empfehlen, um das Problem zu diagnostizieren und welche zwei strategischen Optionen würdest Du in einer Kurzanalyse prüfen wollen?';

const CASE_B =
  'Ein großer deutscher Lebensmitteleinzelhändler betreibt eine Fashion-Eigenmarke. Die Marke ist stark mit Damenmode assoziiert, günstig positioniert und in Filialen präsent. Der Abverkauf erfolgt über Wühltische und Aktionsständer, die sich strukturell nicht ändern werden.\n\nOnline ist die Marke ausschließlich über die Händlerseite vertreten. Dort herrscht wenig Markenpräsenz und reine Commerce-Orientierung.\n\nDer Retailer möchte die Marke stärken. Das Wettbewerbsumfeld ist intensiv. Digitale Kanäle gewinnen an Bedeutung.\n\nDein Auftrag: Entwickle eine Kanal- und Touchpointstrategie.';

/* ──────────────────────────────────────────────
   ERSTGESPRÄCH – 9 Blöcke
   ────────────────────────────────────────────── */

export const SECTIONS_ERST = [
  /* Block 1 – Begrüßung */
  {
    id: 's1',
    main: 'Begrüßung',
    time: '3 Min.',
    type: 'script',
  },

  /* Block 2 – ROOTS-Intro */
  {
    id: 's2',
    main: 'ROOTS-Intro',
    time: '6 Min.',
    type: 'roots',
  },

  /* Block 3 – Selbstvorstellung */
  {
    id: 's3',
    main: 'Selbstvorstellung',
    time: '6 Min.',
    questions: [
      {
        id: 's3_q1',
        text: '\u201EBitte stelle dich kurz vor.\u201C',
        checks: SELBSTVORSTELLUNG_CHECKS,
        evaluations: [
          {
            label: 'Selbstvorstellung Gesamt',
            dimension: 'kommunikation',
            anchor1: 'Unstrukturiert; kein Bezug zur Rolle; unsicher',
            anchor3: 'Strukturiert, rollenrelevant, solides Auftreten',
            anchor5: 'Klares Profil; konkrete Beispiele; überzeugend und authentisch',
          },
        ],
      },
    ],
  },

  /* Block 4 – Motivation & Organisationswahl (Block-Level-Evaluation) */
  {
    id: 's4',
    main: 'Motivation & Organisationswahl',
    time: '8 Min.',
    blockEvaluation: {
      id: 's4_block',
      evaluations: [
        {
          label: 'Motivation & Organisationswahl Gesamt',
          dimension: 'ownership',
          anchor1: 'Keine klare Vorstellung; generische Motivation; kein Firmenbezug; kann eigenen Mehrwert nicht benennen',
          anchor3: 'Grundvorstellungen vorhanden; Motivation erkennbar; oberflächlicher Bezug zu ROOTS; kennt eigene Stärken ansatzweise',
          anchor5: 'Klare, reflektierte Vorstellungen; differenzierte Motivation mit spezifischem Firmenbezug; konkreter Mehrwert mit Beispielen; zeigt Selbstkenntnis',
        },
      ],
    },
    questions: [
      {
        id: 's4_q0a',
        text: '\u201EDie Auswahl deines ersten Jobs ist eine wichtige Entscheidung und ein Meilenstein in deiner beruflichen Laufbahn. Stell dir vor, du hast ein weißes Blatt Papier – wie soll dein Job aussehen?\u201C',
        followUp: 'Optionale Nachfrage zur Klärung: \u201EWas möchtest du machen? Was ist dir wichtig?\u201C',
      },
      {
        id: 's4_q0b',
        text: '\u201EWas bringst du mit, wenn du zu uns kommst?\u201C',
      },
      {
        id: 's4_q2',
        text: '\u201EWarum hast Du dich gezielt für eine kleinere Beratung entschieden?\u201C',
        followUp: 'STAR-Prompt bei Bedarf: \u201EKannst Du ein konkretes Erlebnis nennen, das diese Entscheidung geprägt hat?\u201C',
      },
    ],
  },

  /* Block 5 – Erfahrungen & Fit */
  {
    id: 's5_erst',
    main: 'Erfahrungen & Fit',
    time: '5 Min.',
    questions: [
      {
        id: 's8_q1',
        text: '\u201EWas bedeutet für Dich \u2018exzellente Arbeit\u2019 und woran merkst Du selbst, dass eine Arbeit wirklich gut ist?\u201C',
        followUp: 'Nachfragen: \u201EKannst Du ein Beispiel nennen, auf das Du besonders stolz bist?\u201C / \u201EBetter done than perfect – oder umgekehrt?\u201C',
        evaluations: [
          {
            label: 'Qualitätsanspruch & Standards',
            dimension: 'qualitat',
            anchor1: 'Definiert Exzellenz vage (\u2018einfach gut gemacht\u2019); Beispiel fehlt oder nicht überzeugend; Standard wirkt niedrig',
            anchor3: 'Erkennbarer Qualitätsanspruch; Beispiel vorhanden; Messkriterien bleiben eher subjektiv',
            anchor5: 'Klare, hohe eigene Standards; definiert Qualität aus Kundenperspektive und Wirksamkeit; Beispiel konkret, messbar, mit Stolz erzählt',
          },
        ],
        collapsible: true,
      },
      /* 2.4: Moved from Zweitgespräch to Erstgespräch */
      {
        id: 's7_q1',
        text: '\u201EWelches war das bislang größte und komplexeste Projekt, das Du geführt hast? Wie bist Du dabei vorgegangen? Gab es Probleme und wie hast Du diese gelöst?\u201C',
        evaluations: [
          {
            label: 'Projektkomplexität & Problemlösung',
            dimension: 'projektmgmt',
            anchor1: 'Beispiel wenig komplex; Probleme nicht proaktiv gelöst; kein strukturiertes Vorgehen',
            anchor3: 'Solides Beispiel; Probleme erkannt und adressiert; Vorgehen nachvollziehbar',
            anchor5: 'Komplexes Projekt überzeugend gemanagt; Probleme proaktiv antizipiert und gelöst; klare Struktur und Kommunikation',
          },
        ],
        collapsible: true,
      },
      /* 2.5: Strategie & Analytics Fragen */
      {
        id: 's5_q_strat1',
        text: '\u201EErzähl doch mal von einem Projekt, bei dem du für die Entwicklung einer größeren Strategie verantwortlich warst. Wie bist du dabei vorgegangen?\u201C',
        evaluations: [
          {
            label: 'Strategisches Denken',
            dimension: 'analytik',
            anchor1: 'Beispiel fehlt oder ist operativ; kein strategischer Rahmen erkennbar',
            anchor3: 'Solides Beispiel; erkennbarer strategischer Ansatz; Umsetzung bleibt vage',
            anchor5: 'Klarer strategischer Rahmen; strukturiertes Vorgehen; überzeugender Impact',
          },
        ],
        collapsible: true,
      },
      {
        id: 's5_q_strat2',
        text: '\u201EErzähl doch mal von einem Projekt, bei dem du wirklich neue Insights entdeckt hast. Wie bist du dabei vorgegangen, und wie wurden sie im weiteren Projekt genutzt?\u201C',
        evaluations: [
          {
            label: 'Analytische Tiefe & Insights',
            dimension: 'analytik',
            anchor1: 'Beschreibt nur Datensammlung ohne echte Insights; kein analytischer Prozess erkennbar',
            anchor3: 'Nennt relevante Insights; Analyseprozess nachvollziehbar; Nutzung im Projekt ansatzweise beschrieben',
            anchor5: 'Differenzierte, überraschende Insights; klarer analytischer Prozess; konkrete Wirkung im Projekt',
          },
        ],
        collapsible: true,
      },
    ],
  },

  /* Block 6 – Mini Case A */
  {
    id: 's12',
    main: 'Mini Case A',
    time: '8 Min.',
    caseText: CASE_A,
    isCase: true,
    caseKey: 'caseA',
    /** Case A only in Erstgespräch – never in Zweit (3.2) */
    erstOnly: true,
    hint: 'Erwartet: Problemdiagnose VOR Lösungsvorschlag. Bsp. intern (4Ps), extern (veränderte Bedürfnisse, Mediakonsum), Wettbewerb (Newcomer, Substitute).',
    questions: [
      {
        id: 's12_q1',
        text: 'Diagnose & strategische Optionen (siehe Case oben)',
        evaluations: [
          {
            label: 'Strukturiertheit der Analyse',
            dimension: 'analytik',
            anchor1: 'Springt sofort zu Lösungen ohne Diagnose; Antwort unstrukturiert; keine Priorisierung erkennbar',
            anchor3: 'Stellt Diagnose-Schritte in Aussicht; Struktur vorhanden, aber nicht konsequent durchgehalten; Optionen eher generisch',
            anchor5: 'Klarer Dreiklang: Diagnose \u2192 Hypothesen \u2192 Optionen; priorisiert begründet; zeigt Consulting-Logik (MECE, Hypothesendenken)',
          },
          {
            label: 'Fachliche Qualität',
            dimension: 'marketing',
            anchor1: 'Optionen trivial oder rein operativ (\u2018mehr Werbung\u2019); kein strategischer Hebel erkennbar',
            anchor3: 'Solide Optionen (z.\u00A0B. Zielgruppenstrategie, Preispositionierung); bleibt auf Konzeptebene ohne Priorisierungslogik',
            anchor5: 'Strategisch differenzierte Optionen mit klarer Kausallogik; bezieht Markenwert, Zielgruppe und Wettbewerb ein; begründet Priorisierung',
          },
          {
            label: 'Kommunikation im Case',
            dimension: 'kommunikation',
            anchor1: 'Ergebnis schwer nachvollziehbar; springt; wirkt unsicher',
            anchor3: 'Argumentationslinie erkennbar, aber mit Lücken',
            anchor5: 'Argumentationskette nachvollziehbar; erklärt Annahmen; präsentiert Ergebnis prägnant und selbstsicher',
          },
        ],
      },
      {
        id: 's12_q2',
        text: '\u201EStell dir vor: Du präsentierst als Junior Consultant deine Ergebnisse in einem Kundentermin. Dein Ansprechpartner beim Kunden widerspricht deiner Empfehlung und wird dabei zunehmend emotional. Der Senior Consultant ist kurzfristig verhindert. Wie verhältst du dich?\u201C',
        followUp: 'Nachfragen: \u201EWas würdest Du konkret sagen?\u201C / \u201EWas würdest Du danach intern kommunizieren?\u201C',
        evaluations: [
          {
            label: 'Belastbarkeit in Kundensituation',
            dimension: 'resilienz',
            anchor1: 'Würde sofort nachgeben, eskaliert unkontrolliert oder zieht sich zurück; kein konstruktiver Umgang mit Druck',
            anchor3: 'Bleibt sachlich; leitet Situation an Vorgesetzte weiter, ohne eigene Initiative; Haltung erkennbar, aber ohne Strategie',
            anchor5: 'Bleibt ruhig und professionell; validiert Kundenperspektive; hält eigene Position sachlich; kommuniziert intern proaktiv; denkt in Lösungen',
          },
          {
            label: 'Kommunikationsstärke',
            dimension: 'kommunikation',
            anchor1: 'Weicht aus, antwortet vage; keine klare Positionierung erkennbar; Sprache unangemessen für Klientenumfeld',
            anchor3: 'Äußert sich verständlich; wählt angemessene Sprache, aber ohne ausgeprägte Überzeugungskraft',
            anchor5: 'Strukturiert, klar und überzeugend; passt Kommunikation an Kontext an; setzt aktives Zuhören ein; zeigt Perspektivwechsel',
          },
        ],
      },
    ],
  },

  /* Block 7 – Culture-Fit (2.6: nur Fragen 1, 2, 4, 6, 8) */
  {
    id: 's_cf',
    main: 'Culture-Fit',
    time: '2 Min.',
    type: 'culturefit',
    hint: 'Schnellfragerunde: Forced Choice – Kandidat muss sich spontan entscheiden, kein Mittelweg erlaubt.',
    cultureFitQuestions: [
      { id: 'cf_1', optionA: 'Rampensau', optionB: 'Backoffice' },
      { id: 'cf_2', optionA: 'Better done than perfect', optionB: 'Better perfect than done' },
      { id: 'cf_4', optionA: 'Durchdenken', optionB: 'Schnell testen' },
      { id: 'cf_6', optionA: 'Kundenanspruch', optionB: 'Eigenanspruch' },
      { id: 'cf_8', optionA: 'Nachfragen', optionB: 'Selbst erarbeiten' },
    ],
    questions: [
      {
        id: 's_cf_q1',
        text: 'ROOTS-Fit Gesamteindruck',
        evaluations: [
          {
            label: 'ROOTS-Fit',
            dimension: 'team',
            anchor1: null,
            anchor3: null,
            anchor5: null,
          },
        ],
      },
    ],
  },

  /* Block 8 – Realistische Tätigkeitsinformation */
  {
    id: 's11',
    main: 'Realistische Tätigkeitsinformationen',
    time: '5 Min.',
    type: 'rti',
  },

  /* Block 9 – Nachfragen & Abschluss (2.7: Aktuelles Gehalt vor Gehaltswunsch) */
  {
    id: 's15',
    main: 'Nachfragen & Abschluss',
    time: '5 Min.',
    type: 'outro',
    outroFields: ['Arbeitsaufwand', 'Home Office', 'Reisetätigkeit', 'Einstiegsdatum', 'Aktuelles Gehalt', 'Gehaltswunsch'],
    /* 4.1: Evaluation "Qualität der Rückfrage" */
    outroEvaluation: {
      id: 's15_eval_erst',
      evaluations: [
        {
          label: 'Qualität der Rückfragen',
          dimension: 'kommunikation',
          anchor1: 'Stellt keine Fragen oder nur Fragen zu Konditionen ohne Rollenbezug',
          anchor3: 'Stellt 1–2 sinnvolle Fragen zu Rolle oder Team; zeigt grundlegendes Interesse',
          anchor5: 'Stellt differenzierte Fragen zu Rolle, Lernmöglichkeiten, Kundenbasis oder Firmenstrategie; zeigt echte Vorbereitung',
        },
      ],
    },
  },
];

/* ──────────────────────────────────────────────
   ZWEITGESPRÄCH – 7 Blöcke
   ────────────────────────────────────────────── */

export const SECTIONS_ZWEIT = [
  /* Block 1 – Begrüßung */
  {
    id: 's1',
    main: 'Begrüßung',
    time: '3 Min.',
    type: 'script',
  },

  /* Block 2 – Selbstvorstellung */
  {
    id: 's3',
    main: 'Selbstvorstellung',
    time: '6 Min.',
    questions: [
      {
        id: 's3_q1',
        text: '\u201EBitte stelle dich kurz vor.\u201C',
        checks: SELBSTVORSTELLUNG_CHECKS,
        evaluations: [
          {
            label: 'Selbstvorstellung Gesamt',
            dimension: 'kommunikation',
            anchor1: 'Unstrukturiert; kein Bezug zur Rolle; unsicher',
            anchor3: 'Strukturiert, rollenrelevant, solides Auftreten',
            anchor5: 'Klares Profil; konkrete Beispiele; überzeugend und authentisch',
          },
        ],
      },
    ],
  },

  /* Block 3 – Motivation & Organisationswahl */
  {
    id: 's4_zweit',
    main: 'Motivation & Organisationswahl',
    time: '3 Min.',
    questions: [
      {
        id: 's4_q1',
        text: '\u201EWo möchtest Du dich fachlich und persönlich in den nächsten 3–5 Jahren hin entwickeln – hast du bereits einen konkreten Plan?\u201C',
        followUp: 'Nachfrage: \u201EWie passt ROOTS konkret in diesen Plan?\u201C',
        evaluations: [
          {
            label: 'Entwicklungsziele & Planungsfähigkeit',
            dimension: 'ownership',
            anchor1: 'Unkonkrete oder überzogene Erwartungen; lässt Entwicklung auf sich zukommen; kein Bezug zur eigenen Leistung',
            anchor3: 'Anspruchsvolle Ziele; ansatzweise Vorstellungen, aber unklarer Weg; Bezug zu ROOTS bleibt vage',
            anchor5: 'Anspruchsvolle, realistische, differenzierte Ziele; klare Verbindung zu eigenen Anstrengungen; schlüssige Verknüpfung mit der Position',
          },
        ],
      },
    ],
  },

  /* Block 4 – Erfahrungen & Fit (3.3: merged + 3.4: Option B removed + 2.3: gescheitert moved here) */
  {
    id: 's5_zweit',
    main: 'Erfahrungen & Fit',
    time: '6 Min.',
    hint: 'STAR: Situation \u2192 Task \u2192 Action \u2192 Result.',
    questions: [
      /* 3.3: Zusammengeführte Frage aus s7_q2 + s9_q2 */
      {
        id: 's7_q2_merged',
        text: '\u201EGab es mal eine Phase, in der Du mehrere anspruchsvolle Aufgaben gleichzeitig bewältigen musstest und dabei unter erheblichem Zeitdruck standest? Wie hast Du priorisiert – und bist Du dabei an Deine Grenzen gekommen? Wie bist Du damit umgegangen?\u201C',
        evaluations: [
          {
            label: 'Priorisierung & Stressresilienz',
            dimension: 'projektmgmt',
            anchor1: 'Schildert hauptsächlich Stress-Reaktion (Überforderung, Rückzug); keine aktive Bewältigungsstrategie; wenig Reflexion',
            anchor3: 'Bewältigt die Situation; zeigt Priorisierungsansatz; Strategie eher reaktiv; begrenzte Lernreflexion',
            anchor5: 'Zeigt aktive Stressregulation; priorisiert klar und kommuniziert proaktiv; hält Qualität; reflektiert Lessons Learned mit konkreter Umsetzung',
          },
          {
            label: 'Belastungsgrenze & Selbstregulation',
            dimension: 'resilienz',
            anchor1: 'Vermeidet das Thema; keine Reflexion; kein konstruktiver Umgang erkennbar',
            anchor3: 'Nennt ein Beispiel; zeigt Bewältigungsansatz; Reflexion bleibt oberflächlich',
            anchor5: 'Ehrliches, glaubwürdiges Beispiel; aktive Bewältigungsstrategie; reflektiert Grenzen und leitet Konsequenzen ab',
          },
        ],
      },
      /* 2.3: Moved from Erstgespräch */
      {
        id: 's9_q1',
        text: '\u201EWoran bist Du zuletzt gescheitert und was hast Du dann konkret getan?\u201C',
        evaluations: [
          {
            label: 'Fehlerkultur & Eigeninitiative',
            dimension: 'resilienz',
            anchor1: 'Beispiel fällt schwer (\u2018Mir passieren kaum Fehler\u2019); Reaktion war reaktiv oder Schuld wurde externalisiert',
            anchor3: 'Nennt konkretes Beispiel; kommuniziert Fehler; Reaktion korrekt, aber ohne abgeleiteten Verbesserungsschritt',
            anchor5: 'Nennt glaubwürdiges Beispiel; korrigiert Fehler eigeninitiativ; kommuniziert transparent; leitet direkte Verbesserungsmaßnahme ab',
          },
        ],
      },
    ],
  },

  /* Block 5 – Marketingfachwissen & Strategisches Denken */
  {
    id: 's10',
    main: 'Marketingfachwissen & Strategisches Denken',
    time: '8 Min.',
    questions: [
      {
        id: 's10_q0',
        text: '\u201EWelche Themen im Marketing- und Branding-Umfeld beschäftigen Dich aktuell besonders? Wie bleibst Du fachlich am Ball?\u201C',
        evaluations: [
          {
            label: 'Wissensdurst',
            dimension: 'marketing',
            anchor1: 'Nennt nur Buzzwords; Wissen oberflächlich oder veraltet; kein erkennbares intrinsisches Interesse',
            anchor3: 'Basiswissen vorhanden; kann einzelne Themen erklären; informiert sich sporadisch; Praxisbezug teils vorhanden',
            anchor5: 'Aktuelle, fundierte Fachkenntnisse; differenzierte Einordnung; denkt in Wirkungszusammenhängen; nutzt hochwertige Quellen proaktiv',
          },
        ],
      },
      {
        id: 's10_q1',
        text: '\u201EWas macht aus Deiner Sicht eine Marke langfristig erfolgreich – unabhängig von kurzfristigen Kampagnen?\u201C',
        followUp: 'Nachfrage: \u201EHast du ein Beispiel dafür?\u201C',
        evaluations: [
          {
            label: 'Strategisches Markenverständnis',
            dimension: 'marketing',
            anchor1: 'Nennt nur operative/taktische Maßnahmen (Werbung, Social Media) ohne strategische Einordnung',
            anchor3: 'Versteht Marke als mehr als Werbung; kennt Grundkonzepte (Positionierung, Zielgruppe); Beispiel bleibt oberflächlich',
            anchor5: 'Denkt in strategischen Markendimensionen (Brand Equity, Relevanz, Konsistenz, Trust); verknüpft Konzepte; illustriert überzeugend mit konkretem Beispiel',
          },
        ],
      },
      {
        id: 's10_q3',
        text: '\u201EWelche Rolle spielt KI Deiner Einschätzung nach im Marketing der nächsten 3–5 Jahre und wo siehst Du die größten Chancen und Risiken?\u201C',
        evaluations: [
          {
            label: 'KI-Kompetenz im Marketing',
            dimension: 'marketing',
            anchor1: 'Allgemeine Aussagen ohne konkreten Bezug; beschränkt sich auf Buzzwords ohne differenzierte Einordnung',
            anchor3: 'Versteht grundlegende KI-Anwendungsfelder im Marketing; benennt Chancen oder Risiken; Einschätzung bleibt allgemein',
            anchor5: 'Differenzierte Einschätzung mit konkreten Use Cases; zeigt eigene Auseinandersetzung (ggf. Nutzungserfahrung); bezieht Risiken (Qualität, Brand Safety, Ethik) ein',
          },
        ],
      },
    ],
  },

  /* Block 6 – Case B */
  {
    id: 's13',
    main: 'Case',
    sub: 'Case B – Fashion-Eigenmarke',
    time: '15 Min.',
    caseText: CASE_B,
    isCase: true,
    caseKey: 'caseB',
    questions: [
      {
        id: 's13_q1',
        text: '\u201EWelche Kanäle und Touchpoints würdest Du priorisieren?\u201C',
        evaluations: [
          {
            label: 'Kanal-Priorisierung',
            dimension: 'analytik',
            anchor1: 'Listet Kanäle ohne Begründung; ignoriert Spannungsfeld Händler-Commerce vs. Markenaufbau',
            anchor3: 'Nennt relevante Kanäle; Priorisierung vorhanden, aber nicht am Zielgruppenverhalten ausgerichtet',
            anchor5: 'Hypothesenbasierte Priorisierung entlang der Customer Journey; löst Spannungsfeld',
          },
        ],
      },
      {
        id: 's13_q2',
        text: '\u201EWie zahlen die digitalen Kanäle auf den stationären Handel ein?\u201C',
        followUp: 'Nachfrage: \u201EWelche 3 KPIs würdest du tracken?\u201C',
        evaluations: [
          {
            label: 'Digital-to-Store-Logik & KPIs',
            dimension: 'marketing',
            anchor1: 'Betrachtet isoliert; KPIs ausschließlich abverkaufsorientiert',
            anchor3: 'Erkennt Verbindung digitaler Touchpoints zum stationären POS; Brand-KPIs ansatzweise',
            anchor5: 'Klare Logik entlang der Journey; benennt Markenkennzahlen UND nachlaufende Abverkaufs-KPIs',
          },
        ],
      },
      {
        id: 's13_q3',
        text: '\u24D8 Interviewer-Hinweis: Wechsle jetzt unvermittelt ins Englische.\n\n\u201CThe CMO asks you directly: \u2018We sell T-shirts next to yoghurt and washing powder – why would anyone believe we can do fashion?\u2019 Convince me this channel strategy is worth the investment.\u201D',
        evaluations: [
          {
            label: 'Überzeugungskraft & Argumentation',
            dimension: 'kommunikation',
            anchor1: 'Weicht aus; listet Maßnahmen ohne Wirkungslogik; wirkt unsicher',
            anchor3: 'Nimmt Herausforderung an; Grundargument vorhanden; eher beschreibend',
            anchor5: 'Greift skeptische Prämisse auf und wendet sie ab; klare Wirkungslogik; CMO-tauglich',
          },
          {
            label: 'English Proficiency',
            dimension: 'kommunikation',
            anchor1: 'Wechsel stark verzögert; Sprachqualität bricht ein; Kernaussagen verloren',
            anchor3: 'Wechsel erfolgt; verständlich, aber Flüssigkeit eingeschränkt',
            anchor5: 'Nahtloser Switch; Prägnanz und Überzeugungskraft erhalten; souverän',
          },
        ],
      },
    ],
  },

  /* Block 7 – Nachfragen & Abschluss (4.1: Evaluation ergänzt, 3.5: Frage hinzugefügt) */
  {
    id: 's15',
    main: 'Nachfragen & Abschluss',
    time: '5 Min.',
    type: 'outro',
    outroFields: ['Erwartungen 12 Mon.'],
    /* 3.5: Abschlusstest-Frage aus Erstgespräch hierher verschoben */
    outroQuestion: {
      id: 's15_zweit_q1',
      text: '\u201EWas müsste in den ersten 12 Monaten konkret passiert sein, damit Du sagst: \u2018Das war genau der richtige Schritt für mich\u2019?\u201C',
    },
    /* 4.1: Evaluation "Qualität der Rückfrage" */
    outroEvaluation: {
      id: 's15_eval_zweit',
      evaluations: [
        {
          label: 'Qualität der Rückfragen',
          dimension: 'kommunikation',
          anchor1: 'Stellt keine Fragen oder nur Fragen zu Konditionen ohne Rollenbezug',
          anchor3: 'Stellt 1–2 sinnvolle Fragen zu Rolle oder Team; zeigt grundlegendes Interesse',
          anchor5: 'Stellt differenzierte Fragen zu Rolle, Lernmöglichkeiten, Kundenbasis oder Firmenstrategie; zeigt echte Vorbereitung',
        },
      ],
    },
  },
];

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */

/** Returns the correct sections array for the current round */
export const getSections = (isZweit) => (isZweit ? SECTIONS_ZWEIT : SECTIONS_ERST);

/**
 * Returns all unique questions (with evaluations) across both rounds.
 * Used by scoring to compute dimension averages regardless of active round.
 */
export const getAllEvaluatedQuestions = () => {
  const seen = new Set();
  const questions = [];

  for (const sections of [SECTIONS_ERST, SECTIONS_ZWEIT]) {
    for (const section of sections) {
      // Block-level evaluations
      if (section.blockEvaluation) {
        const be = section.blockEvaluation;
        if (!seen.has(be.id)) {
          seen.add(be.id);
          questions.push({ id: be.id, evaluations: be.evaluations });
        }
      }
      // Outro evaluations (4.1)
      if (section.outroEvaluation) {
        const oe = section.outroEvaluation;
        if (!seen.has(oe.id)) {
          seen.add(oe.id);
          questions.push({ id: oe.id, evaluations: oe.evaluations });
        }
      }
      // Regular questions
      if (!section.questions) continue;
      for (const q of section.questions) {
        if (!seen.has(q.id) && q.evaluations) {
          seen.add(q.id);
          questions.push(q);
        }
      }
    }
  }
  return questions;
};

/** Legacy compat – some components may still import SECTIONS */
export const SECTIONS = SECTIONS_ERST;
