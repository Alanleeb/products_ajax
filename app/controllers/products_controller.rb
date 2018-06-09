class ProductsController < ApplicationController
  def index
  end
  def show
    render partial: 'form', locals: { product: @product }
  end
  
end
