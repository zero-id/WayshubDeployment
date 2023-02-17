package main

import (
	"wayshub/database"
	"wayshub/pkg/mysql"
	"wayshub/routes"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	// import "godotenv" here ...
)

func main() {

	// Init godotenv here ...

	// initial DB
	mysql.DatabaseInit()

	// run migration
	database.RunMigration()

	r := mux.NewRouter()

	routes.RouteInit(r.PathPrefix("/api/v1").Subrouter())

	// Initialization "uploads" folder to public here ...
	r.PathPrefix("/uploads").Handler(http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads"))))

	fmt.Println("server running localhost:8080")
	http.ListenAndServe("localhost:8080", r)
}
