package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/mux"
)

var staticDir = strings.TrimSpace(os.Getenv("APP_STATIC_DIR"))
var templateDir = strings.TrimSpace(os.Getenv("APP_TEMPLATE_DIR"))
var listenAddr = strings.TrimSpace(os.Getenv("APP_HOST_PORT"))

func main() {
	initialize()

	indexTemplatePath := templateDir + "index.html"
	indexTemplate := template.Must(template.ParseFiles(indexTemplatePath))

	r := mux.NewRouter()

	s := http.StripPrefix("/static/", http.FileServer(http.Dir(staticDir)))
	r.PathPrefix("/static/").Handler(s)

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if err := indexTemplate.Execute(w, map[string]string{"message": "there"}); err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}).Methods("GET")

	log.Fatal(http.ListenAndServe(listenAddr, r))
}

func initialize() {
	if templateDir == "" {
		templateDir = "./templates/"
	} else if templateDir[len(templateDir)-1:] != "/" {
		templateDir += "/"
	}

	if staticDir == "" {
		staticDir = "./static/"
	} else if staticDir[len(staticDir)-1:] != "/" {
		staticDir += "/"
	}

	if listenAddr == "" {
		listenAddr = "localhost:8000"
	}
}
