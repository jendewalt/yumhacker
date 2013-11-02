class RelationshipsController < ApplicationController
  before_filter :authenticate_user!

  def create
    @user = User.find(params[:relationship][:followed_id])
    logger.debug('$$$$$$$$$$$$$$$$$$')
    logger.debug(@user)
    # current_user.follow!(@user)
    # respond_to do |format|
    #   format.json { render :json => 'Created!' }
    # end
  end

  def destroy
    @user = Relationship.find(params[:id]).followed
    current_user.unfollow!(@user)
    render :nothing => true
  end
end