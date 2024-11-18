import packageInfo from "../../package.json";
import { sequelize } from "../database/sequelize.config";

export const versionHandler = {
  versionDetails: async ({ html, response }) => {
    try {
      let databaseStatus = `<span style="color: red;">OFFLINE</span>`;
      let apiStatus = `<span style="color: green;">ONLINE</span>`; // API is running
      const version = `<span style="color: blue;">${packageInfo.version}</span>`;
      const name = `<span style="color: purple;">${packageInfo.name}</span>`;
      await sequelize
        .authenticate()
        .then(() => {
          databaseStatus = `<span style="color: green;">ONLINE</span>`;
        })
        .catch((error) => {
          databaseStatus = `<span style="color: green;">OFFLINE</span>`;
        });

      const statusPage = `
      <html>
        <head><title>Status Page</title></head>
        <body>
          <h1>Service Status</h1>
          <p>Version: ${version}</p>
          <p>Name: ${name}</p>
          <p>Database Status: ${databaseStatus}</p>
          <p>API Status: ${apiStatus}</p>
        </body>
      </html>
    `;
      return html(statusPage);
    } catch (error) {
      console.log(error);
    }
  },
};
