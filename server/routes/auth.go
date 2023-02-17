package routes

import (
	"wayshub/handlers"
	"wayshub/pkg/mysql"
	"wayshub/repositories"

	"github.com/gorilla/mux"
)

func AuthRoutes(r *mux.Router) {
	channelRepository := repositories.RepositoryChannel(mysql.DB)
	h := handlers.HandlerAuth(channelRepository)
	r.HandleFunc("/sign-up", h.SignUp).Methods("POST")
	r.HandleFunc("/sign-in", h.SignIn).Methods("POST")
}
