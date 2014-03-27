class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :check_if_user
  before_filter :configure_permitted_parameters, if: :devise_controller?

  private

    def check_if_user
      if current_user
        user = { id: current_user.id, first_name: current_user.first_name, full_name: current_user.full_name, small_url: current_user.avatar.url(:small), thumb_url: current_user.avatar.url(:thumb), path: current_user.path, provider: current_user.provider }
        cookies[:current_user] = user.to_json
      else 
        cookies.delete(:current_user)
      end
    end

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:username, :email) }
      devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :first_name, :last_name, :password, :password_confirmation) }

      devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:username, :email, :first_name, :last_name, :password, :password_confirmation, :current_password, :avatar, :location, :website, :description) }
    end     
end
