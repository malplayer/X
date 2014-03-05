package com.vintech.util;

import com.sun.jmx.remote.internal.ArrayQueue;
import com.vintech.model.Event;
import com.vintech.model.Location;
import org.supercsv.io.CsvBeanReader;
import org.supercsv.io.ICsvBeanReader;
import org.supercsv.prefs.CsvPreference;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by MXP2559 on 3/5/14.
 */
public class CsvUtil {


    public static List<Event> getEvents()  throws Exception
    {
       List<Event> events = new ArrayList<Event>();

        ICsvBeanReader beanReader = null;
        try {
            ClassLoader classloader = Thread.currentThread().getContextClassLoader();
            InputStream is = classloader.getResourceAsStream("event.csv");
            beanReader = new CsvBeanReader(new InputStreamReader(is), CsvPreference.EXCEL_PREFERENCE);
            final String[] header = beanReader.getHeader(true);

            Event event;
            while( (event = beanReader.read(Event.class, header)) != null ) {
                System.out.println(String.format("lineNo=%s, rowNo=%s, event=%s", beanReader.getLineNumber(),
                        beanReader.getRowNumber(), event));
                events.add(event);
            }
            return events;
        }catch (Exception e)
        {
            e.printStackTrace();
            throw new Exception(e);
        }
        finally {
            if( beanReader != null ) {
                beanReader.close();
            }
        }
    }



    public static List<Location> getLocations()  throws Exception
    {
        List<Location> locations = new ArrayList<Location>();

        ICsvBeanReader beanReader = null;
        try {
            ClassLoader classloader = Thread.currentThread().getContextClassLoader();
            InputStream is = classloader.getResourceAsStream("location.csv");
            beanReader = new CsvBeanReader(new InputStreamReader(is), CsvPreference.EXCEL_PREFERENCE);
            final String[] header = beanReader.getHeader(true);

            Location location;
            while( (location = beanReader.read(Location.class, header)) != null ) {
                System.out.println(String.format("lineNo=%s, rowNo=%s, location=%s", beanReader.getLineNumber(),
                        beanReader.getRowNumber(), location));
                locations.add(location);
            }
            return locations;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            throw new Exception(e);
        }
        finally {
            if( beanReader != null ) {
                beanReader.close();
            }
        }
    }









}
