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

type UploadHandler struct{}

// UploadImage handles image uploads for blog posts and user avatars
func (h *UploadHandler) UploadImage(c *gin.Context) {
	// Check if user is authenticated
	_, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return
	}

	// Parse multipart form
	err := c.Request.ParseMultipartForm(10 << 20) // 10MB max
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File too large or invalid form"})
		return
	}

	// Get file from form
	file, header, err := c.Request.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded"})
		return
	}
	defer file.Close()

	// Validate file type
	if !isValidImageType(header.Filename) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid file type. Only JPG, PNG, GIF, and WebP are allowed"})
		return
	}

	// Validate file size (5MB max)
	if header.Size > 5*1024*1024 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File too large. Maximum size is 5MB"})
		return
	}

	// Create uploads directory if it doesn't exist
	uploadDir := "./uploads/images"
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upload directory"})
		return
	}

	// Generate unique filename
	ext := filepath.Ext(header.Filename)
	filename := fmt.Sprintf("%d_%s%s", time.Now().Unix(), generateRandomString(8), ext)
	filePath := filepath.Join(uploadDir, filename)

	// Create destination file
	dst, err := os.Create(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create file"})
		return
	}
	defer dst.Close()

	// Copy uploaded file to destination
	if _, err := io.Copy(dst, file); err != nil {
		os.Remove(filePath) // Cleanup on error
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}

	// Get the upload type from form (optional)
	uploadType := c.PostForm("type") // "avatar", "featured_image", "content"
	if uploadType == "" {
		uploadType = "general"
	}

	// Return file URL
	fileURL := fmt.Sprintf("/uploads/images/%s", filename)
	
	c.JSON(http.StatusOK, gin.H{
		"success":  true,
		"message":  "File uploaded successfully",
		"url":      fileURL,
		"filename": filename,
		"type":     uploadType,
		"size":     header.Size,
	})
}

// UploadMultipleImages handles multiple image uploads
func (h *UploadHandler) UploadMultipleImages(c *gin.Context) {
	// Check if user is authenticated
	_, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return
	}

	// Parse multipart form
	err := c.Request.ParseMultipartForm(50 << 20) // 50MB max for multiple files
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Form too large or invalid"})
		return
	}

	form := c.Request.MultipartForm
	files := form.File["images"]

	if len(files) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No files uploaded"})
		return
	}

	if len(files) > 10 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Maximum 10 files allowed"})
		return
	}

	// Create uploads directory if it doesn't exist
	uploadDir := "./uploads/images"
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upload directory"})
		return
	}

	var uploadedFiles []gin.H
	var errors []string

	for _, fileHeader := range files {
		// Validate file type
		if !isValidImageType(fileHeader.Filename) {
			errors = append(errors, fmt.Sprintf("%s: Invalid file type", fileHeader.Filename))
			continue
		}

		// Validate file size (5MB max per file)
		if fileHeader.Size > 5*1024*1024 {
			errors = append(errors, fmt.Sprintf("%s: File too large", fileHeader.Filename))
			continue
		}

		// Open uploaded file
		file, err := fileHeader.Open()
		if err != nil {
			errors = append(errors, fmt.Sprintf("%s: Failed to open file", fileHeader.Filename))
			continue
		}

		// Generate unique filename
		ext := filepath.Ext(fileHeader.Filename)
		filename := fmt.Sprintf("%d_%s%s", time.Now().UnixNano(), generateRandomString(8), ext)
		filePath := filepath.Join(uploadDir, filename)

		// Create destination file
		dst, err := os.Create(filePath)
		if err != nil {
			file.Close()
			errors = append(errors, fmt.Sprintf("%s: Failed to create file", fileHeader.Filename))
			continue
		}

		// Copy uploaded file to destination
		if _, err := io.Copy(dst, file); err != nil {
			dst.Close()
			file.Close()
			os.Remove(filePath) // Cleanup on error
			errors = append(errors, fmt.Sprintf("%s: Failed to save file", fileHeader.Filename))
			continue
		}

		dst.Close()
		file.Close()

		// Add to successful uploads
		fileURL := fmt.Sprintf("/uploads/images/%s", filename)
		uploadedFiles = append(uploadedFiles, gin.H{
			"original_name": fileHeader.Filename,
			"filename":      filename,
			"url":           fileURL,
			"size":          fileHeader.Size,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"success":        len(uploadedFiles) > 0,
		"message":        fmt.Sprintf("Uploaded %d of %d files", len(uploadedFiles), len(files)),
		"uploaded_files": uploadedFiles,
		"errors":         errors,
	})
}

// DeleteImage deletes an uploaded image
func (h *UploadHandler) DeleteImage(c *gin.Context) {
	// Check if user is authenticated
	_, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return
	}

	filename := c.Param("filename")
	if filename == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Filename is required"})
		return
	}

	// Validate filename (security check)
	if strings.Contains(filename, "..") || strings.Contains(filename, "/") {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid filename"})
		return
	}

	filePath := filepath.Join("./uploads/images", filename)

	// Check if file exists
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		c.JSON(http.StatusNotFound, gin.H{"error": "File not found"})
		return
	}

	// Delete file
	if err := os.Remove(filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete file"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "File deleted successfully",
	})
}

// isValidImageType checks if the file extension is valid for images
func isValidImageType(filename string) bool {
	ext := strings.ToLower(filepath.Ext(filename))
	validExts := map[string]bool{
		".jpg":  true,
		".jpeg": true,
		".png":  true,
		".gif":  true,
		".webp": true,
	}
	return validExts[ext]
}

// generateRandomString generates a random string for filename uniqueness
func generateRandomString(length int) string {
	const charset = "abcdefghijklmnopqrstuvwxyz0123456789"
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[time.Now().UnixNano()%int64(len(charset))]
	}
	return string(b)
}
