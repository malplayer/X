package com.vintech.controller;

import com.vintech.model.VinJson;
import com.vintech.util.CsvUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;


/**
 * Created by MXP2559 on 3/5/14.
 */

@Controller
@RequestMapping("/")
public class VinTechController {



    private static VinJson json = null;

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView getDemo(ModelAndView model) {
        model.setViewName("demo");
        return model;
    }




    @RequestMapping(value = "/api/getpoi", method = RequestMethod.GET, produces="application/json;charset=UTF-8")
    @ResponseBody public VinJson  getPOI() throws Exception{

          if(json == null)
          {
            json = new VinJson();
            json.setEvents(CsvUtil.getEvents());
            json.setLocations(CsvUtil.getLocations());
          }

        return json;
    }




}
