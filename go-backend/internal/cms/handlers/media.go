package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetMedia returns all media files (protected)
func GetMedia(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get media endpoint - to be implemented"})
}

// UploadFile handles file uploads (protected)
func UploadFile(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Upload file endpoint - to be implemented"})
}

// GetMediaFile returns a single media file by ID (protected)
func GetMediaFile(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Get media file endpoint", "id": id, "status": "to be implemented"})
}

// DeleteMedia deletes a media file (protected)
func DeleteMedia(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Delete media endpoint", "id": id, "status": "to be implemented"})
}
