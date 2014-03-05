package com.vintech.model;

/**
 * Created by MXP2559 on 3/5/14.
 */
public class Event {

    private String interval;
    private String id;
    private String event;
    private String severity;
    private String action;


    public String getInterval() {
        return interval;
    }

    public void setInterval(String interval) {
        this.interval = interval;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    @Override
    public String toString() {
        return new org.apache.commons.lang3.builder.ToStringBuilder(this)
                .append("interval", interval)
                .append("id", id)
                .append("event", event)
                .append("severity", severity)
                .append("action", action)
                .toString();
    }
}
