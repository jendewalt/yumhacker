class EstablishmentsController < ApplicationController
  before_filter :authorize

  def edit
    @establishment = Establishment.friendly.find(params[:id])
    @categories = Category.all
    @estab_category_ids = @establishment.categories.pluck(:id)
  end

  def update
    @establishment = Establishment.friendly.find(params[:id])
    current_category_ids = @establishment.categories.pluck(:id)
    new_category_ids = params[:categories] || []
    categories_to_remove = current_category_ids - new_category_ids
    categories_to_add = new_category_ids - current_category_ids
    unless categories_to_remove.empty?
      categories_to_remove.each do |id|
        @establishment.categorizations.where(category_id: id).first.destroy
      end
    end
    unless categories_to_add.empty?
      categories_to_add.each do |id|
        @establishment.categorizations.create(category_id: id)
      end
    end
    redirect_to edit_establishment_path(@establishment), :notice => 'Updated'
  end

  private

    def authorize
      redirect_to '/' unless current_user && current_user.admin?
    end
end
