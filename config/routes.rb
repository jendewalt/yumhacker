Yumhacker::Application.routes.draw do
  get '/twitter/sign_up', to: 'twitter#sign_up'
  post '/twitter', to: 'twitter#update'
  get '/facebook/sign_up', to: 'facebook#sign_up'
  post '/facebook', to: 'facebook#update'

  # devise_for must be above root
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks", :registrations => "registrations"  }
 
  root :to => "main#index"

  get '/users/find_facebook_friends', to: 'main#index'
  get '/users/sign_up/find_facebook_friends', to: 'main#index'

  get 'restaurants/:id/edit', to: 'establishments#edit', as: 'edit_establishment'
  patch 'restaurants/:id', to: 'establishments#update', as: 'establishment'
  get 'restaurants', to: 'main#index'
  get 'restaurants/:id', to: 'main#index'
  get 'restaurants/:state/:city/:id' => 'main#index', :constraints => { :state => /[A-Za-z0-9\-_]+/, :city => /[A-Za-z0-9\-_]+/, :id => /[A-Za-z0-9\-_]+/ }
  get 'restaurants/:id/photos', to: 'main#index'
  get 'restaurants/:state/:city/:id/photos' => 'main#index', :constraints => { :state => /[A-Za-z0-9\-_]+/, :city => /[A-Za-z0-9\-_]+/, :id => /[A-Za-z0-9\-_]+/ }

  get 'users', to: 'main#index'
  get 'users/search', to: 'main#index'
  get 'users/:id', to: 'main#index'
  get 'users/:id/:section', to: 'main#index'
 
  get 'lists/:id', to: 'main#index'

  get 'contact', to: 'main#index'
  get 'terms', to: 'main#index'
  get 'privacy', to: 'main#index'
  # get 'neighborhoods', to: 'main#index'

  namespace :api do

    get 'establishments/search', to: 'establishments#search'
    get 'establishments/endorsers', to: 'establishments#endorsers'
    get 'establishments/comments', to: 'establishments#comments'
    get 'establishments/:id/photos', to: 'establishments#photos'
    resources :establishments

    get '/users/find_facebook_friends', to: 'users#find_facebook_friends'
    get 'users/search', to: 'users#search'
    get 'users/endorsing', to: 'users#endorsing'
    get 'users/endorsements', to: 'users#endorsements'
    post 'users/endorse', to: 'users#endorse'
    delete 'users/endorse', to: 'users#unendorse'
    post 'users/favorite', to: 'users#favorite'
    delete 'users/favorite', to: 'users#unfavorite'
    get 'users/:id/lists', to: 'users#lists'

    get 'lists/:id/listings', to: 'lists#listings'
    resources :lists
    
    post 'users/follow', to: 'users#follow'
    delete 'users/follow', to: 'users#unfollow'
    get 'users/followers', to: 'users#followers'
    get 'users/followed_users', to: 'users#followed_users'
    get 'users/followed_users', to: 'users#followed_users'
    resources :users

    resources :comments

    resources :categories
    
    get 'photos/preview_photos', to: 'photos#preview_photos'
    resources :photos

    get 'geolocations', to: 'geolocations#index'
    get 'geolocations/details', to: 'geolocations#details'
  end
end
