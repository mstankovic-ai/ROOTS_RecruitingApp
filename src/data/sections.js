/**
 * SECTIONS – the complete interview structure.
 * Every question has a stable ID (e.g. "s3_q1") so that state keys
 * never shift when questions are added or removed.
 */

import { SELBSTVORSTELLUNG_CHECKS } from './templates';

const CASE_A =
  'Ein etablierter Konsumgüterhersteller in Deutschland bemerkt, dass der Absatz ihrer Kernmarke in den letzten 2 Jahren um 15\u00A0% gesunken ist – trotz nach wie vor starker Markenposition (Top-3 in Zielgruppe). Das Management ist ratlos und fragt uns um Rat.\n\nWas würdest Du als ersten Schritt empfehlen, um das Problem zu diagnostizieren und welche zwei strategischen Optionen würdest Du in einer Kurzanalyse prüfen wollen?';

const CASE_B =
  'Ein großer deutscher Lebensmitteleinzelhändler betreibt eine Fashion-Eigenmarke. Die Marke ist stark mit Damenmode assoziiert, günstig positioniert und in Filialen präsent. Der Abverkauf erfolgt über Wühltische und Aktionsständer, die sich strukturell nicht ändern werden.\n\nOnline ist die Marke ausschließlich über die Händlerseite vertreten. Dort herrscht wenig Markenpräsenz und reine Commerce-Orientierung.\n\nDer Retailer möchte die Marke stärken. Das Wettbewerbsumfeld ist intensiv. Digitale Kanäle gewinnen an Bedeutung.\n\nDein Auftrag: Entwickle eine Kanal- und Touchpointstrategie.';

