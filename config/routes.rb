Yumhacker::Application.routes.draw do
  devise_for :users
 
  root :to => "main#index"

  get 'establishments', to: 'main#index'
  get 'establishments/:id', to: 'main#index'
  get 'users', to: 'main#index'
  get 'users/:id', to: 'main#index'

  namespace :api do
    get 'establishments/search', to: 'establishments#search'
    resources :establishments

    get 'users/endorsing', to: 'users#endorsing'
    get 'users/endorsements', to: 'users#endorsements'
    post 'users/endorse', to: 'users#endorse'
    delete 'users/endorse', to: 'users#unendorse'
    
    get 'users/following', to: 'users#following'
    post 'users/follow', to: 'users#follow'
    delete 'users/follow', to: 'users#unfollow'
    get 'users/followers', to: 'users#followers'
    get 'users/followed_users', to: 'users#followed_users'
    resources :users

    get 'geolocations', to: 'geolocations#index'
    get 'geolocations/details', to: 'geolocations#details'
  end
end
