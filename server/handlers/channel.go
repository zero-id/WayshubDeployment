package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	channeldto "wayshub/dto/channel"
	dto "wayshub/dto/result"
	"wayshub/models"
	"wayshub/pkg/bcrypt"
	"wayshub/repositories"

	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

var path_file = "http://localhost:8080/uploads/"

type handlerChannel struct {
	ChannelRepository repositories.ChannelRepository
}

func HandlerChannel(ChannelRepository repositories.ChannelRepository) *handlerChannel {
	return &handlerChannel{ChannelRepository}
}

func (h *handlerChannel) FindChannels(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	channels, err := h.ChannelRepository.FindChannels()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	// for i, p := range products {
	// 	products[i].Image = path_file + p.Image
	// }

	for i, p := range channels {
		channels[i].Cover = path_file + p.Cover
	}

	for i, p := range channels {
		channels[i].Photo = path_file + p.Photo
	}

	w.Header().Set("Content-Type", "application/json")
	response := dto.SuccessResult{Code: http.StatusOK, Data: channels}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerChannel) GetChannel(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	channel, err := h.ChannelRepository.GetChannel(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	channel.Cover = path_file + channel.Cover
	channel.Photo = path_file + channel.Photo

	for i, p := range channel.Video {
		channel.Video[i].Thumbnail = path_file + p.Thumbnail
	}

	for i, p := range channel.Video {
		channel.Video[i].Video = path_file + p.Video
	}

	for i, p := range channel.Subscription {
		channel.Subscription[i].OtherPhoto = path_file + p.OtherPhoto
	}

	w.Header().Set("Content-Type", "application/json")
	response := dto.SuccessResult{Code: http.StatusOK, Data: channel}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerChannel) UpdateChannel(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	channelInfo := r.Context().Value("channelInfo").(jwt.MapClaims)
	channelID := int(channelInfo["id"].(float64))

	if channelID != id {
		w.WriteHeader(http.StatusUnauthorized)
		response := dto.ErrorResult{Code: http.StatusUnauthorized, Message: "Can't update channel!"}
		json.NewEncoder(w).Encode(response)
		return
	}

	dataCover := r.Context().Value("dataCover") // add this code
	fileCover := dataCover.(string)             // add this code

	dataPhoto := r.Context().Value("dataPhoto") // add this code
	filePhoto := dataPhoto.(string)             // add this code

	// var ctx = context.Background()
	// var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	// var API_KEY = os.Getenv("API_KEY")
	// var API_SECRET = os.Getenv("API_SECRET")

	// cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// resp1, err := cld.Upload.Upload(ctx, fileCover, uploader.UploadParams{Folder: "WaysHub"})
	// if err != nil {
	// 	fmt.Println(err.Error())
	// }

	// resp2, err := cld.Upload.Upload(ctx, filePhoto, uploader.UploadParams{Folder: "WaysHub"})
	// if err != nil {
	// 	fmt.Println(err.Error())
	// }

	request := channeldto.UpdateChannelRequest{
		Email:       r.FormValue("email"),
		Password:    r.FormValue("password"),
		ChannelName: r.FormValue("channelName"),
		Description: r.FormValue("description"),
		Cover:       fileCover,
		Photo:       filePhoto,
	}

	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	channel, err := h.ChannelRepository.GetChannel(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if request.Email != "" {
		channel.Email = request.Email
	}

	if request.Password != "" {
		channel.Password = password
	}

	if request.ChannelName != "" {
		channel.ChannelName = request.ChannelName
	}

	if request.Cover != "" {
		channel.Cover = request.Cover
	}

	if request.Photo != "" {
		channel.Photo = request.Photo
	}
	if request.Description != "" {
		channel.Description = request.Description
	}

	data, err := h.ChannelRepository.UpdateChannel(channel)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	channel.Cover = path_file + channel.Cover
	channel.Photo = path_file + channel.Photo

	w.Header().Set("Content-Type", "application/json")
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerChannel) DeleteChannel(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	channelInfo := r.Context().Value("channelInfo").(jwt.MapClaims)
	channelID := int(channelInfo["id"].(float64))

	channel, err := h.ChannelRepository.GetChannel(channelID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.ChannelRepository.DeleteChannel(channel)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	response := dto.SuccessResult{Code: http.StatusOK, Data: deleteResponse(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerChannel) PlusSubscriber(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	channel, err := h.ChannelRepository.GetChannel(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	channel.Subscriber = channel.Subscriber + 1

	data, err := h.ChannelRepository.PlusSubscriber(channel)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	response := dto.SuccessResult{Code: http.StatusOK, Data: deleteResponse(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerChannel) MinusSubscriber(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	channel, err := h.ChannelRepository.GetChannel(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	channel.Subscriber = channel.Subscriber - 1

	data, err := h.ChannelRepository.MinusSubscriber(channel)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	response := dto.SuccessResult{Code: http.StatusOK, Data: deleteResponse(data)}
	json.NewEncoder(w).Encode(response)
}

// func updateResponse(u models.Channel) channeldto.ChannelResponse {
// 	return channeldto.ChannelResponse{
// 		ID:           u.ID,
// 		Email:        u.Email,
// 		ChannelName:  u.ChannelName,
// 		Description:  u.Description,
// 		Cover:        u.Cover,
// 		Photo:        u.Photo,
// 		Video:        u.Video,
// 		Subscription: u.Subscription,
// 		Subscriber:   u.Subscriber,
// 	}
// }

func deleteResponse(u models.Channel) channeldto.DeleteResponse {
	return channeldto.DeleteResponse{
		ID: u.ID,
	}
}
