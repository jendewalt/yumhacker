class Api::CommentsController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!, :only => [:create, :update, :destroy]
  before_filter :authorize, :only => [:update, :destroy]

  def index
    commentable = find_commentable
    @comments = commentable.comments.order(updated_at: :desc).page(params[:page]).per(20).includes(:user)
  end

  def listing
    @comment = Comment.find(params[:id])
  end
  
  def create 
    body = params[:body]
    commentable = find_commentable

    @comment = if body && !body.blank? 
      body.strip!
      commentable.comments.new(user_id: current_user.id, body: body)
    end 
    begin
      @comment.save
    rescue
      render nothing: true, status: 409
    end
  end

  def update
    body = params[:body]
    
    if body && !body.blank?
      body.strip!
      @comment.body = body
    elsif body.blank?
      @comment.destroy
    end

    begin
      @comment.save
      render nothing: true, status: 201
    rescue
      render nothing: true, status: 409
    end

  end

  def destroy 
    comment = Comment.find(params[:id])
    if current_user.id == comment.user_id
      if comment.destroy
        render json: { success: true }
      end
    end
  end

private

  def authorize
    @comment = Comment.find(params[:id])
    render nothing: true, status: 401 and return unless @comment.user == current_user
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
