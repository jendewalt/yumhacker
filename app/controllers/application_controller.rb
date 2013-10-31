class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :check_if_user

  private

    def check_if_user
      if current_user
        cookies[:current_user] = current_user.to_json
      else 
        cookies.delete(:current_user)
      end
    end
    
end
