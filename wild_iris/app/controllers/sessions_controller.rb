class SessionsController < ApplicationController

    def index
        render :index
    end

    def create 
        user = User.find_by({username: params[:username]})
        if user && user.authenticate(params[:password])
            	session[:user_id] = user.id
                redirect_to '/'
        else
            flash[:error] = "Incorrect Username or Password"
            redirect_to(:back)
        end

    end

    def new
        puts session[:user_id]
        if params[:password] == params[:password_confirmation]
            if User.create({username: params[:username]}).valid?
                user = User.create({username: params[:username], password: params[:password], level: 1, rainwater: 300})
                session[:user_id] = user.id
                gon.user_id = user.id
                redirect_to '/'
            else 
                flash[:error_two] = "Sorry, #{params[:username]} has been taken"
                redirect_to(:back) 
            end
        else 
            flash[:error_two] = "Please confirm your password"
            redirect_to(:back) 
        end
    end

    def destroy 
        session[:user_id] = nil
        redirect_to '/sessions'
    end 

end

