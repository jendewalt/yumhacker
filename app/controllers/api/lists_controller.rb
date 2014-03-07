class Api::ListsController < ApplicationController
  def index
    logger.debug('@@@@@@@@@@@@@@@@@@@')
    logger.debug('Hello from the controller index!')
  end

  def show
    @list = List.find(params[:id])
  end
  
  def create
    logger.debug('@@@@@@@@@@@@@@@@@@@')
    logger.debug('Hello from the controller create!')
  end

  def listings
    @listings = List.find(params[:id]).listings
  end

  def update
    logger.debug('@@@@@@@@@@@@@@@@@@@')    
  end
end