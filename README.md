# Web-ohjelmoinnin-sovellusprojekti



## Running app as a Docker container
### **!!NOTE!!** frontend/.env file **must** be changed before running in docker!
FROM `VITE_API_URL=localhost:3000/api` TO --> `VITE_API_URL=/api`

Run `docker compose up -d --build` in project root
Run `docker compose down` to shutdown the containers