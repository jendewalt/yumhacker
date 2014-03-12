class Api::ListingsController < ApplicationController
  before_filter :authenticate_user!, :only => [:create]
  before_filter :authorize, :only => [:create]

  def index
    logger.debug('@@@@@@@@@@@@@@@@@@@')
    logger.debug('Hello from the controller index!')
    @listings = List.find(params[:id]).listings
  end
  
  def create
    @listing = @list.listings.new(establishment_id: params[:establishment_id])
   
    begin 
      @list.save
      create_comment(params[:comment])
      render nothing: true, status: 201
    rescue
      # Need to tell it what Listing ID to use
      create_comment(params[:comment])
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

    def create_comment(comment)
      logger.debug('@@@@@@@@@@@@@@@@@@@')
      @listing.build_comment(body: comment, user_id: current_user.id)
      @listing.comment.save
      logger.debug(@listing.comment.inspect)
    end
end