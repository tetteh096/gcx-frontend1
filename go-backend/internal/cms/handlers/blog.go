package handlers

import (
	"encoding/json"
	"fmt"
	"gcx-cms/internal/cms/models"
	"gcx-cms/internal/shared/config"
	shared_models "gcx-cms/internal/shared/models"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/datatypes"
)

// GetPublicPosts returns all published blog posts for public viewing
func GetPublicPosts(c *gin.Context) {
	var posts []models.BlogPost

	// Get only published posts, ordered by publish date
	if err := config.DB.Preload("Author").
		Where("status = ? AND published_at IS NOT NULL", models.StatusPublished).
		Order("published_at DESC").
		Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch posts"})
		return
	}

	// Filter out posts with missing required fields
	var validPosts []models.BlogPost
	for _, post := range posts {
		// Check if post has required fields
		if post.Title != "" && post.Content != "" && post.AuthorID != 0 {
			validPosts = append(validPosts, post)
		} else {
			// Log invalid posts for debugging
			log.Printf("⚠️ Skipping invalid post ID %d: Title='%s', Content length=%d, AuthorID=%d",
				post.ID, post.Title, len(post.Content), post.AuthorID)
		}
	}

	// Transform posts to be more frontend-friendly
	var frontendPosts []gin.H
	for _, post := range validPosts {
		frontendPost := gin.H{
			"id":             post.ID,
			"title":          post.Title,
			"slug":           post.Slug,
			"content":        post.Content,
			"excerpt":        post.Excerpt,
			"featured_image": post.FeaturedImage,
			"status":         post.Status,
			"published_at":   post.PublishedAt,
			"created_at":     post.CreatedAt,
			"updated_at":     post.UpdatedAt,
			"author":         post.Author.Name, // Just the author name, not the full object
			"author_id":      post.AuthorID,
		}
		frontendPosts = append(frontendPosts, frontendPost)
	}

	// Return transformed posts
	c.JSON(http.StatusOK, frontendPosts)
}

// GetPublicPost returns a single published blog post by slug
func GetPublicPost(c *gin.Context) {
	slug := c.Param("slug")
	c.JSON(http.StatusOK, gin.H{"message": "Public post endpoint", "slug": slug, "status": "to be implemented"})
}

// GetAllPosts returns all blog posts for CMS management (protected)
func GetAllPosts(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found in context"})
		return
	}

	currentUser := user.(*shared_models.User)

	var posts []models.BlogPost
	query := config.DB.Preload("Author").Order("created_at DESC")

	// Non-admin users can only see their own posts
	if currentUser.Role != shared_models.RoleAdmin {
		query = query.Where("author_id = ?", currentUser.ID)
	}

	if err := query.Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch posts"})
		return
	}

	// Return the posts array directly (not wrapped in a message)
	c.JSON(http.StatusOK, posts)
}

// GetPost returns a single blog post by ID for editing (protected)
func GetPost(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Get post endpoint", "id": id, "status": "to be implemented"})
}

// CreatePost creates a new blog post (protected)
func CreatePost(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found in context"})
		return
	}

	currentUser := user.(*shared_models.User)

	var req struct {
		Title         string   `json:"title" binding:"required"`
		Content       string   `json:"content" binding:"required"`
		Excerpt       string   `json:"excerpt" binding:"required"`
		FeaturedImage *string  `json:"featured_image"`
		Tags          []string `json:"tags"`
		Status        string   `json:"status"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data", "details": err.Error()})
		return
	}

	// Validate required fields
	if req.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
		return
	}
	if req.Content == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Content is required"})
		return
	}
	if req.Excerpt == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Excerpt is required"})
		return
	}

	// Generate slug from title
	slug := generateSlug(req.Title)

	// Check if slug already exists
	var existingPost models.BlogPost
	if err := config.DB.Where("slug = ?", slug).First(&existingPost).Error; err == nil {
		// Make slug unique by appending timestamp
		slug = slug + "-" + fmt.Sprintf("%d", time.Now().Unix())
	}

	// Set status
	status := models.StatusDraft
	if req.Status != "" {
		switch req.Status {
		case string(models.StatusPublished), string(models.StatusDraft), string(models.StatusPrivate):
			status = models.BlogStatus(req.Status)
		}
	}

	post := models.BlogPost{
		Title:         req.Title,
		Slug:          slug,
		Content:       req.Content,
		Excerpt:       req.Excerpt,
		FeaturedImage: req.FeaturedImage,
		Status:        status,
		AuthorID:      currentUser.ID,
	}

	// Convert tags to JSON
	if len(req.Tags) > 0 {
		if tagsJSON, err := json.Marshal(req.Tags); err == nil {
			post.Tags = datatypes.JSON(tagsJSON)
		}
	}

	if status == models.StatusPublished {
		post.Publish()
	}

	if err := config.DB.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create post"})
		return
	}

	// Load author for response
	config.DB.Preload("Author").First(&post, post.ID)

	c.JSON(http.StatusCreated, post)
}

// UpdatePost updates an existing blog post (protected)
func UpdatePost(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Update post endpoint", "id": id, "status": "to be implemented"})
}

// DeletePost deletes a blog post (protected)
func DeletePost(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Delete post endpoint", "id": id, "status": "to be implemented"})
}

// Helper function to generate slug from title
func generateSlug(title string) string {
	slug := strings.ToLower(title)
	slug = strings.ReplaceAll(slug, " ", "-")
	var result strings.Builder
	for _, r := range slug {
		if (r >= 'a' && r <= 'z') || (r >= '0' && r <= '9') || r == '-' {
			result.WriteRune(r)
		}
	}
	return result.String()
}
