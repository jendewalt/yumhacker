class Hour < ActiveRecord::Base
  belongs_to :establishments
  validates :establishment_id, :presence => true

  def formatted_open_time
    formatted_open_time = open_time.to_s
    formatted_open_time = '0' + formatted_open_time unless formatted_open_time.length == 4
    formatted_open_time
  end

  def formatted_close_time
    formatted_close_time = close_time.to_s
    formatted_close_time = '0' + formatted_close_time unless formatted_close_time.length == 4
    formatted_close_time
  end
end
