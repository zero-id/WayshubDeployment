package authdto

type SignUpResponse struct {
	Email   string `gorm:"type: varchar(255)" json:"email"`
	Message string `gorm:"type: varchar(255)" json:"message"`
}

type SignInResponse struct {
	ID    int    `gorm:"type: int" json:"id"`
	Email string `gorm:"type: varchar(255)" json:"email"`
	Photo string `gorm:"type: varchar(255)" json:"photo"`
	Token string `gorm:"type: varchar(255)" json:"token"`
}
