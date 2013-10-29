Yumhacker::Application.routes.draw do
  devise_for :users
 
  root :to => "main#index"

  get 'establishments', to: 'main#index'
  get 'establishments/:id', to: 'main#index'

  namespace :api do
    resources :establishments
    resources :users
  end
end
