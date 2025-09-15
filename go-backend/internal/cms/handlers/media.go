package handlers

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

// MediaFile represents a media file record
type MediaFile struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	URL       string    `json:"url"`
	Size      int64     `json:"size"`
	Type      string    `json:"type"`
	CreatedAt time.Time `json:"created_at"`
}

// GetMedia returns all media files (protected)
func GetMedia(c *gin.Context) {
	// For now, return empty array - could be enhanced to scan upload directory
	files := []MediaFile{}
	
	// Scan uploads/images directory
	uploadPath := "./uploads/images"
	if entries, err := os.ReadDir(uploadPath); err == nil {
		for _, entry := range entries {
			if !entry.IsDir() {
				info, err := entry.Info()
				if err != nil {
					continue
				}
				
				// Only include image files
				ext := strings.ToLower(filepath.Ext(info.Name()))
				if ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".gif" || ext == ".webp" {
					files = append(files, MediaFile{
						ID:        info.Name(), // Use filename as ID for simplicity
						Name:      info.Name(),
						URL:       "/uploads/images/" + info.Name(),
						Size:      info.Size(),
						Type:      "image/" + strings.TrimPrefix(ext, "."),
						CreatedAt: info.ModTime(),
					})
				}
			}
		}
	}
	
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    files,
	})
}

// UploadFile handles file uploads (protected)
func UploadFile(c *gin.Context) {
	// Get the file from the request
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "No file provided",
		})
		return
	}
	defer file.Close()

	// Validate file type
	contentType := header.Header.Get("Content-Type")
	if !strings.HasPrefix(contentType, "image/") {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Only image files are allowed",
		})
		return
	}

	// Validate file size (10MB limit)
	if header.Size > 10*1024*1024 {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "File size too large (max 10MB)",
		})
		return
	}

	// Create uploads directory if it doesn't exist
	uploadDir := "./uploads/images"
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to create upload directory",
		})
		return
	}

	// Generate unique filename
	ext := filepath.Ext(header.Filename)
	filename := fmt.Sprintf("%d%s", time.Now().UnixNano(), ext)
	filePath := filepath.Join(uploadDir, filename)

	// Create the file
	dst, err := os.Create(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to create file",
		})
		return
	}
	defer dst.Close()

	// Copy the uploaded file to the destination
	if _, err := io.Copy(dst, file); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to save file",
		})
		return
	}

	// Return the file info
	mediaFile := MediaFile{
		ID:        filename,
		Name:      header.Filename,
		URL:       "/uploads/images/" + filename,
		Size:      header.Size,
		Type:      contentType,
		CreatedAt: time.Now(),
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    mediaFile,
		"message": "File uploaded successfully",
	})
}

// GetMediaFile returns a single media file by ID (protected)
func GetMediaFile(c *gin.Context) {
	id := c.Param("id")
	
	// Check if file exists
	filePath := filepath.Join("./uploads/images", id)
	if info, err := os.Stat(filePath); err == nil && !info.IsDir() {
		// Return file info
		ext := strings.ToLower(filepath.Ext(id))
		mediaFile := MediaFile{
			ID:        id,
			Name:      id,
			URL:       "/uploads/images/" + id,
			Size:      info.Size(),
			Type:      "image/" + strings.TrimPrefix(ext, "."),
			CreatedAt: info.ModTime(),
		}
		
		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"data":    mediaFile,
		})
	} else {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "File not found",
		})
	}
}

// DeleteMedia deletes a media file (protected)
func DeleteMedia(c *gin.Context) {
	id := c.Param("id")
	
	// Validate filename (prevent directory traversal)
	if strings.Contains(id, "..") || strings.Contains(id, "/") || strings.Contains(id, "\\") {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid filename",
		})
		return
	}
	
	// Delete the file
	filePath := filepath.Join("./uploads/images", id)
	if err := os.Remove(filePath); err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "File not found or could not be deleted",
		})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "File deleted successfully",
	})
}
