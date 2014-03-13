class Api::ListsController < ApplicationController
  before_filter :authenticate_user!, :only => [:create]

  def index
    logger.debug('@@@@@@@@@@@@@@@@@@@')
    logger.debug('Hello from the controller index!')
  end

  def show
    @list = List.find(params[:id])
  end
  
  def create
    title = params[:title].strip if params[:title]
    description = params[:description].strip if params[:description]

    @list = current_user.lists.new(title: title, description: description)

    begin
      @list.save
      
      unless params[:listing].nil?
        # Should the user automatically endore estab when added to list?
        # establishment_id = params[:listing][:id]
        # current_user.endorse!(establishment_id) unless current_user.endorsing?(establishment_id)
        @list.listings.new(establishment_id: params[:listing][:id])
        @list.save
      end
      render nothing: true, status: 201
    rescue
      render nothing: true, status: 409
    end
  end

  def listings
    @listings = List.find(params[:id]).listings
  end

  def update
    logger.debug('@@@@@@@@@@@@@@@@@@@')    
  end
end