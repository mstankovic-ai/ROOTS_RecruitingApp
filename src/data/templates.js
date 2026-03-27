/**
 * Text templates for intro, outro, ROOTS presentation, and RTI.
 * Functions accept candidate name and interviewer name for personalization.
 */

export const makeIntroErst = (kandidat, interviewer) =>
  `Hallo ${kandidat || '[Kandidat:in]'}, schön, dass Du heute da bist. Funktioniert alles mit der Technik?\n\nMein Name ist ${interviewer || '[Name]'}, ich bin [Rolle] und führe heute das Gespräch.\n\nZiel des Gesprächs ist es, gemeinsam zu prüfen, wie gut die Rolle und unser Arbeitsumfeld zu deinen Erwartungen und Stärken passen.\nWir führen das Interview strukturiert, d.\u00A0h. wir stellen allen Kandidaten ähnliche Fragen, um fair vergleichen zu können. Das Gespräch dauert etwa 45–60 Minuten und besteht aus einem kurzen ROOTS Intro, einer Selbstvorstellung, Fragen zu bisherigen Erfahrungen, einigen situativen Fragen sowie Zeit für deine Fragen.\n\nEs gibt keine \u2018perfekten\u2019 Antworten – wichtig ist uns dich besser kennenzulernen und deine Herangehensweise zu verstehen.\n\nIst das Vorgehen für dich so ok, dann würden wir starten.`;

export const makeIntroZweit = (kandidat, interviewer) =>
  `Hallo ${kandidat || '[Kandidat:in]'}, schön, dich heute beim Zweitgespräch zu sehen.\n\nMein Name ist ${interviewer || '[Name]'}, ich bin [Rolle] und führe heute das Gespräch.\n\nWie beim Erstgespräch, ist das Ziel, gemeinsam zu prüfen, wie gut die Rolle und unser Arbeitsumfeld zu deinen Erwartungen und Stärken passen. Jedoch liegt der Fokus weniger auf deinem Lebenslauf und mehr auf deiner Denkweise.\nUnser Gespräch wird etwa 45-60 Minuten dauern und besteht aus einer kurzen Selbstvorstellung, einigen Fachfragen, einer Case Study sowie Zeit für deine Fragen.\n\nEs gibt keine \u2018perfekten\u2019 Antworten – wichtig ist uns dich besser kennenzulernen und deine Herangehensweise zu verstehen.\n\nBereit? Dann starten wir.`;

export const ROOTS_TEXT = `\u2022 Agile Boutique
\u2022 Liefern KI-optimierte Markenstrategien und Marketing Operations
\u2022 Damit verhelfen wir unseren Blue-Ship Kunden zu mehr Wirksamkeit, Effizienz und Speed im Marketing
\u2022 Produktportfolio richtet sich nach unserem eigenen Modell, den 6Ps
\u2022 Fokusbranchen: FMCG & Retail (tiefe Expertise für Eigenmarken)
\u2022 Kunden sind z.\u00A0B. Danone, Beiersdorf, Lidl, TUI
\u2022 Die wir teilweise seit unserer Gründung in 2016 beraten
\u2022 Werte: excellent, führend, nahbar
\u2022 Praxis-Profis, keine \u201ETheorie-Berater\u201C
\u2022 Wichtig: Wir sind sehr klein (6 Personen), möchten wachsen (> 10 > 20), sind selbst in der KI-Transformation`;

export const makeOutroErst = (kandidat) =>
  `Vielen Dank, ${kandidat || '[Name]'}. Zum Abschluss möchten wir Dir noch Raum für deine Fragen geben und kurz die nächsten Schritte erklären.\n\nHast du noch Fragen?\n\nNachfragen:\n\u2022 Was müsste in den ersten 12 Monaten konkret passiert sein, damit Du sagst: \u2018Das war genau der richtige Schritt für mich\u2019?\n\u2022 Wie stellst du dir den Arbeitsaufwand in der Marketingberatung vor?\n\u2022 Wie viel Reisetätigkeit findest du ok?\n\u2022 Welchen Split Office / Home Office findest Du ideal? Wäre möglich?\n\u2022 Wann könntest Du einsteigen und was möchtest du verdienen?\n\nVielen Dank für das Gespräch und Deine Offenheit. Wir führen in den nächsten Tagen weitere Gespräche und melden uns spätestens in einer Woche bei Dir.\nDie nächsten Schritte wären ein Zweitinterview und ein Case Interview vor Ort.\n\nWir freuen uns, von Dir zu hören und melden uns wie angekündigt.`;

export const OUTRO_ZWEIT = `Damit kommen wir zum Abschluss. Doch zuvor, hast du noch Fragen?\n\nVielen Dank für das Gespräch und Deine Offenheit. Wir führen in den nächsten Tagen weitere Gespräche und melden uns spätestens nächste Woche bei Dir.\nDer nächste Schritt wäre eine Case bei uns vor Ort in Düsseldorf.\n\nVielen Dank für Deine Zeit und Dein Interesse. Wir freuen uns, von Dir zu hören und melden uns wie angekündigt.`;

export const RTI_TEXT = `\u2022 Als Junior arbeitest du von Anfang an sehr nah am Kunden, d.\u00A0h. Shadowing in Meetings, frühes Halten von Präsentationsteilen und direkte Kommunikation
\u2022 Ein großer Teil der Arbeit besteht aus Analyse, Strukturierung und PowerPoint-Ausarbeitungen auf hohem Qualitätsniveau
\u2022 Als kleines Team gibt es wenig Schutzraum – frühe Eigenverantwortung, parallele Themen sind normal
\u2022 Knappe Timings und kurzfristige Änderungen durch Kunden sind Alltag
\u2022 Besonders zum Projektende kann es sein, dass man länger bleiben muss – kein 9-5 Job
\u2022 Wir erwarten, dass du dich aktiv ins Team einbringst – z.\u00A0B. nachfragen, ob man noch helfen kann
\u2022 Reisetätigkeit variiert je nach Kunde
\u2022 Wir haben noch wenige zementierte Strukturen und Abläufe – proaktiv mitgestalten
\u2022 Gleichzeitig: steile Lernkurve, viel Gestaltungsspielraum, wenig Bürokratie, direkter Zugang zu Entscheidern`;

export const SELBSTVORSTELLUNG_CHECKS = [
  'Beschränkt sich auf rollenrelevante Informationen',
  'Präsentiert strukturiert und logisch aufgebaut',
  'Formuliert eine klare persönliche Value Proposition / ein erkennbares Profil',
  'Belegt Fähigkeiten mit konkreten Beispielen statt Floskeln',
  'Stellt Bezug zur Position und ROOTS her',
  'Tritt sicher und authentisch auf – weder überheblich noch zu selbstkritisch',
  'Kommuniziert klar und verständlich, angemessenes Tempo und Sprache',
];