export const SECTIONS = [
  {
    id: 's1',
    main: 'Begrüßung & Ablauferklärung',
    time: '3 Min.',
    type: 'script',
  },
  {
    id: 's2',
    main: 'ROOTS-Intro',
    time: '6 Min.',
    type: 'roots',
    erstOnly: true,
  },
  {
    id: 's3',
    main: 'Selbstvorstellung',
    time: '5 Min.',
    noQuestionCheck: true,
    questions: [
      {
        id: 's3_q1',
        text: '\u201EBitte stelle dich kurz vor. Fokussiere dich dabei auf das, was dich für diese Rolle besonders qualifiziert.\u201C',
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
  {
    id: 's4',
    main: 'Motivation & Organisationswahl',
    time: '8 Min.',
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
      {
        id: 's4_q2',
        text: '\u201EWarum hast Du dich gezielt für eine kleinere Beratung entschieden?\u201C',
        followUp: 'STAR-Prompt bei Bedarf: \u201EKannst Du ein konkretes Erlebnis nennen, das diese Entscheidung geprägt hat?\u201C',
        evaluations: [
          {
            label: 'Reflexionstiefe & Firmenbezug',
            dimension: 'ownership',
            anchor1: 'Generische oder idealisierte Antwort; kaum Firmenbezug; keine Auseinandersetzung mit Herausforderungen',
            anchor3: 'Solide Grundmotivation; kennt ROOTS oberflächlich; nennt Herausforderungen nur auf Nachfrage',
            anchor5: 'Differenzierte, persönlich begründete Antwort; spezifischer Firmenbezug; reflektiert Herausforderungen und nennt Bewältigungsstrategie',
          },
        ],
      },
      {
        id: 's4_q3',
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
    ],
  },
  {
    id: 's5',
    main: 'Erfahrungen und Fit',
    sub: 'Analytisches und strukturiertes Denken',
    time: '10 Min.',
    hint: 'STAR: Situation \u2192 Task \u2192 Action \u2192 Result. Bei unvollständigen Antworten nachfragen: \u201EWas hast DU konkret getan?\u201C / \u201EWas war das Ergebnis?\u201C',
    questions: [
      {
        id: 's5_q1',
        text: '\u201EBeschreibe eine Situation, in der Du dich schnell in ein dir unbekanntes Thema, eine Branche oder ein Tool einarbeiten musstest. Wie bist Du konkret vorgegangen?\u201C',
        evaluations: [
          {
            label: 'Lernprozess & Transferfähigkeit',
            dimension: 'analytik',
            anchor1: 'Beschreibt oberflächliches Auseinandersetzen; keine systematische Vorgehensweise erkennbar; Ergebnis bleibt unklar',
            anchor3: 'Eigenständige Einarbeitung belegt; strukturiertes Vorgehen ansatzweise erkennbar; Ergebnis vorhanden, aber wenig reflektiert',
            anchor5: 'Zeigt strukturierten, selbstgesteuerten Lernprozess; nutzt diverse Quellen/Methoden; liefert messbares Ergebnis; reflektiert Transfer',
          },
        ],
      },
      {
        id: 's5_q2',
        text: '\u201EBeschreibe ein Projekt, in dem Du neue Insights entdeckt hast. Wie bist Du dabei vorgegangen und wie wurden diese im weiteren Projektverlauf genutzt?\u201C',
        evaluations: [
          {
            label: 'Insight-Generierung & Anwendung',
            dimension: 'analytik',
            anchor1: 'Kann kein konkretes Beispiel nennen; Vorgehen unsystematisch; Insights blieben folgenlos',
            anchor3: 'Nennt ein Beispiel; Vorgehen nachvollziehbar; Insights flossen teilweise in Entscheidungen ein',
            anchor5: 'Strukturierter, hypothesengeleiteter Ansatz; Insights klar herausgearbeitet; nachweisbarer Einfluss auf Projektergebnis',
          },
        ],
      },
      {
        id: 's5_q3',
        text: '\u201EBeschreibe ein Projekt, in dem Du für die Entwicklung einer größeren Strategie verantwortlich warst. Wie bist Du dabei vorgegangen?\u201C',
        evaluations: [
          {
            label: 'Strategieentwicklung',
            dimension: 'analytik',
            anchor1: 'Kein überzeugendes Beispiel; Vorgehen unstrukturiert; keine klare Methodik erkennbar',
            anchor3: 'Nachvollziehbares Beispiel; strukturierter Ansatz erkennbar; Strategie bleibt auf Konzeptebene',
            anchor5: 'Klarer strategischer Prozess (Analyse \u2192 Hypothesen \u2192 Empfehlung); begründete Priorisierung; Ergebnis messbar',
          },
        ],
      },
    ],
  },
  {
    id: 's6',
    sub: 'Sicheres Auftreten & Kommunikation',
    time: '10 Min.',
    questions: [
      {
        id: 's6_q1',
        text: '\u201EStell dir vor: Du präsentierst als Junior Consultant Ergebnisse in einem Kundentermin. Dein Ansprechpartner beim Kunden widerspricht deiner Empfehlung und wird dabei zunehmend emotional. Der Senior Consultant ist kurzfristig verhindert. Wie verhältst du dich?\u201C',
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
      {
        id: 's6_q2',
        text: '\u201EHast Du bereits vor einer größeren Gruppe präsentiert? Wie hast Du dich vorbereitet und wie bist Du mit dem Stress umgegangen?\u201C',
        followUp: 'Falls keine große Gruppe: \u201EWie sieht es mit Meetings oder kleineren Präsentationen aus?\u201C',
        evaluations: [
          {
            label: 'Präsentationskompetenz & Stressmanagement',
            dimension: 'kommunikation',
            anchor1: 'Kaum Erfahrung; keine erkennbare Vorbereitung; Stressumgang nicht reflektiert',
            anchor3: 'Hat Erfahrung; bereitet sich strukturiert vor; Stressumgang vorhanden, aber wenig reflektiert',
            anchor5: 'Routiniert; systematische Vorbereitung; reflektierter Umgang mit Nervosität; souveränes Auftreten',
          },
        ],
      },
      {
        id: 's6_q3',
        text: '\u201EWie würden ehemalige Kollegen, Kommilitonen oder Vorgesetzte Dich als Teammitglied beschreiben – auch wenn es nicht nur Positives ist?\u201C',
        evaluations: [
          {
            label: 'Selbstkenntnis & Teamrolle',
            dimension: 'team',
            anchor1: 'Beschreibt sich ausschließlich positiv; vermeidet jede kritische Selbsteinschätzung; Antwort wirkt einstudiert',
            anchor3: 'Gibt ausgewogenes Bild; benennt ein Entwicklungsfeld, relativiert es aber stark; begrenzte Tiefe',
            anchor5: 'Authentisch, differenziert; benennt klare Stärken und ehrliche Entwicklungsfelder; zeigt starke Selbstkenntnis ohne Übertreibung',
          },
        ],
      },
      {
        id: 's6_q4',
        text: '\u201EHattest Du schon einmal ein Problem mit einem Kollegen oder Teammitglied? Was hast Du konkret unternommen?\u201C',
        evaluations: [
          {
            label: 'Konfliktfähigkeit & Teamdynamik',
            dimension: 'team',
            anchor1: 'Vermeidet Konflikte oder eskaliert; kein konstruktiver Lösungsansatz',
            anchor3: 'Erkennt Konflikt; sucht Lösung, bleibt aber passiv oder oberflächlich',
            anchor5: 'Geht Konflikt proaktiv an; kommuniziert klar; findet konstruktive Lösung; reflektiert eigenen Anteil',
          },
        ],
      },
    ],
  },
  {
    id: 's7',
    sub: 'Projektmanagement',
    time: '7 Min.',
    questions: [
      {
        id: 's7_q1',
        text: '\u201EWelches war das bislang größte und komplexeste Projekt, das Du geführt hast? Gab es Probleme und wie hast Du diese gelöst?\u201C',
        evaluations: [
          {
            label: 'Projektkomplexität & Problemlösung',
            dimension: 'projektmgmt',
            anchor1: 'Beispiel wenig komplex; Probleme nicht proaktiv gelöst; kein strukturiertes Vorgehen',
            anchor3: 'Solides Beispiel; Probleme erkannt und adressiert; Vorgehen nachvollziehbar',
            anchor5: 'Komplexes Projekt überzeugend gemanagt; Probleme proaktiv antizipiert und gelöst; klare Struktur und Kommunikation',
          },
        ],
      },
      {
        id: 's7_q2',
        text: '\u201EGab es mal eine Phase, in der Du mehrere anspruchsvolle Aufgaben gleichzeitig bewältigen musstest und dabei unter erheblichem Zeitdruck standest? Wie hast Du priorisiert?\u201C',
        evaluations: [
          {
            label: 'Priorisierung & Zeitmanagement',
            dimension: 'projektmgmt',
            anchor1: 'Schildert hauptsächlich Stress-Reaktion (Überforderung, Rückzug); keine aktive Bewältigungsstrategie; wenig Reflexion',
            anchor3: 'Bewältigt die Situation; zeigt Priorisierungsansatz; Strategie eher reaktiv; begrenzte Lernreflexion',
            anchor5: 'Zeigt aktive Stressregulation; priorisiert klar und kommuniziert proaktiv; hält Qualität; reflektiert Lessons Learned mit konkreter Umsetzung',
          },
        ],
      },
    ],
  },
  {
    id: 's8',
    sub: 'Qualitätsanspruch',
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
      },
    ],
  },
  {
    id: 's9',
    sub: 'Resilienz',
    time: '5 Min.',
    questions: [
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
      {
        id: 's9_q2',
        text: '\u201EBist Du schon einmal an Deine absoluten Grenzen gekommen? Wie bist Du damit umgegangen?\u201C',
        evaluations: [
          {
            label: 'Belastungsgrenze & Selbstregulation',
            dimension: 'resilienz',
            anchor1: 'Vermeidet das Thema; keine Reflexion; kein konstruktiver Umgang erkennbar',
            anchor3: 'Nennt ein Beispiel; zeigt Bewältigungsansatz; Reflexion bleibt oberflächlich',
            anchor5: 'Ehrliches, glaubwürdiges Beispiel; aktive Bewältigungsstrategie; reflektiert Grenzen und leitet Konsequenzen ab',
          },
        ],
      },
    ],
  },
  {
    id: 's10',
    main: 'Marketingfachwissen & Strategisches Denken',
    time: '8 Min. (2 aus 3)',
    questions: [
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
        id: 's10_q2',
        text: '\u201EWie würdest Du einem Kunden, der bisher nur in klassische Mediawerbung investiert hat, das Konzept \u2018Consumer Experience Management\u2019 in ca. 2 Minuten erklären und warum es für ihn relevant ist?\u201C',
        evaluations: [
          {
            label: 'CX-Erklärfähigkeit',
            dimension: 'marketing',
            anchor1: 'Erklärung unstrukturiert oder zu fachsprachlich; kein Bezug zur Kundenperspektive; Relevanz nicht vermittelt',
            anchor3: 'Solide Definition; erklärt mit Beispiel; Bezug zur Kundenperspektive vorhanden, aber wenig überzeugend',
            anchor5: 'Klare, kundenzentrierte Erklärung; nutzt Analogien oder Storytelling; vermittelt Relevanz überzeugend; zeigt Beratungslogik',
          },
          {
            label: 'Beratungskommunikation',
            dimension: 'kommunikation',
            anchor1: 'Zu fachsprachlich oder unstrukturiert für den Kundenkontext',
            anchor3: 'Verständlich, aber ohne ausgeprägte Überzeugungskraft',
            anchor5: 'Strukturiert, kundenzentriert, überzeugend – zeigt Beratungslogik',
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
  {
    id: 's11',
    main: 'Realistische Tätigkeitsinformationen',
    time: '5 Min.',
    type: 'rti',
  },
  {
    id: 's12',
    main: 'Case',
    sub: 'Case A – Konsumgüterhersteller',
    time: '8 Min.',
    caseText: CASE_A,
    isCase: true,
    caseKey: 'caseA',
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
    ],
  },
  {
    id: 's13',
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
  {
    id: 's14',
    main: 'Nachfragen & Abschluss',
    time: '5–8 Min.',
    type: 'outro',
    questions: [
      {
        id: 's14_q1',
        text: 'Qualität der Nachfragen des Kandidaten',
        evaluations: [
          {
            label: 'Qualität der Nachfragen',
            dimension: 'ownership',
            anchor1: 'Stellt keine Fragen oder nur Fragen zu Konditionen ohne Rollenbezug',
            anchor3: 'Stellt 1–2 sinnvolle Fragen zu Rolle oder Team; zeigt grundlegendes Interesse',
            anchor5: 'Stellt differenzierte Fragen zu Rolle, Lernmöglichkeiten, Kundenbasis oder Firmenstrategie; zeigt echte Vorbereitung',
          },
        ],
      },
    ],
  },
];
