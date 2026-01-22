module.exports = {
  apps: [
    {
      name: 'rsywx-svelte',
      script: './build/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '0.0.0.0',
        RSYWX_API_KEY: '4046c526d0a9bd30d045b69105ac74d6723b1f13de04f1565957b8f9c9caa15e',
        RSYWX_API_BASE_URL: 'https://api.rsywx.com/api/v1'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '0.0.0.0',
        RSYWX_API_KEY: '4046c526d0a9bd30d045b69105ac74d6723b1f13de04f1565957b8f9c9caa15e',
        RSYWX_API_BASE_URL: 'https://api.rsywx.com/api/v1'
      },
      // Logging
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Auto restart settings
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
      max_memory_restart: '1G',
      
      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000
    }
  ]
};