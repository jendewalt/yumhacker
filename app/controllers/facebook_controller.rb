class FacebookController < ApplicationController
  def sign_up
    @user = User.where(provider: 'facebook', uid: params[:uid])
  end

  def update
    user = User.new(provider:'facebook', uid: params[:user][:uid])    
    
    if user.update(email: params[:user][:email])
      sign_in_and_redirect user, :event => :authentication
    else
      flash[:error] = 'Sorry, that email is already taken.'
      redirect_to :back
    end
  end
end
