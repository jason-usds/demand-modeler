package api

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/nickrobison-usds/demand-modeling/cmd"
	"github.com/rs/zerolog/log"
)

func getStateIDs(w http.ResponseWriter, r *http.Request) {
	err := json.NewEncoder(w).Encode(cmd.StateFips)
	if err != nil {
		log.Error().Err(err).Msg("Cannot encode state FIPs")
		w.WriteHeader(http.StatusInternalServerError)
	}
}

func getStates(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	backend := ctx.Value(BackendKey).(DataBackend)

	var t *time.Time = nil
	start, ok := r.URL.Query()["start"]
	if ok && len(start) == 1 {
		startTime, err := time.Parse(time.RFC3339, start[0])
		if err != nil {
			log.Error().Err(err).Msg("Cannot decode start time parameter")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		t = &startTime
	}
	cases, err := backend.GetTopStates(ctx, t)
	if err != nil {
		log.Error().Err(err).Msg("Cannot query for state cases")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = json.NewEncoder(w).Encode(cases)
	if err != nil {
		log.Error().Err(err).Msg("Cannot encode to json")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func getStateCases(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	stateID := ctx.Value("stateID").(string)
	backend := ctx.Value(BackendKey).(DataBackend)
	cases, err := backend.GetStateCases(ctx, stateID)
	if err != nil {
		log.Error().Err(err).Msg("Cannot query state cases")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = json.NewEncoder(w).Encode(cases)
	if err != nil {
		log.Error().Err(err).Msg("Cannot encode to json")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func stateCTX(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		countyID := chi.URLParam(r, "stateID")
		log.Debug().Msgf("ID from param: %s\n", countyID)
		ctx := context.WithValue(r.Context(), "stateID", countyID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func stateAPI(r chi.Router) {
	r.With(stateCTX).Get("/{stateID}", getStateCases)
	r.Get("/id", getStateIDs)
	r.Get("/", getStates)
}
