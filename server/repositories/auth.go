package repositories

import (
	"wayshub/models"

	"gorm.io/gorm"
)

type AuthRepository interface {
	SignUp(channel models.Channel) (models.Channel, error)
	SignIn(email string) (models.Channel, error)
	Getchannel(ID int) (models.Channel, error)
}

func RepositoryAuth(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) SignUp(channel models.Channel) (models.Channel, error) {
	err := r.db.Create(&channel).Error

	return channel, err
}

func (r *repository) SignIn(email string) (models.Channel, error) {
	var channel models.Channel
	err := r.db.First(&channel, "email=?", email).Error

	return channel, err
}

func (r *repository) Getchannel(ID int) (models.Channel, error) {
	var channel models.Channel
	err := r.db.First(&channel, ID).Error

	return channel, err
}
