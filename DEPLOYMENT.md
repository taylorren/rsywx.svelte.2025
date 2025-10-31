# SSR Deployment Guide for Apache + Node.js

This guide covers deploying the rsywx SvelteKit application to a production Apache server with full Server-Side Rendering (SSR) support.

## Prerequisites

- Apache web server installed and running
- Node.js v18+ installed on server
- npm or pnpm installed
- Root/sudo access to server
- Domain name configured (optional but recommended)

## Step 1: Prepare Development Environment

### 1.1 Install Node Adapter

```bash
cd D:\rsywx
pnpm add -D @sveltejs/adapter-node
```

### 1.2 Update svelte.config.js

```javascript
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			out: 'build',
			precompress: true,
			envPrefix: ''
		})
	}
};

export default config;
```

### 1.3 Create Production Environment File

Create `.env.production` in project root:

```env
RSYWX_API_KEY=your_production_api_key_here
RSYWX_API_BASE_URL=http://api.rsywx/api/v1
```

**Important:** Add `.env.production` to `.gitignore` if it contains sensitive data.

### 1.4 Build the Project

```bash
pnpm run build
```

This generates the `build/` directory with your production app.

## Step 2: Server Preparation

### 2.1 Install PM2 Process Manager

On your server:

```bash
sudo npm install -g pm2
```

PM2 keeps your Node.js app running, auto-restarts on crashes, and manages logs.

### 2.2 Create Deployment Directory

```bash
sudo mkdir -p /var/www/rsywx
sudo chown -R $USER:$USER /var/www/rsywx
```

## Step 3: Upload Files to Server

### 3.1 Files/Folders to Upload

Transfer these to `/var/www/rsywx/`:

- `build/` (entire directory generated from npm run build)
- `package.json`
- `package-lock.json` (or `pnpm-lock.yaml`)
- `.env` (with production values)
- `static/` (covers, images, robots.txt, etc.)
- `node_modules/` (optional - can install on server instead)

### 3.2 Upload Methods

**Option A: Using SCP**
```bash
# From your local machine
scp -r build package.json package-lock.json .env static/ user@your-server:/var/www/rsywx/
```

**Option B: Using rsync**
```bash
rsync -avz --exclude 'node_modules' ./ user@your-server:/var/www/rsywx/
```

**Option C: Using Git**
```bash
# On server
cd /var/www/rsywx
git clone https://your-repo-url.git .
git checkout main
npm run build
```

## Step 4: Server Configuration

### 4.1 Install Production Dependencies

```bash
cd /var/www/rsywx
pnpm install --prod
```

Or if using npm:
```bash
npm ci --production
```

### 4.2 Set Environment Variables

Create or edit `/var/www/rsywx/.env`:

```env
RSYWX_API_KEY=your_production_api_key
RSYWX_API_BASE_URL=http://api.rsywx/api/v1
PORT=3000
HOST=127.0.0.1
ORIGIN=https://yourdomain.com
```

### 4.3 Test the Build

```bash
cd /var/www/rsywx
node build/index.js
```

Visit `http://your-server-ip:3000` to verify it works. Press Ctrl+C to stop.

### 4.4 Start with PM2

```bash
cd /var/www/rsywx
pm2 start build/index.js --name rsywx
pm2 save
pm2 startup
```

The `pm2 startup` command will output a command to run - execute it to enable auto-start on boot.

### 4.5 Verify PM2 Status

```bash
pm2 status
pm2 logs rsywx
```

## Step 5: Configure Apache Reverse Proxy

### 5.1 Enable Required Modules

```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod headers
sudo a2enmod rewrite
sudo a2enmod ssl  # If using HTTPS
```

### 5.2 Create Virtual Host Configuration

Create `/etc/apache2/sites-available/rsywx.conf`:

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com

    # Proxy to Node.js app
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/

    # Handle WebSocket connections (if needed)
    RewriteEngine on
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://127.0.0.1:3000/$1" [P,L]

    # Logging
    ErrorLog ${APACHE_LOG_DIR}/rsywx_error.log
    CustomLog ${APACHE_LOG_DIR}/rsywx_access.log combined
</VirtualHost>
```

### 5.3 Enable the Site

```bash
sudo a2ensite rsywx.conf
sudo apache2ctl configtest
sudo systemctl reload apache2
```

### 5.4 Configure HTTPS (Recommended)

**Option A: Using Certbot (Let's Encrypt)**
```bash
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com
```

**Option B: Manual SSL Configuration**

Create `/etc/apache2/sites-available/rsywx-ssl.conf`:

```apache
<VirtualHost *:443>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com

    SSLEngine on
    SSLCertificateFile /path/to/your/certificate.crt
    SSLCertificateKeyFile /path/to/your/private.key
    SSLCertificateChainFile /path/to/your/chain.crt

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/

    # Security headers
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"

    # WebSocket support
    RewriteEngine on
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://127.0.0.1:3000/$1" [P,L]

    ErrorLog ${APACHE_LOG_DIR}/rsywx_ssl_error.log
    CustomLog ${APACHE_LOG_DIR}/rsywx_ssl_access.log combined
