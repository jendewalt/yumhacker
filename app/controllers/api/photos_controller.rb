class Api::PhotosController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!, :only => [:create, :update, :destroy]

  def index
    if params[:type] == 'establishment'
      @photos = Establishment.find(params[:id]).photos
    end
  end
  
  def create
    @photo = current_user.photos.create(establishment_id: params[:establishment_id], content_type: params[:content_type], original_filename: params[:original_filename], image_data: params[:image_data])
  end

  def update
    caption = params[:caption]
    if caption && !caption.blank?
      caption.strip!
      Photo.find(params[:id]).update_attributes(caption: caption)
      render json: { success: true }
    else
      render json: { success: 'Empty caption. Photo not updated' }      
    end
  end

  def preview_photos
    @photos = Establishment.find(params[:establishment_id]).preview_photos
  end
end