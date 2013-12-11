class Api::PhotosController < ApplicationController
  respond_to :json
  
  def create
    if current_user 
      @photo = current_user.photos.create(establishment_id: params[:establishment_id], content_type: params[:content_type], original_filename: params[:original_filename], image_data: params[:image_data])
    else
      render json: {error: 'You must be logged in to add photos.'}
    end
  end

  def edit
    if current_user
      caption = params[:caption]
      if caption && !caption.blank?
        caption.strip!
        Photo.find(params[:id]).update_attributes(caption: caption)
        render json: { success: true }
      end
    end
  end

  def preview_photos
    @photos = Establishment.find(params[:establishment_id]).photos.order(created_at: :desc).limit(4)
  end
end