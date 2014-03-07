class UsersController < ApplicationController
  def index
    @users = User.all.page(params[:page]).per(1000)
  end

end