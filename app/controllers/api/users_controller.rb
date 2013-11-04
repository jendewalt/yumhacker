class Api::UsersController < ApplicationController
  respond_to :json
  
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def unfollow
    current_user.unfollow!(params[:user_id])
    render :json => { following: current_user.following?(params[:user_id]) }
  end

  def follow
    current_user.follow!(params[:user_id])
    render :json => { following: current_user.following?(params[:user_id]) }
  end

  def unendorse
    current_user.unendorse!(params[:id])
    render :json => { endorsing: current_user.endorsing?(params[:id]) }
  end

  def endorse
    current_user.endorse!(params[:id])
    render :json => { endorsing: current_user.endorsing?(params[:id]) } 
  end

  def followers
    @followers = User.find(params[:user_id]).followers
  end

  def followed_users
    @followed_users = User.find(params[:user_id]).followed_users
  end

  def following
    render :json => { following: current_user.following?(params[:user_id] }
  end
end
