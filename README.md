# Oulun ammattikorkeakoulun ohjelmistokehityksen sovellusprojekti

Tämä projekti on Oulun ammattikorkeakoulun tietotekniikan koulutusohjelman web-ohjelmoinnin sovellusprojektikurssille IN00ED15 toteutettu **elokuvasivustosovellus**. Kurssi oli 15 opintopisteen laajuinen.


## Projektin tavoitteet

- Luoda web-ohjelmisto JavaScript-ohjelmointikielellä ja hyödyntää siinä JavaScript pohjaista käyttöliittymäkirjastoa tai -ohjelmointikehystä
- Suunnitella ja toteuttaa ohjelmistotestausta ja käyttää testausta osana ohjelmistokehitystä
- Toimia erilaisissa rooleissa osana ketterää ohjelmistokehitystiimiä
- Esitellä projekti englanniksi


## Projektiryhmä

Projektiryhmä koostuu seuraavista henkilöistä:

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://github.com/mintusmaximus"><img src="https://avatars.githubusercontent.com/u/156218528?v=4" width="100px;" alt="Jesse Heikkinen"/><br /><sub><b>Jesse Heikkinen</b></sub></a><br /><a href="https://github.com/TVT24KMO-R15/Web-ohjelmoinnin-sovellusprojekti/tree/main/?author=mintusmaximus" title=""></a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/eemildev"><img src="https://avatars.githubusercontent.com/u/181833755?v=4" width="100px;" alt="Eemil Koskelo"/><br /><sub><b>Eemil Koskelo</b></sub></a><br /><a href="https://github.com/TVT24KMO-R15/Web-ohjelmoinnin-sovellusprojekti/tree/main/?author=eemildev" title=""></a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/nnksknkngs"><img src="https://avatars.githubusercontent.com/u/169275720?v=4" width="100px;" alt="Anna Koskenkangas"/><br /><sub><b>Anna Koskenkangas</b></sub></a><br /><a href="https://github.com/TVT24KMO-R15/Web-ohjelmoinnin-sovellusprojekti/tree/main/?author=nnksknkngs" title=""></a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/jarmoit"><img src="https://avatars.githubusercontent.com/u/181835775?v=4" width="100px;" alt="Jarmo Marjakangas"/><br /><sub><b>Jarmo Marjakangas</b></sub></a><br /><a href="https://github.com/TVT24KMO-R15/Web-ohjelmoinnin-sovellusprojekti/tree/main/?author=Jarmoit" title=""></a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/TeroAsilainen"><img src="https://avatars.githubusercontent.com/u/184121919?v=4" width="100px;" alt="Tero Asilainen"/><br /><sub><b>Tero Asilainen</b></sub></a><br /><a href="https://github.com/TVT24KMO-R15/Web-ohjelmoinnin-sovellusprojekti/tree/main/?author=TeroAsilainen" title=""></a></td>
    </tr>
  </tbody>
</table>


## Ominaisuudet
- **Elokuvasivusto:** Käyttäjät voivat selata, hakea ja tarkastella elokuvia sekä Finnkinon näytösaikoja
- **Käyttäjätilit:** Rekisteröityminen, kirjautuminen sekä profiilin ja suosikkilistan hallinta
- **Ryhmät:** Käyttäjät voivat liittyä ryhmiin, tehdä postauksia ja erota ryhmistä
- **Arvostelut ja kommentit:** Käyttäjät voivat arvostella elokuvia
- **Responsiivinen käyttöliittymä:** Sivusto toimii sujuvasti eri kokoisilla näytöillä
- **REST API:** Node.js-pohjainen backend mahdollistaa tiedon hakemisen ja tallentamisen PostgreSQL-tietokantaan
- **Tietoturva:** Käyttäjien autentikointi ja salasanojen turvallinen hashays
- **Testaus:** Backend sisältää automatisoituja testejä

## Teknologiastäkki
- **React** – frontend
- **Node.js** – backend
- **PostgreSQL** – tietokanta
- **Axios** – HTTP-pyynnöt
- **JWT** – autentikointi
- **bcrypt** – salasanojen hashays
- **dotenv** – ympäristömuuttujat
- **Mocha & Chai** – backend-testit


## Sovelluksen pyörittäminen paikallisesti

### Esivaatimukset
* PostgreSQL
* Node.js ja npm asennettu

### Ohjeet
- **1. Kloonaa repositorio**
- **2. Asenna riippuvuudet backend- ja frontend-kansioihin (npm install)**
- **3. Luo .env-tiedosto backend-kansioon ja lisää ENV_TEMPLATEn mukaiset muuttujat**
- **4. Luo .env-tiedosto frontend-kansioon (VITE_API_URL=http://localhost:{PORT})**
- **5. Luo PostgreSQL-tietokanta ja suorita createDatabase.sql mukaiset skeemat**
- **6. Käynnistä sovelluksen backend ja frontend (npm run dev)**
- **7. Avaa selain ja siirry osoitteeseen: http://localhost:5173**


## Dokumentaatio

Lisätietoja projektin rakenteesta ja toiminnallisuuksista löytyy [docs]-kansiosta.


## Lisenssi
Tämä projekti on lisensoitu MIT-lisenssillä. Lisätiedot [LICENSE](LICENSE)-tiedostosta.