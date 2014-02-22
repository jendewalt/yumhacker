class Api::ListsController < ApplicationController
  def index
    logger.debug('@@@@@@@@@@@@@@@@@@@')
    logger.debug('Hello from the controller index!')
  end

  def show
    logger.debug('@@@@@@@@@@@@@@@@@@@')
    logger.debug('Hello from the controller show!')
    @list = List.find(params[:id])
  end
  
  def create
    logger.debug('@@@@@@@@@@@@@@@@@@@')
    logger.debug('Hello from the controller create!')
  end

  def listings
    logger.debug('@@@@@@@@@@@@@@@@@@@')
    logger.debug('Hello from the controller get listings!')
    @listings = List.find(params[:id]).listings
  end
end