class Api::ListingsController < ApplicationController
  def index
    logger.debug('@@@@@@@@@@@@@@@@@@@')
    logger.debug('Hello from the controller index!')
    @listings = List.find(params[:id]).listings
  end
  
  def create
    logger.debug('@@@@@@@@@@@@@@@@@@@')
    logger.debug('Hello from the controller create!')

    establishment_id = params[:establishment_id]
    list_id = params[:list_id]

    if current_user && establishment_id && list_id
      list = current_user.lists.where(id: list_id)
      unless list.empty? || list.first.listings.where(establishment_id: establishment_id).present?
        list.first.listings.create(establishment_id: establishment_id)
      end
    end
  end

  def update
    logger.debug('@@@@@@@@@@@@@@@@@@@')    
  end
end