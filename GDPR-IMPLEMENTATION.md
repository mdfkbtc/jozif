# Dokončenie GDPR nastavenia

Stav k 23. 9. 2026: text a statický web upravené; úplný súlad zatiaľ nepotvrdený. Dokument je interný a web naň neodkazuje. Pri nasadení publikovať len verejné súbory webu.

## Nastavené pravidlá

- Bežné dopyty bez objednávky: počas vybavovania a najviac 6 mesiacov od poslednej vecnej komunikácie. Ide o zvolenú internú lehotu; zákon ju priamo neurčuje.
- Zmluvné dôkazy: individuálne podľa uplatniteľného nároku, všeobecne 3 roky v občianskoprávnych a 4 roky v obchodnoprávnych vzťahoch od zákonného začiatku plynutia. Nie plošná lehota od skončenia zmluvy. Spory, uznanie dlhu a osobitné premlčanie vyžadujú osobitné posúdenie.
- Účtovné doklady: 10 rokov nasledujúcich po príslušnom roku; výnimky podľa zákona o účtovníctve.
- Bežné prístupové a chybové logy: interný limit 30 dní; konkrétne incidenty a dôkazy oddeliť.
- Zálohy: požadovaná rotácia najviac 30 dní; ide o cieľové nastavenie na potvrdenie a zavedenie u poskytovateľa, nie overenú vlastnosť služby. Zálohy používať iba na obnovu, obmedziť prístup a po obnove znovu uplatniť vykonané výmazy. Dlhodobý účtovný archív viesť oddelene od prevádzkových záloh.

## Otvorené pred zverejnením

1. Hosting aj e-mail: používateľ potvrdil ProfiWeb (profiweb.biz). Overiť jeho subdodávateľov, miesta uloženia a vzdialeného prístupu. Podľa výsledku nahradiť všeobecnú časť 10 konkrétnym stavom a prípadnými zárukami a spôsobom získania ich kópie. Nevyvodzovať absenciu prenosov iba z európskeho sídla dodávateľa.
2. Overiť zmluvné zabezpečenie spracovateľov podľa čl. 28 GDPR a posúdenie oprávnených záujmov. Existencia týchto dokumentov nebola overená.
3. Zaviesť skutočné mazanie e-mailov a dokumentov podľa uvedených lehôt. Nastaviť logy u hostingu na najviac 30 dní. Overiť zálohy, dobu ich rotácie a zabránenie obnoveniu už vymazaných údajov do bežného používania. Úprava HTML tieto operácie nevykonáva.
4. Na produkcii overiť cookies, hlavičky a sieťové požiadavky vrátane vrstiev hostingu/CDN. Lokálny kód neobsahuje sledovanie ani webové úložisko; správanie infraštruktúry zatiaľ nebolo overené.
5. Ak sa služba FormSubmit v minulosti používala, preveriť zostávajúce údaje a ukončenie jej používania. Odstránenie kódu nemaže údaje u bývalého dodávateľa.

## Právne podklady

- [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679): najmä čl. 5, 6, 12–14, 21, 28 a kapitola V.
- [Zákon č. 431/2002 Z. z., znenie účinné od 1. 6. 2026](https://static.slov-lex.sk/static/SK/ZZ/2002/431/20260601.html): § 35 ods. 3 písm. c), § 36.
- [Občiansky zákonník](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/1964/40/): § 101 a osobitné pravidlá premlčania.
- [Obchodný zákonník, znenie účinné od 17. 8. 2026](https://static.slov-lex.sk/static/SK/ZZ/1991/513/20260817.html): § 391 a nasl., najmä § 397.
- [Stanovisko regulačného úradu ku cookies](https://www.teleoff.gov.sk/urad/aktuality/tlacove-spravy/prevadzkovatelia-webovych-stranok-zbystrite-pozornost-ma-ta-vasa-spravne-nastavenie-ziskavania-suhlasu-so-spracuvanim-uklada.html): § 109 ods. 8 zákona č. 452/2021 Z. z.

## Overenie poskytovateľa

Používateľ potvrdil ProfiWeb pre hosting aj e-mail. [Oficiálny web](https://profiweb.biz/) uvádza ProfiWeb, s.r.o.; [popis služieb](https://profiweb.biz/services) zahŕňa hosting a e-mail. Verejná stránka /gdpr pri kontrole vrátila obsah „Sorry, not found“ / „error 403 | 404“. Verejné podklady preto nepotvrdzujú krajiny spracúvania, spracovateľskú zmluvu ani retenčné nastavenia konkrétneho účtu Pejona. Cookies na webe poskytovateľa nie sú dôkazom cookies na webe Pejona.

### Podklady potrebné od ProfiWeb (návrh požiadavky, neodoslaný)

Prosíme o potvrdenie pre hosting pejona.sk a e-mail info@pejona.sk:

- zmluvného subjektu a spracovateľských podmienok podľa čl. 28 GDPR,
- krajín uloženia webových a e-mailových dát aj záloh a krajín vzdialeného prístupu,
- subdodávateľov a prípadných prenosov mimo EHP vrátane mechanizmu a dostupnosti záruk,
- možnosti nastaviť bežné prístupové a chybové logy na najviac 30 dní,
- lehôt e-mailových prevádzkových záznamov a záloh, rotácie a pravidiel mazania,
- prípadných cookies alebo externých služieb pridávaných hostingom, CDN či ochranou proti útokom.

Po získaní odpovede dokončiť časť 10 a podľa skutočného nastavenia zosúladiť časti 8, 9 a 11. Samotné potvrdenie názvu poskytovateľa neuzatvára tieto otázky.
