class Api::PhotosController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!, :only => [:create, :update, :destroy]
  before_filter :authorize, :only => [:destroy]

  def index
    imageable = find_imageable
    @photos = imageable.photos

  end
  
  def create
    imageable = find_imageable

    @photo = imageable.photos.new(user_id: current_user.id, content_type: params[:content_type], original_filename: params[:original_filename], image_data: params[:image_data])

    @photo.save
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

  def destroy 
    if @photo.destroy
      render json: { success: true }
    end
  end

  private

    def authorize
      @photo = Photo.find(params[:id])
      render nothing: true, status: 401 and return unless @photo.user == current_user
    end

    def find_imageable
      params.each do |name, value|
        if name =~ /(.+)_id$/
          return $1.classify.constantize.find(value)
        end
      end
      nil
    end
end