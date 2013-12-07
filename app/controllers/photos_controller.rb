class PhotosController < ApplicationController

  def create
    @imageable = find_imageable
    @photo = @imageable.photos
    if @photo.save
      logger.debug('saved!')
      render :nothing => true
    else
      logger.debug('error!')
      render :nothing => true
    else
    end
  end

  private
    def photo_params
      params.permit(:caption, :image)
    end

    def find_commentable
      params.each do |name, value|
        if name =~ /(.+)_id$/
          return $1.classify.constantize.find(value)
        end
      end
      nil
    end
end