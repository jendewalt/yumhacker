class UsersController < ApplicationController
  private
    def user_params
      params.permit(:username, :email, :password, :password_confirmation, :remember_me)
    end
end