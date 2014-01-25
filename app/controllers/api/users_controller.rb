class Api::UsersController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!, :except => [:index, :show, :followed_users, :followers, :endorsements, :search, :following, :endorsing]
  
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

  def followers
    page = params[:page] || 1
    @followers = User.find(params[:user_id]).followers.order("last_name ASC").page(page).per(20)
  end

  def followed_users
    page = params[:page] || 1
    @followed_users = User.find(params[:user_id]).followed_users.order("last_name ASC").page(page).per(20)
  end

  def unendorse
    current_user.unendorse!(params[:establishment_id])
    render :json => { user_endorsing: current_user.endorsing?(params[:establishment_id]) }
  end

  def endorse
    current_user.endorse!(params[:establishment_id])
    render :json => { user_endorsing: current_user.endorsing?(params[:establishment_id]) } 
  end

  def endorsements
    page = params[:page] || 1
    lat = params[:location][:center][:lat]
    lng = params[:location][:center][:lng]

    @establishments = User.find(params[:user_id]).establishments.order("latlng :: geometry <-> 'SRID=4326;POINT(#{lng.to_f} #{lat.to_f})' :: geometry").page(page).per(10)
  end

  def search
    query = params[:query]
    @users

    if query && !query.strip.empty?
      wild_query = query.blank? ? nil : "%#{query.downcase.gsub(/\s+/, '%')}%"
     
      @users = User.where('LOWER(email) LIKE ? or LOWER(first_name) LIKE ? or LOWER(last_name) LIKE ?', wild_query, wild_query, wild_query).limit(10)
    end
  end

  def find_facebook_friends
    oauth ||= Koala::Facebook::OAuth.new(FACEBOOK['app_id'], FACEBOOK['secret'], 'http://localhost:3000/users/find_facebook_friends')

    friend_ids = current_user.get_fb_friends_from_redis

    if params[:code] 
      begin
        token = oauth.get_access_token(params[:code])
        current_user.update(token: token)
      rescue
      end
    end

    if friend_ids && friend_ids.length > 0
      @friends = User.where(:id => friend_ids)
      current_user.follow_all!(friend_ids)

      current_user.remove_fb_friends_from_redis
    else
      begin
        @friends = current_user.get_fb_friends_on_yumhacker
      rescue
        url = oauth.url_for_oauth_code
        @error = {error: { message: 'Invalid access token.', renew_url: url }}
      end
    end   
  end

end
