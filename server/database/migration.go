package database

import (
	"fmt"
	"wayshub/models"
	"wayshub/pkg/mysql"
)

// Automatic Migration if Running App
func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.Channel{},
		&models.Video{},
		&models.Comments{},
		&models.Subscribe{})

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
