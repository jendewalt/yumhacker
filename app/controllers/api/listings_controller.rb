class Api::ListingsController < ApplicationController
  before_filter :authenticate_user!, :only => [:create]
  before_filter :authorize, :only => [:create]

  def index
    logger.debug('@@@@@@@@@@@@@@@@@@@')
    logger.debug('Hello from the controller index!')
    @listings = List.find(params[:id]).listings
  end
  
  def create
    @list.listings.new(establishment_id: params[:establishment_id])

    begin 
      @list.save
      render nothing: true, status: 201
    rescue
      render nothing: true, status: 409
    end
      
  end

  def update
    logger.debug('@@@@@@@@@@@@@@@@@@@')    
  end

  private

    def authorize
      @list = List.find(params[:list_id])
      render nothing: true, status: 401 and return unless @list.user == current_user
    end
end