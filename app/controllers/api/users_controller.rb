class Api::UsersController < ApplicationController
  respond_to :json
  
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def unfollow
    if current_user.unfollow!(params[:user_id])
      render :json => { following: false }
    else
      render :json => { following: true }
    end
  end

  def follow
    if current_user.follow!(params[:user_id])
      render :json => { following: true }
    else
      render :json => { following: false }
    end
  end

  def followers
    @followers = User.find(params[:user_id]).followers
  end

  def followed_users
    @followed_users = User.find(params[:user_id]).followed_users
  end

  def following
    following = current_user.following?(params[:user_id])
    render :json => { following: following }
  end
end
