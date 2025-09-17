// Utility function to get the correct image path for both local and production
export const getImagePath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // In production (GitHub Pages), we need to prefix with the repository name
  if (import.meta.env.PROD) {
    return `/gcx-frontend1/${cleanPath}`
  }
  
  // In development, use the path as-is
  return `/${cleanPath}`
}

// Helper function for partner/donor logos
export const getPartnerLogo = (logoPath: string): string => {
  if (!logoPath) return getImagePath('Partners/1-ukaid.jpg') // Default fallback
  
  // If it's already a full path, use it as-is
  if (logoPath.startsWith('http') || logoPath.startsWith('/gcx-frontend1/')) {
    return logoPath
  }
  
  // Otherwise, treat it as a relative path and apply the image path logic
  return getImagePath(logoPath)
}

