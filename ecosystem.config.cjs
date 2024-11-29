module.exports = {
  apps: [
    {
      name: "fam-indexer",
      script: "pnpm",
      args: "start",
      cron_restart: "0 */12 * * *",
      watch: false,
      autorestart: true,
      max_memory_restart: "500M",
      node_args: "--max-old-space-size=256",
      env: {
        NODE_OPTIONS: "--max-old-space-size=256",
      },
      exp_backoff_restart_delay: 100,
    },
  ],
};
