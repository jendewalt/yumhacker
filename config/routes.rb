Yumhacker::Application.routes.draw do
  devise_for :users
 
  root :to => "main#index"

  get 'establishments', to: 'main#index'
  get 'establishments/:id', to: 'main#index'
  get 'users', to: 'main#index'
  get 'users/:id', to: 'main#index'

  namespace :api do
    resources :establishments
    get 'users/followers', to: 'users#followers'
    get 'users/followed_users', to: 'users#followed_users'
    resources :users
  end
end
