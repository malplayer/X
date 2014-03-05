package com.vintech.model;

import org.apache.commons.lang3.builder.ToStringBuilder;

import java.util.List;

/**
 * Created by MXP2559 on 3/5/14.
 */
public class VinJson {

    private List<Event> events;
    private List<Location> locations;


    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public List<Location> getLocations() {
        return locations;
    }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }


    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("events", events)
                .append("locations", locations)
                .toString();
    }
}
