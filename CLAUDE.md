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

### Rytme: sider må ikke ligne hinanden
Sitet kørte før i samme takt på hver eneste side — mørkt sidehoved, lyst
kortgitter, mørkt kortgitter, lys tabel, mørk slut-CTA. Det blev ensformigt.
Der er nu tre flader, ikke to: `.on-dark` (blæk), standard (papir) og
`.on-cold` (lyseblå). Læg aldrig to ens flader i træk, og brug ikke det samme
sektionshoved hele vejen ned — der er `.section__head--split` og
`--center` til at bryde det.

Byggeklodser der er til for variationens skyld:
- `.split` / `.split--flip` — tekst ved siden af en render. Renderen skal have
  den brede spalte; `--flip` bytter både rækkefølge og spaltebredder.
- `.statband` — talbånd, fire nøgletal på mørk flade.
- `.pledges` / `.pledges--stack` — løfter med farvet venstrekant, i stedet for
  endnu et kortgitter.
- `.nextnav` — to kort i bunden af hver underside, der peger videre. De
  erstatter den enslydende slut-CTA og er sitets vigtigste vejvisning.
- `.onthispage` — klæbende genvejsmenu på de lange sider (ydelser, priser).
  Klæber under headeren via `--headerh`, som `site.js` måler og sætter.
- `.callbar` — fast handlingsbjælke i bunden på mobil (≤720px). Den er både
  en genvej og en demonstration af den teknik, vi sælger. `body` har
  `padding-bottom` til at gøre plads.

### Isometriske renders
Illustrationerne er håndtegnet SVG i isometrisk projektion — ikke fotos, ikke
billeder fra et bibliotek. Det er et bevidst valg: de vejer et par KB, er
knivskarpe på alle skærme, koster ingen ekstra forespørgsler og bruger sitets
egne farver. Det holder løftet i vægtmåleren.

- Projektionen er 2:1. Alt bruger `matrix(0.866,0.5,-0.866,0.5,x,y)` for
  gulvplan. Bland ikke vinkler — så falder familieligheden fra hinanden.
- Skygger: tre toner pr. objekt (top lysest, højre side, venstre side mørkest).
  Neutral `#24485A / #16323F / #0E2430`, kold `#7FC4DC / #4E9DBB / #2E7F9E`,
  flamme `#F0764F / #E2542B / #B93D18`.
- Tykkelse laves med en mørk kopi forskudt nedad bag formen — ikke med
  kantpolygoner, der bryder afrundede hjørner.
- Ikonsættet ligger som `<symbol>` i toppen af `ydelser.html`. Skal det bruges
  på flere sider, så kopiér blokken med — sitet har ingen build.
- Erstat aldrig en render med et stockfoto. Har vi rigtige billeder fra
  kundeopgaver, er de bedre — men opfundne "kontor"-fotos er de ikke.

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
- **Ingen falske cases eller anbefalinger.** Erstat aldrig noget med opfundne
  kundecitater, logoer eller tal. Vi har ingen kunder at referere til endnu,
  og det skal ikke skjules med noget opdigtet. Det skal bare ikke stå som en
  undskyldning heller — se punktet herunder.
- **Vi taler ikke os selv ned.** Sitet solgte før på, at vi var nye: "vi har
  ikke tyve cases", "de første tre kunder får 25 % rabat mod at måtte vise
  siden frem". Det er skrevet ud, og det skal ikke tilbage. Rabat som
  undskyldning for manglende erfaring sætter prisen som det eneste argument
  og inviterer til at forhandle om resten.
  Beviset er i stedet arbejdet og løfterne: de to demoer, der ligger live,
  det delte stylesheet, og de fire ting under "Det du kan holde os op på" i
  `om.html` (fast pris, stop efter første udkast, du ejer domæne og kode, en
  måneds opsigelse). Skal der laves en kampagne, så lav den på en grund vi
  kan sige højt — ikke på, at vi er nye.
- **Ingen påstande vi ikke kan bakke op.** Prisskiltet hed "Mest solgte", før
  vi havde solgt noget. Det hedder nu "Vores anbefaling". Samme regel gælder
  besøgstal, antal kunder og anmeldelser.
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
- `[Fornavn Efternavn]` i `om.html` → rigtige navne. Billedrammerne
  (`.person__photo`) står klar med monogram; læg et 4:3-portræt ind i stedet
  for `span`-elementet. Det er den enkeltting, der løfter siden mest.
- `CVR 00 00 00 00` → rigtigt CVR
- **Priserne er gæt.** 6.900 / 11.900 / 149 kr. er forslag, ikke aftalte tal.
- `og.jpg` (1200×630) mangler i roden. Uden den ser delte links tomme ud.

## Kvalitetskrav ved ændringer
- Test på mobil, ikke kun i et smalt browservindue.
- Tastaturnavigation skal virke, og fokus skal kunne ses.
- `prefers-reduced-motion` skal respekteres.
- Kontraster skal kunne læses i sollys — folk står udenfor med telefonen.
- Tjek at interne links stadig peger på filer, der findes, efter omdøbninger.
