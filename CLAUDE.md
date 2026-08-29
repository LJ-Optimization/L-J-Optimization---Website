# L&J Optimization I/S — projektkontekst

## Hvad det er
Firmahjemmeside for L&J Optimization I/S, et tomandsinteressentskab i København,
der bygger hjemmesider til håndværksvirksomheder — primært VVS, el og byg.

Sitet har to job: skaffe kundeemner, og fungere som arbejdsprøve. Alt hvad vi
gør på det, skal kunne forsvares over for en potentiel kunde, der kigger med.

## Teknik
- Statisk HTML og CSS. Ingen framework, ingen build, ingen afhængigheder.
- Hostes på Netlify, deployes fra GitHub `main`. Push = deploy.
- Alle stier er relative, så sitet også kan åbnes direkte fra disk.
- Filerne ligger fladt i roden (`site.css`, ikke `assets/css/site.css`).
  Det var et bevidst valg efter problemer med mappestruktur ved upload.
  Skal det laves om til mapper igen, skal alle stier i alle HTML-filer rettes.
- Header og footer er kopieret ind i hver enkelt fil. Med seks sider er det
  til at overskue. Bliver det til femten, så flyt sitet til Eleventy.
- Kontaktformularen kører på Netlify Forms (`data-netlify="true"` plus skjult
  `form-name`). Den virker ikke lokalt, kun efter deploy.

## Design
- Farver og skrifttyper står som CSS-variabler øverst i `site.css`. Rediger dem
  dér, ikke spredt ud i filen.
- Farvesystemet er varm/kold: koldt blåt (`--cold`) til information og labels,
  flammeorange (`--flame`) til handling og knapper. Bland dem ikke sammen.
- Skrifter: Archivo til overskrifter, IBM Plex Sans til brødtekst,
  IBM Plex Mono til labels, tal og "spec"-agtige detaljer.
- Vægtmåleren i footeren måler siden i browseren via Performance API. Den er
  et løfte, ikke pynt: bliver sitet tungt, står det dér. Fjern den ikke for at
  skjule et problem — fjern problemet.

## Tone i teksterne
- Skriv til en håndværker, ikke til et bureau. "Du", ikke "De" eller "man".
- Korte, konkrete sætninger. Ingen buzzwords, ingen "løsninger" og "synergier".
- Vær specifik frem for smart. Priser og dage nævnes ved navn.
- Vi lover aldrig noget, vi ikke styrer. Ingen garanti om førstepladser på Google.

## Beslutninger der ikke må rulles tilbage uden at spørge
- **Priserne står på siden.** Ingen "kontakt os for et tilbud".
- **Vi siger nej på skrift.** Tabellen i `ydelser.html` over det, vi ikke laver
  (webshop, booking, kundelogin, Google Ads), bliver stående. Den er et
  kompetencesignal, ikke en mangel.
- **Ingen falske cases eller anbefalinger.** Vi er nye, og det står der.
  Erstat aldrig noget med opfundne kundecitater eller logoer.
- **Demoerne er opdigtede virksomheder.** `demo-vvs.html` og `demo-el.html`
  skal beholde den sorte bjælke øverst, der siger det, og deres `noindex`.
  De må ikke fremstilles som rigtige kunder.
- **Ingen cookies.** Der er intet cookiebanner, fordi der ikke sættes cookies.
  Tilføjes analytics, skal det være serverside (Netlify Analytics eller
  Plausible) — ellers skal der samtykke til, og så mister vi den fordel.

## Endnu ikke rettet (pladsholdere i koden)
- `12 34 56 78` og `+4512345678` → rigtigt nummer
- `hej@ljoptimization.dk` → rigtig mail
- `ljoptimization.dk` → rigtigt domæne (canonical, sitemap, robots, JSON-LD)
- `[Fornavn Efternavn]` i `om.html` → rigtige navne, gerne med billeder
- `CVR 00 00 00 00` → rigtigt CVR
- **Priserne er gæt.** 6.900 / 11.900 / 149 kr. er forslag, ikke aftalte tal.
- `og.jpg` (1200×630) mangler i roden. Uden den ser delte links tomme ud.

## Kvalitetskrav ved ændringer
- Test på mobil, ikke kun i et smalt browservindue.
- Tastaturnavigation skal virke, og fokus skal kunne ses.
- `prefers-reduced-motion` skal respekteres.
- Kontraster skal kunne læses i sollys — folk står udenfor med telefonen.
- Tjek at interne links stadig peger på filer, der findes, efter omdøbninger.
