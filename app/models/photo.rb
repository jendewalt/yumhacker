class Photo < ActiveRecord::Base
  belongs_to :imageable, :polymorphic => true
  # has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "50x50>" }, :default_url => "/images/missing.png"
end
