class EstablishmentsController < ApplicationController
  def create
  end

  private
    def establishment_params
      params.permit(:city, :country, :formatted_address, :latlng, :name, :phone, :price, :state, :street, :street_number, :website, :zip_code)
    end
end