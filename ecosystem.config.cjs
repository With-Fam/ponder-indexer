module.exports = {
  apps: [
    {
      name: "fam-indexer",
      script: "pnpm",
      args: "start",
      cron_restart: "0 */12 * * *",
      watch: false,
      autorestart: true,
    },
  ],
};
