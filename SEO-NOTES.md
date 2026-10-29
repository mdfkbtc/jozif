# SEO: vykonané zmeny a nasadenie

## Rozsah
Lokálne zmeny, nie nasadenie. Preferovaná doména: https://www.pejona.sk/ (zhodná s pôvodnými firemnými údajmi a návratovou URL formulára).

- Index a GDPR majú vlastné title/description, canonical a Open Graph metadáta.
- H1 pomenúva upratovanie v Žiline; opravený preload na prvý skutočne zobrazený hero obrázok.
- Existujúci LocalBusiness rozšírený o stabilné ID, URL, logo a prepojenie na WebSite/WebPage. LocalBusiness je podtyp Organization; duplicitnú organizáciu netreba.
- robots.txt odkazuje na sitemap.xml. Sitemap obsahuje iba dve existujúce kanonické HTML stránky, nie fragmenty ani parametre.
- llms.txt je doplnkový opis, nie riešenie Google indexácie.
- Bez pridávania analytics, cookies, vymyslených recenzií, otváracích hodín alebo cien.

## Živý web pri kontrole
https://www.pejona.sk/, https://pejona.sk/ a https://www.pejona.sk/index.html vracali 200 bez zjednotenia hosta/cesty. HTTP bez www sa presmerovalo na HTTPS bez www. robots.txt a sitemap.xml vracali 404. Náhodná neexistujúca cesta správne vracala 404. Homepage obsahovala title, description a LocalBusiness; nebol zistený zákaz indexovania v jej HTML ani X-Robots-Tag odpovedi. Toto nie je dôkaz zaradenia do Google indexu.

## Nasadenie
1. Nahrať index.html, gdpr.html, robots.txt, sitemap.xml, llms.txt. Použitý OG obrázok assets/hero-team-office.webp už patrí do projektu.
2. U poskytovateľa ProfiWeb nastaviť trvalé presmerovanie non-www → https://www.pejona.sk/ so zachovaním cesty a query a /index.html → /. Canonical je signál, nie presmerovanie. Nepridávali sme naslepo .htaccess: HTTPS ukončuje proxy a existujúcu konfiguráciu hostingu nemáme.
3. Overiť cez HTTP: canonical URL 200, aliasy 301/308 na canonical, robots a sitemap 200 so správnym obsahom a neexistujúca cesta 404. Overiť bez slučiek aj http://www.pejona.sk/ a URL s parametrami.
4. V Google Search Console overiť vlastníctvo domény (DNS token musí pochádzať zo skutočného účtu), odoslať https://www.pejona.sk/sitemap.xml a skontrolovať homepage cez URL Inspection / Live test. Pozrieť konkrétny dôvod neindexácie, Google-selected canonical, posledný crawl a prípadné manuálne zásahy; potom požiadať o indexovanie. Neodosielať bezhlavo všetky aliasy.
5. Pre lokálne vyhľadávanie overiť Google Business Profile, správnu kategóriu, obsluhované územie, zhodné kontakty, reálne fotografie a skutočné recenzie. Neoznačovať sídlo ako verejnú prevádzku, pokiaľ zákazníkov neprijíma.
6. Ďalšia fáza obsahu: samostatné užitočné stránky podľa reálnych služieb, s konkrétnym rozsahom a postupom objednávky. Negenerovať zameniteľné mestské doorway stránky. FAQ doplniť iba s reálnymi odpoveďami viditeľnými návštevníkom; nie ako povinný SEO checkbox.

## Dôležitý existujúci nesúlad mimo SEO
Na žiadosť prevádzkovateľa boli doplnené informácie o aktívnom FormSubmit do GDPR a priamo k formuláru. Pôvodné tvrdenie o neexistencii formulára bolo odstránené. Spôsob odosielania zostal zachovaný. Zmluvné zabezpečenie, identita dodávateľa, retencia a prípadné prenosy sa musia ešte overiť; pozri GDPR-IMPLEMENTATION.md. Úprava textu sama nepotvrdzuje úplný súlad služby s GDPR.

## Overenie
Spustiť `python -m unittest discover -s tests -v` a `git diff --check`. Testy overujú metadáta, lokálne existujúci OG obrázok, kanonické URL, XML sitemap, priechodnosť robots a prepojené JSON-LD. Lokálny HTTP server overený pre obe stránky, robots, sitemap, llms a OG obrázok. V prehliadači overená domovská stránka pri šírkach 800 a 390 px bez horizontálneho pretečenia. Toto nenahrádza produkčné testy presmerovaní, Rich Results Test ani Search Console.

## Referencie
- Google: technické podmienky indexácie — https://developers.google.com/search/docs/essentials/technical
- Google: sitemap — https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google: AI features, bez požiadavky na špeciálne AI súbory — https://developers.google.com/search/docs/appearance/ai-features
- Google: lokálne poradie — https://support.google.com/business/answer/7091
