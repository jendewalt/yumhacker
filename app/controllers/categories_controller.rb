class CategoriesController < ApplicationController
  def index
    @user = User.friendly.find(params[:user_id])
    @categories = Category.uniq.joins(:establishments).where({ categorizations: { establishment_id: @user.establishment_ids }}).order(:name)
  end

  def show
    @category = Category.friendly.find(params[:id])
    @user = User.friendly.find(params[:user_id])
    @establishments = @user.establishments.joins(:categories).where({ categorizations: { category_id: @category.id} })
  end
end