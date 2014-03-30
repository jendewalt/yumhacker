class Api::ListsController < ApplicationController
  before_filter :authenticate_user!, :only => [:create, :update, :delete]

  def index
    logger.debug('@@@@@@@@@@@@@@@@@@@')
    logger.debug(params)

    page = params[:page] || 1
    per = params[:per] || 1000

    if params[:user_id] && params[:favorites] == 'true'
      @lists = User.find(params[:user_id]).favorite_lists.order('updated_at DESC').page(page).per(per)
    elsif params[:user_id]
      # Returns WishLists before CustomLists then orders by last update
      @lists = User.find(params[:user_id]).lists.order('type DESC').order('updated_at DESC').page(page).per(per)
    elsif params[:establishment_id]
      @lists = Establishment.find(params[:establishment_id]).lists.order('updated_at DESC').page(page).per(per)
    else
      @lists = List.all.order('updated_at DESC').page(page).per(per)
    end
  end
  
  def show
    @list = List.find(params[:id])
  end
  
  def create
    logger.debug('@@@@@@@@@@@@@@@@@@@')
    title = params[:title].strip if params[:title]
    description = params[:description].strip if params[:description]

    @list = current_user.custom_lists.new(title: title, description: description)

    begin
      @list.save
      
      unless params[:listing].nil?
        establishment_id = params[:listing][:establishment_id]
        current_user.endorse!(establishment_id) unless current_user.endorsing?(establishment_id)
        @list.listings.new(establishment_id: establishment_id)
        @list.save
      end
    rescue
      render nothing: true, status: 409
    end
  end

  def listings
    @listings = List.find(params[:id]).listings
  end

  def update
    logger.debug('###############')
    @list = List.find(params[:id])
    @list.title = params[:title] if @list.type == 'CustomList'
    @list.description = params[:description]
    @imageable = @list.imageables.where(list_id: @list.id).first

    if @imageable.present?
      @imageable.photo_id = params[:photo_id]
      @imageable.save
    else
      @list.imageables.new(photo_id: params[:photo_id]) if params[:photo_id]
    end

    @list.save()

    render nothing: true, status: 201
  end

  def destroy
    List.find(params[:id]).destroy
    render nothing: true, status: 204
  end
end