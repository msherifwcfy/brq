module.exports = {
  apps: [
    {
      name: "nextapp",
      // Easiest + works whether or not you built "standalone":
      script: "npm",
      args: "start -- -p 8111",
      cwd: process.cwd(),
      env: {
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: "8111"
      }
    }
  ]
}