</VirtualHost>

# Redirect HTTP to HTTPS
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}$1 [R=301,L]
</VirtualHost>
```

Enable and reload:
```bash
sudo a2ensite rsywx-ssl.conf
sudo systemctl reload apache2
```

## Step 6: Post-Deployment

### 6.1 Verify Deployment

Visit your domain: `https://yourdomain.com`

Check that:
- Homepage loads correctly
- API data displays properly
- Navigation works
- Images/covers load
- Dark mode toggle works

### 6.2 Monitor Logs

```bash
# PM2 logs
pm2 logs rsywx

# Apache logs
sudo tail -f /var/log/apache2/rsywx_error.log
sudo tail -f /var/log/apache2/rsywx_access.log
```

### 6.3 Set Up Log Rotation

PM2 log rotation:
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

## Step 7: Updates and Maintenance

### 7.1 Deploying Updates

On your dev machine:
```bash
git pull  # Get latest changes
npm run build
```

Upload new build to server:
```bash
scp -r build/ user@your-server:/var/www/rsywx/
```

On server:
```bash
cd /var/www/rsywx
pm2 restart rsywx
```

### 7.2 PM2 Commands

```bash
pm2 status              # Check app status
pm2 restart rsywx       # Restart app
pm2 stop rsywx          # Stop app
pm2 start rsywx         # Start app
pm2 logs rsywx          # View logs
pm2 logs rsywx --lines 100  # View last 100 lines
pm2 monit               # Monitor resources
pm2 delete rsywx        # Remove from PM2
```

### 7.3 Update Dependencies

```bash
cd /var/www/rsywx
pnpm update
pm2 restart rsywx
```

## Troubleshooting

### Issue: App won't start

Check PM2 logs:
```bash
pm2 logs rsywx --err
```

Common causes:
- Missing environment variables in `.env`
- Wrong file permissions
- Port 3000 already in use
- Missing dependencies

### Issue: 502 Bad Gateway

Verify Node.js app is running:
```bash
pm2 status
curl http://127.0.0.1:3000
```

Check Apache proxy configuration:
```bash
sudo apache2ctl -t
```

### Issue: Static files not loading

Ensure `static/` folder is uploaded and permissions are correct:
```bash
ls -la /var/www/rsywx/static/
```

### Issue: API calls failing

Check environment variables:
```bash
cat /var/www/rsywx/.env
```

Verify API endpoint is accessible from server:
```bash
curl -H "X-API-Key: your_key" http://api.rsywx/api/v1/books/status
```

## Performance Optimization

### Enable Apache Caching

Add to VirtualHost configuration:

```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### Enable Gzip Compression

```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
    AddOutputFilterByType DEFLATE application/javascript application/json
</IfModule>
```

### PM2 Cluster Mode

For better performance with multiple CPU cores:

```bash
pm2 start build/index.js --name rsywx -i max
pm2 save
```

## Backup Strategy

### Automated Backup Script

Create `/root/backup-rsywx.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/backups/rsywx"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/rsywx_$DATE.tar.gz /var/www/rsywx

# Keep only last 7 backups
find $BACKUP_DIR -name "rsywx_*.tar.gz" -mtime +7 -delete

echo "Backup completed: rsywx_$DATE.tar.gz"
```

Make executable and add to crontab:
```bash
chmod +x /root/backup-rsywx.sh
crontab -e
# Add: 0 2 * * * /root/backup-rsywx.sh
```

## Security Checklist

- [ ] HTTPS enabled with valid SSL certificate
- [ ] Environment variables properly secured (not in git)
- [ ] Apache security headers configured
- [ ] Firewall rules configured (allow 80, 443; block 3000)
- [ ] Regular security updates applied
- [ ] API keys rotated periodically
- [ ] File permissions properly set (no world-writable files)
- [ ] Apache and PM2 logs monitored

## Firewall Configuration

```bash
# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Block direct access to Node.js port
sudo ufw deny 3000/tcp

# Enable firewall
sudo ufw enable
```

## Quick Reference

| Task | Command |
|------|---------|
| Check app status | `pm2 status` |
| View logs | `pm2 logs rsywx` |
| Restart app | `pm2 restart rsywx` |
| Check Apache config | `sudo apache2ctl configtest` |
| Reload Apache | `sudo systemctl reload apache2` |
| View Apache logs | `sudo tail -f /var/log/apache2/rsywx_error.log` |
| Test Node app directly | `curl http://127.0.0.1:3000` |

## Additional Resources

- [SvelteKit Adapter Node Documentation](https://kit.svelte.dev/docs/adapter-node)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Apache Proxy Guide](https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html)
- [Let's Encrypt / Certbot](https://certbot.eff.org/)

---

**Last Updated:** 2025-10-31  
**Target Environment:** Apache + Node.js v18+ on Ubuntu/Debian Linux
