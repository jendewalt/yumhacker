class Photo < ActiveRecord::Base
  attr_accessor :content_type, :original_filename, :image_data
  
  has_attached_file :image, :styles => { :medium => "400x400#", :small => "160x160#", :thumb => "50x50#" }, :default_url => "/no_photo.png"

  belongs_to :user

  has_many :imageables, :dependent => :destroy
  has_many :establishments, :through => :imageables
  has_many :lists, :through => :imageables

  validates :user, :presence => true

  before_save :decode_base64_image

  protected
    def decode_base64_image
      if image_data && content_type && original_filename
        decoded_data = Base64.decode64(image_data)
 
        data = StringIO.new(decoded_data)
        data.class_eval do
          attr_accessor :content_type, :original_filename
        end
 
        data.content_type = content_type
        data.original_filename = File.basename(original_filename)
 
        self.image = data
      end
      if self.image_file_size.nil? or self.image_content_type.nil?
        return false
      end
    end
end
