# Manage Fam Authority - Ponder Indexer

Indexer for the Fam Authority using the Ponder Indexer framework.

## Digital Ocean Droplet Setup

### 1. Create and Access Your Droplet

1. Create a new Ubuntu droplet on Digital Ocean
2. Access your droplet via SSH:
   ```bash
   ssh root@your_droplet_ip
   ```

### 2. Install Required Software

1. Install Node Version Manager (nvm):

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   source ~/.bashrc
   ```

2. Install Node.js 20:

   ```bash
   nvm install 20
   nvm use 20
   ```

3. Install pnpm:

   ```bash
   # Install pnpm
   npm install -g pnpm
   ```

4. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

### 3. Verify Installation

Run these commands to verify everything is installed correctly:

```bash
nvm --version
pnpm --version
pm2 --version
```

### 4. Clone and Run the Indexer

1. Clone the repository:

   ```bash
   git clone https://github.com/With-Fam/ponder-indexer.git
   cd ponder-indexer
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file with required environment variables:

   ```bash
   touch .env
   nano .env
   ```

   Add your environment variables:

   ```
   STACK_API_KEY=your_stack_api_key
   STACK_POINT_SYSTEM_ID=your_point_system_id
   PRIVATE_KEY=your_private_key
   PONDER_RPC_URL_84532=your_base_sepolia_rpc_url
   ```

4. Start the indexer with PM2:

   ```bash
   pm2 start ecosystem.config.cjs
   ```

5. Verify the indexer is running:

   ```bash
   pm2 list
   pm2 logs fam-indexer
   ```

6. Configure PM2 to start on system reboot:
   ```bash
   pm2 startup
   pm2 save
   ```

### 5. Configure GitHub Actions

1. Add the following secrets to your GitHub repository:
   - `DROPLET_IP`: Your Digital Ocean droplet's IP address
   - `DROPLET_USER`: Your droplet's username (usually 'root')
   - `DROPLET_PASSWORD`: Your droplet's password

Now your Droplet is ready and the indexer is running with automatic restarts every 12 hours as configured in the ecosystem.config.cjs file.
