
export function validateEnvironment() {
  const requiredEnvVars = [
    'NEXTAUTH_SECRET',
    'DATABASE_URL',
    'ADMIN_EMAIL',
    'ADMIN_PASSWORD',
    'ADMIN_NAME'
  ]

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
  }

  
  if (process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET.length < 32) {
    console.warn('⚠️  NEXTAUTH_SECRET should be at least 32 characters long for security')
  }

  
  if (process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length < 8) {
    console.warn('⚠️  ADMIN_PASSWORD should be at least 8 characters long for security')
  }

  
  const maxFileSize = parseInt(process.env.MAX_FILE_SIZE || '5242880')
  if (maxFileSize > 50 * 1024 * 1024) { 
    console.warn('⚠️  MAX_FILE_SIZE is very large, consider reducing for security')
  }

  console.log('✅ Environment variables validated successfully')
  console.log('🔐 Single-user authentication system enabled')
}


export const appConfig = {
  name: process.env.APP_NAME || 'WeebLink',
  description: process.env.APP_DESCRIPTION || 'Modern, customizable Linktree clone',
  url: process.env.APP_URL,
  uploadDir: process.env.UPLOAD_DIR || 'public/uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), 
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  adminName: process.env.ADMIN_NAME,
}


export const dbConfig = {
  url: process.env.DATABASE_URL || 'file:./dev.db',
}


export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  singleUser: true, 
}
