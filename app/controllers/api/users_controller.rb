class Api::UsersController < ApplicationController
  respond_to :json
  
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    @num_followers = @user.followers.count
    @num_followed_users = @user.followed_users.count
    @num_endorsements = @user.endorsements.count
  end

  def unfollow
    current_user.unfollow!(params[:user_id])
    render :json => { following: current_user.following?(params[:user_id]) }
  end

  def follow
    current_user.follow!(params[:user_id])
    render :json => { following: current_user.following?(params[:user_id]) }
  end

  def followers
    @followers = User.find(params[:user_id]).followers
  end

  def followed_users
    @followed_users = User.find(params[:user_id]).followed_users
  end

  def following
    render :json => { following: current_user.following?(params[:user_id]) }
  end

  def unendorse
    current_user.unendorse!(params[:establishment_id])
    render :json => { endorsing: current_user.endorsing?(params[:establishment_id]) }
  end

  def endorse
    current_user.endorse!(params[:establishment_id])
    render :json => { endorsing: current_user.endorsing?(params[:establishment_id]) } 
  end

  def endorsing
    render :json => { endorsing: current_user.endorsing?(params[:establishment_id]) }
  end

  def endorsements
    @establishments = User.find(params[:user_id]).establishments
    render 'api/establishments/index'
  end

  def create_comment 
    @comment = current_user.create_comment!(params[:establishment_id], params[:body], current_user.id)
    # render :json => comment.to_json 
  end

  def destroy_comment 
    unless current_user.id != Comment.find(params[:id]).user_id
      current_user.destroy_comment!(params[:id])
      render :json => { success: true }
    end
  end
end
