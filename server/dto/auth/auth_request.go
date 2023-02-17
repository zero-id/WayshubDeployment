package authdto

type SignUpRequest struct {
	Email       string `json:"email" gorm:"type: varchar(255)" validate:"required"`
	Password    string `json:"password" gorm:"type: varchar(255)" validate:"required"`
	ChannelName string `json:"channelName" gorm:"type: varchar(255)" validate:"required"`
	Description string `json:"description" gorm:"type: varchar(255)" validate:"required"`
}

type SignInRequest struct {
	Email    string `json:"email" gorm:"type: varchar(255)" validate:"required"`
	Password string `json:"password" gorm:"type: varchar(255)" validate:"required"`
}
