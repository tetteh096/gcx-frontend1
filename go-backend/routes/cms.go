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

	// Add database middleware to all CMS routes
	cms.Use(middleware.DatabaseMiddleware())

	// Public CMS routes (no authentication required)
	{
		// Public blog posts (for website)
		cms.GET("/posts", handlers.GetPublicPosts)
		cms.GET("/posts/:slug", handlers.GetPublicPost)

		// Public pages (for website)
		cms.GET("/pages/:slug", handlers.GetPageBySlug)

		// Public settings (for website)
		cms.GET("/settings/public", handlers.GetPublicSettings)

		// Public settings by group (for website)
		cms.GET("/settings/hero", handlers.GetSettingsByGroupPublic)
		cms.GET("/settings/services", handlers.GetSettingsByGroupPublic)
		cms.GET("/settings/why_join", handlers.GetSettingsByGroupPublic)
		cms.GET("/settings/cta", handlers.GetSettingsByGroupPublic)
		cms.GET("/settings/market_data", handlers.GetSettingsByGroupPublic)

		// Public menus (for website)
		cms.GET("/menus/location/:location", handlers.GetMenuByLocation)

		// Public team members (for website)
		cms.GET("/team-members", handlers.GetTeamMembers)    // GET /api/team-members (list all team members)
		cms.GET("/team-members/:id", handlers.GetTeamMember) // GET /api/team-members/{id}

		// Public traders and brokers (for website)
		cms.GET("/traders", handlers.GetTraders)    // GET /api/traders (list all traders)
		cms.GET("/traders/:id", handlers.GetTrader) // GET /api/traders/{id}
		cms.GET("/brokers", handlers.GetBrokers)    // GET /api/brokers (list all brokers)
		cms.GET("/brokers/:id", handlers.GetBroker) // GET /api/brokers/{id}

		// Public partners (for website)
		cms.GET("/partners", handlers.GetActivePartners)                        // GET /api/partners (list all active partners)
		cms.GET("/partners/:id", handlers.GetPartner)                           // GET /api/partners/{id}
		cms.GET("/partners/category/:category", handlers.GetPartnersByCategory) // GET /api/partners/category/{category}

		// Public publications (for website)
		cms.GET("/publications", handlers.GetPublications)    // GET /api/publications (list all publications)
		cms.GET("/publications/:id", handlers.GetPublication) // GET /api/publications/{id}

		// Public careers (for website)
		cms.GET("/careers", handlers.GetCareers)    // GET /api/careers (list all careers)
		cms.GET("/careers/:id", handlers.GetCareer) // GET /api/careers/{id}

		// Public commodities (for website)
		cms.GET("/commodities", handlers.GetCommodities)   // GET /api/commodities (list all commodities)
		cms.GET("/commodities/:id", handlers.GetCommodity) // GET /api/commodities/{id}
	}

	// Protected CMS routes (authentication required)
	protected := cms.Group("")
	protected.Use(middleware.AuthMiddleware())
	{
		// Dashboard routes
		protected.GET("/cms/dashboard/stats", handlers.GetDashboardStats)
		protected.GET("/cms/dashboard/activity", handlers.GetDashboardActivity)

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

		// Page management routes (requires authentication)
		protected.GET("/pages", handlers.GetPages)             // GET /api/pages (list all pages)
		protected.POST("/pages", handlers.CreatePage)          // POST /api/pages (create page)
		protected.GET("/pages/id/:id", handlers.GetPage)       // GET /api/pages/id/{id} (get page by ID)
		protected.PUT("/pages/id/:id", handlers.UpdatePage)    // PUT /api/pages/id/{id} (update page)
		protected.DELETE("/pages/id/:id", handlers.DeletePage) // DELETE /api/pages/id/{id} (delete page)

		// Settings management routes (requires authentication)
		protected.GET("/settings", handlers.GetSettings)                     // GET /api/settings (list all settings)
		protected.GET("/settings/group/:group", handlers.GetSettingsByGroup) // GET /api/settings/group/{group}
		protected.GET("/settings/:key", handlers.GetSetting)                 // GET /api/settings/{key}
		protected.POST("/settings", handlers.CreateSetting)                  // POST /api/settings (create setting)
		protected.PUT("/settings/batch", handlers.UpdateSettingsBatch)       // PUT /api/settings/batch (update multiple)

		// Board Members management routes (requires authentication)
		protected.GET("/board-members", handlers.GetBoardMembers)             // GET /api/board-members (list all board members)
		protected.POST("/board-members", handlers.CreateBoardMember)          // POST /api/board-members (create board member)
		protected.GET("/board-members/:id", handlers.GetBoardMember)          // GET /api/board-members/{id}
		protected.PUT("/board-members/:id", handlers.UpdateBoardMember)       // PUT /api/board-members/{id}
		protected.DELETE("/board-members/:id", handlers.DeleteBoardMember)    // DELETE /api/board-members/{id}
		protected.PUT("/board-members/reorder", handlers.ReorderBoardMembers) // PUT /api/board-members/reorder

		// Team Members management routes (requires authentication) - CRUD operations only
		protected.POST("/team-members", handlers.CreateTeamMember)          // POST /api/team-members (create team member)
		protected.PUT("/team-members/:id", handlers.UpdateTeamMember)       // PUT /api/team-members/{id}
		protected.DELETE("/team-members/:id", handlers.DeleteTeamMember)    // DELETE /api/team-members/{id}
		protected.PUT("/team-members/reorder", handlers.ReorderTeamMembers) // PUT /api/team-members/reorder

		// Traders management routes (requires authentication) - CRUD operations
		protected.POST("/traders", handlers.CreateTrader)       // POST /api/traders (create trader)
		protected.PUT("/traders/:id", handlers.UpdateTrader)    // PUT /api/traders/{id}
		protected.DELETE("/traders/:id", handlers.DeleteTrader) // DELETE /api/traders/{id}

		// Brokers management routes (requires authentication) - CRUD operations
		protected.POST("/brokers", handlers.CreateBroker)       // POST /api/brokers (create broker)
		protected.PUT("/brokers/:id", handlers.UpdateBroker)    // PUT /api/brokers/{id}
		protected.DELETE("/brokers/:id", handlers.DeleteBroker) // DELETE /api/brokers/{id}

		// Partners management routes (requires authentication) - CRUD operations
		protected.GET("/cms/partners", handlers.GetAllPartners)       // GET /api/cms/partners (list all partners for CMS)
		protected.POST("/cms/partners", handlers.CreatePartner)       // POST /api/cms/partners (create partner)
		protected.GET("/cms/partners/:id", handlers.GetPartner)       // GET /api/cms/partners/{id}
		protected.PUT("/cms/partners/:id", handlers.UpdatePartner)    // PUT /api/cms/partners/{id}
		protected.DELETE("/cms/partners/:id", handlers.DeletePartner) // DELETE /api/cms/partners/{id}

		// Publications management routes (requires authentication) - CRUD operations
		protected.POST("/publications", handlers.CreatePublication)       // POST /api/publications (create publication)
		protected.PUT("/publications/:id", handlers.UpdatePublication)    // PUT /api/publications/{id}
		protected.DELETE("/publications/:id", handlers.DeletePublication) // DELETE /api/publications/{id}

		// Careers management routes (requires authentication) - CRUD operations
		protected.POST("/careers", handlers.CreateCareer)       // POST /api/careers (create career)
		protected.PUT("/careers/:id", handlers.UpdateCareer)    // PUT /api/careers/{id}
		protected.DELETE("/careers/:id", handlers.DeleteCareer) // DELETE /api/careers/{id}

		// Commodities management routes (requires authentication) - CRUD operations
		protected.POST("/commodities", handlers.CreateCommodity)       // POST /api/commodities (create commodity)
		protected.PUT("/commodities/:id", handlers.UpdateCommodity)    // PUT /api/commodities/{id}
		protected.DELETE("/commodities/:id", handlers.DeleteCommodity) // DELETE /api/commodities/{id}
		protected.PUT("/settings/:key", handlers.UpdateSetting)        // PUT /api/settings/{key} (update setting)
		protected.DELETE("/settings/:key", handlers.DeleteSetting)     // DELETE /api/settings/{key} (delete setting)

		// Menu management routes (requires authentication)
		protected.GET("/menus", handlers.GetMenus)                       // GET /api/menus (list all menus)
		protected.POST("/menus", handlers.CreateMenu)                    // POST /api/menus (create menu)
		protected.GET("/menus/id/:id", handlers.GetMenu)                 // GET /api/menus/id/{id} (get menu by ID)
		protected.PUT("/menus/id/:id", handlers.UpdateMenu)              // PUT /api/menus/id/{id} (update menu)
		protected.DELETE("/menus/id/:id", handlers.DeleteMenu)           // DELETE /api/menus/id/{id} (delete menu)
		protected.GET("/menus/:menu_id/items", handlers.GetMenuItems)    // GET /api/menus/{menu_id}/items
		protected.POST("/menus/:menu_id/items", handlers.CreateMenuItem) // POST /api/menus/{menu_id}/items
		protected.PUT("/menu-items/:id", handlers.UpdateMenuItem)        // PUT /api/menu-items/{id}
		protected.DELETE("/menu-items/:id", handlers.DeleteMenuItem)     // DELETE /api/menu-items/{id}
	}
}
