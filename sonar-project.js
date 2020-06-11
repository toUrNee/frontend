const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: "http://localhost:3000",
    token: "CattleyaTours_frontend",
    options: {
      "sonar.sources": "./src",
    },
  },
  () => process.exit()
);