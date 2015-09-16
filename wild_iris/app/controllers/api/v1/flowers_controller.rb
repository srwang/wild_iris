class Api::V1::FlowersController < ApplicationController
	def index
		flowers = Flower.all
		render json: flowers
	end

	def show
		flower = Flower.find(params[:id])
		render json: flower
	end

	def update
		flower = Flower.find(params[:id])
		flower.update(flower_params)
		render json: flower
	end

	private

	def flower_params
		params.permit(:fed_cap, :unlocked)
	end
end