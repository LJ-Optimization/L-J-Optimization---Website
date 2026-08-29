# L&J Optimization I/S — hjemmeside

Statisk site. Ingen build, ingen framework, ingen afhængigheder.
Seks sider deler ét stylesheet og én JavaScript-fil.

```
index.html          Forside
arbejde.html        De to demoer
ydelser.html        Hvad der er med, hvad vi ikke laver, forløbet
priser.html         Pakker, tilvalg, det med småt
om.html             Hvem vi er
kontakt.html        Formular
404.html
assets/css/site.css Alt design. Farver og skrift står øverst som variabler.
assets/js/site.js   Menu, reveal, før/efter-skyder, vægtmåler, formular
demo/assets/demo.css        Ét stylesheet til begge demoer
demo/nordvest-vvs/          Demo: VVS
demo/holm-el/               Demo: elektriker
netlify.toml        Publish-mappe, pæne adresser, sikkerhedsheaders
robots.txt          Demoerne er sat til noindex
sitemap.xml
```

## Kør lokalt

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Alle stier er relative, så du kan også bare dobbeltklikke på `index.html`.

## Deploy

Netlify kobles til `main`. Push = deploy. `netlify.toml` klarer resten.

## Ret dette, før I går live

Søg og erstat i alle `.html`-filer:

| Find | Ret til |
|---|---|
| `12 34 56 78` og `+4512345678` | Jeres nummer (`tel:` skal være uden mellemrum) |
| `hej@ljoptimization.dk` | Jeres mail |
| `ljoptimization.dk` | Jeres domæne (canonical, sitemap, robots, JSON-LD) |
| `[Fornavn Efternavn]` i `om.html` | Jeres navne |
| `CVR 00 00 00 00` | Jeres CVR |
| `København` | Jeres by |
| Priserne i `priser.html` og `index.html` | Jeres egne tal |

```bash
# Eksempel
grep -rl "12 34 56 78" *.html | xargs sed -i '' 's/12 34 56 78/DIT NUMMER/g'
```

## Mangler stadig

- **`og.jpg`** i roden, 1200×630. Uden den ser links til siden tomme ud i SMS, Messenger og LinkedIn.
- **Rigtige billeder af jer to** i `om.html`. Initialerne L og J er en midlertidig løsning.
- **Cookiebanner: ikke nødvendigt** som det står nu. Der sættes ingen cookies. Tilføjer I Google Analytics, skal I have samtykke — brug hellere Netlify Analytics eller Plausible, der måler på serveren og ikke kræver banner.

## Formularen

Netlify Forms. Virker først efter deploy, ikke lokalt.

1. Deploy.
2. Netlify → Forms → `tilbud` dukker op efter første indsendelse.
3. **Sæt en mailnotifikation op** under Forms → Settings, ellers får I ikke besked.
4. Test den selv, før I sender kunder ind på siden.

Der er et honeypot-felt mod spam. Bliver det slemt alligevel, kan I slå reCAPTCHA til.

## Vægtmåleren i footeren

Nederst på hver side står "Denne side: xx KB · klar på x,xx s". Det er ikke et
tal, vi har skrevet — det bliver målt i browseren via Performance API, hver gang
siden åbnes. Den viser altså sandheden, også hvis I kommer til at gøre siden
tung. Betragt det som en spærre mod jer selv.

Bemærk: skrifterne hentes fra Google Fonts og tæller med i tallet. Vil I have
tallet længere ned (og gøre siden hurtigere), så hent de fire woff2-filer og
læg dem i `assets/fonts/` med `@font-face` i stedet.

## Om de gentagne header/footer

Der er ingen build, så header og footer står i hver enkelt HTML-fil. Med seks
sider er det til at overskue. Bliver det til femten, eller begynder I at
glemme at rette alle steder, så flyt sitet til Eleventy — det tager en
eftermiddag og ændrer intet visuelt.

## Demoerne

`demo/nordvest-vvs/` og `demo/holm-el/` er opdigtede virksomheder. Begge sider
bruger den **samme** `demo.css`; forskellen er variablerne i `<style>` øverst i
`holm-el/index.html`. Det er pointen, og det er værd at fortælle kunder.

Begge er `noindex` og udelukket i `robots.txt`, så de ikke konkurrerer med jer
selv i Google. Hver side har en sort bjælke øverst, der siger, at virksomheden
er opdigtet — den skal blive der.
