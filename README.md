# Movie Website Application – Oulu University of Applied Sciences

This project is a movie website application developed as part of the Web Programming Application Project course (IN00ED15) in the Degree Programme in Information Technology at Oulu University of Applied Sciences.


## Goals

- To create a web application using JavaScript and a JavaScript-based UI library or framework
- To design and implement software testing and integrate testing as part of the development process
- To work in various roles within an agile software development team
- To present the project in English


## Team

The project team consists of the following members:

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


## Features
- **Website:** Users can browse, search, and view movies as well as Finnkino showtimes
- **User accounts:** Registration, login, and management of user profiles and favorite lists
- **Groups:** Users can create and join groups, make posts and comment on them, and leave groups
- **Reviews:** Users can rate and review movies
- **Responsive interface:** The site works smoothly on screens of various sizes
- **REST API:** Node.js-based backend enables data retrieval and storage in a PostgreSQL database
- **Security:** User authentication and secure password hashing
- **Testing:** Backend includes automated tests

## Tech stack
- **React** – frontend
- **Node.js** – backend
- **PostgreSQL** – database
- **Axios** – HTTP requests
- **JWT** – authentication
- **bcrypt** – password hashing
- **dotenv** – environment variables
- **Mocha & Chai** – backend testing


## Running the Application Locally

### Prerequisites
* PostgreSQL
* Node.js and npm installed

### Setup instructions
- **1. Clone the repository**
- **2. Install dependencies in both the backend and frontend directories (npm install)**
- **3. Create a .env file in the backend directory and add variables according to the ENV_TEMPLATE**
- **4. Create a .env file in the frontend directory (VITE_API_URL=http://localhost:{PORT})**
- **5. Create a PostgreSQL database and run the schema from createDatabase.sql**
- **6. Start both the backend and frontend (npm run dev)**
- **7. Open your browser and go to http://localhost:5173**


## Documentation

Further details about the project’s structure and functionality can be found in the [docs] directory.


## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.