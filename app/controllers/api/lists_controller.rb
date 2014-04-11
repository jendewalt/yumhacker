class Api::ListsController < ApplicationController
  before_filter :authenticate_user!, :only => [:create, :update, :destroy]
  before_filter :authorize, :only => [:update, :destroy]

  def index
    page = params[:page] || 1
    per_page = params[:per_page] || 10

    @lists = List.all

    params[:where] = params[:where].present? ? params[:where] : {}
    params[:where].each do |k, v|
      if v.is_a?(Hash)
        @lists = @lists.joins(k.to_sym)
      end
      @lists = @lists.where(k.to_sym => v)
    end

    if params[:order]
      if params[:order].length > 1
        params[:order].each do |k, pair|
          @lists = @lists.order(sanatize_order(pair))
        end 
      else
        @lists = @lists.order(sanatize_order(params[:order]))
      end
    end

    @lists = @lists.page(page).per(per_page)
  end
  
  def show
    @list = List.friendly.find(params[:id])
  end
  
  def create
    if params.has_key?(:title)
      title = params[:title].strip
      title = params[:title].length <= 255 ? params[:title] : params[:title].slice(0..255)
    end

    description = params[:description].strip if params[:description]

    @list = current_user.custom_lists.new(title: title, description: description) unless title.blank?

    begin
      @list.save
      
      unless params[:listing].nil?
        establishment_id = params[:listing][:establishment_id] ? params[:listing][:establishment_id] : params[:listing][:id]
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
    @list.title = params[:title] if @list.type == 'CustomList'
    @list.description = params[:description]
    @imageable = @list.imageables.where(list_id: @list.id).first

    if @imageable.present?
      @imageable.photo_id = params[:photo_id]
      @imageable.save
    else
      @list.imageables.new(photo_id: params[:photo_id]) if params[:photo_id]
    end

    begin
      @list.save
    rescue
      render nothing: true, status: 409
    end
  end

  def destroy
    @list.destroy unless @list.type == 'WishList'
    render nothing: true, status: 204
  end

  private
    def sanatize_order(pair)
      by = pair.keys.first.to_s
      direction = pair.values.first.to_s
      order_by = ['updated_at', 'created_at', 'type']
      order_direction = ['asc', 'desc']

      if order_by.include?(by) && order_direction.include?(direction)
        "#{by} #{direction}"
      else
        nil
      end
    end

    def authorize
      @list = List.find(params[:id])
      render nothing: true, status: 401 and return unless @list.user == current_user
    end

end