module Api 
    module V1
        class EventsController < ApplicationController
            respond_to :json

            def index 
                @events = Event.all 
                render json: @events
            end 

            def create 
                @event = Event.new(event_params)
                if @event.save
                    render json: @event 
                else 
                    puts @event.errors.full_messages
                    render json: @event.errors 
                end
            end

            private 

            def event_params
                params.require(:event).permit(:title, :start_date, :end_date, :description, :location)
            end 

            def set_event
                @event = Event.find(params[:id])
            end
        end
    end 
end 
