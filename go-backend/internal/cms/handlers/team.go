package handlers

import (
	"net/http"
	"strconv"

	"gcx-cms/internal/cms/models"
	"gcx-cms/internal/shared/config"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GetTeamMembers returns all team members (protected)
func GetTeamMembers(c *gin.Context) {
	var teamMembers []models.TeamMember

	// Get type filter from query parameter
	teamType := c.Query("type")

	query := config.DB.Order("type ASC, order_index ASC, created_at ASC")

	if teamType != "" {
		query = query.Where("type = ?", teamType)
	}

	if err := query.Find(&teamMembers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to fetch team members",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    teamMembers,
	})
}

// GetTeamMember returns a single team member by ID (protected)
func GetTeamMember(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid team member ID",
		})
		return
	}

	var teamMember models.TeamMember
	if err := config.DB.First(&teamMember, uint(id)).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"error":   "Team member not found",
			})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"error":   "Failed to fetch team member",
			})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    teamMember,
	})
}

// CreateTeamMember creates a new team member (protected)
func CreateTeamMember(c *gin.Context) {
	var input struct {
		Name        string `json:"name" binding:"required"`
		Title       string `json:"title" binding:"required"`
		Description string `json:"description" binding:"required"`
		Image       string `json:"image"`
		Type        string `json:"type" binding:"required,oneof=board executive functional"`
		OrderIndex  int    `json:"order_index"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	// If no order index provided, set it to the next available index for this type
	if input.OrderIndex == 0 {
		var maxOrder int
		config.DB.Model(&models.TeamMember{}).Where("type = ?", input.Type).Select("COALESCE(MAX(order_index), 0)").Scan(&maxOrder)
		input.OrderIndex = maxOrder + 1
	}

	teamMember := models.TeamMember{
		Name:        input.Name,
		Title:       input.Title,
		Description: input.Description,
		Image:       input.Image,
		Type:        input.Type,
		OrderIndex:  input.OrderIndex,
	}

	if err := config.DB.Create(&teamMember).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to create team member",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"data":    teamMember,
		"message": "Team member created successfully",
	})
}

// UpdateTeamMember updates an existing team member (protected)
func UpdateTeamMember(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid team member ID",
		})
		return
	}

	var input struct {
		Name        string `json:"name"`
		Title       string `json:"title"`
		Description string `json:"description"`
		Image       string `json:"image"`
		Type        string `json:"type" binding:"omitempty,oneof=board executive functional"`
		OrderIndex  int    `json:"order_index"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	var teamMember models.TeamMember
	if err := config.DB.First(&teamMember, uint(id)).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"error":   "Team member not found",
			})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"error":   "Failed to fetch team member",
			})
		}
		return
	}

	// Update fields if provided
	updates := make(map[string]interface{})
	if input.Name != "" {
		updates["name"] = input.Name
	}
	if input.Title != "" {
		updates["title"] = input.Title
	}
	if input.Description != "" {
		updates["description"] = input.Description
	}
	if input.Image != "" {
		updates["image"] = input.Image
	}
	if input.Type != "" {
		updates["type"] = input.Type
	}
	if input.OrderIndex != 0 {
		updates["order_index"] = input.OrderIndex
	}

	if err := config.DB.Model(&teamMember).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to update team member",
		})
		return
	}

	// Fetch updated team member
	config.DB.First(&teamMember, uint(id))

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    teamMember,
		"message": "Team member updated successfully",
	})
}

// DeleteTeamMember deletes a team member (protected)
func DeleteTeamMember(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid team member ID",
		})
		return
	}

	var teamMember models.TeamMember
	if err := config.DB.First(&teamMember, uint(id)).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"error":   "Team member not found",
			})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"error":   "Failed to fetch team member",
			})
		}
		return
	}

	if err := config.DB.Delete(&teamMember).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to delete team member",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Team member deleted successfully",
	})
}

// ReorderTeamMembers reorders team members (protected)
func ReorderTeamMembers(c *gin.Context) {
	var input struct {
		TeamType string `json:"team_type" binding:"required,oneof=board executive functional"`
		Members  []struct {
			ID         uint `json:"id" binding:"required"`
			OrderIndex int  `json:"order_index" binding:"required"`
		} `json:"members" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	// Update order indices in a transaction
	tx := config.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	for _, member := range input.Members {
		if err := tx.Model(&models.TeamMember{}).Where("id = ? AND type = ?", member.ID, input.TeamType).Update("order_index", member.OrderIndex).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"error":   "Failed to reorder team members",
			})
			return
		}
	}

	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to commit reorder changes",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Team members reordered successfully",
	})
}
