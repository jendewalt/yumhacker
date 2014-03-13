class Api::ListingsController < ApplicationController
  before_filter :authenticate_user!, :only => [:create]
  before_filter :authorize, :only => [:create]

  def index
    @listings = List.find(params[:id]).listings
  end
  
  def create
    @listing = @list.listings.new(establishment_id: params[:establishment_id])
   
    begin 
      @list.save
      @listing.build_comment(body: params[:comment], user_id: current_user.id)
      @listing.comment.save
 
      render nothing: true, status: 201
    rescue
      render nothing: true, status: 409
    end
  end

  def update
  end

  private

    def authorize
      @list = List.find(params[:list_id])
      render nothing: true, status: 401 and return unless @list.user == current_user
    end
end
