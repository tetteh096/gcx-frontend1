package routes

import (
	"gcx-cms/internal/cms/handlers"
	"gcx-cms/internal/shared/middleware"

	"github.com/gin-gonic/gin"
)

// SetupCMSRoutes configures all CMS related routes
func SetupCMSRoutes(r *gin.Engine) {
	// CMS API group
	cms := r.Group("/api")

	// Public CMS routes (no authentication required)
	{
		// Public blog posts (for website)
		cms.GET("/posts", handlers.GetPublicPosts)
		cms.GET("/posts/:slug", handlers.GetPublicPost)
	}

	// Protected CMS routes (authentication required)
	protected := cms.Group("")
	protected.Use(middleware.AuthMiddleware())
	{
		// User profile management
		protected.GET("/user/profile", handlers.GetProfile)
		protected.PUT("/user/profile", handlers.UpdateProfile)
		protected.POST("/user/change-password", handlers.ChangePassword)

		// CMS Blog management (requires blogger or admin role)
		cmsProtected := protected.Group("/cms")
		cmsProtected.Use(middleware.BloggerMiddleware())
		{
			cmsProtected.GET("/posts", handlers.GetAllPosts)       // Get all posts for CMS
			cmsProtected.POST("/posts", handlers.CreatePost)       // Create new post
			cmsProtected.GET("/posts/:id", handlers.GetPost)       // Get single post for editing
			cmsProtected.PUT("/posts/:id", handlers.UpdatePost)    // Update post
			cmsProtected.DELETE("/posts/:id", handlers.DeletePost) // Delete post
		}

		// Media management routes (requires authentication)
		protected.GET("/media", handlers.GetMedia)           // GET /api/media (list all media)
		protected.POST("/media", handlers.UploadFile)        // POST /api/media (upload file)
		protected.POST("/upload", handlers.UploadFile)       // POST /api/upload (alternative upload endpoint)
		protected.GET("/media/:id", handlers.GetMediaFile)   // GET /api/media/{id}
		protected.DELETE("/media/:id", handlers.DeleteMedia) // DELETE /api/media/{id}
	}
}
